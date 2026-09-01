const form = document.getElementById("requestForm");
const messageBox = document.getElementById("message");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const requestData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        requestType: document.getElementById("requestType").value,
        description: document.getElementById("description").value.trim()
    };

    messageBox.textContent = "Submitting...";

    try {
        const response = await fetch(
            "https://ch4zg4yonv3x2pv5qs6x4ua3em0omvlt.lambda-url.ap-south-1.on.aws/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            }
        );

        const result = await response.json();

        if (response.ok) {
            messageBox.textContent =
                result.message || "Request submitted successfully!";

            form.reset();
        } else {
            messageBox.textContent =
                result.message || "Failed to submit request.";
        }

    } catch (error) {
        console.error("Error:", error);

        messageBox.textContent =
            "Unable to connect to the server.";
    }
})