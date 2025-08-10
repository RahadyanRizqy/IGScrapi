# Instagram Scraper REST API

A light REST API to scrape Instagram posts and reels direct URL in HD using real-agent (real account) from public/private profiles without using the official Instagram API. This API fetches and provides a simple JSON format for easy integration.

---

## Table of Contents

- [Features](#features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Example Response](#example-response)  
- [Requirements](#requirements)
---

## Features

- Scrape Instagram posts (photos/videos of captions of users)  
- Scrape Instagram reels with media URLs and metadata  
- JSON API responses for easy parsing  
- No dependency on official Instagram API (scrapes public web data)  
- Simple REST endpoints with clear URL patterns  

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/instagram-scraper-api.git
   cd instagram-scraper-api

2. **Install dependencies**
    ```bash
    npm install

3. **Install playwright**
    ```bash
    npx playwright install
    npx playwright install-deps

4. **Initial login (need UI interaction)**
    ```bash
    node utils/once_login.json --username=yourusername --password=yourpassword
This will open a chromium browser, make sure to enter OTP (if any) and open the main page of the IG.

5. **Initial database creation**
    ```bash
    node utils/init_db.js

6. **Set secret key and session path in .env before creating a token**
    ```bash
    SERVER_HOST=0.0.0.0
    SERVER_PORT=3950
    RATE_LIMIT_PER_MINUTE=5
    SECRET_KEY=secret

    HEADLESS=FALSE
    LOGGER=FALSE
    API_LABEL="RahadyanDev's IG Posts API Result"
    SOCKET=FALSE

    REST_API=TRUE
    ALT_LENGTH=10
    UNIX_SOCKET=/tmp/igscrapi.sock
    WIN_SOCKET=\\.\pipe\igscrapisocket

    SESSION_PATH=./session.json

7. **Initial token**
    ```bash
    node utils/generate_token.js --username=yourusername

8. **Start the server**
    ```bash
    node index.js

## Usage 
### (POST Method)
Get User Posts/Reel (RAW)
- Endpoint: ```/api/scrape```
- Method: ```POST```
- Body Raw: ```{ url: "ig posts/reel url" }```
- Desc: Retrieve raw results/details of the post/reel

Get User Posts/Reel (Simple)
- Endpoint: ```/api/posts```
- Method: ```POST```
- Body Raw: ```{ url: "ig posts/reel url" }```
- Desc: Retrieve simple results/details of the post/reel

### (GET Method)
Get User Posts/Reel (RAW)
- Endpoint: ```/api/scrape?token=yourtoken&url=yoururl&html```
- Method: ```GET```
- HTML params: ```html for html mode/without html if json```
- Desc: Retrieve raw results/details of the post/reel

Get User Posts/Reel (Simple)
- Endpoint: ```/api/posts?token=yourtoken&url=yoururl&html```
- Method: ```GET```
- HTML params: ```html for html mode/without html if json```
- Desc: Retrieve simple results/details of the post/reel


## Example Response (POST or GET /api/posts)
    {
        "success": true,
        "fetch": "direct",
        "timestamp": "2025-08-10 10:16:18",
        "user_details": {
            "id": 1,
            "username": "zelretch",
            "issued_at": 1754793214,
            "duration": "0"
        },
        "data": {
            "instagram_url": "https://www.instagram.com/reel/DMxhJKCzQhn",
            "caption": "Kejahilan kecil\n\nSupport akun meme original ANTI JUDOL dengan donate ke saweria/trakteer sekaligus biar admin makin semangat nge-meme 😁 (link di bio)\n\n➡️Follow @msaf_pmeme.exe untuk asupan \n▪️meme original setiap hari (insyaallah)\n▪️\n▪️\n➡️Follback? comment\n▪️\n▪️\n▪️\n➡️Sumber: @msaf_pmeme.exe \n▪️\n〰️〰️〰️〰️〰️〰️\nJangan lupa\n✅Follow\n📁Simpan\n👍Like\n💬Comment\n↗️Share\n〰️〰️〰️〰️〰️〰️\n#kaburajadulu #memeindonesia #berita #beritaviral #viralmemes #trending #buzzer #indomesiagelap #relatable #lucu #ngakak #memes #memepage #meme #fyp #joke",
            "owner": "msaf_pmeme.exe",
            "media": {
                "type": "image",
                "alt_url": "http://10.0.0.96:3950/api/media/dlaJRiyl8M",
                "url": "https://instagram.fsub8-2.fna.fbcdn.net/v/t51.2885-15/526078635_17909117892193660_3941088899002288468_n.webp?efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjgyNzg3LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fsub8-2.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QHdWmQoosHWFLzrAZNX4EPeTuhvIwamHI6V68IimtwG_0O-k6sfPNyGtXNW1RUVZTk&_nc_ohc=-KJ5_kZwpH4Q7kNvwHo55Q3&_nc_gid=RMAP9YamlmVXxqDqLJkuGg&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzY4ODg3NTMzNDU4NzcxMzYzOQ%3D%3D.3-ccb7-5&oh=00_AfU8qZdXxj9fIG2bnfVN5yObw6k3tofF9GzbDKgGpi6rEQ&oe=689E3A04&_nc_sid=10d13b",
                "width": 1440,
                "height": 1440
            }
        }
    }

## Requirements
- Node.js v14 or higher
- Real IG account (use atomicmail.io/pinmx.net for valid temp email)