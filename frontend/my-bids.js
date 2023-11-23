// my-bids.js

document.addEventListener('DOMContentLoaded', async function () {
    const uid = localStorage.getItem('uid');
    const apiUrl = `http://localhost:3000/v1/bids/${uid}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwtToken')
        }
    })
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.container');
            if (data.length == 0) {
                const message = document.createElement('div');
                message.style.color='RED';
                message.innerHTML = "<br><br><h1>You haven't placed any bids</h1>";
                container.appendChild(message);
            }
            data.forEach(bid => {
                const bidCard = document.createElement('div');
                bidCard.className = 'card mt-3';
                bidCard.innerHTML = `
                    <div class="card-body">
                        <a href="auction.html?id=${bid.auctionId}">
                            <h5 class="card-title">Auction ID: ${bid.auctionId}</h5>
                        </a>
                        <p class="card-text">Bid Amount: ${bid.price}</p>
                    </div>
                `;
                container.appendChild(bidCard);
            }); 
        })
        .catch(error => {
            console.error('Error fetching My Auctions data:', error);
        });
});