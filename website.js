document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        // Hide the website content
        document.getElementById("websiteContent").style.display = "none";
        // Show the game page
        document.getElementById("gamePage").style.display = "block";

        // Redirect to Google Play Store after 15 seconds
        setTimeout(() => {
            window.location.href = "https://play.google.com/store/apps/details?id=com.arcsys.tictactoe&hl=en_IN";
        }, 15000);
    }, 10000); // Switch from website to game after 10 seconds
});
