/* ==========================================================================
   PARTICLES — lightweight ember/spark canvas background. No libraries.
   Pauses when the tab is hidden and skips entirely for prefers-reduced-motion.
   ========================================================================== */

const Particles = {
  init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let raf = null;
    let running = true;

    const COLORS = ["#ff7a2e", "#ff2e4d", "#ff9c5c"];

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      const count = Math.min(60, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 18000));
      particles = Array.from({ length: count }, spawn);
    }

    function spawn() {
      return {
        x: Math.random() * canvas.offsetWidth,
        y: canvas.offsetHeight + Math.random() * 60,
        r: 0.8 + Math.random() * 2.2,
        speed: 0.25 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.15 + Math.random() * 0.5,
        flicker: Math.random() * Math.PI * 2,
      };
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
        p.flicker += 0.05;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.flicker));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = a;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (p.y < -10) Object.assign(p, spawn(), { y: canvas.offsetHeight + 10 });
      });
      raf = requestAnimationFrame(tick);
    }

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(tick);
      else if (raf) cancelAnimationFrame(raf);
    });

    window.addEventListener("resize", resize, { passive: true });
    resize();
    tick();
  },
};
