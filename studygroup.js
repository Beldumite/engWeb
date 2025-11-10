(() => {
  const GROUPS_KEY = "banban_groups_v1";
  const JOINED_KEY = "banban_joined_v1";
  const FAV_KEY = "banban_group_favs_v1";

  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  const tabs = document.querySelectorAll(".tab");
  const groupsContainer = document.getElementById("groupsContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");
  const totalCount = document.getElementById("totalCount");
  const favoritesToggle = document.getElementById("favoritesToggle");
  const favoritesList = document.getElementById("favoritesList");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");
  const emptyState = document.getElementById("emptyState");
  const loadMoreBtn = document.getElementById("loadMore");
  const clearDataBtn = document.getElementById("clearData");
  const viewMyJoinedBtn = document.getElementById("viewMyJoined");

  const baseGroups = [
    {
      id: "g-python-1",
      title: "Python Programming",
      category: "Programming",
      desc: "Learning about coding with Python",
      members: 9,
      capacity: 12,
      img: "https://images.unsplash.com/photo-1526378729521-9ff7f5c1a4a6?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "g-python-2",
      title: "Python Intermediate",
      category: "Programming",
      desc: "Intermediate problems & projects",
      members: 12,
      capacity: 20,
      img: "https://images.unsplash.com/photo-1508873699372-7ae6e3b4d5b7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "g-kotlin",
      title: "Kotlin Programming",
      category: "Programming",
      desc: "Learning about coding with Kotlin",
      members: 7,
      capacity: 15,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "g-history-1",
      title: "World History",
      category: "History",
      desc: "Discussing major historical events",
      members: 18,
      capacity: 30,
      img: "https://images.unsplash.com/photo-1526318472351-c75fcf07051b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "g-math-1",
      title: "Mathematics Club",
      category: "Mathematics",
      desc: "Puzzles, contests, and study sessions",
      members: 14,
      capacity: 25,
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "g-english-1",
      title: "English Conversation",
      category: "English",
      desc: "Improve speaking & listening",
      members: 10,
      capacity: 20,
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
    },
  ];

  function loadGroups() {
    const raw = localStorage.getItem(GROUPS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn("invalid groups in storage");
      }
    }
    localStorage.setItem(GROUPS_KEY, JSON.stringify(baseGroups));
    return baseGroups.slice();
  }
  let groups = loadGroups();
  let joined = JSON.parse(localStorage.getItem(JOINED_KEY) || "[]");
  let favs = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");

  let activeTab = "discover";
  let showingFavoritesOnly = false;
  let pageSize = 9;
  let page = 1;

  function persistJoined() {
    localStorage.setItem(JOINED_KEY, JSON.stringify(joined));
  }
  function persistFavs() {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }
  function persistGroups() {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  }

  function isJoined(id) {
    return joined.includes(id);
  }
  function isFav(id) {
    return favs.includes(id);
  }

  function toggleJoin(id) {
    if (isJoined(id)) {
      joined = joined.filter((x) => x !== id);
    } else {
      joined.push(id);
    }
    persistJoined();
    render();
  }

  function toggleFav(id) {
    if (isFav(id)) favs = favs.filter((x) => x !== id);
    else favs.push(id);
    persistFavs();
    renderFavorites();
    render();
  }

  function renderCategories() {
    const cats = Array.from(new Set(groups.map((g) => g.category))).sort();
    categoryFilter.innerHTML = '<option value="all">All categories</option>';
    cats.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoryFilter.appendChild(opt);
    });
  }

  function renderFavorites() {
    favoritesList.innerHTML = "";
    if (!favs.length) {
      favoritesList.innerHTML =
        '<div class="muted">No favorites yet. Click the ☆ on a group to favorite it.</div>';
      return;
    }
    const grouped = {};
    favs.forEach((id) => {
      const g = groups.find((x) => x.id === id);
      if (!g) return;
      grouped[g.category] = grouped[g.category] || [];
      grouped[g.category].push(g);
    });
    Object.keys(grouped)
      .sort()
      .forEach((cat) => {
        const title = document.createElement("div");
        title.style.fontWeight = "800";
        title.style.marginTop = "6px";
        title.textContent = cat;
        favoritesList.appendChild(title);
        grouped[cat].forEach((g) => {
          const item = document.createElement("div");
          item.className = "fav-item";
          const img = document.createElement("img");
          img.src = g.img;
          img.alt = g.title;
          const info = document.createElement("div");
          info.style.flex = "1";
          const t = document.createElement("div");
          t.style.fontWeight = "700";
          t.textContent = g.title;
          const s = document.createElement("div");
          s.className = "muted";
          s.textContent = `${g.members}/${g.capacity} members`;
          info.appendChild(t);
          info.appendChild(s);
          const openBtn = document.createElement("button");
          openBtn.className = "btn ghost";
          openBtn.textContent = "Open";
          openBtn.addEventListener("click", () => openGroupModal(g.id));
          item.appendChild(img);
          item.appendChild(info);
          item.appendChild(openBtn);
          favoritesList.appendChild(item);
        });
      });
  }

  function getFilteredSorted() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const cat = categoryFilter.value || "all";
    let list = groups.filter((g) => {
      if (showingFavoritesOnly && !isFav(g.id)) return false;
      if (activeTab === "my" && !isJoined(g.id)) return false;
      if (activeTab === "discover" || activeTab === "my") {
        const matchQ =
          !q ||
          g.title.toLowerCase().includes(q) ||
          g.desc.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q);
        const matchCat = cat === "all" || g.category === cat;
        return matchQ && matchCat;
      }

      return true;
    });

    // sort
    const mode = sortSelect.value || "az";
    if (mode === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (mode === "za") list.sort((a, b) => b.title.localeCompare(a.title));
    else if (mode === "members") list.sort((a, b) => b.members - a.members);

    return list;
  }

  function renderGroups() {
    groupsContainer.innerHTML = "";
    const list = getFilteredSorted();
    totalCount.textContent = list.length;

    if (activeTab === "create") {
      groupsContainer.innerHTML =
        '<div class="empty"><p>Use the create form to add a new group.</p></div>';
      return;
    }

    if (!list.length) {
      emptyState.hidden = false;
      loadMoreBtn.style.display = "none";
      return;
    } else {
      emptyState.hidden = true;
    }

    const start = 0;
    const end = page * pageSize;
    const subset = list.slice(start, end);
    subset.forEach((g) => {
      const card = document.createElement("div");
      card.className = "group-card";
      const favBtn = document.createElement("button");
      favBtn.className = "fav-toggle";
      favBtn.title = "Favorite";
      favBtn.textContent = isFav(g.id) ? "★" : "☆";
      favBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        toggleFav(g.id);
        favBtn.textContent = isFav(g.id) ? "★" : "☆";
      });

      const header = document.createElement("div");
      header.className = "card-header";
      const img = document.createElement("img");
      img.src = g.img;
      img.alt = g.title;
      header.appendChild(img);
      const h = document.createElement("div");
      const title = document.createElement("h2");
      title.textContent = g.title;
      const desc = document.createElement("p");
      desc.textContent = g.desc;
      desc.className = "muted";
      h.appendChild(title);
      h.appendChild(desc);
      header.appendChild(h);
      card.appendChild(header);

      const members = document.createElement("div");
      members.className = "members";
      members.textContent = `${g.members}/${g.capacity} members`;
      card.appendChild(members);

      const joinBtn = document.createElement("button");
      joinBtn.className = "join-btn";
      joinBtn.textContent = isJoined(g.id) ? "Joined" : "Join";
      if (isJoined(g.id)) joinBtn.classList.add("joined");
      joinBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        toggleJoin(g.id);

        const grp = groups.find((x) => x.id === g.id);
        if (isJoined(g.id)) {
          grp.members = Math.min(grp.capacity, grp.members + 1);
        } else {
          grp.members = Math.max(0, grp.members - 1);
        }
        persistGroups();
        render();
      });
      card.appendChild(joinBtn);

      card.addEventListener("click", () => openGroupModal(g.id));
      card.appendChild(favBtn);
      groupsContainer.appendChild(card);
    });

    if (list.length > subset.length) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }

  function openGroupModal(id) {
    const g = groups.find((x) => x.id === id);
    const container = document.createElement("div");
    if (!g) {
      container.innerHTML = '<p class="muted">Group not found.</p>';
    } else {
      const title = document.createElement("h4");
      title.textContent = g.title;
      const cat = document.createElement("div");
      cat.className = "muted";
      cat.textContent = g.category;
      const desc = document.createElement("p");
      desc.textContent = g.desc;
      const members = document.createElement("p");
      members.textContent = `${g.members}/${g.capacity} members`;
      const actions = document.createElement("div");
      actions.style.display = "flex";
      actions.style.gap = "8px";
      actions.style.marginTop = "12px";
      const favBtn = document.createElement("button");
      favBtn.className = "btn ghost";
      favBtn.textContent = isFav(g.id) ? "Unfavorite" : "Favorite";
      favBtn.addEventListener("click", () => {
        toggleFav(g.id);
        favBtn.textContent = isFav(g.id) ? "Unfavorite" : "Favorite";
        renderGroups();
        renderFavorites();
      });
      const joinBtn = document.createElement("button");
      joinBtn.className = "btn primary";
      joinBtn.textContent = isJoined(g.id) ? "Leave" : "Join";
      joinBtn.addEventListener("click", () => {
        toggleJoin(g.id);
        joinBtn.textContent = isJoined(g.id) ? "Leave" : "Join";
        renderGroups();
        renderFavorites();
        modalBackdrop.style.display = "none";
      });

      actions.appendChild(favBtn);
      actions.appendChild(joinBtn);

      container.appendChild(title);
      container.appendChild(cat);
      container.appendChild(desc);
      container.appendChild(members);
      container.appendChild(actions);
    }
    modalBody.innerHTML = "";
    modalBody.appendChild(container);
    modalBackdrop.style.display = "flex";
    modalBackdrop.setAttribute("aria-hidden", "false");
  }

  function showCreateForm() {
    const form = document.createElement("form");
    form.innerHTML = `
      <label style="display:block;margin-bottom:8px"><strong>Title</strong><input type="text" id="newTitle" required placeholder="Group title" style="width:100%;padding:8px;margin-top:6px;border-radius:8px;border:1px solid #ddd"></label>
      <label style="display:block;margin-bottom:8px"><strong>Category</strong><input type="text" id="newCategory" required placeholder="e.g. Programming" style="width:100%;padding:8px;margin-top:6px;border-radius:8px;border:1px solid #ddd"></label>
      <label style="display:block;margin-bottom:8px"><strong>Description</strong><textarea id="newDesc" placeholder="Short description" style="width:100%;padding:8px;margin-top:6px;border-radius:8px;border:1px solid #ddd"></textarea></label>
      <div style="display:flex;gap:8px"><button type="submit" class="btn primary">Create</button><button type="button" id="cancelCreate" class="btn ghost">Cancel</button></div>
    `;
    modalBody.innerHTML = "";
    modalBody.appendChild(form);
    modalBackdrop.style.display = "flex";
    modalBackdrop.setAttribute("aria-hidden", "false");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("newTitle").value.trim();
      const cat = document.getElementById("newCategory").value.trim();
      const desc = document.getElementById("newDesc").value.trim();
      if (!title || !cat) {
        alert("Please fill title and category");
        return;
      }
      const newGroup = {
        id: "g-" + Math.random().toString(36).slice(2, 9),
        title,
        category: cat,
        desc,
        members: 1,
        capacity: 30,
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      };
      groups.unshift(newGroup);
      persistGroups();

      joined.push(newGroup.id);
      persistJoined();
      alert("Group created and you were added as member.");
      modalBackdrop.style.display = "none";

      setActiveTab("discover");
      page = 1;
      render();
    });

    document.getElementById("cancelCreate").addEventListener("click", () => {
      modalBackdrop.style.display = "none";
    });
  }

  function setActiveTab(tabName) {
    activeTab = tabName;
    tabs.forEach((t) =>
      t.classList.toggle("active", t.dataset.tab === tabName)
    );

    if (tabName === "create") {
      showCreateForm();
    } else {
      modalBackdrop.style.display = "none";
    }
    page = 1;
    render();
  }

  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      setActiveTab(t.dataset.tab);
    });
  });

  loadMoreBtn.addEventListener("click", () => {
    page++;
    renderGroups();
  });

  searchInput.addEventListener("input", () => {
    page = 1;
    render();
  });
  categoryFilter.addEventListener("change", () => {
    page = 1;
    render();
  });
  sortSelect.addEventListener("change", () => {
    page = 1;
    render();
  });

  favoritesToggle.addEventListener("click", () => {
    showingFavoritesOnly = !showingFavoritesOnly;
    favoritesToggle.classList.toggle("active", showingFavoritesOnly);
    favoritesToggle.textContent = showingFavoritesOnly
      ? "Favorites ▼"
      : "Favorites";
    page = 1;
    render();
  });

  clearDataBtn.addEventListener("click", () => {
    if (!confirm("Clear joined groups, favorites, and any groups you created?"))
      return;
    joined = [];
    favs = [];
    groups = baseGroups.slice();
    persistJoined();
    persistFavs();
    persistGroups();
    setActiveTab("discover");
    page = 1;
    render();
  });

  viewMyJoinedBtn.addEventListener("click", () => {
    setActiveTab("my");

    groupsContainer.scrollIntoView({ behavior: "smooth" });
  });

  modalClose.addEventListener("click", () => {
    modalBackdrop.style.display = "none";
    modalBackdrop.setAttribute("aria-hidden", "true");
  });

  burger.addEventListener("click", () => sidebar.classList.toggle("open"));

  function render() {
    renderCategories();
    renderGroups();
    renderFavorites();
  }

  function renderGroups() {
    groupsContainer.innerHTML = "";
    const list = getFilteredSorted();
    totalCount.textContent = list.length;

    if (activeTab === "create") {
      groupsContainer.innerHTML =
        '<div class="empty"><p>Use the "Create Group" tab to add a new group.</p></div>';
      return;
    }

    if (list.length === 0) {
      emptyState.hidden = false;
      loadMoreBtn.style.display = "none";
      return;
    } else {
      emptyState.hidden = true;
    }

    const start = 0;
    const end = page * pageSize;
    const subset = list.slice(start, end);
    subset.forEach((g) => {
      const card = document.createElement("div");
      card.className = "group-card";
      card.tabIndex = 0;

      const favBtn = document.createElement("button");
      favBtn.className = "fav-toggle";
      favBtn.title = "Favorite";
      favBtn.textContent = isFav(g.id) ? "★" : "☆";
      favBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        toggleFav(g.id);
        favBtn.textContent = isFav(g.id) ? "★" : "☆";
      });

      const header = document.createElement("div");
      header.className = "card-header";
      const img = document.createElement("img");
      img.src = g.img;
      img.alt = g.title;
      header.appendChild(img);
      const headTxt = document.createElement("div");
      const title = document.createElement("h2");
      title.textContent = g.title;
      const desc = document.createElement("p");
      desc.className = "muted";
      desc.textContent = g.desc;
      headTxt.appendChild(title);
      headTxt.appendChild(desc);
      header.appendChild(headTxt);

      const members = document.createElement("div");
      members.className = "members";
      members.textContent = `${g.members}/${g.capacity} members`;
      const joinBtn = document.createElement("button");
      joinBtn.className = "join-btn";
      joinBtn.textContent = isJoined(g.id) ? "Joined" : "Join";
      if (isJoined(g.id)) joinBtn.classList.add("joined");

      joinBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        toggleJoin(g.id);

        const groupRef = groups.find((x) => x.id === g.id);
        if (isJoined(g.id)) {
          groupRef.members = Math.min(groupRef.capacity, groupRef.members + 1);
        } else {
          groupRef.members = Math.max(0, groupRef.members - 1);
        }
        persistGroups();
        render();
      });

      card.appendChild(header);
      card.appendChild(members);
      card.appendChild(joinBtn);
      card.appendChild(favBtn);

      card.addEventListener("click", () => openGroupModal(g.id));
      groupsContainer.appendChild(card);
    });

    if (list.length > subset.length) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }

  function getFilteredSorted() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const cat = categoryFilter.value || "all";
    let list = groups.filter((g) => {
      if (showingFavoritesOnly && !isFav(g.id)) return false;
      if (activeTab === "my" && !isJoined(g.id)) return false;
      if (activeTab === "discover" || activeTab === "my") {
        const matchQ =
          !q ||
          g.title.toLowerCase().includes(q) ||
          g.desc.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q);
        const matchCat = cat === "all" || g.category === cat;
        return matchQ && matchCat;
      }
      return true;
    });

    const mode = sortSelect.value || "az";
    if (mode === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (mode === "za") list.sort((a, b) => b.title.localeCompare(a.title));
    else if (mode === "members") list.sort((a, b) => b.members - a.members);
    return list;
  }

  function renderFavorites() {
    favoritesList.innerHTML = "";
    if (!favs.length) {
      favoritesList.innerHTML =
        '<div class="muted">No favorites yet. Click the star on a group to add.</div>';
      return;
    }

    const grouped = {};
    favs.forEach((id) => {
      const g = groups.find((x) => x.id === id);
      if (!g) return;
      grouped[g.category] = grouped[g.category] || [];
      grouped[g.category].push(g);
    });
    Object.keys(grouped)
      .sort()
      .forEach((cat) => {
        const t = document.createElement("div");
        t.style.fontWeight = "800";
        t.style.marginTop = "6px";
        t.textContent = cat;
        favoritesList.appendChild(t);
        grouped[cat].forEach((g) => {
          const item = document.createElement("div");
          item.className = "fav-item";
          const img = document.createElement("img");
          img.src = g.img;
          img.alt = g.title;
          const i = document.createElement("div");
          i.style.flex = "1";
          const tt = document.createElement("div");
          tt.style.fontWeight = "700";
          tt.textContent = g.title;
          const ss = document.createElement("div");
          ss.className = "muted";
          ss.textContent = `${g.members}/${g.capacity} members`;
          i.appendChild(tt);
          i.appendChild(ss);
          const btn = document.createElement("button");
          btn.className = "btn ghost";
          btn.textContent = "Open";
          btn.addEventListener("click", () => openGroupModal(g.id));
          item.appendChild(img);
          item.appendChild(i);
          item.appendChild(btn);
          favoritesList.appendChild(item);
        });
      });
  }

  function init() {
    groups = loadGroupsFromStorageOrSeed();
    renderCategoriesSelect();
    render();
    document.addEventListener("keydown", (e) => {
      if (e.key === "/") {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  function loadGroupsFromStorageOrSeed() {
    const stored = localStorage.getItem(GROUPS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length) {
          groups = parsed;
          return groups;
        }
      } catch (e) {}
    }

    groups = baseGroups.slice();

    for (let i = 1; i <= 18; i++) {
      const cats = [
        "Programming",
        "Mathematics",
        "English",
        "Science",
        "History",
        "Design",
      ];
      groups.push({
        id: "g-ex-" + i,
        title: `${cats[i % cats.length]} Study Session ${i}`,
        category: cats[i % cats.length],
        desc: `Practice and discuss ${
          cats[i % cats.length]
        } topics - session ${i}`,
        members: (5 + i * 3) % 30,
        capacity: 30,
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      });
    }
    persistGroups();
    return groups;
  }

  function renderCategoriesSelect() {
    const cats = Array.from(new Set(groups.map((g) => g.category))).sort();
    categoryFilter.innerHTML = '<option value="all">All categories</option>';
    cats.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoryFilter.appendChild(opt);
    });
  }

  renderCategoriesSelect();
  render();
  renderFavorites();

  function renderAll() {
    renderCategoriesSelect();
    renderGroups();
    renderFavorites();
  }

  window.__sg = { groups, joined, favs, renderAll };

  renderAll();
})();
