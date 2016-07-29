# Hypixel API for Node.js

This is a client library for the public Hypixel API.

[![NPM](https://nodei.co/npm/hypixel.png?mini=true)](https://nodei.co/npm/hypixel/)

```javascript
const Hypixel = require('hypixel');

const client = new Hypixel({ key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });

// old school callbacks
client.getPlayerByUsername('PxlPanda', (err, player) => {
  if (err) {
    return console.info('Nope!');
  }
  
  // or a Promise if no callback provided
  client.findGuildByPlayer(player.uuid)
     .then((guildId) => {
        ...
     })
     .catch((err) => {
        ...
     });
});
```

## Installation

`npm install hypixel`

## Notes

When querying data by player UUIDs make sure to remove dashes.

## Examples
#### Create a Client instance

```javascript
const Hypixel = require('hypixel');

const client = new Hypixel({ key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
```

#### Get Key Info
```javascript
client.getKeyInfo((err, info) => { ... });
```
#### Find Guild Id By Name
```javascript
client.findGuildByName(name, (err, guildId) => { ... });
```
#### Find Guild Id By Player
```javascript
client.findGuildByPlayer(playerUuid, (err, guildId) => { ... });
```
#### Get Guild Info
```javascript
client.getGuild(guildId, (err, guild) => { ... });
```
#### Get Active Boosters
```javascript
client.getBoosters((err, boosters) => { ... });
```
#### Get Friends
```javascript
client.getFriends(playerUuidOrUsername, (err, friends) => { ... });
```
#### Get Session
```javascript
client.getSession(playerUuidOrUsername, (err, sessionId) => { ... });
```
#### Get Player Info
```javascript
client.getPlayer(playerUuid, (err, player) => { ... });
```
#### Get Player Info (by username)
```javascript
client.getPlayer(username, (err, player) => { ... });
```
