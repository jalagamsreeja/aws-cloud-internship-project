const form = document.getElementById("requestForm");
const messageBox = document.getElementById("message");
const loadRequestsButton = document.getElementById("loadRequests");
const requestsList = document.getElementById("requestsList");

const API_URL =
    "https://vet6zj4533.execute-api.ap-south-1.amazonaws.com/requests";

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const requestData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        requestType: document.getElementById("requestType").value,
        description: document.getElementById("description").value.trim()
    };

    messageBox.textContent = "Submitting...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

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
        console.error("POST Error:", error);
        messageBox.textContent = "Unable to connect to the server.";
    }
});

loadRequestsButton.addEventListener("click", async function () {
    requestsList.innerHTML = "<p>Loading requests...</p>";

    try {
        const response = await fetch(API_URL, {
            method: "GET"
        });

        const result = await response.json();

        if (!response.ok) {
            requestsList.innerHTML =
                "<p>Unable to retrieve requests.</p>";
            return;
        }

        const requests = result.requests || [];

        if (requests.length === 0) {
            requestsList.innerHTML = "<p>No requests found.</p>";
            return;
        }

        requestsList.innerHTML = "";

        requests.forEach(function (request) {
            const requestDiv = document.createElement("div");
            requestDiv.className = "request-item";

            requestDiv.innerHTML = `
                <h3>${escapeHtml(request.requestType)}</h3>
                <p><strong>Name:</strong> ${escapeHtml(request.name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
                <p><strong>Description:</strong> ${escapeHtml(request.description)}</p>
                <p><strong>Submitted:</strong> ${escapeHtml(request.createdAt)}</p>
                <hr>
            `;

            requestsList.appendChild(requestDiv);
        });
    } catch (error) {
        console.error("GET Error:", error);
        requestsList.innerHTML =
            "<p>Unable to connect to the server.</p>";
    }
});

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}
