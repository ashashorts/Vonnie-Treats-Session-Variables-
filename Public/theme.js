/* ============================================================
   DARK MODE TOGGLE
============================================================ */

// Get the toggle button
let theme_toggler = document.querySelector('#theme_toggler');

// Toggle dark_mode class on body
theme_toggler.addEventListener('click', function() {
    document.body.classList.toggle('dark_mode');

    // Save theme setting
    if (document.body.classList.contains('dark_mode')) {
        localStorage.setItem('website_theme', 'dark_mode');
    } else {
        localStorage.setItem('website_theme', 'default');
    }
});

/* ============================================================
   Retrieve saved theme on page load
============================================================ */

function retrieve_theme() {
    let theme = localStorage.getItem('website_theme');

    if (theme != null) {
        document.body.classList.remove('default', 'dark_mode');
        document.body.classList.add(theme);
    }
}

retrieve_theme();

/* ============================================================
   Sync theme across tabs
============================================================ */

window.addEventListener("storage", function() {
    retrieve_theme();
}, false);
