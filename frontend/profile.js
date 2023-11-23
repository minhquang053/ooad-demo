document.addEventListener('DOMContentLoaded', async function () {
    const uid = localStorage.getItem('uid');
    if (!uid) {
        const menu = document.querySelector('.dropdown-menu');
        const items = menu.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            menu.removeChild(item);
        });
        menu.removeChild(menu.querySelector('.dropdown-divider'));
        const loginItem = document.createElement('a');
        loginItem.classList.add('dropdown-item');
        loginItem.href = 'login.html'; // You can set the href attribute if needed
        loginItem.textContent = "Login";
        menu.appendChild(loginItem);
    } 

    try {
        var userId = getUserIdFromUrl(); // Assuming you have a function to retrieve the user ID from storage
        if (!userId) {
            userId = getUserIdFromStorage();
            if (!userId) {
                throw Error("Couldn't retrieve user id");
            }
        } else {
            document.getElementById('editProfileButton').style.display = 'none';
        }
        const userProfile = await fetchUserProfile(userId);

        displayUserProfile(userProfile);
    } catch (error) {
        // Display an error message to the user
        console.error('Failed to fetch user profile:', error);
        const container = document.querySelector('.container');
        container.innerHTML = '<p>Error: Failed to fetch user profile. Please try again later.</p>';
    }
});

function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getUserIdFromStorage() {
    // Implement this function to retrieve the user ID from storage (localStorage, sessionStorage, etc.)
    // For example, you might have stored it during the login process
    return localStorage.getItem('uid');
}

function fetchUserProfile(userId) {
    const apiUrl = `http://localhost:3000/v1/users/${userId}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    return fetch(apiUrl, {
        method: 'GET',
        headers: headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the user profile data
        console.log('User Profile Data:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

function displayUserProfile(userProfile) {
    const container = document.querySelector('#profileDetailsContainer');

    const card = document.createElement('div');
    card.className = 'card mt-3';
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Name: ${userProfile.name}</h5>
            <p class="card-text">User ID: ${userProfile.userId}</p>
            <p class="card-text">Email: ${userProfile.email}</p>
            <p class="card-text">Phone: ${userProfile.phone}</p>
            <p class="card-text">Introduction: ${userProfile.intro}</p>
        </div>
    `;
    container.appendChild(card);
}