document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("websiteContent").style.display = "none";
        document.getElementById("gamePage").style.display = "block";

        setTimeout(() => {
            window.location.href = "https://play.google.com/store/apps/details?id=com.arcsys.tictactoe&hl=en_IN";
        }, 15000);
    }, 10000); 
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("Page Loaded");
});
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

