const loginStatusEl = document.querySelector(".account--link");
if (
  loginStatusEl &&
  !loginStatusEl.classList.contains("account--user-loggedin")
) {
  //  if (window.dataLayer[0].visitorLoginState == "Logged Out") {
  chrome.storage.sync.get(["username", "password"], function (result) {
    if (result.username && result.password) {
      const csrfToken = getCookieValue("__csrf_token-1");
      const formData = new FormData();
      formData.append("sTarget", "account");
      formData.append("email", result.username);
      formData.append("password", result.password);
      formData.append("__csrf_token", csrfToken);

      fetch(
        "https://www.bike-discount.de/en/account/login/sTarget/account/sTargetAction/index",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((data) => {
          if (typeof data === "string") {
            console.error("Login failed:", data);
          } else {
            console.log("Success:", data);
            //          location.reload();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      function getCookieValue(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      }
    }
  });
}
