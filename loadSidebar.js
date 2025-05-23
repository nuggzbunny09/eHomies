// loadSidebar.js

function loadSidebar() {
  fetch('sidebar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('sidebar-placeholder').innerHTML = data;
    })
    .then(() => {
      const userScript = document.createElement("script");
      userScript.src = "userData.js";
      document.body.appendChild(userScript);

      userScript.onload = () => {
        const authScript = document.createElement("script");
        authScript.src = "auth.js";
        document.body.appendChild(authScript);
      };
    });
}
