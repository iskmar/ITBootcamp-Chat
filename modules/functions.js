// fetch name from localstorage if exists
let checkName = () => {
	let name = localStorage.getItem('name');
	if(!name) {
		return 'guest';
	} else {
		return name;
	}
}
// fetch room id
let getRoomId = (buttons) => {
	for ( let i = 0; i < buttons.length; i++ ) {
		buttons[ i ].addEventListener( 'click', event => {
			event.preventDefault();
			return buttons[i].id;
		} )
	}
}

// fetch all messages
let getMessages = (obj,obj1) => {
	obj.getChats((data) => {
		obj1.templateUI(data);
	})
}

// remove message not sent by me
// delete my message from DB
let deleteMessage = (event) => {
	if (event.target.tagName === 'I' && event.target.classList.contains('delete')) {
		let id = event.target.getAttribute('data-id');
		if (event.target.parentElement.classList.contains('guestMessage')) {
			setTimeout(() => {
				event.target.parentElement.remove();
			},500);
		} else {
			let answer = confirm('Message will be permanently deleted. Continue?');
			if(answer) {
			db.collection('chats').doc(id)
					.delete()
					.then(() => {
						document.querySelector(`div[data-id='${id}']`).remove();
					})
					.catch(err => alert(err));
			}
		}
	}
}

// update username and notify with bubble
let formUpdateName = (obj,f) => {
	let name_field = document.getElementById('name_field');
	let bubble = document.querySelector('#speech');
	bubble.style.visibility = 'unset';
	bubble.innerHTML = `Hi, ${name_field.value}`;
	obj.updateUsername(name_field.value);
	setTimeout(() => {
		bubble.style.visibility = 'hidden';
	},3000);
	f.reset();

}

// Add message to DB
let formSendMessage = (obj,f) => {
	let message_field = document.getElementById('message_field');
	if(message_field.value === '' || message_field.value === null) {
		alert('Unesite poruku');
	} else {
		obj.addChat( message_field.value ).then( r  => {
			f.reset();
		} );
	}
}

// Update chat background color
let updateColor = (obj) => {
	let color = document.getElementById('color_value');
	localStorage.setItem('color', color.value);
	setTimeout(() => {
		obj.style.backgroundColor = color.value;
	},500);
}
// Load default room
let loadChat = () => {
	document.getElementById('general').click();
}
export { getMessages, getRoomId , checkName, loadChat, deleteMessage, updateColor, formUpdateName, formSendMessage};