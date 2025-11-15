from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import requests, re, os, json
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

# ---------------------------------------------------------
# 1️⃣ List of major cities (extend as needed)
# ---------------------------------------------------------
CITY_LIST = [
    "Mumbai","Delhi","New Delhi","Bengaluru","Bangalore","Chennai","Kolkata","Hyderabad",
    "Pune","Nagpur","Indore","Jaipur","Ahmedabad","Surat","Lucknow","Kanpur",
    "Patna","Bhopal","Thane","Noida","Gurgaon","Guwahati","Kochi","Visakhapatnam",
    "London","Paris","New York","Los Angeles","Chicago","Tokyo","Dubai","Sydney"
]

CITY_REGEX = re.compile(r"\b(" + "|".join(CITY_LIST) + r")\b", re.IGNORECASE)

# ---------------------------------------------------------
# 2️⃣ Injury Count Extraction
# ---------------------------------------------------------
def extract_injury_count(text: str) -> int:
    if not text:
        return 0

    text = text.lower()

    match = re.search(r"(\d+)\s*(injured|hurt|wounded|hospitalized|dead|killed)", text)
    if match:
        return int(match.group(1))

    if "dozens" in text: return 24
    if "scores" in text: return 40
    if "hundreds" in text: return 100
    if "thousands" in text: return 1000
    if "multiple" in text or "several" in text or "many" in text: return 10
    if "critically injured" in text: return 2

    return 0

# ---------------------------------------------------------
# 3️⃣ City Extraction from title + description
# ---------------------------------------------------------
def extract_city(title: str, description: str, source_name: str) -> str:
    combined = f"{title} {description}"

    # direct match in list
    match = CITY_REGEX.search(combined)
    if match:
        return match.group(1)

    # generic location pattern "in <city>"
    pattern = re.search(r"in ([A-Za-z ]+)", combined)
    if pattern:
        city_candidate = pattern.group(1).strip()
        if len(city_candidate) <= 20:
            return city_candidate

    # fallback: source name sometimes contains city
    if source_name and len(source_name) <= 20:
        return source_name

    return "Unknown"

# ---------------------------------------------------------
# 4️⃣ Prevent Duplicate Alerts
# ---------------------------------------------------------
sent_alerts_cache = set()

def is_duplicate(title: str) -> bool:
    key = title.lower().strip()
    if key in sent_alerts_cache:
        return True
    sent_alerts_cache.add(key)
    return False

# ---------------------------------------------------------
# 5️⃣ Main News Processing
# ---------------------------------------------------------
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
            title = article.get("title", "")
            desc = article.get("description", "")
            source_name = article.get("source", {}).get("name", "")

            if is_duplicate(title):
                print(f"⚠ Duplicate news skipped → {title}")
                continue

            injury_count = extract_injury_count(desc)
            city = extract_city(title, desc, source_name)

            print(f"📰 {title} → injuries: {injury_count}, city: {city}")

            if injury_count >= 10:
                alert = {
                    "title": title,
                    "city": city,
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

# ---------------------------------------------------------
# 6️⃣ API Endpoints
# ---------------------------------------------------------
@app.get("/api/alerts/trigger")
def trigger_alert(background_tasks: BackgroundTasks):
    background_tasks.add_task(process_news)
    return {"success": True, "message": "Background task started."}


@app.on_event("startup")
def start_scheduler():
    print("⏰ Starting automatic accident news checker (every 10 minutes)...")
    scheduler.add_job(process_news, "interval", minutes=10, id="news_job", replace_existing=True)
    scheduler.start()


@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()
    print("🛑 Scheduler stopped.")