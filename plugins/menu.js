const { cmd, commands } = require("../command");
const config = require('../config');
const { runtime } = require("../lib/functions");

cmd(
  {
    pattern: "menu",
    alise: ["getmenu"],
    react: "📔",
    desc: "get cmd list",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
          menu[
            commands[i].category
          ] += `${config.PREFIX}${commands[i].pattern}\n`;
        }
      }
  let platform = process.platform; 
  let madeMenu = `👋 *Hello  ${pushname}*

╭━〔 🚀 𝐇𝐀𝐍𝐒 𝐁𝐘𝐓𝐄 𝐌𝐃 〕━┈⊷
┃◈╭──────────────·๏
┃◈┃• 👑 Owner : *${config.OWNER_NAME}*
┃◈┃• ⚙️ Prefix : *[${config.PREFIX}]*
┃◈┃• 📱 Number : *${config.OWNER_NUM}*
┃◈┃• ★ Created by : *𝐇𝐀𝐍𝐒 TECH*
┃◈┃• 📅 Date : *${new Date().toLocaleDateString()}*
┃◈┃• ⏰ Time : *${new Date().toLocaleTimeString()}*
┃◈┃• 🌐 Platform : *${platform}*
┃◈┃• 📦 Version : *2.2.0*
┃◈┃• ⏱️ Runtime : *${runtime(process.uptime())}*
┃◈╰──────────────┈⊷
╰━━━━━━━━━━━━━━━━┈⊷
✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
  *HANS BYTE MD*
✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧



✨ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗗𝗜𝗟𝗦𝗛𝗔𝗡 𝗠𝗗 𝗩1 ✨ 
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ σωηєя ηαмє : 𝙳𝙸𝙻𝚂𝙷𝙰𝙽 𝙰𝚂𝙷𝙸𝙽𝚂𝙰
│◈ σωηєя ηυмвєя : 94772194789
╰──────────●●►
╭━━━━∙⋆⋅⋆∙━ ─┉─ • ─┉─⊷
     *𝐃𝐈𝐋𝐒𝐇𝐀𝐍 𝐌𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓*
╰━━━━∙⋆⋅⋆∙━ ─┉─ • ─┉─⊷

> *╭────────────●●►*
  *│1. DOWNLOAD MENU*📥
  *│2. SEARCH MENU*📚
  *│3. AI MENU*🤖
  *│4. OWNER MENU*🤴
  *│5. GROUP MENU*🃏
  *│6. INFO MENU*🪂
  *│7. CONVERTER MENU*🔮
  *│8. FAN MENU*🪀
  *│9. WALLPAPERS MENU*🖼
  *│10. OTHER MENU*
> *╰────────────●●►*
> powerd by dilshan `;
      
      const newsletterContext = {
        mentionedJid: [sender],
        forwardingScore: 1000,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363292876277898@newsletter',
          newsletterName: "𝐇𝐀𝐍𝐒 𝐁𝐘𝐓𝐄 𝐌𝐃",
          serverMessageId: 143,
        },
      };

      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://i.ibb.co/6Rxhg321/Chat-GPT-Image-Mar-30-2025-03-39-42-AM.png",
          },
          caption: madeMenu,
          contextInfo: newsletterContext,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
