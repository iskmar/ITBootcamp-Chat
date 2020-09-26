export class ChatUI {
	constructor (list) {
		this.chat = list;
	}

	set chat(c) {
		this._chat = c;
	}
	get chat() {
		return this._chat;
	}
	formatDate(date){
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		let h = date.getHours();
		let min = date.getMinutes();

		d = String(d).padStart(2,"0");
		m = String(m).padStart(2,"0");
		h = String(h).padStart(2,"0");
		min = String(min).padStart(2, "0");

		let strDate = d + "." + m + "." + y + ". - " + h + ":" + min;
		let strTime = h + ":" + min;

		return [strDate,strTime];
	}
	templateUI(obj) {
		let now = new Date();
		let objData = obj.data();
		let objId = obj.id;
		let message = objData.message;
		let username = objData.username;
		let date = objData.created_at.toDate();
		let currentUsername = localStorage.getItem( 'name' );

		let strDate = this.formatDate( date )[ 0 ];
		let strTime = this.formatDate( date )[ 1 ];
		let divChatContainer = document.createElement('div');
		let spanUsername = document.createElement('span');
		let spanTime = document.createElement('span');
		let divMessage = document.createElement('div');
		let trashIcon = document.createElement('i');
		let userIcon = document.createElement('i');

		divChatContainer.setAttribute('data-id', objId);
		divChatContainer.classList.add('msg_hover');
		trashIcon.setAttribute('data-id', objId);
		trashIcon.classList.add('far');
		trashIcon.classList.add('fa-trash-alt');
		trashIcon.classList.add('delete');
		userIcon.classList.add('far');
		userIcon.classList.add('fa-user');
		divMessage.style.marginLeft = '50px';
		spanUsername.style.fontWeight = 'bolder';
		trashIcon.style.marginLeft = '10px';
		trashIcon.style.width = '20px';
		userIcon.style.fontSize = '40px';

		if(objData.username === currentUsername) {
			divChatContainer.classList.add('myMessage');
		} else {
			divChatContainer.classList.add('guestMessage');
		}

		spanUsername.innerHTML = `&nbsp&nbsp&nbsp${username} - `;
		spanTime.innerHTML = `${strTime}`;
		divMessage.innerHTML = `${message}`;
		divChatContainer.appendChild(userIcon);
		divChatContainer.appendChild(spanUsername);
		if ( now.getDate() > date.getDate() ) {
			spanTime.innerHTML = `${strDate}`;

		} else {
			spanTime.innerHTML = `${strTime}`;
		}
		divChatContainer.appendChild(spanTime);
		divChatContainer.appendChild(trashIcon)
		divChatContainer.appendChild(divMessage)
		this.chat.appendChild(divChatContainer);
	}
}