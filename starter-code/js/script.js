

class Timer {

    constructor(){
        this.type = "pomodoro";
        this.circle = document.querySelector("#ring > circle");
        this.clock = document.getElementById("time");
        this.actionElem = document.getElementById("action");
        this.timer = 25;
        this.text = `${this.timer <= 9 ? 0 + this.timer : this.timer}`;
    }
/**
 * Used to reset your timer to original value
 * @param {integer} time 
 */
    reset(time) {
        this.stop();
        this.timer = time;
        this.text = `${this.timer <= 9 ? 0 + this.timer : this.timer}`;
        this.actionElem.innerText = "start"
        this.clock.innerText = `${this.text} :00`;
        this.circle.style.strokeDashoffest = 0;
    }
    
/**
 * The start method to have the clock count down and the ring move
 *  
 */
    start() {

        // used to format our time correctly 
        const format = (timeFormat) => {
            return `${timeFormat < 10 ? 0 + timeFormat : timeFormat}`;
        }
        this.clock.innerText = `${this.text}:00`
        // initialize our variables 
        let time = this.timer * 60;
        let startTime = time;
        let minutes = 0;
        let seconds = 0;
        time--;
        // Method to set our interval on the ring to 
        this.interval = setInterval(() => {
            minutes = Math.floor(time / 60);
            seconds = Math.floor(time % 60);

            let minutesText = format(minutes);
            let secondsText = format(seconds);

            this.clock.innerText = minutesText + ":" + secondsText;
            // find to percent of time used and the ring offset
            const percent = (time % startTime) / startTime;
            const offset = percent * 1024 ;
            // use the circles stroke dash offset style to manipulate the ring
            this.circle.style.strokeDashoffset = offset
            console.log(this.clock.innerText)
            console.log(this.timer)

            if (--time <= 0) {
                this.timer = 0;
                clearInterval(this.interval);
            }
        }, 100)
        
        this.actionElem.innerText = "pause"
        console.log(this.clock.innerText)
    }
/**
 * Stop method to stop the clock
 */
    stop() {
        clearInterval(this.interval);
        this.actionElem.innerText = "start"
    }

    resume() {
        let pause = this.clock.innerText;
        if(this.timer != pause) {
            
        }
    }
}
// instantiate the Timer class into an object
const countDownTimer = new Timer();
countDownTimer.reset(25);

function action(str) {
    switch (str.toLowerCase()) {
        case "start":
            countDownTimer.start();
            break;
        default:
            countDownTimer.stop();
            break
    }
}
/*
--------------------------------------------------------------------------------
Nav functions
--------------------------------------------------------------------------------
*/

const navLinks = document.querySelectorAll("nav > ul > li");
const navBg = document.getElementById("bgindicator");

for (const index in navLinks) {
    navLinks.item(index).addEventListener('click', (ev) => {
        navLinks.forEach((link) => link.classList.remove("active"));
        
        navBg.style.marginLeft = `calc(calc(100%/3) * ${index})`;
        ev.target.classList.add("active");
        console.log(ev.target.innerText )
        let navText = ev.target.innerText;
        if(navText == "short break"){
            countDownTimer.reset(5)
        } else if (navText == "long break") {
            countDownTimer.reset(15)
        } else countDownTimer.reset(25)
    });
}

const timeChange = document.getElementById("time");


/*
--------------------------------------------------------------------------------
Settings functions
--------------------------------------------------------------------------------
*/

const settingscontainer = document.getElementById("settingsContainer")


// Settings button
document.querySelector("#settings > img").addEventListener("click", ev => {
    settingscontainer.style.visibility = "visible"
    settingscontainer.style.opacity = 1;
});


// Number input up and down arrow
document.querySelectorAll(".uparrow, .downarrow").forEach((arrow) => {
    arrow.addEventListener("click", (ev) => ev.preventDefault());
});

// settings closed button
document.querySelectorAll("#close, #settingsOverlay").forEach(el =>
    el.addEventListener("click", () => {
    settingscontainer.style.opacity = 0;
    settingscontainer.style.visibility = "hidden";
}));

/**
 * Increment number input
 * @param {string} input the id of the number input
 * @returns 
 */

const inc = (input) => document.getElementById(input).stepUp(1);

/**
 * decrement number input
 * @param {String} input the id of the number input
 * @returns 
 */
const dec = (input) => document.getElementById(input).stepDown(1);

/*
-------------------------------------------------------------------------------------
FONT SETTINGS
-------------------------------------------------------------------------------------
*/

const fontLink = document.querySelectorAll(".style");
const fontBg = document.getElementById("fontBg")

for (const index in fontLink) {
    fontLink.item(index).addEventListener("click", (evt) => {
        fontLink.forEach((item) => item.classList.remove("active"));
        
        fontBg.style.marginLeft = `calc(calc(100%/3) * ${index})`;
        evt.target.classList.add("active");
        console.log(evt.target.innerText )
        let fontText = evt.target.innerText;
        if(fontText == ""){
            countDownTimer.reset(5)
        } else if (fontText == "long break") {
            countDownTimer.reset(15)
        } else countDownTimer.reset(25)
    })
}