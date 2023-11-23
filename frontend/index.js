// index.js

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

    const auctions = await fetchAuctions();

    const row = document.getElementById('auctionCardRow');
    row.innerHTML = ''; // Clear existing cards


    auctions.forEach(auction => {
        const col = document.createElement('div');
        col.classList.add('col-md-4'); // Adjust the column size as needed

        const card = document.createElement('div');
        card.classList.add('card', 'auction-card', 'mb-4'); // Add mb-4 for some margin between cards

        card.className = 'card mt-3 auction-card';
            card.innerHTML = `
                <a href="auction.html?id=${auction.auctionId}" class="card-link" onmouseover="applyCardHoverStyles(this)" onmouseout="removeCardHoverStyles(this)">
                    <div class="image-container">
                        <img src="${auction.imageUrl !== "none" ? auction.imageUrl : 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'}" class="card-image card-img-top" alt="Auction Image">
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">${auction.title}</h5>
                    </div>
                </a>
            `;
        col.appendChild(card);
        row.append(col);
    });

    // Find the "Create Auction" button
    const createAuctionBtn = document.getElementById('createAuctionBtn');

    // Add a click event listener to the button
    createAuctionBtn.addEventListener('click', function () {
        // Redirect to the page where you handle auction creation
        window.location.href = 'create-auction.html';
    });
});

function fetchAuctions(title) {
    const apiUrl = "http://localhost:3000/v1/visitors/";

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
        // Handle the auction data
        console.log('Auction Data:', data);
        // Implement logic to display or process the auction data as needed
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        // Implement error handling as needed
        throw error;
    });
}

// Function to apply hover styles
function applyCardHoverStyles(cardLink) {
    cardLink.classList.add('hovered');
}

// Function to remove hover styles
function removeCardHoverStyles(cardLink) {
    cardLink.classList.remove('hovered');
}
