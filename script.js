const booths = [
  [
    "AI를 해방시켜라!",
    "NULL × s0sCoD3",
    "1층 로비",
    "15분",
    "4명",
    "중1–고3",
    "프롬프트 인젝션으로 AI를 설득하고 숨겨진 비밀번호를 찾으며 AI 보안을 이해합니다.",
  ],
  [
    "피싱 대학",
    "NULL × s0sCoD3",
    "1층 로비",
    "15분",
    "4명",
    "초5–고3",
    "실제 사이트와 피싱 사이트의 이미지를 비교하며 진짜 사이트를 판별합니다.",
  ],
  [
    "위키 레이싱",
    "NULL × s0sCoD3",
    "1층 로비",
    "10분",
    "6명",
    "초3–고3",
    "본문의 하이퍼링크만 이용해 목표 문서까지 가장 빠르게 도달하는 레이스입니다.",
  ],
  [
    "세미 CTF",
    "NULL × s0sCoD3",
    "2층 로비",
    "20분",
    "4명",
    "초5–고3",
    "여러 문제 속에 숨겨진 FLAG를 찾아내는 정보 보안 챌린지입니다.",
  ],
  [
    "내가 코딩 언어라면?",
    "NULL × s0sCoD3",
    "2층 로비",
    "10분",
    "2명",
    "초5–6",
    "성향과 문제 해결 방식에 어울리는 프로그래밍 언어를 추천받습니다.",
  ],
  [
    "Life is Easter Egg",
    "NULL × s0sCoD3",
    "2층 로비",
    "자유 관람",
    "전시",
    "초3–고3",
    "단서를 활용해 웹사이트 곳곳에 숨겨진 이스터에그를 발견합니다.",
  ],
  [
    "꿈: 우리는 모두 어린왕자였다",
    "NULL × s0sCoD3",
    "2층 로비",
    "20분",
    "3명",
    "초5–중1",
    "어린왕자가 되어 여러 학자의 별을 탐험하며 꿈을 찾아가는 미궁 게임입니다.",
  ],
  [
    "마인크래프트 속으로",
    "뉴런",
    "1층 로비",
    "10분",
    "1명",
    "초5–고3",
    "AI가 몸의 동작을 인식해 게임 속 캐릭터를 움직이는 마인크래프트를 체험합니다.",
  ],
  [
    "AI 100% 활용하는 법",
    "뉴런",
    "1층 로비",
    "15분",
    "2명",
    "초5–고3",
    "프롬프트 엔지니어링과 멀티모달 활용법을 난이도에 맞춰 실습합니다.",
  ],
  [
    "AI를 설득해보자",
    "뉴런",
    "1층 로비",
    "15분",
    "2명",
    "초5–고3",
    "질문을 바꾸며 AI의 답변이 어떻게 달라지는지 비교하고 효과적인 프롬프트를 배웁니다.",
  ],
  [
    "DUELIST",
    "뉴런",
    "S108",
    "10분",
    "2명",
    "초5–고3",
    "실제 움직임으로 조작하는 1대1 생존 격투 게임을 온몸으로 즐깁니다.",
  ],
  [
    "모구모구 정렬",
    "BP",
    "S109",
    "10분",
    "2명",
    "초5–중3",
    "여러 음료를 직접 나열하고 옮기며 정렬 알고리즘의 원리를 배웁니다.",
  ],
  [
    "뿅뿅 오락실",
    "BP",
    "S109",
    "10분",
    "6명",
    "초5–중3",
    "동아리 부원들이 직접 기획하고 만든 게임의 최고 기록에 도전합니다.",
  ],
  [
    "도전 코딩 챌린지",
    "BP",
    "S109",
    "10분",
    "4명",
    "초5–중3",
    "최소한의 블록으로 문제를 해결하고 명예의 전당에 도전합니다.",
  ],
].map(([name, club, place, time, people, age, description], index) => ({
  name,
  club,
  place,
  time,
  people,
  age,
  description,
  index,
}));

