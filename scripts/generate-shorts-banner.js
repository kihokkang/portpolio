const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const bannerHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 2800px;
    height: 1576px;
    background: #eef2f6;
    font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Plus Jakarta Sans", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px;
  }

  .canvas-card {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 32px;
    border: 1px solid #cbd5e1;
    box-shadow: 0 30px 70px -15px rgba(15, 23, 42, 0.14);
    padding: 48px 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .canvas-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; height: 8px;
    background: linear-gradient(90deg, #2563eb, #3b82f6, #ec4899, #f59e0b);
  }

  /* Top Bar */
  .top-meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 999px;
    font-family: monospace;
    font-size: 17px;
    font-weight: 750;
    color: #1d4ed8;
    letter-spacing: 0.04em;
  }
  .top-spec-label {
    font-family: monospace;
    font-size: 16px;
    font-weight: 750;
    color: #475569;
    letter-spacing: 0.05em;
  }

  .header-titles {
    margin-bottom: 24px;
  }
  .main-h1 {
    font-size: 46px;
    font-weight: 850;
    color: #0f172a;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 8px;
  }
  .sub-p {
    font-size: 21px;
    color: #64748b;
    font-weight: 500;
    line-height: 1.4;
  }

  /* Main Split Stage */
  .main-stage-grid {
    display: grid;
    grid-template-columns: 580px 1fr;
    gap: 52px;
    flex: 1;
    align-items: center;
    padding: 10px 0;
  }

  /* Phone Mockup */
  .phone-mockup-frame {
    width: 480px;
    height: 980px;
    margin: 0 auto;
    background: #000000;
    border-radius: 58px;
    padding: 14px;
    box-shadow:
      0 0 0 5px #27272a,
      0 0 0 7px #09090b,
      0 30px 70px -15px rgba(0, 0, 0, 0.45);
    position: relative;
    overflow: hidden;
  }

  .phone-inner-screen {
    width: 100%;
    height: 100%;
    border-radius: 46px;
    background: #09090b;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 22px 28px;
  }

  .phone-bg-video {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .phone-gradient {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.92) 100%);
    z-index: 2;
  }

  .phone-dynamic-island {
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    width: 124px;
    height: 32px;
    background: #000000;
    border-radius: 20px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
  }
  .dynamic-cam { width: 11px; height: 11px; border-radius: 50%; background: #1e293b; border: 1px solid #334155; }
  .dynamic-sensor { width: 8px; height: 8px; border-radius: 50%; background: #0f172a; }

  .phone-ui-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    pointer-events: none;
  }

  .phone-top-title {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.35;
    text-shadow: 0 2px 6px rgba(0,0,0,0.7);
  }
  .phone-mid-title {
    font-size: 20px;
    font-weight: 750;
    color: #60a5fa;
    text-shadow: 0 2px 6px rgba(0,0,0,0.7);
    margin-top: 190px;
  }

  .phone-bottom-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .phone-tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .phone-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
  }
  .phone-chip.active {
    background: #2563eb;
    border-color: #60a5fa;
  }

  .phone-speech-bubble {
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(96, 165, 250, 0.4);
    border-radius: 14px;
    padding: 12px 14px;
    color: #e2e8f0;
    font-size: 13px;
    line-height: 1.45;
  }
  .phone-speech-tag {
    display: inline-block;
    color: #60a5fa;
    font-weight: 750;
    margin-bottom: 4px;
    font-size: 12px;
  }

  .phone-aux-desc {
    color: #cbd5e1;
    font-size: 13px;
    line-height: 1.4;
  }

  .phone-buy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    font-weight: 750;
    font-size: 16px;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
  }

  .phone-floating-actions {
    position: absolute;
    right: 18px;
    bottom: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    z-index: 15;
  }
  .phone-action-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
  }

  .phone-nav-pill {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 8px 6px;
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    z-index: 25;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
  }

  /* Right Column: Studio Architecture & Controller Deck */
  .right-deck {
    display: flex;
    flex-direction: column;
    gap: 22px;
    height: 100%;
    justify-content: center;
  }

  .deck-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 26px 30px;
  }

  .deck-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .deck-card-title {
    font-family: monospace;
    font-size: 17px;
    font-weight: 750;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tabs-preview-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }
  .tab-preview-item {
    padding: 14px 18px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    font-size: 17px;
    font-weight: 700;
    color: #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .tab-preview-item.active {
    background: #eff6ff;
    border-color: #3b82f6;
    color: #1d4ed8;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  .tab-badge {
    font-family: monospace;
    font-size: 13px;
    padding: 2px 8px;
    border-radius: 6px;
    background: rgba(0,0,0,0.06);
  }
  .tab-preview-item.active .tab-badge {
    background: #dbeafe;
    color: #1e40af;
  }

  .presets-preview-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  .preset-preview-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 14px;
    padding: 16px 18px;
  }
  .preset-preview-card.active {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
  .preset-p-badge {
    font-family: monospace;
    font-size: 12px;
    font-weight: 750;
    color: #2563eb;
    display: block;
    margin-bottom: 4px;
  }
  .preset-p-title {
    font-size: 17px;
    font-weight: 750;
    color: #0f172a;
    margin-bottom: 4px;
  }
  .preset-p-sub {
    font-size: 13px;
    color: #64748b;
  }

  .architecture-pillars-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .pillar-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 18px 20px;
  }
  .pillar-num {
    font-family: monospace;
    font-size: 13px;
    font-weight: 750;
    color: #2563eb;
    margin-bottom: 6px;
    display: block;
  }
  .pillar-head {
    font-size: 17px;
    font-weight: 750;
    color: #0f172a;
    margin-bottom: 6px;
  }
  .pillar-text {
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
  }

  /* Bottom Bar */
  .bottom-summary-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
  }
  .bottom-desc {
    font-size: 17px;
    color: #334155;
    font-weight: 600;
  }
  .bottom-status-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    color: #15803d;
    font-family: monospace;
    font-size: 14px;
    font-weight: 700;
  }
