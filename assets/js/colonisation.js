const colonisationCanvas = document.querySelector('#colonisationCanvas');
const ctxColonisation = colonisationCanvas.getContext('2d');
colonisationCanvas.width = 1298;
colonisationCanvas.height = 380;

class EarthColonisation {
    constructor(img, x) {
        this.size = 64 + 8;
        this.x = x;
        this.y = colonisationCanvas.height / 2 - this.size / 2;
        this.image = new Image();
        this.image.src = img;
        this.rotation = 0;
        this.rotationSpeed = 0.0012;
    }

    update() {
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctxColonisation.save();
        ctxColonisation.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctxColonisation.rotate(this.rotation);
        ctxColonisation.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctxColonisation.restore();
    }
}

class Ship {
    constructor() {
        this.size = 32;
        this.x = 32;
        this.y = colonisationCanvas.height / 2 - this.size / 2;
        this.startX = this.x;
        this.startY = this.y;
        this.baseSpeed = 1150 / ((Data['shipB'].time + (Data['shipB'].upgrade.value * Data['shipB'].upgrade.level)) * 60);
        this.speed = this.baseSpeed;
        this.maxSpeed = 1000;
        this.timer = 0;
        this.image = new Image();
        this.image.src = "./assets/img/ship2.png";
        this.rotationAngle = 0;
        this.active = false;
        this.finished = false;
        this.totalTime = ((Data['shipB'].time + (Data['shipB'].upgrade.value * Data['shipB'].upgrade.level) - 4) * 60);
        this.randomStart = Math.random() * 200;
        this.endX = this.startX + 1150;
        this.maxHeight = getRandomArbitrary(-180, 180);
        this.progress = 0;
    }

    update() {
        if (!this.active || this.finished) return;
        if (this.randomStart <= 0) {
            if (this.timer >= this.totalTime) this.finished = true;
            
            this.progress = this.timer / this.totalTime;
            
            this.x = this.startX + (this.endX - this.startX) * this.progress;
            
            const parabolaHeight = 4 * this.maxHeight * this.progress * (1 - this.progress);
            this.y = this.startY - parabolaHeight;
            const dx = (this.endX - this.startX) / this.totalTime;
            const dy = -4 * this.maxHeight * (1 - 2 * this.progress) / this.totalTime;
            this.rotationAngle = Math.atan2(dy, dx);
    
            this.timer++;
        } else {
            this.randomStart -= 1;
        }
    }

    draw() {
        if (!this.active || this.finished) return;
    
        ctxColonisation.save();
        ctxColonisation.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctxColonisation.rotate(this.rotationAngle);
        ctxColonisation.drawImage(this.image, -this.size / 2, -this.size / 2, this.size * 1.37, this.size);
        ctxColonisation.restore();
    }
}

const earthColonisation = new EarthColonisation("./assets/img/earth.png", 32);
const discoverColonisation = new EarthColonisation("./assets/img/planetDiscover2.png", 1298 - 64 - 64);


function animateEarthColonisation() {
    ctxColonisation.clearRect(0, 0, colonisationCanvas.width, colonisationCanvas.height);

    earthColonisation.update();
    earthColonisation.draw();
    
    discoverColonisation.update();
    discoverColonisation.draw();

    requestAnimationFrame(animateEarthColonisation);
}

animateEarthColonisation();



let ships;
let shipsAnimationId;

function animateShips() {
    ships.forEach(ship => {
        ship.update();
        ship.draw();
    });

    if (ships.every(ship => ship.finished)) {
        cancelAnimationFrame(shipsAnimationId);
    } else {
        shipsAnimationId = requestAnimationFrame(animateShips);
    }
}

function startShipsAnimation() {
    ships = Array.from({ length: Math.min(Data['global'].nbShipBFired + Data['global'].nbShipWFired, 40) }, () => new Ship());
    Promise.all([
        ...ships.map(ship => new Promise(resolve => ship.image.onload = resolve))
    ]).then(() => {
        ships.forEach(ship => ship.draw());
    });

    ships.forEach(ship => {
        ship.active = true;
        ship.finished = false;
        ship.timer = 0;
    });
    animateShips();
}