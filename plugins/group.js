const { cmd } = require('../command'),
    { jsonformat } = require('../lib/functions');

// Close group command
cmd({
    pattern: "close",
    react: "👺",
    desc: "close a group",
    category: "group",
    use: '.mute',
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group. 🚫');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command. 🤖');
        if (!isAdmins) return reply('Only admins can use this command. 👮‍♂️');

        await conn.groupSettingUpdate(mek.chat, 'announcement');
        await conn.sendMessage(from, { text: 'Group closed now. 🔒', react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('Error closing the group. ⚠️');
        console.log(e);
    }
});

// Open group command
cmd({
    pattern: "open",
    react: "👺",
    desc: "open a group",
    category: "group",
    use: '.unmute',
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group. 🚫');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command. 🤖');
        if (!isAdmins) return reply('Only admins can use this command. 👮‍♂️');

        await conn.groupSettingUpdate(mek.chat, 'not_announcement');
        await conn.sendMessage(from, { text: 'Group opened now. 🔓', react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('Error opening the group. ⚠️');
        console.log(e);
    }
});

// Promote user to admin
cmd({
    pattern: "setadmin",
    react: "🤝",
    desc: "promote member to admin",
    category: "group",
    use: '.promote',
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group. 🚫');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command. 🤖');
        if (!isAdmins) return reply('Only admins can use this command. 👮‍♂️');

        let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        await conn.groupParticipantsUpdate(mek.chat, [users], 'promote');
        reply('Congratulations, you are now an admin! 🥳');
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('Error promoting to admin. ⚠️');
        console.log(e);
    }
});

// Demote admin to member
cmd({
    pattern: "deladmin",
    react: "🚫",
    desc: "demote admin to a member",
    category: "group",
    use: '.demote',
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group. 🚫');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command. 🤖');
        if (!isAdmins) return reply('Only admins can use this command. 👮‍♂️');

        let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        await conn.groupParticipantsUpdate(mek.chat, [users], 'demote');
        reply('You have been demoted from admin. 😔');
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('Error demoting admin. ⚠️');
        console.log(e);
    }
});

// Delete message
cmd({
    pattern: "delete",
    react: "❌",
    alias: [","],
    desc: "delete message",
    category: "group",
    use: '.del',
    filename: __filename
}, async (conn, mek, m, { from, isOwner, isAdmins, reply }) => {
    if (!isOwner && !isAdmins) return;
    try {
        if (!m.quoted) return reply('No message to delete. 🗑️');
        const key = { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender };
        await conn.sendMessage(m.chat, { delete: key });
        reply('Message deleted.');
    } catch (e) {
        console.log(e);
        reply('Error deleting message. ⚠️');
    }
});

// Kick user from group
cmd({
    pattern: "kick",
    desc: "Remove a member from the group.",
    category: "group",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group. 🚫');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command. 🤖');
        if (!isAdmins) return reply('Only admins can use this command. 👮‍♂️');

        const user = m.mentioned[0] || m.quoted?.sender;
        if (!user) return reply('Please tag or reply to a user to remove. 🙁');
        await conn.groupParticipantsUpdate(from, [user], 'remove');
        await reply(`@${user.split('@')[0]} has been removed from the group. 👋`, { mentions: [user] });
    } catch (e) {
        console.log(e);
        reply('Error removing member. ⚠️');
    }
});

// Add user to group
cmd({
    pattern: "add",
    desc: "Add a member to the group.",
    category: "group",
    react: "➕",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group. 🚫');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command. 🤖');
        if (!isAdmins) return reply('Only admins can use this command. 👮‍♂️');

        const user = q.split(' ')[0];
        if (!user) return reply('Please provide a phone number to add. 📞');
        await conn.groupParticipantsUpdate(from, [`${user}@s.whatsapp.net`], 'add');
        await reply(`@${user} has been added to the group. 🎉`, { mentions: [`${user}@s.whatsapp.net`] });
    } catch (e) {
        console.log(e);
        reply('Error adding member. ⚠️');
    }
});
