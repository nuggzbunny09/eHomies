// Pages that don't require login
const publicPages = ['index.html', 'login.html'];

// Get current page filename
const currentPage = window.location.pathname.split('/').pop();

// Get current user
const currentUser = localStorage.getItem("currentUser");

// Redirect if not logged in
if (!currentUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}

// If logged in, populate sidebar info after sidebar loads
if (currentUser) {
  const user = JSON.parse(localStorage.getItem(currentUser));

  const tryInjectSidebarInfo = () => {
    const container = document.getElementById("sidebar-user-info");
    if (!container) return setTimeout(tryInjectSidebarInfo, 50);

    container.innerHTML = `
      <img src="${user.avatar}" alt="User Avatar" class="bg-cyan-300 w-24 h-24 mx-auto shadow-md object-contain"/>
      <h2 class="text-center mt-4 text-xl font-bold">${user.username}</h2>
      <p class="text-center text-sm">Level ${user.level}</p>
    `;
  };

  tryInjectSidebarInfo();
}
