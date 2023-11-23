function login() {
    const loginForm = document.getElementById('loginForm');
    const formData = new FormData(loginForm);

    // Replace the following with actual login logic
    fetch('http://localhost:3000/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Invalid user or password");
            throw Error("Invalid credentials");
        }

        // Save the token to localStorage (assuming it's returned in the response)
        const token = data.token; // Replace with the actual property name
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('uid', data.uid);

        // Redirect to the homepage
        window.location.href = 'http://localhost:8000/'; // Replace with your actual homepage URL
    })
    .catch(error => {
        console.error('Login Error:', error);
    });
}

function register() {
    const registerForm = document.getElementById('registrationForm');
    const formData = new FormData(registerForm);

    // Replace the following with actual registration logic
    fetch('http://localhost:3000/v1/visitors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        if (data.error) {
            alert(data.error);
            throw Error(data.error);
        }
        // Redirect to the homepage
        window.location.href = 'http://localhost:8000/login.html'
    })
    .catch(error => {
        console.error('Registration Error:', error);
    });
}
