/* ==========================================================================
   KIM GIHO · INKWELL HIGH-FIDELITY WEBGL 3D CAROUSEL ENGINE
   Reverse-Engineered from https://inkwell.tech/
   Rounded Bevel Glass Cards · 3D Orbital Physics · Realtime Specular Light
   Dynamic Parallax & Smooth Lenis Easing Physics · Zero Emojis
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Project & Architecture Cards Dataset (22 Cards) ---
  const ringCardsData = [
    // 0: Intro (Kim Giho Portfolio Overview)
    {
      id: 'intro-01',
      category: 'intro',
      categoryLabel: 'INTRO',
      title: 'The future is built on Artificial Intelligence.',
      desc: '비정형 요구사항 수집부터 IDE 에이전트(Cursor MCP) 연동, Playwright 브라우저 자동 검증과 배포까지',
      img: 'apple-hero.png'
    },

    // 1-3: Vision & Architecture Governance (3 Cards)
    {
      id: 'vis-01',
      category: 'vision',
      categoryLabel: 'VISION',
      title: '사내 AX 혁신 프로젝트 최우수 과제 선정 (2026.10)',
      desc: '전사 임직원 대상 시연 발표 및 2027 실무 적용 확정 (4인 팀 리드로서 아키텍처 총괄)',
      img: 'dusk.jpg'
    },
    {
      id: 'vis-02',
      category: 'vision',
      categoryLabel: 'VISION',
      title: '설계와 구현의 1:1 불변 무결성 (Traceable Baseline ID)',
      desc: '설계가 변경되면 이전 승인을 무효화하고 테스트 통과를 강제하는 불변 거버넌스',
      img: 'ax-page-7.png'
    },
    {
      id: 'vis-03',
      category: 'vision',
      categoryLabel: 'VISION',
      title: '개발팀 병목을 없애는 DX 에이전틱 자동화 파이프라인',
      desc: '수동 검증과 산출물 정리를 자동화하여 본질적인 핵심 로직 구현에 집중하도록 지원',
      img: 'horizon.jpg'
    },

    // 4-10: AX Frontier Presentation Slides (7 Cards)
    {
      id: 'ax-01',
      category: 'frontier',
      categoryLabel: 'AX FRONTIER',
      title: '01 / 07 · 플랫폼 전체 아키텍처 구성도',
      desc: '메일 수집부터 IDE 에이전트 연동, Playwright 테스트 검증과 CI 배포까지 아우르는 엔터프라이즈 AI 플랫폼',
      img: 'ax-frontier-main.png'
    },
    {
      id: 'ax-02',
      category: 'frontier',
      categoryLabel: 'AX FRONTIER',
      title: '02 / 07 · 업무 도구를 하나의 흐름으로 (웹·IDE·AI 연동 경계)',
      desc: '웹·IDE·AI와 외부 서비스(Redmine, Slack, Git)를 연결하는 플랫폼 구조와 책임 분리',
      img: 'ax-page-3.png'
    },
    {
      id: 'ax-03',
      category: 'frontier',
      categoryLabel: 'AX FRONTIER',
      title: '03 / 07 · IDE에서 작업하고 플랫폼에서 확인 (Cursor MCP & Hooks)',
      desc: 'Cursor MCP 및 Hooks를 통한 일감 맥락 자동 주입과 구조화된 작업 결과 실시간 제출',
      img: 'ax-page-5.png'
    },
    {
      id: 'ax-04',
      category: 'frontier',
      categoryLabel: 'AX FRONTIER',
      title: '04 / 07 · 문서 저장보다 중요한 기준선(Baseline) 관리',
      desc: '요구사항과 설계의 불변 기준선(Baseline ID) 관리 및 설계 변경 시 재검증 강제 트리거',
      img: 'ax-page-7.png'
    },
    {
      id: 'ax-05',
      category: 'frontier',
      categoryLabel: 'AX FRONTIER',
      title: '05 / 07 · 변경된 설계에 맞춘 Playwright 재검증 & 증적 결합',
      desc: '설계 버전과 Playwright 브라우저 테스트 결과를 1:1로 결합해 완료 판정 및 0-회귀 보증',
      img: 'ax-page-9.png'
    },
    {
      id: 'ax-06',
      category: 'frontier',
      categoryLabel: 'AX FRONTIER',
      title: '06 / 07 · 해결 경험을 팀의 지식으로 (출처 제공 RAG 챗봇)',
      desc: '일감의 커밋과 산출물에서 노하우를 자동 추출하고 출처를 제공하는 플레이북 챗봇',
      img: 'ax-page-12.png'
    },
    {
      id: 'ax-07',
      category: 'frontier',
      categoryLabel: 'AX FRONTIER',
      title: '07 / 07 · GitLab CI 빌드와 증분 리소스 패키징',
      desc: 'CI 파이프라인 자동 실행, APK/IPA 산출물 검증, 변경 웹 리소스 증분 ZIP 패키징',
      img: 'ax-page-13.png'
    },

    // 11-14: Hybrid Mobile Platform (4 Cards)
    {
      id: 'mob-01',
      category: 'mobile',
      categoryLabel: 'MOBILE PLATFORM',
      title: '하이브리드 모바일 앱 브릿지 플랫폼 아키텍처',
      desc: 'iOS 및 Android 네이티브 환경에서 웹뷰와 네이티브 간 안정적인 비동기 RPC 통신 브릿지 설계',
      img: 'apple-mobile.png'
    },
    {
      id: 'mob-02',
      category: 'mobile',
      categoryLabel: 'MOBILE PLATFORM',
      title: 'iOS WKWebView & Android WebView RPC 프로토콜',
      desc: '생체인증, 파일 제어, 푸시, 암호화 스토리지를 안전하게 호출하는 저지연 브릿지 런타임',
      img: 'ray.png'
    },
    {
      id: 'mob-03',
      category: 'mobile',
      categoryLabel: 'MOBILE PLATFORM',
      title: '웹뷰 메모리 누수 방지 & 라이프사이클 통제',
      desc: '복수 웹뷰 간의 네비게이션 스택 관리 및 장기 실행 앱의 안정적 메모리 해제 보증',
      img: 'space.jpg'
    },
    {
      id: 'mob-04',
      category: 'mobile',
      categoryLabel: 'MOBILE PLATFORM',
      title: '오프라인 캐싱 & 웹 리소스 동적 동기화',
      desc: '네트워크 단절 시에도 핵심 업무를 지속할 수 있는 로컬 암호화 캐시와 증분 업데이트',
      img: 'apple-projects.png'
    },

    // 15-17: Design System (3 Cards)
    {
      id: 'ds-01',
      category: 'design',
      categoryLabel: 'DESIGN SYSTEM',
      title: '사내 공통 UI 디자인 시스템 & 컴포넌트 라이브러리',
      desc: '전사 웹 애플리케이션 및 모바일 웹뷰에 일관된 UX를 제공하는 디자인 토큰 기반 UI 코어',
      img: 'stripe-casestudy.png'
    },
    {
      id: 'ds-02',
      category: 'design',
      categoryLabel: 'DESIGN SYSTEM',
      title: 'Vue 3 & Tailwind CSS 디자인 토큰 시스템',
      desc: '색상, 타이포그래피, 여백 토큰의 중앙 통제 및 테마별 다크/라이트 모드 자동 전파',
      img: 'stripe-projects.png'
    },
    {
      id: 'ds-03',
      category: 'design',
      categoryLabel: 'DESIGN SYSTEM',
      title: 'Storybook 컴포넌트 카탈로그 & 접근성(A11y) 표준',
      desc: '디자이너-개발자 간 협업 표준을 위한 시각적 문서화 및 WCAG 웹 접근성 검증',
      img: 'horizon.jpg'
    },

    // 18-21: Tech Stack & Realtime Kanban (4 Cards)
    {
      id: 'tech-01',
      category: 'tech',
      categoryLabel: 'TECH STACK',
      title: '실시간 협업 칸반 이슈 트래커 (Sprintboard)',
      desc: '개발팀의 스프린트 진행 상태와 커밋 이력을 한 화면에서 실시간 추적하는 WebSocket 칸반',
      img: 'apple-projects.png'
    },
    {
      id: 'tech-02',
      category: 'tech',
      categoryLabel: 'TECH STACK',
      title: 'WebSocket 실시간 브로드캐스팅 & Git 연동',
      desc: '일감 상태 변경과 브랜치 푸시 이벤트를 실시간으로 동기화하는 이벤트 드리븐 아키텍처',
      img: 'dusk.jpg'
    },
    {
      id: 'tech-03',
      category: 'tech',
      categoryLabel: 'TECH STACK',
      title: 'TypeScript & Vue 3 엔터프라이즈 프론트엔드',
      desc: '엄격한 타입 세이프티와 반응형 상태 관리(Pinia)를 적용한 고성능 SPA 아키텍처',
      img: 'stripe-casestudy.png'
    },
    {
      id: 'tech-04',
      category: 'tech',
      categoryLabel: 'TECH STACK',
      title: 'Node.js & Express RESTful API 플랫폼 백엔드',
      desc: 'MongoDB Atlas와 분산 세션을 연동한 고가용성 마이크로서비스 백엔드 시스템',
      img: 'space.jpg'
    }
  ];

  const totalCards = ringCardsData.length;

  // --- 2. Three.js Scene Variables ---
  let scene, camera, renderer, raycaster;
  let cardMeshes = [];
  let ringGroup;
  let mouseLight;
  let orbitalLine;
  let shadowTexture;

  let currentRotation = 0;
  let targetRotation = 0;
  let activeIndex = 0;
  let hoveredIndex = -1;

  let mouse = new THREE.Vector2(-999, -999);
  let mousePos = { x: 0, y: 0 };
  let targetCameraParallax = { x: 0, y: 0 };
  let currentCameraParallax = { x: 0, y: 0 };

  // --- 3. Dynamic Responsive Dimensions ---
  function getSceneRadius() {
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 0.6) return 1.25; // Mobile portrait
    if (aspect < 1.0) return 1.55; // Tablet portrait
    if (aspect < 1.3) return 1.85; // Small laptop
    return 2.05; // Standard desktop
  }

  function getCardDimensions() {
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 0.6) {
      return { width: 0.25, height: 0.35, radius: 0.025 };
    }
    if (aspect < 1.0) {
      return { width: 0.32, height: 0.44, radius: 0.03 };
    }
    return { width: 0.42, height: 0.58, radius: 0.04 };
  }

  // Helper: Create rounded rectangle 2D shape
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

  // Create soft drop shadow texture dynamically
  function createShadowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(64, 64, 20, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
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
    camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    updateCameraPosition();

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Raycaster
    raycaster = new THREE.Raycaster();

    // Lighting (Physical Studio Environment)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(4, 7, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 0.9);
    fillLight.position.set(-5, -4, 4);
    scene.add(fillLight);

    // Mouse specular light (creates real-time glass glints)
    mouseLight = new THREE.PointLight(0xffffff, 2.4, 8);
    mouseLight.position.set(0, 0, 3.5);
    scene.add(mouseLight);

    // Rotating group
    ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Pre-create shadow texture
    shadowTexture = createShadowTexture();

    // Build components
    buildOrbitalGuide();
    build3DCards();

    // Events
    initInteraction();
    window.addEventListener('resize', onWindowResize);

    // Render loop
    animate();

    // Initial activation
    setTimeout(() => {
      onActiveCardChanged(0);
    }, 60);
  }

  function updateCameraPosition() {
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 0.6) {
      camera.position.set(0, 0, 9.2);
    } else if (aspect < 1.2) {
      camera.position.set(0, 0, 8.8);
    } else {
      camera.position.set(0, 0, 8.5);
    }
    camera.lookAt(0, 0, 0);
  }

  // --- 5. Hairline Orbital Guide Line ---
  function buildOrbitalGuide() {
    if (orbitalLine) {
      scene.remove(orbitalLine);
      orbitalLine.geometry.dispose();
      orbitalLine.material.dispose();
    }

    const radius = getSceneRadius();
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(140);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: 0x1e272d,
      transparent: true,
      opacity: 0.065,
      linewidth: 1
    });

    orbitalLine = new THREE.Line(geometry, material);
    orbitalLine.position.z = -0.06;
    scene.add(orbitalLine);
  }

  // --- 6. Build 3D Rounded Glass Cards ---
  function build3DCards() {
    // Clear old meshes
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

    // Rounded Extrude Geometry with Bevel
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.008
    });
    geometry.center();

    // UV mapping for front texture
    const pos = geometry.attributes.position;
    const uvs = new Float32Array((pos.count) * 2);
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      uvs[i * 2] = (px / width) + 0.5;
      uvs[i * 2 + 1] = (py / height) + 0.5;
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    const textureLoader = new THREE.TextureLoader();

    // Shared translucent frosted edge material
    const glassEdgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.35,
      ior: 1.5,
      transparent: true,
      opacity: 0.95
    });

    // Shadow plane geometry
    const shadowGeom = new THREE.PlaneGeometry(width * 1.5, height * 1.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });

    ringCardsData.forEach((data, index) => {
      // Texture
      const texture = textureLoader.load(data.img);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.22,
        metalness: 0.03
      });

      // Material 0: front/back, Material 1: bevel sides
      const materials = [frontMaterial, glassEdgeMaterial];
      const mesh = new THREE.Mesh(geometry, materials);

      // Attach soft drop shadow behind the card
      const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
      shadowMesh.position.set(0, -0.02, -0.035);
      mesh.add(shadowMesh);

      mesh.userData = {
        index: index,
        data: data,
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

  // --- 7. Calculate 3D Tangential Card Positions ---
  function updateCardPlacements() {
    const radius = getSceneRadius();

    cardMeshes.forEach((mesh, i) => {
      const angleRad = (i / totalCards) * (Math.PI * 2) + currentRotation;

      // Position along circle
      const x = Math.sin(angleRad) * radius;
      const y = Math.cos(angleRad) * radius;

      // Smooth Z elevation & Scale damping
      mesh.userData.currentZ += (mesh.userData.targetZ - mesh.userData.currentZ) * 0.12;
      mesh.userData.currentScale += (mesh.userData.targetScale - mesh.userData.currentScale) * 0.12;

      mesh.position.set(x, y, mesh.userData.currentZ);

      // Tangential rotation (top faces outward) + interactive 3D tilt
      mesh.rotation.z = -angleRad;
      mesh.rotation.x = mesh.userData.tiltX;
      mesh.rotation.y = mesh.userData.tiltY;

      mesh.scale.set(
        mesh.userData.currentScale,
        mesh.userData.currentScale,
        mesh.userData.currentScale
      );
    });

    // Detect card closest to 12 o'clock
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

  // --- 8. Update Active Card & UI Sync ---
  function onActiveCardChanged(index) {
    const data = ringCardsData[index];
    if (!data) return;

    // Highlight top card in 3D
    cardMeshes.forEach((mesh, idx) => {
      if (idx === index) {
        mesh.userData.targetScale = 1.15;
        mesh.userData.targetZ = 0.28;
      } else if (idx === hoveredIndex) {
        mesh.userData.targetScale = 1.08;
        mesh.userData.targetZ = 0.16;
      } else {
        mesh.userData.targetScale = 1.0;
        mesh.userData.targetZ = 0.0;
      }
    });

    // Center category chip
    const catChip = document.getElementById('center-category-chip');
    if (catChip) catChip.textContent = data.categoryLabel;

    // Center title and description
    const titleEl = document.getElementById('center-title');
    const descEl = document.getElementById('center-desc');

    if (titleEl && descEl) {
      titleEl.style.opacity = '0.35';
      titleEl.style.transform = 'translateY(-4px)';
      descEl.style.opacity = '0.35';
      descEl.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (index === 0) {
          titleEl.textContent = 'The future is built on Artificial Intelligence.';
          descEl.textContent = '비정형 요구사항 수집부터 IDE 에이전트 연동, Playwright 브라우저 자동 검증과 배포까지';
        } else {
          titleEl.textContent = data.title;
          descEl.textContent = data.desc;
        }
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
        descEl.style.opacity = '1';
        descEl.style.transform = 'translateY(0)';
      }, 90);
    }

    // Slide top navigation
    updateNavSlider(data.category);

    // Update modal if open
    const modal = document.getElementById('card-modal');
    if (modal && modal.classList.contains('open')) {
      populateModal(index);
    }
  }

  // --- 9. Slide Nav Wrapper to Center Active Category ---
  function updateNavSlider(activeCategory) {
    const wrapper = document.getElementById('indicator-wrapper');
    if (!wrapper) return;

    let activeBtn = null;
    const buttons = wrapper.querySelectorAll('.nav-step');

    buttons.forEach(btn => {
      if (btn.getAttribute('data-category') === activeCategory) {
        btn.classList.add('active');
        activeBtn = btn;
      } else {
        btn.classList.remove('active');
      }
    });

    if (activeBtn) {
      const wrapperCenter = wrapper.offsetWidth / 2;
      const btnCenter = activeBtn.offsetLeft + activeBtn.offsetWidth / 2;
      const targetX = wrapperCenter - btnCenter;
      wrapper.style.transform = `translateX(${targetX}px)`;
    }
  }

  // --- 10. Main Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);

    // Lenis / Inkwell Inertia lerp damping
    const diff = targetRotation - currentRotation;
    if (Math.abs(diff) > 0.0001) {
      currentRotation += diff * 0.082;
      updateCardPlacements();
    }

    // 3D Camera parallax damping
    currentCameraParallax.x += (targetCameraParallax.x - currentCameraParallax.x) * 0.05;
    currentCameraParallax.y += (targetCameraParallax.y - currentCameraParallax.y) * 0.05;

    camera.position.x = currentCameraParallax.x;
    camera.position.y = currentCameraParallax.y;

    // Specular mouse light position
    if (mouseLight) {
      mouseLight.position.x = (mousePos.x / window.innerWidth - 0.5) * 6;
      mouseLight.position.y = -(mousePos.y / window.innerHeight - 0.5) * 4.5;
    }

    renderer.render(scene, camera);
  }

  // --- 11. Mouse & Touch Interactions ---
  function initInteraction() {
    // Wheel scroll
    window.addEventListener('wheel', e => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetRotation -= delta * 0.0016;
    }, { passive: true });

    // Drag / Touch
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let velocity = 0;

    window.addEventListener('mousedown', e => {
      if (e.target.closest('button, a, .lightbox-content-box')) return;
      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      velocity = 0;
    });

    window.addEventListener('mousemove', e => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      targetCameraParallax.x = (e.clientX / window.innerWidth - 0.5) * 0.45;
      targetCameraParallax.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Raycast hover detection
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
        hit.userData.tiltX = -(localPoint.y - hit.position.y) * 0.12;
        hit.userData.tiltY = (localPoint.x - hit.position.x) * 0.12;
      } else {
        if (hoveredIndex !== -1) {
          hoveredIndex = -1;
          if (cursor) cursor.classList.remove('hover');
        }
      }

      if (!isDragging) return;
      const dx = e.clientX - lastX;
      velocity = dx;
      targetRotation += dx * 0.0032;
      lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        targetRotation += velocity * 0.007;
      }
    });

    // Click to focus card or open modal
    window.addEventListener('click', e => {
      if (e.target.closest('button, a, .lightbox-content-box')) return;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const clickedIndex = clickedMesh.userData.index;

        if (clickedIndex === activeIndex) {
          openCardModal(clickedIndex);
        } else {
          rotateToIndex(clickedIndex);
        }
      }
    });

    // Touch
    window.addEventListener('touchstart', e => {
      if (e.target.closest('button, a, .lightbox-content-box')) return;
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
      targetRotation += dx * 0.0038;
      lastX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        targetRotation += velocity * 0.007;
      }
    });

    // Keyboard
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeCardModal();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const stepRad = (Math.PI * 2) / totalCards;
        targetRotation -= stepRad;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const stepRad = (Math.PI * 2) / totalCards;
        targetRotation += stepRad;
      } else if (e.key === ' ' || e.key === 'Enter') {
        const modal = document.getElementById('card-modal');
        if (!modal || !modal.classList.contains('open')) {
          e.preventDefault();
          openActiveCardModal();
        }
      }
    });
  }

  // --- 12. Shortest Arc Navigation ---
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

  window.navigateCategory = function (category) {
    const foundIndex = ringCardsData.findIndex(card => card.category === category);
    if (foundIndex !== -1) {
      rotateToIndex(foundIndex);
    }
  };

  // --- 13. Lightbox Modal (Uncropped 16:9 Presentation View) ---
  let modalActiveIndex = 0;

  function populateModal(index) {
    const data = ringCardsData[index];
    if (!data) return;

    modalActiveIndex = index;

    const modalCategory = document.getElementById('modal-card-category');
    const modalTitle = document.getElementById('modal-card-title');
    const modalImg = document.getElementById('modal-card-img');
    const modalDesc = document.getElementById('modal-card-desc');
    const modalCounter = document.getElementById('modal-card-counter');

    if (modalCategory) modalCategory.textContent = data.categoryLabel;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalImg) modalImg.src = data.img;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalCounter) {
      const pad = n => String(n + 1).padStart(2, '0');
      modalCounter.textContent = `${pad(index)} / ${pad(totalCards - 1)}`;
    }
  }

  window.openCardModal = function (index) {
    const modal = document.getElementById('card-modal');
    if (!modal) return;
    populateModal(index);
    modal.classList.add('open');
  };

  window.openActiveCardModal = function () {
    openCardModal(activeIndex);
  };

  window.closeCardModal = function () {
    const modal = document.getElementById('card-modal');
    if (modal) modal.classList.remove('open');
  };

  window.navigateModal = function (delta) {
    let nextIndex = modalActiveIndex + delta;
    if (nextIndex < 0) nextIndex = totalCards - 1;
    if (nextIndex >= totalCards) nextIndex = 0;
    populateModal(nextIndex);
    rotateToIndex(nextIndex);
  };

  document.addEventListener('click', e => {
    const modal = document.getElementById('card-modal');
    if (modal && modal.classList.contains('open') && e.target === modal) {
      closeCardModal();
    }
  });

  // --- 14. Trailing Dot Cursor Physics ---
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

    document.querySelectorAll('a, button, .lightbox-nav-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // --- 15. Clipboard Toast ---
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

  // --- 16. Window Resize ---
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    updateCameraPosition();
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    buildOrbitalGuide();
    build3DCards();
  }

  // --- 17. Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
    initDotCursor();
  });

})();
