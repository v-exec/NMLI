//login on enter keypress
function login(e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		user = userBox.value;
		var inputPass = passBox.value;
		userBox.value = null;
		passBox.value = null;
		loginFeedback.innerHTML = '';

		//successful login?
		if (inputPass == pass) successfulLogin();
		else loginFeedback.innerHTML = 'incorrect password';
	}
}

function successfulLogin() {
	//create starting mail with username now collected
	createFirstMailSets();

	//time tracker
	var t = 0;

	//make login invisible
	loginBox.style.opacity = 0;

	//remove login box
	setTimeout(function() {
		loginBox.style.display = 'none';
	}, t += 2000);

	//display loading text and loader
	setTimeout(function() {
		activateLoading();
		loadingText.innerHTML = 'booting virtual machine...';
	}, t += 500);

	setTimeout(function() {
		loadingText.innerHTML = 'clearing drive...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'initializing virtual machine...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'logging user login time...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'restricting user rights...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'connecting to restricted network...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'initializing read-only mail...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'loading mail contents...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'preparing decryptor framework...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'loading desktop assets...';
	}, t += randomRange(100, 1500));

	setTimeout(function() {
		loadingText.innerHTML = 'loading desktop environment...';
	}, t += randomRange(100, 1500));

	//remove loaders and display login text
	setTimeout(function() {
		deactivateLoading();
		loadingText.innerHTML = '';
		loginText.style.display = 'block';
		loginText.innerHTML = 'Welcome, <i>' + user + '</i>!';
	}, t += 1000);

	//fade in login text
	setTimeout(function() {
		loginText.style.opacity = 1;
	}, t += 1000);

	//fade out login text
	setTimeout(function() {
		loginText.style.opacity = 0;
	}, t += 4000);

	//remove login text and fade in logo
	setTimeout(function() {
		loginText.style.display = 'none';
		menuIcon.style.opacity = 1;
	}, t += 2000);

	//move menu bar
	setTimeout(function() {
		menuBar.style.transition = 'ease 1s';
		menuBar.style.height = '60px';
	}, t += 1000);

	//remove menu bar transition speed
	setTimeout(function() {
		menuBar.style.transition = '0s';
	}, t += 1000);
}