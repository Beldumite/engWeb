// Validasi form
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const grade = document.getElementById("grade").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (firstName && lastName && grade && email && password) {
    // Redirect ke halaman success atau dashboard
    alert("Account created successfully!");
    window.location.href = "dashboard.html";
  }
});

// Animasi loading saat halaman dimuat
window.addEventListener("load", function () {
  // Fade in body
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 50);

  // Animasi logo dari kiri
  const logo = document.querySelector(".logo-container");
  logo.style.transform = "translateX(-100px)";
  logo.style.opacity = "0";
  logo.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";

  setTimeout(() => {
    logo.style.transform = "translateX(0)";
    logo.style.opacity = "1";
  }, 200);

  // Animasi form dari bawah
  const signupContainer = document.querySelector(".signup-container");
  signupContainer.style.transform = "translateY(30px)";
  signupContainer.style.opacity = "0";
  signupContainer.style.transition =
    "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";

  setTimeout(() => {
    signupContainer.style.transform = "translateY(0)";
    signupContainer.style.opacity = "1";
  }, 400);

  // Animasi input fields muncul satu per satu
  const inputs = document.querySelectorAll(".input-group, .input-row");
  inputs.forEach((input, index) => {
    input.style.transform = "translateY(20px)";
    input.style.opacity = "0";
    input.style.transition = "all 0.6s ease";

    setTimeout(() => {
      input.style.transform = "translateY(0)";
      input.style.opacity = "1";
    }, 600 + index * 100);
  });

  // Animasi buttons
  const buttonRow = document.querySelector(".button-row");
  buttonRow.style.transform = "scale(0.9)";
  buttonRow.style.opacity = "0";
  buttonRow.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

  setTimeout(() => {
    buttonRow.style.transform = "scale(1)";
    buttonRow.style.opacity = "1";
  }, 1100);
});

// Efek ripple pada button create
document.querySelector(".create-btn").addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(255, 255, 255, 0.6)";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s ease-out";
  ripple.style.pointerEvents = "none";

  this.style.position = "relative";
  this.style.overflow = "hidden";
  this.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
});

// Tambahkan CSS untuk animasi ripple
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);
