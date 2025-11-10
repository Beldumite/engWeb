document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value;
  const username = this.querySelector('input[type="text"]').value;
  const password = this.querySelector('input[type="password"]').value;

  if (email && username && password) {
    alert(
      "Account created successfully!\nEmail: " +
        email +
        "\nUsername: " +
        username
    );
    this.reset();
  } else {
    alert("Please fill in all fields");
  }
});

document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.transition = "all 0.3s ease";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});
