
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // Signup Functionality
    if (signupForm) {
        const signupMessage = document.createElement("p");
        signupMessage.classList.add("message");
        signupForm.appendChild(signupMessage);

        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("signup-username").value.trim();
            const password = document.getElementById("signup-password").value.trim();

            if (!username || !password) {
                showMessage(signupMessage, "Please fill in all fields.", "error");
                return;
            }

            if (localStorage.getItem(username)) {
                showMessage(signupMessage, "Username already exists! Try a different one.", "error");
            } else {
                localStorage.setItem(username, password);
                showMessage(signupMessage, "Sign-up successful! Redirecting...", "success");
                setTimeout(() => {
                    window.location.href = "quiz.html"; // Redirect to login page
                }, 1500);
            }
        });
    }

    // Login Functionality
    if (loginForm) {
        const loginMessage = document.createElement("p");
        loginMessage.classList.add("message");
        loginForm.appendChild(loginMessage);

        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("user").value.trim();
            const password = document.getElementById("pass").value.trim();

            if (!username || !password) {
                showMessage(loginMessage, "Please enter both username and password.", "error");
                return;
            }

            const storedPassword = localStorage.getItem(username);
            if (storedPassword && storedPassword === password) {
                showMessage(loginMessage, "Login successful! Redirecting...", "success");
                setTimeout(() => {
                    window.location.href = "quiz.html"; // Redirect to quiz page
                }, 1500);
            } else {
                showMessage(loginMessage, "Invalid username or password. Please try again.", "error");
            }
        });
    }

    // Function to display messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `message ${type}`; // Add class for styling
    }
});
