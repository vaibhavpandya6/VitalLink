const axios = require('axios');

async function getAccidentNews() {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=accident&sortBy=publishedAt&apiKey=3471cb7865de46e4ac3e11ad34fb924c`
    );

    return response.data.articles.slice(0, 5); // return top 5 latest
  } catch (error) {
    console.error("Error fetching news:", error.message);
    return [];
  }
}

module.exports = { getAccidentNews };
