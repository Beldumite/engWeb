document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const DATA = {
    attendance: 80,
    tasks: 258,
    progress: 64,
    points: 245,
    scoreMonthly: {
      labels: [
        "Apr 10",
        "Apr 11",
        "Apr 12",
        "Apr 13",
        "Apr 14",
        "Apr 15",
        "Apr 16",
      ],
      data: [60, 45, 70, 55, 75, 50, 85],
    },
    grade: [
      { sub: "English", val: 85 },
      { sub: "Tamil", val: 75 },
      { sub: "Math", val: 90 },
      { sub: "Chemistry", val: 70 },
      { sub: "Physics", val: 80 },
      { sub: "Computer Science", val: 95 },
    ],
  };

  function animateNum(el, target, ms = 700) {
    if (!el) return;
    const start = parseInt(el.textContent.replace(/\D/g, "")) || 0;
    const diff = target - start;
    const startTime = performance.now();
    const step = (now) => {
      const t = clamp((now - startTime) / ms, 0, 1);
      const val = Math.round(start + diff * t);
      el.textContent =
        el.id === "taskCounter"
          ? val + (t < 1 ? "" : "+")
          : val +
            (el.id.endsWith("Counter")
              ? el.id === "attendanceCounter" || el.id === "progressCounter"
                ? "%"
                : ""
              : "");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  animateNum($("#attendanceCounter"), DATA.attendance);
  $("#attendanceCounter").textContent = DATA.attendance + "%";
  animateNum($("#taskCounter"), DATA.tasks);
  animateNum($("#progressCounter"), DATA.progress);
  animateNum($("#pointsCounter"), DATA.points);

  $("#bigDonutLabel").textContent = DATA.attendance + "%";
  $("#miniLabel").textContent = DATA.attendance + "%";
  $("#progressFill").style.width = DATA.attendance + "%";

  const bigDonutCtx = document.getElementById("bigDonut").getContext("2d");
  const bigDonutChart = new Chart(bigDonutCtx, {
    type: "doughnut",
    data: {
      labels: ["Present", "Absent"],
      datasets: [
        {
          data: [DATA.attendance, 100 - DATA.attendance],
          backgroundColor: ["#1d4ed8", "#e6eef8"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "70%",
      plugins: { legend: { display: false } },
      responsive: false,
      maintainAspectRatio: false,
    },
  });

  const miniCtx = document.getElementById("miniDonut").getContext("2d");
  const miniDonutChart = new Chart(miniCtx, {
    type: "doughnut",
    data: {
      labels: ["Present", "Absent"],
      datasets: [
        {
          data: [DATA.attendance, 100 - DATA.attendance],
          backgroundColor: ["#1d4ed8", "#eef2ff"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "75%",
      plugins: { legend: { display: false } },
      responsive: false,
      maintainAspectRatio: false,
    },
  });

  const scoreCtx = document.getElementById("scoreChart").getContext("2d");
  const grad = scoreCtx.createLinearGradient(0, 0, 0, 220);
  grad.addColorStop(0, "rgba(29,78,216,0.16)");
  grad.addColorStop(1, "rgba(99,102,241,0.02)");
  const scoreLineChart = new Chart(scoreCtx, {
    type: "line",
    data: {
      labels: DATA.scoreMonthly.labels,
      datasets: [
        {
          label: "Score",
          data: DATA.scoreMonthly.data,
          borderColor: "#f97316",
          backgroundColor: grad,
          tension: 0.34,
          fill: true,
          pointRadius: 3,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  const gradeCtx = document.getElementById("gradeChart").getContext("2d");
  const gradeBarChart = new Chart(gradeCtx, {
    type: "bar",
    data: {
      labels: DATA.grade.map((g) => g.sub),
      datasets: [
        {
          data: DATA.grade.map((g) => g.val),
          backgroundColor: "#60a5fa",
          borderRadius: 8,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  function renderGradeRows() {
    const wrap = $("#gradeRows");
    wrap.innerHTML = "";
    DATA.grade.forEach((g) => {
      const r = document.createElement("div");
      r.className = "grade-row";
      r.innerHTML = `<div class="grade-label">${g.sub}</div>
                       <div class="grade-bar" aria-hidden="true"><div class="grade-fill" style="width:${g.val}%;background:linear-gradient(90deg,#c7d2fe,#60a5fa);height:100%"></div></div>
                       <div style="width:36px;text-align:right;font-weight:800">${g.val}</div>`;
      wrap.appendChild(r);
    });
  }
  renderGradeRows();

  const TODO_KEY = "banban_todos_v3";
  let todos = JSON.parse(localStorage.getItem(TODO_KEY) || "null");
  if (!Array.isArray(todos)) {
    todos = [
      { id: Date.now() + 1, text: "Finish math assignment", done: false },
      {
        id: Date.now() + 2,
        text: "Read chapter 4 — Biology",
        done: false,
      },
    ];
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }

  const todoList = $("#todoList");
  const newTodoInput = $("#newTodoInput");

  function saveTodos() {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((t) => {
      const el = document.createElement("div");
      el.className = "todo-item";
      el.innerHTML = `<input type="checkbox" data-id="${t.id}" ${
        t.done ? "checked" : ""
      }/>
                        <div class="txt" style="flex:1;color:${
                          t.done ? "#9aa4b2" : "inherit"
                        };text-decoration:${
        t.done ? "line-through" : "none"
      }">${escapeHtml(t.text)}</div>
                        <button class="btn ghost" data-del="${
                          t.id
                        }" aria-label="Delete task">Del</button>`;
      todoList.appendChild(el);
    });
  }
  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  renderTodos();

  $("#addTodoBtn").addEventListener("click", () => {
    const val = newTodoInput.value.trim();
    if (!val) return;
    todos.unshift({ id: Date.now(), text: val, done: false });
    newTodoInput.value = "";
    saveTodos();
    renderTodos();
  });
  $("#newTodoBtn").addEventListener("click", () => newTodoInput.focus());
  $("#clearDone").addEventListener("click", () => {
    todos = todos.filter((t) => !t.done);
    saveTodos();
    renderTodos();
  });

  todoList.addEventListener("click", (ev) => {
    const del = ev.target.getAttribute("data-del");
    if (del) {
      todos = todos.filter((t) => String(t.id) !== del);
      saveTodos();
      renderTodos();
      return;
    }
    if (ev.target.tagName === "INPUT" && ev.target.type === "checkbox") {
      const id = ev.target.dataset.id;
      const found = todos.find((x) => String(x.id) === id);
      if (found) {
        found.done = ev.target.checked;
        saveTodos();
        renderTodos();
      }
    }
  });

  $("#resourceFilter").addEventListener("change", (e) => {
    const val = e.target.value;
    $$("#resources .resource").forEach(
      (r) =>
        (r.style.display =
          val === "all" || r.dataset.type === val ? "flex" : "none")
    );
  });

  const calEl = $("#calendar");
  let calDate = new Date(2021, 8, 1);
  function buildCalendar(date) {
    calEl.innerHTML = "";
    $("#calMonthLabel").textContent = date.toLocaleString("default", {
      month: "long",
      year: date.getFullYear(),
    });
    const y = date.getFullYear(),
      m = date.getMonth();
    const first = new Date(y, m, 1);
    const start = (first.getDay() + 6) % 7;
    for (let i = 0; i < start; i++) {
      const blank = document.createElement("div");
      blank.className = "cal-day";
      calEl.appendChild(blank);
    }
    const days = new Date(y, m + 1, 0).getDate();
    const today = 19;
    for (let d = 1; d <= days; d++) {
      const cell = document.createElement("div");
      cell.className = "cal-day";
      cell.textContent = d;
      if (d === today) cell.classList.add("today");
      cell.addEventListener("click", () =>
        alert(`Selected: ${y}-${m + 1}-${d}`)
      );
      calEl.appendChild(cell);
    }
  }
  buildCalendar(calDate);
  $("#calPrev").addEventListener("click", () => {
    calDate = new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1);
    buildCalendar(calDate);
  });
  $("#calNext").addEventListener("click", () => {
    calDate = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1);
    buildCalendar(calDate);
  });

  $("#scoreRange").addEventListener("change", (e) => {
    const v = e.target.value;
    $("#scoreLabel").textContent = v.charAt(0).toUpperCase() + v.slice(1);
    if (v === "monthly") {
      scoreLineChart.data.labels = DATA.scoreMonthly.labels;
      scoreLineChart.data.datasets[0].data = DATA.scoreMonthly.data;
    } else {
      scoreLineChart.data.labels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ];
      scoreLineChart.data.datasets[0].data = [55, 60, 48, 72, 68, 74, 80];
    }
    scoreLineChart.update();
  });

  $("#exportCSV").addEventListener("click", () => {
    const rows = [
      ["Subject", "Grade"],
      ...DATA.grade.map((g) => [g.sub, g.val]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grades.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  $("#globalSearch").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      $$("#resources .resource").forEach((r) => (r.style.opacity = "1"));
      todoList.style.opacity = "1";
      return;
    }
    $$("#resources .resource").forEach(
      (r) =>
        (r.style.opacity = r.textContent.toLowerCase().includes(q)
          ? "1"
          : "0.3")
    );
    Array.from(todoList.children).forEach(
      (it) =>
        (it.style.opacity = it.textContent.toLowerCase().includes(q)
          ? "1"
          : "0.3")
    );
  });

  const sidebar = $("#sidebar"),
    burger = $("#btnBurger");
  burger &&
    burger.addEventListener("click", () => sidebar.classList.toggle("active"));
  document.addEventListener("click", (ev) => {
    if (window.innerWidth <= 640 && sidebar.classList.contains("active")) {
      if (!sidebar.contains(ev.target) && !burger.contains(ev.target))
        sidebar.classList.remove("active");
    }
  });

  const THEME_KEY = "banban_theme_v2";
  const themeBtn = $("#btnTheme");
  function applyTheme(mode) {
    if (mode === "dark") {
      document.documentElement.style.setProperty("--bg", "#071026");
      document.documentElement.style.setProperty("--card", "#071026");
      document.documentElement.style.setProperty("--text", "#e6eef8");
      document.documentElement.style.setProperty("--muted", "#9aa4b2");
    } else {
      document.documentElement.style.removeProperty("--bg");
      document.documentElement.style.removeProperty("--card");
      document.documentElement.style.removeProperty("--text");
      document.documentElement.style.removeProperty("--muted");
    }
    localStorage.setItem(THEME_KEY, mode);
    themeBtn.innerHTML = "";
    if (window.lucide) {
      const icon = lucide.createIcon(mode === "dark" ? "moon" : "sun", {
        width: 18,
        height: 18,
      });
      themeBtn.appendChild(icon);
    }
  }
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  themeBtn.addEventListener("click", () =>
    applyTheme(localStorage.getItem(THEME_KEY) === "dark" ? "light" : "dark")
  );

  let rt = null;
  window.addEventListener("resize", () => {
    if (rt) clearTimeout(rt);
    rt = setTimeout(() => {
      try {
        bigDonutChart.resize();
        miniDonutChart.resize();
        scoreLineChart.resize();
        gradeBarChart.resize();
      } catch (e) {}
    }, 140);
  });
});
