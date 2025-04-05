function injectScript(file) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(file);
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

injectScript("login-inject.js");

let extractedDataLayer = null;
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "FROM_PAGE") {
    extractedDataLayer = event.data.dataLayer;
    login(extractedDataLayer);
  }
});

function login(data) {
  console.log("bike-discount enhaced pre-status:", data[0].visitorLoginState);
  if (data[0].visitorLoginState == "Logged Out") {
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
          },
        )
          .then((data) => {
            if (typeof data === "string") {
              console.error("Login failed:", data);
            } else {
              console.log("Success:", data);
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
  } else {
    console.log("bike-discount enhanced: already logged in");
  }
}
