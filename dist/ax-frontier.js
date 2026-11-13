/* ==========================================================================
   AX FRONTIER // WHITE PAPER INTERACTIVE DOSSIER ENGINE
   Apple Pro Light Aesthetic · Slide Lightbox · 8-Phase Stepper · 15-Module Filter
   Reading Progress Bar · Scroll Reveal Animations · Custom Dot Cursor
   Zero Emojis · Strict Spec Compliance
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Presentation Slides Data (7 Slides) ---
  const slidesData = [
    {
      img: 'ax-frontier-main.png',
      title: '01 / 07 · AX Frontier 프로젝트 워크스페이스 실서버 대시보드',
      desc: '등록 프로젝트 운영 현황(9건), 브랜치 이상 감지(8건), 비정형 미처리 메일(168건), 위험 차트 및 Cursor IDE 실시간 연동 현황을 관제하는 실제 콘솔 화면'
    },
    {
      img: 'ax-page-3.png',
      title: '02 / 07 · 플랫폼 구성과 연동 경계',
      desc: '웹·IDE·AI와 외부 서비스(Redmine, Slack, Git)를 연결하는 플랫폼 구조와 책임 분리'
    },
    {
      img: 'ax-page-5.png',
      title: '03 / 07 · IDE에서 작업하고 플랫폼에서 확인',
      desc: 'Cursor MCP 및 Hooks를 통한 일감 맥락 주입과 구조화된 작업 결과 자동 제출 흐름'
    },
    {
      img: 'ax-page-7.png',
      title: '04 / 07 · 문서 저장보다 중요한 기준 버전 관리',
      desc: '요구사항과 설계의 불변 기준선(Baseline ID) 관리 및 설계 변경 시 재검증 강제 트리거'
    },
    {
      img: 'ax-page-9.png',
      title: '05 / 07 · 테스트가 검증한 설계를 기록',
      desc: '설계 버전과 Playwright 브라우저 테스트 결과를 1:1로 결합해 완료 판정 및 0-회귀 보증'
    },
    {
      img: 'ax-page-12.png',
      title: '06 / 07 · 작업 결과를 다음 업무의 근거로',
      desc: '일감의 커밋과 산출물에서 노하우를 자동 추출하고 출처를 제공하는 플레이북 챗봇'
    },
    {
      img: 'ax-page-13.png',
      title: '07 / 07 · 빌드와 릴리즈까지 연결',
      desc: 'CI 파이프라인 자동 실행, APK/IPA 산출물 검증, 변경 웹 리소스 증분 ZIP 패키징'
    }
  ];

  let currentSlideIndex = 0;

  // --- 2. Modal Lightbox Logic ---
  window.openLightbox = function (index) {
    if (index < 0 || index >= slidesData.length) index = 0;
    currentSlideIndex = index;
    updateLightboxUI();

    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function () {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.navLightbox = function (delta) {
    currentSlideIndex = (currentSlideIndex + delta + slidesData.length) % slidesData.length;
    updateLightboxUI();
  };

  function updateLightboxUI() {
    const item = slidesData[currentSlideIndex];
    if (!item) return;

    const counter = document.getElementById('lightbox-counter');
    const title = document.getElementById('lightbox-title');
    const img = document.getElementById('lightbox-img');
    const desc = document.getElementById('lightbox-desc');

    const pad = n => String(n + 1).padStart(2, '0');
    if (counter) counter.textContent = `[ ${pad(currentSlideIndex)} / ${pad(slidesData.length)} ]`;
    if (title) title.textContent = item.title;
    if (img) img.src = item.img;
    if (desc) desc.textContent = item.desc;
  }

  // Close lightbox on background click
  document.addEventListener('click', e => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.classList.contains('open') && e.target === modal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', e => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    }
  });

  // --- 3. 8-Phase Execution Sequence ---
  const sequencePhases = [
    {
      num: '01',
      title: '유입',
      sub: '인바운드 메일 수집',
      input: '고객사·유관부서 비정형 메일',
      actor: 'IMAP 리스너 & 보안 게이트웨이',
      tools: 'IMAP Daemon, Attachment Parser',
      output: '비정형 요청 큐 적재 및 스팸 필터링'
    },
    {
      num: '02',
      title: '접수',
      sub: '문서 변환 및 요구사항 초안',
      input: '첨부파일(PDF, DOCX, HWP) & 본문',
      actor: '문서 변환기 & 요구사항 추출 LLM',
      tools: 'Doc Converter, LLM Structured Output',
      output: '초안 REQ 목록 및 수용 기준(AC)'
    },
    {
      num: '03',
      title: 'Redmine 등록',
      sub: '일감 생성 및 담당자 매핑',
      input: '승인된 요구사항 초안',
      actor: 'AX Frontier 서버 오케스트레이터',
      tools: 'Redmine REST API, Webhook',
      output: '공식 이슈 티켓 번호 발급 및 담당자 배정'
    },
    {
      num: '04',
      title: '분석',
      sub: '코드 정적 스캔 & 의존성 분석',
      input: '대상 프로젝트 소스코드 저장소',
      actor: '정적 분석기 & AI Diff 엔진',
      tools: 'AST Parser, Semgrep, AI Scanner',
      output: '영향 파일 리스트 및 아키텍처 위험도 리포트'
    },
    {
      num: '05',
      title: '설계',
      sub: 'REQ 상세 명세 & 불변 기준선',
      input: '코드 영향 범위 및 요구사항',
      actor: '설계 에이전트 & 테크 리드',
      tools: 'JSON Schema Guard, Baseline Engine',
      output: '불변 기준선(Baseline ID v1.0) 승인'
    },
    {
      num: '06',
      title: '개발',
      sub: 'IDE 에이전트 코드 작성 & 제출',
      input: 'get_ticket_context (일감 맥락)',
      actor: '개발자 + Cursor MCP / Claude Code',
      tools: 'Cursor MCP, submit_ticket_development',
      output: '코드 변경 커밋 및 구현 결과 보고서'
    },
    {
      num: '07',
      title: '테스트',
      sub: 'Playwright 자동 검증 & PM 판정',
      input: '개발된 코드 및 E2E 시나리오',
      actor: 'Playwright 엔진 & PM AI 검수관',
      tools: 'Playwright Test, Headless Chromium',
      output: '실행 증적 로그, 스크린샷, 최종 합격 판정'
    },
    {
      num: '08',
      title: '배포',
      sub: 'GitLab CI & 증분 리소스 패키징',
      input: '통과된 최종 커밋 및 검증 증적',
      actor: 'GitLab CI Runner & 리소스 배포기',
      tools: 'GitLab Pipeline, Incremental ZIP Packager',
      output: 'APK/IPA 바이너리 빌드 및 웹뷰 리소스 배포'
    }
  ];

  function initSequenceStepper() {
    const rail = document.getElementById('sequence-stepper');
    const detail = document.getElementById('sequence-detail');
    if (!rail || !detail) return;

    rail.innerHTML = '';
    sequencePhases.forEach((phase, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `stepper-chip ${idx === 0 ? 'active' : ''}`;
      chip.innerHTML = `<span style="opacity:0.6; margin-right:4px;">${phase.num}.</span> ${phase.title}`;
      chip.addEventListener('click', () => selectPhase(idx));
      rail.appendChild(chip);
    });

    selectPhase(0);
  }

  function selectPhase(index) {
    const phase = sequencePhases[index];
    if (!phase) return;

    const chips = document.querySelectorAll('.stepper-chip');
    chips.forEach((c, i) => {
      if (i === index) c.classList.add('active');
      else c.classList.remove('active');
    });

    const detail = document.getElementById('sequence-detail');
    if (!detail) return;

    detail.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; border-bottom:1px solid var(--border-subtle); padding-bottom:16px;">
        <div>
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-primary); font-weight:700;">PHASE // ${phase.num}</span>
          <h3 style="font-size:1.4rem; font-weight:800; color:var(--text-primary); margin-top:4px;">${phase.num}. ${phase.title} — ${phase.sub}</h3>
        </div>
        <span style="font-family:var(--font-mono); font-size:0.78rem; color:var(--accent-teal); font-weight:700; background:rgba(13,148,136,0.08); padding:5px 14px; border-radius:9999px; border:1px solid rgba(13,148,136,0.22);">
          AUTOMATION // PIPELINE
        </span>
      </div>

      <div class="seq-grid">
        <div class="seq-col">
          <div class="seq-col-title">입력 데이터 (Inputs)</div>
          <div class="seq-col-desc">${phase.input}</div>
        </div>
        <div class="seq-col">
          <div class="seq-col-title">수행 주체 (Actor)</div>
          <div class="seq-col-desc">${phase.actor}</div>
        </div>
        <div class="seq-col">
          <div class="seq-col-title">연동 도구 (Tools &amp; APIs)</div>
          <div class="seq-col-desc"><code style="font-family:var(--font-mono); font-size:0.8rem; background:rgba(0,0,0,0.04); padding:2px 6px; border-radius:4px;">${phase.tools}</code></div>
        </div>
        <div class="seq-col">
          <div class="seq-col-title">보증 산출물 (Outputs)</div>
          <div class="seq-col-desc" style="color:var(--text-primary); font-weight:700;">${phase.output}</div>
        </div>
      </div>
    `;
  }

  // --- 4. 15-Module Filter Tabs ---
  function initModuleTabs() {
    const tabs = document.querySelectorAll('.module-tab-item');
    const items = document.querySelectorAll('.module-box-item');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        items.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- 5. UI Animations: Progress Bar, Header Scroll, Reveal Observer, Dot Cursor ---
  function initScrollProgressBar() {
    let progressBar = document.getElementById('reading-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'reading-progress';
      progressBar.className = 'reading-progress-bar';
      document.body.prepend(progressBar);
    }

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
        progressBar.style.width = `${pct}%`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  function initHeaderScrollState() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.content-section, .slide-item-card, .module-box-item, .topology-card-item, .adr-card-item, .studio-screen-frame, .sequence-detail-card'
    );

    targets.forEach(el => el.classList.add('reveal-on-scroll'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
      });

      targets.forEach(el => observer.observe(el));
    } else {
      targets.forEach(el => el.classList.add('revealed'));
    }
  }

  function initDotCursor() {
    let cursor = document.getElementById('dot-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'dot-cursor';
      cursor.className = 'dot-cursor';
      document.body.appendChild(cursor);
    }

    let mouseX = window.innerWidth * 0.2;
    let mouseY = window.innerHeight * 0.2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function renderCursor() {
      curX += (mouseX - curX) * 0.25;
      curY += (mouseY - curY) * 0.25;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('a, button, .slide-item-card, .studio-screen-frame').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // --- 6. Bootstrapping ---
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initHeaderScrollState();
    initScrollReveal();
    initDotCursor();
    initSequenceStepper();
    initModuleTabs();
  });

})();
