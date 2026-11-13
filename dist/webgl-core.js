/* ==========================================================================
   KIM GIHO · INKWELL-INSPIRED FLUID 3D WEBGL ENGINE (THREE.JS)
   Centered Organic Morphing Fluid Core · Hairline Orbital Rings · Ambient Physics
   High Performance 60fps · Zero Emojis · Editorial Paper & Ink Aesthetic
   ========================================================================== */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js library not loaded. Waiting...');
    return;
  }

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // --- 1. Scene, Camera, High-Performance WebGL Renderer ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 10.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // --- 2. Lighting System (Inkwell Soft Studio Light) ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  // Key Top-Right Crisp White Light
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(6, 10, 8);
  scene.add(keyLight);

  // Fill Cobalt Rim Light
  const rimLight = new THREE.DirectionalLight(0x2563eb, 1.8);
  rimLight.position.set(-8, -5, -6);
  scene.add(rimLight);

  // Soft Sky Blue Specular Light
  const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
  fillLight.position.set(0, -8, 6);
  scene.add(fillLight);

  // --- 3. Centered Inkwell Fluid Morphing Core ---
  const fluidGroup = new THREE.Group();
  scene.add(fluidGroup);

  // (A) Organic Morphing Fluid Sphere Geometry
  const baseRadius = 2.4;
  const sphereGeo = new THREE.IcosahedronGeometry(baseRadius, 28);
  const origPositions = new Float32Array(sphereGeo.attributes.position.array);

  // Material: Clean porcelain chrome with soft pearlescent sheen
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.15,
    metalness: 0.32,
    flatShading: false
  });

  const morphSphere = new THREE.Mesh(sphereGeo, sphereMat);
  fluidGroup.add(morphSphere);

  // (B) Hairline Orbital Rings (Inkwell Fine Geometry)
  const ring1Geo = new THREE.TorusGeometry(3.6, 0.016, 16, 128);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x172026, transparent: true, opacity: 0.22 });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3.2;
  fluidGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(4.2, 0.012, 16, 128);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.28 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 3.8;
  ring2.rotation.x = -Math.PI / 4.2;
  fluidGroup.add(ring2);

  // (C) Satellite Data Beads
  const beads = [];
  const beadCount = 4;
  for (let i = 0; i < beadCount; i++) {
    const beadGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const beadMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0x172026 : 0x2563eb,
      roughness: 0.2,
      metalness: 0.8
    });
    const beadMesh = new THREE.Mesh(beadGeo, beadMat);
    const radius = 3.6 + (i * 0.35);
    const speed = 0.006 + (i * 0.002);
    const offset = (i / beadCount) * Math.PI * 2;
    fluidGroup.add(beadMesh);
    beads.push({ mesh: beadMesh, radius, speed, angle: offset, tilt: (i - 1.5) * 0.3 });
  }

  // --- 4. Mouse Tracking & Inertia Controls ---
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;
  let scrollY = 0;
  let targetScrollY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, { passive: true });

  // --- 5. 60fps Morphing & Render Loop ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Fluid vertex noise displacement
    const pos = sphereGeo.attributes.position;
    const count = pos.count;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = origPositions[i3];
      const oy = origPositions[i3 + 1];
      const oz = origPositions[i3 + 2];

      const u1 = Math.sin(ox * 1.5 + elapsed * 1.4);
      const u2 = Math.cos(oy * 1.5 + elapsed * 1.6);
      const u3 = Math.sin(oz * 1.3 + elapsed * 1.2);
      const displacement = (u1 * u2 + u3 * 0.5) * 0.18;

      const factor = 1.0 + displacement;
      pos.setXYZ(i, ox * factor, oy * factor, oz * factor);
    }
    pos.needsUpdate = true;
    sphereGeo.computeVertexNormals();

    // Rotate sphere and rings
    morphSphere.rotation.y = elapsed * 0.16;
    morphSphere.rotation.x = elapsed * 0.11;

    ring1.rotation.z += 0.005;
    ring2.rotation.z -= 0.006;
    ring2.rotation.x += 0.003;

    // Orbit beads
    beads.forEach(b => {
      b.angle += b.speed;
      const bx = Math.cos(b.angle) * b.radius;
      const bz = Math.sin(b.angle) * b.radius;
      const by = Math.sin(b.angle * 2) * b.tilt;
      b.mesh.position.set(bx, by, bz);
    });

    // Smooth camera mouse parallax and scroll travel
    targetCamX += (mouseX * 1.4 - targetCamX) * 0.045;
    targetCamY += (-mouseY * 1.0 - targetCamY) * 0.045;
    targetScrollY += (scrollY - targetScrollY) * 0.06;

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, targetScrollY / maxScroll);

    // Dynamic camera and sphere position based on scroll
    camera.position.x = targetCamX;
    camera.position.y = targetCamY - (scrollProgress * 2.5);
    camera.position.z = 10.5 - (scrollProgress * 1.5);
    camera.lookAt(0, -scrollProgress * 2.0, 0);

    // Sphere tilts slightly with mouse
    fluidGroup.rotation.y = mouseX * 0.25;
    fluidGroup.rotation.x = -mouseY * 0.2;

    renderer.render(scene, camera);
  }

  animate();

})();
