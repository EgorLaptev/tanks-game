'use strict';

let land = document.querySelector('.map');

let score = 0;
let scoreSound = new Audio();
scoreSound.src = 'Audio/score.mp3';

let map = [[' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # '],
		   [' # ','   ','   ','   ','   ','   ','   ','   ','   ','   ',' # ', '   ', '   ', '   ', '   ', '   ', '   ', ' # ', '   ', '   ', '   ', ' # '],
		   [' # ','   ','   ',' # ',' # ',' # ',' # ',' # ','   ','   ',' # ', '   ', '   ', ' # ', '   ', '   ', '   ', ' # ', '   ', '   ', '   ', ' # '],
		   [' # ','   ','   ',' # ','   ','   ','   ',' # ','   ','   ',' # ', ' # ', ' # ', ' # ', '   ', '   ', '   ', ' # ', '   ', '   ', '   ', ' # '],
		   [' # ','   ','   ',' # ','   ','   ',' T ',' # ','   ','   ','   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', ' # '],
		   [' # ','   ','   ','   ','   ','   ','   ',' # ','   ','   ','   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', ' # '],
		   [' # ','   ','   ','   ','   ','   ','   ','   ','   ','   ',' # ', '   ', '   ', '   ', '   ', ' # ', ' # ', ' # ', ' # ', '   ', ' # ', ' # '],
		   [' # ','   ','   ','   ','   ','   ','   ','   ','   ','   ',' # ', '   ', '   ', '   ', '   ', ' # ', ' # ', ' # ', ' # ', '   ', '   ', ' # '],
		   [' # ',' # ',' # ','   ',' # ','   ',' # ',' # ','   ','   ',' # ', ' # ', ' # ', '   ', '   ', ' # ', ' # ', ' # ', ' # ', '   ', '   ', ' # '],
		   [' # ','   ','   ','   ',' # ','   ','   ',' # ','   ',' # ',' # ', '   ', ' # ', '   ', '   ', ' # ', ' # ', ' # ', ' # ', '   ', '   ', ' # '],
		   [' # ','   ','   ','   ',' # ','   ','   ',' # ','   ','   ','   ', '   ', ' # ', '   ', '   ', '   ', '   ', '   ', ' # ', '   ', '   ', ' # '],
		   [' # ','   ','   ','   ',' # ',' # ','   ',' # ','   ','   ','   ', '   ', '   ', '   ', '   ', ' # ', '   ', '   ', ' # ', '   ', '   ', ' # '],
		   [' # ','   ','   ','   ','   ','   ','   ',' # ','   ','   ',' # ', '   ', '   ', '   ', '   ', ' # ', '   ', '   ', '   ', '   ', '   ', ' # '],
		   [' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ',' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ', ' # ']];


function showMap() {

	for (let i=0;i<land.children.length;i++) {
		if (land.children[i].className == 'tank') land.children[i].remove();	
	}

	for (let i=0;i<land.children.length;i++) {
		if (land.children[i].className != 'tank') land.children[i].remove();	
	}

	map.forEach((posY, i)=>{
		console.clear();
		posY.forEach((posX, j)=>{
			let block = document.createElement('div');
			switch (map[i][j]) {
				case ' # ': { // Wall
					block.classList.add('wall');	
					break;
				}
				case ' @ ': { // Apple
					block.classList.add('apple');
					break;
				}
				case ' T ': { // Tank
					block.classList.add('tank');
					break;
				}
				case ' E ': { // Enemy
					block.classList.add('enemy');
					break;
				}
			}

			block.style.left = j * 50 + 'px';
			block.style.top  = i * 50 + 'px';
			land.appendChild(block);
		});
	});
	console.log(`Score: ${score}`);

}



function myPos () {
	let tankPos = {};
	map.forEach((posY,i) => {
		posY.forEach((posX,j) => {
			if (posX == ' T ') {
				tankPos = {
					x:j,
					y:i
				}
			}
		})
	})

	return tankPos;
}

function newApple() {
	let xPos = Math.floor(1 + Math.random() * (map[0].length - 1));
	let yPos = Math.floor(1 + Math.random() * (map.length - 1));

	if (map[yPos][xPos] != '   ') {
		newApple();
	} else {
		map[yPos][xPos] = ' @ ';
	}

}

function newEnemy() {
	let xPos = Math.floor(1 + Math.random() * (map[0].length - 1));
	let yPos = Math.floor(1 + Math.random() * (map.length - 1));

	if (map[yPos][xPos] != '   ') {
		newEnemy();
	} else {
		map[yPos][xPos] = ' E ';
	}



}

function eat() {
	score++;
	newApple();
	scoreSound.play();
}


newEnemy()
newApple();
showMap();


document.addEventListener('keydown', (e)=>{

	let tankPos = myPos();

	if (e.keyCode === 87 && map[tankPos.y-1][tankPos.x] != ' # ') { // Up
		if (map[tankPos.y-1][tankPos.x] == ' @ ') eat(); // If apple
		if (map[tankPos.y-1][tankPos.x] == ' E ') location.reload(); // If Enemy
		map[tankPos.y][tankPos.x] = '   ';
		map[--tankPos.y][tankPos.x] = ' T ';
		showMap();
	}

	if (e.keyCode === 83 && map[tankPos.y+1][tankPos.x] != ' # ') { // Down
		if (map[tankPos.y+1][tankPos.x] == ' @ ') eat();
		if (map[tankPos.y+1][tankPos.x] == ' E ') location.reload(); // If Enemy
		map[tankPos.y][tankPos.x] = '   ';
		map[++tankPos.y][tankPos.x] = ' T ';
		showMap();		
	}

	if (e.keyCode === 65 && map[tankPos.y][tankPos.x-1] != ' # ') { // Left
		if (map[tankPos.y][tankPos.x-1] == ' @ ') eat();
		if (map[tankPos.y][tankPos.x-1] == ' E ') location.reload(); // If Enemy
		map[tankPos.y][tankPos.x] = '   ';
		map[tankPos.y][--tankPos.x] = ' T ';
		showMap();		
	}

	if (e.keyCode === 68 && map[tankPos.y][tankPos.x+1] != ' # ') { // Right
		if (map[tankPos.y][tankPos.x+1] == ' @ ') eat();
		if (map[tankPos.y][tankPos.x+1] == ' E ') location.reload(); // If Enemy
		map[tankPos.y][tankPos.x] = '   ';
		map[tankPos.y][++tankPos.x] = ' T ';
		showMap();		
	}
});