const colors = ["#007f72", "#006ee6", "#7657d6", "#c43ca2"];
const anomalySlide = {
  anomaly: true,
  name: "undefined",
  club: "NULL",
  place: "/dev/null",
  time: "NaN분",
  age: "ACCESS DENIED",
  description: "이 항목은 존재하지 않습니다. 정말로 확인하시겠습니까?",
};
const carouselItems = [...booths];
carouselItems.splice(5, 0, anomalySlide);
const slides = document.querySelector("#slides");
const grid = document.querySelector("#booth-grid");
const dialog = document.querySelector("#booth-dialog");
let current = 0,
  timer;

slides.innerHTML = carouselItems
  .map(
    (b, i) =>
      `<article class="slide${i === 0 ? " active" : ""}${b.anomaly ? " anomaly-slide" : ""}" ${b.anomaly ? "data-anomaly" : ""} style="--accent:${b.anomaly ? "#102033" : colors[i % 4]}"><div class="slide-number">${b.anomaly ? "??" : String(i + 1).padStart(2, "0")}</div><div class="slide-club">${b.club}</div><h2>${b.name}</h2><p>${b.description}</p><div class="slide-meta"><span>⌖ ${b.place}</span><span>◷ ${b.time}</span><span>${b.age}</span></div></article>`,
  )
  .join("");

function showSlide(next) {
  current = (next + carouselItems.length) % carouselItems.length;
  document
    .querySelectorAll(".slide")
    .forEach((el, i) => el.classList.toggle("active", i === current));
  document.querySelector("#slide-count").textContent =
    `${String(current + 1).padStart(2, "0")} / ${carouselItems.length}`;
  const bar = document.querySelector("#progress");
  bar.style.animation = "none";
  bar.offsetHeight;
  bar.style.animation = "fill 5s linear forwards";
}
function autoplay() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 5000);
}
document.querySelector("#prev").onclick = () => {
  showSlide(current - 1);
  autoplay();
};
document.querySelector("#next").onclick = () => {
  showSlide(current + 1);
  autoplay();
};

function card(b) {
  return `<button class="booth-card" data-open="${b.index}" style="--accent:${colors[b.index % 4]}"><span>${String(b.index + 1).padStart(2, "0")} · ${b.club}</span><h3>${b.name}</h3><p>${b.description}</p><div><b>${b.place}</b><small>${b.time} · ${b.people}</small></div></button>`;
}
function render(place = "전체") {
  const cards = booths
    .filter((b) => place === "전체" || b.place === place)
    .map(card);
  grid.innerHTML = cards.join("");
}
function openBooth(index) {
  const b = booths[index];
  document.querySelector("#dialog-content").innerHTML =
    `<small>${String(index + 1).padStart(2, "0")} — ${b.club}</small><h2>${b.name}</h2><p>${b.description}</p><dl><div><dt>장소</dt><dd>${b.place}</dd></div><div><dt>소요 시간</dt><dd>${b.time}</dd></div><div><dt>1회 인원</dt><dd>${b.people}</dd></div><div><dt>권장 대상</dt><dd>${b.age}</dd></div></dl>`;
  dialog.showModal();
}
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-open]");
  if (!target) return;
  if (miningMode) {
    breakBoothCard(target);
    return;
  }
  openBooth(Number(target.dataset.open));
});
document.querySelector("#filters").onclick = (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  if (button.dataset.place === "8-puzzle") {
    openPuzzle();
    return;
  }
  document
    .querySelectorAll("#filters button")
    .forEach((b) => b.classList.remove("active"));
  button.classList.add("active");
  render(button.dataset.place);
};
document.querySelector(".dialog-close").onclick = () => dialog.close();
dialog.onclick = (e) => {
  if (e.target === dialog) dialog.close();
};
render();
showSlide(0);
autoplay();

