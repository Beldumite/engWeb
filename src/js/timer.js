let defaults = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  cyclesUntilLong: 4
};

let state = {
  mode: "work",
  running: false,
  remaining: defaults.work * 60,
  intervalId: null,
  currentCycle: 1,
  totalCycles: defaults.cyclesUntilLong
};

const timeDisplay = document.getElementById("timeDisplay");
const playPauseBtn = document.getElementById("playPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const progressBar = document.getElementById("progressBar");
const cycleText = document.getElementById("cycleText");

const workInput = document.getElementById("workInput");
const shortInput = document.getElementById("shortInput");
const longInput = document.getElementById("longInput");
const cyclesInput = document.getElementById("cyclesInput");
const applyBtn = document.getElementById("applyBtn");
const restoreBtn = document.getElementById("restoreBtn");

function init() {
  workInput.value = defaults.work;
  shortInput.value = defaults.shortBreak;
  longInput.value = defaults.longBreak;
  cyclesInput.value = defaults.cyclesUntilLong;

  resetToDefaults();
  updateUI();
}

function resetToDefaults() {
  state.mode = "work";
  state.running = false;
  clearIntervalSafe();
  state.currentCycle = 1;
  state.totalCycles = defaults.cyclesUntilLong;
  state.remaining = defaults.work * 60;
  setPlayIcon(false);
  updateUI();
}

function clearIntervalSafe() {
  if (state.intervalId !== null) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
}

function setPlayIcon(running) {
  playPauseBtn.textContent = running ? "⏸" : "▶";
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${mm} : ${ss}`;
}

function updateUI() {
  timeDisplay.textContent = formatTime(state.remaining);

  const duration = getDurationForMode(state.mode);
  const elapsed = Math.max(0, duration - state.remaining);
  const fraction = duration > 0 ? (elapsed / duration) : 0;
  progressBar.style.width = `${Math.round(fraction * 100)}%`;

  cycleText.textContent = `Cycle ${state.currentCycle} of ${state.totalCycles}`;
}

function getDurationForMode(mode) {
  if (mode === "work") return (defaults.work * 60);
  if (mode === "short") return (defaults.shortBreak * 60);
  if (mode === "long") return (defaults.longBreak * 60);
  return defaults.work * 60;
}

function tick() {
  if (state.remaining <= 0) {
    if (state.mode === "work") {
      state.currentCycle++;
      const useLong = (state.currentCycle - 1) % state.totalCycles === 0;
      state.mode = useLong ? "long" : "short";
      state.remaining = getDurationForMode(state.mode);
    } else {
      state.mode = "work";
      state.remaining = getDurationForMode("work");
      if (state.currentCycle > state.totalCycles) {
        state.currentCycle = 1;
      }
    }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 800;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.value = 0.05;
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 180);
    } catch (e) {
    }
  } else {
    state.remaining--;
  }
  updateUI();
}

playPauseBtn.addEventListener("click", () => {
  if (!state.running) {
    state.running = true;
    setPlayIcon(true);
    if (!state.intervalId) {
      state.intervalId = setInterval(tick, 1000);
    }
  } else {
    state.running = false;
    setPlayIcon(false);
    clearIntervalSafe();
  }
});

resetBtn.addEventListener("click", () => {
  state.running = false;
  setPlayIcon(false);
  clearIntervalSafe();
  state.mode = "work";
  state.remaining = defaults.work * 60;
  state.currentCycle = 1;
  updateUI();
});

applyBtn.addEventListener("click", () => {
  const w = parseInt(workInput.value, 10) || defaults.work;
  const s = parseInt(shortInput.value, 10) || defaults.shortBreak;
  const l = parseInt(longInput.value, 10) || defaults.longBreak;
  const c = Math.max(1, parseInt(cyclesInput.value, 10) || defaults.cyclesUntilLong);

  defaults.work = Math.max(1, w);
  defaults.shortBreak = Math.max(1, s);
  defaults.longBreak = Math.max(1, l);
  defaults.cyclesUntilLong = c;

  state.totalCycles = c;
  state.mode = "work";
  state.remaining = defaults.work * 60;
  state.currentCycle = 1;
  state.running = false;
  clearIntervalSafe();
  setPlayIcon(false);
  updateUI();
});

restoreBtn.addEventListener("click", () => {
  defaults = { work: 25, shortBreak: 5, longBreak: 15, cyclesUntilLong: 4 };
  workInput.value = defaults.work;
  shortInput.value = defaults.shortBreak;
  longInput.value = defaults.longBreak;
  cyclesInput.value = defaults.cyclesUntilLong;
  resetToDefaults();
});

document.querySelectorAll(".pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.dataset.mode === "deadlines") {
      document.querySelector(".timer-title").textContent = "Deadlines";
    } else {
      document.querySelector(".timer-title").textContent = "Focus Time";
    }
  });
});

init();