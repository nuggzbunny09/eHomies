// Pages that don't require login
const publicPages = ['index.html', 'login.html'];

// Get current page filename
const currentPage = window.location.pathname.split('/').pop();

// Get current user
const currentUser = localStorage.getItem("currentUser");

// Redirect logic
if (!currentUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}

// Sidebar population logic
if (currentUser) {
  const userData = JSON.parse(localStorage.getItem(currentUser));
  const sidebarInterval = setInterval(() => {
    const nameEl = document.querySelector("#sidebar-username");
    const levelEl = document.querySelector("#sidebar-level");
    const avatarEl = document.querySelector("#sidebar-avatar");

    if (nameEl && levelEl && avatarEl) {
      nameEl.textContent = userData.username;
      levelEl.textContent = `Level ${userData.level}`;
      avatarEl.src = userData.avatar;
      clearInterval(sidebarInterval); // Done loading
    }
  }, 100); // Poll until sidebar is loaded
}

