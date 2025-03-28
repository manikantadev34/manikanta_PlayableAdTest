# manikanta_PlayableAdTest

Tic Tac Toe - manikanta_PlayableAdTest

Overview
This project is an HTML5 playable ad for Tic Tac Toe, designed for interactive engagement before redirecting users to the Google Play Store. The ad consists of a promotional website, a mini Tic Tac Toe game, and an automatic redirection to the app store.

Features
1. Website Preview (First 10 seconds): Displays game information, ratings, and install buttons.
2. Playable Game (10s - 25s): Loads a Tic Tac Toe game inside an iframe.
3. Auto-Redirect (After 25s): Automatically redirects users to the Google Play Store.

Live Demo🔗: https://manikantadev34.github.io/manikanta_PlayableAdTest/

Github Repositories : https://github.com/manikantadev34/manikanta_PlayableAdTest

Project Structure
📂 TicTacToe_Playable_Ad
 ├── 📄 index.html  # Landing page (game promotion)
 ├── 📄 website.css #styling for landing page
 ├── 📄 website.js  # Handles transitions and redirections
 ├── 📄 game.html    # Tic Tac Toe game
 ├── 📄 styles.css    # Styling for the game page
 ├── 📄 script.js     # Handles logic for game
 ├── 🎥 myvideo.mp4 # Video used in the website
 ├── 📄 README.md     # Documentation (this file)

key code:
setTimeout(() => {
    document.getElementById("websiteContent").style.display = "none";
    document.getElementById("gamePage").style.display = "block";

    setTimeout(() => {
        window.location.href = "https://play.google.com/store/apps/details?id=com.arcsys.tictactoe&hl=en_IN";
    }, 15000);
}, 10000);


How It Works
The index.html page loads first and remains visible for 10 seconds.

After 10 seconds, the Tic Tac Toe game (game.html) is displayed inside an iframe.

After an additional 15 seconds (total 25 seconds), the page automatically redirects to the Google Play Store link.

Installation & Usage
1. Local Testing
To test the playable ad locally:

Download the project files.

Open index.html in a browser.

2. Deployment
To deploy:

Upload all files to a web server.

Ensure the paths for index.html, script.js, and styles.css are correct.

Technologies Used
HTML (Structure)

CSS (Styling)

JavaScript (Transitions & redirection logic)

Notes
The ad ensures a smooth transition from the promotional website to gameplay before redirection.

The video is autoplayed in the background to enhance user engagement.

Contribution
Feel free to modify the game mechanics or improve the UI design for a better user experience.

License
This project is for demo purposes only and does not claim rights over the Tic Tac Toe game.