import { Chatroom } from "../classes/chat.js";
import { getMessages, getRoomId, checkName, loadChat, deleteMessage, updateColor} from "../modules/functions.js";
import { ChatUI } from "./ui.js";
let form_message = document.getElementById('form_message');
let form_name = document.getElementById('form_name');
let name_field = document.getElementById('name_field');
let ul = document.getElementById('chatUl');
let buttons = document.getElementsByClassName('room');
let submitDate = document.getElementById('submit_date');
let inputDateFrom = document.getElementById('start_date');
let inputDateTo = document.getElementById('end_date');
let btnSetColor = document.getElementById('submit_color');
let chatRoom = document.getElementById('chat-room');
checkName();
let room = getRoomId(buttons);
let chatMsg = new Chatroom( room, checkName());
let writeChat = new ChatUI(ul);
chatRoom.style.backgroundColor = localStorage.getItem('color');

btnSetColor.addEventListener('click', event => {
	event.preventDefault();
	updateColor(chatRoom);
});
submitDate.addEventListener('click', event => {
	event.preventDefault();
	chatMsg.getFilterChats(writeChat,inputDateFrom,inputDateTo,ul);
});




for ( let i = 0; i < buttons.length ; i++ ) {
	buttons[i].addEventListener('click', event => {
		event.preventDefault();
		for ( let j = 0; j < buttons.length ; j++ ) {
			buttons[j].classList.remove('active');
		}
		buttons[i].classList.add('active');
		ul.innerHTML = '';
		chatMsg.updateRoom(buttons[i].id);
		getMessages(chatMsg,writeChat);
	})

}
ul.addEventListener('click', event => {
	event.preventDefault();
	deleteMessage(event);

});

form_name.addEventListener('submit', event => {
    event.preventDefault();
	let bubble = document.querySelector('#speech');
	bubble.style.visibility = 'unset';
	bubble.innerHTML = `Hi, ${name_field.value}`;
	chatMsg.updateUsername(name_field.value);
	form_name.reset();
	setTimeout(() => {
		bubble.style.visibility = 'hidden';
	},3000);
});
form_message.addEventListener('submit', event => {
	event.preventDefault();
	checkName(chatMsg);
	let message_field = document.getElementById('message_field');
	if(message_field.value === '' || message_field.value === null) {
		alert('Unesite poruku');
	} else {
		chatMsg.addChat(message_field.value)
			.then(() => {
				form_message.reset();
			})
			.catch(() => {
			});
	}

});
window.addEventListener('load', () => {
	loadChat();
});


let btnDelete = document.querySelectorAll('btnDelete');

btnDelete.forEach(btn => {
	btn.addEventListener('click', event => {
		deleteMessages(chatMsg,writeChat);
	})
})