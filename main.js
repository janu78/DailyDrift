// const apikey = config.NEWS_API_KEY;


//         const blogcontainer = document.getElementById("blog");
//         const searchField = document.getElementById('search');
//         const searchButton = document.getElementById('search-btn');

//         async function fetchRandomNews() {
//             try {
//                 const proxy = "https://api.allorigins.win/raw?url=";
//                 const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apikey}`;
//                 const finalUrl = proxy + encodeURIComponent(apiUrl);

//                const response = await fetch(finalUrl); //to get data,then return
//                 const data = await response.json();
//                 return data.articles;
//             } catch (error) {
//                 console.error("Error fetching random news", error);
//                 return [];
//             }
//         }

//         async function fetchNewsByQuery(query) {
//             try {
                // const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apikey=${apikey}`;
                // const response = await fetch(apiUrl);
        //         const proxy = "https://api.allorigins.win/raw?url=";
        //         const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apikey=${apikey}`;
        //         const finalUrl = proxy + encodeURIComponent(apiUrl);

        //         const response = await fetch(finalUrl);

        //         const data = await response.json();
        //         return data.articles;
        //     } catch (error) {
        //         console.error("Error fetching news by query", error);
        //         return [];
        //     }
        // }

        // function displayBlog(articles) {
        //     blogcontainer.innerHTML = "";
        //     articles.forEach((article) => {
        //         const blogcard = document.createElement("div");
        //         blogcard.classList.add("blog-card");

                //Image
                // const img = document.createElement("img");
                // img.src = article.urlToImage || 'https://placehold.co/600x400';
                // img.alt = article.title;

                //Title
                // const title = document.createElement("h2");
                // const truncatedTitle = article.title?.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
                // title.textContent = truncatedTitle || "No Title";

                //Description
                // const description = document.createElement("p");
                // const truncatedDes = article.description?.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
                // description.textContent = truncatedDes || "No Description Available";

                //Add to DOM
                // blogcard.appendChild(img);
                // blogcard.appendChild(title);
                // blogcard.appendChild(description);

                //Open full article on click
        //         blogcard.addEventListener('click', () => {
        //             window.open(article.url, "_blank");
        //         });

        //         blogcontainer.appendChild(blogcard);
        //     });
        // }

        // searchButton.addEventListener("click", async () => {
        //     const query = searchField.value.trim();
        //     if (query !== "") {
        //         try {
        //             const articles = await fetchNewsByQuery(query);
        //             displayBlog(articles);
        //         } catch (error) {
        //             console.error("Error searching news", error);
        //         }
        //     }
        // });

        // (async () => {
        //     try {
        //         const articles = await fetchRandomNews();
        //         displayBlog(articles);
        //     } catch (error) {
        //         console.error("Error initializing news", error);
        //     }
        // })();


        const apikey = config.NEWS_API_KEY;
const blogcontainer = document.getElementById("blog");
const searchField = document.getElementById('search');
const searchButton = document.getElementById('search-btn');

// Proxy to bypass CORS & 426 error
const proxy = "https://api.allorigins.win/raw?url=";

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apikey}`;
        const response = await fetch(proxy + encodeURIComponent(apiUrl));
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

async function fetchNewsByQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apikey}`;
        const response = await fetch(proxy + encodeURIComponent(apiUrl));
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlog(articles) {
    blogcontainer.innerHTML = "";

    if (!Array.isArray(articles)) {
        blogcontainer.innerHTML = "<p style='color:white;'>No news available or API error.</p>";
        return;
    }

    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'https://placehold.co/600x400';
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title?.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle || "No Title";

        const description = document.createElement("p");
        const truncatedDes = article.description?.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
        description.textContent = truncatedDes || "No Description Available";

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);

        blogcard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogcontainer.appendChild(blogcard);
    });
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        const articles = await fetchNewsByQuery(query);
        displayBlog(articles);
    }
});

(async () => {
    const articles = await fetchRandomNews();
    displayBlog(articles);
})();


        
        