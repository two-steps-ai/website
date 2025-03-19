import { useEffect, useRef, memo } from 'react';

// Particle class definition moved outside component to avoid recreation
class Particle {
  x: number;
  y: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  phase: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseSize = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.phase = Math.random() * Math.PI * 2;

    // Compute color only once
    const hue = Math.random() * 60 + 220;
    this.color = `hsla(${hue}, 70%, 50%, ${this.opacity})`;
  }

  update(ctx: CanvasRenderingContext2D, time: number) {
    // Move
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around screen edges - simplified with modulo
    this.x = (this.x + this.canvasWidth) % this.canvasWidth;
    this.y = (this.y + this.canvasHeight) % this.canvasHeight;

    // Oscillate size - reduce calculations
    const oscillation = Math.sin(time * 0.001 + this.phase) * 0.3;
    const size = Math.max(0.1, this.baseSize + oscillation);

    // Draw particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/**
 * ParticleBackground renders a optimized animated particle system
 * with reduced calculations and better memory management.
 */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let frameSkip = 0;
    const frameSkipThreshold = 2; // Only draw connections every 3rd frame for performance
    
    // Sets up the canvas dimensions with support for device pixel ratio
    const setCanvasSize = () => {
      const scale = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(scale, scale);

      // Recreate particles on resize for proper distribution
      initParticles();
    };

    // Initialize particles - separate function for reuse on resize
    const initParticles = () => {
      // Calculate optimal particle count based on screen size with a maximum
      const particleCount = Math.min(
        70, // Reduced from 100
        Math.max(30, (window.innerWidth * window.innerHeight) / 15000) // More optimized ratio
      );
      
      particles = Array.from({ length: particleCount }, 
        () => new Particle(canvas.width, canvas.height));
    };

    // Draw lines between nearby particles - optimized with early exits
    const connectParticles = () => {
      const maxDistance = 120; // Reduced max distance
      const maxDistanceSq = maxDistance * maxDistance; // Avoid sqrt for distance comparison
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          
          // Use squared distance to avoid square root calculation
          const distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < maxDistanceSq) {
            // Only calculate sqrt when needed
            const distance = Math.sqrt(distanceSq);
            const opacity = (1 - distance / maxDistance) * 0.2;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop - optimized with frame skipping
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw all particles
      for (const particle of particles) {
        particle.update(ctx, time);
      }

      // Only connect particles every few frames to improve performance
      if (frameSkip === 0) {
        connectParticles();
      }
      frameSkip = (frameSkip + 1) % frameSkipThreshold;
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
      particles = []; // Help GC
    };
  }, []); // Empty dependency array ensures this runs once

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default memo(ParticleBackground);