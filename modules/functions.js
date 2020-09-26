
let checkName = () => {
	let name = localStorage.getItem('name');
	if(!name) {
		return 'guest';
	} else {
		return name;
	}
}
let getRoomId = (buttons) => {
	for ( let i = 0; i < buttons.length; i++ ) {
		buttons[ i ].addEventListener( 'click', event => {
			event.preventDefault();
			return buttons[i].id;
		} )
	}
}
let getMessages = (obj,obj1) => {
	obj.getChats((data) => {
		obj1.templateUI(data);
	})
}
let deleteMessage = (event) => {
	if (event.target.tagName === 'I' && event.target.classList.contains('delete')) {
		let id = event.target.getAttribute('data-id');
		if (event.target.parentElement.classList.contains('guestMessage')) {
			console.log(id);
			setTimeout(() => {
				event.target.parentElement.remove();
			},500)
		} else {
			let answer = confirm('Message will be permanently deleted. Continue?');
			if(answer) {
				db.collection('chats').doc(id)
					.delete()
					.then()
					.catch(err => alert(err));
			}
		}
	}
}

let updateColor = (obj) => {
	let color = document.getElementById('color_value');
	localStorage.setItem('color', color.value);
	setTimeout(() => {
		obj.style.backgroundColor = color.value;
	},500);
}

let loadChat = () => {
	document.getElementById('general').click();
}
export { getMessages, getRoomId , checkName, loadChat,deleteMessage, updateColor};