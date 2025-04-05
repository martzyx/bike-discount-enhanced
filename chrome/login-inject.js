(function() {
    try {
        if (window.dataLayer) {
            const clonedDataLayer = JSON.parse(JSON.stringify(window.dataLayer));

            window.postMessage({ type: "FROM_PAGE", dataLayer: clonedDataLayer }, "*");
        }
    } catch (error) {
        console.error("bike-discount enhaced: Error accessing dataLayer:", error);
    }
})();
