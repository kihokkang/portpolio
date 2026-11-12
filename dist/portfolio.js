// 이름, 소개, 연락처와 projects 배열을 실제 정보로 교체하세요.
// 프로젝트 이미지는 dist 폴더에 넣고 image: "./파일명"으로 연결합니다.
// repository와 demo에는 실제 URL을 입력하세요. 비어 있는 링크는 표시되지 않습니다.
const profile = {
  name: "개발자 포트폴리오",
  headline: ["만든 것과,", "그 안의 고민."],
  intro: "",
  bio: "",
  email: "",
  github: "",
  skills: [],
  projects: [
    {
      title: "Sprintboard",
      category: "웹 앱",
      sample: true,
      description: "팀의 할 일과 진행 상태를 한 화면에서 확인하는 칸반 보드.",
      stack: ["React", "TypeScript", "PostgreSQL"],
      theme: "green",
      preview: [["이슈 분류", "진행 중"], ["보드 권한 설정", "검토 중"], ["검색 필터", "완료"]],
      problem: "작업 상태가 여러 채널에 흩어져 우선순위와 담당자를 확인하기 어려웠습니다.",
      role: "보드 인터페이스와 상태 변경 API를 설계하고 구현했습니다.",
      result: "할 일을 생성하고 담당자와 진행 상태를 한 화면에서 관리하는 흐름을 완성했습니다.",
      image: "", repository: "", demo: ""
    },
    {
      title: "Queue Monitor",
      category: "개발 도구",
      sample: true,
      description: "백그라운드 작업의 상태와 실패 원인을 확인하는 모니터링 도구.",
      stack: ["Python", "FastAPI", "Redis"],
      theme: "blue",
      preview: [["import-items", "실행 중"], ["generate-report", "대기"], ["sync-records", "완료"]],
      problem: "실패한 작업을 확인하려면 여러 로그 파일을 찾아야 했습니다.",
      role: "작업 이벤트를 수집하는 API와 상태별 조회 화면을 구현했습니다.",
      result: "작업별 실행 기록과 실패 원인을 한곳에서 확인할 수 있게 했습니다.",
      image: "", repository: "", demo: ""
    },
    {
      title: "Field Notes",
      category: "개인 프로젝트",
      sample: true,
      description: "짧은 개발 기록을 마크다운으로 작성하고 태그로 모아보는 노트 앱.",
      stack: ["Astro", "Markdown", "CSS"],
      theme: "sand",
      preview: [["접근성 점검 기록", "웹"], ["쿼리 개선 노트", "DB"], ["배포 체크리스트", "운영"]],
      problem: "개발 중 정리한 메모를 나중에 다시 찾기 어려웠습니다.",
      role: "마크다운 콘텐츠 구조와 태그별 목록 화면을 만들었습니다.",
      result: "파일을 추가하면 글 목록과 태그 페이지에 자동으로 반영되도록 했습니다.",
      image: "", repository: "", demo: ""
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
  for (const [label, value] of [["해결한 문제", project.problem], ["내 역할과 구현", project.role], ["결과", project.result]]) {
    if (value) facts.append(element("dt", label), element("dd", value));
  }
  const links = element("div", "", "links");
  addLink(links, "GitHub", project.repository);
  addLink(links, "데모", project.demo);
  details.append(facts, links);
  card.append(renderCover(project), body, details);
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
if (contacts.childElementCount) document.getElementById("contact-note").hidden = true;
document.getElementById("sample-label").hidden = !profile.projects.every(project => project.sample);
document.getElementById("projects").append(...profile.projects.map(renderProject));
