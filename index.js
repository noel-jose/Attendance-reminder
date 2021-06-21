const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const crontab = require('node-crontab');

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

var attendSched = 0;
var bgmiSchedule = 0;

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(commandName === "attendance")
    {
        if(attendSched === 0)
        {
            message.channel.send("attendance reminder is ON");
            attendSched = crontab.scheduleJob("*/1 * * * *", function(){ //This will call this function every 2 minutes
                message.channel.send("Its been a minute now")
            });
        }
        else
        {
            crontab.cancelJob(attendSched);
            attendSched = 0;
            message.channel.send("Attendance reminder is turned OFF");
        }
    }

    //command for bgmi schedule
    if(commandName === "bgmi")
    {
        if(bgmiSchedule === 0)
        {
            message.channel.send("BGMI reminder is ON");
            bgmiSchedule = crontab.scheduleJob("*/1 * * * *", function(){ //This will call this function every 2 minutes
                message.channel.send("Its been a minute now")
            });
        }
        else
        {
            crontab.cancelJob(bgmiSchedule);
            bgmiSchedule = 0;
            message.channel.send("BGMI reminder is turned OFF");
        }
    }
    if(commandName === "help")
    {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Available commands')
        .addFields(
            {name:"!attendace " ,value :"Used to activate and deactivate attendace reminder"},
            {name:"!bgmi" , value:"Used to activate and deactivate the bgmi reminder"},
            {name:"!help",value:"To get a list of available commands"},
        );
        message.channel.send(helpEmbed);
    }
});

client.login(token);
