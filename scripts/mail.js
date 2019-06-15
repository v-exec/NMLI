//creates mail
function createMail(eTitle, eSender, eReceiver, eBody, id) {
	//create object
	if (id == null) mails.push(new Mail(eTitle, eSender, eReceiver, eBody, 'X' + mailCount));
	else mails.push(new Mail(eTitle, eSender, eReceiver, eBody, id));

	//create inbox entry
	var a = document.createElement('a');
	a.className = 'mailMessage';
	if (id == null) a.id = 'message' + 'X' + mailCount;
	else a.id = 'message' + id;
	a.href = '#';

	//on click, run the mail object's 'select' so it can be opened in more detail
	a.onclick = function() {
		for (var i = 0; i < mails.length; i++) {
			if (a.id.substring(7, 12) == mails[i].id) mails[i].select();
		}
	};

	//create other stylistic elements
	var title = document.createElement('span');
	title.className = 'sideMailMessageTitle';
	title.innerHTML = eTitle;

	var sender = document.createElement('span');
	sender.className = 'sideMailMessageSender';
	sender.innerHTML = eSender;

	a.appendChild(title);
	a.appendChild(sender);
	mailMessages.prepend(a);

	mailCount++;
}

//mail object
function Mail (eTitle, eSender, eReceiver, eBody, id) {
	this.title = 'Subject: ' + eTitle;
	this.sender = 'From: ' + eSender;
	this.receiver = 'To: ' + eReceiver;
	this.time = 'Sent on: ' + randomRange(0, 16) + 'L' + randomRange(0, 256) + 'F' + randomRange(0, 32);
	this.body = eBody;
	this.id = id;
	this.visited = false;

	//fill email body with this object's content, and bring up the element
	this.select = function() {
		bodyTitle.innerHTML = this.title;
		bodySender.innerHTML = this.sender;
		bodyReceiver.innerHTML = this.receiver;
		bodyTime.innerHTML = this.time;
		bodyBody.innerHTML = this.body;

		mailBody.style.display = 'block';
		setTimeout(function() {
			mailBody.style.transform = 'translateY(0)';
		}, 200);
		
		bodyIsOpen = true;

		//check if the selection of this email should trigger a story event
		if (!this.visited && this.id.toString().substring(0, 1) != 'X')  story(this.id);
		this.visited = true;
	}
}