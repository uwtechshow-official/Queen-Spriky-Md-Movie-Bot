const config = require('../config');
const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
    pattern: "restart",
    desc: "Restart the bot",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, {reply}) => {
    try {
        if (!isOwner) return;
        const { exec } = require("child_process");

        reply("*Restarting... 🔄*");
        await sleep(1500);

        exec("pm2 restart all");
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
