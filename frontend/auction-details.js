document.addEventListener('DOMContentLoaded', async function() {

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
        const auction = await fetchAuction(getAuctionIdFromUrl());
        const viewerId = localStorage.getItem('uid');
        localStorage.setItem('auctionId', auction.auctionId);      

        var container = document.createElement('div');
        container.className = 'container mt-4';

        var title = document.createElement('h2');
        title.textContent = auction.title;
        container.appendChild(title);

        // Button to place a bid
        var placeBidBtn = document.createElement('button');
        placeBidBtn.id = 'placeBidBtn';
        placeBidBtn.className = 'btn btn-primary float-right mt-3';
        placeBidBtn.textContent = 'Place Bid';
        container.appendChild(placeBidBtn);
        // Add an event listener to the "Place Bid" button
        placeBidBtn.addEventListener('click', async function() {
            if (!localStorage.getItem('uid')) {
                window.location.href = 'http://localhost:8000/login.html';
            } else {
                const bidPrice = prompt('Enter your bid price:');

                // Call a function to place a bid with the specified price
                await placeBid(localStorage.getItem('auctionId'), bidPrice);

                // After placing a bid, update the displayed highest bid
                await fetchHighestBid(localStorage.getItem('auctionId'));
            }
        });

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.id = 'deleteAuctionBtn';
        deleteButton.className = 'btn btn-danger float-right mt-3 mr-2'; // Adjust margins as needed
        deleteButton.textContent = 'Delete Auction';
        deleteButton.style.display = 'none'; // Initially hide the delete button
        container.appendChild(deleteButton);

        if (viewerId === '1' || viewerId === auction.userId) {
            deleteButton.style.display = 'block';
            deleteButton.addEventListener('click', async function() {
                await deleteAuction(localStorage.getItem('auctionId'));
                window.location.href = 'http://localhost:8000/';
            });
        }

        // Display the current highest bid container
        var highestBidContainer = document.createElement('div');
        highestBidContainer.id = 'highestBidContainer';
        highestBidContainer.className = 'mt-3';

        // Heading for highest bid
        var highestBidHeading = document.createElement('h4');
        highestBidHeading.textContent = 'Highest Bid:';
        highestBidContainer.appendChild(highestBidHeading);

        // Paragraph for highest bid value
        var highestBidValue = document.createElement('p');
        highestBidValue.id = 'highestBidValue';
        highestBidValue.textContent = 'Login to view the current bid';
        highestBidContainer.appendChild(highestBidValue);

        // Append the highest bid container to the main container
        container.appendChild(highestBidContainer);
        document.body.appendChild(container);

        await fetchHighestBid(auction.auctionId);

        const card = document.createElement('div');
        card.className = 'card mt-3';
        card.innerHTML = `
            <div class="card-body">
                <img src="${auction.imageUrl}" class="card-img-top mx-auto d-block img-fluid" style="max-height: 500px; width: auto;" alt="image">
                <br>
                <p class="card-text">Auction ID: ${auction.auctionId}</p>
                <p class="card-text"><a href="profile.html?id=${auction.userId}">User ID: ${auction.userId}</a></p>
                <p class="card-text">Category: ${auction.category}</p>
                <p class="card-text">Initial price: ${auction.initPrice} $</p>
                <p class="card-text">Description: ${auction.description}</p>
            </div>
        `;
        container.appendChild(card);
    } catch (error) {
        // Display an error message to the user
        console.error('Failed to fetch auction details:', error);
        const container = document.querySelector('.container');
        container.innerHTML = '<p>Error: Failed to fetch auction details. Please try again later.</p>';
    }
});

function getAuctionIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function fetchAuction(auctionId) {
    const apiUrl = `http://localhost:3000/v1/visitors/${auctionId}`;

    // Include the JWT token if available in localStorage
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

async function fetchHighestBid(auctionId) {
    // Implement logic to fetch the current highest bid for the auctionId
    // For now, let's assume you have an API endpoint that returns the highest bid
    const apiUrl = `http://localhost:3000/v1/bids?auctionId=${auctionId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken'),
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.price) {
            document.getElementById('highestBidValue').textContent = `No bid has been made`;
        } else {
            document.getElementById('highestBidValue').textContent = `$${data.price}`;
        }
    } catch (error) {
        console.error('Error fetching highest bid:', error);
    }
}

async function placeBid(auctionId, bidPrice) {
    // Implement logic to place a bid for the specified auctionId and bidPrice
    console.log(`Placing bid for auctionId ${auctionId} with price $${bidPrice}`);

    const apiUrl = `http://localhost:3000/v1/bids`;
    console.log(localStorage.getItem('jwtToken'));
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken'),
            },
            body: JSON.stringify({
                auctionId: auctionId,
                userId: localStorage.getItem('uid'),
                price: bidPrice,
            })
        });
        if (!response.ok) {
            const data = await response.json();
            alert(data.error);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        // Update the displayed highest bid value
        // document.getElementById('highestBidValue').textContent = `$${data.highestBidAmount}`;
    } catch (error) {
        console.error('Error fetching highest bid:', error);
    }
}

async function deleteAuction(auctionId) {
    const apiUrl = `http://localhost:3000/v1/auctions/${auctionId}`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')
    };

    return fetch(apiUrl, {
        method: 'DELETE',
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