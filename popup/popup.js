document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  chrome.storage.sync.set({ username, password }, function() {
    alert('Login credentials saved!');
  });
});
