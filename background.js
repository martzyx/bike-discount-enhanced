chrome.runtime.onInstalled.addListener(() => {
  console.log('bike-discount enhanced extension installed');
});

const username = 'your_username';
const password = 'your_secure_password';

chrome.storage.local.set({ username: username, password: password }, function() {
    console.log('Username and password is set');
});
