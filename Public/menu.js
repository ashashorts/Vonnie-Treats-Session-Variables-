/* ============================================================
   Menu toggle and it's drop down navigation 
============================================================ */
const menuToggle = document.getElementById("menu-toggle");
const dropdownNav = document.getElementById("dropdown-nav");

// Showcases all my pages when the menu toggle is pressed
document.getElementById("menu-toggle").addEventListener("click", function () {
  const nav = document.getElementById("dropdown-nav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

