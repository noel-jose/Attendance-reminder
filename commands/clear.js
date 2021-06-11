module.exports = {
    name: "clear",
    cooldown: 5,
    description: "clear",
    execute(message, args) {
        message.channel.send("clear called");
    },
};
