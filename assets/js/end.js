const canvas = document.getElementById('hyperspace');
const ctxEnd = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let animationStartTime;

const stars = [];
const starCount = 500;
let starsSpeed = 0;
let textOpacity = 0;
let textScale = 0.5;

function getStarColor() {
    const variations = [
        'rgba(255, 255, 255, 0.8)',   // Blanc pur
        'rgba(255, 255, 220, 0.8)',   // Blanc légèrement jaune
        'rgba(255, 254, 240, 0.8)',   // Jaune très pale
        'rgba(255, 253, 230, 0.8)'    // Nuance de jaune clair
    ];
    return variations[Math.floor(Math.random() * variations.length)];
}

function createStar() {
    return {
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        color: getStarColor(),
        brightness: Math.random() * 0.5 + 0.5  // Variation de luminosité
    };
}

// Remplissage initial des étoiles
for (let i = 0; i < starCount; i++) {
    stars.push(createStar());
}

function drawStar(star) {
    const x = (star.x / (star.z * 0.001)) + 4;
    const y = (star.y / (star.z * 0.001)) + 4;
    const radius = 1.2 * (1 / (star.z * 0.001));

    // Effet de scintillement subtil
    const opacity = star.brightness * (1 - Math.abs(Math.sin(Date.now() * 0.001)) * 0.2);

    ctxEnd.beginPath();
    ctxEnd.shadowBlur = 10;
    ctxEnd.shadowColor = star.color;
    ctxEnd.arc(x + canvas.width / 2, y + canvas.height / 2, radius, 0, 2 * Math.PI);
    ctxEnd.fillStyle = star.color.replace('0.8', opacity.toFixed(2));
    ctxEnd.fill();
    ctxEnd.shadowBlur = 0;
}

function updateStar(star) {
    star.z -= starsSpeed;
    if (star.z <= 1) {
        Object.assign(star, createStar());
        star.z = canvas.width;
    }
}


function animate(timestamp) {
    if (!animationStartTime) animationStartTime = timestamp;
    const elapsedTime = timestamp - animationStartTime;

    if (elapsedTime < 10000) {
        ctxEnd.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctxEnd.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            updateStar(star);
            drawStar(star);
        });

        if (starsSpeed < 50) starsSpeed += 0.1;

        requestAnimationFrame(animate);
    } else {
        // Arrêt progressif des étoiles
        starsSpeed = Math.max(starsSpeed - 0.5, 0);

        ctxEnd.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctxEnd.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            updateStar(star);
            drawStar(star);
        });

        showEndMessage();

        if (textOpacity < 1) {
            requestAnimationFrame(animate);
        }
    }
}
function showEndMessage() {
    // Fondu progressif du fond
    ctxEnd.fillStyle = `rgba(0, 0, 0, ${textOpacity * 0.7})`;
    ctxEnd.fillRect(0, 0, canvas.width, canvas.height);

    // Apparition progressive du texte
    ctxEnd.font = `bold ${32 * textScale}px Poppins`;
    ctxEnd.fillStyle = `rgba(255, 255, 255, ${textOpacity})`;
    ctxEnd.textAlign = 'center';
    ctxEnd.textBaseline = 'middle';
    ctxEnd.textDecoration = 'underline';
    
    // Effet de zoom et de fondu
    ctxEnd.save();
    ctxEnd.translate(canvas.width / 2, canvas.height / 2);
    ctxEnd.scale(textScale, textScale);
    ctxEnd.fillText('Votre aventure s\'arrête ici', 0, 0);
    ctxEnd.restore();

    // Augmentation progressive de l'opacité et de l'échelle
    textOpacity = Math.min(textOpacity + 0.02, 1);
    textScale = Math.min(textScale + 0.02, 1);
}

// Gestion responsive
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


document.querySelector('.end__start').addEventListener('click', () => {
    requestAnimationFrame(animate);
})