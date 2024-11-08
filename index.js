let harmonics = 10;
let rWidth = 25;
let totalD = harmonics * rWidth * 2
let toggleStart = [20, 20]
let toggleSinging = [90, 20]
let playingState = 0;
let singingState = 0;
let btnH = 25;
let colours = [[243, 14, 0], [0, 243, 14]]
let selected = -1;
let oscillators = [];

let fundamental = 440;


function setup(){
	createCanvas(600, 600)
	for(let i = 0; i < harmonics; i++) {
		let iOsc = new p5.Oscillator();
		iOsc.freq(fundamental * (i + 1))
		iOsc.amp(Math.random())
		iOsc.setType("square")
		oscillators.push( iOsc);


	}
}
function draw() {
	background(0);
	fill(255)
	for(let i = 0; i < harmonics; i++) {
		rect(i * rWidth * 2 + 300 - totalD/2, 600-oscillators[i].getAmp()*100, rWidth, oscillators[i].getAmp()*100)
	}
	fill(...colours[playingState])
	rect(...toggleStart, 50, 25)
	fill(...colours[singingState])
	rect(...toggleSinging, 50, 25)
	stroke(255)
	line(0, 500, 600, 500)
	if(selected !== -1){
		oscillators[selected].amp((600-mouseY)/100)
	}
	if(singingState) {
		for(let i =0 ; i < harmonics; i++) {
			oscillators[i].freq(110 * Math.exp(mouseX*0.00259850183))
		}

	}
}
function mousePressed() {
	if(mouseX >= toggleStart[0] && mouseX < toggleStart[0] + btnH * 2 && mouseY >= toggleStart[1] && mouseY < toggleStart[1] + btnH) {
		playingState ++
		playingState %= 2;
		if(playingState === 1) {
			for(let i = 0; i < harmonics; i++) {

				oscillators[i].start()
			}
		} else {
			for(let i = 0; i < harmonics; i++) {

				oscillators[i].stop()
			}
		}
	}
	if(mouseX >= toggleSinging[0] && mouseX < toggleSinging[0] + btnH * 2&& mouseY >= toggleSinging[1] && mouseY < toggleSinging[1] + btnH) {
		singingState= (singingState+1)% 2
	}
	for(let i =0; i < harmonics; i++) {
		let newState = selected === -1 ? i : selected !== i ? i : -1;
		
		let h = 600-oscillators[i].getAmp()*100
		let xBounds = [i * rWidth * 2 + 300 - totalD/2, i * rWidth * 2 + 300 - totalD/2 + rWidth]
		
		if(mouseX < xBounds[0]) {
			if((h-mouseY)** 2 + (xBounds[0] - mouseX) ** 2 < 100) {
				selected = newState;
			}
		}
		if(xBounds[1] < mouseX) {
			if((h-mouseY)** 2 + (xBounds[1] - mouseX) ** 2 < 100) {
				selected = newState
			}

		}
		if(xBounds[0] <= mouseX && mouseX <= xBounds[1]) {
			if(Math.abs(h - mouseY) < 10) {
				selected = newState;
			}
		}
	}
}