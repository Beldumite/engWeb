document.addEventListener("DOMContentLoaded", () => {
  const DATA = [
    {
      id: "m-alg",
      title: "Algebra I — Linear Equations",
      category: "Mathematics",
      topics: ["Equations", "Inequalities"],
      img: "https://tse2.mm.bing.net/th/id/OIP.VIB-cpTuVPeODrjd0e47IgHaFj?pid=Api&P=0&h=220/photo-1496307042754-b4aa456c4a2d?q=80&w=900&auto=format&fit=crop",
      desc: "Linear equations fundamentals and problem solving.",
    },
    {
      id: "m-geo",
      title: "Geometry — Triangles & Proofs",
      category: "Mathematics",
      topics: ["Triangles", "Proofs"],
      img: "https://tse2.mm.bing.net/th/id/OIP.5kbD6mI89dPttVvVKdg_vQHaHa?pid=Api&P=0&h=220/photo-1496307042754-b4aa456c4a2d?q=80&w=900&auto=format&fit=crop",
      desc: "Angles, triangles, and reasoning.",
    },
    {
      id: "m-calc",
      title: "Calculus — Limits & Derivatives",
      category: "Mathematics",
      topics: ["Limits", "Derivatives"],
      img: "https://tse2.mm.bing.net/th/id/OIP.VIB-cpTuVPeODrjd0e47IgHaFj?pid=Api&P=0&h=220/photo-1542744095-fcf48d80b0fd?q=80&w=900&auto=format&fit=crop",
      desc: "Intro to limits and differentiation.",
    },
    {
      id: "eng-gram",
      title: "English — Grammar Essentials",
      category: "English",
      topics: ["Tenses", "Parts of Speech"],
      img: "https://tse4.mm.bing.net/th/id/OIP.OQM5s2z8OWEToD42RZOS0gHaEK?pid=Api&P=0&h=220/photo-1515879218367-8466d910aaa4?q=80&w=900&auto=format&fit=crop",
      desc: "Core grammar for clear writing.",
    },
    {
      id: "eng-conv",
      title: "English Conversation",
      category: "English",
      topics: ["Speaking", "Listening"],
      img: "https://tse4.mm.bing.net/th/id/OIP.OQM5s2z8OWEToD42RZOS0gHaEK?pid=Api&P=0&h=220/photo-1515378791036-0648a3ef77b2?q=80&w=900&auto=format&fit=crop",
      desc: "Practice speaking and listening.",
    },
    {
      id: "sci-phy",
      title: "Physics — Mechanics",
      category: "Science",
      topics: ["Forces", "Motion"],
      img: "https://tse2.mm.bing.net/th/id/OIP.s1MOVWP12rEbT7PhxE9gfQHaDt?pid=Api&P=0&h=220/photo-1534081333815-ae5019106622?q=80&w=900&auto=format&fit=crop",
      desc: "Newtonian mechanics basics.",
    },
    {
      id: "bio-cell",
      title: "Biology — Cell Biology",
      category: "Biology",
      topics: ["Cells", "Microscopy"],
      img: "https://tse1.mm.bing.net/th/id/OIP.BRKm9TnWGaIsGIKb_UYdfQHaDt?pid=Api&P=0&h=220/photo-1559757175-5708c58c04a3?q=80&w=900&auto=format&fit=crop",
      desc: "Cells and their functions.",
    },
    {
      id: "geo-land",
      title: "Geography — Physical Landscapes",
      category: "Geography",
      topics: ["Landforms", "Maps"],
      img: "https://tse3.mm.bing.net/th/id/OIP.D0oAJdeHZIuGsRRAmg0ohwAAAA?pid=Api&P=0&h=220/photo-1501785888041-af3ef285b470?q=80&w=900&auto=format&fit=crop",
      desc: "Rivers, mountains and maps.",
    },
    {
      id: "hist-ww2",
      title: "History — World War II",
      category: "History",
      topics: ["WWII", "20th Century"],
      img: "https://tse2.mm.bing.net/th/id/OIP.Geh8AMZyrKV6wAFt9aTuGwAAAA?pid=Api&P=0&h=220/photo-1546435770-a3e426bf472b?q=80&w=900&auto=format&fit=crop",
      desc: "Causes and consequences.",
    },

    ...Array.from({ length: 26 }).map((_, i) => ({
      id: `extra-${i}`,
      title: `Extra Resource ${i + 1}`,
      category: [
        "Mathematics",
        "English",
        "Science",
        "Biology",
        "Geography",
        "History",
      ][i % 6],
      topics: ["Lesson", "Practice"],
      img: "https://img.freepik.com/premium-vector/diverse-group-students-studying-together_507704-15062.jpg?w=2000/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
      desc: `Additional material #${i + 1}`,
    })),
  ];

  const KEY_FAV = "banban:materials:favs:v1";
  const KEY_PROG = "banban:materials:prog:v1";
  const KEY_FOLLOW = "banban:materials:follow:v1";
  const KEY_PERSIST = "banban:materials:persist:v1";
  let favorites = JSON.parse(localStorage.getItem(KEY_FAV) || "[]");
  let progress = JSON.parse(localStorage.getItem(KEY_PROG) || "{}");
  let followed = JSON.parse(localStorage.getItem(KEY_FOLLOW) || "[]");
  let persistProgress = localStorage.getItem(KEY_PERSIST) === "true";

  if (!persistProgress) {
    progress = {};
    localStorage.removeItem(KEY_PROG);
  }

  const materialsList = document.getElementById("materialsList");
  const categoryTabs = document.getElementById("categoryTabs");
  const searchInput = document.getElementById("searchInput");
  const totalCountEl = document.getElementById("totalCount");
  const favCountEl = document.getElementById("favCount");
  const overallProgressEl = document.getElementById("overallProgress");
  const favoritesListEl = document.getElementById("favoritesList");
  const catCountEl = document.getElementById("catCount");
  const followedCountEl = document.getElementById("followedCount");
  const avgCompEl = document.getElementById("avgComp");
  const persistToggle = document.getElementById("persistToggle");
  const resetBtn = document.getElementById("resetBtn");
  const sortBtn = document.getElementById("sortBtn");
  const favPanelBtn = document.getElementById("favPanelBtn");
  const clearFavsBtn = document.getElementById("clearFavs");
  const openFavBtn = document.getElementById("openFav");
  const markAllDoneBtn = document.getElementById("markAllDone");
  const logoutBtn = document.getElementById("logoutBtn");
  const burgerBtn = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");

  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  const modalName = document.getElementById("modalName");
  const modalCat = document.getElementById("modalCat");
  const modalDesc = document.getElementById("modalDesc");
  const modalFavBtn = document.getElementById("modalFavBtn");
  const modalFollowBtn = document.getElementById("modalFollowBtn");
  const modalFill = document.getElementById("modalFill");
  const modalPct = document.getElementById("modalPct");
  const incProgressBtn = document.getElementById("incProgress");
  const setDoneBtn = document.getElementById("setDone");
  const downloadCertBtn = document.getElementById("downloadCert");
  const modalCloseBtn = document.getElementById("modalClose");
  const confettiWrap = document.getElementById("confettiWrap");

  let activeCategory = "All";
  let sortAZ = true;
  let currentModalId = null;

  function saveFavs() {
    localStorage.setItem(KEY_FAV, JSON.stringify(favorites));
  }
  function saveProg() {
    localStorage.setItem(KEY_PROG, JSON.stringify(progress));
  }
  function saveFollowed() {
    localStorage.setItem(KEY_FOLLOW, JSON.stringify(followed));
  }
  function savePersist() {
    localStorage.setItem(KEY_PERSIST, persistProgress ? "true" : "false");
  }
  function isFav(id) {
    return favorites.includes(id);
  }
  function isFollowed(id) {
    return followed.includes(id);
  }
  function getProgress(id) {
    return progress[id] || 0;
  }
  function clamp(v) {
    return Math.max(0, Math.min(100, Math.round(v)));
  }

  function renderCategoryTabs() {
    const cats = [
      "All",
      ...Array.from(new Set(DATA.map((d) => d.category))).sort(),
    ];
    categoryTabs.innerHTML = "";
    cats.forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "tab" + (c === activeCategory ? " active" : "");
      btn.textContent = c;
      btn.addEventListener("click", () => {
        activeCategory = c;
        renderAll();
      });
      categoryTabs.appendChild(btn);
    });
  }

  function createCard(item) {
    const root = document.createElement("div");
    root.className = "card";
    root.tabIndex = 0;
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;
    img.loading = "lazy";
    img.onerror = () => {
      img.style.objectFit = "contain";
      img.style.opacity = ".7";
    };
    thumb.appendChild(img);
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.title;
    const cat = document.createElement("div");
    cat.className = "cat";
    cat.textContent = item.category;
    const topics = document.createElement("div");
    topics.className = "topics";
    (item.topics || []).slice(0, 4).forEach((t) => {
      const tk = document.createElement("div");
      tk.className = "topic";
      tk.textContent = t;
      topics.appendChild(tk);
    });
    const actions = document.createElement("div");
    actions.className = "card-actions";
    const favBtn = document.createElement("button");
    favBtn.className = "favorite";
    favBtn.textContent = isFav(item.id) ? "★ Favorite" : "☆ Favorite";
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(item.id);
      updateUI();
    });
    const detBtn = document.createElement("button");
    detBtn.className = "detail-btn";
    detBtn.textContent = "Detail";
    detBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(item.id);
    });
    actions.appendChild(favBtn);
    actions.appendChild(detBtn);
    const progressRow = document.createElement("div");
    progressRow.className = "progress-row";
    const bar = document.createElement("div");
    bar.className = "progress-bar";
    const fill = document.createElement("div");
    fill.className = "fill";
    fill.style.width = getProgress(item.id) + "%";
    bar.appendChild(fill);
    const pct = document.createElement("div");
    pct.className = "progress-num";
    pct.textContent = getProgress(item.id) + "%";
    progressRow.appendChild(bar);
    progressRow.appendChild(pct);
    root.appendChild(thumb);
    root.appendChild(title);
    root.appendChild(cat);
    root.appendChild(topics);
    root.appendChild(actions);
    root.appendChild(progressRow);

    root.addEventListener("click", () => openModal(item.id));
    root.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item.id);
      }
    });
    return root;
  }
  function getFilteredSorted() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const list = DATA.filter((d) => {
      if (activeCategory !== "All" && d.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        (d.topics || []).join(" ").toLowerCase().includes(q) ||
        (d.desc || "").toLowerCase().includes(q)
      );
    });
    list.sort((a, b) =>
      sortAZ ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    return list;
  }
  function renderMaterials() {
    const arr = getFilteredSorted();
    materialsList.innerHTML = "";
    if (arr.length === 0) {
      materialsList.innerHTML =
        '<div style="padding:20px;color:var(--muted)">No materials found.</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    arr.forEach((item) => frag.appendChild(createCard(item)));
    materialsList.appendChild(frag);
  }

  function renderFavoritesPanel() {
    favoritesListEl.innerHTML = "";
    if (!favorites.length) {
      favoritesListEl.innerHTML =
        '<div style="color:var(--muted)">No favorites yet.</div>';
      return;
    }

    const grouped = {};
    favorites.forEach((id) => {
      const m = DATA.find((x) => x.id === id);
      if (!m) return;
      (grouped[m.category] = grouped[m.category] || []).push(m);
    });
    Object.keys(grouped)
      .sort()
      .forEach((cat) => {
        const header = document.createElement("div");
        header.style.fontWeight = "800";
        header.style.marginTop = "6px";
        header.textContent = cat;
        favoritesListEl.appendChild(header);
        grouped[cat].forEach((m) => {
          const row = document.createElement("div");
          row.className = "fav-item";
          const i = document.createElement("img");
          i.src = m.img;
          i.alt = m.title;
          i.loading = "lazy";
          i.style.width = "44px";
          i.style.height = "44px";
          i.style.borderRadius = "8px";
          const info = document.createElement("div");
          info.style.flex = "1";
          const t = document.createElement("div");
          t.style.fontWeight = "700";
          t.textContent = m.title;
          const s = document.createElement("div");
          s.style.color = "var(--muted)";
          s.textContent = (getProgress(m.id) || 0) + "% completed";
          info.appendChild(t);
          info.appendChild(s);
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.textContent = "Open";
          btn.addEventListener("click", () => openModal(m.id));
          row.appendChild(i);
          row.appendChild(info);
          row.appendChild(btn);
          favoritesListEl.appendChild(row);
        });
      });
  }

  function renderInsights() {
    totalCountEl.textContent = DATA.length;
    favCountEl.textContent = favorites.length;
    const categories = Array.from(new Set(DATA.map((d) => d.category)));
    catCountEl.textContent = categories.length;
    followedCountEl.textContent = followed.length;

    const base = followed.length ? followed : DATA.map((d) => d.id);
    const avg = base.length
      ? Math.round(
          base.reduce((s, id) => s + (progress[id] || 0), 0) / base.length
        )
      : 0;
    overallProgressEl.textContent = avg + "%";
    avgCompEl.textContent = avg + "%";
  }

  function toggleFavorite(id) {
    if (isFav(id)) favorites = favorites.filter((x) => x !== id);
    else favorites.push(id);
    saveFavs();
  }
  function toggleFollow(id) {
    if (isFollowed(id)) followed = followed.filter((x) => x !== id);
    else followed.push(id);
    saveFollowed();
  }
  function incProgress(id, step = 10) {
    progress[id] = clamp((progress[id] || 0) + step);
    if (persistProgress) saveProg();
  }
  function setProgress(id, value) {
    progress[id] = clamp(value);
    if (persistProgress) saveProg();
  }
  function resetProgressAll() {
    progress = {};
    if (persistProgress) saveProg();
  }
  function clearFavorites() {
    favorites = [];
    saveFavs();
  }
  function logoutClear() {
    if (
      !confirm("Logout will clear favorites, follows, and progress. Continue?")
    )
      return;
    favorites = [];
    followed = [];
    progress = {};
    persistProgress = false;
    saveFavs();
    saveFollowed();
    localStorage.removeItem(KEY_PROG);
    localStorage.removeItem(KEY_PERSIST);
    persistToggle.checked = false;
  }

  function openModal(id) {
    currentModalId = id;
    const item = DATA.find((x) => x.id === id);
    if (!item) return;
    modalTitle.textContent = item.title;
    modalImg.src = item.img;
    modalName.textContent = item.title;
    modalCat.textContent = item.category;
    modalDesc.textContent = item.desc || "";
    modalFavBtn.textContent = isFav(id) ? "Unfavorite" : "Favorite";
    modalFollowBtn.textContent = isFollowed(id) ? "Unfollow" : "Follow";
    modalFill.style.width = (progress[id] || 0) + "%";
    modalPct.textContent = (progress[id] || 0) + "%";
    downloadCertBtn.style.display =
      progress[id] === 100 ? "inline-flex" : "none";
    modalBackdrop.style.display = "flex";
    modalBackdrop.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modalBackdrop.style.display = "none";
    modalBackdrop.setAttribute("aria-hidden", "true");
    currentModalId = null;
  }
  modalCloseBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  modalFavBtn.addEventListener("click", () => {
    if (!currentModalId) return;
    toggleFavorite(currentModalId);
    modalFavBtn.textContent = isFav(currentModalId) ? "Unfavorite" : "Favorite";
    updateUI();
  });
  modalFollowBtn.addEventListener("click", () => {
    if (!currentModalId) return;
    toggleFollow(currentModalId);
    modalFollowBtn.textContent = isFollowed(currentModalId)
      ? "Unfollow"
      : "Follow";
    updateUI();
  });
  incProgressBtn.addEventListener("click", () => {
    if (!currentModalId) return;
    incProgress(currentModalId, 10);
    modalFill.style.width = (progress[currentModalId] || 0) + "%";
    modalPct.textContent = (progress[currentModalId] || 0) + "%";
    if (progress[currentModalId] === 100) {
      spawnConfetti(22);
      downloadCertBtn.style.display = "inline-flex";
    }
    updateUI();
  });
  setDoneBtn.addEventListener("click", () => {
    if (!currentModalId) return;
    setProgress(currentModalId, 100);
    modalFill.style.width = "100%";
    modalPct.textContent = "100%";
    spawnConfetti(28);
    downloadCertBtn.style.display = "inline-flex";
    updateUI();
  });
  downloadCertBtn.addEventListener("click", () => {
    if (!currentModalId) return;
    const item = DATA.find((x) => x.id === currentModalId);
    if (item) downloadCertificate(item);
  });

  function spawnConfetti(amount = 12) {
    const emojis = ["🎉", "✨", "🏆", "🎈", "🥳"];
    for (let i = 0; i < amount; i++) {
      const n = document.createElement("div");
      n.className = "confetti";
      n.style.left = Math.random() * 100 + "vw";
      n.style.top = -10 - Math.random() * 20 + "vh";
      n.style.fontSize = 12 + Math.random() * 28 + "px";
      n.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confettiWrap.appendChild(n);
      setTimeout(() => n.remove(), 1700 + Math.random() * 800);
    }
  }
  function downloadCertificate(item) {
    const c = document.createElement("canvas");
    c.width = 1000;
    c.height = 700;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#071433";
    ctx.font = "bold 36px Arial";
    ctx.fillText("Certificate of Completion", 60, 120);
    ctx.font = "600 20px Arial";
    ctx.fillStyle = "#374151";
    ctx.fillText("This certifies that", 60, 180);
    ctx.font = "800 40px Arial";
    ctx.fillStyle = "#0b67b2";
    ctx.fillText(item.title || "Participant", 60, 240);
    ctx.font = "600 18px Arial";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(`has completed the material "${item.title || ""}"`, 60, 290);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = (item.title || "certificate").replace(/\s+/g, "_") + ".png";
    a.click();
  }

  function toggleFavorite(id) {
    if (isFav(id)) favorites = favorites.filter((x) => x !== id);
    else favorites.push(id);
    saveFavs();
  }
  function toggleFollow(id) {
    if (isFollowed(id)) followed = followed.filter((x) => x !== id);
    else followed.push(id);
    saveFollowed();
  }
  function updateUI() {
    renderMaterials();
    renderFavoritesPanel();
    renderInsights();
  }

  searchInput.addEventListener("input", () => updateUI());
  sortBtn.addEventListener("click", () => {
    sortAZ = !sortAZ;
    sortBtn.textContent = sortAZ ? "Sort A→Z" : "Sort Z→A";
    updateUI();
  });
  persistToggle.checked = persistProgress;
  persistToggle.addEventListener("change", () => {
    persistProgress = persistToggle.checked;
    savePersist();
    if (!persistProgress) {
      progress = {};
      localStorage.removeItem(KEY_PROG);
    } else saveProg();
    updateUI();
  });
  resetBtn.addEventListener("click", () => {
    if (!confirm("Reset all progress?")) return;
    resetProgressAll();
    updateUI();
  });
  clearFavsBtn.addEventListener("click", () => {
    if (!confirm("Clear all favorites?")) return;
    clearFavorites();
    updateUI();
  });
  openFavBtn.addEventListener("click", () => {
    if (favorites.length) openModal(favorites[0]);
    else alert("No favorites yet.");
  });
  markAllDoneBtn.addEventListener("click", () => {
    if (!followed.length) {
      alert("No followed materials");
      return;
    }
    if (!confirm("Mark all followed materials as 100% complete?")) return;
    followed.forEach((id) => (progress[id] = 100));
    if (persistProgress) saveProg();
    spawnConfetti(36);
    updateUI();
  });
  logoutBtn.addEventListener("click", () => logoutClear());

  burgerBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

  document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  function renderMaterials() {
    const list = getFilteredSorted();
    materialsList.innerHTML = "";
    if (list.length === 0) {
      materialsList.innerHTML =
        '<div style="padding:20px;color:var(--muted)">No materials found.</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((item) => frag.appendChild(createCard(item)));
    materialsList.appendChild(frag);
  }
  function createCard(item) {
    const node = document.createElement("div");
    node.className = "card";
    node.tabIndex = 0;
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;
    img.loading = "lazy";
    img.onerror = () => {
      img.style.objectFit = "contain";
      img.style.opacity = ".7";
    };
    thumb.appendChild(img);
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.title;
    const cat = document.createElement("div");
    cat.className = "cat";
    cat.textContent = item.category;
    const topics = document.createElement("div");
    topics.className = "topics";
    (item.topics || []).slice(0, 4).forEach((t) => {
      const tk = document.createElement("div");
      tk.className = "topic";
      tk.textContent = t;
      topics.appendChild(tk);
    });
    const actions = document.createElement("div");
    actions.className = "card-actions";
    const fav = document.createElement("button");
    fav.className = "favorite";
    fav.textContent = isFav(item.id) ? "★ Favorite" : "☆ Favorite";
    fav.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(item.id);
      updateUI();
    });
    const det = document.createElement("button");
    det.className = "detail-btn";
    det.textContent = "Detail";
    det.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(item.id);
    });
    actions.appendChild(fav);
    actions.appendChild(det);
    const progressRow = document.createElement("div");
    progressRow.className = "progress-row";
    const bar = document.createElement("div");
    bar.className = "progress-bar";
    const fill = document.createElement("div");
    fill.className = "fill";
    fill.style.width = (progress[item.id] || 0) + "%";
    bar.appendChild(fill);
    const pct = document.createElement("div");
    pct.className = "progress-num";
    pct.textContent = (progress[item.id] || 0) + "%";
    progressRow.appendChild(bar);
    progressRow.appendChild(pct);
    node.appendChild(thumb);
    node.appendChild(title);
    node.appendChild(cat);
    node.appendChild(topics);
    node.appendChild(actions);
    node.appendChild(progressRow);
    node.addEventListener("click", () => openModal(item.id));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item.id);
      }
    });
    return node;
  }
  function getFilteredSorted() {
    const q = (searchInput.value || "").trim().toLowerCase();
    let filtered = DATA.filter((d) => {
      if (activeCategory !== "All" && d.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        (d.topics || []).join(" ").toLowerCase().includes(q) ||
        (d.desc || "").toLowerCase().includes(q)
      );
    });
    filtered.sort((a, b) =>
      sortAZ ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    return filtered;
  }
  function renderCategoryTabsAndInit() {
    const cats = [
      "All",
      ...Array.from(new Set(DATA.map((d) => d.category))).sort(),
    ];
    categoryTabs.innerHTML = "";
    cats.forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "tab" + (c === activeCategory ? " active" : "");
      btn.textContent = c;
      btn.addEventListener("click", () => {
        activeCategory = c;
        renderAll();
      });
      categoryTabs.appendChild(btn);
    });
  }
  function renderFavoritesPanel() {
    favoritesListEl.innerHTML = "";
    if (!favorites.length) {
      favoritesListEl.innerHTML =
        '<div style="color:var(--muted)">No favorites yet.</div>';
      return;
    }
    const grouped = {};
    favorites.forEach((id) => {
      const m = DATA.find((x) => x.id === id);
      if (!m) return;
      (grouped[m.category] = grouped[m.category] || []).push(m);
    });
    Object.keys(grouped)
      .sort()
      .forEach((cat) => {
        const heading = document.createElement("div");
        heading.style.fontWeight = "800";
        heading.style.marginTop = "6px";
        heading.textContent = cat;
        favoritesListEl.appendChild(heading);
        grouped[cat].forEach((m) => {
          const row = document.createElement("div");
          row.className = "fav-item";
          const img = document.createElement("img");
          img.src = m.img;
          img.alt = m.title;
          img.loading = "lazy";
          img.style.width = "44px";
          img.style.height = "44px";
          img.style.borderRadius = "8px";
          const info = document.createElement("div");
          info.style.flex = "1";
          const t = document.createElement("div");
          t.style.fontWeight = "700";
          t.textContent = m.title;
          const sub = document.createElement("div");
          sub.style.color = "var(--muted)";
          sub.textContent = (progress[m.id] || 0) + "% completed";
          info.appendChild(t);
          info.appendChild(sub);
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.textContent = "Open";
          btn.addEventListener("click", () => openModal(m.id));
          row.appendChild(img);
          row.appendChild(info);
          row.appendChild(btn);
          favoritesListEl.appendChild(row);
        });
      });
  }
  function renderInsights() {
    totalCountEl.textContent = DATA.length;
    favCountEl.textContent = favorites.length;
    catCountEl.textContent = Array.from(
      new Set(DATA.map((d) => d.category))
    ).length;
    followedCountEl.textContent = followed.length;
    const base = followed.length ? followed : DATA.map((d) => d.id);
    const avg = base.length
      ? Math.round(
          base.reduce((s, id) => s + (progress[id] || 0), 0) / base.length
        )
      : 0;
    overallProgressEl.textContent = avg + "%";
    avgCompEl.textContent = avg + "%";
  }

  function renderAll() {
    renderCategoryTabsAndInit();
    renderMaterials();
    renderFavoritesPanel();
    renderInsights();
  }

  renderAll();

  sortBtn.addEventListener("click", () => {
    sortAZ = !sortAZ;
    sortBtn.textContent = sortAZ ? "Sort A→Z" : "Sort Z→A";
    renderAll();
  });
  searchInput.addEventListener("input", () => renderAll());
  resetBtn.addEventListener("click", () => {
    if (confirm("Reset all progress?")) {
      resetProgressAll();
      if (persistProgress) saveProg();
      renderAll();
    }
  });
  clearFavsBtn.addEventListener("click", () => {
    if (confirm("Clear favorites?")) {
      clearFavorites();
      renderAll();
    }
  });
  openFavBtn.addEventListener("click", () => {
    if (favorites.length) openModal(favorites[0]);
    else alert("No favorites");
  });
  markAllDoneBtn.addEventListener("click", () => {
    if (!followed.length) {
      alert("No followed");
      return;
    }
    if (!confirm("Mark all followed as 100%?")) return;
    followed.forEach((id) => (progress[id] = 100));
    if (persistProgress) saveProg();
    spawnConfetti(30);
    renderAll();
  });
  favPanelBtn.addEventListener("click", () =>
    favoritesListEl.scrollIntoView({ behavior: "smooth", block: "center" })
  );
  logoutBtn.addEventListener("click", () => logoutClear());
  persistToggle.checked = persistProgress;
  persistToggle.addEventListener("change", () => {
    persistProgress = persistToggle.checked;
    savePersist();
    if (!persistProgress) {
      progress = {};
      localStorage.removeItem(KEY_PROG);
    } else saveProg();
    renderAll();
  });

  burgerBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

  document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  function getFilteredSorted() {
    return getFilteredSortedFn();
  }
  function getFilteredSortedFn() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const list = DATA.filter((d) => {
      if (activeCategory !== "All" && d.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        (d.topics || []).join(" ").toLowerCase().includes(q) ||
        (d.desc || "").toLowerCase().includes(q)
      );
    });
    list.sort((a, b) =>
      sortAZ ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    return list;
  }

  function spawnConfetti(n = 12) {
    const icons = ["🎉", "✨", "🏆", "🎈", "🥳"];
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.top = -20 - Math.random() * 20 + "vh";
      el.style.fontSize = 12 + Math.random() * 28 + "px";
      confettiWrap.appendChild(el);
      setTimeout(() => el.remove(), 1800 + Math.random() * 800);
    }
  }
  function downloadCertificate(item) {
    const c = document.createElement("canvas");
    c.width = 1000;
    c.height = 700;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#071433";
    ctx.font = "bold 36px Arial";
    ctx.fillText("Certificate of Completion", 60, 120);
    ctx.font = "600 20px Arial";
    ctx.fillStyle = "#374151";
    ctx.fillText("This certifies that", 60, 180);
    ctx.font = "800 40px Arial";
    ctx.fillStyle = "#0b67b2";
    ctx.fillText(item.title || "Participant", 60, 240);
    ctx.font = "600 18px Arial";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(`has completed the material "${item.title}"`, 60, 290);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = (item.title || "certificate").replace(/\s+/g, "_") + ".png";
    a.click();
  }

  setInterval(() => {
    document.querySelectorAll(".fill").forEach((el) => {
      const pctTextEl = el.parentElement.nextElementSibling;
      const card = el.closest(".card");
    });
  }, 2500);

  window.renderMaterialsUI = renderAll;
});
