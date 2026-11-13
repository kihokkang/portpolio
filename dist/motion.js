/* ==========================================================================
   KIM GIHO · INKWELL AUTHENTIC CIRCULAR RING MOTION ENGINE
   Reverse-Engineered via Playwright from https://inkwell.tech/
   Pristine Porcelain Canvas · 22-Card Radial Ring · Lenis Easing Physics
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Cards Dataset (22 Authentic Architecture & Project Cards) ---
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
  let currentRotation = 0;
  let targetRotation = 0;
  let activeIndex = 0;
  let cardElements = [];

  // --- 2. Calculate Responsive Radius (Golden Ratio Clearance) ---
  function getRadius() {
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    if (window.innerWidth <= 640) return Math.min(152, minDim * 0.39);
    if (window.innerWidth <= 900) return minDim * 0.36;
    return Math.min(320, minDim * 0.355);
  }

  // --- 3. Update Hairline Orbital Guide SVG ---
  function updateOrbitalGuide() {
    const radius = getRadius();
    const circle = document.getElementById('orbital-circle');
    const circleInner = document.getElementById('orbital-circle-inner');
    if (circle) circle.setAttribute('r', radius);
    if (circleInner) circleInner.setAttribute('r', Math.max(10, radius - 45));
  }

  // --- 4. Build DOM Cards inside .circular-ring ---
  function buildCircularRing() {
    const ring = document.getElementById('circular-ring');
    if (!ring) return;
    ring.innerHTML = '';
    cardElements = [];

    ringCardsData.forEach((data, i) => {
      const card = document.createElement('div');
      card.className = 'ring-card';
      card.dataset.index = i;
      card.title = data.title;

      const img = document.createElement('img');
      img.src = data.img;
      img.alt = data.title;
      img.loading = 'eager';
      card.appendChild(img);

      // Click: if already top active -> open modal, else rotate to top
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeIndex === i) {
          openCardModal(i);
        } else {
          rotateToIndex(i);
        }
      });

      ring.appendChild(card);
      cardElements.push(card);
    });

    updateOrbitalGuide();
    updateCardPositions();
  }

  // --- 5. Update Card Transforms along Circle Perimeter ---
  function updateCardPositions() {
    const radius = getRadius();

    cardElements.forEach((card, i) => {
      const angle = (i / totalCards) * 360 + currentRotation;
      card.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`;
    });

    // Determine card closest to 12 o'clock (0 / 360 deg)
    let minDiff = Infinity;
    let closestIndex = 0;

    for (let i = 0; i < totalCards; i++) {
      const angle = (i / totalCards) * 360 + currentRotation;
      const norm = ((angle % 360) + 360) % 360;
      const diff = Math.min(norm, 360 - norm);
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

  // --- 6. Update Center Text & Horizontal Sliding Navigation ---
  function onActiveCardChanged(index) {
    const data = ringCardsData[index];
    if (!data) return;

    // Highlight top active card
    cardElements.forEach((el, idx) => {
      if (idx === index) el.classList.add('active-top');
      else el.classList.remove('active-top');
    });

    // Update center category chip
    const catChip = document.getElementById('center-category-chip');
    if (catChip) {
      catChip.textContent = data.categoryLabel;
    }

    // Update center title and description with smooth transition
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

    // Update sliding top navigation (Centers the active step)
    updateNavSlider(data.category);

    // Update lightbox modal if open
    const modal = document.getElementById('card-modal');
    if (modal && modal.classList.contains('open')) {
      populateModal(index);
    }
  }

  // --- 7. Slide Nav Wrapper to Center the Active Category ---
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
      // Calculate exact offset from static layout
      const wrapperCenter = wrapper.offsetWidth / 2;
      const btnCenter = activeBtn.offsetLeft + activeBtn.offsetWidth / 2;
      const targetX = wrapperCenter - btnCenter;

      wrapper.style.transform = `translateX(${targetX}px)`;
    }
  }

  // --- 8. Smooth Rotation Animation Loop (Lenis Lerp Physics) ---
  function animateRing() {
    requestAnimationFrame(animateRing);

    // Lenis / Inkwell damping factor
    const diff = targetRotation - currentRotation;
    if (Math.abs(diff) > 0.005) {
      currentRotation += diff * 0.085;
      updateCardPositions();
    }
  }

  // --- 9. Wheel, Drag & Touch Interaction ---
  function initInteraction() {
    // Wheel scroll
    window.addEventListener('wheel', e => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetRotation -= delta * 0.11;
    }, { passive: true });

    // Drag / Touch physics
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
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      velocity = dx;
      targetRotation += dx * 0.22;
      lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        // Apply inertia momentum
        targetRotation += velocity * 0.5;
      }
    });

    // Touch support
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
      targetRotation += dx * 0.26;
      lastX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        targetRotation += velocity * 0.5;
      }
    });

    // Window resize
    window.addEventListener('resize', () => {
      updateOrbitalGuide();
      updateCardPositions();
    });

    // Keyboard navigation
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeCardModal();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const stepAngle = 360 / totalCards;
        targetRotation -= stepAngle;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const stepAngle = 360 / totalCards;
        targetRotation += stepAngle;
      } else if (e.key === ' ' || e.key === 'Enter') {
        const modal = document.getElementById('card-modal');
        if (!modal || !modal.classList.contains('open')) {
          e.preventDefault();
          openActiveCardModal();
        }
      }
    });
  }

  // --- 10. Navigate by Category or Index (Shortest Arc) ---
  window.rotateToIndex = function (index) {
    if (index < 0) index = totalCards - 1;
    if (index >= totalCards) index = 0;

    const cardAngle = (index / totalCards) * 360;
    const desired = -cardAngle;
    const diff = (desired - currentRotation) % 360;
    let shortestDiff = diff;
    if (shortestDiff > 180) shortestDiff -= 360;
    if (shortestDiff < -180) shortestDiff += 360;
    targetRotation = currentRotation + shortestDiff;
  };

  window.navigateCategory = function (category) {
    const foundIndex = ringCardsData.findIndex(card => card.category === category);
    if (foundIndex !== -1) {
      rotateToIndex(foundIndex);
    }
  };

  // --- 11. Lightbox Modal (Uncropped 16:9 Presentation View) ---
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

  // Click modal backdrop to close
  document.addEventListener('click', e => {
    const modal = document.getElementById('card-modal');
    if (modal && modal.classList.contains('open') && e.target === modal) {
      closeCardModal();
    }
  });

  // --- 12. Trailing Dot Cursor Physics (Matching Inkwell) ---
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

    // Expand dot on interactive hover
    document.querySelectorAll('a, button, .ring-card, .lightbox-nav-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // --- 13. Clipboard Toast ---
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

  // --- 14. Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    buildCircularRing();
    initInteraction();
    initDotCursor();
    animateRing();

    // Set initial card 0 active
    setTimeout(() => {
      onActiveCardChanged(0);
    }, 50);
  });

})();
