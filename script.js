function getUsernameFromLocalStorage() {
  return localStorage.getItem('ffx_local');
}

function fetchUserCoins(username) {
  if (!username) {
    document.getElementById('coins').innerText = "Username not found.";
    window.location.href = 'login.html';
    return;
  }

  const url = 'https://script.google.com/macros/s/AKfycbyjkL6um6BVq_KOHVLX436mCBqwwXmJ-F6EiG4AYMoex-SMLURS3sDMEXMF8mrN8wTl/exec';

  fetch(url, {
    method: 'POST',
    body: new URLSearchParams({
      username: username
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.coins !== undefined) {
      document.getElementById('coins').innerHTML = `<div class="amount"><img src="https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Coin.png"> ${data.coins}</div>`;
    } else {
      document.getElementById('coins').innerText = data.error || "Error fetching coins.";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById('coins').innerText = "An error occurred while fetching coins.";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const username = getUsernameFromLocalStorage();
  fetchUserCoins(username);
});
