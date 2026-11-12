// 이름, 소개, 연락처와 projects 배열을 실제 정보로 교체하세요.
// 프로젝트 이미지는 dist 폴더에 넣고 image: "./파일명"으로 연결합니다.
// repository와 demo에는 실제 URL을 입력하세요. 비어 있는 링크는 표시되지 않습니다.
const profile = {
  name: "김기호",
  headline: ["김기호", "소프트웨어 개발자"],
  intro: "기업용 웹과 하이브리드 앱을 개발하고 운영합니다. 최근에는 요구사항 관리부터 배포까지 개발팀의 업무를 연결하는 AI 플랫폼을 만들었습니다.",
  bio: "유라클에서 iOS·Android 하이브리드 앱과 웹 시스템을 운영하며 웹뷰·네이티브 연동, OS 정책 대응, 배포 안정화를 맡고 있습니다. 이전에는 아이비즈소프트웨어에서 Vue 기반 공통 UI와 Spring Boot 배치 시스템을 개발했습니다. 캐나다 Centennial College에서 소프트웨어공학을 전공했습니다.",
  email: "",
  github: "",
  skills: ["JavaScript", "TypeScript", "Vue.js", "Node.js", "Java", "Spring Boot", "iOS·Android WebView"],
  projects: [
    {
      title: "AX Frontier",
      category: "사내 개발 플랫폼 · 2026.10 발표",
      description: "메일로 들어온 요구사항을 접수부터 배포까지 하나의 일감으로 추적하고, 개발자와 AI 코딩 에이전트가 같은 작업 맥락을 공유하는 플랫폼.",
      stack: ["Vue 3", "TypeScript", "Express", "MongoDB", "MCP", "GitLab CI"],
      image: "./ax-frontier-overview.jpg",
      imageAlt: "메일, Redmine, 개발 도구와 AI 서비스를 연결하는 AX Frontier 플랫폼 구성도",
      problem: "요구사항이 메일, 첨부 문서, 메신저에 흩어져 최신 버전을 확인하기 어려웠습니다. 일감을 수기로 옮기고 변경 내용을 다시 전달하면서 재작업이 생겼습니다.",
      roleLabel: "팀과 참여",
      role: "4인 팀 프로젝트에 참여하고 사용 구성도 발표자료를 공동 제작했습니다.",
      workflow: "유입 → 접수 → Redmine 등록 → 분석 → 설계 → 개발 → 테스트 → 배포. 담당자가 요구사항과 단계별 산출물을 승인하고, IDE 에이전트는 MCP로 일감 맥락을 받아 작업 결과를 다시 제출합니다.",
      result: "시연에서 메일을 로드맵 일감으로 등록하고, IDE의 분석·설계 결과를 플랫폼으로 받아 검수하는 흐름을 보여줬습니다. 플랫폼에는 GitLab CI 빌드와 작업 지식을 축적하는 플레이북도 포함됩니다."
    },
    {
      title: "전사 하이브리드·웹 시스템 운영",
      category: "유라클 · 2026.03–현재",
      description: "현대엔지니어링 전사 시스템 9종의 모바일 클라이언트를 운영하며 iOS·Android 정책 변경과 보안 요구사항에 대응했습니다.",
      stack: ["iOS", "Android", "JavaScript", "Vue.js", "React"],
      problem: "서로 다른 프런트엔드 환경에서 공통 오류를 수정하고, 모바일 OS와 앱스토어 정책 변경을 배포 전에 반영해야 했습니다.",
      role: "네이티브 기능을 수정하고 앱 무결성 검증을 적용했습니다. Vue와 React 기반 화면에서 공통 오류를 수정하고 레거시 코드 구조를 개선했습니다."
    },
    {
      title: "AI 맞춤형 헬스케어 앱",
      category: "유라클 사내 AI 경진대회 · 2025",
      description: "운동·식단 기록을 분석해 개인별 건강관리 콘텐츠를 제공하는 모바일 앱입니다.",
      stack: ["멀티모달 AI", "컴퓨터 비전", "모바일 앱"],
      role: "3인 팀을 이끌며 아키텍처 설계와 개발 일정, 기능 통합을 맡았습니다. 맞춤형 콘텐츠 생성 파이프라인을 구현하고 체형 분석과 자세 교정 기능을 클라이언트에 통합했습니다.",
      result: "유라클 사내 AI 경진대회 헬스케어 부문 대상(1위)을 수상했습니다."
    },
    {
      title: "SK MIS 차세대 구축",
      category: "아이비즈소프트웨어 · 2021.11–2022.06",
      description: "업무 시스템의 공통 UI와 화면 템플릿을 만들고 서버 배치 처리를 개발했습니다.",
      stack: ["Vue.js", "TypeScript", "Node.js", "Spring Boot", "Oracle"],
      role: "Vue 기반 UI 컴포넌트와 화면 템플릿을 설계하고, Spring Boot와 Oracle SQL로 대용량 데이터를 가공하는 배치 애플리케이션을 개발했습니다."
    }
  ]
};

