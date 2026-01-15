'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from '@/contexts/ScrollContext';

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number; // previous z for trail effect
  layer: number;
  speedMultiplier: number;
  color: { r: number; g: number; b: number };
}

// Layer configuration - optimized for performance
const LAYERS = [
  { zMin: 600, zMax: 1000, count: 120, speedMultiplier: 0.4 },  // Far - dim, slow
  { zMin: 300, zMax: 600,  count: 80,  speedMultiplier: 0.8 },  // Mid
  { zMin: 80,  zMax: 300,  count: 50,  speedMultiplier: 1.2 },  // Near - bright, fast
];
// Total: 250 stars

const MAX_Z = 1000;
const BASE_SPEED = 0.3; // Slower base movement

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const { scrollVelocityRef } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let centerX = 0;
    let centerY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
      initStars();
    };

    const createStar = (layer: typeof LAYERS[0], layerIndex: number): Star => {
      const zRange = layer.zMax - layer.zMin;
      const z = layer.zMin + Math.random() * zRange;

      return {
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z,
        pz: z,
        layer: layerIndex,
        speedMultiplier: layer.speedMultiplier,
        color: Math.random() < 0.7
          ? { r: 200, g: 220, b: 255 }  // Blue-white
          : { r: 255, g: 255, b: 255 }  // Pure white
      };
    };

    const initStars = () => {
      starsRef.current = [];
      LAYERS.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          starsRef.current.push(createStar(layer, layerIndex));
        }
      });
    };

    const animate = () => {
      // Clear canvas to show background image
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get scroll velocity from shared context
      const scrollVelocity = scrollVelocityRef.current;

      // Combined speed: base forward movement + scroll-driven movement
      const effectiveSpeed = BASE_SPEED + scrollVelocity * 1.5;

      for (const star of starsRef.current) {
        // Store previous z for trail
        star.pz = star.z;

        // Move star toward viewer based on scroll velocity and layer speed
        star.z -= effectiveSpeed * star.speedMultiplier;

        // Respawn star when it passes the viewer
        if (star.z <= 1) {
          const layer = LAYERS[star.layer];
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.z = layer.zMax;
          star.pz = layer.zMax;
        }

        // Also handle backwards movement (scrolling up)
        if (star.z > MAX_Z) {
          const layer = LAYERS[star.layer];
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.z = layer.zMin;
          star.pz = layer.zMin;
        }

        // 3D projection to 2D screen
        const projectionScale = 300;
        const sx = (star.x / star.z) * projectionScale + centerX;
        const sy = (star.y / star.z) * projectionScale + centerY;

        // Previous position for trail
        const px = (star.x / star.pz) * projectionScale + centerX;
        const py = (star.y / star.pz) * projectionScale + centerY;

        // Skip if outside canvas
        if (sx < -50 || sx > canvas.width + 50 || sy < -50 || sy > canvas.height + 50) {
          continue;
        }

        // Size based on depth (closer = bigger) - smaller stars
        const depthRatio = 1 - star.z / MAX_Z;
        const size = Math.max(0.3, depthRatio * 2);

        // Brightness based on depth
        const alpha = Math.min(0.9, depthRatio * 1.2);

        // Simple trail line (no gradient for performance)
        if (Math.abs(effectiveSpeed) > 0.2 && star.pz < MAX_Z && star.pz > 1) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha * 0.5})`;
          ctx.lineWidth = size * 0.6;
          ctx.stroke();
        }

        // Draw star point (simple circle, no glow)
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [scrollVelocityRef]);

  return (
    <canvas
      ref={canvasRef}
      id="starfield-background"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: "url('/starfield-bg.jpg') no-repeat center center",
        backgroundSize: 'cover',
      }}
    />
  );
}
