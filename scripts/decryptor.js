//loads decryptor - either displaying puzzle if it can find one, or results of previously solved puzzle if no other puzzle is available
function loadDecryptor() {
	if (!decryptingOngoing) {
		var t = 0;

		activateLoading();
		decryptorFeedback.innerHTML = 'scanning for files...';

		setTimeout(function() {
			decryptorFeedback.innerHTML = 'looking for file pairs...';
		}, t += randomRange(400, 1200));

		setTimeout(function() {
			var action = false;
			for (var i = 0; i < solvedPuzzles.length; i++) {
				//trigger puzzle
				if (acquiredItems[i] && !solvedPuzzles[i]) {
					action = true;

					setTimeout(function() {
					decryptorFeedback.innerHTML = 'unresolved file pairs found...';
					}, t += randomRange(400, 1200));

					setTimeout(function() {
						decryptorFeedback.innerHTML = 'preparing crack...';
					}, t += randomRange(400, 1200));

					setTimeout(function() {
						loadPuzzle(i);
						return;
					}, t += randomRange(400, 1200));
				//trigger response
				} else if (!acquiredItems[i+1] && solvedPuzzles[i]) {
					action = true;

					setTimeout(function() {
						decryptorFeedback.innerHTML = 'no unresolved pairs found...';
					}, t += randomRange(400, 1200));

					setTimeout(function() {
						decryptorFeedback.innerHTML = 'loading found resolved pairs...';
					}, t += randomRange(400, 1200));

					setTimeout(function() {
						back.style.transform = 'translateX(0)';
						decryptorFeedback.innerHTML = '';
						displayResult(i, false);
					}, t += randomRange(400, 1200));
				}

				//jump out of loop if action has been taken
				if (action) break;

				//if nothing was found
				if (i + 1 == solvedPuzzles.length && !action) {
					back.style.transform = 'translateX(0)';
					deactivateLoading();
					decryptorFeedback.innerHTML = 'No relevant files found.';
				}
			}
		}, t += randomRange(400, 1200));
	} else {
		//if puzzle is ongoing, don't bother loading
		deactivateLoading();
		back.style.transform = 'translateX(0)';
	}
}

//load puzzle and its cells
function loadPuzzle(level) {
	decryptingOngoing = true;
	deactivateLoading();
	back.style.transform = 'translateX(0)';
	decryptorArea.style.display = 'block';
	decryptorArea.innerHTML = '';

	//multiple puzzles in increasing difficulty, each with their own number of cells
	var count;

	switch (level) {
		case 0:
			decryptorFeedback.innerHTML = '85938_2.vf decryption initiated.';
			count = 4;
			break;

		case 1:
			decryptorFeedback.innerHTML = 'blackbox.vf decryption initiated.';
			count = 9;
			break;

		case 2:
			decryptorFeedback.innerHTML = 'bonus_assignment.vf decryption initiated.';
			count = 16;
			break;
	}

	//create cells
	cells = Array();

	for (var i = 0; i < count; i++) {
		//create a new scope so that ii can retain unique value through loop
		try{throw i}
		catch(ii) {
			setTimeout(function() {
				cells.push(new Cell(count, ii, level));
				cells[ii].activate();

				//calculate neighbors only on last cycle, when all objects are generated
				if (ii + 1 == count) {
					for (var j = 0; j < cells.length; j++) {
						cells[j].calculateNeighbors();
					}
				}
			}, 10);
		}
	}
}

