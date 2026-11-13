/* ==========================================================================
   KIM GIHO · APPLE STUDIO COVER FLOW 3D SHOWCASE ENGINE
   Magnetic Discrete Snapping · 100% Flat Active Card (Zero Skew/Angle Distortion)
   Gentle Flank Tilt (16°) · Direct Page Navigation · Zero Emojis
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. The 4 Flagship Portfolio Projects ---
  const projectsData = [
    {
      id: 'frontier',
      pill: 'FLAGSHIP 01 · 사내 최우수 과제',
      title: 'AX Frontier · 엔터프라이즈 AI 연동 플랫폼',
      desc: '비정형 요구사항 수집부터 Cursor MCP 연동, 불변 기준선(Baseline ID) 거버넌스 및 Playwright 자동 재검증 파이프라인',
      img: 'ax-frontier-main.png',
      target: '#project-frontier',
      pageUrl: 'ax-frontier.html'
    },
    {
      id: 'clue',
      pill: 'FLAGSHIP 02 · 1인 개인 개발 · Render 라이브 데모',
      title: 'Clue Observability · 하이브리드 APM 관제 플랫폼',
      desc: '기획부터 풀스택·SDK까지 100% 1인 개인 개발. 웹뷰 RPC 오류와 AOS·iOS 크래시, 6대 APM 및 심볼리케이터가 Render에서 실제 작동하는 라이브 데모',
      img: 'clue-screen-issues.png',
      target: '#project-clue',
      pageUrl: 'clue.html'
    },
    {
      id: 'shorts',
      pill: 'FLAGSHIP 03 · 숏폼 커머스 & AI 챗봇',
      title: 'Shorts Player · 세로형 비디오 & 샌드박스',
      desc: 'YouTube Shorts 감성 9:16 세로형 플레이어, 실시간 멀티 슬라이드 제어 샌드박스, AI 리뷰 요약 해시태그 및 대화형 챗봇 연동',
      img: 'shorts-preview.png',
      target: '#project-shorts',
      pageUrl: 'messageai-shorts.html'
    },
    {
      id: 'health',
      pill: 'FLAGSHIP 04 · 사내 AI 경진대회 1등(대상)',
      title: 'HeAlth AI · 하이브리드 헬스케어 플랫폼',
      desc: 'Flutter 네이티브 모션 포즈·전신 카메라와 Vue WebView를 4개 브리지로 결합해 GPT-4o 식단·체형·30일 챌린지를 통합한 1위 수상작 (디지털타임스 보도)',
      img: 'health-ai-preview.png?v=20261113h2',
      target: '#project-health',
      pageUrl: 'health-ai.html'
    }
  ];

  const totalCards = projectsData.length;

  // --- 2. State & Three.js Variables ---
  let scene, camera, renderer, raycaster;
  let cardMeshes = [];
  let ringGroup;
  let shadowTexture;

  // Discrete Cover Flow State
  let targetIndex = 0;
  let currentIndex = 0;
  let lastReportedIndex = -1;
  let hoveredIndex = -1;

  let mouse = new THREE.Vector2(-999, -999);
  let mousePos = { x: 0, y: 0 };
  let targetCameraParallax = { x: 0, y: 0 };
  let currentCameraParallax = { x: 0, y: 0 };

  // Responsive Dimensions
  function isMobile() {
    return window.innerWidth < 768;
  }

  function getCardDimensions() {
    if (isMobile()) {
      return { width: 2.1, height: 1.18, radius: 0.07 };
    }
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 1.0) {
      return { width: 2.4, height: 1.35, radius: 0.075 };
    }
    return { width: 2.8, height: 1.575, radius: 0.08 };
  }

  function getFlankSpacing() {
    if (isMobile()) return 1.95;
    if (window.innerWidth < 1200) return 2.65;
    return 3.2;
  }

  // Rounded Rectangle Shape
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

    const grad = ctx.createRadialGradient(64, 64, 22, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.06)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    return new THREE.CanvasTexture(canvas);
  }

  // --- 3. Initialize WebGL Scene ---
  function initWebGL() {
    const container = document.getElementById('webgl-container');
    if (!container) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f8fa);

    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 100);
    updateCameraPosition();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(4, 7, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.55);
    fillLight.position.set(-6, -1, 4);
    scene.add(fillLight);

    ringGroup = new THREE.Group();
    scene.add(ringGroup);

    shadowTexture = createShadowTexture();

    build3DCards();
    initInteraction();
    initKeyboard();
    window.addEventListener('resize', onWindowResize);

    animate();

    const linkedProject = projectsData.findIndex(project => project.target === location.hash);
    if (linkedProject !== -1) {
      currentIndex = targetIndex = linkedProject;
      updateCardPlacements();
    }
    updateActiveUI(Math.round(targetIndex));
  }

  function updateCameraPosition() {
    if (isMobile()) {
      camera.position.set(0, 0.05, 8.2);
    } else {
      camera.position.set(0, 0.12, 6.8);
    }
    camera.lookAt(0, -0.68, 0);
  }

  // --- 4. Build 3D Cards ---
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012
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

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = () => {
      const opening = window.portfolioOpening;
      if (opening?.active && opening.startedAt === null) opening.startedAt = performance.now();
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const glassEdgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
      transmission: 0,
      ior: 1.5,
      transparent: true,
      opacity: 0.95
    });

    const shadowGeom = new THREE.PlaneGeometry(width * 1.3, height * 1.3);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.38,
      depthWrite: false
    });

    const maxAnisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 16;

    projectsData.forEach((project, index) => {
      const texture = textureLoader.load(project.img);
      texture.encoding = THREE.sRGBEncoding;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = maxAnisotropy;

      const frontMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false,
        transparent: true,
        opacity: 1.0
      });

      const materials = [frontMaterial, glassEdgeMaterial];
      const mesh = new THREE.Mesh(geometry, materials);

      const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat.clone());
      shadowMesh.position.set(0, -0.04, -0.04);
      mesh.add(shadowMesh);

      mesh.userData = {
        index: index,
        project: project,
        frontMat: frontMaterial,
        shadowMat: shadowMesh.material,
        tiltX: 0,
        tiltY: 0
      };

      ringGroup.add(mesh);
      cardMeshes.push(mesh);
    });

    updateCardPlacements();
  }

  // --- 5. Precision Apple Cover Flow Math ---
  // Guaranteed: Active card is ALWAYS 100% FLAT (rotation.y = 0, z = front)
  function updateCardPlacements(now = performance.now()) {
    const opening = window.portfolioOpening;
    const progress = opening?.active
      ? Math.min(1, Math.max(0, (now - (opening.startedAt ?? now)) / opening.duration))
      : 1;
    const settle = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
    const remaining = 1 - settle;
    const spacing = getFlankSpacing();
    const yPos = isMobile() ? -0.80 : -0.70;

    cardMeshes.forEach((mesh, i) => {
      // Calculate circular signed distance from current center
      let d = (i - currentIndex) % totalCards;
      if (d > totalCards / 2) d -= totalCards;
      if (d < -totalCards / 2) d += totalCards;

      const absD = Math.abs(d);
      let x = 0;
      let z = 0;
      let rotY = 0;
      let scale = 1.0;
      let opacity = 1.0;

      if (absD <= 1.0) {
        // Between Active Center (d = 0) and Flank (d = ±1)
        x = d * spacing;
        z = 1.15 - absD * 1.45;
        // GENTLE Cover Flow Angle (at d=1, angle is -16 degrees, NOT 65 degrees!)
        rotY = -d * 0.28;
        scale = 1.16 - absD * 0.26;
        opacity = 1.0 - absD * 0.38;
      } else {
        // Cards wrapping around the back (1.0 < absD <= 2.0)
        const t = Math.min(1.0, absD - 1.0);
        const sign = d > 0 ? 1 : -1;
        x = sign * (spacing * (1.0 - t * 0.92));
        z = -0.30 - t * 1.8;
        rotY = -sign * 0.28 * (1.0 - t);
        scale = 0.90 - t * 0.32;
        opacity = Math.max(0, 0.62 * (1 - t));
      }

      // Add gentle interactive tilt on active card hover
      if (absD < 0.3) {
        mesh.rotation.x = mesh.userData.tiltX;
        mesh.rotation.y = rotY + mesh.userData.tiltY;
      } else {
        mesh.rotation.x = 0;
        mesh.rotation.y = rotY;
      }
      const angle = (i / totalCards) * Math.PI * 2 + progress * Math.PI * 0.55;
      const orbitRadiusX = isMobile() ? 1.85 : 2.55;
      mesh.rotation.x += remaining * 0.32;
      mesh.rotation.y += remaining * Math.sin(angle) * 0.7;
      mesh.rotation.z = remaining * Math.cos(angle) * 0.14;
      x = x * settle + Math.cos(angle) * orbitRadiusX * remaining;
      z = z * settle + (-1.25 + Math.sin(angle) * 0.55) * remaining;
      scale = (scale * settle + 0.88 * remaining) * (0.20 + 0.80 * settle);
      opacity = (opacity * settle + 0.96 * Math.pow(remaining, 0.55)) * Math.min(1, progress * 7);
      const entranceY = Math.sin(angle) * 1.15 * remaining;

      mesh.position.set(x, yPos + entranceY, z);
      mesh.scale.set(scale, scale, scale);

      // Apply opacity
      if (mesh.userData.frontMat) {
        mesh.userData.frontMat.opacity = Math.max(0, opacity);
      }
      if (mesh.userData.shadowMat) {
        mesh.userData.shadowMat.opacity = opacity * 0.38;
      }
    });


  }

  // --- 6. Update Editorial & Controls UI ---
  function updateActiveUI(index) {
    const project = projectsData[index];
    if (!project) return;

    const pill = document.getElementById('center-pill');
    const titleEl = document.getElementById('center-title');
    const descEl = document.getElementById('center-desc');
    const detailLink = document.getElementById('showcase-detail-link');

    if (pill) pill.textContent = project.pill;

    if (titleEl) titleEl.textContent = project.title;
    if (descEl) descEl.textContent = project.desc;

    document.querySelectorAll('.nav-step[data-project]').forEach(link => {
      const selected = link.dataset.project === project.id;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    if (detailLink) {
      detailLink.href = project.pageUrl;
      const span = detailLink.querySelector('span');
      if (span) {
        span.textContent = `${project.id.toUpperCase()} 심층 연구 페이지 보기`;
      }
    }

    const position = document.getElementById('carousel-position');
    if (position) {
      const current = String(index + 1).padStart(2, '0');
      const total = String(totalCards).padStart(2, '0');
      position.textContent = current + ' / ' + total;
    }
  }

  // --- 7. Animation Loop with Magnetic Damping ---
  let previousFrame;
  let wasOpening = false;
  function animate(now = performance.now()) {
    requestAnimationFrame(animate);
    const frame = Math.min((now - (previousFrame ?? now)) / (1000 / 60), 3);
    previousFrame = now;
    const selected = ((Math.round(targetIndex) % totalCards) + totalCards) % totalCards;
    if (selected !== lastReportedIndex) {
      lastReportedIndex = selected;
      updateActiveUI(selected);
    }
    if (renderer.domElement.getBoundingClientRect().bottom <= 0) return;

    // Smooth Lerp Damping towards target index
    const diff = targetIndex - currentIndex;
    if (Math.abs(diff) > 0.0002) {
      currentIndex += diff * (1 - Math.pow(0.912, frame));
      updateCardPlacements();
    }

    const opening = window.portfolioOpening;
    if (opening?.active || wasOpening) {
      updateCardPlacements(now);
      if (opening?.active && opening.startedAt !== null &&
          now - opening.startedAt >= opening.duration) {
        window.dispatchEvent(new Event('showcase-entered'));
      }
      wasOpening = Boolean(opening?.active);
    }

    // Parallax Camera Easing
    currentCameraParallax.x += (targetCameraParallax.x - currentCameraParallax.x) * (1 - Math.pow(0.95, frame));
    currentCameraParallax.y += (targetCameraParallax.y - currentCameraParallax.y) * (1 - Math.pow(0.95, frame));

    camera.position.x = currentCameraParallax.x;
    camera.position.y = (isMobile() ? 0.05 : 0.12) + currentCameraParallax.y;

    renderer.render(scene, camera);
  }

  // --- 8. Public Navigation Commands ---
  window.navigateStage = function (delta) {
    targetIndex = Math.round(targetIndex) + delta;
  };

  window.rotateToIndex = function (index) {
    const currentInt = Math.round(currentIndex);
    const currentNorm = ((currentInt % totalCards) + totalCards) % totalCards;
    let diff = index - currentNorm;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;
    targetIndex = currentInt + diff;
  };

  window.scrollToActiveProject = function () {
    const activeInt = ((Math.round(currentIndex) % totalCards) + totalCards) % totalCards;
    const project = projectsData[activeInt];
    if (project && project.target) {
      const el = document.querySelector(project.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  window.scrollToProject = function (selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 9. Interactions: Drag, Touch, Wheel, Click ---
  function initInteraction() {
    const stage = document.getElementById('showcase-stage');
    if (!stage) return;

    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let dragDistance = 0;
    let velocity = 0;
    let lastWheelEvent = -Infinity;

    document.querySelectorAll('.nav-step[data-project]').forEach(link => {
      link.addEventListener('click', () => {
        const index = projectsData.findIndex(project => project.id === link.dataset.project);
        if (index !== -1) window.rotateToIndex(index);
      });
    });

    stage.addEventListener('wheel', event => {
      if (event.ctrlKey || event.target !== renderer.domElement) return;
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (!delta) return;

      const bounds = renderer.domElement.getBoundingClientRect();
      mouse.set((event.clientX - bounds.left) / bounds.width * 2 - 1,
        1 - (event.clientY - bounds.top) / bounds.height * 2);
      raycaster.setFromCamera(mouse, camera);
      if (!raycaster.intersectObjects(cardMeshes).some(({ object }) => object.userData.frontMat.opacity > 0.1)) return;

      event.preventDefault();
      const now = performance.now();
      if (now - lastWheelEvent > 160) window.navigateStage(Math.sign(delta));
      lastWheelEvent = now;
    }, { passive: false });

    // Mouse Drag
    stage.addEventListener('mousedown', e => {
      if (e.target.closest('button, a')) return;
      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      dragDistance = 0;
      velocity = 0;
    });

    window.addEventListener('mousemove', e => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      targetCameraParallax.x = (e.clientX / window.innerWidth - 0.5) * 0.32;
      targetCameraParallax.y = -(e.clientY / window.innerHeight - 0.5) * 0.16;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Raycast for hover
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
        hit.userData.tiltX = -(localPoint.y - hit.position.y) * 0.05;
        hit.userData.tiltY = (localPoint.x - hit.position.x) * 0.05;
      } else {
        if (hoveredIndex !== -1) {
          hoveredIndex = -1;
          if (cursor) cursor.classList.remove('hover');
        }
      }

      if (!isDragging) return;

      const dx = e.clientX - lastX;
      dragDistance += Math.abs(dx);
      velocity = dx;

      // Drag sensitivity calibrated for smooth tracking
      targetIndex -= dx * 0.0032;
      lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;

      // Magnetic Snap to nearest integer with flick detection
      if (Math.abs(velocity) > 6) {
        targetIndex = Math.round(targetIndex - Math.sign(velocity) * 0.4);
      } else {
        targetIndex = Math.round(targetIndex);
      }
    });

    // Touch Support
    stage.addEventListener('touchstart', e => {
      if (e.target.closest('button, a')) return;
      if (e.touches.length > 0) {
        isDragging = true;
        startX = e.touches[0].clientX;
        lastX = e.touches[0].clientX;
        dragDistance = 0;
        velocity = 0;
      }
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!isDragging || e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const dx = clientX - lastX;
      dragDistance += Math.abs(dx);
      velocity = dx;

      targetIndex -= dx * 0.004;
      lastX = clientX;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      if (Math.abs(velocity) > 5) {
        targetIndex = Math.round(targetIndex - Math.sign(velocity) * 0.4);
      } else {
        targetIndex = Math.round(targetIndex);
      }
    });

    // Card Click Handler:
    // If ACTIVE card clicked -> Direct navigation to dedicated page!
    // If FLANK card clicked -> Snap that card into active center!
    stage.addEventListener('click', e => {
      if (e.target.closest('button, a')) return;
      if (dragDistance > 8) return; // Prevent click on drag release

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const clickedIndex = clickedMesh.userData.index;
        const project = clickedMesh.userData.project;

        const activeInt = ((Math.round(currentIndex) % totalCards) + totalCards) % totalCards;

        if (clickedIndex === activeInt) {
          // Direct navigation to dedicated case study page!
          window.location.href = project.pageUrl;
        } else {
          // Bring flank card smoothly to center
          window.rotateToIndex(clickedIndex);
        }
      }
    });
  }

  // --- 10. Keyboard Accessibility ---
  function initKeyboard() {
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        window.navigateStage(-1);
      } else if (e.key === 'ArrowRight') {
        window.navigateStage(1);
      } else if (e.key === 'Enter') {
        const activeInt = ((Math.round(currentIndex) % totalCards) + totalCards) % totalCards;
        const project = projectsData[activeInt];
        if (project && document.activeElement.id === 'showcase-stage') {
          window.location.href = project.pageUrl;
        }
      }
    });
  }

  // --- 11. Dot Cursor ---
  function initDotCursor() {
    const cursor = document.getElementById('dot-cursor');
    if (!cursor) return;

    let mouseX = window.innerWidth * 0.2;
    let mouseY = window.innerHeight * 0.2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
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

  // --- 11. Header Logo Click: Smooth Scroll to Top & Clean Hash ---
  function initHeaderLogo() {
    const brand = document.querySelector('.header-brand');
    if (!brand) return;
    brand.addEventListener('click', (e) => {
      // If we are on the homepage, scroll smoothly to the top and reset the 3D showcase
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.rotateToIndex(0);
      e.preventDefault();
    });
  }

  // --- 12. Toast for Email Copy ---
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

  // --- 13. Window Resize ---
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    updateCameraPosition();
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    build3DCards();
  }

  // --- 14. Bootstrapping ---
  document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
    initDotCursor();
    initHeaderLogo();
  });

})();
