const express = require('express');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const options = {
    origin: "https://my-chat-online.herokuapp.com"
}

app.use(cors(options))
app.use('/', express.static(path.join(__dirname, 'src/public')))


const server = app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
});

const io = socket(server)
const sentMessage = []
const users = []

io.on('connection',(socket)=>{
    console.log('New connection')

    if(users.length < 1){
        console.log('vazio')
    } else {
        socket.emit('update_users', users)
        console.log(users)
    }
    
    
    socket.on('sent_message', (message)=>{
        sentMessage.push(message);
        
        const currentMessage = sentMessage.at(-1)
        io.emit('update_message', currentMessage)
        console.log(currentMessage)
        
    })
    socket.on('create_user', (user)=>{
        users.push(user.user)
        const currentUser = user.user
        console.log(currentUser)
        io.emit('update_users', currentUser)
    })
})
