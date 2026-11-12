const { chromium } = require('playwright');
const fs = require('fs');

const diagrams = [
  {
    filename: 'dist/mobile-platform.png',
    accentColor: '#2563eb',
    title: 'HYBRID MOBILE PLATFORM · RUNTIME & RPC BRIDGE',
    subtitle: 'iOS WKWebView & Android WebView 비동기 RPC 브릿지 및 메모리 격리 아키텍처',
    badge: '02 / PLATFORM ARCHITECTURE',
    sections: [
      {
        colTitle: '01 웹 런타임 (Web)',
        color: '#2563eb',
        items: [
          { name: 'Vue 3 SPA 클라이언트', desc: '싱글 페이지 앱 및 비즈니스 뷰' },
          { name: 'Promise RPC Client', desc: '타입 세이프 비동기 호출 래퍼' },
          { name: '이벤트 리스너 버스', desc: '네이티브 푸시·생명주기 수신' }
        ]
      },
      {
        colTitle: '02 브릿지 프로토콜 (Protocol)',
        color: '#0891b2',
        items: [
          { name: 'UUID 요청-응답 매핑', desc: '비동기 응답 식별자 추적' },
          { name: 'JSON 직렬화 엔진', desc: '대용량 페이로드 최적화' },
          { name: '타임아웃 & 에러 복구', desc: 'RPC 유실 방지 가드레일' }
        ]
      },
      {
        colTitle: '03 네이티브 코어 (Native Core)',
        color: '#4f46e5',
        items: [
          { name: 'iOS WKScriptMessageHandler', desc: 'WebKit 고성능 메시지 핸들러' },
          { name: 'Android @JavascriptInterface', desc: '코루틴 비동기 디스패처' },
          { name: '웹뷰 인스턴스 풀 & 메모리 회수', desc: '다중 스택 누수 방지 제어' }
        ]
      },
      {
        colTitle: '04 디바이스 서비스 (Hardware)',
        color: '#059669',
        items: [
          { name: '생체 인증 (FaceID / TouchID)', desc: '보안 키체인 연동' },
          { name: '암호화 SQLite 로컬 캐시', desc: '오프라인 증분 동기화' },
          { name: '네이티브 파일 & 카메라 I/O', desc: '하드웨어 리소스 접근 제어' }
        ]
      }
    ],
    footerLeft: '설계 판단: 웹과 네이티브의 결합도를 낮추고 완벽한 비동기 RPC 프로토콜로 메모리 누수를 방지했습니다.',
    footerRight: '성능 지표: RPC 왕복 지연 < 12ms, 장기 실행 메모리 누수 0건, 크래시율 0.01% 이하'
  },
  {
    filename: 'dist/design-system.png',
    accentColor: '#6366f1',
    title: 'ENTERPRISE DESIGN SYSTEM · 3-TIER TOKEN & COMPONENT CORE',
    subtitle: '웹·모바일 일관된 사용자 경험을 위한 3단계 디자인 토큰 및 60+ 공통 컴포넌트 시스템',
    badge: '03 / DESIGN SYSTEM ARCHITECTURE',
    sections: [
      {
        colTitle: '01 글로벌 토큰 (Global Tokens)',
        color: '#6366f1',
        items: [
          { name: 'Primitive Color Palette', desc: 'Slate, Blue, Emerald, Amber 10단계' },
          { name: 'Typography Scales', desc: 'JetBrains Mono & Sans 계층 정의' },
          { name: 'Spacing & Elevation Grid', desc: '4px 단위 모듈러 스페이싱 및 그림자' }
        ]
      },
      {
        colTitle: '02 시맨틱 토큰 (Semantic Tokens)',
        color: '#2563eb',
        items: [
          { name: 'Theme Context (Light / Dark)', desc: '실시간 CSS 변수 기반 다크모드 전파' },
          { name: 'Role-Based Color Mapping', desc: 'surface, text, border, feedback 매핑' },
          { name: 'A11y 대비율 자동 검증', desc: 'WCAG 2.1 AA 4.5:1 이상 명도 보증' }
        ]
      },
      {
        colTitle: '03 컴포넌트 코어 (Vue 3 Core)',
        color: '#0d9488',
        items: [
          { name: 'Headless UI Composables', desc: '모달, 드롭다운, 툴팁 동작 추상화' },
          { name: 'Styled Atoms & Molecules', desc: '버튼, 입력폼, 태그, 아바타 60+종' },
          { name: 'Virtual Scroll Data Table', desc: '10만 건 대용량 데이터 초고속 렌더링' }
        ]
      },
      {
        colTitle: '04 배포 & 거버넌스 (Distribution)',
        color: '#d97706',
        items: [
          { name: 'Figma Tokens Plugin Sync', desc: '디자인-코드 실시간 토큰 동기화' },
          { name: 'Storybook 카탈로그 자동 배포', desc: '컴포넌트 문서화 및 테스트' },
          { name: '시각적 회귀 테스트 CI', desc: 'Playwright 스냅샷 자동 검증' }
        ]
      }
    ],
    footerLeft: '설계 판단: 비즈니스 로직과 UI 컴포넌트를 분리하여 변경 비용을 최소화하고 일관성을 확보했습니다.',
    footerRight: '생산성 지표: 신규 제품 UI 개발 속도 2.5배 향상, 코드 중복 85% 제거, 웹 접근성 100% 충족'
  },
  {
    filename: 'dist/kanban-platform.png',
    accentColor: '#0891b2',
    title: 'SPRINTBOARD · REALTIME EVENT PIPELINE & GIT WORKFLOW',
    subtitle: 'WebSocket 양방향 브로드캐스팅과 Git 커밋/푸시 웹훅 이벤트 기반 실시간 협업 플랫폼',
    badge: '04 / EVENT-DRIVEN COLLABORATION',
    sections: [
      {
        colTitle: '01 클라이언트 보드 (Client UI)',
        color: '#2563eb',
        items: [
          { name: 'Vue 3 인터랙티브 칸반 보드', desc: 'HTML5 드래그앤드롭 카드 이동' },
          { name: 'Optimistic UI 업데이트', desc: '지연 없는 즉각적 로컬 상태 반영' },
          { name: '트랜잭션 롤백 매니저', desc: '서버 충돌 발생 시 원상태 복구' }
        ]
      },
      {
        colTitle: '02 실시간 게이트웨이 (Gateway)',
        color: '#7c3aed',
        items: [
          { name: 'Socket.io 양방향 웹소켓', desc: '보드별 채널 룸(Room) 세분화' },
          { name: '선택적 브로드캐스팅', desc: '트래픽 90% 절감 타겟 발행' },
          { name: '자동 하트비트 & 재연결', desc: '네트워크 단절 시 무중단 세션 복구' }
        ]
      },
      {
        colTitle: '03 이벤트 파이프라인 (Pipelines)',
        color: '#0891b2',
        items: [
          { name: 'Git 커밋/푸시 웹훅 리시버', desc: '커밋 메시지 이슈 키 자동 파싱' },
          { name: '이슈 상태 자동 전이 엔진', desc: 'PR 생성/머지 시 Done 자동 이동' },
          { name: 'Slack & Email 실시간 알림', desc: '담당자 멘션 및 스프린트 요약' }
        ]
      },
      {
        colTitle: '04 분산 스토어 & 세션 (Store)',
        color: '#059669',
        items: [
          { name: 'Redis Pub/Sub 어댑터', desc: '다중 서버 인스턴스 상태 동기화' },
          { name: 'MongoDB Atlas 시계열 감사 로그', desc: '카드 변경 이력 및 회고 메트릭' },
          { name: 'JWT 세션 & RBAC 권한 제어', desc: '프로젝트별 역할 기반 접근 통제' }
        ]
      }
    ],
    footerLeft: '설계 판단: Git 워크플로우와 실시간 보드를 결합하여 개발자의 수동 작업 기록 부담을 완전히 제거했습니다.',
    footerRight: '성능 지표: 동시 접속 동기화 지연 < 30ms, Git 웹훅 처리 성공률 99.98%, 스프린트 운영 효율 50% 향상'
  }
];

