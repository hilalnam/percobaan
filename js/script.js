// NAVBAR toggle 
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // close menu when clicking a link 
  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// HELPER
const $ = (id) => document.getElementById(id);

const displayName = $("displayName");

// Form elements
const form = $("contactForm");
const fullName = $("fullName");
const email = $("email");
const phone = $("phone");
const messageText = $("messageText");

// Error elements
const errName = $("errName");
const errEmail = $("errEmail");
const errPhone = $("errPhone");
const errMsg = $("errMsg");

// Result elements
const resName = $("resName");
const resEmail = $("resEmail");
const resPhone = $("resPhone");
const resMsg = $("resMsg");
const resTime = $("resTime");

function setError(el, msg) {
  if (el) el.textContent = msg || "";
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidPhone(v) {
  // accept: 08xxxx, +62xxxx, digits only (min 9)
  const cleaned = v.replace(/[\s-]/g, "");
  return /^(\+62|62|0)\d{8,14}$/.test(cleaned);
}

function setGreeting(name) {
  if (!displayName) return;
  const clean = (name || "").trim();
  displayName.textContent = clean ? clean : "Guest";
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // clean old errors
    setError(errName, "");
    setError(errEmail, "");
    setError(errPhone, "");
    setError(errMsg, "");

    const nameVal = fullName.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const msgVal = messageText.value.trim();

    let ok = true;

    if (!nameVal) { setError(errName, "Name is required."); ok = false; }
    if (!emailVal) { setError(errEmail, "Email is required."); ok = false; }
    else if (!isValidEmail(emailVal)) { setError(errEmail, "Email format is invalid."); ok = false; }

    if (!phoneVal) { setError(errPhone, "Phone number is required."); ok = false; }
    else if (!isValidPhone(phoneVal)) { setError(errPhone, "Phone format is invalid (ex: 08..., +62...)."); ok = false; }

    if (!msgVal) { setError(errMsg, "Message is required."); ok = false; }

    if (!ok) return;

    // Fill Submitted Data
    resName.textContent = nameVal;
    resEmail.textContent = emailVal;
    resPhone.textContent = phoneVal;
    resMsg.textContent = msgVal;
    resTime.textContent = new Date().toLocaleString("id-ID");

    // Update greeting on HERO
    setGreeting(nameVal);

    // optional: reset form after submit
    form.reset();
  });
}
