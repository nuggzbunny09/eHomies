// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    // Redirect to login page or show a login UI if not logged in
    window.location.href = "login.html"; // Placeholder
  } else {
    // Optional: Load user data if needed
    const userData = JSON.parse(localStorage.getItem(currentUser));
    console.log("Welcome back,", userData.username);
  }
});
