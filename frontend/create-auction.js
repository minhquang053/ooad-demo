// create-auction.js

document.addEventListener('DOMContentLoaded', function () {
    const createAuctionForm = document.getElementById('createAuctionForm');

    createAuctionForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
            userId: localStorage.getItem('uid'),
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            initPrice: document.getElementById('initPrice').value,
            imageUrl: document.getElementById('imageUrl').value,
        };

        localStorage.setItem('createAuctionFormData', JSON.stringify(formData));

        // Replace the URL with your actual API endpoint for creating auctions
        const apiUrl = 'http://localhost:3000/v1/auctions';

        const token = localStorage.getItem('jwtToken');

        // Send a POST request to the API with the form data
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the successful creation of the auction
            console.log('Auction created successfully:', data);

            // Optionally, redirect the user to the auctions page or display a success message
            window.location.href = '/'; // Redirect to the main auctions page
        })
        .catch(error => {
            console.error('Error creating auction:', error);

            const formData = JSON.parse(localStorage.getItem('createAuctionFormData'));
            document.getElementById('title').value = formData.title;
            document.getElementById('category').value = formData.category;
            document.getElementById('description').value = formData.description;
            document.getElementById('initPrice').value = formData.initPrice;
            document.getElementById('imageUrl').value = formData.imageUrl;
            // Handle the error, display a message to the user, or perform other actions
        });
    });
});
