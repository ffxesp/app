const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7mpYi8cB81aE291zeTA5iErk1Thwbyqy1U6L5AVwWozT4tPtaVRH9ht7EpS90b3tL/exec";

if (localStorage.getItem('ffx_local')) {
    window.location.href = 'index.html';
}

async function generateOtp() {
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Please enter your email.');
        return;
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: "generateOtp", email }),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('OTP sent to your email!');
            document.getElementById('otpSection').style.display = 'flex';
        } else {
            alert('Failed to send OTP. Try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send OTP. Please try again later.');
    }
}

async function submitData() {
    const formData = {
        action: "verifyAndSubmit",
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        username: document.getElementById('username').value,
        mobileNumber: document.getElementById('mobileNumber').value,
        password: document.getElementById('password').value,
        gameId: document.getElementById('gameId').value,
        email: document.getElementById('email').value,
        otp: document.getElementById('otp').value,
        referCode: document.getElementById('referCode') ? document.getElementById('referCode').value : null,
    };

    if (!formData.firstName || !formData.lastName || !formData.username || !formData.mobileNumber ||
        !formData.password || !formData.gameId || !formData.email || !formData.otp) {
        alert('Please fill all required fields.');
        return;
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Signup successful!');
            localStorage.setItem('ffx_local', formData.username);
            window.location.href = 'login.html';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit data. Please try again later.');
    }
}
