import Pool from './pool';
import TextParticle from './text_particle';
import TextParticleEmitter from './text_particle_emitter';

export default class TextParticleManager {
  constructor (options) {
    let { max, preallocate } = options || { max: 100, preallocate: 100 };
    this.max = max;
    this.foldElement = document.createElement('div');
    this.foldElement.className = 'text-particle-manager-reservoir';
    this.foldElement.style.display = 'none';
    this.pool = new Pool({ tagName: 'span', preallocate, parent: this.foldElement });
    this.particles = [];
    this.emitters = [];
  }
  
  createParticle (options) {
    if (this.particles.length < this.max) {
      this.particles.push(new TextParticle({...options, el: this.pool.pop()}));
    }
  }
  
  createEmitter (options) {
    this.emitters.push(new TextParticleEmitter({...options, manager: this}));
  }
  
  update(dt) {
    let f = (dt/1000);
    this.particles = this.particles.filter(p => {
      p.update(f);
      if (p.alive) { return true; }
      
      // disappear and return to pool
      p.el.style.opacity = 0;
      this.pool.push(p.el);
      return false;
    });
    
    this.emitters = this.emitters.filter(e => {
      e.update(f);
      if (e.alive) { return true; }
      return false;
    });
  }
}