
// console.log("peter rocks")

//From package .json  --> downloaded from internet
const express = require("express") ;
const socketIO = require('socket.io') ;

//Native to Node
const http = require('http') ;
const path = require('path');

//create our server

const app = express() ;
const server = http.Server(app) ;
const io = socketIO(server) ;

//io.on('connection', socket => {
  //console.log(socket) ;
  // console.log('NEW PLAYER', socket.id) ;
//});

//Serve that js stuff
app.use(express.static( path.resolve(__dirname, '../client') ) ) ;

//Send the index.html file for the path root
app.get( '*', (req, res) => {
  const pathToHtml = path.resolve(__dirname, '../index.html') ;
  res.sendFile(pathToHtml);
} ) ;


//start server on port 3000
server.listen(3000, () => {
  console.log('server is up and RUNNING') ;
}) ;


const GameManager = require('./GameManager.js');
const game = new GameManager(io) ;
game.init() ;

// console.log(GameManager);
