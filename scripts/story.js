//set of story events where player either gets new mail, or new items to decrypt (more puzzles)
function story(event) {
	switch(event) {
		case 0:
			document.getElementById('firstCrackIcon').style.display = 'inline-block';
			document.getElementById('firstFileIcon').style.display = 'inline-block';
			acquiredItems[0] = true;
			break;

		case 1:
			var text =
			`
			Fantastic work, ` + user + `.
			<br>
			<br>
			Updating your profile to recieve general tasks. More will come in shortly. Please await further instructions.
			`
			createMail('#85938_2 Complete', 'Main_Systems_aux', 'Decryptor_' + user, text, null);

			var text =
			`
			hey ` + user + `, did you notice they changed stuff up in the decryptor today??
			<br>
			<br>
			I've been having trouble wrapping my head around the 1s and 0s ˚‧·(˚ ˃̣̣̥⌓˂̣̣̥ )‧·˚
			<br>
			<br>
			BUT, check this, I talked to one of the IT guys, and he explained how it's quite simple!
			<br>
			Basically, you need to make all the numbers either 0 or 1. Each little case is randomly flipping between 1 and 0, and each time you 
			click on a number, it freezes it AND its neighbors (๑•̀u•́)و ✧
			<br>
			<br>
			So you need to be strategic and all about which ones you click, as well as your timing. But I know you can do it! Have a good one (＾▽＾)
			`
			createMail('some help...', 'Decryptor_Markus_Flint', 'Decryptor_' + user, text, null);

			var text =
			`
			I know you're all busy, but can someone please crack this one?
			<br>
			<br>
			I've got a few pressing matters and this is a class 4 blackbox sitting on the shelf for over 2 days, now. 
			We can't leave data like this unattended, so whoever solves it first will get a bonus.
			<br>
			<br>
			Sending blackbox and corresponding crack to all qualified staff.
			<br>
			<br>
			- SystemMaster Beam
			`
			createMail('RE: I AM THE LIGHT', 'SystemMaster_Charlene_Beam', 'NMLI:Staff', text, 2);
			break;

		case 2:
			document.getElementById('secondCrackIcon').style.display = 'inline-block';
			document.getElementById('secondFileIcon').style.display = 'inline-block';
			acquiredItems[1] = true;
			break;

		case 3:
			var text =
			`
			Looks like someone finally put their mind to doing some work here.
			<br>
			<br>
			Everyone, please congratulate Decryptor_` + user + ` on being an objectively better employee than all of you.
			<br>
			<br>
			Maybe we can all take a tip from ` + user + ` and be a bit more proactive next time, yeah?
			<br>
			<br>
			- SystemMaster Beam
			`
			createMail('RE: RE: I AM THE LIGHT', 'SystemMaster_Charlene_Beam', 'NMLI:Staff', text, null);

			var text =
			`
			Hey, good job on solving that blackbox. You can take a week off, and I've approved you for a promotion once you're back.
			<br>
			<br>
			- SystemMaster Beam
			`
			createMail('Good work', 'SystemMaster_Charlene_Beam', 'Decryptor_' + user, text, null);

			var text =
			`
			Yo, you remember the stuff I dropped on your desk earlier today? Got some new data about the situation ◖|◔◡◉|◗
			<br>
			<br>
			The field guys said they recovered it later today, so I don't know what it's about... I sent it to your machine, maybe it'll be useful
			<br>
			<br>
			But hey, word on the street is you got that blackbox business done faster than anyone else ✧*｡٩(ˊᗜˋ*)و✧*｡ so don't feel like you HAVE to do this extra assignment right away, it can always wait
			<br>
			anyways congrats! (￣▽￣)ノ
			`
			createMail('some relevant stuff...', 'Decryptor_Markus_Flint', 'Decryptor_' + user, text, 4);
			break;

		case 4:
			document.getElementById('thirdCrackIcon').style.display = 'inline-block';
			document.getElementById('thirdFileIcon').style.display = 'inline-block';
			acquiredItems[2] = true;
			break;
	}
}

//display decryptor results
function displayResult(level, first) {
	decryptorArea.style.display = 'none';
	deactivateLoading();
	decryptorResultsText.innerHTML = '';
	decryptorResults.style.display = 'block';

	//display result relevant to completed level
	switch (level) {
		case 0:
			var text =
			`
			This place was made my home after a heavy storm. The sight was dreadful! Flipped over benches and picnic tables, soil everywhere, and even a house which had made a lovely acquaintance with a large tree branch. I used to live on the streets of London, and then I upgraded to the park. Not a terrible progression, as I enjoyed the calmer scenery and generally more pleasant allure to the area’s visitors. Besides, I could do my job even better here! You’d think far too few people visit in comparison to a bustling street, but what matters is not the quantity, but the quality. Everyone’s so busy on the streets, nobody even notices you. How am I supposed to help when I can’t even compete with all the attention-grabbing propaganda plastered everywhere?
			`
			//print keeps text from printing letter by letter when it's not visible
			print = true;
			typeDisplay(document.getElementById('decryptorResultsText'), text, 0, 10);
			//only run the story event once, so it does not create additional unwanted mail messages
			if (first) story(1);
			break;

		case 1:
			var text =
			`
			Second puzzle solved.
			`
			print = true;
			typeDisplay(document.getElementById('decryptorResultsText'), text, 0, 10);
			if (first) story(3);
			break;

		case 2:
			var text =
			`
			Cypher: 3 = f; e = d; ...
			`
			print = true;
			typeDisplay(document.getElementById('decryptorResultsText'), text, 0, 10);
			break;
	}
}

//creates first set of mail for the beginning of the game
function createFirstMailSets() {
	var text =
	`
	Congratulations, <i>` + user +`</i>, for 6 consecutive years with us at NMLI as of today!
	<br>
	<br>
	We take pride in our team of decryptors, and the hundreds of gigabytes of secure data you crack on a daily basis!
	<br>
	<br>
	We are forever grateful for your efforts, and for that reason, have gifted you <i>2 coupons for a medium-sized coffee</i> to be redeemed in the staff lounge.
	<br>
	<br>
	Don't spend them all at once!
	<br>
	<br>
	Or do! We won't tell ;)
	<br>
	<br>
	- NMLI_PR Team
	`
	createMail('Congratulations!', 'NMLI_PR', 'Decryptor_' + user, text, null);

	var text =
	`
	ive had enough of this bullshit. I havent been working here for 28 DUCKING YEARS just to be laid off because of some higher ups 
	preferring dumbass family connections instead of real, HARDWORKING staff.
	<br>
	<br>
	well tough shit, because my access still hasnt been cut, and I made sure everyonekl have a lot of work to do fixing the crap 
	i just threw at our servers
	<br>
	<br>
	<br>
	RAY OUT
	<br>
	<br>
	sent with my iPhone
	`
	createMail('FUCK. THIS.', 'Decryptor_Ray_Sheldon', 'NMLI:staff', text, null);

	var text =
	`
	Decryptor_` + user +`,
	<br>
	<br>
	You have been assigned task <i>#85938_2</i>.
	<br>
	<br>
	The file and crack have been automatically transferred to your remote work environment. Simply open your decryptor program to decrypt them.
	<br>
	<br>
	Other tasks are waiting, so please finish this work promptly.
	`
	createMail('New Decryption Task - #85938_2', 'Main_Systems_aux', 'Decryptor_' + user, text, 0);
}