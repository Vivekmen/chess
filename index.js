const express=require("express");
const app=express();
const http=require("http");
const path=require('path');
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server)

const default_turn="w";

io.on('connection',(socket)=>{
  console.log("user connected");

   
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
  

server.listen(3002,()=>{
    console.log("server listing on http://localhost:3002");
})