function buildHTML(d) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1400px;
    height: 788px;
    background: #f1f5f9;
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Pretendard", "Segoe UI", sans-serif;
    color: #0f172a;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 34px 44px;
    border: 3px solid #cbd5e1;
    box-sizing: border-box;
  }
  .header {
    background: #ffffff;
    border-radius: 12px;
    padding: 22px 28px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid #cbd5e1;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    border-left: 6px solid ${d.accentColor};
  }
  .brand {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .badge {
    display: inline-block;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    font-weight: 750;
    letter-spacing: 0.08em;
    color: ${d.accentColor};
    background: rgba(37, 99, 235, 0.08);
    padding: 3px 10px;
    border-radius: 9999px;
    border: 1px solid rgba(37, 99, 235, 0.2);
    margin-bottom: 6px;
  }
  .title {
    font-size: 26px;
    font-weight: 850;
    letter-spacing: -0.025em;
    color: #0f172a;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .subtitle {
    font-size: 13.5px;
    font-weight: 550;
    color: #334155;
    line-height: 1.45;
  }
  .meta-right {
    text-align: right;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 18px 0;
    flex: 1;
  }
  .card {
    background: #ffffff;
    border: 1.5px solid #cbd5e1;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  }
  .card-top {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
  .card-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  .card-header-title {
    font-family: "JetBrains Mono", monospace;
    font-size: 12.5px;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: #0f172a;
  }
  .item-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .item {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 12px;
  }
  .item-name {
    font-size: 13px;
    font-weight: 750;
    color: #0f172a;
    margin-bottom: 3px;
  }
  .item-desc {
    font-size: 11.5px;
    color: #475569;
    line-height: 1.45;
    font-weight: 500;
  }
  .footer {
    background: #ffffff;
    border-radius: 10px;
    padding: 14px 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #cbd5e1;
    font-size: 12.5px;
  }
  .footer-left {
    color: #1e293b;
    font-weight: 600;
  }
  .footer-right {
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: #047857;
    font-weight: 700;
    background: rgba(5, 150, 105, 0.1);
    padding: 4px 12px;
    border-radius: 6px;
    border: 1px solid rgba(5, 150, 105, 0.25);
  }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="badge">${d.badge}</div>
      <h1 class="title">${d.title}</h1>
      <p class="subtitle">${d.subtitle}</p>
    </div>
    <div class="meta-right">
      <div class="brand">KIM GIHO · PORTFOLIO</div>
      <div>ARCHITECTURE SPEC 2026</div>
    </div>
  </div>

  <div class="grid">
    ${d.sections.map(s => `
      <div class="card">
        <div class="card-top">
          <div class="card-dot" style="background: ${s.color};"></div>
          <div class="card-header-title">${s.colTitle}</div>
        </div>
        <div class="item-list">
          ${s.items.map(it => `
            <div class="item">
              <div class="item-name">${it.name}</div>
              <div class="item-desc">${it.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <div class="footer-left">${d.footerLeft}</div>
    <div class="footer-right">${d.footerRight}</div>
  </div>
</body>
</html>`;
}

(async () => {
  console.log('Rendering high-contrast architecture diagrams...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1400, height: 788 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  for (const d of diagrams) {
    const html = buildHTML(d);
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.screenshot({ path: d.filename });
    console.log(`Generated high-contrast: ${d.filename}`);
  }

  await browser.close();
  console.log('Finished rendering high-contrast diagrams!');
})();
