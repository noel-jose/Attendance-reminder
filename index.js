const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const crontab = require('node-crontab');

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

var attendSched = 0;
var bgmiSchedule = 0;
const active = new Set();

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
            active.add("attendance");
        }
        else
        {
            crontab.cancelJob(attendSched);
            attendSched = 0;
            message.channel.send("Attendance reminder is turned OFF");
            active.delete("attendance");
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
            active.add("bgmi");
        }
        else
        {
            crontab.cancelJob(bgmiSchedule);
            bgmiSchedule = 0;
            message.channel.send("BGMI reminder is turned OFF");
            active.delete("bgmi");
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
            {name:"!status",value:"To get a list of reminders that are active"},
        );
        message.channel.send(helpEmbed);
    }
    if(commandName === 'status')
    {
        if(active.size == 0)
        {
            message.channel.send("No active alerts");
        }
        else
        {
            const statusEmbed = new Discord.MessageEmbed();
            statusEmbed.setColor('#0099ff');
            statusEmbed.setTitle('Active commands');
            var obj = active.values();
            for(let i =0;i<active.size;i++)
            {
                statusEmbed.addField(`${obj.next().value}`,`------------`);
            }
            message.channel.send(statusEmbed);

        }

    }
});

client.login(token);