//cell object, blinks between 1 and 0 and stops if clicked or its neighbor is clicked
function Cell(num, id, level) {
	this.id = id;
	this.neighbors = Array();
	this.activity = true;
	this.value;
	this.level = level;
	this.randomizer;
	if (randomRange(0, 2) == 1) this.value = true;		
	else this.value = false;

	//num's square root must be whole number to fill area, ex. 4, 9, 16, 25
	//size = (area.width - padding) / sqrt(num)
	this.num = num;
	this.size = (decryptorArea.offsetWidth - 20 - 2) / Math.sqrt(this.num);

	//create element
	var a = document.createElement('a');
	a.className = 'cell';
	a.id = 'cell' + this.id;
	a.style.display = 'inline-block';
	a.style.width = this.size + 'px';
	a.style.height = this.size + 'px';
	//add onclick event to control its blinking as well as its neighbors'
	a.onclick = function() {
		//find relevant object
		var object;
		for (var i = 0; i < cells.length; i++) {
			if (cells[i].id == a.id.substring(4, 7)) object = cells[i];
		}

		//operate on object
		object.activity = !object.activity;
		if (object.activity) object.activate();
		else object.deactivate();

		for (var i = 0; i < object.neighbors.length; i++) {
			object.neighbors[i].activity = !object.neighbors[i].activity;
			if (object.neighbors[i].activity) object.neighbors[i].activate();
			else object.neighbors[i].deactivate();
		}

		//each time one is clicked, check if move has solved puzzle
		checkIfSolved(object.level);
	};

	s = document.createElement('span');
	s.className = 'cellValue';

	a.append(s);
	decryptorArea.append(a);

	//calculate neighbors
	this.calculateNeighbors = function() {
		//up
		if ((this.id + 1) > Math.sqrt(this.num)) this.neighbors.push(cells[this.id - Math.sqrt(this.num)]);

		//right
		if (!((this.id + 1) % Math.sqrt(this.num) == 0)) this.neighbors.push(cells[this.id + 1]);

		//down
		if ((this.id + 1) <= Math.sqrt(this.num) * (Math.sqrt(this.num) - 1)) this.neighbors.push(cells[this.id + Math.sqrt(this.num)]);

		//left
		if (!(this.id % Math.sqrt(this.num) == 0)) this.neighbors.push(cells[this.id - 1]);
	}

	//switch value randomly
	this.activate = function() {
		//freeze if puzzle is solved
		if (decryptingOngoing) {
			getElement(this.id).style.backgroundColor = '#fff';
			getElement(this.id).childNodes[0].style.color = '#ccc';

			//need to redefine scope to keep 'this'
			this.randomizer = setInterval(function(_this) {
				return function() {
					_this.value = !_this.value;
					if (_this.value) getElement(_this.id).childNodes[0].innerHTML = '1';
					else getElement(_this.id).childNodes[0].innerHTML = '0';
				};
			}(this), randomRange(700, 1200));
		}
	}

	//make value static
	this.deactivate = function() {
		//freeze if puzzle is solved
		if (decryptingOngoing) {
			if (this.value) getElement(this.id).style.backgroundColor = '#000';
			else getElement(this.id).style.backgroundColor = '#e7e7e7';
			getElement(this.id).childNodes[0].style.color = '#fff';
			clearInterval(this.randomizer);
		}
	}
}

//check if puzzle has been solved
function checkIfSolved(level) {
	var one;
	var zero;

	//both full grid of 0 and 1 are valid winning conditions
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].activity) return false;
		if (cells[i].value == 1) one = true;
		if (cells[i].value == 0) zero = true;
	}
	if (zero && one) return false;
	if (!zero && !one) return false;
	
	//return false on all cases that do not point to victory
	decryptingOngoing = false;
	solvedPuzzles[level] = true;
	decryptorFeedback.innerHTML = 'File decrypted.';

	//load decrypted data if puzzle completion was successful
	var t = 0;

	setTimeout(function() {
		decryptorFeedback.innerHTML = 'loading decrypted data...';
	}, t += randomRange(500, 1000));

	setTimeout(function() {
			decryptorFeedback.innerHTML = '';
			displayResult(level, true);
	}, t += randomRange(500, 1000));
}

//find cell's corresponding element
function getElement(cellID) {
	var children = decryptorArea.childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i].id.substring(4, 7) == cellID) return children[i];
	}
}