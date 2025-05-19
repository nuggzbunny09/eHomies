// Pages that don't require login
const publicPages = ['index.html', 'login.html'];

// Get current page filename
const currentPage = window.location.pathname.split('/').pop();

// Get current user
const currentUser = localStorage.getItem("currentUser");

// Redirect if not logged in and not on public page
if (!currentUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}

