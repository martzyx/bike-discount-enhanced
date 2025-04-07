document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  browser.storage.sync.set({ username, password }).then(() => {
    alert('Login credentials saved!');
  });
}); 