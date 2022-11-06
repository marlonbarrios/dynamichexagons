const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
const Tweakpane = require('tweakpane');


new p5()

const params = {
  rings: 50,
  sides: 8,
  radius: 0.48,
  background: 255,
  colorLines: 0,
  maxLinesThikness: 1,
  minLinesThikness: 0.001,
  pingPongSpeed: 0.5,
  loop: false,
  frame:0,

}
  

const settings = {

  pixelsPerInch: 300,
   // Tell canvas-sketch we're using p5.js
   p5: true,
   // Turn on a render loop (it's off by default in canvas-sketch)

   duration: 3,

    animate: true,

    // We can specify dimensions if we want a fixed size on the first render
    dimensions:[2048, 2048],
    // orientation: 'landscape',
    bleed: 1 / 8,
    // attributes: {
    // antialias: true
    // }
};

// window.preload = () => {

// };



canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  const createPane = () => {
    const pane = new Tweakpane.Pane();
    let folder;
 
    folder = pane.addFolder({title: 'Controllers'});
  // folder.addInput(params, 'animate', {label: 'Animation'});

  folder.addInput(params, 'rings', {min: 1, max: 100, step: 1});
  folder.addInput(params, 'sides', {min: 1, max: 12, step: 1});
  folder.addInput(params, 'radius', {min: 0, max: 1, step: 0.01});
  folder.addInput(params, 'background', {min: 0, max: 255, step: 1});
  folder.addInput(params, 'colorLines', {min: 0, max: 255, step: 1});
  folder.addInput(params, 'maxLinesThikness', {min: 0, max: 1, step: 0.001});
  folder.addInput(params, 'minLinesThikness', {min: 0, max: 1, step: 0.001});
  folder.addInput(params, 'pingPongSpeed', {min: 0, max: 1, step: 0.001});




  
  }
     
  // createPane()
  // Attach events to window to receive them
  // window.mouseClicked = () => {
  //   console.log('Mouse clicked');
  // };
 
  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // background(params.background);
    clear();

    // Draw with p5.js things
   // For consistent sizing regardless of portrait/landscape
  const dim = Math.min(width, height);
  
  // Black background

  
  // Stroke only with a specific join style and thickness
  noFill();
  stroke(params.colorLines);
  strokeJoin(MITER);

  // Get time in seconds
  const time = millis() / 1000;
	const f = params.loop ? frame : params.frame;
  const rings = params.rings;
  const sides = params.sides;
  const maxRadius = dim * params.radius;
  
  for (let i = 0; i < rings; i++) {
    // Get a normalized 't' value that isn't 0
    const t = (i + 1) / rings;
    
    // Scale it by max radius
    const radius = t * maxRadius;

    // Min and max line thickness
    const maxThickness = maxRadius / rings * params.maxLinesThikness;
    const minThickness = maxRadius / rings * params.minLinesThikness;
    
    // Get a value that ping pongs between 0 and 1
    // We offset by t * N to give it some variety
    const pingPong = sin(t * 3.0 + time) * params.pingPongSpeed + 0.5;
    
    // Compute the actual thickness
    const thickness = lerp(minThickness, maxThickness, pingPong);

    // Draw line
    strokeWeight(thickness);
    polygon(width / 2, height / 2, radius, sides, PI / 2);
  }
}

// Draw a basic polygon, handles triangles, squares, pentagons, etc
function polygon(x, y, radius, sides = 3, angle = 0) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides);
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


}, settings);




