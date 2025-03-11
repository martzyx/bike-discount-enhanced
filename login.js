chrome.storage.sync.get(['username', 'password'], function(result) {
  if (result.username && result.password) {
//  const usernameField = document.querySelector('input[name="username"]');
//  const passwordField = document.querySelector('input[name="password"]');

//    if (usernameField && passwordField) {
//      usernameField.value = result.username;
//      passwordField.value = result.password;
//    }
    console.log(result.username, result.password)
  }
});
