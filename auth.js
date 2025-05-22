// Pages that don't require login
const publicPages = ['index.html', 'login.html', 'create.html'];

// Get current page filename
const currentPage = window.location.pathname.split('/').pop();

// Get current session username
const currentUser = localStorage.getItem("currentUser");

// Redirect to login page if user is not logged in
if (!currentUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}

// Load current user object from localStorage
function getCurrentUserData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find(user => user.username === currentUser);
}

// Sidebar population function
const tryInjectSidebarInfo = () => {
  const container = document.getElementById("sidebar-user-info");
  if (!container) return setTimeout(tryInjectSidebarInfo, 50);

  const user = getCurrentUserData();
  if (user) {
    container.innerHTML = `
      <img src="${user.avatar || 'images/eHomies.png'}" alt="User Avatar"
           class="bg-cyan-300 w-24 h-24 mx-auto shadow-md object-contain border-3 border-cyan-600"/>
      <h2 class="text-center mt-4 text-xl font-bold">${user.username}</h2>
      <p class="text-center text-sm">Level ${user.userLevel}</p>
    `;
  } else {
    container.innerHTML = `
      <img src="images/eHomies.png" alt="Default Logo"
           class="bg-cyan-300 w-24 h-24 mx-auto shadow-md object-contain border-3 border-cyan-600"/>
      <h2 class="text-center mt-4 text-xl font-bold">
        <a href="login.html" class="text-cyan-300 underline">Login to eHomies</a>
      </h2>
    `;
  }
};

tryInjectSidebarInfo();

