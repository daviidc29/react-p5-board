// Sketch P5.js con polling simple al backend para strokes compartidos
let myColor = '#FFFFFF';
let sizeInput;

function setup(){
  const wrapper = document.getElementById('canvasWrapper');
  const c = createCanvas(960, 540);
  c.parent(wrapper);
  background(0);
  sizeInput = document.getElementById('size');
  document.getElementById('clearBtn').addEventListener('click', clearBoard);

  // Obtener color asignado por sesión y primera carga
  fetch('/api/board').then(r=>r.json()).then(j=>{
    myColor = j.color || '#FFFFFF';
    document.getElementById('userColor').style.background = myColor;
    drawAll(j.strokes || []);
  });

  // Polling
  setInterval(pollBoard, 900);
}

function mouseDragged(){
  const s = parseInt(sizeInput.value, 10);
  const stroke = { x: mouseX, y: mouseY, size: s, color: myColor };
  drawStroke(stroke);
  // Enviar al servidor
  fetch('/api/board/stroke', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(stroke)
  });
}

function drawAll(strokes){
  background(0);
  strokes.forEach(drawStroke);
}

function drawStroke(s){
  noStroke();
  fill(s.color);
  ellipse(s.x, s.y, s.size, s.size);
}

function pollBoard(){
  fetch('/api/board').then(r=>r.json()).then(j=>{
    drawAll(j.strokes || []);
  });
}

function clearBoard(){
  fetch('/api/board/clear', {method:'POST'}).then(()=>{
    background(0);
  });
}
