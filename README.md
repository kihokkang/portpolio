# 김기호 (KIM GIHO) · 개발자 포트폴리오 & 아키텍처 쇼케이스

> **Inkwell-Inspired Editorial & Architectural Showcase (https://inkwell.tech/)**  
> 포슬린(Porcelain) 웜 화이트 캔버스, 유기적 3D WebGL(Three.js) 플루이드 코어, 로터리 퍼스펙티브 다이얼(Rotary Perspective Dial), 16:9 Studio Display 아키텍처 쇼케이스, 그리고 100% 순수 벡터 SVG 아이콘 기반의 고성능 엔지니어링 포트폴리오입니다.

---

## 1. 사이트 개요 및 핵심 특징

- **Inkwell 에디토리얼 아이덴티티 (`https://inkwell.tech/`)**:
  - 스위스 인터내셔널 타이포그래피 (`Plus Jakarta Sans` + `JetBrains Mono`).
  - 포슬린 페이퍼 캔버스 (`#f6f8fa`) + 딥 잉크 차콜 (`#172026`) + 디지털 잉크 코발트 (`#1d4ed8`).
  - 정밀 1px 헤어라인 보더와 절제된 여백의 미.
- **유기적 3D WebGL 플루이드 코어 (`webgl-core.js`)**:
  - Three.js 60fps 실시간 렌더링.
  - 하모닉 노이즈로 유기적으로 모핑하는 포슬린 크롬 스피어 + 초정밀 헤어라인 궤도 링 + 공전하는 텔레메트리 비드.
  - 마우스 무브 및 스크롤에 반응하는 관성 댐핑 카메라 컨트롤.
- **Inkwell 로터리 퍼스펙티브 다이얼 (Rotary Perspective Dial)**:
  - 4대 핵심 관점 회전 컴퍼스: `VISIONARY`, `ARCHITECTURE`, `OPERATIONAL`, `HIGH LEVEL`.
  - 다이얼 회전 시 바늘 회전 애니메이션 및 동적 KPI & 관점 설명 실시간 전환.
- **프로세스 혁신 내러티브 (Process Transformation Pipeline)**:
  - 파편화된 다단계 개발 라이프사이클을 하나의 지능형 불변 기준선(Baseline)으로 압축.
  - Phase 01: 비정형 요구사항 수집 & 개정 식별 (Mail / Redmine 연동)
  - Phase 02: IDE 에이전트 맥락 주입 (Cursor MCP & Hooks)
  - Phase 03: 브라우저 자동 검증 증적 결합 (Playwright E2E)
  - Phase 04: 증분 리소스 패키징 & GitLab CI
- **16:9 Studio Display 아키텍처 슬라이드 쇼케이스**:
  - 슬라이드 텍스트 좌우·하단 잘림 0% (`object-fit: contain`).
  - 카드 내 7장 공식 발표 슬라이드 인카드 스위처 (`01 / 07`) 탑재.
  - 고해상도 전체화면 모달 라이트박스 (ESC, 방향키 지원).
- **멀티 프로젝트 쇼케이스 & 인터랙티브 카테고리 필터**:
  - `전체 (4)`, `AI & 플랫폼`, `하이브리드 모바일`, `웹 & 공통 시스템` 탭 필터링.
  - 4대 프로젝트: AX Frontier, Clue Observability (1인 개인 개발 하이브리드 APM 관제 시스템 · Render 라이브 데모), 사내 공통 UI 디자인 시스템, 실시간 협업 칸반(Sprintboard).
- **100% 제로 이모지 (Zero Emojis)**:
  - 인공지능 스타일 이모지를 일절 배제하고 순수 1.5px/2px 라인 벡터 SVG 아이콘만 사용.

---

## 2. 로컬 실행 방법

```bash
# dist 디렉터리 기준 정적 웹 서버 실행
python3 -m http.server 3000 --directory dist
```

브라우저 접속:
- **메인 쇼케이스**: `http://localhost:3000/`
- **AX Frontier 상세 백서**: `http://localhost:3000/ax-frontier.html`
