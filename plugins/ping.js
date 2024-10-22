const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const speedTest = require('speedtest-net');
const { runtime } = require('../lib/functions');

function convertToReadableSize(speed) {
    return speed > 1024 ? (speed / 1024).toFixed(2) + ' GBs' : speed + ' MBs';
}

cmd({
    pattern: "ping",
    desc: "Check bot's response time and network speed.",
    category: "main",
    react: "✈️",
    filename: __filename
}, async (conn, mek, m, {from,reply}) => {
    try {
        const startTime = Date.now();
        await conn.sendMessage(from, { text: '*Movie Bot... 📶*' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        const speed = await speedTest({ acceptLicense: true });
        let downloadSpeed = (speed.download.bandwidth / 125000).toFixed(2);
        let uploadSpeed = (speed.upload.bandwidth / 125000).toFixed(2);

        downloadSpeed = convertToReadableSize(downloadSpeed);
        uploadSpeed = convertToReadableSize(uploadSpeed);

        await conn.sendMessage(from, { text: `*Ping:* _${ping}ms_ ✈️` });

        setTimeout(async () => {
            await conn.sendMessage(from, { text: `*Download Speed 📥:* _${downloadSpeed}_` });
        }, 700);

        setTimeout(async () => {
            await conn.sendMessage(from, { text: `*Upload Speed 📤:* _${uploadSpeed}_` });
        }, 1400);

    } catch (e) {
        console.log(e);
        await reply(`Error fetching network speed: ${e.message}`);
    }
});
