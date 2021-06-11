const cron = require("node-cron");

module.exports = {
    name: "attendance",
    description: "Command to remind attendance",
    args: true,
    usage: "on / off",
    execute(message, args) {
        if (!args[0]) {
            message.channel.send("Enter on or off along with the command");
        }
        console.log("Attendance command called");
        var task = cron.schedule("30 * * * * *", () => {
            message.channel.send("Attendance mark cheyyane chetta");
            console.log("Attendance inne vilich");
        });
        console.log(task);
        if (args[0] == "on") {
            console.log("Attendace bot started");
            message.channel.send("Attendnce bot started");
            task.start();
            console.log("Started the task");
        } else if (args[0] == "off") {
            task.destroy;
            message.channel.send("Attendane bot stopped");
            console.log("Attendance bot stopped");
        }
    },
};
