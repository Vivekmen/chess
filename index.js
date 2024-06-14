const express=require("express");
const app=express();
const http=require("http");
const path=require('path');
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server)

let player={};
const current_player="w";


io.on('connection',(socket)=>{
  console.log("user connected");
 
     if(!player.white){
      player.white=socket.id;
      socket.emit("playerRole","w")
     }
     else{
      player.black=socket.id
      socket.emit('playerRole','b');
     }

     socket.on('disconnected',()=>{
      if(socket.id===player.white){
        delete player.white;
      }else if(socket.id===player.black) {
        delete player.black;
      }
     })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
  

server.listen(3002,()=>{
    console.log("server listing on http://localhost:3002");
})