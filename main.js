const apikey = config.GNEWS_API_KEY;

const blogcontainer = document.getElementById("blog");
const searchField = document.getElementById('search');
const searchButton = document.getElementById('search-btn');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=15&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!data.articles || !Array.isArray(data.articles)) throw new Error("No articles found");
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        displayErrorMessage(error.message);
        return [];
    }
}

async function fetchNewsByQuery(query) {
    try {
        const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=15&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!data.articles || !Array.isArray(data.articles)) throw new Error("No articles found");
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        displayErrorMessage(error.message);
        return [];
    }
}

function displayBlog(articles) {
    blogcontainer.innerHTML = "";
    if (!articles || articles.length === 0) {
        displayErrorMessage("No articles to display.");
        return;
    }

    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image || 'https://placehold.co/600x400';
        img.alt = article.title || "No Image";

        const title = document.createElement("h2");
        title.textContent = article.title?.slice(0, 40) + '...' || "No Title";

        const description = document.createElement("p");
        description.textContent = article.description?.slice(0, 120) + '...' || "No Description Available";

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);

        blogcard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogcontainer.appendChild(blogcard);
    });
}

function displayErrorMessage(message) {
    blogcontainer.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query) {
        const articles = await fetchNewsByQuery(query);
        displayBlog(articles);
    }
});

(async () => {
    const articles = await fetchRandomNews();
    displayBlog(articles);
})();

    

        
        
