/**
 * 3D Starfield Animation - Warp Speed Effect
 * Stars fly continuously toward the viewer
 */

class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.speed = 5; // Erhöhte Standard-Geschwindigkeit
    this.centerX = 0;
    this.centerY = 0;

    // 3 Layer-System für Tiefenverteilung
    this.layers = [
      { zMin: 700, zMax: 1000, count: 400, speedMultiplier: 0.5 },  // Fern (klein, langsam)
      { zMin: 400, zMax: 700,  count: 300, speedMultiplier: 1.0 },  // Mittel
      { zMin: 100, zMax: 400,  count: 200, speedMultiplier: 1.5 }   // Nah (groß, schnell)
    ];

    // Zoom-System für Scroll-Effekt
    this.zoomLevel = 1.0;
    this.targetZoom = 1.0;
    this.zoomSpeed = 0.05;

    this.resize();
    this.initStars();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('wheel', (e) => this.handleScroll(e));
    this.animate();
  }

  handleScroll(e) {
    const delta = e.deltaY * 0.002; // Stärkerer Zoom-Effekt
    this.targetZoom = Math.max(0.5, Math.min(2.5, this.targetZoom + delta));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  initStars() {
    this.stars = [];
    // Erstelle Sterne für jeden Layer
    this.layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        this.stars.push(this.createStar(layerIndex, true));
      }
    });
  }

  createStar(layerIndex, randomZ = false) {
    const layer = this.layers[layerIndex];
    const zRange = layer.zMax - layer.zMin;

    return {
      x: (Math.random() - 0.5) * this.canvas.width * 2,
      y: (Math.random() - 0.5) * this.canvas.height * 2,
      z: randomZ ? layer.zMin + Math.random() * zRange : layer.zMax,
      pz: 0,
      layer: layerIndex,
      speedMultiplier: layer.speedMultiplier,
      zMin: layer.zMin,
      zMax: layer.zMax,
      color: Math.random() < 0.7
        ? { r: 200, g: 220, b: 255 }
        : { r: 255, g: 255, b: 255 }
    };
  }

  animate() {
    // Smooth zoom interpolation
    this.zoomLevel += (this.targetZoom - this.zoomLevel) * this.zoomSpeed;

    // Clear with slight fade for trail effect
    this.ctx.fillStyle = 'rgba(2, 2, 4, 0.3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let star of this.stars) {
      // Store previous z for trail
      star.pz = star.z;

      // Move star toward viewer (layer-basierte Geschwindigkeit)
      star.z -= this.speed * star.speedMultiplier;

      // Reset star if it passes the minimum z for its layer
      if (star.z <= star.zMin * 0.1) {
        star.x = (Math.random() - 0.5) * this.canvas.width * 2;
        star.y = (Math.random() - 0.5) * this.canvas.height * 2;
        star.z = star.zMax;
        star.pz = star.zMax;
      }

      // Parallax zoom: nahe Sterne (höherer Layer) zoomen stärker
      const layerZoomMultiplier = 1 + (star.layer * 0.4);
      const effectiveZoom = 1 + (this.zoomLevel - 1) * layerZoomMultiplier;

      // Project 3D position to 2D screen mit Zoom
      const sx = (star.x / star.z) * 300 * effectiveZoom + this.centerX;
      const sy = (star.y / star.z) * 300 * effectiveZoom + this.centerY;

      // Previous position for trail
      const px = (star.x / star.pz) * 300 * effectiveZoom + this.centerX;
      const py = (star.y / star.pz) * 300 * effectiveZoom + this.centerY;

      // Size based on depth (closer = bigger) mit Zoom-Effekt
      const baseSize = Math.max(0.5, (1 - star.z / 1000) * 3);
      const size = baseSize * (0.8 + (effectiveZoom - 1) * 0.3);

      // Brightness based on depth
      const brightness = 1 - star.z / 1000;
      const alpha = Math.min(1, brightness * 1.5);

      // Draw star trail (line from previous to current position)
      if (star.pz < star.zMax) {
        const gradient = this.ctx.createLinearGradient(px, py, sx, sy);
        gradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0)`);
        gradient.addColorStop(1, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha})`);

        this.ctx.beginPath();
        this.ctx.moveTo(px, py);
        this.ctx.lineTo(sx, sy);
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = size;
        this.ctx.stroke();
      }

      // Draw star point
      this.ctx.beginPath();
      this.ctx.arc(sx, sy, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha})`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('starfield');
  if (canvas) {
    window.starfield = new Starfield(canvas);
  }
});
