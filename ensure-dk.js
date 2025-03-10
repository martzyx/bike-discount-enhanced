if (window.location.pathname != "/en/account/logout") {
  const selectedElement = document.querySelector(
    ".delivery .service--entry.selected",
  );
  if (selectedElement) {
    const deliveryValue = selectedElement.getAttribute("data-delivery");
    if (deliveryValue !== "7") {
      const deliveryID = "7";
      document.querySelector(".hidden_delivery_input").value = deliveryID;
      document.querySelector(".delivery--form.desktop").submit();
    }
  }
}
