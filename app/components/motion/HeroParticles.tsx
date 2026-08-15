"use client";

import React, { useEffect, useRef } from "react";

type ParticleState =
  | "sphericalOrb"
  | "dataFlow"
  | "spiralVortex"
  | "budgetIntelligence"
  | "workflowAutomation";

interface SpherePoint {
  u: number;
  v: number;
  w: number;
  radius: number;
  color: string;
  glowColor: string;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  depth: number;
  color: string;
  glowColor: string;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  hubId?: number;
  trailHistory: { x: number; y: number }[];
}

interface PulseRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const isMobile = width < 768;

    const palette = [
      { core: "rgba(96, 165, 250, ", glow: "rgba(59, 130, 246, " },   // Brand Blue
      { core: "rgba(147, 197, 253, ", glow: "rgba(96, 165, 250, " },  // Ice Blue
      { core: "rgba(52, 211, 153, ", glow: "rgba(16, 185, 129, " },   // Emerald Neon
      { core: "rgba(129, 140, 248, ", glow: "rgba(99, 102, 241, " },  // Indigo Glow
      { core: "rgba(56, 189, 248, ", glow: "rgba(14, 165, 233, " },   // Cyan Electric
    ];

    const STATES: ParticleState[] = [
      "sphericalOrb",
      "dataFlow",
      "spiralVortex",
      "budgetIntelligence",
      "workflowAutomation",
    ];

    let currentStateIndex = 0;
    let nextStateIndex = 1;
    let transitionProgress = 1;
    let isTransitioning = false;
    let transitionStartTime = 0;
    const TRANSITION_DURATION = 2000;
    const STATE_HOLD_DURATION = 14000;

    // Responsive 3D Sphere Points Generation (35 on mobile, 70 on desktop)
    const SPHERE_POINT_COUNT = isMobile ? 35 : 70;
    const spherePoints: SpherePoint[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < SPHERE_POINT_COUNT; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / SPHERE_POINT_COUNT);
      const colorScheme = palette[i % palette.length];

      spherePoints.push({
        u: Math.sin(phi) * Math.cos(theta),
        v: Math.sin(phi) * Math.sin(theta),
        w: Math.cos(phi),
        radius: isMobile ? 1.2 + (i % 2) * 0.6 : 1.5 + (i % 3) * 0.8,
        color: colorScheme.core,
        glowColor: colorScheme.glow,
      });
    }

    // 3D Rotation Angles for Sphere
    let rotX = 0.2;
    let rotY = 0;
    let targetRotSpeedX = 0.003;
    let targetRotSpeedY = 0.007;
    let sphereRadius = isMobile ? Math.min(width * 0.32, 130) : Math.min(width * 0.2, 170);

    // Responsive Particle Count (25 on mobile, 60 on desktop)
    const particleCount = isMobile ? 25 : 60;
    const particles: Particle[] = [];
    const pulseRings: PulseRing[] = [];
    const dataPackets: DataPacket[] = [];

    // Scroll Velocity Tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let smoothedScrollVelocity = 0;

    for (let i = 0; i < particleCount; i++) {
      const colorScheme = palette[i % palette.length];
      const depthTier = i % 8 === 0 ? 2 : i % 3 === 0 ? 0 : 1;

      const radius =
        depthTier === 2
          ? 2.5 + Math.random() * 1.5
          : depthTier === 0
          ? 1 + Math.random() * 0.6
          : 1.5 + Math.random() * 1.0;

      const baseAlpha =
        depthTier === 2
          ? 0.10 + Math.random() * 0.06
          : depthTier === 0
          ? 0.22 + Math.random() * 0.12
          : 0.26 + Math.random() * 0.16;

      const x = Math.random() * width;
      const y = Math.random() * height;

      particles.push({
        x,
        y,
        targetX: x,
        targetY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseVx: (Math.random() - 0.5) * 0.3,
        baseVy: (Math.random() - 0.5) * 0.3,
        radius,
        depth: depthTier,
        color: colorScheme.core,
        glowColor: colorScheme.glow,
        baseAlpha,
        alpha: baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        hubId: i % 6 === 0 ? i : undefined,
        trailHistory: [],
      });
    }

    // Configure 2D state targets
    const configureState = (state: ParticleState) => {
      const centerX = width > 1024 ? width * 0.7 : width * 0.5;
      const centerY = width > 1024 ? height * 0.48 : height * 0.65;

      particles.forEach((p, idx) => {
        if (state === "sphericalOrb") {
          const angle = (idx / particleCount) * Math.PI * 2;
          const dist = sphereRadius * (1.2 + (idx % 4) * 0.25);
          p.targetX = centerX + Math.cos(angle) * dist;
          p.targetY = centerY + Math.sin(angle) * (dist * 0.6);
          p.baseVx = -Math.sin(angle) * 0.4;
          p.baseVy = Math.cos(angle) * 0.3;
        } else if (state === "spiralVortex") {
          const angle = (idx / particleCount) * Math.PI * 6;
          const dist = 25 + (idx / particleCount) * (isMobile ? 180 : 260);
          p.targetX = centerX + Math.cos(angle) * dist;
          p.targetY = centerY + Math.sin(angle) * (dist * 0.6);
          p.baseVx = -Math.sin(angle) * 0.45;
          p.baseVy = Math.cos(angle) * 0.3;
        } else if (state === "dataFlow") {
          const lane = (idx % 6) / 6;
          p.targetY = lane * (height * 0.82) + 40;
          p.baseVx = 0.8 + (idx % 4) * 0.3;
          p.baseVy = 0.05;
        } else if (state === "budgetIntelligence") {
          const cols = isMobile ? 5 : 7;
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          p.targetX = (col + 0.6) * (width / (cols + 0.2));
          p.targetY = (row + 0.6) * (height / 5.5);
          p.baseVx = (Math.random() - 0.5) * 0.1;
          p.baseVy = (Math.random() - 0.5) * 0.1;

          if (idx % 8 === 0 && pulseRings.length < 3) {
            pulseRings.push({
              x: p.targetX,
              y: p.targetY,
              radius: 4,
              maxRadius: isMobile ? 55 : 75,
              alpha: 0.2,
              color: "rgba(59, 130, 246, ",
            });
          }
        } else if (state === "workflowAutomation") {
          const hubIndex = idx % (isMobile ? 3 : 4);
          const hubX = ((hubIndex + 0.5) / (isMobile ? 3 : 4)) * width;
          const hubY = ((idx % 3) + 0.5) * (height / 3);
          p.targetX = hubX + (Math.random() - 0.5) * 100;
          p.targetY = hubY + (Math.random() - 0.5) * 100;
          p.baseVx = (Math.random() - 0.5) * 0.2;
          p.baseVy = (Math.random() - 0.5) * 0.2;
        }
      });
    };

    configureState(STATES[0]);

    // State Transition Loop
    const stateInterval = setInterval(() => {
      isTransitioning = true;
      transitionStartTime = performance.now();
      nextStateIndex = (currentStateIndex + 1) % STATES.length;
      configureState(STATES[nextStateIndex]);
    }, STATE_HOLD_DURATION);

    // Mouse Tracking & Sphere 3D Drag (desktop only)
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      active: false,
    };

    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      if (mouse.active) {
        const dx = newX - prevMouseX;
        const dy = newY - prevMouseY;
        rotY += dx * 0.005;
        rotX += dy * 0.005;
      }

      prevMouseX = newX;
      prevMouseY = newY;
      mouse.x = newX;
      mouse.y = newY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      sphereRadius = width < 768 ? Math.min(width * 0.32, 130) : Math.min(width * 0.22, 175);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    handleResize();

    // Render loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      smoothedScrollVelocity += (scrollVelocity - smoothedScrollVelocity) * 0.1;
      scrollVelocity *= 0.92;
      const velocityMultiplier = 1 + Math.min(smoothedScrollVelocity * 0.03, 1.2);

      if (isTransitioning) {
        const elapsed = time - transitionStartTime;
        transitionProgress = Math.min(elapsed / TRANSITION_DURATION, 1);
        if (transitionProgress >= 1) {
          isTransitioning = false;
          currentStateIndex = nextStateIndex;
        }
      }

      const activeState = isTransitioning
        ? STATES[nextStateIndex]
        : STATES[currentStateIndex];

      const sphereCenterX = width > 1024 ? width * 0.68 : width * 0.5;
      const sphereCenterY = width > 1024 ? height * 0.48 : height * 0.68;

      // 1. RENDER 3D SPHERICAL ORB
      const sphereOpacity =
        activeState === "sphericalOrb"
          ? isTransitioning && currentStateIndex !== 0
            ? transitionProgress
            : isTransitioning && nextStateIndex !== 0
            ? 1 - transitionProgress
            : 1
          : isTransitioning && nextStateIndex === 0
          ? transitionProgress
          : 0;

      if (sphereOpacity > 0.02 && !prefersReducedMotion) {
        rotY += targetRotSpeedY * velocityMultiplier;
        rotX += targetRotSpeedX * velocityMultiplier;

        const projectedPoints: {
          screenX: number;
          screenY: number;
          z: number;
          scale: number;
          radius: number;
          color: string;
          glowColor: string;
        }[] = [];

        for (let i = 0; i < spherePoints.length; i++) {
          const pt = spherePoints[i];

          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          const cosX = Math.cos(rotX);
          const sinX = Math.sin(rotX);

          const x1 = pt.u * cosY + pt.w * sinY;
          const z1 = -pt.u * sinY + pt.w * cosY;

          const y1 = pt.v * cosX - z1 * sinX;
          const z2 = pt.v * sinX + z1 * cosX;

          const fov = 400;
          const pScale = fov / (fov + z2 * sphereRadius);
          const screenX = sphereCenterX + x1 * sphereRadius * pScale;
          const screenY = sphereCenterY + y1 * sphereRadius * pScale;

          projectedPoints.push({
            screenX,
            screenY,
            z: z2,
            scale: pScale,
            radius: pt.radius * pScale,
            color: pt.color,
            glowColor: pt.glowColor,
          });
        }

        // Great-circle connecting lines
        for (let i = 0; i < projectedPoints.length; i++) {
          for (let j = i + 1; j < projectedPoints.length; j++) {
            const pA = projectedPoints[i];
            const pB = projectedPoints[j];

            const dx = pA.screenX - pB.screenX;
            const dy = pA.screenY - pB.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < sphereRadius * 0.55) {
              const depthFactor = Math.max(0.05, (pA.z + pB.z + 2) / 4);
              const lineAlpha = (1 - dist / (sphereRadius * 0.55)) * 0.16 * depthFactor * sphereOpacity;

              ctx.beginPath();
              ctx.moveTo(pA.screenX, pA.screenY);
              ctx.lineTo(pB.screenX, pB.screenY);
              ctx.strokeStyle = `rgba(96, 165, 250, ${lineAlpha})`;
              ctx.lineWidth = 0.7 * depthFactor;
              ctx.stroke();
            }
          }
        }

        // Orbit ring
        const drawOrbitRing = (tiltX: number, tiltY: number, alpha: number) => {
          ctx.beginPath();
          const segments = isMobile ? 32 : 48;
          for (let s = 0; s <= segments; s++) {
            const angle = (s / segments) * Math.PI * 2;
            const u = Math.cos(angle);
            const v = Math.sin(angle) * Math.cos(tiltX);
            const w = Math.sin(angle) * Math.sin(tiltX);

            const cosY = Math.cos(rotY + tiltY);
            const sinY = Math.sin(rotY + tiltY);
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);

            const x1 = u * cosY + w * sinY;
            const z1 = -u * sinY + w * cosY;
            const y1 = v * cosX - z1 * sinX;
            const z2 = v * sinX + z1 * cosX;

            const pScale = 400 / (400 + z2 * sphereRadius);
            const sX = sphereCenterX + x1 * sphereRadius * pScale;
            const sY = sphereCenterY + y1 * sphereRadius * pScale;

            if (s === 0) ctx.moveTo(sX, sY);
            else ctx.lineTo(sX, sY);
          }
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * sphereOpacity})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        };

        drawOrbitRing(0, 0, 0.11);
        if (!isMobile) drawOrbitRing(Math.PI / 3, Math.PI / 4, 0.07);

        // Nodes
        for (let i = 0; i < projectedPoints.length; i++) {
          const pt = projectedPoints[i];
          const depthAlpha = Math.max(0.1, (pt.z + 1.2) / 2.2);
          const totalAlpha = depthAlpha * 0.65 * sphereOpacity;

          if (pt.z < 0 && !isMobile) {
            ctx.beginPath();
            ctx.arc(pt.screenX, pt.screenY, pt.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `${pt.glowColor}${totalAlpha * 0.3})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(pt.screenX, pt.screenY, pt.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${pt.color}${totalAlpha})`;
          ctx.fill();
        }
      }

      // 2. RENDER 2D NETWORK PARTICLES
      const maxDistance = isMobile ? 85 : 110;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.05;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            if (
              (particles[i].hubId !== undefined || particles[j].hubId !== undefined) &&
              Math.random() < 0.003 &&
              dataPackets.length < 3
            ) {
              dataPackets.push({
                fromIdx: i,
                toIdx: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.015,
              });
            }
          }
        }
      }

      // Traveling data packets
      for (let d = dataPackets.length - 1; d >= 0; d--) {
        const packet = dataPackets[d];
        packet.progress += packet.speed;

        const pA = particles[packet.fromIdx];
        const pB = particles[packet.toIdx];

        if (pA && pB && packet.progress <= 1) {
          const packetX = pA.x + (pB.x - pA.x) * packet.progress;
          const packetY = pA.y + (pB.y - pA.y) * packet.progress;

          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
          ctx.fill();
        } else {
          dataPackets.splice(d, 1);
        }
      }

      // Pulse Rings
      if (activeState === "budgetIntelligence" || isTransitioning) {
        for (let k = pulseRings.length - 1; k >= 0; k--) {
          const ring = pulseRings[k];
          ring.radius += 0.35 * velocityMultiplier;
          ring.alpha *= 0.988;

          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `${ring.color}${ring.alpha * (isTransitioning ? transitionProgress : 1)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          if (ring.alpha < 0.01 || ring.radius > ring.maxRadius) {
            ring.radius = 4;
            ring.alpha = 0.16;
          }
        }
      }

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += (p.targetX - p.x) * 0.035;
          p.y += (p.targetY - p.y) * 0.035;

          p.x += p.baseVx * velocityMultiplier;
          p.y += p.baseVy * velocityMultiplier;

          if (mouse.active && !isMobile) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius && dist > 0) {
              const force = (1 - dist / mouse.radius) * 0.3;
              p.x += (dx / dist) * force * 1.1;
              p.y += (dy / dist) * force * 1.1;
            }
          }

          p.y += Math.sin(time * 0.0008 + i) * 0.08;

          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) p.y = height + 30;
          if (p.y > height + 30) p.y = -30;
        }

        p.pulsePhase += 0.02;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.05;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.04, currentAlpha)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      clearInterval(stateInterval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
    />
  );
}
