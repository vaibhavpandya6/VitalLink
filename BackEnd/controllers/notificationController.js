const { getAccidentNews } = require('../services/newsService');

async function sendNewsNotification(req, res) {
  try {
    const news = await getAccidentNews();
    res.json({
      success: true,
      message: 'Fetched latest accident news',
      data: news
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { sendNewsNotification };
