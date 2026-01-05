// Animasi saat halaman dimuat
window.addEventListener("load", function () {
  // Fade in body
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 50);

  // Animasi sidebar menu items
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item, index) => {
    item.style.transform = "translateX(-20px)";
    item.style.opacity = "0";
    item.style.transition = "all 0.5s ease";

    setTimeout(() => {
      item.style.transform = "translateX(0)";
      item.style.opacity = "1";
    }, 100 + index * 80);
  });

  // Animasi welcome section
  const welcomeText = document.querySelector(".welcome-text");
  welcomeText.style.transform = "translateY(20px)";
  welcomeText.style.opacity = "0";
  welcomeText.style.transition = "all 0.8s ease";

  setTimeout(() => {
    welcomeText.style.transform = "translateY(0)";
    welcomeText.style.opacity = "1";
  }, 300);

  // Animasi stat cards
  const statCards = document.querySelectorAll(".stat-card, .chart-card");
  statCards.forEach((card, index) => {
    card.style.transform = "translateY(30px)";
    card.style.opacity = "0";
    card.style.transition = "all 0.6s ease";

    setTimeout(() => {
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
    }, 500 + index * 100);
  });

  // Animasi leaderboard
  const leaderboard = document.querySelector(".leaderboard");
  leaderboard.style.transform = "translateY(30px)";
  leaderboard.style.opacity = "0";
  leaderboard.style.transition = "all 0.8s ease";

  setTimeout(() => {
    leaderboard.style.transform = "translateY(0)";
    leaderboard.style.opacity = "1";
  }, 900);

  // Animasi table rows
  const tableRows = document.querySelectorAll(".leaderboard-table tbody tr");
  tableRows.forEach((row, index) => {
    row.style.transform = "translateX(-20px)";
    row.style.opacity = "0";
    row.style.transition = "all 0.5s ease";

    setTimeout(() => {
      row.style.transform = "translateX(0)";
      row.style.opacity = "1";
    }, 1200 + index * 100);
  });
});

// Hover effect pada stat cards
document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.background = "linear-gradient(135deg, #4a9dc7 0%, #2b7db3 100%)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.background = "linear-gradient(135deg, #6bb6d8 0%, #4a9dc7 100%)";
  });
});
