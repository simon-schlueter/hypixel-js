# Hypixel API for Node.js

This is a client library for the public Hypixel API.

```javascript
const Hypixel = require('hypixel');

const client = new Hypixel({ key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });

// old school callbacks
client.getPlayer('PxlPanda', (err, player) => {
  if (err) {
    return console.info('Nope!');
  }
  
  // or a Promise if no callback provided
  client.findGuildByPlayer(player._id)
     .then((guildId) => {
        
     })
     .catch((err) => {
      
     });
});
```

## Installation

`npm install hypixel`

