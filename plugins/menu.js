const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
  
  //===========menu========
    pattern: "menu",
    desc: "To get the menu.",
    react: "📜",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
ai: '',
tools: '',
search: '',
fun: '',
voice: '',
other: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `.${commands[i].pattern}\n`;
 }
}

let madeMenu = `
👋 𝐇𝐄𝐋𝐋𝐎, ${pushname}!

✨ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗗𝗜𝗟𝗦𝗛𝗔𝗡 𝗠𝗗 𝗩1 ✨ 
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ яυηтιмє : ${runtime(process.uptime())}
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

> ©𝐏𝐎𝐖𝐄𝐑𝐃 𝐁𝐘 𝐃𝐈𝐋𝐒𝐇𝐀𝐍 𝐌𝐃`

return await conn.sendMessage(from,{image: {url: `https://files.catbox.moe/de82e3.jpg`},caption:madeMenu},{quoted: mek})
}catch(e){
console.log(e)
reply(`𝔼𝕣𝕣𝕣𝕠𝕣`)
}
})
