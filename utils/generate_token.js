const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { db } = require('../database');

function formatUnixTimestamp(ts) {
    const date = new Date(ts * 1000); // ubah ke milidetik
    const pad = n => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const secret = process.env.SECRET_KEY;
if (!secret) {
  console.error("❌ SECRET_KEY has not been set in .env");
  process.exit(1);
}

/**
 * Fungsi utama untuk generate token dan simpan ke DB
 * @param {string} username 
 * @param {number|string|null} expiryInSeconds - optional, dalam detik. Null/0 berarti tanpa expiry.
 * @returns {object} { token, issuedAt, expiredAt }
 */
function generateToken(username, expiryInSeconds = null) {
  if (!username) throw new Error('Parameter username is required.');

  const payload = { username };
  let token;
  let decoded;

  if (expiryInSeconds && expiryInSeconds !== '0') {
    const seconds = parseInt(expiryInSeconds);
    if (isNaN(seconds)) throw new Error('Expiry must be a number in seconds.');
    token = jwt.sign(payload, secret, { expiresIn: seconds });
  } else {
    token = jwt.sign(payload, secret);
  }

  decoded = jwt.verify(token, secret);

  const issuedAt = formatUnixTimestamp(decoded.iat);
  const expiredAt = typeof decoded.exp === 'number' ? formatUnixTimestamp(decoded.exp) : null;

  // Simpan ke database
  const stmt = db.prepare(`
    INSERT INTO tokens (username, token, issued_at, expired_at)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(username, token, issuedAt, expiredAt);

  return { token, issuedAt, expiredAt };
}

// If executed via CLI
if (require.main === module) {
  // Get args from CLI
  const args = process.argv.slice(2);
  const params = {};

  args.forEach(arg => {
    const [key, value] = arg.replace(/^--/, '').split('=');
    params[key] = value;
  });

  if (!params.username) {
    console.error("❌ Parameter --username must be exist. Example: --username=yourusername");
    process.exit(1);
  }

  try {
    const { token, issuedAt, expiredAt } = generateToken(params.username, params.expiry);

    console.log(params.expiry && params.expiry !== '0'
      ? `✅ Token with expiry (${params.expiry} s):`
      : '✅ Token without expiration (unlimited):');

    console.log('Issued at:', issuedAt);
    if (expiredAt) console.log('Expires at:', expiredAt);

    console.log('\n' + token);
    console.log('\n✅ Token saved into database.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Function exports as module
module.exports = { generateToken };
