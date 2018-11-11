import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager();

document.querySelector('button').addEventListener('click', () => {
  // t.createEmitter({
  //   manager: this,
  //   position: { x: 125, y: 80 },
  //   maxEmissions: 1,
  //   emitEvery: 200,
  //   getParticleTTL: () => 500,
  //   getVelocity: () => ({x: 0, y: -100}),
  //   getText: (emitter) => '+1',
  //   onCreate: (p) => {
  //     p.setStyle({
  //       fontSize: '18px',
  //       fontFamily: 'monospace',
  //       fontWeight: 'bold'
  //     });
  //   },
  //   onUpdate: (p) => {
  //     // p.el.style.fontSize = `${p.lerp(18, 1, p.lifeFrac)}px`;
  //   }
  // });
  t.createParticle({
    position: {x: 125, y: 10},
    text: 'A',
    ttl: 2000,
    onCreate: (p) => {
     // p.setStyle({ border: '1px solid #000' }); 
    },
    onUpdate: (p) => {
      p.scale = { x: p.lerp(1, 0), y: p.lerp(1, 0.5) }
    }
  });
});

let render = (dt) => {
  t.update(dt);
}

let start = null;
let loop = (timestamp) => {
  if (!start) start = timestamp;
  let dt = timestamp - start;
  start = timestamp;
  render(dt);
  
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);