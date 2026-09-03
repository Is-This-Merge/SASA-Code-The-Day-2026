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
    "이 카드를 눌러 첫 번째 이스터에그를 획득해보세요!.",
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
const carouselItems = booths;
const slides = document.querySelector("#slides");
const grid = document.querySelector("#booth-grid");
const dialog = document.querySelector("#booth-dialog");
let currentPlace = "전체";
let current = 0,
  timer;

slides.innerHTML = carouselItems
  .map(
    (b, i) =>
      `<article class="slide${i === 0 ? " active" : ""}${b.index === 5 ? " easter-egg-slide" : ""}" ${b.index === 5 ? "data-anomaly" : ""} style="--accent:${colors[i % 4]}"><div class="slide-number">${String(i + 1).padStart(2, "0")}</div><div class="slide-club">${b.club}</div><h2${b.index === 5 ? ` data-glitch="${b.name}"` : ""}>${b.name}</h2><p>${b.description}</p><div class="slide-meta"><span>⌖ ${b.place}</span><span>◷ ${b.time}</span><span>${b.age}</span></div></article>`,
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
  bar.style.animationPlayState = "running";
  bar.offsetHeight;
  bar.style.animation = "fill 5s linear forwards";
}
function autoplay() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 5000);
}
function pauseAutoplay() {
  clearInterval(timer);
  document.querySelector("#progress").style.animationPlayState = "paused";
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
  currentPlace = place;
  grid.classList.remove("puzzle-mode", "puzzle-complete");
  grid.onclick = null;
  const cards = booths
    .filter((b) => place === "전체" || b.place === place)
    .map(card);
  grid.innerHTML = cards.join("");
}
function openBooth(index) {
  const b = booths[index];
  document.querySelector("#dialog-content").innerHTML =
    `<small>${String(index + 1).padStart(2, "0")} — ${b.club}</small><h2>${b.name}</h2><p>${b.description}</p><dl><div><dt>장소</dt><dd>${b.place}</dd></div><div><dt>소요 시간</dt><dd>${b.time}</dd></div><div><dt>수용 인원</dt><dd>${b.people}</dd></div><div><dt>권장 대상</dt><dd>${b.age}</dd></div></dl>`;
  dialog.showModal();
}
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-open]");
  if (!target) return;
  if (miningMode) return;
  openBooth(Number(target.dataset.open));
});
document.querySelector("#filters").onclick = (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  if (button.dataset.place === "8-puzzle") {
    resetMiningState();
    document
      .querySelectorAll("#filters button")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    openPuzzle();
    return;
  }
  if (miningMode && button.dataset.place === "전체") return;
  if (button.dataset.place !== "전체") resetMiningState();
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
const eggHints = [
  "자동으로 넘어가는 카드 사이에 낯선 신호가 섞여 있습니다.",
  "페이지의 시작과 끝을 짧은 시간 안에 모두 확인해 보세요.",
  "Footer에 남은 C, T, D 사이에는 보이지 않는 글자가 필요합니다.",
  "부스 목록 근처에는 배경과 같은 색의 행사 이름이 숨어 있습니다.",
  "메인 화면의 구름이는 간지럼을 꽤 많이 탑니다.",
  "마인크래프트 부스 카드를 잠시 누르고 있으면 세계가 달라집니다.",
  "부스 필터 사이에 실제 장소가 아닌 퍼즐 하나가 숨어 있습니다.",
  "페이지 아래의 길 잃은 구름이와 흐릿한 모양을 비교해 보세요.",
];
const toast = document.querySelector(".egg-toast");

function getNextEggHint(number) {
  return eggHints[number % eggHints.length];
}

function hideToast() {
  toast.classList.remove("show");
}

function showToast(message, final = false, keyword = "", hint = "") {
  if (toast.classList.contains("show")) {
    return false;
  }
  toast.replaceChildren();
  const closeButton = document.createElement("button");
  closeButton.className = "toast-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "팝업 닫기");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", hideToast);
  toast.append(closeButton);
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
  if (hint) {
    const hintBox = document.createElement("div");
    hintBox.className = "toast-hint";
    hintBox.innerHTML = `<small>NEXT HINT</small><p></p>`;
    hintBox.querySelector("p").textContent = hint;
    toast.append(hintBox);
  }
  toast.classList.toggle("final", final);
  toast.classList.add("show");
  return true;
}

function discoverEgg(number) {
  showToast(
    `이스터에그 발견!`,
    false,
    `#${String(number)} ${eggWords[number - 1]}`,
    getNextEggHint(number),
  );
}

