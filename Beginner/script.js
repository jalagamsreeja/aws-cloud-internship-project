const form = document.getElementById("feedbackForm");
const responseBox = document.getElementById("response");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const rating = document.getElementById("rating").value;
    const feedback = document.getElementById("feedback").value.trim();

    // Basic frontend validation
    if (!name || !email || !department || !rating || !feedback) {

        responseBox.textContent =
            "Please fill in all fields.";

        return;
    }

    const feedbackData = {
        name: name,
        email: email,
        department: department,
        rating: rating,
        feedback: feedback
    };

    responseBox.textContent = "Submitting...";

    try {

        const response = await fetch(
            "https://d6nvwiqpvdqn3bscgftljal5fq0qxjuo.lambda-url.ap-south-1.on.aws/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(feedbackData)
            }
        );

        const result = await response.json();

        if (response.ok) {

            responseBox.textContent =
                result.message ||
                "Feedback submitted successfully.";

            form.reset();

        } else {

            responseBox.textContent =
                result.message ||
                "Failed to submit feedback.";
        }

    } catch (error) {

        console.error(error);

        responseBox.textContent =
            "Unable to connect to the server.";
    }

});