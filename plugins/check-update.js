const axios = require('axios');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
  pattern: 'version',
  alias: ["changelog", "cupdate", "checkupdate"],
  react: '🚀',
  desc: "Check bot's version, system stats, and update info.",
  category: 'info',
  filename: __filename
}, async (conn, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    // Read local version data
    const localVersionPath = path.join(__dirname, '../data/version.json');
    let localVersion = 'Unknown';
    let changelog = 'No changelog available.';
    if (fs.existsSync(localVersionPath)) {
      const localData = JSON.parse(fs.readFileSync(localVersionPath));
      localVersion = localData.version;
      changelog = localData.changelog;
    }

    // Fetch latest version data from GitHub
    const rawVersionUrl = 'https://raw.githubusercontent.com/XdTechPro/KHAN-MD/main/data/version.json';
    let latestVersion = 'Unknown';
    let latestChangelog = 'No changelog available.';
    try {
      const { data } = await axios.get(rawVersionUrl);
      latestVersion = data.version;
      latestChangelog = data.changelog;
    } catch (error) {
      console.error('Failed to fetch latest version:', error);
    }

    // Count total plugins
    const pluginPath = path.join(__dirname, '../plugins');
    const pluginCount = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js')).length;

    // Count total registered commands
    const totalCommands = commands.length;

    // System info
    const uptime = runtime(process.uptime());
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
    const hostName = os.hostname();
    const lastUpdate = fs.statSync(localVersionPath).mtime.toLocaleString();

    // GitHub stats
    const githubRepo = 'https://github.com/XdTechPro/KHAN-MD';

    // Check update status
    let updateMessage = `✅ Your DILSHAN-MD V1 bot is up-to-date!`;
    if (localVersion !== latestVersion) {
      updateMessage = `🚀 Your DILSHAN-MD V1 bot is outdated!
🔹 *Current Version:* ${localVersion}
🔹 *Latest Version:* ${latestVersion}

Use *.update* to update.`;
    }

    const statusMessage = `╔═━「 💠 𝐃𝐈𝐋𝐒𝐇𝐀𝐍-𝐌𝐃 𝐔𝐏𝐃𝐀𝐓𝐄 𝐁𝐎𝐗 💠 」━═╗

🌟 Good new Date().getHours() < 12 ? 'Morning' : 'Night', *{pushname}* 🌟

╔═══❖ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 ❖═══╗
📌 *Bot Name*       : DILSHAN-MD V1
🔖 *Current Ver.*   : localVersion
📢 *Latest Ver.*    :{latestVersion}
📂 *Total Plugins*  : pluginCount
🔢 *Total Commands* :{totalCommands}
╚═══════════════════╝

╔═══❖ 𝐒𝐘𝐒𝐓𝐄𝐌 ❖═══╗
⏳ *Uptime*         : uptime
📟 *RAM Usage*      :{ramUsage}MB / totalRamMB
⚙️ *Host Name*      :{hostName}
📅 *Last Update*    : lastUpdate
╚══════════════════╝

╔═══❖ 𝐂𝐇𝐀𝐍𝐆𝐄𝐋𝐎𝐆 ❖═══╗
📝{latestChangelog}
╚═════════════════════╝

⭐ GitHub: https://github.com/DILSHAN542/DILSHAN-MD-V2  
👤 *Owner:* ❖ Dilshan Ashinsa ➣ (GitHub Profile)

${updateMessage}

🚀 *Hey! Don't forget to fork & ⭐ the repo!*`;
    // Send the status message with an image
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/g50hun.m4a' },
      caption: statusMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363419308807922@newsletter',
          newsletterName: '𝐃𝐈𝐋𝐒𝐇𝐀𝐍 𝐌𝐃 𝐯1',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });
  } catch (error) {
    console.error('Error fetching version info:', error);
    reply('❌ An error occurred while checking the bot version.');
  }
});
