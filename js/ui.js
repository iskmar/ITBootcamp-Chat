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
		let div = document.createElement('div');
		let span = document.createElement('span');
		let span1 = document.createElement('span');
		let span2 = document.createElement('span');
		let div1 = document.createElement('div');
		let imgDiv = document.createElement('div');
		let trashIcon = document.createElement('i');
		let i = document.createElement('i');

		trashIcon.classList.add('far');
		trashIcon.classList.add('fa-trash-alt');
		div.setAttribute('data-id', objId);
		div.classList.add('msg_hover');
		div1.style.marginLeft = '50px';
		span.style.fontWeight = 'bolder';
		trashIcon.classList.add('btnDelete');
		trashIcon.setAttribute('data-id', objId);
		trashIcon.style.marginLeft = '10px';
		trashIcon.style.width = '20px';
		trashIcon.classList.add('delete');
		// trashIcon.setAttribute('data-id',objId);
		i.classList.add('far');
		i.classList.add('fa-user');
		i.style.fontSize = '40px';

		if(objData.username === currentUsername) {
			div.classList.add('myMessage');
		} else {
			div.classList.add('guestMessage');
		}


		span.innerHTML = `&nbsp&nbsp&nbsp${username} - `;
		span1.innerHTML = `${strTime}`;
		div1.innerHTML = `${message}`;
		imgDiv.appendChild(i);
		div.appendChild(imgDiv);
		div.appendChild(i);
		div.appendChild(span);
		if ( now.getDate() > date.getDate() ) {
			span1.innerHTML = `${strDate}`;

		} else {
			span1.innerHTML = `${strTime}`;
		}
		div.appendChild(span1);
		div.appendChild(trashIcon)
		div.appendChild(div1)
		this.chat.appendChild(div);
	}

	msgDelete(obj) {
		this.chat.addEventListener('click', event => {
			let id = event.target.parentElement.getAttribute('data-id');
			console.log(id);
			if(localStorage.getItem('name') === obj.username){
				if(event.target.tagName === "BUTTON") {
					let id = event.target.parentElement.getAttribute('data-id');
					let answer = confirm('Da li zelite da obrisete poruku?');
					if(answer) {
						db.collection( 'chats' ).doc( id )
							.delete()
							.then( () => {
							} );
					}
				}
			} else {
				if(event.target.tagName === "BUTTON") {
					let id = event.target.parentElement.getAttribute('data-id');
					if(answer) {
						id.remove();
					}

				}
			}

		});

	}
}