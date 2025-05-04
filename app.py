import os

from dotenv import load_dotenv
from flask import Flask, render_template, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix

# Set TERM environment variable to suppress tput warning
os.environ["TERM"] = "dumb"

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure app using environment variables
# Set a default secret key if none is provided in .env
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "your-default-secret-key-here")
# Force DEBUG to False in production
app.config["DEBUG"] = False

# Set the static and template folders explicitly with absolute paths
current_dir = os.path.dirname(os.path.abspath(__file__))
app.static_folder = os.path.join(current_dir, "static")
app.template_folder = os.path.join(current_dir, "templates")


# Add explicit route for static files
@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


# Sample data - you can replace with database calls later
PROJECTS = [
    {
        "name": "UzmanParaScraper",
        "status": "Active",
        "description": "Website Scraper for BIST100",
        "technologies": ["Python", "BeautifulSoup4"],
        "link": "https://github.com/Noxire-Hash/UzmanParaScraper",
    },
    {
        "name": "Midnight Moon Theme Collection",
        "status": "Active",
        "description": "A vscode extension containing a set of themes themes I developed",
        "technologies": ["Json"],
        "link": "https://github.com/Noxire-Hash/midnight-theme",
    },
    {
        "name": "Miles&Miles",
        "status": "On Hold",
        "description": "Flight App for Finding Cheap Flights",
        "technologies": ["Python", "API Integration"],
        "link": "https://github.com/Noxire-Hash/MilesnMiles",
    },
    {
        "name": "F1 Simulator/TRPG",
        "status": "On Hold",
        "description": "A text-based simulator for F1 in purpose of turning into a TRPG",
        "technologies": ["Python"],
        "link": "https://github.com/Noxire-Hash/F1-Simulator",
    },
    {
        "name": "Zen Design",
        "status": "Completed",
        "description": "A design portfolio for a non-existing company",
        "technologies": ["HTML", "CSS"],
        "link": "https://github.com/Noxire-Hash/Zen-Design",
    },
    {
        "name": "SazBoz",
        "status": "Discontinued",
        "description": "A discord bot that can played music and helped with moderation now it is discontinued",
        "technologies": ["JavaScript"],
        "link": "_blank",
    },
]

UPDATES = [
    {
        "date": "2025-02-23",
        "title": "Started Learning C",
        "content": "I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works. It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun + loving the simplicity and syntax of C.",
        "tags": ["learning", "C", "low-level"],
    },
    {
        "date": "2025-02-30",
        "title": "Portfolio Website Launch",
        "content": "Finally launched my personal portfolio website with a terminal-inspired design. Built with Flask and vanilla JavaScript. Planning to add more projects and features soon.",
        "tags": ["web-dev", "portfolio", "flask"],
    },
]

# Add this to your existing variables in app.py
SKILLS = [
    {"name": "Python", "color": "#3776AB", "category": "language", "progress": 90},
    {"name": "HTML/CSS", "color": "#E34F26", "category": "web", "progress": 85},
    {"name": "Flask", "color": "#3776AB", "category": "framework", "progress": 75},
    {"name": "Assembly", "color": "#6E4C13", "category": "language", "progress": 50},
    {"name": "Java", "color": "#007396", "category": "language", "progress": 50},
    {"name": "JavaScript", "color": "#F7DF1E", "category": "language", "progress": 55},
    {"name": "Git", "color": "#F05032", "category": "tool", "progress": 80},
    {"name": "SQL", "color": "#4479A1", "category": "database", "progress": 70},
]

# Add this to your existing variables in app.py
LANGUAGES = {
    "python": {
        "color": "#38B2AC",  # Teal
        "name": "Python",
    },
    "javascript": {
        "color": "#ECC94B",  # Yellow
        "name": "JavaScript",
    },
    "typescript": {
        "color": "#63B3ED",  # Blue
        "name": "TypeScript",
    },
    "html": {
        "color": "#F56565",  # Red
        "name": "HTML",
    },
    "css": {
        "color": "#9F7AEA",  # Purple
        "name": "CSS",
    },
    "java": {
        "color": "#ED64A6",  # Pink
        "name": "Java",
    },
    "beautifulsoup4": {
        "color": "#38B2AC",  # Match Python
        "name": "BeautifulSoup4",
    },
    "api": {
        "color": "#718096",  # Gray
        "name": "API Integration",
    },
    "api integration": {
        "color": "#718096",  # Gray
        "name": "API Integration",
    },
    "json": {
        "color": "#48BB78",  # Green
        "name": "JSON",
    },
}

# Update theme colors for a more professional look
root = {
    "terminal_bg": "#000000",  # Pure black
    "terminal_text": "#ffffff",  # Pure white
    "terminal_accent": "#ffffff",  # White accent
    "terminal_header": "#111111",  # Slightly lighter than bg
    "terminal_border": "#222222",  # Subtle border
    "terminal_dim": "rgba(255, 255, 255, 0.1)",  # Transparent white
}


@app.route("/")
def home():
    return render_template(
        "index.html",
        projects=PROJECTS,
        updates=UPDATES,
        skills=SKILLS,
        languages=LANGUAGES,
    )


if __name__ == "__main__":
    app.run(debug=True)
