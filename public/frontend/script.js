// Put this file in the same folder as the HTML files.
// IMPORTANT: set API_BASE to your backend URL (or '' if same domain).
const API_BASE = ""; // example: "https://your-backend-url.vercel.app"

// helper to show message in page
function showMessage(elId, text, isError = false) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = text;
  el.style.color = isError ? "#b91c1c" : "#0b5bff";
}

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMessage("message", "Please wait...");

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage("message", data.message || "Login failed", true);
        return;
      }

      // on success, store username in localStorage and redirect to dashboard
      localStorage.setItem("user", username);
      window.location.href = "dashboard.html";
    } catch (err) {
      showMessage("message", "Network error — check backend URL", true);
      console.error(err);
    }
  });
}

// SIGNUP FORM
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMessage("message", "Creating account...");

    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;

    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage("message", data.message || "Signup failed", true);
        return;
      }

      showMessage("message", "Account created. Redirecting to login...");
      setTimeout(() => window.location.href = "index.html", 900);
    } catch (err) {
      showMessage("message", "Network error — check backend URL", true);
      console.error(err);
    }
  });
}
