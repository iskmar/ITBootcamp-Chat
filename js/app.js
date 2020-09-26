import { Chatroom } from "../classes/chat.js";
import { getMessages, getRoomId, checkName, loadChat, deleteMessage, updateColor, formUpdateName, formSendMessage} from "../modules/functions.js";
import { ChatUI } from "./ui.js";

// DOM
let form_message = document.getElementById('form_message');
let ul = document.getElementById('chatUl');
let buttons = document.getElementsByClassName('room');
let submitDate = document.getElementById('submit_date');
let inputDateFrom = document.getElementById('start_date');
let inputDateTo = document.getElementById('end_date');
let btnSetColor = document.getElementById('submit_color');
let chatRoom = document.getElementById('chat-room');
let form_name = document.getElementById('form_name');

// initiate values
// if name is in localstorage
// create obj instances
checkName();
let room = getRoomId(buttons);
let chatMsg = new Chatroom( room, checkName());
let writeChat = new ChatUI(ul);
chatRoom.style.backgroundColor = localStorage.getItem('color');

// update background color
btnSetColor.addEventListener('click', event => {
	event.preventDefault();
	updateColor(chatRoom);
});
// filtering messages
submitDate.addEventListener('click', event => {
	event.preventDefault();
	chatMsg.getFilterChats(writeChat,inputDateFrom,inputDateTo,ul);
});

// loop trough room buttons and on each event listener
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
// UL event bubbling
ul.addEventListener('click', event => {
	event.preventDefault();
	deleteMessage(event);
});
// update name
form_name.addEventListener('submit', event => {
    event.preventDefault();
	formUpdateName(chatMsg,form_name);

});
// add message
form_message.addEventListener('submit', event => {
	event.preventDefault();
	checkName(chatMsg);
	formSendMessage(chatMsg,form_message);
});
// load default chat
window.addEventListener('load', () => {
	loadChat();
});
