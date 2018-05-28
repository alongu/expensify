// Setting up express server for deployment to Heroku //
// This is node.js code //
// This is a replacement for the live-server
// api documentation can be found in express.com
// need to install the heroku CLI, and can be installed from: 'https://devcenter.heroku.com/articles/heroku-cli'

// in order to use it and run our server - use the command: 'node server/server.js' from the terminal

const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; // get the port from heroku if exists

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('server is up');
});