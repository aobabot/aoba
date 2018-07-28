// server.js
// where your node app starts

// init project
const Discord = require("discord.js");
const opus = require("node-opus");
const client = new Discord.Client();
const http = require('http');
const express = require('express');
var bodyParser = require('body-parser');
const DBL = require("dblapi.js");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// init sqlite db
const fs = require('fs');
const dbFile = './.data/aoba.sqlite';
const exists = fs.existsSync(dbFile);
const sqlite = require('sqlite');
const Enmap = require("enmap");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const Kaori = require("kaori");
const kaori = new Kaori();
const YT = new Youtube(process.env.GOOGLE_API_KEY);
const color = 0xffa3e7;
const q = new Map();
const dbl = new DBL(process.env.DBL_TOKEN, client);
client.fs = fs;
client.kaori = kaori;
client.q = q;
client.sql = sqlite;
client.discord = Discord;
client.sql.open(dbFile);
client.color = color;
client.yt = ytdl;
client.y = YT;
client.dbl = dbl;
const embed = new client.discord.RichEmbed().setColor(client.color);
client.embed = embed;
const items = ["🐶 Annoying Dog",
               "⚖️ Attorney Badge",
               "🍾 Bottle of Liquor",
               "🍰 Butts Pie",
               "💎 Chaos Emerald",
               "🔖 Cleanse Tag",
               "🧠 Deer Brain",
               "🐾 Dog Residue",
               "🔑 Golden Key",
               "👨 Handsome Boyfriend",
               "👫 Heterosexual Couple",
               "🌭 Hot Dog...?",
               "🥛 LonLon Milk",
               "🍯 Max Elixir",
               "👶 Newborn Infant",    
               "🎲 Rainbow D20",
               "💍 Shiny Ring",
               "🎐 Soothe Bell", 
               "🍄 Spotted Mushroom",
               "🥃 Super Potion",
               "🔪 Toy Knife",
              "🍎 Yummy Food",];
client.items = items;


// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
fs.readdir("events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0]; //get event name
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();

fs.readdir("commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.SECRET);