// Easter eggs ---------------------------------------------------------------
const eggWords = [
  "We",
  "Code",
  "The",
  "Day",
  "And",
  "Build",
  "Tomorrow",
  "Together",
];
const EGG_RESET_DELAY = 10 * 60 * 1000;
const foundEggs = new Set();
const eggResetTimers = new Map();
const toast = document.querySelector(".egg-toast");
let toastTimer;
let finalResetTimer;

function showToast(message, final = false, keyword = "") {
  clearTimeout(toastTimer);
  toast.replaceChildren();
  const toastMessage = document.createElement("span");
  toastMessage.className = "toast-message";
  toastMessage.textContent = message;
  toast.append(toastMessage);
  if (keyword) {
    const toastKeyword = document.createElement("strong");
    toastKeyword.className = "toast-keyword";
    toastKeyword.textContent = keyword;
    toast.append(toastKeyword);
  }
  toast.classList.toggle("final", final);
  toast.classList.add("show");
  toastTimer = setTimeout(
    () => toast.classList.remove("show"),
    final ? 7000 : 2800,
  );
}

function discoverEgg(number) {
  if (foundEggs.has(number)) {
    clearTimeout(eggResetTimers.get(number));
    eggResetTimers.set(
      number,
      setTimeout(() => resetEgg(number), EGG_RESET_DELAY),
    );
    showToast(
      `이스터에그 발견!`,
      false,
      `#${String(number).padStart(2, "0")} ${eggWords[number - 1]}`,
    );
    return;
  }
  foundEggs.add(number);
  clearTimeout(eggResetTimers.get(number));
  eggResetTimers.set(
    number,
    setTimeout(() => resetEgg(number), EGG_RESET_DELAY),
  );
  document.body.classList.add("egg-flash");
  setTimeout(() => document.body.classList.remove("egg-flash"), 500);
  showToast(
    `이스터에그 발견!`,
    false,
    `#${String(number).padStart(2, "0")} ${eggWords[number - 1]}`,
  );
  if (foundEggs.size === eggWords.length) {
    clearTimeout(finalResetTimer);
    finalResetTimer = setTimeout(
      () => showToast("WE CODE THE DAY AND BUILD TOMORROW TOGETHER.", true),
      700,
    );
    setTimeout(resetAllEggs, 8000);
  }
}

function resetEgg(number) {
  foundEggs.delete(number);
  clearTimeout(eggResetTimers.get(number));
  eggResetTimers.delete(number);
}

function resetAllEggs() {
  foundEggs.clear();
  eggResetTimers.forEach((timer) => clearTimeout(timer));
  eggResetTimers.clear();
  clearTimeout(finalResetTimer);
}

// #1 NULL: anomalous booth card.
document.addEventListener("click", (event) => {
  const anomaly = event.target.closest("[data-anomaly]");
  if (!anomaly) return;
  anomaly.classList.add("glitching");
  discoverEgg(1);
  setTimeout(() => anomaly.classList.remove("glitching"), 900);
});

// #2 NULL: reach both document boundaries within 45 seconds.
let topVisitedAt = window.scrollY < 20 ? Date.now() : 0;
let bottomVisitedAt = 0;
addEventListener(
  "scroll",
  () => {
    const now = Date.now();
    if (window.scrollY < 20) topVisitedAt = now;
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 20
    )
      bottomVisitedAt = now;
    if (
      topVisitedAt &&
      bottomVisitedAt &&
      Math.abs(topVisitedAt - bottomVisitedAt) <= 45000
    ) {
      discoverEgg(2);
      topVisitedAt = 0;
      bottomVisitedAt = 0;
    }
  },
  { passive: true },
);

