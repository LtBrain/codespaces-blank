const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
        // Send a request to the proxy server
        fetch(`/proxy?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(results => {
                searchResults.innerHTML = ""; // Clear previous results

                // Display results (assuming the server returns an array of search results)
                results.forEach(result => {
                    const link = document.createElement("a");
                    link.href = result.url;
                    link.textContent = result.title;
                    searchResults.appendChild(link);
                    searchResults.appendChild(document.createElement("br")); 
                });
            })
            .catch(error => {
                console.error("Error:", error);
                searchResults.innerHTML = "Error fetching results.";
            });
    }
});