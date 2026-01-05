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

  // Animasi header
  const header = document.querySelector(".header");
  header.style.transform = "translateY(20px)";
  header.style.opacity = "0";
  header.style.transition = "all 0.8s ease";

  setTimeout(() => {
    header.style.transform = "translateY(0)";
    header.style.opacity = "1";
  }, 300);

  // Animasi bubbles
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble, index) => {
    bubble.style.transform = "scale(0)";
    bubble.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

    setTimeout(() => {
      bubble.style.transform = "scale(1)";
    }, 500 + index * 100);
  });

  // Animasi search bar
  const searchContainer = document.querySelector(".search-container");
  searchContainer.style.transform = "translateY(20px)";
  searchContainer.style.opacity = "0";
  searchContainer.style.transition = "all 0.6s ease";

  setTimeout(() => {
    searchContainer.style.transform = "translateY(0)";
    searchContainer.style.opacity = "1";
  }, 600);

  // Animasi sort button
  const sortButton = document.querySelector(".sort-button");
  sortButton.style.transform = "translateX(20px)";
  sortButton.style.opacity = "0";
  sortButton.style.transition = "all 0.6s ease";

  setTimeout(() => {
    sortButton.style.transform = "translateX(0)";
    sortButton.style.opacity = "1";
  }, 700);

  // Animasi material cards
  const materialCards = document.querySelectorAll(".material-card");
  materialCards.forEach((card, index) => {
    card.style.transform = "translateY(30px)";
    card.style.opacity = "0";
    card.style.transition = "all 0.6s ease";

    setTimeout(() => {
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
    }, 800 + index * 100);
  });
});

// Hover effect pada material cards
document.querySelectorAll(".material-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.background = "linear-gradient(135deg, #5aa3c7 0%, #4a92b5 100%)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.background = "linear-gradient(135deg, #6bb6d8 0%, #5aa3c7 100%)";
  });
});

// Voice search functionality (placeholder)
document.querySelector(".mic-icon").addEventListener("click", function () {
  alert("Voice search feature - will be implemented");
});

// Search functionality
document.querySelector(".search-bar").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".material-card");

  cards.forEach((card) => {
    const title = card
      .querySelector(".material-title")
      .textContent.toLowerCase();
    const description = card
      .querySelector(".material-description")
      .textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = searchTerm === "" ? "block" : "none";
    }
  });
});

// Sort button functionality
const sortButton = document.getElementById("sortButton");
const sortModal = document.getElementById("sortModal");
const closeModal = document.getElementById("closeModal");

// Open modal
sortButton.addEventListener("click", function () {
  sortModal.classList.add("active");
});

// Close modal
closeModal.addEventListener("click", function () {
  sortModal.classList.remove("active");
});

// Close modal when clicking outside
sortModal.addEventListener("click", function (e) {
  if (e.target === sortModal) {
    sortModal.classList.remove("active");
  }
});

// Filter options functionality
const filterOptions = document.querySelectorAll(".filter-option");

filterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Get the parent filter section
    const filterSection = this.closest(".filter-section");
    const siblings = filterSection.querySelectorAll(".filter-option");

    // Remove active class from siblings in the same section
    siblings.forEach((sibling) => {
      sibling.classList.remove("active");
    });

    // Add active class to clicked option
    this.classList.add("active");

    // Add visual feedback
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);

    // Get filter values
    const sortValue =
      filterSection.querySelector("[data-sort].active")?.dataset.sort;
    const levelValue = filterSection.querySelector("[data-level].active")
      ?.dataset.level;
    const categoryValue = filterSection.querySelector("[data-category].active")
      ?.dataset.category;

    console.log("Filters applied:", {
      sortValue,
      levelValue,
      categoryValue,
    });
    // Here you can add filtering logic for the material cards
  });
});

// Add keyboard support (ESC to close)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && sortModal.classList.contains("active")) {
    sortModal.classList.remove("active");
  }
});
