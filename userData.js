// userData.js

const USER_KEY = "currentUser";
const USERS_KEY = "users";

// Get the current logged-in user's data object
function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse currentUser from localStorage:", e);
    return null;
  }
}

// Set the current logged-in user data
function setCurrentUser(username) {
  localStorage.setItem("currentUser", username);
}

// Get the full user list
function getAllUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse users from localStorage:", e);
    return [];
  }
}

// Save updated list of all users
function setAllUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Update a single user in the user list and save both all users and current user
function updateUser(updatedUser) {
  const users = getAllUsers();
  const index = users.findIndex(u => u.username === updatedUser.username);
  if (index !== -1) {
    users[index] = updatedUser;
    setAllUsers(users);
    setCurrentUser(updatedUser);
  } else {
    console.warn("User not found when trying to update:", updatedUser.username);
  }
}

// Find a user by username
function getUserByUsername(username) {
  return getAllUsers().find(u => u.username === username) || null;
}
