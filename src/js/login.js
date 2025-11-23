// Fungsi untuk social login (bisa disesuaikan)
function loginWithFacebook() {
  alert("Facebook login akan diimplementasikan");
  // window.location.href = 'facebook-auth-url';
}

function loginWithGoogle() {
  alert("Google login akan diimplementasikan");
  // window.location.href = 'google-auth-url';
}

// Validasi form sederhana
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    // Redirect ke halaman dashboard atau halaman yang diinginkan
    window.location.href = document.getElementById("signinBtn").href;
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
  const loginContainer = document.querySelector(".login-container");
  loginContainer.style.transform = "translateY(30px)";
  loginContainer.style.opacity = "0";
  loginContainer.style.transition =
    "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";

  setTimeout(() => {
    loginContainer.style.transform = "translateY(0)";
    loginContainer.style.opacity = "1";
  }, 400);

  // Animasi input fields muncul satu per satu
  const inputs = document.querySelectorAll(".input-group");
  inputs.forEach((input, index) => {
    input.style.transform = "translateY(20px)";
    input.style.opacity = "0";
    input.style.transition = "all 0.6s ease";

    setTimeout(() => {
      input.style.transform = "translateY(0)";
      input.style.opacity = "1";
    }, 600 + index * 150);
  });

  // Animasi button
  const btn = document.querySelector(".signin-btn");
  btn.style.transform = "scale(0.9)";
  btn.style.opacity = "0";
  btn.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

  setTimeout(() => {
    btn.style.transform = "scale(1)";
    btn.style.opacity = "1";
  }, 900);

  // Animasi social buttons
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn, index) => {
    btn.style.transform = "scale(0)";
    btn.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 1100 + index * 100);
  });
});

// Efek ripple pada button
document.querySelector(".signin-btn").addEventListener("click", function (e) {
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

// Efek floating pada social buttons
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.animation = "float 0.3s ease-in-out";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.animation = "";
  });
});

// Tambahkan animasi float
const floatStyle = document.createElement("style");
floatStyle.textContent = `
      @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
      }
  `;
document.head.appendChild(floatStyle);
