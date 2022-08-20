const socket = io('https://websocket-chat-online.herokuapp.com/')
let user = '';


socket.on('update_message', (messages)=>{
    updateMessages(messages)
    
});

socket.on('update_users', (users)=>{
    updateMembers(users)
})

window.setInterval(function() {
    var elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
  }, 100);


document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('form_message');
    const userform = document.getElementById('form_username');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message = document.forms['form_name']['msg'].value;
        document.forms['form_name']['msg'].value = '';
        socket.emit('sent_message', {user: user, msg: message});
    })

    userform.addEventListener('submit',(e)=>{
        e.preventDefault();
        user = document.forms['form_user']['username'].value;
        if(user == ''){
            alert('Defina um nome de usuário');
            return
        }
        socket.emit('create_user', {user: user});
        userform.parentNode.removeChild(userform);
    })
})

function updateMessages(messages){
    if(messages == ''){
        return 'Not content'
    }

    const div_messages = document.getElementById('messages');
   
    let currentUser = messages.user

    if(currentUser === user){
        let list_messages = `<div class="message sent">
                                <div class="user">
                                <img src="assets/img/person.svg" class="profile-img">
                                <span id="user_name">${messages.user}</span>
                            </div>
                            <div class="content-message sent-message">
                                 <span>${messages.msg}</span>
                            </div>
                        </div>`
        div_messages.innerHTML += list_messages
    } else {
        let list_messages = `<div class="message received">
                                <div class="user">
                                <img src="assets/img/person.svg" class="profile-img">
                                <span id="user_name">${messages.user}</span>
                            </div>
                            <div class="content-message received-message">
                                 <span>${messages.msg}</span>
                            </div>
                        </div>`
        div_messages.innerHTML += list_messages
    }
}

function updateMembers(users) {
    const div_members = document.getElementById('members');
    let listMembers = `<div class="member">
                            <img src="assets/img/person.svg" alt="profile" class="profile-image">
                            <span>${users}</span>
                        </div>`
    div_members.innerHTML += listMembers
    console.log('fff')
}