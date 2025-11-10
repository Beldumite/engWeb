document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;

  if (email && password) {
    alert("Login successful!\nEmail: " + email);
    this.reset();
  } else {
    alert("Please fill in all fields");
  }
});

document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") btn.click();
  });
});
