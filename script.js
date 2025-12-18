const loadingText = document.getElementById('loading-text');
const mainContent = document.getElementById('main-content');
const loadingScreen = document.getElementById('loading-screen');

// Starfield Animation
const canvas = document.createElement('canvas');
canvas.id = 'starCanvas';
document.getElementById('starfield').appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 300;

// create a star with random starting position near the center SomeWeirdNameQ someweirdnameq
function createStar(x=0,y=0,mouse=false) {
  const centerArea = 100; // Adjust size of the central area
  const offsetX = (Math.random() - 0.5) * centerArea;
  const offsetY = (Math.random() - 0.5) * centerArea;
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 2 + 0.5;
  var xs = Math.random() * canvas.width;//canvas.width / 2 + offsetX
  var ys = Math.random() * canvas.height;//canvas.height / 2 + offsetY
  if(mouse == true){xs=x;ys=y}
  return {
    x: xs,
    y: ys,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: Math.random() * 5 + 3, // Larger for star shapes
    lifetime: Math.random() * 100 + 100
  };
}

// Generate initial stars
for (let i = 0; i < numStars; i++) {
  stars.push(createStar());
}

// Function to draw a star shape
function drawStar(ctx, x, y, radius, points, inset) {
  ctx.beginPath();
  const step = Math.PI / points;

  for (let i = 0; i < 2 * points; i++) {
    const angle = i * step;
    const r = i % 2 === 0 ? radius : radius * inset;
    const sx = x + Math.cos(angle) * r;
    const sy = y + Math.sin(angle) * r;
    ctx.lineTo(sx, sy);
  }
  
  ctx.shadowColor = "#9BFAFA"; // I don't know the actual color should change
  ctx.shadowOffsetX = 1;
  ctx.shadowBlur = 10;
  ctx.closePath();
  ctx.fill();
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw each star
  stars.forEach((star, index) => {
    star.x += star.vx;
    star.y += star.vy;
    star.size *= 1; // Shrink size as it moves outward

    ctx.fillStyle = '#67dbf5';// STROK COLOR `rgba(155,${getRandomArbitrary(0,255)},${getRandomArbitrary(0,255)})`;
    drawStar(ctx, star.x, star.y, star.size, 4, 0.2);
    star.lifetime -= 1;
    // Remove star if it moves off-screen or becomes too small
    if (
      star.x < 0 ||
      star.x > canvas.width ||
      star.y < 0 ||
      star.y > canvas.height ||
      star.size < 0.2 ||
      star.lifetime <= 0
    ) {
      stars[index] = createStar(); // Replace with a new star
    }
  });

  requestAnimationFrame(animate);
}

animate();

// Handle Loading Screen
const messages = [
  "🔎Searching",
  "The Celestial Stardust",
  "ONE(1) RESULT FOUND !!",
  "KiriStaryear !",
  "loading profile"
  /*"🔎 Searching...",
  "🔎Searching...",
  "The Celestial Stardust...",
  "ONE(1) RESULT...",
  "Result Found",*/
];

let messageIndex = 0;
let letters = 0;

function showMessage() {
  if (messageIndex < messages.length) {
    // Reset text for the current message
    loadingText.textContent = "";
    letters = 0; // Reset letter index
    showeveryletter(); // Start showing letters
  } else {
    // Once all messages are done, switch to main content
    loadingText.style.display = "none";
    mainContent.style.display = "block";
  }
}

function showeveryletter() {
  const message = messages[messageIndex]; // Get the current message
  if (letters < message.length) {
    // Append the next letter
    loadingText.textContent += message[letters];
    letters++;

    // Schedule the next letter
    setTimeout(showeveryletter, 100);
  } else {
    // When the message is done, move to the next message after a delay
    messageIndex++;
    setTimeout(showMessage, 1000); // Add a delay before showing the next message
  }
}




// Add stars at cursor position
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  for (let i = 0; i < 5; i++) {
    stars.push(createStar(mouseX, mouseY, true)); // Add stars with larger size near the cursor
    stars.shift(); // Remove Old Star 'clutter'
  }
});


// Start the loading sequence
//messageIndex = messages.length + 1 
showMessage();

// Handle screen resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


const modelImage = document.getElementById("model-image");
  // Apply a 3D rotation
modelImage.addEventListener("mouseenter", () => {
  // Apply a 3D rotation
  if (modelImage.style.transform == "rotateY(360deg)"){
	  modelImage.style.transform = "rotateY(0deg)";
  }else {
      modelImage.style.transform = "rotateY(360deg)";
  }
});
