import os

from dotenv import load_dotenv
from flask import Flask, render_template, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix

os.environ["TERM"] = "dumb"

load_dotenv()

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

app.config["SECRET_KEY"] = os.getenv(
    "SECRET_KEY",
    "If you are a fool this will be your secret key",
)
app.config["DEBUG"] = False

current_dir = os.path.dirname(os.path.abspath(__file__))
app.static_folder = os.path.join(current_dir, "static")
app.template_folder = os.path.join(current_dir, "templates")


@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


PROJECTS = [

    {
        "name": "GoSH",
        "status": "Active",
        "description": "GoSH is a toy shell written in Go for learning purposes.",
        "technologies": ["Go"],
        "link": "https://github.com/noxire-dev/GoSH",
    },

    {
        "name": "Moji",
        "status": "Active",
        "description": "Note taking and todo app with a focus on UI/X design",
        "technologies": ["Python", "Flask", "JavaScript"],
        "link": "https://github.com/noxire-dev/moji",
    },
    {
        "name": "LoreKeeper",
        "status": "Active",
        "description": "E-Commerce Website for Free Tabletop RPGs",
        "technologies": ["Python", "JavaScript"],
        "link": "https://github.com/noxire-dev/LoreKeeper",
    },
    {
        "name": "Midnight Moon Theme Collection",
        "status": "Active",
        "description": "A vscode extension containing a set of themes themes I developed",
        "technologies": ["Json"],
        "link": "https://github.com/noxire-dev/midnight-theme",
    },
    {
        "name": "UzmanParaScraper",
        "status": "Active",
        "description": "Website Scraper for BIST100 and getting the latest news about them",
        "technologies": ["Python", "Flask", "BeautifulSoup4"],
        "link": "https://github.com/noxire-dev/UzmanParaScraper",
    },
    {
        "name": "Miles&Miles",
        "status": "On Hold",
        "description": "Flight App for Finding Cheap Flights",
        "technologies": ["Python", "API Integration"],
        "link": "https://github.com/noxire-dev/MilesnMiles",
    },
    {
        "name": "F1 Simulator/TRPG",
        "status": "On Hold",
        "description": "A text-based simulator for F1 in purpose of turning into a TRPG",
        "technologies": ["Python"],
        "link": "https://github.com/noxire-dev/F1-Simulator",
    }
]

UPDATES = [
    {
        "date": "2025-08-28",
        "title": "Finished my first year at university",
        "content": "I finished my first year at the University of Essex and couldn’t be happier with the results — I achieved 96/100 overall and a First Class. I’m proud of the work I put in, and grateful for the support and guidance I had along the way. Really excited to carry this momentum into my second year!",
        "tags": ["development", "university", "first year", "results"],
    },
    {
        "date": "2025-07-15",
        "title": "Working on Moji",
        "content": "I'm working on a note taking and todo app with a focus on UI/X design. It's a simple app that I'm developing for my own use but I think it can be useful for others as well. I'm using Flask for the backend and SQLite for the database. I'm also using HTML, CSS and JavaScript for the frontend. I'm using the latest technologies and best practices.",
        "tags": [
            "development",
            "Moji",
            "Flask",
            "SQLite",
            "HTML",
            "CSS",
            "JavaScript",
            "Noku",
        ],
    },
    {
        "date": "2025-02-23",
        "title": "Started Learning C",
        "content": "I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works. It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun + loving the simplicity and syntax of C.",
        "tags": ["learning", "C", "low-level"],
    }
]

# Language badges only (no tools)
LANGUAGE_BADGES = ["Python", "Go", "Java", "JavaScript"]

LANGUAGES = {
    "golang": {
        "color": "#00ADD8",
        "name": "Golang",
    },
    "python": {
        "color": "#38B2AC",
        "name": "Python",
    },
    "javascript": {
        "color": "#ECC94B",
        "name": "JavaScript",
    },
    "typescript": {
        "color": "#63B3ED",
        "name": "TypeScript",
    },
    "html": {
        "color": "#F56565",
        "name": "HTML",
    },
    "css": {
        "color": "#9F7AEA",
        "name": "CSS",
    },
    "java": {
        "color": "#ED64A6",
        "name": "Java",
    },
    "flask": {
        "color": "#38B2AC",
        "name": "Flask",
    },
    "sqlite": {
        "color": "#003B57",
        "name": "SQLite",
    },
    "beautifulsoup4": {
        "color": "#38B2AC",
        "name": "BeautifulSoup4",
    },
    "api": {
        "color": "#718096",
        "name": "API Integration",
    },
    "api integration": {
        "color": "#718096",
        "name": "API Integration",
    },
    "json": {
        "color": "#48BB78",
        "name": "JSON",
    },
}

root = {
    "terminal_bg": "#000000",
    "terminal_text": "#ffffff",
    "terminal_accent": "#ffffff",
    "terminal_header": "#111111",
    "terminal_border": "#222222",
    "terminal_dim": "rgba(255, 255, 255, 0.1)",
}


@app.route("/")
def home():
    return render_template(
        "index.html",
        projects=PROJECTS,
        updates=UPDATES,
        languages=LANGUAGES,
        language_badges=LANGUAGE_BADGES,
    )


if __name__ == "__main__":
    app.run(debug=True)
