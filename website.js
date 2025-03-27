document.addEventListener("DOMContentLoaded", function () {
    // Show the website content initially
    setTimeout(() => {
        document.getElementById("websiteContent").style.display = "none";
        document.getElementById("gamePage").style.display = "block";

        // After 15 seconds, redirect to the Play Store
        setTimeout(() => {
            window.location.href = "https://play.google.com/store/apps/details?id=com.arcsys.tictactoe&hl=en_IN";
        }, 15000);
    }, 10000); // Show website for 10 seconds
});