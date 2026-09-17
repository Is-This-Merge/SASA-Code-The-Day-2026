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
    "페이지 곳곳에 숨겨진 단서와 상호작용을 찾아 하나의 문장을 완성하는 참여형 전시입니다.",
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

const boothImageFiles = [
  "AI를 해방시켜라.png",
  "피싱 대학.png",
  "위키 레이싱.png",
  "세미 CTF.png",
  "내가 코딩 언어라면.png",
  "Life is Easter Egg.png",
  "꿈 우리는 모두 어린왕자였다.png",
  "마인크래프트 속으로.png",
  "AI 100% 활용하는 법.png",
  "AI를 설득해보자.png",
  "DUELIST.png",
  "모구모구 정렬.png",
  "뿅뿅 오락실.png",
  "도전! 코딩 챌린지.png",
];

booths.forEach((booth, index) => {
  booth.image = encodeURI(
    `assets/부스 이미지/cropped/${boothImageFiles[index]}`,
  );
});

const colors = ["#007f72", "#006ee6", "#7657d6", "#c43ca2"];
const carouselItems = booths;
const slides = document.querySelector("#slides");
const grid = document.querySelector("#booth-grid");
const dialog = document.querySelector("#booth-dialog");
const metaIcons = {
  place:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  time:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  age:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3"/><path d="M6.5 20v-2.5a5.5 5.5 0 0 1 11 0V20"/></svg>',
};
let currentPlace = "전체";
let current = 0,
  timer;

slides.innerHTML = carouselItems
  .map(
    (b, i) =>
      `<article class="slide${i === 0 ? " active" : ""}${b.index === 5 ? " easter-egg-slide" : ""}" ${b.index === 5 ? "data-anomaly" : ""} style="--accent:${colors[i % 4]}"><div class="slide-number">${String(i + 1).padStart(2, "0")}</div><div class="slide-club">${b.club}</div><h2${b.index === 5 ? ` data-glitch="${b.name}"` : ""}>${b.name}</h2><p>${b.index === 5 ? "이 카드 자체가 이스터에그입니다. 클릭해 첫 번째 신호를 확인해보세요." : b.description}</p><div class="slide-meta"><span class="meta-badge">${metaIcons.place}<span>${b.place}</span></span><span class="meta-badge">${metaIcons.time}<span>${b.time}</span></span><span class="meta-badge">${metaIcons.age}<span>${b.age}</span></span></div></article>`,
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
  grid.classList.remove(
    "puzzle-mode",
    "mining-board",
    "image-revealed",
  );
  grid.classList.toggle("all-filter", place === "전체");
  grid.onclick = null;
  const cards = booths
    .filter((b) => place === "전체" || b.place === place)
    .map(card);
  grid.innerHTML = cards.join("");
}
function openBooth(index) {
  const b = booths[index];
  const showPoster = !(index === 7 && currentPlace === "전체");
  const poster = showPoster
    ? `<figure class="dialog-poster"><img src="${b.image}" alt="${b.name} 부스 이미지" decoding="async" /></figure>`
    : `<figure class="dialog-poster dialog-poster-empty" aria-label="${b.name} 이스터에그 힌트"><div class="minecraft-detail-hint"><small>그림이 어디갔지?</small><strong>이 카드 뒤에 숨어있는 것 같은데?</strong></div></figure>`;
  document.querySelector("#dialog-content").innerHTML =
    `<div class="dialog-layout">${poster}<div class="dialog-copy"><small>${String(index + 1).padStart(2, "0")} — ${b.club}</small><h2>${b.name}</h2><p>${b.description}</p><dl><div><dt>장소</dt><dd>${b.place}</dd></div><div><dt>소요 시간</dt><dd>${b.time}</dd></div><div><dt>수용 인원</dt><dd>${b.people}</dd></div><div><dt>권장 대상</dt><dd>${b.age}</dd></div></dl></div></div>`;
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
  if (button.dataset.place === "5-puzzle") {
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
  "자동으로 넘어가는 카드 사이의 이스터에그에 집중해 보세요!",
  "페이지의 시작과 끝을 짧은 시간 안에 모두 확인해 보세요.",
  "Footer에 남은 C, T, D 사이에는 행사명이 필요합니다.",
  "\"장소별 부스\" 인근을 드래그해보세요.",
  "메인 화면의 구름이는 간지럼을 꽤 많이 탑니다.",
  "마인크래프트 부스 카드를 파괴해보세요!",
  "부스 필터 사이에 실제 장소가 아닌 퍼즐 하나가 숨어 있습니다.",
  "페이지 아래의 길 잃은 작은 구름이를 원래 위치로 돌려보내주세요.",
];
const toast = document.querySelector(".egg-toast");
let activeToastEgg = null;

function getNextEggHint(number) {
  return eggHints[number % eggHints.length];
}

function hideToast() {
  const closedEgg = activeToastEgg;
  activeToastEgg = null;
  toast.classList.remove("show");
  document.body.classList.remove("toast-open");
  if (closedEgg) {
    window.dispatchEvent(
      new CustomEvent("egg-toast-closed", { detail: { number: closedEgg } }),
    );
  }
}

function showToast(
  message,
  final = false,
  keyword = "",
  hint = "",
  hintNumber = "",
) {
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
    hintBox.innerHTML = `<small></small><p></p>`;
    hintBox.querySelector("small").textContent = `#${hintNumber} HINT`;
    hintBox.querySelector("p").textContent = hint;
    toast.append(hintBox);
  }
  toast.classList.toggle("final", final);
  document.body.classList.add("toast-open");
  toast.classList.add("show");
  return true;
}

