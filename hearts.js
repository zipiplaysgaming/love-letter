const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + 20;
  this.size = Math.random() * 10 + 10;
  this.speedY = Math.random() * 1 + 0.5;
  this.opacity = Math.random() * 0.5 + 0.5;
  this.color = 'rgba(255, 63, 129,' + this.opacity + ')';
}

function createHearts() {
  if (hearts.length < 150) {
    hearts.push(new Heart());
  }
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    let h = hearts[i];
    ctx.beginPath();
    ctx.moveTo(h.x, h.y);
    ctx.bezierCurveTo(h.x + h.size / 2, h.y - h.size / 2, h.x + h.size, h.y + h.size / 3, h.x, h.y + h.size);
    ctx.bezierCurveTo(h.x - h.size, h.y + h.size / 3, h.x - h.size / 2, h.y - h.size / 2, h.x, h.y);
    ctx.fillStyle = h.color;
    ctx.fill();
    h.y -= h.speedY;
    if (h.y + h.size < 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  createHearts();
  drawHearts();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
