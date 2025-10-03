const API_URL = "http://localhost:5000"; // later replace with Vercel backend URL

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  let data = await res.json();
  alert(data.message);

  if (res.ok) {
    localStorage.setItem("user", username);
    window.location.href = "dashboard.html";
  }
});

// Signup
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  let res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  let data = await res.json();
  alert(data.message);

  if (res.ok) {
    window.location.href = "index.html";
  }
});
