const btnStart = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const LAST_LEVEL = 10;

class Game {
	constructor() {
		this.init();
		this.genPattern();
		setTimeout(() => this.nextLevel(), 500);
	}

	init() {
		this.chooseColor = this.chooseColor.bind(this);
		this.nextLevel = this.nextLevel.bind(this);
		btnStart.classList.add('hide');
		this.level = 1;
		this.colors = {
			celeste,
			violeta,
			naranja,
			verde
		};
	}

	genPattern() {
		this.pattern = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
	}

	nextLevel() {
		this.sublevel = 0;
		this.lightPattern();
		this.addClickEventColors();
	}

	numberToColor(num) {
		switch (num) {
			case 0:
				return 'celeste';
			case 1:
				return 'violeta';
			case 2:
				return 'naranja';
			case 3:
				return 'verde';
		}
	}

	colorToNumber(color) {
		switch (color) {
			case 'celeste':
				return 0;
			case 'violeta':
				return 1;
			case 'naranja':
				return 2;
			case 'verde':
				return 3;
		}
	}

	// Se agrega .bind(this) para indicarle al metodo chooseColor que el this va a ser la misma clase.
	// Este bind se puede agregar al iniciarlizar para indicarle que cada vez que se llame se use el this de clase.
	// this.colors.celeste.addEventListener('click', this.chooseColor.bind(this));
	addClickEventColors() {
		this.colors.celeste.addEventListener('click', this.chooseColor);
		this.colors.violeta.addEventListener('click', this.chooseColor);
		this.colors.naranja.addEventListener('click', this.chooseColor);
		this.colors.verde.addEventListener('click', this.chooseColor);
	}

	removeClickEventColors() {
		this.colors.celeste.removeEventListener('click', this.chooseColor);
		this.colors.violeta.removeEventListener('click', this.chooseColor);
		this.colors.naranja.removeEventListener('click', this.chooseColor);
		this.colors.verde.removeEventListener('click', this.chooseColor);
	}

	chooseColor(evt) {
		const color = evt.target.dataset.color;
		const colorNumber = this.colorToNumber(color);
		this.turnOnColor(color);
		if (colorNumber === this.pattern[this.sublevel]) {
			this.sublevel++;
			if (this.sublevel === this.level) {
				this.level++;
				if (this.level === (LAST_LEVEL + 1)) {
					this.won();
				} else {
					setTimeout(() => this.nextLevel(), 1500)
				}
				this.removeClickEventColors();
			}
		} else {
			this.loose();
		}
	}

	won() {
		swal("Ganaste!", "Felicidades sos un pro, maquina, tifón, fiera, mastodonte.", "success")
			.then(() => btnStart.classList.remove('hide'));
	}

	loose() {
		const mensajes = [
			"Jajaja! Que manco desinstale el juego.",
			"Ahhh jajaja! Usted no aprende verdad?, manco!",
			"Nooo, dediquese a vender bonice más bien.",
			"Papi todo bien en casa?, falta de vitaminas."
		];
		const rndNum = Math.floor(Math.random() * 4);
		swal("Perdiste!", mensajes[rndNum], "error")
			.then(() => {
				this.removeClickEventColors();
				btnStart.classList.remove('hide');
			});
	}

	lightPattern() {
		let i = 0;
		for (i; i < this.level; i++) {
			const color = this.numberToColor(this.pattern[i]);
			setTimeout(() => this.turnOnColor(color), 1000 * i);
		}
	}

	turnOnColor(color) {
		this.colors[color].classList.add('light');
		setTimeout(() => this.turnOffColor(color), 350);
	}

	turnOffColor(color) {
		this.colors[color].classList.remove('light');
	}
}

function startGame() {
	let game = new Game();
}