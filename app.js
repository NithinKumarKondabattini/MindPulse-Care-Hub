const STORAGE_KEY = "mindpulse_session";

const loginForm = document.getElementById("loginForm");
const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const logoutButton = document.getElementById("logoutButton");
const formMessage = document.getElementById("formMessage");
const welcomeTitle = document.getElementById("welcomeTitle");

function getSession() {
  const rawSession = localStorage.getItem(STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function setSession(email) {
  const name = email.split("@")[0].replace(/[._-]/g, " ");
  const displayName = name.replace(/\b\w/g, (letter) => letter.toUpperCase());

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      email,
      displayName,
      loggedInAt: new Date().toISOString(),
    }),
  );
}

function showMessage(message, type = "") {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`.trim();
}

function renderApp() {
  const session = getSession();
  const isAuthenticated = Boolean(session);

  loginView.classList.toggle("hidden", isAuthenticated);
  dashboardView.classList.toggle("hidden", !isAuthenticated);
  logoutButton.classList.toggle("hidden", !isAuthenticated);

  if (session) {
    welcomeTitle.textContent = `Welcome back, ${session.displayName}`;
    showMessage("");
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showMessage("Please enter both email and password.", "error");
    return;
  }

  if (!email.includes("@")) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters long.", "error");
    return;
  }

  setSession(email);
  loginForm.reset();
  showMessage("Login successful.", "success");
  renderApp();
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  showMessage("You have been logged out.", "success");
  renderApp();
});

renderApp();