function discoverEgg(number) {
  if (miningMode) {
    const place = currentPlace;
    resetMiningState();
    render(place);
  }
  const shown = showToast(
    `이스터에그 발견!`,
    false,
    `#${String(number)} ${eggWords[number - 1]}`,
    getNextEggHint(number),
    (number % eggWords.length) + 1,
  );
  if (shown) activeToastEgg = number;
  return shown;
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

// #2 NULL: reach both document boundaries within 8 seconds.
const BOUNDARY_VISIT_LIMIT = 8000;
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
      Math.abs(topVisitedAt - bottomVisitedAt) <= BOUNDARY_VISIT_LIMIT
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
const footerCode = document.querySelector(".footer-code");
const acceptedCtdParts = ["ode", "he", "ay"];
ctdInputs.forEach((input, index) => {
  input.addEventListener("input", (event) => {
    if (event.isComposing) return;
    input.value = input.value
      .normalize("NFC")
      .replace(/[^a-zㄱ-ㅎㅏ-ㅣ가-힣]/gi, "")
      .toLowerCase();
    const values = ctdInputs.map((field) => field.value.normalize("NFC"));
    footerCode.classList.toggle(
      "korean-entry",
      values.some((value) => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)),
    );
    if (acceptedCtdParts[index] === input.value) {
      ctdInputs[index + 1]?.focus();
    }
    const completed = `c${ctdInputs[0].value}t${ctdInputs[1].value}d${ctdInputs[2].value}`;
    if (completed !== "codetheday") return;
    discoverEgg(3);
    footerCode.classList.add("completed");
    setTimeout(() => {
      ctdInputs.forEach((field) => {
        field.value = "";
      });
      footerCode.classList.remove("completed", "korean-entry");
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
    selection?.toString().trim() === "이스터에그" &&
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
const draggableMascotImage = draggableMascot.querySelector("img");
const dock = document.querySelector("#mascot-dock");
let dragStart = null;
let latestPointer = null;
let mascotMoved = false;
let mascotReturnTimer;
let mascotScrollFrame;

function stopMascotAutoScroll() {
  cancelAnimationFrame(mascotScrollFrame);
  mascotScrollFrame = 0;
  document.documentElement.classList.remove("mascot-dragging");
}

function updateMascotPosition() {
  if (!dragStart || !latestPointer) return;
  const x =
    latestPointer.x - dragStart.x + window.scrollX - dragStart.scrollX;
  const y =
    latestPointer.y - dragStart.y + window.scrollY - dragStart.scrollY;
  if (Math.hypot(x, y) > 6) mascotMoved = true;
  if (mascotMoved) draggableMascot.style.translate = `${x}px ${y}px`;
}

function autoScrollMascotPage() {
  if (!dragStart || !latestPointer) return;
  const edge = Math.min(110, window.innerHeight * 0.16);
  let scrollAmount = 0;
  if (latestPointer.y < edge) {
    const intensity = (edge - latestPointer.y) / edge;
    scrollAmount = -Math.ceil(16 * intensity * intensity);
  } else if (latestPointer.y > window.innerHeight - edge) {
    const intensity =
      (latestPointer.y - (window.innerHeight - edge)) / edge;
    scrollAmount = Math.ceil(16 * intensity * intensity);
  }
  if (scrollAmount) {
    window.scrollBy(0, scrollAmount);
    updateMascotPosition();
  }
  mascotScrollFrame = requestAnimationFrame(autoScrollMascotPage);
}

function completeMascotDock() {
  stopMascotAutoScroll();
  draggableMascot.classList.remove("dragging");
  clearTimeout(mascotReturnTimer);
  draggableMascotImage.src = "assets/sasa-mascot-tickled.png";
  draggableMascot.classList.add("matched");
  const popupShown = discoverEgg(8);
  if (!popupShown) scheduleMascotReturn(900);
}

function scheduleMascotReturn(delay = 700) {
  clearTimeout(mascotReturnTimer);
  mascotReturnTimer = setTimeout(() => {
    draggableMascot.classList.add("returning");
    draggableMascot.style.translate = "";
    setTimeout(() => {
      draggableMascotImage.src = "assets/sasa-mascot-wave.png";
      draggableMascot.classList.remove("matched", "returning");
    }, 650);
  }, delay);
}

window.addEventListener("egg-toast-closed", (event) => {
  if (
    event.detail.number === 8 &&
    draggableMascot.classList.contains("matched")
  ) {
    scheduleMascotReturn();
  }
});

draggableMascot.addEventListener("pointerdown", (event) => {
  if (draggableMascot.classList.contains("matched")) return;
  event.preventDefault();
  dragStart = {
    x: event.clientX,
    y: event.clientY,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  };
  latestPointer = { x: event.clientX, y: event.clientY };
  mascotMoved = false;
  draggableMascot.classList.add("dragging");
  draggableMascot.setPointerCapture(event.pointerId);
  stopMascotAutoScroll();
  document.documentElement.classList.add("mascot-dragging");
  mascotScrollFrame = requestAnimationFrame(autoScrollMascotPage);
});
draggableMascot.addEventListener("pointermove", (event) => {
  if (!dragStart) return;
  latestPointer = { x: event.clientX, y: event.clientY };
  updateMascotPosition();
});
draggableMascot.addEventListener("pointerup", (event) => {
  if (!dragStart) return;
  stopMascotAutoScroll();
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
    dragStart = null;
    latestPointer = null;
    mascotMoved = false;
    completeMascotDock();
    return;
  }
  draggableMascot.style.translate = "";
  draggableMascot.classList.remove("dragging");
  dragStart = null;
  latestPointer = null;
  setTimeout(() => {
    mascotMoved = false;
  }, 1200);
});
draggableMascot.addEventListener("pointercancel", () => {
  stopMascotAutoScroll();
  draggableMascot.style.translate = "";
  draggableMascot.classList.remove("dragging");
  dragStart = null;
  latestPointer = null;
  mascotMoved = false;
});
draggableMascot.addEventListener("keydown", (event) => {
  if (
    event.key !== "Enter" ||
    draggableMascot.classList.contains("matched")
  )
    return;
  event.preventDefault();
  const mascotRect = draggableMascot.getBoundingClientRect();
  const dockRect = dock.getBoundingClientRect();
  draggableMascot.classList.add("returning");
  draggableMascot.style.translate = `${dockRect.left + dockRect.width / 2 - (mascotRect.left + mascotRect.width / 2)}px ${dockRect.top + dockRect.height / 2 - (mascotRect.top + mascotRect.height / 2)}px`;
  setTimeout(() => {
    draggableMascot.classList.remove("returning");
    completeMascotDock();
  }, 650);
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
let miningResetTimer;

function setCrackFrame(cardElement, stage) {
  cardElement.classList.add("cracking");
  cardElement.style.setProperty(
    "--break-frame",
    `url("assets/minecraft/crack-${String(stage).padStart(2, "0")}.png")`,
  );
}

function cancelCracking() {
  cancelAnimationFrame(crackAnimationFrame);
  const targetId = crackTarget?.classList.contains("mining-filler")
    ? "filler"
    : Number(crackTarget?.dataset.open);
  if (crackTarget && !brokenBooths.has(targetId)) {
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
  const filler = document.createElement("span");
  filler.className = "mining-filler";
  filler.dataset.miningFiller = "true";
  filler.setAttribute("aria-hidden", "true");
  grid.append(filler);
  const minecraftCard = document.querySelector('.booth-card[data-open="7"]');
  setCrackFrame(minecraftCard, CRACK_FRAME_COUNT);
  minecraftCard.classList.remove("cracking");
  brokenBooths.add(7);
  removeCardWithParticles(minecraftCard);
  crackTarget = null;
  crackStage = 0;
}

document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest(
    ".booth-card[data-open], .mining-filler[data-mining-filler]",
  );
  if (!target) return;
  const targetId = target.classList.contains("mining-filler")
    ? "filler"
    : Number(target.dataset.open);
  if (
    currentPlace !== "전체" ||
    (!miningMode && targetId !== 7) ||
    brokenBooths.has(targetId)
  )
    return;
  startCracking(target, miningMode ? completeBoothBreak : enterMiningMode);
});
document.addEventListener("pointerup", cancelCracking);
document.addEventListener("pointercancel", cancelCracking);

function completeBoothBreak(cardElement) {
  const targetId = cardElement.classList.contains("mining-filler")
    ? "filler"
    : Number(cardElement.dataset.open);
  cardElement.classList.remove("cracking");
  brokenBooths.add(targetId);
  removeCardWithParticles(cardElement);
  if (brokenBooths.size !== booths.length + 1) return;
  grid.classList.add("image-revealed");
  miningMode = false;
  brokenBooths.clear();
  document.body.classList.remove("mining-mode");
  discoverEgg(6);
  clearTimeout(miningResetTimer);
  miningResetTimer = setTimeout(() => {
    miningResetTimer = null;
    if (currentPlace === "전체") render("전체");
  }, 4000);
}

function removeCardWithParticles(cardElement) {
  const cardRect = cardElement.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();
  const particles = document.createDocumentFragment();
  for (let index = 0; index < 16; index += 1) {
    const particle = document.createElement("i");
    particle.className = "block-particle";
    particle.setAttribute("aria-hidden", "true");
    particle.style.left = `${cardRect.left - gridRect.left + Math.random() * cardRect.width}px`;
    particle.style.top = `${cardRect.top - gridRect.top + Math.random() * cardRect.height}px`;
    particle.style.setProperty(
      "--particle-size",
      `${Math.round(7 + Math.random() * 9)}px`,
    );
    particle.style.setProperty("--particle-x", `${Math.random() * 130 - 65}px`);
    particle.style.setProperty("--particle-y", `${80 + Math.random() * 150}px`);
    particles.append(particle);
    setTimeout(() => particle.remove(), 760);
  }
  grid.append(particles);
  cardElement.classList.add("removed");
}

function resetMiningState() {
  clearTimeout(miningResetTimer);
  miningResetTimer = null;
  cancelCracking();
  miningMode = false;
  brokenBooths.clear();
  document.body.classList.remove("mining-mode");
  grid.classList.remove("mining-board", "image-revealed");
  grid.querySelector(".mining-filler")?.remove();
}

// #7 BP: always-solvable 5-puzzle, shuffled with valid moves.
function openPuzzle() {
  const columns = 3;
  const boardSize = 6;
  let tiles = [1, 2, 3, 4, 5, 0];
  let empty = boardSize - 1;
  for (let i = 0; i < 48; i += 1) {
    const row = Math.floor(empty / columns);
    const column = empty % columns;
    const moves = [
      empty - columns,
      empty + columns,
      column ? empty - 1 : -1,
      column < columns - 1 ? empty + 1 : -1,
    ].filter(
      (position) =>
        position >= 0 &&
        position < boardSize &&
        Math.abs(Math.floor(position / columns) - row) +
          Math.abs((position % columns) - column) ===
          1,
    );
    const next = moves[Math.floor(Math.random() * moves.length)];
    [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
    empty = next;
  }
  if (
    tiles.every((value, position) => value === (position + 1) % boardSize)
  ) {
    [tiles[boardSize - 2], tiles[boardSize - 1]] = [
      tiles[boardSize - 1],
      tiles[boardSize - 2],
    ];
    empty = boardSize - 2;
  }
  currentPlace = "5-puzzle";
  grid.classList.remove("all-filter", "mining-board", "image-revealed");
  grid.classList.add("puzzle-mode");
  function drawPuzzle(animate = false) {
    const previousRects = new Map(
      [...grid.querySelectorAll("[data-puzzle-tile]")].map((tile) => [
        tile.dataset.puzzleTile,
        tile.getBoundingClientRect(),
      ]),
    );
    grid.innerHTML = tiles
      .map((tile, index) =>
        tile
          ? `<button class="puzzle-tile" data-tile-index="${index}" data-puzzle-tile="${tile}"><small>${String(tile).padStart(2, "0")} · ${booths[tile - 1].club}</small><strong>${booths[tile - 1].name}</strong><span>${booths[tile - 1].description}</span></button>`
          : '<span class="puzzle-empty" aria-label="빈칸"></span>',
      )
      .join("");
    if (!animate || !previousRects.size) return;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    grid.querySelectorAll("[data-puzzle-tile]").forEach((tile) => {
      const previous = previousRects.get(tile.dataset.puzzleTile);
      if (!previous) return;
      const currentRect = tile.getBoundingClientRect();
      const x = previous.left - currentRect.left;
      const y = previous.top - currentRect.top;
      if ((!x && !y) || typeof tile.animate !== "function") return;
      tile.animate(
        [{ transform: `translate(${x}px, ${y}px)` }, { transform: "none" }],
        {
          duration: reduceMotion ? 1 : 260,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        },
      );
    });
  }
  grid.onclick = (event) => {
    const tile = event.target.closest(".puzzle-tile");
    if (!tile) return;
    const index = Number(tile.dataset.tileIndex);
    const distance =
      Math.abs(
        Math.floor(index / columns) - Math.floor(empty / columns),
      ) + Math.abs((index % columns) - (empty % columns));
    if (distance !== 1) return;
    [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
    empty = index;
    drawPuzzle(true);
    if (
      tiles.every((value, position) => value === (position + 1) % boardSize)
    ) {
      discoverEgg(7);
    }
  };
  drawPuzzle();
}
