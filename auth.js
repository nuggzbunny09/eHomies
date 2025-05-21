// Pages that don't require login
const publicPages = ['index.html', 'login.html', 'create.html'];

// Get current page filename
const currentPage = window.location.pathname.split('/').pop();

// Get current session user
const currentUser = localStorage.getItem("currentUser");

// Redirect to login page if user is not logged in
if (!currentUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}

// Load user data from users.json
async function fetchUserData(username) {
  try {
    const response = await fetch('users.json');
    const users = await response.json();
    return users.find(user => user.username === username);
  } catch (err) {
    console.error("Error loading user data:", err);
    return null;
  }
}

// Sidebar population function
const tryInjectSidebarInfo = async () => {
  const container = document.getElementById("sidebar-user-info");
  if (!container) return setTimeout(tryInjectSidebarInfo, 50);

  if (currentUser) {
    const user = await fetchUserData(currentUser);
    if (user) {
      container.innerHTML = `
        <img src="${user.avatar || 'images/eHomies.png'}" alt="User Avatar" class="bg-cyan-300 w-24 h-24 mx-auto shadow-md object-contain border-3 border-cyan-600"/>
        <h2 class="text-center mt-4 text-xl font-bold">${user.username}</h2>
        <p class="text-center text-sm">Level ${user.userLevel}</p>
      `;
    } else {
      container.innerHTML = `<p class="text-red-500 text-center">User data not found.</p>`;
    }
  } else {
    container.innerHTML = `
      <img src="images/eHomies.png" alt="Default Logo" class="bg-cyan-300 w-24 h-24 mx-auto shadow-md object-contain border-3 border-cyan-600"/>
      <h2 class="text-center mt-4 text-xl font-bold">
        <a href="login.html" class="text-cyan-300 underline">Login to eHomies</a>
      </h2>
    `;
  }
};

tryInjectSidebarInfo();

