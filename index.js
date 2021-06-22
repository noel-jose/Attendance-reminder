const Discord = require("discord.js");
const token = process.env.token;
const crontab = require('node-crontab');

prefix = "!";

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

var attendSched = 0;
var bgmiSchedule = 0;
const active = new Set();
const bgmiMessages = ["Bhaa guys kalikkam \n@everyone", "Padutham nirth BGMI il kerr\n@everyone", "Cmon guys chicken dinner adikkam\n@everyone", "@everyone lets kill some bots", "Keri vaa guys\n@everyone", "6:40 aayi punctuality ille ningalk\n@everyone", "BGMI waiting for you guys\n@everyone"];


client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(commandName === "attendance")
    {
        if(attendSched === 0)
        {
            message.channel.send("attendance reminder is ON");
            attendSched = crontab.scheduleJob("36 8-12 * * 1-5", function(){ //This will call this function every hour from 8-12 and every day from monday-friday
                message.channel.send("@everyone Attendance mark cheyyu");
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
            bgmiSchedule = crontab.scheduleJob("35 18 * * *", function(){ //This will call this function every day at 6:35 PM
                const random = Math.floor(Math.random() * bgmiMessages.length);
                message.channel.send(bgmiMessages[random]);
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
            {name:"!clear",value:"To clear 100 previous messages"}
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
            statusEmbed.setTitle('Active alerts');
            var obj = active.values();
            for(let i =0;i<active.size;i++)
            {
                statusEmbed.addField(`${obj.next().value}`,`------------`);
            }
            message.channel.send(statusEmbed);

        }

    }
    if(commandName === "clear")
    {
        message.channel.bulkDelete(100);
    }
    
});

client.login(token);