// #3 s0sCoD3: fill the missing letters after C, T and D.
const ctdInputs = [...document.querySelectorAll("[data-ctd-part]")];
ctdInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^a-z]/gi, "").toLowerCase();
    if (input.value.length === input.maxLength) ctdInputs[index + 1]?.focus();
    const completed = `c${ctdInputs[0].value}t${ctdInputs[1].value}d${ctdInputs[2].value}`;
    if (completed !== "codetheday") return;
    discoverEgg(3);
    document.querySelector(".footer-code").classList.add("completed");
    setTimeout(() => {
      ctdInputs.forEach((field) => {
        field.value = "";
      });
      document.querySelector(".footer-code").classList.remove("completed");
    }, 1600);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value)
      ctdInputs[index - 1]?.focus();
  });
});

// #4 s0sCoD3: select the invisible phrase.
document.addEventListener("selectionchange", () => {
  const selection = getSelection();
  const secret = document.querySelector(".selection-secret");
  const anchorElement =
    selection?.anchorNode?.nodeType === Node.TEXT_NODE
      ? selection.anchorNode.parentElement
      : selection?.anchorNode;
  if (
    selection?.toString().trim() === "정보과학의 날" &&
    anchorElement &&
    secret.contains(anchorElement)
  ) {
    discoverEgg(4);
  }
});

// #5 Neuron: repeatedly tickle the hero mascot.
const mascot = document.querySelector(".hero-mascot");
const mascotImage = mascot.querySelector("img");
const mascotAssets = {
  default: "assets/sasa-mascot-wave.png",
  tickled: "assets/sasa-mascot-tickled.png",
};
Object.values(mascotAssets).forEach((source) => {
  const image = new Image();
  image.src = source;
});
let mascotClicks = 0;
let clickResetTimer;

mascot.addEventListener("click", () => {
  mascotClicks += 1;
  mascot.classList.remove("tickle-tap");
  void mascot.offsetWidth;
  mascot.classList.add("tickle-tap");
  if (mascotClicks >= 3) mascotImage.src = mascotAssets.tickled;
  clearTimeout(clickResetTimer);
  clickResetTimer = setTimeout(() => {
    mascotClicks = 0;
    mascotImage.src = mascotAssets.default;
    mascot.classList.remove("tickle-tap", "giggling");
  }, 4000);
  if (mascotClicks >= 5) {
    discoverEgg(5);
    mascot.classList.add("giggling");
    setTimeout(() => {
      mascot.classList.remove("tickle-tap", "giggling");
      mascotClicks = 0;
      mascotImage.src = mascotAssets.default;
    }, 1800);
  }
});

// #8 BP: move the lost mascot into its dock.
const draggableMascot = document.querySelector(".draggable-mascot");
const dock = document.querySelector("#mascot-dock");
let dragStart = null;
let mascotMoved = false;

draggableMascot.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  dragStart = { x: event.clientX, y: event.clientY };
  mascotMoved = false;
  draggableMascot.setPointerCapture(event.pointerId);
});
draggableMascot.addEventListener("pointermove", (event) => {
  if (!dragStart) return;
  const x = event.clientX - dragStart.x;
  const y = event.clientY - dragStart.y;
  if (Math.hypot(x, y) > 6) mascotMoved = true;
  if (mascotMoved) draggableMascot.style.translate = `${x}px ${y}px`;
});
draggableMascot.addEventListener("pointerup", (event) => {
  if (!dragStart) return;
  const dockRect = dock.getBoundingClientRect();
  const mascotRect = draggableMascot.getBoundingClientRect();
  const overlapWidth = Math.max(
    0,
    Math.min(mascotRect.right, dockRect.right) -
      Math.max(mascotRect.left, dockRect.left),
  );
  const overlapHeight = Math.max(
    0,
    Math.min(mascotRect.bottom, dockRect.bottom) -
      Math.max(mascotRect.top, dockRect.top),
  );
  const overlapRatio =
    (overlapWidth * overlapHeight) / (dockRect.width * dockRect.height);
  if (mascotMoved && overlapRatio >= 0.28) {
    discoverEgg(8);
    draggableMascot.classList.add("docked");
  }
  draggableMascot.style.translate = "";
  dragStart = null;
  setTimeout(() => {
    mascotMoved = false;
    draggableMascot.classList.remove("docked");
  }, 1200);
});
draggableMascot.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  draggableMascot.classList.add("docked");
  discoverEgg(8);
  setTimeout(() => draggableMascot.classList.remove("docked"), 1200);
});

