export class Chatroom {
	constructor (room,username) {
		this.room = room;
		this.username = username;
		this.chats = db.collection('chats');
		this.unsub;
	}

	set room(r) {
		this._room = r;
	}
	set username (u) {
		this._username = u;
	}

	get room() {
		return this._room;
	}
	get username() {
		return this._username;
	}
	updateUsername(updateUsername) {
		if(updateUsername.length >= 2 && updateUsername.length <= 10) {
			this.username = updateUsername;
			localStorage.setItem('name', updateUsername.toLowerCase());
		} else {
			alert('Ime mora biti najmanje 2 karaktera a najvise 10!');
		}
	}
	updateRoom(updateRoom) {
		this.room = updateRoom;
		if(this.unsub) {
			this.unsub();
		}
	}
	async addChat(msg) {
		let chat = {
			message: msg,
			username: this.username,
			room: this.room,
			created_at: firebase.firestore.Timestamp.fromDate(new Date())
		}
		return await this.chats.add(chat);
	}
	async getChats ( cb ) {
		this.unsub = this.chats
			.where( 'room', '==', this.room )
			.orderBy( 'created_at', 'asc' )
			.onSnapshot( snapshot => {
				if(!snapshot.empty) {
					snapshot.docChanges().forEach( change => {
						let type = change.type;
						let doc = change.doc;
						if ( type === 'added' ) {
							cb( doc );
						}
					});
				}
			});
	}

	async getFilterChats ( obj1,inF,inT,ul ) {
		let startDate = new Date(inF.value);
		let endDate = new Date(inT.value);
		ul.innerHTML = '';
		db.collection('chats')
			.where('created_at', '>=', startDate)
			.where('created_at', '<=', endDate)
			.orderBy('created_at', 'asc')
			.get()
			.then(snapshot =>{
				if(!snapshot.empty) {
					snapshot.docChanges().forEach( change => {
						let type = change.type;
						let doc = change.doc;
						if ( type === 'added' ) {
							obj1.templateUI(doc);
						}
					} );
				}
			});
	}
}
