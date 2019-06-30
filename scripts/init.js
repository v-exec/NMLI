//login
var loginBox = document.getElementById('loginContainer');
var userBox = document.getElementById('username');
var passBox = document.getElementById('password');
var loginFeedback = document.getElementById('loginFeedback');
var menuIcon = document.getElementById('menuIcon');
var menuBar = document.getElementById('menuBar');

var user;
var pass = 'goodnight';

//loading
var loadingBox = document.getElementById('loadingBox');
var loadingText = document.getElementById('loadingFeedback');
var loginText = document.getElementById('loginText');
var loading = false;

//desktop
var desktop = document.getElementById('desktop');
var feedback = document.getElementById('detailText');
var back = document.getElementById('back');

//music
var musicWindow = document.getElementById('musicWindow');
var music = new Audio('assets/content/Rival Consoles - Recovery.mp3');
music.loop = true;
var songCover = document.getElementById('songCover');
var musicText = document.getElementById('musicText');
var deg = 0;
var rotationSpeed = 30;
var scrollSpeed = 10;
var playingMusic = false;
var hasStartedMusic = false;

//mail
var mailMessages = document.getElementById('mailMessages');
var mailBody = document.getElementById('mailBody');
var bodyTitle = document.getElementById('bodyTitle');
var bodySender = document.getElementById('bodySender');
var bodyReceiver = document.getElementById('bodyReceiver');
var bodyTime = document.getElementById('bodyTime');
var bodyBody = document.getElementById('bodyBody');
var mails = Array();
var mailCount = 0;
var mailIsOpen = false;
var bodyIsOpen = false;

//decryptor
var decryptorWindow = document.getElementById('decryptorWindow');
var decryptorArea = document.getElementById('decryptorArea');
var decryptorResults = document.getElementById('decryptorResults');
var decryptorResultsText = document.getElementById('decryptorResultsText');
var decryptions = [];
var decryptorFeedback = document.getElementById('decryptorFeedback');
var decryptingOngoing = false;
var decryptorIsOpen = false;
var print = true;
var cells = Array();

//story
var acquiredItems = [false, false, false];
var solvedPuzzles = [false, false, false];

//persistent

//rotate CD
setInterval(function() {
	songCover.style.transform = 'rotate('+deg+'deg)'; 
	deg += 1;
}, rotationSpeed);

setInterval(function() {
	musicText.style.transition = 'transform linear 0s';
	musicText.style.transform = 'translateX(100%)';
	setTimeout(function() {
		musicText.style.transition = 'transform linear ' + scrollSpeed + 's';
		musicText.style.transform = 'translateX(-100%)';
	}, 50);
}, scrollSpeed * 1000);

//load page
window.onload = loadPage();

function loadPage() {
	setTimeout(function() {
		loginBox.style.opacity = 1;
	}, 1000);

	desktop.style.display = 'block';
}

//helpers

//random whole number within range (excluding max)
function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//prevents safari from doing its scrolling bullshit - probably
function handleFormClick(e) {
	e.preventDefault();
}

//update feedback bar text on desktop
function desktopFeedback(message) {
	feedback.innerHTML = message;
}

//activate and deactivate loading wheel
function activateLoading() {
	loading = true;
	loadingBox.style.display = 'block';
}

function deactivateLoading() {
	loading = false;
	loadingBox.style.display = 'none';
}

//display characters over time
function typeDisplay(target, message, index, interval) {
	if (print) {
		if (index < message.length) {
			target.append(message[index++]); 
			setTimeout(function () {
				typeDisplay(target, message, index, interval);
			}, interval);
		}
	}
}