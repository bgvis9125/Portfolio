/**
 * Space Background - Canvas Starfield
 * Creates an animated starfield with subtle parallax effect
 */

(function() {
  'use strict';

  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  const STAR_COUNT = 200;
  const MAX_DEPTH = 1;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.z = Math.random() * MAX_DEPTH;
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }

    update(time) {
      if (prefersReducedMotion) return;
      
      // Subtle twinkling
      this.currentOpacity = this.opacity + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.2;
      this.currentOpacity = Math.max(0.1, Math.min(0.8, this.currentOpacity));
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 236, 241, ${this.currentOpacity || this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  let animationId;
  let time = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    time += 1;
    
    stars.forEach(star => {
      star.update(time);
      star.draw(ctx);
    });

    animationId = requestAnimationFrame(animate);
  }

  // Initialize
  init();
  
  if (!prefersReducedMotion) {
    animate();
  } else {
    // Draw static stars for reduced motion
    stars.forEach(star => star.draw(ctx));
  }

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      stars.forEach(star => star.reset());
      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => star.draw(ctx));
      }
    }, 250);
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
})();