// #1 NULL: the Life is Easter Egg carousel card.
let anomalyEffectTimer;
document.addEventListener("click", (event) => {
  const anomaly = event.target.closest("[data-anomaly]");
  if (!anomaly) return;
  clearTimeout(anomalyEffectTimer);
  pauseAutoplay();
  anomaly.classList.add("glitching");
  discoverEgg(1);
  anomalyEffectTimer = setTimeout(() => {
    anomaly.classList.remove("glitching");
    showSlide(current + 1);
    autoplay();
  }, 1400);
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
const CRACK_FRAME_COUNT = 6;
const CRACK_HOLD_DURATION = 1200;
let crackAnimationFrame;
let crackTarget = null;
let crackStage = 0;
let crackStartedAt = 0;
let crackCompletion = null;
let miningMode = false;
let brokenBooths = new Set();

function setCrackFrame(cardElement, stage) {
  cardElement.classList.add("cracking");
  cardElement.style.setProperty(
    "--break-frame",
    `url("assets/minecraft/crack-${String(stage).padStart(2, "0")}.png")`,
  );
}

function cancelCracking() {
  cancelAnimationFrame(crackAnimationFrame);
  const targetIndex = Number(crackTarget?.dataset.open);
  if (crackTarget && !brokenBooths.has(targetIndex)) {
    crackTarget.classList.remove("cracking");
    crackTarget.style.removeProperty("--break-frame");
    delete crackTarget.dataset.cracking;
  }
  crackTarget = null;
  crackStage = 0;
  crackStartedAt = 0;
  crackCompletion = null;
}

function updateCracking(now) {
  if (!crackTarget) return;
  const elapsed = now - crackStartedAt;
  const nextStage = Math.min(
    CRACK_FRAME_COUNT,
    Math.floor((elapsed / CRACK_HOLD_DURATION) * CRACK_FRAME_COUNT) + 1,
  );
  if (nextStage !== crackStage) {
    crackStage = nextStage;
    setCrackFrame(crackTarget, crackStage);
  }
  if (elapsed < CRACK_HOLD_DURATION) {
    crackAnimationFrame = requestAnimationFrame(updateCracking);
    return;
  }
  const completedTarget = crackTarget;
  const onComplete = crackCompletion;
  crackTarget = null;
  crackCompletion = null;
  delete completedTarget.dataset.cracking;
  onComplete(completedTarget);
}

function startCracking(cardElement, onComplete) {
  cancelCracking();
  crackTarget = cardElement;
  crackStage = 1;
  crackStartedAt = performance.now();
  crackCompletion = onComplete;
  cardElement.dataset.cracking = "true";
  setCrackFrame(cardElement, crackStage);
  crackAnimationFrame = requestAnimationFrame(updateCracking);
}

function enterMiningMode() {
  miningMode = true;
  brokenBooths.clear();
  document.body.classList.add("mining-mode");
  grid.classList.add("mining-board");
  const minecraftCard = document.querySelector('.booth-card[data-open="7"]');
  setCrackFrame(minecraftCard, CRACK_FRAME_COUNT);
  minecraftCard.classList.remove("cracking");
  brokenBooths.add(7);
  removeCardWithParticles(minecraftCard);
  crackTarget = null;
  crackStage = 0;
}

document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest(".booth-card[data-open]");
  if (!target) return;
  const index = Number(target.dataset.open);
  if (
    currentPlace !== "전체" ||
    (!miningMode && index !== 7) ||
    brokenBooths.has(index)
  )
    return;
  startCracking(target, miningMode ? completeBoothBreak : enterMiningMode);
});
document.addEventListener("pointerup", cancelCracking);
document.addEventListener("pointercancel", cancelCracking);

function completeBoothBreak(cardElement) {
  const index = Number(cardElement.dataset.open);
  cardElement.classList.remove("cracking");
  brokenBooths.add(index);
  removeCardWithParticles(cardElement);
  if (brokenBooths.size !== booths.length) return;
  grid.classList.add("image-revealed");
  discoverEgg(6);
}

function removeCardWithParticles(cardElement) {
  const cardRect = cardElement.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();
  const accent = getComputedStyle(cardElement).getPropertyValue("--accent");
  for (let index = 0; index < 22; index += 1) {
    const particle = document.createElement("i");
    particle.className = "block-particle";
    particle.setAttribute("aria-hidden", "true");
    particle.style.left = `${cardRect.left - gridRect.left + Math.random() * cardRect.width}px`;
    particle.style.top = `${cardRect.top - gridRect.top + Math.random() * cardRect.height}px`;
    particle.style.setProperty("--particle-color", accent);
    particle.style.setProperty("--particle-x", `${Math.random() * 180 - 90}px`);
    particle.style.setProperty("--particle-y", `${Math.random() * 150 - 110}px`);
    particle.style.setProperty("--particle-rotation", `${Math.random() * 360}deg`);
    grid.append(particle);
    setTimeout(() => particle.remove(), 720);
  }
  cardElement.classList.add("removed");
}

function resetMiningState() {
  cancelCracking();
  miningMode = false;
  brokenBooths.clear();
  document.body.classList.remove("mining-mode");
  grid.classList.remove("mining-board", "image-revealed");
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
  currentPlace = "8-puzzle";
  grid.classList.remove("mining-board", "image-revealed");
  grid.classList.add("puzzle-mode");
  function drawPuzzle() {
    grid.innerHTML = tiles
      .map((tile, index) =>
        tile
          ? `<button class="puzzle-tile" data-tile-index="${index}"><small>${String(tile).padStart(2, "0")} · ${booths[tile - 1].club}</small><strong>${booths[tile - 1].name}</strong><span>${booths[tile - 1].description}</span></button>`
          : '<span class="puzzle-empty" aria-label="빈칸"></span>',
      )
      .join("");
  }
  grid.onclick = (event) => {
    const tile = event.target.closest(".puzzle-tile");
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
      grid.classList.add("puzzle-complete");
    }
  };
  drawPuzzle();
}
