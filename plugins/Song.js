///////code by Pathum Malsara👨‍💻


const config = require('../config');
const { cmd, commands } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js'); 
const fetch = require('node-fetch');

let songStore = {}; // temp store to map message ID to download URL

cmd({
    pattern: "song",
    react: "🎶",
    desc: "Download Youtube song in Audio / Document / Voice format",
    category: "main",
    use: '.song < YT Name or URL >',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🔎 *Please provide a YouTube URL or song name.*");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("❌ *No results found!*");

        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
            return reply("❌ *Failed to fetch the audio.*");
        }

        let msg = `*🎶 LUXALGO XD SONG DOWNLOADER 🎶*

╭━━❐━⪼
┇🎵 *Title* : ${yts.title}
┇⏱️ *Duration* : ${yts.timestamp}
┇👤 *Author* : ${yts.author.name}
┇🔗 *Link* : ${yts.url}
╰─────────────✦

*Select a number to download:*
1️⃣ Audio 🎶  
2️⃣ Document 📁  
3️⃣ Voice Note 🎙️

> _Reply with the number only (1/2/3) to download._

© Powered by Luxalgo ♡`;

        let sent = await conn.sendMessage(from, { image: { url: data.result.image || '' }, caption: msg }, { quoted: mek });

        // store info with message ID
        songStore[sent.key.id] = {
            url: data.result.downloadUrl,
            title: data.result.title
        };

    } catch (e) {
        console.log(e);
        reply("⚠️ *Error occurred. Please try again later.*");
    }
});

// 🎯 Reply handler to catch 1 / 2 / 3
commands.push({
    on: "text",
    fromMe: false,
    async run(conn, mek, m) {
        const quoted = mek.quoted;
        const text = mek.body?.trim();

        if (!quoted || !songStore[quoted.id]) return;

        const choice = text;

        const song = songStore[quoted.id];
        if (!song || !song.url) return;

        try {
            if (choice === '1') {
                await conn.sendMessage(mek.chat, { audio: { url: song.url }, mimetype: "audio/mpeg" }, { quoted: mek });
            } else if (choice === '2') {
                await conn.sendMessage(mek.chat, {
                    document: { url: song.url },
                    mimetype: "audio/mpeg",
                    fileName: `${song.title}.mp3`,
                    caption: `🎶 *${song.title}*\n📁 Format: Document\n\n©LUXALGO XD ♡`
                }, { quoted: mek });
            } else if (choice === '3') {
                await conn.sendMessage(mek.chat, {
                    audio: { url: song.url },
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, { quoted: mek });
            } else {
                await conn.sendMessage(mek.chat, { text: "❌ Invalid choice. Please reply with 1, 2, or 3." }, { quoted: mek });
            }

            // delete from store to prevent repeat
            delete songStore[quoted.id];

        } catch (err) {
            console.log(err);
            await conn.sendMessage(mek.chat, { text: "⚠️ Error while sending the file." }, { quoted: mek });
        }
    }
});
