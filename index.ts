import express from 'express';
import path from 'path';
import socket from 'socket.io';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use('/', express.static(path.join(__dirname, 'src/public')))


const server = app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
});

const io = socket(server)
const sentMessage: any = []
const users: any = []

io.on('connection',(socket: any)=>{
    console.log('New connection')

    if(users.length < 1){
        console.log('vazio')
    } else {
        socket.emit('update_users', users)
        console.log(users)
    }
    
    
    socket.on('sent_message', (message: any)=>{
        sentMessage.push(message);
        
        const currentMessage = sentMessage.at(-1)
        io.emit('update_message', currentMessage)
        console.log(currentMessage)
        
    })
    socket.on('create_user', (user: any)=>{
        users.push(user.user)
        const currentUser = user.user
        console.log(currentUser)
        io.emit('update_users', currentUser)
    })
})
