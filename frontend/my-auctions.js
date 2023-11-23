// my-auctions.js

document.addEventListener('DOMContentLoaded', function () {

    fetch('http://localhost:3000/v1/auctions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwtToken')
        }
    })
        .then(response => response.json())
        .then(data => {
            const row = document.getElementById('myAuctionRow');
            row.innerHTML = ''; // Clear existing cards

            if (data.length == 0) {
                const message = document.createElement('div');
                message.style.color='RED';
                message.innerHTML = "<br><br><h1>You haven't published any auctions</h1>";
                row.appendChild(message);
            }

            data.forEach(auction => {
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
        })
        .catch(error => {
            console.error('Error fetching My Auctions data:', error);
        });
});
