from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import requests, re, os
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NODE_API_URL = os.getenv("NODE_API_URL")

scheduler = BackgroundScheduler()

def extract_injury_count(text: str) -> int:
    """Extract or estimate number of injured people from text using regex and keywords."""
    if not text:
        return 0

    text = text.lower()

    # Direct number + keyword match (e.g., "50 injured", "20 hurt")
    match = re.search(r"(\d+)\s*(injured|hurt|wounded|hospitalized|dead|killed)", text)
    if match:
        return int(match.group(1))

    # Approximate terms
    if "dozens" in text:
        return 24
    if "scores" in text:
        return 40
    if "hundreds" in text:
        return 100
    if "thousands" in text:
        return 1000
    if "multiple" in text or "several" in text or "many" in text:
        return 10
    if "critically injured" in text:
        return 2  # treat small but serious incidents too

    return 0


def process_news():
    print("📰 Fetching latest accident news...")
    try:
        res = requests.get(
            "https://newsapi.org/v2/everything",
            params={
                "q": "accident OR crash OR collision OR disaster OR explosion",
                "language": "en",
                "sortBy": "publishedAt",
                "pageSize": 10,
                "apiKey": NEWS_API_KEY,
            },
            timeout=10,
        )

        if res.status_code != 200:
            print(f"❌ NewsAPI error: {res.status_code} {res.text}")
            return

        articles = res.json().get("articles", [])
        print(f"✅ {len(articles)} articles fetched.")

        for article in articles:
            desc = article.get("description", "")
            injury_count = extract_injury_count(article.get("description", ""))
            print(f"📰 {article.get('title', '')} → found {injury_count} injuries")
            if injury_count >= 10: 
            
                alert = {
                    "title": article.get("title", "Accident Alert"),
                    "city": article.get("source", {}).get("name", "Unknown"),
                    "patientsAffected": injury_count,
                    "bloodNeeded": ["O+", "A+", "B+"],
                }

                print(f"🔗 Sending alert to Node.js at {NODE_API_URL}")
                print(f"🧾 Alert payload: {alert}")

                try:
                    response = requests.post(NODE_API_URL, json=alert, timeout=5)
                    print(f"✅ Node.js responded with: {response.status_code} {response.text}")
                except Exception as e:
                    print(f"❌ Error while contacting Node.js: {e}")

    except Exception as err:
        print("❌ Error fetching news:", err)


@app.get("/api/alerts/trigger")
def trigger_alert(background_tasks: BackgroundTasks):
    """Manual trigger to fetch & analyze news."""
    background_tasks.add_task(process_news)
    return {"success": True, "message": "Background task started."}


@app.on_event("startup")
def start_scheduler():
    """Start the automatic scheduler when the app launches."""
    print("⏰ Starting automatic accident news checker (every 10 minutes)...")
    scheduler.add_job(process_news, "interval", minutes=10, id="news_job", replace_existing=True)
    scheduler.start()


@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()
    print("🛑 Scheduler stopped.")
