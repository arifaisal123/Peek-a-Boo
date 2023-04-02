// Global variables
const monsterDoorPath = "./images/monster_door.png";
const monsterDoorSound = "./sound/monster.mp3";
const cakeDoorPath = "./images/cake_door.png";
const cakeDoorSound = "./sound/correct_answer.mp3";
const appleDoorPath = "./images/apple_door.png";
const appleDoorSound = "./sound/correct_answer.mp3";
let openDoorPath1 = monsterDoorPath;
let openDoorSound1 = monsterDoorSound;
let openDoorPath2 = cakeDoorPath;
let openDoorSound2 = cakeDoorSound;
let openDoorPath3 = appleDoorPath;
let openDoorSound3 = appleDoorSound;
let currentScore = 0;
let currentStreak = 0;
let longestStreak = 0;
const door1 = document.getElementById("door1");
const door2 = document.getElementById("door2");
const door3 = document.getElementById("door3");


// Checks if the door is clicked
const doors = document.querySelectorAll(".closed_door");
doors.forEach((door, index) => {
		door.addEventListener("click", () => {
				doorKnock(index + 1);
		});
});


// Opens the door with sound, and the entity behind it 
const doorKnock = num => {
		// Door knock sound will be played only when the door is closed
		const door = document.getElementById(`door${num}`);

		if (door.src.endsWith("/closed_door.png")) {
				let audio = new Audio("./sound/door_knock.mp3");
				audio.loop = false;
				audio.play();

		// The door will open only after knocking sound ends
		audio.onended = function() {
				// Applicable for the first door
				if (num === 1) {
						door1.src=openDoorPath1;
						let audio1 = new Audio(openDoorSound1);
						audio1.loop = false;
						audio1.play();
						scoreLogic(num);
			}
				// Applicable for the second door
				else if (num === 2) {
						door2.src=openDoorPath2;
						let audio2 = new Audio(openDoorSound2);
						audio2.loop = false;
						audio2.play();
						scoreLogic(num);
			}
				// Applicable for the third door
				else if (num === 3) {
						door3.src=openDoorPath3;
						let audio3 = new Audio(openDoorSound3);
						audio3.loop = false;
						audio3.play();
						scoreLogic(num);	
			}	
		};
	}		
};


// Generates random entity behind the door
const generateRandomDoors = () => {
		let random_num = Math.floor(Math.random() * 3) + 1;
		if (random_num === 1) {
				openDoorPath1 = monsterDoorPath;
				openDoorSound1 = monsterDoorSound;
				openDoorPath2 = cakeDoorPath;
				openDoorSound2 = cakeDoorSound;
				openDoorPath3 = appleDoorPath;
				openDoorSound3 = appleDoorSound;
		}

		else if (random_num === 2) {
				openDoorPath1 = appleDoorPath;
				openDoorSound1 = appleDoorSound;
				openDoorPath2 = monsterDoorPath;
				openDoorSound2 = monsterDoorSound;
				openDoorPath3 = cakeDoorPath;
				openDoorSound3 = cakeDoorSound;
		}

		else if (random_num === 3) {
				openDoorPath1 = appleDoorPath;
				openDoorSound1 = appleDoorSound;
				openDoorPath2 = cakeDoorPath;
				openDoorSound2 = cakeDoorSound;
				openDoorPath3 = monsterDoorPath;
				openDoorSound3 = monsterDoorSound;
		}
};


// Reloads the game, longestStreak also resets at 0
const gameReload = document.querySelector("#newGame");
gameReload.addEventListener("click", () => {
		window.location.reload();
});


// Display game over status, and play again button
const gameOver = () => {
		p_id = document.getElementById("gameStatus");
		p_id.style.display = "inline-block";

		// Displays game Over and play again message
		p_id.innerHTML = "Game Over...Better Luck Next Time!";
		document.getElementById("playAgain").style.display = "inline-block";

		// Further clicks on doors get disabled after gameover
		door1.style.pointerEvents = "none";
		door2.style.pointerEvents = "none";
		door3.style.pointerEvents = "none";
		};



// Logic behind scoring
const scoreLogic = (num) => {
		// Game over when there is a monster behind the door
		if (document.getElementById(`door${num}`).src.endsWith("/monster_door.png")) {
				gameOver();
		}
		else {
				scoreCounter();
		}
};


// Updates the winning streak of the player
const streakUpdate = () => {
		currentStreak += 1;
		document.getElementById("curStreak").innerHTML = currentStreak;
		currentScore = 0;
		door1.src="./images/closed_door.png"; 
		door2.src="./images/closed_door.png"; 
		door3.src="./images/closed_door.png"; 
		generateRandomDoors();

		// Records the longest streak
		if (currentStreak > longestStreak) {
				longestStreak = currentStreak;
				document.getElementById("longStreak").innerHTML = longestStreak;
		}
};


// Counts and updates the current, and longest streak
const scoreCounter = () => {
	currentScore += 1;

	// The timer refreshes the door after 1 sec.
	if (currentScore === 2) {
			setTimeout(streakUpdate, 1000);
	}
};


// Loads the closed door, current streak counter at 0, and Game Status and Play Again button gets hidden
const funcPlayAgain = () => {
		document.getElementById("gameStatus").style.display = "none";
		document.getElementById("playAgain").style.display = "none";

		door1.style.pointerEvents = "auto";
		door2.style.pointerEvents = "auto";
		door3.style.pointerEvents = "auto";

		door1.src="./images/closed_door.png"; 
		door2.src="./images/closed_door.png"; 
		door3.src="./images/closed_door.png"; 
		generateRandomDoors();
		currentScore = 0
		currentStreak = 0;
		document.getElementById("curStreak").innerHTML = currentStreak;
};


// The game restarts if player clicks play again 
const playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", () => {
		funcPlayAgain();
})

// Generates random entities behind the door
generateRandomDoors();
