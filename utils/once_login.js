const { chromium } = require('playwright');
const fs = require('fs');
const readline = require('readline');
const minimist = require('minimist');
const path = require('path');

const args = minimist(process.argv.slice(2));
const username = args.username;
const password = args.password;
const session_filename = args.username+".json";

if (!username || !password || !session_filename) {
    console.error("❌ Please input --username, --password, as argument.");
    process.exit(1);
}

(async () => {
    // Pastikan folder sessions ada
    const sessionsDir = path.join(__dirname, '../sessions');
    if (!fs.existsSync(sessionsDir)) {
        fs.mkdirSync(sessionsDir, { recursive: true });
        console.log(`📁 Folder 'sessions' dibuat.`);
    }

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.instagram.com/accounts/login/', {
        waitUntil: 'networkidle'
    });

    await page.waitForSelector('input[name="username"]');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    console.log("🔐 Please login manually (OTP if needed)");
    console.log("📥 After logged in and entered the main page, press ENTER in terminal...");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('⏳ Waiting for confirmation, press ENTER...\n', async () => {
        // Simpan ke sessions/session_filename
        const fullPath = path.join(sessionsDir, session_filename);
        const storage = await context.storageState();
        fs.writeFileSync(fullPath, JSON.stringify(storage, null, 2));
        console.log(`✅ Session saved into ${fullPath}`);
        await browser.close();
        rl.close();
    });
})();