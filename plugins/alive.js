const config = require('../config')
const {cmd , commands} = require('../command')
//-----------------------------------------------ALive-----------------------------------------------
cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "general",
    react: "❤️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{image: {url:'https://github.com/uwtechshow-official/Spriky-Database/blob/main/Logo/Bot.jpg?raw=true'},caption: '👑 *Queen Spriky MD* is ONLINE! ⚡\n\n🎉 *Version:* 2.0.0\n🔹 *Uptime:* Always ready to serve! ⏳\n🌐 *Status:* Active and Responsive 💥\n\n🔗 *Connect with Queen Spriky:*\n- 🌟 *YouTube:* https://www.youtube.com/channel/UClgw5nfUPeDIb7vUZa3euMg\n- 📲 *WhatsApp Channel:* https://www.whatsapp.com/channel/0029VajvrA2ATRSkEnZwMQ0p\n- 👥 *WhatsApp Group:* https://chat.whatsapp.com/KQZ2CxCLL5D268bh6bmBMg\n- 💻 *GitHub :* https://github.com/uwtechshow-official/Queen-Spriky-MD/\n\n💬 *Commands:* Type `.menu` to see what I can do!\n⚡ Powering your world with ease, speed, and efficiency! ⚡'},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})