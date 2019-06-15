//series of window opening instructions
function openWindow(w) {
	//only allow opening when not loading
	if (!loading) {
		switch(w) {
			//series of animation timing to imitate loading
			case 'mail':
				if (!mailIsOpen && !decryptorIsOpen) {
					activateLoading();
					desktopFeedback('loading mail client...');
					setTimeout(function() {
						desktopFeedback('');
						back.style.transform = 'translateX(0)';
						toggleMail();
					}, randomRange(800, 1200));
				}
				break;

			case 'decryptor':
				if (!mailIsOpen && !decryptorIsOpen) {
					activateLoading();
					desktopFeedback('loading decryptor...');
					setTimeout(function() {
						desktopFeedback('');
						toggleDecryptor();
					}, randomRange(800, 1200));
				}
				break;

			case 'music':
				if (!mailIsOpen && !decryptorIsOpen) {
					activateLoading();
					if (!playingMusic) {
						if (hasStartedMusic) {
							desktopFeedback('retrieving previously selected song...');
							setTimeout(function() {
								desktopFeedback('');
								toggleMusic();
							}, randomRange(500, 1500));
						} else {
							desktopFeedback('scanning directory...');
							setTimeout(function() {
								desktopFeedback('selecting appropriate music...');
								setTimeout(function() {
									desktopFeedback('');
									toggleMusic();
								}, randomRange(500, 1500));
							}, randomRange(500, 1500));
						}
					} else {
						desktopFeedback('shutting down music player...');
						setTimeout(function() {
							desktopFeedback('');
							toggleMusic();
						}, randomRange(500, 1500));
					}
				}
				break;
		}
	}
}

function toggleDecryptor() {
	decryptorIsOpen = !decryptorIsOpen;

	decryptorResultsText.innerHTML = '';
	decryptorFeedback.innerHTML = '';

	if (decryptorIsOpen) {
		decryptorWindow.style.display = 'block';

		setTimeout(function() {
			decryptorWindow.style.transform = 'translateY(0%)';
			deactivateLoading();
			setTimeout(function() {
				loadDecryptor();
			}, 1000);
		}, 200);
	} else {
		decryptorWindow.style.transform = 'translateY(120%)';
		//turn off print so that result text does not continue to print off-screen
		print = false;
		setTimeout(function() {
			decryptorWindow.style.display = 'none';
		}, 1000);
	}
}

function toggleMail() {
	mailIsOpen = !mailIsOpen;

	if (mailIsOpen) {
		mailMessages.style.display = 'block';
		setTimeout(function() {
			mailMessages.style.transform = 'translateY(0%)';
			deactivateLoading();
		}, 200);

	} else {
		mailMessages.style.transform = 'translateY(120%)';
		setTimeout(function() {
			mailMessages.style.display = 'none';
		}, 1000);
	}
}

function toggleMusic() {
	hasStartedMusic = true;
	playingMusic = !playingMusic;

	if (playingMusic) {
		musicWindow.style.display = 'block';
		deactivateLoading();
		music.play();
	} else {
		musicWindow.style.display = 'none';
		deactivateLoading();
		music.pause();
	}
}

//returns to previous state when in window
function goBack() {
	//only allow closing when not loading
	if (!loading) {
		//close mail
		if (mailIsOpen && !bodyIsOpen) {
			toggleMail();
			back.style.transform = 'translateX(200%)';
			//close body
		} else if (bodyIsOpen) {
			mailBody.style.transform = 'translateY(120%)';
			setTimeout(function() {
				mailBody.style.display = 'block';
			}, 1000);

			bodyIsOpen = false;
			//close decryptor
		} else if (decryptorIsOpen) {
			toggleDecryptor();
			back.style.transform = 'translateX(200%)';
		}
	}
}