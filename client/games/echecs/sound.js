/**
 * Sons du jeu — synthétisés via Web Audio (oscillateurs), aucun fichier audio à charger.
 * Deux "packs" (timbre différent) ; volume et coupure réglables.
 */
export class SoundKit {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.5;
    this.pack = 'classique'; // 'classique' | 'doux'
  }

  _ensureCtx() {
    if (this.ctx) return this.ctx;
    const AC = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return null;
    this.ctx = new AC();
    return this.ctx;
  }

  _tone({ freq, duration, type = 'sine', gain = 1, delay = 0, glideTo = null }) {
    if (!this.enabled) return;
    const ctx = this._ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = this.pack === 'doux' ? 'sine' : type;
    const t0 = ctx.currentTime + delay;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo) osc.frequency.linearRampToValueAtTime(glideTo, t0 + duration);
    const peak = Math.max(0.0001, gain * this.volume * (this.pack === 'doux' ? 0.5 : 0.7));
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  move() { this._tone({ freq: 420, duration: 0.09, type: 'triangle', gain: 0.5 }); }

  capture() {
    this._tone({ freq: 220, duration: 0.14, type: 'square', gain: 0.6 });
    this._tone({ freq: 140, duration: 0.12, type: 'square', gain: 0.4, delay: 0.03 });
  }

  check() {
    this._tone({ freq: 880, duration: 0.12, type: 'sawtooth', gain: 0.5 });
    this._tone({ freq: 660, duration: 0.14, type: 'sawtooth', gain: 0.4, delay: 0.09 });
  }

  castle() {
    this._tone({ freq: 330, duration: 0.1, type: 'triangle', gain: 0.5 });
    this._tone({ freq: 440, duration: 0.12, type: 'triangle', gain: 0.5, delay: 0.08 });
  }

  promote() {
    [523, 659, 784, 1046].forEach((f, i) => this._tone({ freq: f, duration: 0.14, type: 'sine', gain: 0.45, delay: i * 0.07 }));
  }

  winFanfare() {
    [523, 659, 784, 1046, 1318].forEach((f, i) => this._tone({ freq: f, duration: 0.22, type: 'triangle', gain: 0.55, delay: i * 0.1 }));
  }

  loseTone() {
    [392, 330, 262, 196].forEach((f, i) => this._tone({ freq: f, duration: 0.3, type: 'sine', gain: 0.45, delay: i * 0.14 }));
  }

  drawTone() {
    [392, 392].forEach((f, i) => this._tone({ freq: f, duration: 0.2, type: 'sine', gain: 0.4, delay: i * 0.22 }));
  }

  lowTime() { this._tone({ freq: 1000, duration: 0.06, type: 'square', gain: 0.35 }); }

  chatMessage() { this._tone({ freq: 700, duration: 0.05, type: 'sine', gain: 0.28, glideTo: 900 }); }
}
