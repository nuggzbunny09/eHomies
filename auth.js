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

// Inject sidebar info
const tryInjectSidebarInfo = () => {
  const container = document.getElementById("sidebar-user-info");
  if (!container) return setTimeout(tryInjectSidebarInfo, 50);

  if (currentUser) {
    const user = JSON.parse(localStorage.getItem(currentUser));
    container.innerHTML = `
      <img src="${user.avatar}" alt="User Avatar" class="bg-cyan-300 w-24 h-24 mx-auto shadow-md object-contain border-3 border-cyan-600 rounded-xl"/>
      <h2 class="text-center mt-4 text-xl font-bold">${user.username}</h2>
      <p class="text-center text-sm">Level ${user.level}</p>
    `;
  } else {
    container.innerHTML = `
      <img src="images/eHomies.png" alt="eHomies Logo" class="bg-cyan-300 w-24 h-24 mx-auto shadow-md object-contain border-3 border-cyan-600 rounded-xl"/>
      <h2 class="text-center mt-4 text-xl font-bold">
        <a href="login.html" class="text-white underline hover:text-cyan-300">Login to eHomies</a>
      </h2>
    `;
  }
};

tryInjectSidebarInfo();
