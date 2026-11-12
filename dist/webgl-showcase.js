/* ==========================================================================
   KIM GIHO · 4-FLAGSHIP PORTFOLIO WEBGL 3D CAROUSEL ENGINE
   3D Cylindrical Perspective Carousel · 16:9 Beveled Glass Cards
   Zero Emojis · High-DPI Texture Anisotropy · Smooth Scroll Navigation
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. The 4 Flagship Portfolio Projects ---
  const projectsData = [
    {
      id: 'frontier',
      pill: 'FLAGSHIP 01 · 최우수 과제',
      title: 'AX Frontier · 엔터프라이즈 AI 연동 플랫폼',
      desc: '비정형 요구사항 수집부터 Cursor MCP 연동, 불변 기준선(Baseline ID) 거버넌스 및 Playwright 자동 재검증 파이프라인',
      img: 'ax-page-3.png',
      target: '#project-frontier'
    },
    {
      id: 'mobile',
      pill: 'FLAGSHIP 02 · 모바일 코어',
      title: '하이브리드 모바일 앱 런타임 플랫폼',
      desc: 'iOS WKWebView & Android WebView 저지연 비동기 RPC 통신 엔진, 다중 스택 메모리 누수 방지 및 오프라인 증분 동기화',
      img: 'mobile-platform.png',
      target: '#project-mobile'
    },
    {
      id: 'design',
      pill: 'FLAGSHIP 03 · 디자인 표준',
      title: '사내 UI 디자인 시스템 & 컴포넌트 코어',
      desc: '전사 웹·모바일 일관된 UX를 위한 3단계 디자인 토큰 아키텍처 및 Vue 3 / Tailwind CSS 기반 60+ 공통 컴포넌트 카탈로그',
      img: 'design-system.png',
      target: '#project-design'
    },
    {
      id: 'kanban',
      pill: 'FLAGSHIP 04 · 실시간 협업',
      title: '실시간 협업 칸반 이슈 트래커 (Sprintboard)',
      desc: 'WebSocket 양방향 브로드캐스팅과 Git 커밋/푸시 웹훅 이벤트 파이프라인을 결합한 이벤트 드리븐 스프린트 트래커',
      img: 'kanban-platform.png',
      target: '#project-kanban'
    }
  ];

  const totalCards = projectsData.length;

  // --- 2. Three.js Scene Variables ---
  let scene, camera, renderer, raycaster;
  let cardMeshes = [];
  let ringGroup;
  let mouseLight;
  let shadowTexture;

  let currentRotation = 0;
  let targetRotation = 0;
  let activeIndex = 0;
  let hoveredIndex = -1;

  let mouse = new THREE.Vector2(-999, -999);
  let mousePos = { x: 0, y: 0 };
  let targetCameraParallax = { x: 0, y: 0 };
  let currentCameraParallax = { x: 0, y: 0 };

  // --- 3. Responsive 3D Geometry ---
  function getCylinderRadius() {
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 0.6) return 2.6;
    if (aspect < 1.0) return 3.1;
    return 3.8;
  }

  // 16:9 Widescreen Cards to preserve authentic diagram aspect ratios!
  function getCardDimensions() {
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 0.6) {
      return { width: 1.7, height: 0.96, radius: 0.06 };
    }
    if (aspect < 1.0) {
      return { width: 2.1, height: 1.18, radius: 0.07 };
    }
    return { width: 2.65, height: 1.49, radius: 0.08 };
  }

  // Helper: Rounded Rect 2D Shape
  function createRoundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  // Soft Radial Drop Shadow Texture
  function createShadowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(64, 64, 20, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.28)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    return new THREE.CanvasTexture(canvas);
  }

  // --- 4. Initialize Three.js WebGL ---
  function initWebGL() {
    const container = document.getElementById('webgl-container');
    if (!container) return;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f8fa);

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    updateCameraPosition();

    // High-DPI Renderer (Razor-sharp text on textures)
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Raycaster
    raycaster = new THREE.Raycaster();

    // Studio Lighting - Calibrated for high contrast without washout
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(4, 7, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.6);
    fillLight.position.set(-6, -1, 4);
    scene.add(fillLight);

    // Mouse specular point light
    mouseLight = new THREE.PointLight(0xffffff, 1.4, 12);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // Rotating 3D Group
    ringGroup = new THREE.Group();
    scene.add(ringGroup);

    shadowTexture = createShadowTexture();

    build3DCards();
    initInteraction();
    window.addEventListener('resize', onWindowResize);

    animate();

    setTimeout(() => {
      onActiveCardChanged(0);
    }, 60);
  }

  function updateCameraPosition() {
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 0.6) {
      camera.position.set(0, 0.05, 8.2);
    } else if (aspect < 1.0) {
      camera.position.set(0, 0.1, 7.6);
    } else {
      camera.position.set(0, 0.15, 6.9);
    }
    camera.lookAt(0, -0.65, 0);
  }

  // --- 5. Build 4 Upright 3D Glass Cards ---
  function build3DCards() {
    cardMeshes.forEach(mesh => {
      ringGroup.remove(mesh);
      mesh.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
    });
    cardMeshes = [];

    const { width, height, radius } = getCardDimensions();
    const shape = createRoundedRectShape(width, height, radius);

    // Beveled Extrude Geometry
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015
    });
    geometry.center();

    // UVs
    const pos = geometry.attributes.position;
    const uvs = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      uvs[i * 2] = (px / width) + 0.5;
      uvs[i * 2 + 1] = (py / height) + 0.5;
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    const textureLoader = new THREE.TextureLoader();

    // Translucent glass bevel edge material with crisp subtle rim
    const glassEdgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
      transmission: 0.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.98
    });

    // Shadow plane
    const shadowGeom = new THREE.PlaneGeometry(width * 1.35, height * 1.35);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });

    const maxAnisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 16;

    projectsData.forEach((project, index) => {
      // High anisotropy texture for crisp diagram readability
      const texture = textureLoader.load(project.img);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = maxAnisotropy;

      // Crystal-clear uncompressed texture fidelity
      const frontMaterial = new THREE.MeshBasicMaterial({
        map: texture
      });

      const materials = [frontMaterial, glassEdgeMaterial];
      const mesh = new THREE.Mesh(geometry, materials);

      // Attached shadow
      const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
      shadowMesh.position.set(0, -0.04, -0.045);
      mesh.add(shadowMesh);

      mesh.userData = {
        index: index,
        project: project,
        currentScale: 1.0,
        targetScale: 1.0,
        currentZ: 0,
        targetZ: 0,
        tiltX: 0,
        tiltY: 0
      };

      ringGroup.add(mesh);
      cardMeshes.push(mesh);
    });

    updateCardPlacements();
  }

  // --- 6. Position 4 Cards in 3D Cylindrical Space (All Upright!) ---
  function updateCardPlacements() {
    const R = getCylinderRadius();

    cardMeshes.forEach((mesh, i) => {
      // Angle in XZ cylindrical space
      const angleRad = (i / totalCards) * (Math.PI * 2) + currentRotation;

      // Elliptical XZ placement: front card is closest to camera
      const x = Math.sin(angleRad) * R;
      const z = Math.cos(angleRad) * (R * 0.72) - (R * 0.28);
      const y = -0.75; // Sits comfortably in lower viewport, under the headline

      mesh.userData.currentScale += (mesh.userData.targetScale - mesh.userData.currentScale) * 0.12;

      mesh.position.set(x, y, z);

      // Tangent to cylinder around Y axis, angled towards viewer
      // Rotation Z is ALWAYS 0: Cards NEVER rotate sideways or upside down!
      mesh.rotation.y = angleRad * 0.65 + mesh.userData.tiltY;
      mesh.rotation.x = mesh.userData.tiltX;
      mesh.rotation.z = 0;

      mesh.scale.set(
        mesh.userData.currentScale,
        mesh.userData.currentScale,
        mesh.userData.currentScale
      );

      // Fade back card slightly for depth
      const depthFactor = Math.max(0, Math.min(1, (z + R) / (2 * R))); // 0 (back) to 1 (front)
      mesh.traverse(child => {
        if (child.isMesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(m => {
            if (m.opacity !== undefined && m !== child.parent?.children[0]?.material) {
              m.opacity = Math.max(0.32, 0.32 + depthFactor * 0.68);
            }
          });
        }
      });
    });

    // Detect card closest to front center
    let minDiff = Infinity;
    let closestIndex = 0;

    for (let i = 0; i < totalCards; i++) {
      const angleRad = (i / totalCards) * (Math.PI * 2) + currentRotation;
      const twoPi = Math.PI * 2;
      const norm = ((angleRad % twoPi) + twoPi) % twoPi;
      const diff = Math.min(norm, twoPi - norm);

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    if (closestIndex !== activeIndex) {
      activeIndex = closestIndex;
      onActiveCardChanged(closestIndex);
    }
  }

  // --- 7. Update Center Editorial Text ---
  function onActiveCardChanged(index) {
    const project = projectsData[index];
    if (!project) return;

    cardMeshes.forEach((mesh, idx) => {
      if (idx === index) {
        mesh.userData.targetScale = 1.1;
      } else if (idx === hoveredIndex) {
        mesh.userData.targetScale = 1.02;
      } else {
        mesh.userData.targetScale = 0.94;
      }
    });

    const pill = document.getElementById('center-pill');
    const titleEl = document.getElementById('center-title');
    const descEl = document.getElementById('center-desc');

    if (pill) pill.textContent = project.pill;

    if (titleEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        titleEl.textContent = project.title;
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 120);
    }

    if (descEl) {
      descEl.style.opacity = '0';
      descEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        descEl.textContent = project.desc;
        descEl.style.opacity = '1';
        descEl.style.transform = 'translateY(0)';
      }, 140);
    }

    updateNavSlider(project.id);
  }

  function updateNavSlider(projectId) {
    const wrapper = document.getElementById('indicator-wrapper');
    if (!wrapper) return;

    const buttons = wrapper.querySelectorAll('.nav-step');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-project') === projectId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- 8. Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);

    // Inertia damping
    const diff = targetRotation - currentRotation;
    if (Math.abs(diff) > 0.0001) {
      currentRotation += diff * 0.082;
      updateCardPlacements();
    }

    // Camera parallax
    currentCameraParallax.x += (targetCameraParallax.x - currentCameraParallax.x) * 0.05;
    currentCameraParallax.y += (targetCameraParallax.y - currentCameraParallax.y) * 0.05;

    camera.position.x = currentCameraParallax.x;
    camera.position.y = 0.15 + currentCameraParallax.y;

    if (mouseLight) {
      mouseLight.position.x = (mousePos.x / window.innerWidth - 0.5) * 7;
      mouseLight.position.y = -(mousePos.y / window.innerHeight - 0.5) * 5;
    }

    renderer.render(scene, camera);
  }

  // --- 9. Interactions ---
  function initInteraction() {
    const showcaseStage = document.getElementById('showcase-stage');

    showcaseStage.addEventListener('wheel', e => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetRotation -= delta * 0.0022;
    }, { passive: true });

    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let velocity = 0;

    showcaseStage.addEventListener('mousedown', e => {
      if (e.target.closest('button, a')) return;
      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      velocity = 0;
    });

    window.addEventListener('mousemove', e => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      targetCameraParallax.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetCameraParallax.y = -(e.clientY / window.innerHeight - 0.5) * 0.2;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      const cursor = document.getElementById('dot-cursor');

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const hitIndex = hit.userData.index;

        if (hoveredIndex !== hitIndex) {
          hoveredIndex = hitIndex;
          if (cursor) cursor.classList.add('hover');
        }

        const localPoint = intersects[0].point;
        hit.userData.tiltX = -(localPoint.y - hit.position.y) * 0.08;
        hit.userData.tiltY = (localPoint.x - hit.position.x) * 0.08;
      } else {
        if (hoveredIndex !== -1) {
          hoveredIndex = -1;
          if (cursor) cursor.classList.remove('hover');
        }
      }

      if (!isDragging) return;
      const dx = e.clientX - lastX;
      velocity = dx;
      targetRotation += dx * 0.0038;
      lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        targetRotation += velocity * 0.008;
      }
    });

    // Touch Support
    showcaseStage.addEventListener('touchstart', e => {
      if (e.target.closest('button, a')) return;
      if (e.touches.length > 0) {
        isDragging = true;
        startX = e.touches[0].clientX;
        lastX = e.touches[0].clientX;
        velocity = 0;
      }
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - lastX;
      velocity = dx;
      targetRotation += dx * 0.0045;
      lastX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        targetRotation += velocity * 0.008;
      }
    });

    // Click on 3D Card:
    // If active card clicked -> Smoothly scroll down to that project's case study (NO POPUP!)
    // If side card clicked -> Rotate that card to front smoothly!
    showcaseStage.addEventListener('click', e => {
      if (e.target.closest('button, a')) return;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const clickedIndex = clickedMesh.userData.index;
        const project = clickedMesh.userData.project;

        if (clickedIndex === activeIndex) {
          scrollToProject(project.target);
        } else {
          rotateToIndex(clickedIndex);
        }
      }
    });
  }

  // --- 10. Smooth Scrolling & Navigation ---
  window.scrollToProject = function (selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.scrollToActiveProject = function () {
    const project = projectsData[activeIndex];
    if (project) {
      scrollToProject(project.target);
    }
  };

  window.rotateToIndex = function (index) {
    if (index < 0) index = totalCards - 1;
    if (index >= totalCards) index = 0;

    const twoPi = Math.PI * 2;
    const cardAngle = (index / totalCards) * twoPi;
    const desired = -cardAngle;

    const diff = (desired - currentRotation) % twoPi;
    let shortestDiff = diff;
    if (shortestDiff > Math.PI) shortestDiff -= twoPi;
    if (shortestDiff < -Math.PI) shortestDiff += twoPi;

    targetRotation = currentRotation + shortestDiff;
  };

  // --- 11. ScrollSpy ---
  function initScrollSpy() {
    const sections = document.querySelectorAll('.project-case-study');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchProject = projectsData.find(p => p.target === `#${id}`);
          if (matchProject) {
            updateNavSlider(matchProject.id);
            const index = projectsData.indexOf(matchProject);
            if (index !== -1) rotateToIndex(index);
          }
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(sec => observer.observe(sec));
  }

  // --- 12. Dot Cursor ---
  function initDotCursor() {
    const cursor = document.getElementById('dot-cursor');
    if (!cursor) return;

    let mouseX = window.innerWidth * 0.15;
    let mouseY = window.innerHeight * 0.15;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      curX += (mouseX - curX) * 0.25;
      curY += (mouseY - curY) * 0.25;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // --- 13. Toast ---
  window.copyEmail = function () {
    const email = 'gihokim@uracle.co.kr';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(showToast);
    } else {
      showToast();
    }
  };

  function showToast() {
    const toast = document.getElementById('copy-toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- 14. Resize ---
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    updateCameraPosition();
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));

    build3DCards();
  }

  // --- 15. Init ---
  document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
    initScrollSpy();
    initDotCursor();
  });

})();
