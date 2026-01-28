// ===== Helpers =====
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function clearErrors() {
  setText("errName", "");
  setText("errEmail", "");
  setText("errPhone", "");
  setText("errMsg", "");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  // Only digits, 10-13 length
  return /^\d{10,13}$/.test(phone);
}

// ===== Navbar toggle (mobile) =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });

  // close menu when clicking a link
  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navMenu.classList.remove("is-open"));
  });
}

// ===== Welcome name logic =====
function applyName(name) {
  const cleaned = (name || "").trim();
  setText("displayName", cleaned.length ? cleaned : "Guest");
}

window.addEventListener("DOMContentLoaded", () => {
  // Ask name on first load 
  const userName = window.prompt("Hi! What's your name?");
  applyName(userName);
});

// ===== Form validation + show submitted value =====
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const messageText = document.getElementById("messageText").value.trim();

    let valid = true;

    if (fullName.length < 3) {
      setText("errName", "Name must be at least 3 characters.");
      valid = false;
    }

    if (!isValidEmail(email)) {
      setText("errEmail", "Please enter a valid email address.");
      valid = false;
    }

    if (!isValidPhone(phone)) {
      setText("errPhone", "Phone must be 10–13 digits (numbers only).");
      valid = false;
    }

    if (messageText.length < 5) {
      setText("errMsg", "Message must be at least 5 characters.");
      valid = false;
    }

    if (!valid) return;

    // Show values on HTML
    setText("resName", fullName);
    setText("resEmail", email);
    setText("resPhone", phone);
    setText("resMsg", messageText);
    setText("resTime", new Date().toLocaleString());

    form.reset();
  });
}