function element(tag, content, className) {
  const node = document.createElement(tag);
  if (content) node.textContent = content;
  if (className) node.className = className;
  return node;
}

function setText(id, value) {
  if (value) document.getElementById(id).textContent = value;
}

function addTags(container, tags) {
  for (const tag of tags) container.append(element("span", tag, "tag"));
}

function addLink(container, label, href) {
  if (!href) return;
  const link = element("a", label + " ↗");
  link.href = href;
  container.append(link);
}

function renderCover(project) {
  const cover = element("figure", "", "cover");
  cover.dataset.theme = project.theme || "green";

  if (project.image) {
    const image = element("img");
    image.src = project.image;
    image.alt = project.imageAlt || project.title + " 화면";
    cover.append(image);
    return cover;
  }

  cover.setAttribute("aria-hidden", "true");
  const mock = element("div", "", "mock");
  const header = element("div", project.title, "mock-head");
  header.append(element("span", "● ● ●"));
  const body = element("div", "", "mock-body");
  for (const [name, status] of project.preview || []) {
    const row = element("div", "", "mock-row");
    row.append(element("span", name), element("span", status));
    body.append(row);
  }
  mock.append(header, body);
  cover.append(mock);
  return cover;
}

function renderProject(project) {
  const card = element("article", "", "project");
  const body = element("div", "", "project-body");
  const category = project.sample ? project.category + " · 예시" : project.category;
  const tags = element("div", "", "tags");
  addTags(tags, project.stack || []);
  body.append(element("span", category, "eyebrow"), element("h3", project.title),
    element("p", project.description), tags);
  const details = element("details");
  details.append(element("summary", "프로젝트 상세"));
  const facts = element("dl");
  for (const [label, value] of [
    ["해결한 문제", project.problem],
    [project.roleLabel || "내 역할과 구현", project.role],
    ["업무 흐름", project.workflow],
    ["결과", project.result]
  ]) {
    if (value) facts.append(element("dt", label), element("dd", value));
  }
  const links = element("div", "", "links");
  addLink(links, "GitHub", project.repository);
  addLink(links, "데모", project.demo);
  details.append(facts, links);
  if (project.image || project.preview?.length) card.append(renderCover(project));
  card.append(body, details);
  return card;
}

setText("brand-name", profile.name);
setText("footer-name", profile.name);
setText("intro", profile.intro);
setText("bio", profile.bio);
document.getElementById("hero-title").replaceChildren(
  document.createTextNode(profile.headline[0]), element("br"), element("em", profile.headline[1])
);
addTags(document.getElementById("skills"), profile.skills);
const contacts = document.getElementById("contacts");
addLink(contacts, "이메일", profile.email && "mailto:" + profile.email);
addLink(contacts, "GitHub", profile.github);
const hasContact = contacts.childElementCount > 0;
document.getElementById("contact").hidden = !hasContact;
document.getElementById("contact-nav").hidden = !hasContact;
if (hasContact) document.getElementById("contact-note").hidden = true;
document.getElementById("sample-label").hidden = !profile.projects.every(project => project.sample);
document.getElementById("projects").append(...profile.projects.map(renderProject));