</style>
</head>
<body>

<div class="canvas-card">
  <!-- Top Meta Row -->
  <div class="top-meta-row">
    <span class="tag-pill">03 / INTERACTIVE SHORTS COMMERCE</span>
    <span class="top-spec-label">KIM GIHO · PORTFOLIO ARCHITECTURE SPEC 2026</span>
  </div>

  <!-- Header Titles -->
  <div class="header-titles">
    <h1 class="main-h1">SHORTS COMMERCE PLAYER · 9:16 VERTICAL VIDEO &amp; LIVE SANDBOX</h1>
    <p class="sub-p">YouTube Shorts 스타일 9:16 모바일 플레이어, 10종 미디어 엔진, AI 리뷰 요약 해시태그 및 실시간 멀티 슬라이드 제어 샌드박스</p>
  </div>

  <!-- Main Split Stage -->
  <div class="main-stage-grid">

    <!-- Left: Phone Mockup with active Shorts UI -->
    <div class="phone-mockup-frame">
      <div class="phone-inner-screen">
        <!-- Background Unboxing Video Thumbnail -->
        <img class="phone-bg-video" src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80" alt="Shorts Video Background" />
        <div class="phone-gradient"></div>

        <!-- Dynamic Island -->
        <div class="phone-dynamic-island">
          <div class="dynamic-cam"></div>
          <div class="dynamic-sensor"></div>
        </div>

        <!-- Phone Content Overlays -->
        <div class="phone-ui-content">
          <div>
            <h2 class="phone-top-title">책상 위 공간을 바꾸는 올인원 스마트 독</h2>
            <h3 class="phone-mid-title">한정 수량 25% 얼리버드 특별 예약</h3>
          </div>

          <div class="phone-bottom-group">
            <!-- Review Chips -->
            <div class="phone-tags-row">
              <span class="phone-chip active">#거치안정감 (142)</span>
              <span class="phone-chip">#충전속도 (89)</span>
              <span class="phone-chip">#엠비언트무드 (210)</span>
            </div>

            <!-- Review Speech Bubble -->
            <div class="phone-speech-bubble">
              <span class="phone-speech-tag">#거치안정감 실구매자 리뷰 요약</span>
              <p>자력이 매우 강력해서 스마트폰을 올려두고 터치해도 흔들림 없이 정밀 힌지 각도 유지가 완벽합니다.</p>
            </div>

            <p class="phone-aux-desc">
              Qi2 무선 급속 충전, 엠비언트 라이트, 정밀 힌지 각도 조절이 결합된 차세대 데스크 테크 솔루션입니다.
            </p>

            <div class="phone-buy-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span>얼리버드 예약 구매 ↗</span>
            </div>
          </div>
        </div>

        <!-- Floating Actions -->
        <div class="phone-floating-actions">
          <div class="phone-action-circle" style="background:rgba(239, 68, 68, 0.9); border-color:#f87171;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span style="font-size:10px; margin-top:2px;">1,248</span>
          </div>
          <div class="phone-action-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            <span style="font-size:10px; margin-top:2px;">공유</span>
          </div>
          <div class="phone-action-circle" style="background:rgba(29, 78, 216, 0.85); border-color:rgba(96, 165, 250, 0.5);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style="font-size:10px; margin-top:2px;">챗봇</span>
          </div>
        </div>

        <!-- Vertical Nav Pill -->
        <div class="phone-nav-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          <span style="padding: 2px 0;">1/3</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    </div>

    <!-- Right: Studio Controller Deck & Architecture Highlights -->
    <div class="right-deck">
      <!-- Deck Card 1: Multi-Slide Controller -->
      <div class="deck-card">
        <div class="deck-card-head">
          <span class="deck-card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v16"/></svg>
            실시간 멀티 슬라이드 네비게이션 컨트롤러
          </span>
          <span style="font-family:monospace; font-size:14px; font-weight:750; color:#2563eb; background:#eff6ff; padding:4px 12px; border-radius:6px; border:1px solid #bfdbfe;">ACTIVE: SLIDE 01 / 03</span>
        </div>

        <div class="tabs-preview-row">
          <div class="tab-preview-item active">
            <span class="tab-badge">01</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            <span>스마트 독 &amp; 램프</span>
          </div>
          <div class="tab-preview-item">
            <span class="tab-badge">02</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            <span>레트로 러너</span>
          </div>
          <div class="tab-preview-item">
            <span class="tab-badge">03</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            <span>시그니처 커피</span>
          </div>
        </div>

        <!-- Presets Grid -->
        <div class="presets-preview-grid">
          <div class="preset-preview-card active">
            <span class="preset-p-badge">PRESET 01</span>
            <strong class="preset-p-title">테크 &amp; 스마트 데스크 독</strong>
            <span class="preset-p-sub">스마트 독 언박싱 &amp; 엠비언트 램프</span>
          </div>
          <div class="preset-preview-card">
            <span class="preset-p-badge">PRESET 02</span>
            <strong class="preset-p-title">스트리트웨어 스니커즈</strong>
            <span class="preset-p-sub">2026 레트로 러너 에디션 언박싱</span>
          </div>
          <div class="preset-preview-card">
            <span class="preset-p-badge">PRESET 03</span>
            <strong class="preset-p-title">스페셜티 커피 &amp; 에스프레소</strong>
            <span class="preset-p-sub">싱글오리진 원두 추출 &amp; ASMR</span>
          </div>
        </div>
      </div>

      <!-- Deck Card 2: Core Architecture Specifications -->
      <div class="deck-card">
        <div class="deck-card-head">
          <span class="deck-card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            핵심 엔지니어링 아키텍처 스펙
          </span>
          <span style="font-family:monospace; font-size:13px; font-weight:700; color:#059669;">60FPS HARDWARE ACCELERATED</span>
        </div>

        <div class="architecture-pillars-row">
          <div class="pillar-box">
            <span class="pillar-num">01 / VERTICAL ENGINE</span>
            <h4 class="pillar-head">9:16 풀스크린 &amp; 제스처</h4>
            <p class="pillar-text">모바일 최적화 세로형 뷰포트와 상하 터치 스와이프, 마우스 휠, 키보드 방향키 연동</p>
          </div>
          <div class="pillar-box">
            <span class="pillar-num">02 / DUAL MEDIA</span>
            <h4 class="pillar-head">비디오 &amp; 10종 슬라이더</h4>
            <p class="pillar-text">YouTube/MP4 비디오 및 카드 스와이프, 3D 큐브 등 10종 이미지 모핑 팩토리 패턴</p>
          </div>
          <div class="pillar-box">
            <span class="pillar-num">03 / AI COMMERCE</span>
            <h4 class="pillar-head">AI 리뷰 요약 &amp; 챗봇</h4>
            <p class="pillar-text">구매 후기 키워드 분석 팝오버 및 화면 전환 없는 인플레이어 대화형 AI 상담 모달</p>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Bottom Summary Bar -->
  <div class="bottom-summary-bar">
    <div class="bottom-desc">
      설계 핵심: 서버 오프라인 환경에 완벽 대응하는 <strong>독립형 목(Mock) 데이터 파이프라인</strong> 및 <strong>실시간 양방향 반응형 스튜디오</strong>
    </div>
    <div class="bottom-status-tag">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>TOUCH &amp; DRAG SWIPER OPERATIONAL</span>
    </div>
  </div>
</div>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "../banner-temp.html"), bannerHtml);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 2800, height: 1576 } });

  const filePath = "file://" + path.resolve(__dirname, "../banner-temp.html");
  console.log("Loading banner template from", filePath);
  await page.goto(filePath, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const outputPath = path.resolve(__dirname, "../dist/shorts-preview.png");
  await page.screenshot({ path: outputPath });
  console.log("Saved high-res banner to", outputPath);

  await browser.close();
  fs.unlinkSync(path.join(__dirname, "../banner-temp.html"));
})();
