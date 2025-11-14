const explorationCanvas = document.querySelector('#explorationCanvas');
const ctxExploration = explorationCanvas.getContext('2d');
explorationCanvas.width = 1298;
explorationCanvas.height = 380;

class EarthExploration {
    constructor() {
        this.size = 64;
        this.x = explorationCanvas.width / 2 - this.size / 2;
        this.y = explorationCanvas.height / 2 - this.size / 2;
        this.image = new Image();
        this.image.src = "./assets/img/earth.png";
        this.rotation = 0;
        this.rotationSpeed = 0.0015;
    }

    update() {
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctxExploration.save();
        ctxExploration.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctxExploration.rotate(this.rotation);
        ctxExploration.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctxExploration.restore();
    }
}

class Probe {
    constructor() {
        this.size = 32;
        this.x = explorationCanvas.width / 2 - this.size / 2;
        this.y = explorationCanvas.height / 2 - this.size / 2;
        this.startX = this.x;
        this.startY = this.y;
        this.baseSpeed = .08;
        this.speed = this.baseSpeed;
        this.maxSpeed = 1000;
        this.acceleration = 0.0008 + (Math.floor(30 * (60 - Data['sonde'].time)) / 100000);
        this.angle = Math.random() * Math.PI * 2;
        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        this.outward = true;
        this.timer = 0;
        this.image = new Image();
        this.image.src = "./assets/img/sonde.png";
        this.rotationAngle = Math.atan2(this.dy, this.dx) + Math.PI / 2;
        this.active = false;
        this.finished = false;
        this.totalTime = ((Data['sonde'].time - 4) * 60);
        this.randomStart = Math.random() * 200;
    }

    update() {
        if (!this.active || this.finished) return;
        if (this.randomStart <= 0) {

            if (this.outward) {
                if (this.speed < this.maxSpeed) this.speed += this.acceleration;
                this.x += this.dx;
                this.y += this.dy;
            } else {
                if (this.speed > this.baseSpeed) this.speed -= this.acceleration;
                this.x -= this.dx;
                this.y -= this.dy;
            }

            this.dx = Math.cos(this.angle) * this.speed;
            this.dy = Math.sin(this.angle) * this.speed;

            this.timer++;
            if (this.timer >= this.totalTime / 2) {
                if (!this.outward) this.finished = true;

                this.outward = !this.outward;
                this.timer = 0;
                this.rotationAngle += Math.PI;
                this.dx = Math.cos(this.angle) * this.speed;
                this.dy = Math.sin(this.angle) * this.speed;
            }
        } else {
            this.randomStart -= 1;
        }
    }

    draw() {
        if (!this.active || this.finished) return;

        ctxExploration.save();
        ctxExploration.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctxExploration.rotate(this.rotationAngle);
        ctxExploration.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctxExploration.restore();
    }
}

const earth = new EarthExploration();
let probes;

function animateEarth() {
    ctxExploration.clearRect(0, 0, explorationCanvas.width, explorationCanvas.height);
    earth.update();
    earth.draw();
    requestAnimationFrame(animateEarth);
}

function animateProbes() {
    probes.forEach(probe => {
        probe.update();
        probe.draw();
    });

    if (probes.every(probe => probe.finished)) {
        cancelAnimationFrame(probesAnimationId);
    } else {
        probesAnimationId = requestAnimationFrame(animateProbes);
    }
}
animateEarth();

let probesAnimationId;

function startProbesAnimation() {
    probes = Array.from({ length: Math.min(Data['global'].nbSondeFired, 80) }, () => new Probe());
    Promise.all([
        new Promise(resolve => earth.image.onload = resolve),
        ...probes.map(probe => new Promise(resolve => probe.image.onload = resolve))
    ]).then(() => {
        probes.forEach(probe => probe.draw());
    });

    probes.forEach(probe => {
        probe.active = true;
        probe.finished = false;
        probe.timer = 0;
        probe.x = explorationCanvas.width / 2 - probe.size / 2;
        probe.y = explorationCanvas.height / 2 - probe.size / 2;
        probe.outward = true;
    });
    animateProbes();
}