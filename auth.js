const publicPages = ['index.html', 'login.html', 'create.html'];
const currentPage = window.location.pathname.split('/').pop();
const currentUser = localStorage.getItem("currentUser");

if (!currentUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}

function getCurrentUserData() {
  const usersRaw = localStorage.getItem("users");
  if (!usersRaw) {
    console.warn("No 'users' found in localStorage.");
    return null;
  }

  let users;
  try {
    users = JSON.parse(usersRaw);
  } catch (e) {
    console.error("Failed to parse 'users' from localStorage:", e);
    return null;
  }

  const user = users.find(u => u.username === currentUser);
  if (!user) {
    console.warn(`No matching user for currentUser="${currentUser}".`);
  }

  return user;
}

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
    <img src="images/eHomies.png" alt="eHomies Logo"
           class="w-24 h-24 mx-auto mb-4 shadow-md rounded-full border-4 border-cyan-600" />
      <a href="login.html" class="block text-center text-white bg-cyan-600 hover:bg-cyan-700 py-2 px-4 rounded-md font-bold shadow-md">
        Login to eHomies
      </a>
    `;
  }
};


tryInjectSidebarInfo();

