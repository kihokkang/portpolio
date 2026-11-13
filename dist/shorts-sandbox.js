/**
 * ============================================================================
 * SHORTS COMMERCE PLAYER // MULTI-SLIDE SWIPER & DUAL-MODE STUDIO SANDBOX
 * Author: Kim Giho · Apple Pro Porcelain White Aesthetics · Zero Emojis
 * Dual Modes:
 *   - Video Mode (mediaTp: 'M'): YouTube Shorts / Vertical Video + Play/Mute API
 *   - Image Effect Mode (mediaTp: 'P'): All 10 Original Dynamic Transition Effects
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 0. 10 Original Image Effect Definitions (matching imageSlideTemplate.js) ---
  const IMAGE_EFFECTS = [
    { id: 'fadeSlider',   num: '01', name: '페이드 줌',     sub: 'Fade + Zoom' },
    { id: 'basicSlider',  num: '02', name: '기본 슬라이드', sub: 'Horizontal' },
    { id: 'cubeSlider',   num: '03', name: '큐브 모자이크', sub: 'Tile Scatter' },
    { id: 'flipCard',     num: '04', name: '카드 플립',     sub: '180° Y-Flip' },
    { id: 'cardSlider',   num: '05', name: '3D 스택',       sub: 'Tilted Cards' },
    { id: 'zoomSlider',   num: '06', name: '버스트 줌',     sub: 'Zoom Burst' },
    { id: 'flipXSlider',  num: '07', name: '수평 플립 X',   sub: 'RotateY ±90°' },
    { id: 'flipYSlider',  num: '08', name: '수직 플립 Y',   sub: 'RotateX ±90°' },
    { id: 'cuboidSlider', num: '09', name: '3D 커보이드',   sub: '4-Face Box' },
    { id: 'cards2Slider', num: '10', name: '스와이프 스택', sub: 'LIKE / NOPE' }
  ];

  // --- 1. Preset Templates Library (Supports both Video 'M' and Image Effect 'P') ---
  const PRESET_TEMPLATES = {
    preset1: {
      mediaTp: 'M',
      imgDisplayTp: 'fadeSlider',
      name: '스마트 독 & 엠비언트 램프',
      shortName: '스마트 독',
      youtubeId: 'NigF_-PhkTQ',
      productNm: '아이리스 마그네틱 듀얼 스마트 독',
      contentTop: '책상 위 공간을 바꾸는 올인원 스마트 독',
      contentTopColor: '#ffffff',
      contentMid: '한정 수량 25% 얼리버드 특별 예약',
      contentMidColor: '#60a5fa',
      content: 'Qi2 무선 급속 충전, 엠비언트 라이트, 정밀 힌지 각도 조절이 결합된 데스크 테크 솔루션입니다.',
      productUrl: 'https://www.google.com/search?q=smart+desk+dock',
      buyBtnText: '얼리버드 예약 구매 ↗',
      ctaGradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      chatbotYn: true,
      reviewYn: true,
      tags: [
        { tag: '거치안정감 (142)', text: '자력이 매우 강력해서 휴대폰을 올려두고 터치해도 흔들림 없이 각도 유지가 완벽합니다.' },
        { tag: '충전속도 (89)', text: '15W 고속 무선 충전을 안정적으로 지원하여 발열 없이 빠르게 완충됩니다.' },
        { tag: '엠비언트 (210)', text: '은은한 웜톤 간접조명 덕분에 어두운 방에서 데스크 셋업 감성이 확실히 살아납니다.' },
        { tag: '가성비 (64)', text: '알루미늄 절삭 마감 퀄리티 대비 가격대비 완성도가 매우 높습니다.' }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=720&auto=format&fit=crop&q=85'
      ]
    },
    preset2: {
      mediaTp: 'P',
      imgDisplayTp: 'cards2Slider',
      name: '2026 레트로 러너 에디션',
      shortName: '레트로 러너',
      youtubeId: 'kHB7PxyEL58',
      productNm: '2026 에디토리얼 레트로 러너',
      contentTop: '카드를 좌우로 스와이프해 룩북을 확인하세요',
      contentTopColor: '#ffffff',
      contentMid: '드롭 오픈 기념 첫 구매 15% 쿠폰',
      contentMidColor: '#f472b6',
      content: '이탈리안 스웨이드와 통기성 에어 메시의 조합. 10종 이미지 이펙트를 즉시 전환하며 테스트해 보세요.',
      productUrl: 'https://www.google.com/search?q=retro+runner+sneakers',
      buyBtnText: '리미티드 드롭 구매하기 ↗',
      ctaGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
      chatbotYn: true,
      reviewYn: true,
      tags: [
        { tag: '착화감 (185)', text: '발볼이 넓은 편인데도 압박감 없이 하루 종일 걸어도 발바닥이 편안합니다.' },
        { tag: '디자인 (312)', text: '실물이 훨씬 고급스럽고 빈티지한 색감이 어떤 데님이나 슬랙스에도 잘 어울립니다.' },
        { tag: '사이즈팁 (120)', text: '정사이즈보다 반 치수(5mm) 업해서 신으시면 가장 예쁜 핏이 나옵니다.' },
        { tag: '내구성 (78)', text: '스웨이드 마감과 스티치 봉제가 매우 촘촘해 오랫동안 신어도 뒤틀림이 없습니다.' }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=720&auto=format&fit=crop&q=85'
      ]
    },
    preset3: {
      mediaTp: 'M',
      imgDisplayTp: 'cubeSlider',
      name: '시그니처 블렌드 & 에스프레소',
      shortName: '시그니처 커피',
      youtubeId: 'WdWZPxJfnR8',
      productNm: '산지 직송 시그니처 블렌드 원두',
      contentTop: '갓 볶은 싱글오리진, 완벽한 크레마의 미학',
      contentTopColor: '#ffffff',
      contentMid: '로스팅 당일 출고 · 신선도 100% 보증',
      contentMidColor: '#fbbf24',
      content: '재스민의 플로럴 아로마와 부드러운 복숭아의 단맛, 깔끔한 시트러스 애프터테이스트.',
      productUrl: 'https://www.google.com/search?q=specialty+coffee+beans',
      buyBtnText: '신선한 원두 주문하기 ↗',
      ctaGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      chatbotYn: true,
      reviewYn: true,
      tags: [
        { tag: '원두풍미 (240)', text: '봉투를 뜯자마자 퍼지는 꽃향기와 추출 시 올라오는 고소한 너티 노트가 일품입니다.' },
        { tag: '크레마 (134)', text: '원두가 신선해서 쫀득하고 황금빛 크레마가 두껍게 형성됩니다.' },
        { tag: '산미밸런스 (176)', text: '자극적인 신맛이 아니라 과일의 기분 좋은 단맛과 산미가 조화롭습니다.' },
        { tag: '빠른배송 (95)', text: '오후 주문했는데 다음 날 아침 로스팅 일자가 찍혀 바로 도착했습니다.' }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=720&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=720&auto=format&fit=crop&q=85'
      ]
    }
  };

  function cloneDefaultSlides() {
    return [
      JSON.parse(JSON.stringify(PRESET_TEMPLATES.preset1)),
      JSON.parse(JSON.stringify(PRESET_TEMPLATES.preset2)),
      JSON.parse(JSON.stringify(PRESET_TEMPLATES.preset3))
    ];
  }

  // --- 2. Runtime State ---
  let slides = cloneDefaultSlides();
  let activeSlideIndex = 0;
  let selectedImageSlotIndex = 0;
  let activeTagIndexPerSlide = {};
  let likeStatePerSlide = { 0: false, 1: false, 2: false };
  let likeCountPerSlide = { 0: 1248, 1: 3412, 2: 890 };

  // Image FX Engine State
  let fxImgIndexPerSlide = { 0: 0, 1: 0, 2: 0 };
  let fxCuboidStepPerSlide = { 0: 0, 1: 0, 2: 0 };
  let fxTimers = {};
  let fxAutoplayEnabled = true;
  let fxIntervalMs = 3200;

  // Video Player Playback State
  let videoPausedPerSlide = {};
  let videoMuted = true;

  // --- 3. DOM References ---
  const elSwiperContainer = document.getElementById('shorts-swiper-container');
  const elSwiperTrack = document.getElementById('shorts-swiper-track');
  const elPhoneNavPrev = document.getElementById('phone-nav-prev');
  const elPhoneNavNext = document.getElementById('phone-nav-next');
  const elPhoneSlideCounter = document.getElementById('phone-nav-counter');
  const elPhonePaginationDots = document.getElementById('phone-pagination-dots');
  const elPhoneSwipeHint = document.getElementById('phone-swipe-hint');
  const elPhoneModeBadge = document.getElementById('phone-mode-badge');
  const elVideoStatusFlash = document.getElementById('video-status-flash');

  // In-Phone Modals
  const elInphoneChatbot = document.getElementById('inphone-chatbot-modal');
  const elInphoneShare = document.getElementById('inphone-share-modal');
  const elChatbotClose = document.getElementById('inphone-chatbot-close');
  const elShareClose = document.getElementById('inphone-share-close');
  const elChatInput = document.getElementById('inphone-chat-input');
  const elChatSend = document.getElementById('inphone-chat-send');
  const elChatBody = document.getElementById('inphone-chat-body');
  const btnShareCopyLink = document.getElementById('btn-share-copy-link');
  const btnShareKakao = document.getElementById('btn-share-kakao');

  // Studio Controller
  const elSlideTabsList = document.getElementById('slide-tabs-list');
  const elActiveSlideBadge = document.getElementById('active-slide-badge');
  const btnSlidePrev = document.getElementById('btn-slide-prev');
  const btnSlideNext = document.getElementById('btn-slide-next');
  const btnAddSlide = document.getElementById('btn-add-slide');
  const btnDeleteSlide = document.getElementById('btn-delete-slide');

  // Mode Switcher & Sub-panels
  const btnMediaVideo = document.getElementById('btn-media-video');
  const btnMediaImage = document.getElementById('btn-media-gallery');
  const elModeActiveSpec = document.getElementById('mode-active-spec-tag');
  const panelVideoConfig = document.getElementById('panel-video-config');
  const panelImageConfig = document.getElementById('panel-image-config');

  // Video Mode Inputs
  const inputYoutubeUrl = document.getElementById('input-youtube-url');
  const btnApplyYoutube = document.getElementById('btn-apply-youtube');
  const btnVideoTogglePlay = document.getElementById('btn-video-toggle-play');
  const btnVideoToggleMute = document.getElementById('btn-video-toggle-mute');
  const labelVideoMute = document.getElementById('label-video-mute');

  // Image Effect Mode Inputs
  const elEffectsGrid10 = document.getElementById('effects-grid-10');
  const elEffectActiveHint = document.getElementById('effect-active-hint');
  const elFxImgCounter = document.getElementById('fx-img-counter');
  const btnFxPrev = document.getElementById('btn-fx-prev');
  const btnFxNext = document.getElementById('btn-fx-next');
  const btnFxReplay = document.getElementById('btn-fx-replay');
  const toggleFxAutoplay = document.getElementById('toggle-fx-autoplay');
  const selectFxInterval = document.getElementById('select-fx-interval');
  const elEffectThumbsStrip = document.getElementById('effect-thumbs-strip');
  const elSelectedImgSlotLabel = document.getElementById('selected-img-slot');
  const inputSelectedImgUrl = document.getElementById('input-selected-img-url');
  const btnApplyImgUrl = document.getElementById('btn-apply-img-url');

  // Common & Style & Commerce Inputs
  const inputProductNm = document.getElementById('input-product-name');
  const inputProductUrl = document.getElementById('input-product-url');
  const inputTopTitle = document.getElementById('input-top-title');
  const inputTopColor = document.getElementById('input-top-color');
  const inputMidTitle = document.getElementById('input-mid-title');
  const inputMidColor = document.getElementById('input-mid-color');
  const inputAuxContent = document.getElementById('input-aux-content');
  const inputBuyBtnText = document.getElementById('input-buy-btn-text');
  const toggleChatbot = document.getElementById('toggle-chatbot');
  const toggleReview = document.getElementById('toggle-review');
  const elLiveJsonPreview = document.getElementById('live-json-preview');

  const btnCopyMockJson = document.getElementById('btn-copy-mock-json');
  const btnExportJson = document.getElementById('btn-export-json');
  const btnApplyAllChanges = document.getElementById('btn-apply-all-changes');
  const btnResetAllSlides = document.getElementById('btn-reset-all-slides');
  const presetCardBtns = document.querySelectorAll('.preset-card-btn');

  // --- 4. Helper Functions ---
  function extractYouTubeId(url) {
    if (!url) return '';
    const clean = url.trim();
    if (/^[\w-]{11}$/.test(clean)) return clean;
    const match = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/)|[?&]v=)([\w-]{11})/);
    return match ? match[1] : clean;
  }

  function cleanTagLabel(raw) {
    return (raw || '').replace(/^#+/, '').trim();
  }

  function getEffectMeta(id) {
    return IMAGE_EFFECTS.find(e => e.id === id) || IMAGE_EFFECTS[0];
  }

  function showToast(message) {
    let toast = document.getElementById('sandbox-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sandbox-toast';
      toast.className = 'sandbox-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  function flashVideoStatus(isPlay) {
    if (!elVideoStatusFlash) return;
    elVideoStatusFlash.innerHTML = isPlay
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>'
      : '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    elVideoStatusFlash.classList.remove('animate');
    void elVideoStatusFlash.offsetWidth;
    elVideoStatusFlash.classList.add('animate');
  }

  function sendYouTubeCommand(slideIdx, func) {
    const iframe = document.getElementById(`slide-iframe-${slideIdx}`);
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
    }
  }

  function buildExportPayload() {
    return {
      success: true,
      cuid: 'portfolioGuest',
      shortsSendSeq: 100086,
      totalCount: slides.length,
      shortsList: slides.map((s, idx) => ({
        shortsIdx: 100080 + idx,
        mediaTp: s.mediaTp === 'P' ? 'P' : 'M',
        imgDisplayTp: s.mediaTp === 'P' ? (s.imgDisplayTp || 'fadeSlider') : null,
        productNm: s.productNm,
        productUrl: s.productUrl,
        contentTop: s.contentTop,
        contentTopFont: `color:${s.contentTopColor};font-size:22px;font-weight:bold;`,
        contentMid: s.contentMid,
        contentMidFont: `color:${s.contentMidColor};font-size:18px;font-weight:600;`,
        content: s.content,
        buyBtnText: s.buyBtnText,
        mediaList: s.mediaTp === 'P'
          ? (s.galleryImages || []).map((url, orderNo) => ({ url, orderNo }))
          : [{ youtubeId: extractYouTubeId(s.youtubeId), orderNo: 0 }],
        reviewYn: s.reviewYn ? 'Y' : 'N',
        chatbotYn: s.chatbotYn ? 'Y' : 'N',
        reviewInfo: (s.tags || []).map(t => ({
          tag: cleanTagLabel(t.tag),
          content: t.text
        }))
      }))
    };
  }

  function updateLiveJsonPreview() {
    if (!elLiveJsonPreview) return;
    const payload = buildExportPayload();
    elLiveJsonPreview.textContent = JSON.stringify(payload, null, 2);
  }

  // --- 5. Image Effect Engine (All 10 Transition Effects) ---
  function stopAllImageEffectTimers() {
    Object.keys(fxTimers).forEach(key => {
      clearInterval(fxTimers[key]);
      delete fxTimers[key];
    });
  }

  function stopImageEffectTimer(slideIdx) {
    if (fxTimers[slideIdx]) {
      clearInterval(fxTimers[slideIdx]);
      delete fxTimers[slideIdx];
    }
  }

  function buildImageEffectMarkup(slide, slideIdx) {
    const images = (slide.galleryImages && slide.galleryImages.length > 0)
      ? slide.galleryImages
      : PRESET_TEMPLATES.preset2.galleryImages;
    const fxType = slide.imgDisplayTp || 'fadeSlider';
    const currentImgIdx = (fxImgIndexPerSlide[slideIdx] || 0) % images.length;
    const effectMeta = getEffectMeta(fxType);

    let stageHtml = '';

    if (fxType === 'fadeSlider') {
      stageHtml = `
        <div class="fx-stage-fade" data-fx-stage="${slideIdx}">
          ${images.map((url, i) => `
            <div class="fx-fade-item ${i === currentImgIdx ? 'active' : ''}" data-fx-item="${i}">
              <img src="${url}" alt="Slide image ${i + 1}" />
            </div>
          `).join('')}
        </div>
      `;
    } else if (fxType === 'basicSlider') {
      stageHtml = `
        <div class="fx-stage-basic" data-fx-stage="${slideIdx}" style="transform: translateX(-${currentImgIdx * 100}%);">
          ${images.map((url, i) => `
            <div class="fx-basic-item" data-fx-item="${i}">
              <img src="${url}" alt="Slide image ${i + 1}" />
            </div>
          `).join('')}
        </div>
      `;
    } else if (fxType === 'cubeSlider') {
      stageHtml = `
        <div class="fx-stage-cube" data-fx-stage="${slideIdx}">
          <div class="fx-cube-base">
            <img src="${images[currentImgIdx]}" alt="Cube mosaic base" />
          </div>
        </div>
      `;
    } else if (fxType === 'flipCard') {
      stageHtml = `
        <div class="fx-stage-flip" data-fx-stage="${slideIdx}">
          ${images.map((url, i) => `
            <div class="fx-flip-item ${i === currentImgIdx ? 'active' : ''}" data-fx-item="${i}">
              <img src="${url}" alt="Flip card ${i + 1}" />
            </div>
          `).join('')}
        </div>
      `;
    } else if (fxType === 'cardSlider') {
      const n = images.length;
      const leftIdx = (currentImgIdx - 1 + n) % n;
      const rightIdx = (currentImgIdx + 1) % n;
      stageHtml = `
        <div class="fx-stage-card" data-fx-stage="${slideIdx}">
          ${images.map((url, i) => {
            let cls = '';
            if (i === currentImgIdx) cls = 'active';
            else if (i === leftIdx) cls = 'left';
            else if (i === rightIdx) cls = 'right';
            return `
              <div class="fx-card-item ${cls}" data-fx-item="${i}">
                <img src="${url}" alt="3D stack card ${i + 1}" />
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (fxType === 'zoomSlider') {
      stageHtml = `
        <div class="fx-stage-zoom" data-fx-stage="${slideIdx}">
          ${images.map((url, i) => `
            <div class="fx-zoom-item ${i === currentImgIdx ? 'active' : ''}" data-fx-item="${i}">
              <img src="${url}" alt="Zoom slide ${i + 1}" />
            </div>
          `).join('')}
        </div>
      `;
    } else if (fxType === 'flipXSlider') {
      stageHtml = `
        <div class="fx-stage-flipx" data-fx-stage="${slideIdx}">
          ${images.map((url, i) => `
            <div class="fx-flipx-item ${i === currentImgIdx ? 'active' : ''}" data-fx-item="${i}">
              <img src="${url}" alt="Flip X slide ${i + 1}" />
            </div>
          `).join('')}
        </div>
      `;
    } else if (fxType === 'flipYSlider') {
      stageHtml = `
        <div class="fx-stage-flipy" data-fx-stage="${slideIdx}">
          ${images.map((url, i) => `
            <div class="fx-flipy-item ${i === currentImgIdx ? 'active' : ''}" data-fx-item="${i}">
              <img src="${url}" alt="Flip Y slide ${i + 1}" />
            </div>
          `).join('')}
        </div>
      `;
    } else if (fxType === 'cuboidSlider') {
      const faceImgs = [0, 1, 2, 3].map(i => images[i % images.length]);
      const angle = -(fxCuboidStepPerSlide[slideIdx] || 0) * 90;
      stageHtml = `
        <div class="fx-stage-cuboid-wrap" data-fx-stage="${slideIdx}">
          <div class="fx-stage-cuboid" style="transform: rotateY(${angle}deg);">
            ${faceImgs.map((url, i) => `
              <div class="fx-cuboid-face" data-face-idx="${i}" style="transform: rotateY(${i * 90}deg) translateZ(168px);">
                <img src="${url}" alt="Cuboid face ${i + 1}" />
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (fxType === 'cards2Slider') {
      const n = images.length;
      const nextIdx = (currentImgIdx + 1) % n;
      const behindIdx = (currentImgIdx + 2) % n;
      stageHtml = `
        <div class="fx-stage-cards2" data-fx-stage="${slideIdx}">
          ${images.map((url, i) => {
            let cls = '';
            if (i === currentImgIdx) cls = 'top';
            else if (i === nextIdx) cls = 'next';
            else if (i === behindIdx) cls = 'behind';
            return `
              <div class="cards2-card ${cls}" data-fx-item="${i}">
                <img src="${url}" alt="Swipe card ${i + 1}" />
                <div class="like-stamp">LIKE</div>
                <div class="nope-stamp">NOPE</div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    return `
      <div class="slide-fx-viewport" data-fx-viewport="${slideIdx}" data-fx-type="${fxType}">
        ${stageHtml}
        <div class="fx-progress-dots" data-fx-dots="${slideIdx}">
          ${images.map((_, i) => `
            <button type="button" class="fx-progress-dot ${i === currentImgIdx ? 'active' : ''}" data-fx-jump="${slideIdx}" data-img-idx="${i}" aria-label="이미지 ${i + 1}"></button>
          `).join('')}
        </div>
        <div class="fx-mode-chip">FX · ${effectMeta.id}</div>
      </div>
    `;
  }

  function triggerCubeMosaicScatter(stage, prevUrl, nextUrl) {
    const baseImg = stage.querySelector('.fx-cube-base img');
    if (baseImg) baseImg.src = nextUrl;

    // Remove any existing tiles
    stage.querySelectorAll('.fx-mosaic-tile').forEach(t => t.remove());

    const w = stage.clientWidth || 336;
    const h = stage.clientHeight || 696;
    const cols = 4;
    const rows = 6;
    const tileW = Math.ceil(w / cols);
    const tileH = Math.ceil(h / rows);

    const tiles = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tile = document.createElement('div');
        tile.className = 'fx-mosaic-tile';
        tile.style.left = `${c * tileW}px`;
        tile.style.top = `${r * tileH}px`;
        tile.style.width = `${tileW + 1}px`;
        tile.style.height = `${tileH + 1}px`;
        tile.style.backgroundImage = `url("${prevUrl}")`;
        tile.style.backgroundSize = `${w}px ${h}px`;
        tile.style.backgroundPosition = `-${c * tileW}px -${r * tileH}px`;
        tile.style.opacity = '1';
        tile.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
        stage.appendChild(tile);
        tiles.push({ tile, delay: (c + r) * 32 });
      }
    }

    // Force layout flush then scatter away
    void stage.offsetWidth;
    tiles.forEach(({ tile, delay }) => {
      setTimeout(() => {
        const dx = (Math.random() - 0.5) * 70;
        const dy = (Math.random() - 0.5) * 70;
        const rot = (Math.random() - 0.5) * 18;
        tile.style.opacity = '0';
        tile.style.transform = `translate(${dx}px, ${dy}px) scale(0.7) rotate(${rot}deg)`;
      }, delay);
    });

    setTimeout(() => {
      tiles.forEach(({ tile }) => tile.remove());
    }, 850);
  }

  function updateFxProgressUI(slideIdx, total) {
    const idx = fxImgIndexPerSlide[slideIdx] || 0;
    const viewport = document.querySelector(`[data-fx-viewport="${slideIdx}"]`);
    if (viewport) {
      viewport.querySelectorAll('.fx-progress-dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    }
    if (slideIdx === activeSlideIndex) {
      if (elFxImgCounter) elFxImgCounter.textContent = `${idx + 1} / ${total}`;
      if (elEffectThumbsStrip) {
        elEffectThumbsStrip.querySelectorAll('.effect-thumb-btn').forEach((btn, i) => {
          btn.classList.toggle('active', i === selectedImageSlotIndex);
        });
      }
    }
  }

  function transitionImageEffect(slideIdx, targetIdxOrDelta, isDelta = true, directionHint = 'right') {
    const slide = slides[slideIdx];
    if (!slide || slide.mediaTp !== 'P') return;

    const images = (slide.galleryImages && slide.galleryImages.length > 0)
      ? slide.galleryImages
      : PRESET_TEMPLATES.preset2.galleryImages;
    const n = images.length;
    if (n === 0) return;

    const prevIdx = (fxImgIndexPerSlide[slideIdx] || 0) % n;
    const nextIdx = isDelta
      ? (prevIdx + targetIdxOrDelta + n) % n
      : ((targetIdxOrDelta % n) + n) % n;

    if (prevIdx === nextIdx && isDelta && targetIdxOrDelta === 0) return;

    fxImgIndexPerSlide[slideIdx] = nextIdx;
    const fxType = slide.imgDisplayTp || 'fadeSlider';
    const stage = document.querySelector(`[data-fx-stage="${slideIdx}"]`);
    if (!stage) return;

    if (fxType === 'fadeSlider') {
      const items = stage.querySelectorAll('.fx-fade-item');
      items.forEach((el, i) => {
        if (i === nextIdx) {
          el.classList.remove('active');
          void el.offsetWidth;
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    } else if (fxType === 'basicSlider') {
      stage.style.transform = `translateX(-${nextIdx * 100}%)`;
    } else if (fxType === 'cubeSlider') {
      triggerCubeMosaicScatter(stage, images[prevIdx], images[nextIdx]);
    } else if (fxType === 'flipCard') {
      stage.querySelectorAll('.fx-flip-item').forEach((el, i) => {
        el.classList.toggle('active', i === nextIdx);
      });
    } else if (fxType === 'cardSlider') {
      const leftIdx = (nextIdx - 1 + n) % n;
      const rightIdx = (nextIdx + 1) % n;
      stage.querySelectorAll('.fx-card-item').forEach((el, i) => {
        el.classList.remove('active', 'left', 'right');
        if (i === nextIdx) el.classList.add('active');
        else if (i === leftIdx) el.classList.add('left');
        else if (i === rightIdx) el.classList.add('right');
      });
    } else if (fxType === 'zoomSlider' || fxType === 'flipXSlider' || fxType === 'flipYSlider') {
      const sel = fxType === 'zoomSlider' ? '.fx-zoom-item' : (fxType === 'flipXSlider' ? '.fx-flipx-item' : '.fx-flipy-item');
      const items = stage.querySelectorAll(sel);
      items.forEach((el, i) => {
        el.classList.remove('active', 'exiting');
        if (i === prevIdx) {
          el.classList.add('exiting');
        } else if (i === nextIdx) {
          el.style.transition = 'none';
          el.style.opacity = '';
          el.style.transform = '';
          void el.offsetWidth;
          el.style.transition = '';
          el.classList.add('active');
        }
      });
    } else if (fxType === 'cuboidSlider') {
      const stepDelta = isDelta ? targetIdxOrDelta : (nextIdx - prevIdx);
      fxCuboidStepPerSlide[slideIdx] = (fxCuboidStepPerSlide[slideIdx] || 0) + stepDelta;
      const box = stage.querySelector('.fx-stage-cuboid');
      const wrapWidth = stage.clientWidth || 336;
      const zDist = wrapWidth / 2;
      stage.querySelectorAll('.fx-cuboid-face').forEach((f, i) => {
        f.style.transform = `rotateY(${i * 90}deg) translateZ(${zDist}px)`;
      });
      if (box) {
        box.style.transform = `rotateY(${-(fxCuboidStepPerSlide[slideIdx] * 90)}deg)`;
      }
    } else if (fxType === 'cards2Slider') {
      const cards = Array.from(stage.querySelectorAll('.cards2-card'));
      const topCard = cards[prevIdx];
      const flyClass = directionHint === 'left' ? 'flying-left' : 'flying-right';
      const stampClass = directionHint === 'left' ? 'noping' : 'liking';

      if (topCard && prevIdx !== nextIdx) {
        topCard.classList.add(stampClass, flyClass);
      }

      const nextCardIdx = (nextIdx + 1) % n;
      const behindCardIdx = (nextIdx + 2) % n;

      setTimeout(() => {
        cards.forEach((c, i) => {
          c.classList.remove('top', 'next', 'behind', 'flying-right', 'flying-left', 'liking', 'noping');
          c.style.transform = '';
          if (i === nextIdx) c.classList.add('top');
          else if (i === nextCardIdx) c.classList.add('next');
          else if (i === behindCardIdx) c.classList.add('behind');
        });
      }, 280);
    }

    updateFxProgressUI(slideIdx, n);
  }

  function startImageEffectEngine(slideIdx) {
    stopAllImageEffectTimers();
    const slide = slides[slideIdx];
    if (!slide || slide.mediaTp !== 'P') return;

    // Ensure cuboid translateZ matches rendered container width
    if (slide.imgDisplayTp === 'cuboidSlider') {
      const stage = document.querySelector(`[data-fx-stage="${slideIdx}"]`);
      if (stage) {
        const zDist = (stage.clientWidth || 336) / 2;
        stage.querySelectorAll('.fx-cuboid-face').forEach((f, i) => {
          f.style.transform = `rotateY(${i * 90}deg) translateZ(${zDist}px)`;
        });
      }
    }

    if (fxAutoplayEnabled) {
      fxTimers[slideIdx] = setInterval(() => {
        if (document.hidden || activeSlideIndex !== slideIdx) return;
        transitionImageEffect(slideIdx, 1, true, 'right');
      }, fxIntervalMs);
    }
  }

  // --- 6. Dynamic Slides Renderer ---
  function renderAllSlides() {
    if (!elSwiperTrack) return;
    stopAllImageEffectTimers();
    elSwiperTrack.innerHTML = '';

    slides.forEach((slide, index) => {
      const card = document.createElement('div');
      card.className = `shorts-slide-card ${index === activeSlideIndex ? 'active' : ''}`;
      card.dataset.slideIndex = index;

      // 1) Media layer: Mode P (10 Image Effects) vs Mode M (Video)
      let mediaHtml = '';
      if (slide.mediaTp === 'P') {
        mediaHtml = buildImageEffectMarkup(slide, index);
      } else {
        const ytId = extractYouTubeId(slide.youtubeId);
        const muteParam = videoMuted ? 1 : 0;
        const iframeSrc = index === activeSlideIndex && ytId
          ? `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${muteParam}&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`
          : '';
        mediaHtml = `
          <div class="shorts-video-viewport" data-slide-viewport="${index}">
            ${iframeSrc ? `<iframe id="slide-iframe-${index}" src="${iframeSrc}" allow="autoplay; encrypted-media" allowfullscreen title="Shorts Player"></iframe>` : ''}
          </div>
        `;
      }

      // 2) Overlay content layer
      const isChatbotVisible = slide.chatbotYn !== false;
      const isReviewVisible = slide.reviewYn !== false;
      const likeCount = likeCountPerSlide[index] !== undefined ? likeCountPerSlide[index] : 1248;
      const isLiked = likeStatePerSlide[index] || false;
      const activeTag = activeTagIndexPerSlide[index];

      const tags = slide.tags || [];
      const tagsHtml = tags.map((t, tIdx) => {
        const isTagActive = activeTag === tIdx;
        const label = cleanTagLabel(t.tag);
        return `
          <button class="hashtag-chip ${isTagActive ? 'active' : ''}" type="button" data-slide-tag="${index}" data-tag-idx="${tIdx}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
              <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
            </svg>
            <span>${label}</span>
          </button>
        `;
      }).join('');

      const activeTagObj = activeTag !== undefined && activeTag >= 0 && tags[activeTag] ? tags[activeTag] : null;
      const buyGradient = slide.ctaGradient || 'linear-gradient(135deg, #ec4899, #d946ef)';

      card.innerHTML = `
        ${mediaHtml}
        <div class="shorts-gradient-overlay"></div>

        <div class="shorts-content-layer">
          <div class="shorts-header-zone">
            <h2 class="live-short-top-title" data-field="top-title" style="color: ${slide.contentTopColor || '#ffffff'};">
              ${slide.contentTop || ''}
            </h2>
          </div>

          ${slide.contentMid ? `
            <h3 class="live-short-mid-title" data-field="mid-title" style="color: ${slide.contentMidColor || '#60a5fa'};">
              ${slide.contentMid}
            </h3>
          ` : ''}

          <div class="shorts-bottom-zone">
            ${isReviewVisible ? `
              <div class="live-hashtags-bar" data-slide-tags-bar="${index}">
                ${tagsHtml}
              </div>

              <div class="review-speech-bubble ${activeTagObj ? 'show' : ''}" data-slide-bubble="${index}">
                <span class="review-bubble-tag">${activeTagObj ? '#' + cleanTagLabel(activeTagObj.tag) : ''}</span>
                <p style="margin:0;">${activeTagObj ? activeTagObj.text : ''}</p>
              </div>
            ` : ''}

            ${slide.content ? `
              <p class="live-aux-content" data-field="aux-content">
                ${slide.content}
              </p>
            ` : ''}

            <a class="live-buy-btn" data-field="buy-btn" href="${slide.productUrl || '#'}" target="_blank" rel="noopener" style="background: ${buyGradient};">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span data-field="buy-btn-text">${slide.buyBtnText || '구매하기 ↗'}</span>
            </a>
          </div>
        </div>

        <div class="shorts-floating-controls">
          <button class="floating-action-btn ${isLiked ? 'active' : ''}" type="button" data-action="like" data-slide-ref="${index}" aria-label="좋아요">
            <span class="floating-action-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="${isLiked ? '#ffffff' : 'none'}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </span>
            <span class="floating-action-label">${likeCount.toLocaleString()}</span>
          </button>

          <button class="floating-action-btn" type="button" data-action="share" data-slide-ref="${index}" aria-label="공유하기">
            <span class="floating-action-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </span>
            <span class="floating-action-label">공유</span>
          </button>

          ${isChatbotVisible ? `
            <button class="floating-action-btn" type="button" data-action="chatbot" data-slide-ref="${index}" aria-label="AI 챗봇 상담">
              <span class="floating-action-icon" style="background: rgba(29, 78, 216, 0.78); border-color: rgba(96, 165, 250, 0.55);">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              <span class="floating-action-label">챗봇</span>
            </button>
          ` : ''}
        </div>
      `;

      elSwiperTrack.appendChild(card);
    });

    renderPaginationDots();
    renderSlideTabs();
    bindSlideCardEvents();

    if (slides[activeSlideIndex] && slides[activeSlideIndex].mediaTp === 'P') {
      startImageEffectEngine(activeSlideIndex);
    }
    updateLiveJsonPreview();
  }

  function renderPaginationDots() {
    if (!elPhonePaginationDots) return;
    elPhonePaginationDots.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `phone-page-dot ${i === activeSlideIndex ? 'active' : ''}`;
      dot.type = 'button';
      dot.dataset.pageIndex = i;
      dot.setAttribute('aria-label', `슬라이드 ${i + 1}로 이동`);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(i);
      });
      elPhonePaginationDots.appendChild(dot);
    });
  }

  function renderSlideTabs() {
    if (!elSlideTabsList) return;
    elSlideTabsList.innerHTML = '';

    slides.forEach((slide, idx) => {
      const tab = document.createElement('button');
      tab.className = `slide-tab-item ${idx === activeSlideIndex ? 'active' : ''}`;
      tab.type = 'button';
      tab.dataset.slideTabIndex = idx;

      const isImageFx = slide.mediaTp === 'P';
      const label = slide.shortName || (slide.name ? slide.name.split('&')[0].trim() : (slide.productNm ? slide.productNm.slice(0, 8) : `쇼츠 0${idx + 1}`));
      const modePill = isImageFx
        ? `<span class="slide-tab-mode-pill is-fx">FX</span>`
        : `<span class="slide-tab-mode-pill is-video">VID</span>`;

      tab.innerHTML = `
        <span class="slide-tab-left">
          <span class="slide-tab-badge">0${idx + 1}</span>
          <span class="slide-tab-title-text">${label}</span>
        </span>
        ${modePill}
      `;

      tab.addEventListener('click', () => goToSlide(idx));
      elSlideTabsList.appendChild(tab);
    });

    if (elActiveSlideBadge) {
      elActiveSlideBadge.textContent = `SLIDE ${activeSlideIndex + 1} / ${slides.length}`;
    }
    if (elPhoneSlideCounter) {
      elPhoneSlideCounter.textContent = `${activeSlideIndex + 1} / ${slides.length}`;
    }
    if (elPhoneNavPrev) elPhoneNavPrev.disabled = activeSlideIndex === 0;
    if (elPhoneNavNext) elPhoneNavNext.disabled = activeSlideIndex === slides.length - 1;
    if (btnSlidePrev) btnSlidePrev.disabled = activeSlideIndex === 0;
    if (btnSlideNext) btnSlideNext.disabled = activeSlideIndex === slides.length - 1;
    if (btnDeleteSlide) btnDeleteSlide.disabled = slides.length <= 1;
  }

  // --- 7. Slide Switching Engine ---
  function goToSlide(newIndex, animate = true) {
    if (newIndex < 0 || newIndex >= slides.length) return;
    const prevIndex = activeSlideIndex;
    activeSlideIndex = newIndex;
    selectedImageSlotIndex = 0;

    if (elSwiperTrack) {
      if (!animate) elSwiperTrack.classList.add('no-transition');
      elSwiperTrack.style.transform = `translateY(-${activeSlideIndex * 100}%)`;
      if (!animate) {
        void elSwiperTrack.offsetHeight;
        elSwiperTrack.classList.remove('no-transition');
      }
    }

    if (prevIndex !== activeSlideIndex && elPhoneSwipeHint) {
      elPhoneSwipeHint.classList.add('dismissed');
    }

    manageMediaOnSlideChange(prevIndex, activeSlideIndex);

    document.querySelectorAll('.shorts-slide-card').forEach((card, i) => {
      card.classList.toggle('active', i === activeSlideIndex);
    });

    renderPaginationDots();
    renderSlideTabs();
    populateControllerInputs();
  }

  function manageMediaOnSlideChange(prevIdx, currIdx) {
    // Clean previous video iframe to prevent background audio collision
    if (prevIdx !== currIdx && slides[prevIdx] && slides[prevIdx].mediaTp !== 'P') {
      const prevViewport = document.querySelector(`[data-slide-viewport="${prevIdx}"]`);
      if (prevViewport) prevViewport.innerHTML = '';
    }

    stopAllImageEffectTimers();

    const currSlide = slides[currIdx];
    if (!currSlide) return;

    if (currSlide.mediaTp === 'P') {
      if (elPhoneModeBadge) {
        elPhoneModeBadge.textContent = `IMAGE FX · ${currSlide.imgDisplayTp || 'fadeSlider'}`;
      }
      startImageEffectEngine(currIdx);
    } else {
      if (elPhoneModeBadge) {
        elPhoneModeBadge.textContent = 'VIDEO MODE · LIVE';
      }
      const currViewport = document.querySelector(`[data-slide-viewport="${currIdx}"]`);
      if (currViewport && !currViewport.querySelector('iframe')) {
        const ytId = extractYouTubeId(currSlide.youtubeId);
        if (ytId) {
          const muteParam = videoMuted ? 1 : 0;
          currViewport.innerHTML = `
            <iframe
              id="slide-iframe-${currIdx}"
              src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${muteParam}&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="Shorts Player">
            </iframe>
          `;
        }
      }
    }
  }

  // --- 8. In-Slide Card Events (Tags, Likes, Share, Chatbot, FX Dots, Cards2 Drag) ---
  function bindSlideCardEvents() {
    // Hashtags
    document.querySelectorAll('[data-slide-tag]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sIdx = parseInt(btn.dataset.slideTag, 10);
        const tIdx = parseInt(btn.dataset.tagIdx, 10);
        activeTagIndexPerSlide[sIdx] = (activeTagIndexPerSlide[sIdx] === tIdx) ? -1 : tIdx;
        updateSlideReviewsUI(sIdx);
      });
    });

    // Like button
    document.querySelectorAll('[data-action="like"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sIdx = parseInt(btn.dataset.slideRef, 10);
        const wasLiked = likeStatePerSlide[sIdx] || false;
        likeStatePerSlide[sIdx] = !wasLiked;
        const curr = likeCountPerSlide[sIdx] !== undefined ? likeCountPerSlide[sIdx] : 1248;
        likeCountPerSlide[sIdx] = wasLiked ? curr - 1 : curr + 1;

        btn.classList.toggle('active', likeStatePerSlide[sIdx]);
        const svgPath = btn.querySelector('svg');
        const label = btn.querySelector('.floating-action-label');
        if (svgPath) svgPath.setAttribute('fill', likeStatePerSlide[sIdx] ? '#ffffff' : 'none');
        if (label) label.textContent = likeCountPerSlide[sIdx].toLocaleString();
      });
    });

    // Share modal trigger
    document.querySelectorAll('[data-action="share"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (elInphoneShare) elInphoneShare.classList.add('active');
      });
    });

    // Chatbot modal trigger
    document.querySelectorAll('[data-action="chatbot"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (elInphoneChatbot) {
          elInphoneChatbot.classList.add('active');
          if (elChatInput) elChatInput.focus();
        }
      });
    });

    // Image FX Progress Dots Click
    document.querySelectorAll('[data-fx-jump]').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const sIdx = parseInt(dot.dataset.fxJump, 10);
        const imgIdx = parseInt(dot.dataset.imgIdx, 10);
        transitionImageEffect(sIdx, imgIdx, false);
        startImageEffectEngine(sIdx);
      });
    });
  }

  function updateSlideReviewsUI(sIdx) {
    const card = document.querySelector(`.shorts-slide-card[data-slide-index="${sIdx}"]`);
    if (!card) return;
    const slide = slides[sIdx];
    if (!slide) return;

    const activeTag = activeTagIndexPerSlide[sIdx];
    card.querySelectorAll('[data-slide-tag]').forEach(chip => {
      chip.classList.toggle('active', parseInt(chip.dataset.tagIdx, 10) === activeTag);
    });

    const bubble = card.querySelector(`[data-slide-bubble="${sIdx}"]`);
    if (bubble) {
      if (activeTag !== undefined && activeTag >= 0 && slide.tags && slide.tags[activeTag]) {
        const item = slide.tags[activeTag];
        bubble.querySelector('.review-bubble-tag').textContent = `#${cleanTagLabel(item.tag)}`;
        bubble.querySelector('p').textContent = item.text;
        bubble.classList.add('show');
      } else {
        bubble.classList.remove('show');
      }
    }
  }

  // --- 9. Vertical Swiper + Horizontal Cards2 / Image Gesture Engine ---
  function initGestureEngine() {
    if (!elSwiperContainer) return;

    let pointerActive = false;
    let gestureAxis = null; // 'vertical' | 'horizontal' | null
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let lastWheelTime = 0;

    elSwiperContainer.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, textarea, .inphone-chatbot-popover, .inphone-share-modal')) return;

      pointerActive = true;
      gestureAxis = null;
      startX = e.clientX;
      startY = e.clientY;
      currentX = e.clientX;
      currentY = e.clientY;

      elSwiperContainer.setPointerCapture(e.pointerId);
    });

    elSwiperContainer.addEventListener('pointermove', (e) => {
      if (!pointerActive || !elSwiperTrack) return;
      currentX = e.clientX;
      currentY = e.clientY;
      const dx = currentX - startX;
      const dy = currentY - startY;

      // Decide axis after small movement
      if (!gestureAxis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        const currSlide = slides[activeSlideIndex];
        const supportsHoriz = currSlide && currSlide.mediaTp === 'P';
        if (supportsHoriz && Math.abs(dx) > Math.abs(dy)) {
          gestureAxis = 'horizontal';
        } else {
          gestureAxis = 'vertical';
          elSwiperContainer.classList.add('is-dragging');
          elSwiperTrack.classList.add('no-transition');
        }
      }

      if (gestureAxis === 'vertical') {
        let resistance = 1;
        if ((activeSlideIndex === 0 && dy > 0) || (activeSlideIndex === slides.length - 1 && dy < 0)) {
          resistance = 0.28;
        }
        const h = elSwiperContainer.offsetHeight;
        const offset = -(activeSlideIndex * h) + (dy * resistance);
        elSwiperTrack.style.transform = `translateY(${offset}px)`;
      } else if (gestureAxis === 'horizontal') {
        const currSlide = slides[activeSlideIndex];
        if (currSlide && currSlide.imgDisplayTp === 'cards2Slider') {
          const topCard = document.querySelector(`[data-fx-stage="${activeSlideIndex}"] .cards2-card.top`);
          if (topCard) {
            topCard.classList.add('no-transition');
            topCard.style.transform = `translate(${dx}px, ${Math.abs(dx) * 0.08}px) rotate(${dx * 0.075}deg)`;
            topCard.classList.toggle('liking', dx > 25);
            topCard.classList.toggle('noping', dx < -25);
          }
        }
      }
    });

    const endGesture = (e) => {
      if (!pointerActive) return;
      pointerActive = false;

      elSwiperContainer.classList.remove('is-dragging');
      if (elSwiperTrack) elSwiperTrack.classList.remove('no-transition');
      try {
        elSwiperContainer.releasePointerCapture(e.pointerId);
      } catch (_) {}

      const dx = currentX - startX;
      const dy = currentY - startY;

      // Tap gesture (less than 6px movement)
      if (!gestureAxis && Math.hypot(dx, dy) < 6) {
        const currSlide = slides[activeSlideIndex];
        if (currSlide && currSlide.mediaTp !== 'P') {
          const wasPaused = !!videoPausedPerSlide[activeSlideIndex];
          videoPausedPerSlide[activeSlideIndex] = !wasPaused;
          sendYouTubeCommand(activeSlideIndex, wasPaused ? 'playVideo' : 'pauseVideo');
          flashVideoStatus(wasPaused);
        }
        return;
      }

      if (gestureAxis === 'vertical') {
        const threshold = 48;
        if (dy < -threshold && activeSlideIndex < slides.length - 1) {
          goToSlide(activeSlideIndex + 1);
        } else if (dy > threshold && activeSlideIndex > 0) {
          goToSlide(activeSlideIndex - 1);
        } else {
          goToSlide(activeSlideIndex);
        }
      } else if (gestureAxis === 'horizontal') {
        const currSlide = slides[activeSlideIndex];
        if (currSlide && currSlide.mediaTp === 'P') {
          if (currSlide.imgDisplayTp === 'cards2Slider') {
            const topCard = document.querySelector(`[data-fx-stage="${activeSlideIndex}"] .cards2-card.top`);
            if (topCard) {
              topCard.classList.remove('no-transition', 'liking', 'noping');
              topCard.style.transform = '';
            }
          }
          if (dx < -45) {
            transitionImageEffect(activeSlideIndex, 1, true, 'left');
            startImageEffectEngine(activeSlideIndex);
          } else if (dx > 45) {
            transitionImageEffect(activeSlideIndex, 1, true, 'right');
            startImageEffectEngine(activeSlideIndex);
          }
        }
      }
      gestureAxis = null;
    };

    elSwiperContainer.addEventListener('pointerup', endGesture);
    elSwiperContainer.addEventListener('pointercancel', endGesture);

    // Mouse Wheel
    elSwiperContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime < 380) return;
      if (e.deltaY > 24 && activeSlideIndex < slides.length - 1) {
        lastWheelTime = now;
        goToSlide(activeSlideIndex + 1);
      } else if (e.deltaY < -24 && activeSlideIndex > 0) {
        lastWheelTime = now;
        goToSlide(activeSlideIndex - 1);
      }
    }, { passive: false });

    // Keyboard Arrows
    elSwiperContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToSlide(activeSlideIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(activeSlideIndex - 1);
      }
    });

    if (elPhoneNavPrev) elPhoneNavPrev.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(activeSlideIndex - 1); });
    if (elPhoneNavNext) elPhoneNavNext.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(activeSlideIndex + 1); });
    if (btnSlidePrev) btnSlidePrev.addEventListener('click', () => goToSlide(activeSlideIndex - 1));
    if (btnSlideNext) btnSlideNext.addEventListener('click', () => goToSlide(activeSlideIndex + 1));

    if (btnAddSlide) {
      btnAddSlide.addEventListener('click', () => {
        const newIdx = slides.length;
        const newSlide = JSON.parse(JSON.stringify(PRESET_TEMPLATES.preset2));
        newSlide.mediaTp = 'P';
        newSlide.imgDisplayTp = 'cuboidSlider';
        newSlide.shortName = `쇼츠 0${newIdx + 1}`;
        newSlide.productNm = `신규 이미지 쇼츠 #${newIdx + 1}`;
        newSlide.contentTop = `새로 추가된 3D 이미지 이펙트 #${newIdx + 1}`;
        slides.push(newSlide);
        likeStatePerSlide[newIdx] = false;
        likeCountPerSlide[newIdx] = 520;
        fxImgIndexPerSlide[newIdx] = 0;
        fxCuboidStepPerSlide[newIdx] = 0;
        renderAllSlides();
        goToSlide(newIdx);
        showToast(`신규 슬라이드 #${newIdx + 1}이 추가되었습니다.`);
      });
    }

    if (btnDeleteSlide) {
      btnDeleteSlide.addEventListener('click', () => {
        if (slides.length <= 1) {
          showToast('최소 1개의 슬라이드는 유지되어야 합니다.');
          return;
        }
        const delIdx = activeSlideIndex;
        slides.splice(delIdx, 1);
        const nextIdx = Math.min(delIdx, slides.length - 1);
        renderAllSlides();
        goToSlide(nextIdx);
        showToast('선택된 슬라이드가 삭제되었습니다.');
      });
    }
  }

  // --- 10. Render Studio 10-Effects Grid & Thumbnails ---
  function buildEffectIconSvg(id) {
    switch (id) {
      case 'fadeSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>';
      case 'basicSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="10 9 15 12 10 15"/></svg>';
      case 'cubeSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>';
      case 'flipCard': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>';
      case 'cardSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="6" y="4" width="12" height="16" rx="2"/><path d="M2 7v10M22 7v10"/></svg>';
      case 'zoomSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
      case 'flipXSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3v18"/><polyline points="7 8 3 12 7 16"/><polyline points="17 8 21 12 17 16"/></svg>';
      case 'flipYSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 12h18"/><polyline points="8 7 12 3 16 7"/><polyline points="8 17 12 21 16 17"/></svg>';
      case 'cuboidSlider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>';
      case 'cards2Slider': return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="6" y="3" width="12" height="15" rx="2"/><path d="M4 8l2 10h12"/></svg>';
      default: return '';
    }
  }

  function renderEffectsGrid10(activeFxId) {
    if (!elEffectsGrid10) return;
    elEffectsGrid10.innerHTML = IMAGE_EFFECTS.map(fx => `
      <button type="button" class="effect-option-btn ${fx.id === activeFxId ? 'active' : ''}" data-fx-select="${fx.id}">
        <div class="effect-opt-top">
          ${buildEffectIconSvg(fx.id)}
          <span class="effect-opt-num">${fx.num}</span>
        </div>
        <span class="effect-opt-name">${fx.name}</span>
        <span class="effect-opt-key">${fx.id}</span>
      </button>
    `).join('');

    elEffectsGrid10.querySelectorAll('[data-fx-select]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fxId = btn.dataset.fxSelect;
        const slide = slides[activeSlideIndex];
        if (!slide) return;

        slide.mediaTp = 'P';
        slide.imgDisplayTp = fxId;
        fxImgIndexPerSlide[activeSlideIndex] = 0;
        fxCuboidStepPerSlide[activeSlideIndex] = 0;

        renderAllSlides();
        goToSlide(activeSlideIndex, false);
        populateControllerInputs();

        // Trigger immediate preview step so visual effect demonstrates itself right away
        setTimeout(() => {
          transitionImageEffect(activeSlideIndex, 1, true, 'right');
        }, 280);

        const meta = getEffectMeta(fxId);
        showToast(`이미지 효과 '${meta.name} (${meta.id})' 적용 완료`);
      });
    });
  }

  function renderEffectThumbnails(slide) {
    if (!elEffectThumbsStrip) return;
    const images = slide.galleryImages || PRESET_TEMPLATES.preset2.galleryImages;
    if (selectedImageSlotIndex >= images.length) selectedImageSlotIndex = 0;

    elEffectThumbsStrip.innerHTML = images.map((url, idx) => `
      <button type="button" class="effect-thumb-btn ${idx === selectedImageSlotIndex ? 'active' : ''}" data-thumb-slot="${idx}" title="${idx + 1}번 이미지 선택">
        <img src="${url}" alt="Thumbnail ${idx + 1}" />
      </button>
    `).join('');

    elEffectThumbsStrip.querySelectorAll('[data-thumb-slot]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedImageSlotIndex = parseInt(btn.dataset.thumbSlot, 10);
        if (elSelectedImgSlotLabel) elSelectedImgSlotLabel.textContent = `${selectedImageSlotIndex + 1}번 이미지`;
        if (inputSelectedImgUrl) inputSelectedImgUrl.value = images[selectedImageSlotIndex] || '';
        transitionImageEffect(activeSlideIndex, selectedImageSlotIndex, false);
        renderEffectThumbnails(slide);
      });
    });

    if (elSelectedImgSlotLabel) elSelectedImgSlotLabel.textContent = `${selectedImageSlotIndex + 1}번 이미지`;
    if (inputSelectedImgUrl) inputSelectedImgUrl.value = images[selectedImageSlotIndex] || '';
  }

  // --- 11. Populate Controller Inputs ---
  function populateControllerInputs() {
    const slide = slides[activeSlideIndex];
    if (!slide) return;

    const isImageMode = slide.mediaTp === 'P';

    if (btnMediaVideo) btnMediaVideo.classList.toggle('active', !isImageMode);
    if (btnMediaImage) btnMediaImage.classList.toggle('active', isImageMode);
    if (panelVideoConfig) panelVideoConfig.style.display = isImageMode ? 'none' : 'block';
    if (panelImageConfig) panelImageConfig.style.display = isImageMode ? 'block' : 'none';

    if (elModeActiveSpec) {
      elModeActiveSpec.textContent = isImageMode
        ? `mediaTp: "P" · ${slide.imgDisplayTp || 'fadeSlider'}`
        : 'mediaTp: "M" (Video)';
    }

    if (elPhoneModeBadge) {
      elPhoneModeBadge.textContent = isImageMode
        ? `IMAGE FX · ${slide.imgDisplayTp || 'fadeSlider'}`
        : 'VIDEO MODE · LIVE';
    }

    if (inputYoutubeUrl) inputYoutubeUrl.value = slide.youtubeId || '';
    if (inputProductNm) inputProductNm.value = slide.productNm || '';
    if (inputProductUrl) inputProductUrl.value = slide.productUrl || '';
    if (inputTopTitle) inputTopTitle.value = slide.contentTop || '';
    if (inputTopColor) inputTopColor.value = slide.contentTopColor || '#ffffff';
    if (inputMidTitle) inputMidTitle.value = slide.contentMid || '';
    if (inputMidColor) inputMidColor.value = slide.contentMidColor || '#60a5fa';
    if (inputAuxContent) inputAuxContent.value = slide.content || '';
    if (inputBuyBtnText) inputBuyBtnText.value = slide.buyBtnText || '';
    if (toggleChatbot) toggleChatbot.checked = slide.chatbotYn !== false;
    if (toggleReview) toggleReview.checked = slide.reviewYn !== false;

    // Sample video highlight
    document.querySelectorAll('[data-sample-yt]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.sampleYt === extractYouTubeId(slide.youtubeId));
    });

    // Populate 10-Effects picker & thumbnails
    const activeFx = slide.imgDisplayTp || 'fadeSlider';
    const fxMeta = getEffectMeta(activeFx);
    renderEffectsGrid10(activeFx);
    if (elEffectActiveHint) {
      elEffectActiveHint.textContent = `활성 효과: ${fxMeta.name} (${fxMeta.id})`;
    }
    const imgs = slide.galleryImages || PRESET_TEMPLATES.preset2.galleryImages;
    const curImgIdx = (fxImgIndexPerSlide[activeSlideIndex] || 0) % imgs.length;
    if (elFxImgCounter) elFxImgCounter.textContent = `${curImgIdx + 1} / ${imgs.length}`;
    renderEffectThumbnails(slide);

    // Update JSON preview
    updateLiveJsonPreview();
  }

  // --- 12. Bind All Controller Inputs & Studio Tabs ---
  function bindControllerInputs() {
    // Studio Sub-Tabs
    document.querySelectorAll('[data-studio-tab]').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const target = tabBtn.dataset.studioTab;
        document.querySelectorAll('[data-studio-tab]').forEach(b => {
          const active = b.dataset.studioTab === target;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', String(active));
        });
        document.querySelectorAll('[data-studio-pane]').forEach(pane => {
          pane.classList.toggle('active', pane.dataset.studioPane === target);
        });
      });
    });

    // Dual Mode Toggle (Video M vs Image Effect P)
    if (btnMediaVideo) {
      btnMediaVideo.addEventListener('click', () => {
        if (slides[activeSlideIndex].mediaTp !== 'M') {
          slides[activeSlideIndex].mediaTp = 'M';
          renderAllSlides();
          goToSlide(activeSlideIndex, false);
          populateControllerInputs();
          showToast('영상 스트리밍 모드(mediaTp: M)로 전환되었습니다.');
        }
      });
    }

    if (btnMediaImage) {
      btnMediaImage.addEventListener('click', () => {
        if (slides[activeSlideIndex].mediaTp !== 'P') {
          slides[activeSlideIndex].mediaTp = 'P';
          if (!slides[activeSlideIndex].imgDisplayTp) {
            slides[activeSlideIndex].imgDisplayTp = 'cards2Slider';
          }
          renderAllSlides();
          goToSlide(activeSlideIndex, false);
          populateControllerInputs();
          setTimeout(() => transitionImageEffect(activeSlideIndex, 1, true, 'right'), 300);
          showToast('이미지 효과 모드(mediaTp: P)로 전환되었습니다.');
        }
      });
    }

    // Video Controls
    const applyYoutubeId = () => {
      const id = extractYouTubeId(inputYoutubeUrl?.value);
      if (!id) return;
      slides[activeSlideIndex].youtubeId = id;
      slides[activeSlideIndex].mediaTp = 'M';
      renderAllSlides();
      goToSlide(activeSlideIndex, false);
      populateControllerInputs();
      showToast(`비디오 ID (${id})가 로딩되었습니다.`);
    };

    if (btnApplyYoutube) btnApplyYoutube.addEventListener('click', applyYoutubeId);
    if (inputYoutubeUrl) inputYoutubeUrl.addEventListener('change', applyYoutubeId);

    document.querySelectorAll('[data-sample-yt]').forEach(chip => {
      chip.addEventListener('click', () => {
        const ytId = chip.dataset.sampleYt;
        if (inputYoutubeUrl) inputYoutubeUrl.value = ytId;
        applyYoutubeId();
      });
    });

    if (btnVideoTogglePlay) {
      btnVideoTogglePlay.addEventListener('click', () => {
        if (slides[activeSlideIndex].mediaTp === 'P') return;
        const wasPaused = !!videoPausedPerSlide[activeSlideIndex];
        videoPausedPerSlide[activeSlideIndex] = !wasPaused;
        sendYouTubeCommand(activeSlideIndex, wasPaused ? 'playVideo' : 'pauseVideo');
        flashVideoStatus(wasPaused);
      });
    }

    if (btnVideoToggleMute) {
      btnVideoToggleMute.addEventListener('click', () => {
        videoMuted = !videoMuted;
        if (labelVideoMute) labelVideoMute.textContent = videoMuted ? '음소거 중' : '소리 켜짐';
        sendYouTubeCommand(activeSlideIndex, videoMuted ? 'mute' : 'unMute');
        showToast(videoMuted ? '비디오 음소거 상태로 설정됨' : '비디오 오디오 활성화');
      });
    }

    // Image Effect Controls (Prev / Next / Replay / Speed / Autoplay / URL edit)
    if (btnFxPrev) {
      btnFxPrev.addEventListener('click', () => {
        transitionImageEffect(activeSlideIndex, -1, true, 'left');
        startImageEffectEngine(activeSlideIndex);
      });
    }
    if (btnFxNext) {
      btnFxNext.addEventListener('click', () => {
        transitionImageEffect(activeSlideIndex, 1, true, 'right');
        startImageEffectEngine(activeSlideIndex);
      });
    }
    if (btnFxReplay) {
      btnFxReplay.addEventListener('click', () => {
        transitionImageEffect(activeSlideIndex, 1, true, 'right');
        startImageEffectEngine(activeSlideIndex);
        showToast('선택된 이미지 이펙트를 즉시 재실행했습니다.');
      });
    }
    if (toggleFxAutoplay) {
      toggleFxAutoplay.addEventListener('change', (e) => {
        fxAutoplayEnabled = e.target.checked;
        if (fxAutoplayEnabled) startImageEffectEngine(activeSlideIndex);
        else stopAllImageEffectTimers();
      });
    }
    if (selectFxInterval) {
      selectFxInterval.addEventListener('change', (e) => {
        fxIntervalMs = parseInt(e.target.value, 10) || 3200;
        startImageEffectEngine(activeSlideIndex);
      });
    }
    if (btnApplyImgUrl) {
      btnApplyImgUrl.addEventListener('click', () => {
        const newUrl = inputSelectedImgUrl?.value.trim();
        const slide = slides[activeSlideIndex];
        if (!newUrl || !slide) return;
        if (!slide.galleryImages) slide.galleryImages = [...PRESET_TEMPLATES.preset2.galleryImages];
        slide.galleryImages[selectedImageSlotIndex] = newUrl;
        renderAllSlides();
        goToSlide(activeSlideIndex, false);
        populateControllerInputs();
        showToast(`${selectedImageSlotIndex + 1}번 이미지 소스가 교체되었습니다.`);
      });
    }

    // Live Text & Color Reactive Updates
    const updateActiveSlideDOM = () => {
      const slide = slides[activeSlideIndex];
      if (!slide) return;
      const card = document.querySelector(`.shorts-slide-card[data-slide-index="${activeSlideIndex}"]`);
      if (!card) return;

      const topEl = card.querySelector('[data-field="top-title"]');
      if (topEl) {
        topEl.textContent = slide.contentTop;
        topEl.style.color = slide.contentTopColor;
      }
      const midEl = card.querySelector('[data-field="mid-title"]');
      if (midEl) {
        midEl.textContent = slide.contentMid;
        midEl.style.color = slide.contentMidColor;
        midEl.style.display = slide.contentMid ? 'block' : 'none';
      }
      const auxEl = card.querySelector('[data-field="aux-content"]');
      if (auxEl) auxEl.textContent = slide.content;

      const buyBtn = card.querySelector('[data-field="buy-btn"]');
      const buyText = card.querySelector('[data-field="buy-btn-text"]');
      if (buyBtn && slide.productUrl) buyBtn.href = slide.productUrl;
      if (buyBtn && slide.ctaGradient) buyBtn.style.background = slide.ctaGradient;
      if (buyText && slide.buyBtnText) buyText.textContent = slide.buyBtnText;

      const tabText = document.querySelector(`.slide-tab-item[data-slide-tab-index="${activeSlideIndex}"] .slide-tab-title-text`);
      if (tabText) {
        tabText.textContent = slide.shortName || (slide.productNm ? slide.productNm.slice(0, 8) : `쇼츠 0${activeSlideIndex + 1}`);
      }
      updateLiveJsonPreview();
    };

    if (inputProductNm) inputProductNm.addEventListener('input', (e) => {
      slides[activeSlideIndex].productNm = e.target.value;
      slides[activeSlideIndex].shortName = e.target.value.slice(0, 9);
      updateActiveSlideDOM();
    });
    if (inputProductUrl) inputProductUrl.addEventListener('input', (e) => { slides[activeSlideIndex].productUrl = e.target.value; updateActiveSlideDOM(); });
    if (inputTopTitle) inputTopTitle.addEventListener('input', (e) => { slides[activeSlideIndex].contentTop = e.target.value; updateActiveSlideDOM(); });
    if (inputTopColor) inputTopColor.addEventListener('input', (e) => { slides[activeSlideIndex].contentTopColor = e.target.value; updateActiveSlideDOM(); });
    if (inputMidTitle) inputMidTitle.addEventListener('input', (e) => { slides[activeSlideIndex].contentMid = e.target.value; updateActiveSlideDOM(); });
    if (inputMidColor) inputMidColor.addEventListener('input', (e) => { slides[activeSlideIndex].contentMidColor = e.target.value; updateActiveSlideDOM(); });
    if (inputAuxContent) inputAuxContent.addEventListener('input', (e) => { slides[activeSlideIndex].content = e.target.value; updateActiveSlideDOM(); });
    if (inputBuyBtnText) inputBuyBtnText.addEventListener('input', (e) => { slides[activeSlideIndex].buyBtnText = e.target.value; updateActiveSlideDOM(); });

    // Color Swatches
    document.querySelectorAll('.swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        const color = btn.dataset.color;
        if (target === 'top') {
          slides[activeSlideIndex].contentTopColor = color;
          if (inputTopColor) inputTopColor.value = color;
        } else {
          slides[activeSlideIndex].contentMidColor = color;
          if (inputMidColor) inputMidColor.value = color;
        }
        updateActiveSlideDOM();
      });
    });

    // CTA Gradient Swatches
    document.querySelectorAll('.cta-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cta-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        slides[activeSlideIndex].ctaGradient = btn.dataset.ctaGradient;
        updateActiveSlideDOM();
      });
    });

    if (toggleChatbot) {
      toggleChatbot.addEventListener('change', (e) => {
        slides[activeSlideIndex].chatbotYn = e.target.checked;
        renderAllSlides();
        goToSlide(activeSlideIndex, false);
      });
    }
    if (toggleReview) {
      toggleReview.addEventListener('change', (e) => {
        slides[activeSlideIndex].reviewYn = e.target.checked;
        renderAllSlides();
        goToSlide(activeSlideIndex, false);
      });
    }

    // Presets 1, 2, 3
    presetCardBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pKey = btn.dataset.preset;
        if (PRESET_TEMPLATES[pKey]) {
          presetCardBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          slides[activeSlideIndex] = JSON.parse(JSON.stringify(PRESET_TEMPLATES[pKey]));
          likeStatePerSlide[activeSlideIndex] = false;
          activeTagIndexPerSlide[activeSlideIndex] = -1;
          fxImgIndexPerSlide[activeSlideIndex] = 0;
          fxCuboidStepPerSlide[activeSlideIndex] = 0;

          renderAllSlides();
          goToSlide(activeSlideIndex, false);
          populateControllerInputs();
          showToast(`${btn.querySelector('.preset-btn-name').textContent} 프리셋이 적용되었습니다.`);
        }
      });
    });

    // JSON Copy
    const copyJsonHandler = () => {
      const jsonStr = JSON.stringify(buildExportPayload(), null, 2);
      navigator.clipboard.writeText(jsonStr).then(() => {
        showToast('API 규격 shortsList JSON이 클립보드에 복사되었습니다.');
      }).catch(() => {
        showToast('콘솔 로그에서 JSON 데이터를 확인할 수 있습니다.');
        console.log(jsonStr);
      });
    };
    if (btnCopyMockJson) btnCopyMockJson.addEventListener('click', copyJsonHandler);
    if (btnExportJson) btnExportJson.addEventListener('click', copyJsonHandler);

    // Sync All Button
    if (btnApplyAllChanges) {
      btnApplyAllChanges.addEventListener('click', () => {
        renderAllSlides();
        goToSlide(activeSlideIndex, false);
        populateControllerInputs();
        showToast('모든 설정이 스마트폰 뷰포트에 즉시 동기화되었습니다.');
      });
    }

    // Reset Default Demo Data
    if (btnResetAllSlides) {
      btnResetAllSlides.addEventListener('click', () => {
        slides = cloneDefaultSlides();
        activeTagIndexPerSlide = {};
        fxImgIndexPerSlide = { 0: 0, 1: 0, 2: 0 };
        fxCuboidStepPerSlide = { 0: 0, 1: 0, 2: 0 };
        renderAllSlides();
        goToSlide(0, false);
        populateControllerInputs();
        showToast('초기 데모 슬라이드(영상 + 이미지 이펙트)가 복원되었습니다.');
      });
    }
  }

  // --- 13. In-Phone Modals (Chatbot & Share) ---
  function initInphoneModals() {
    if (elChatbotClose && elInphoneChatbot) {
      elChatbotClose.addEventListener('click', () => elInphoneChatbot.classList.remove('active'));
    }
    if (elShareClose && elInphoneShare) {
      elShareClose.addEventListener('click', () => elInphoneShare.classList.remove('active'));
    }
    if (elInphoneShare) {
      elInphoneShare.addEventListener('click', (e) => {
        if (e.target === elInphoneShare) elInphoneShare.classList.remove('active');
      });
    }

    if (btnShareCopyLink) {
      btnShareCopyLink.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('상품 URL 링크가 클립보드에 복사되었습니다.');
          if (elInphoneShare) elInphoneShare.classList.remove('active');
        });
      });
    }

    if (btnShareKakao) {
      btnShareKakao.addEventListener('click', () => {
        showToast('모바일 카카오톡 공유 SDK 브릿지 규격이 호출되었습니다.');
        if (elInphoneShare) elInphoneShare.classList.remove('active');
      });
    }

    const sendChatText = (rawText) => {
      const text = (rawText || '').trim();
      if (!text || !elChatBody) return;

      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = text;
      elChatBody.appendChild(userBubble);
      if (elChatInput && rawText === elChatInput.value) elChatInput.value = '';
      elChatBody.scrollTop = elChatBody.scrollHeight;

      setTimeout(() => {
        const aiBubble = document.createElement('div');
        aiBubble.className = 'chat-bubble ai';
        const slide = slides[activeSlideIndex];
        const tagSummary = (slide.tags && slide.tags[0]) ? ` 주요 후기: "${slide.tags[0].text}"` : '';
        aiBubble.textContent = `[AI 쇼핑 상담] '${slide.productNm}' — ${slide.content || '상세 스펙 확인 완료'}${tagSummary}`;
        elChatBody.appendChild(aiBubble);
        elChatBody.scrollTop = elChatBody.scrollHeight;
      }, 450);
    };

    if (elChatSend && elChatInput) {
      elChatSend.addEventListener('click', () => sendChatText(elChatInput.value));
      elChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendChatText(elChatInput.value);
        }
      });
    }

    document.querySelectorAll('.chatbot-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => sendChatText(chip.dataset.prompt));
    });
  }

  // --- 14. Init ---
  function init() {
    renderAllSlides();
    goToSlide(0, false);
    initGestureEngine();
    bindControllerInputs();
    initInphoneModals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