// #6 Neuron: hold Minecraft, then break every real booth card.
let holdTimer;
let miningMode = false;
let brokenBooths = new Set();
document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest('.booth-card[data-open="7"]');
  if (!target || miningMode) return;
  holdTimer = setTimeout(() => {
    miningMode = true;
    brokenBooths.clear();
    document.querySelector('[data-place="전체"]').click();
    document.body.classList.add("mining-mode");
    showToast("MINING MODE · 모든 부스 셀을 부숴보세요.");
  }, 750);
});
document.addEventListener("pointerup", () => clearTimeout(holdTimer));
document.addEventListener("pointercancel", () => clearTimeout(holdTimer));
function breakBoothCard(cardElement) {
  const index = Number(cardElement.dataset.open);
  if (brokenBooths.has(index)) return;
  brokenBooths.add(index);
  cardElement.classList.add("breaking");
  cardElement.style.setProperty(
    "--break-frame",
    'url("assets/minecraft/break-particles.png")',
  );
  if (brokenBooths.size !== booths.length) return;
  discoverEgg(6);
  setTimeout(() => {
    miningMode = false;
    brokenBooths.clear();
    document.body.classList.remove("mining-mode");
    render();
  }, 1300);
}

// #7 BP: always-solvable 8-puzzle, shuffled with valid moves.
function openPuzzle() {
  let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  let empty = 8;
  for (let i = 0; i < 120; i += 1) {
    const row = Math.floor(empty / 3);
    const column = empty % 3;
    const moves = [
      empty - 3,
      empty + 3,
      column ? empty - 1 : -1,
      column < 2 ? empty + 1 : -1,
    ].filter(
      (position) =>
        position >= 0 &&
        position < 9 &&
        Math.abs(Math.floor(position / 3) - row) +
          Math.abs((position % 3) - column) ===
          1,
    );
    const next = moves[Math.floor(Math.random() * moves.length)];
    [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
    empty = next;
  }
  if (tiles.every((value, position) => value === (position + 1) % 9)) {
    [tiles[7], tiles[8]] = [tiles[8], tiles[7]];
    empty = 7;
  }
  const content = document.querySelector("#dialog-content");
  content.innerHTML =
    '<small>BP · 8-PUZZLE</small><h2>부스 셀을 복구하세요.</h2><p>빈칸 옆의 부스 설명 셀을 움직여 원래 순서로 맞춰보세요.</p><div class="puzzle-grid"></div>';
  const puzzle = content.querySelector(".puzzle-grid");
  function drawPuzzle() {
    puzzle.innerHTML = tiles
      .map((tile, index) =>
        tile
          ? `<button data-tile-index="${index}"><small>${String(tile).padStart(2, "0")} · ${booths[tile - 1].club}</small><strong>${booths[tile - 1].name}</strong><span>${booths[tile - 1].description}</span></button>`
          : '<span aria-label="빈칸"></span>',
      )
      .join("");
  }
  puzzle.onclick = (event) => {
    const tile = event.target.closest("button");
    if (!tile) return;
    const index = Number(tile.dataset.tileIndex);
    const distance =
      Math.abs(Math.floor(index / 3) - Math.floor(empty / 3)) +
      Math.abs((index % 3) - (empty % 3));
    if (distance !== 1) return;
    [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
    empty = index;
    drawPuzzle();
    if (tiles.every((value, position) => value === (position + 1) % 9)) {
      discoverEgg(7);
      setTimeout(() => dialog.close(), 900);
    }
  };
  drawPuzzle();
  dialog.showModal();
}
