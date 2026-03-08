// theme-sync.js

// Function to apply the theme based on the main app's localStorage
function applyThemeFromApp() {
    try {
        const appTheme = localStorage.getItem("theme");
        if (!appTheme) return; // If not set, let MkDocs use default
        
        // MkDocs Material uses inputs with name "__palette" to toggle schemes
        // We need to find the input corresponding to the desired scheme
        // appTheme 'dark' -> scheme 'slate'
        // appTheme 'light' -> scheme 'default'
        
        const targetScheme = appTheme === "dark" ? "slate" : "default";
        
        // Find the radio button that activates this scheme
        const input = document.querySelector(`input[name="__palette"][data-md-color-media][data-md-color-scheme="${targetScheme}"]`) 
                   || document.querySelector(`input[name="__palette"][data-md-color-scheme="${targetScheme}"]`);

        if (input && !input.checked) {
            // Programmatically click it to trigger MkDocs internal logic (which saves preference)
            input.click();
        }
    } catch (e) {
        console.error("Error syncing theme:", e);
    }
}

// Run immediately to prevent flash if possible
applyThemeFromApp();

// Run on DOMContentLoaded to ensure elements exist
document.addEventListener("DOMContentLoaded", applyThemeFromApp);

// Listen for storage changes from other tabs (the main app)
window.addEventListener("storage", (event) => {
    if (event.key === "theme") {
        applyThemeFromApp();
    }
});
