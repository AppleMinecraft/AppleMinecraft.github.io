function signUp(email, password, apiKey) {
    // Create a new user using Firebase Authentication REST API
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        const errorElement = document.getElementById("error");

        if (data.error) {
            // Signup Failed
            
            var msg = ""
            switch (data.error.message) {
                case "EMAIL_EXISTS":
                    msg = "Email already exists!";
                    break;
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    msg = "Too many tries, Try later!";
                    break;
                case "INVALID_PASSWORD":
                    msg = "Invalid Password!";
                    break;
                case "INVALID_EMAIL":
                    msg = "Invalid Email!";
                    break;
                case "MISSING_PASSWORD":
                    msg = "Missing Password!";
                    break;
                case "MISSING_EMAIL":
                    msg = "Missing Email!";
                    break;
                case "MISSING_EMAIL":
                    msg = "Missing Email!";
                    break;
                case "WEAK_PASSWORD : Password should be at least 6 characters":
                    msg = "Minimum 6 characters for password!";
                    break;
                default:
                    msg = data.error.message;
                    break;
            }

            errorElement.textContent = msg;
            errorElement.style.display = "block";
            console.error(data.error.message);
        } else {
            // Signup Success
            errorElement.style.display = "none";
            console.log("User registered successfully!");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        const errorElement = document.getElementById("error");
        errorElement.textContent = "An error occurred. Please try again later.";
        errorElement.style.display = "block";
    });
}

document.getElementById("signupForm").addEventListener("submit", function (e) { // Corrected "singupForm" to "signupForm"
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const apiKey = "AIzaSyAPninxpOWcyxdqwdslydi82tiL9731Nac";

    signUp(email, password, apiKey);
});
