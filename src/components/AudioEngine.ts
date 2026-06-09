/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = true;
  private humFrequency: number = 42; // Low ambient frequency in Hz

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      console.warn("Web Audio API is not supported in this browser.");
    }
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    this.init();
    
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (mute) {
      this.stopAmbientHum();
    } else {
      this.startAmbientHum();
    }
  }

  getMutedStatus(): boolean {
    return this.isMuted;
  }

  // Deep structural hum running in the background for atmospheric depth
  private startAmbientHum() {
    if (this.isMuted || !this.ctx) return;
    this.stopAmbientHum();

    try {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = "sine";
      this.ambientOsc.frequency.setValueAtTime(this.humFrequency, this.ctx.currentTime);

      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      // Soft ramp-up to avoid loud clicks
      this.ambientGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.0);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
      this.ambientOsc.start();
    } catch (e) {
      console.error("Failed to start hum synth:", e);
    }
  }

  private stopAmbientHum() {
    try {
      if (this.ambientOsc) {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
        this.ambientOsc = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    } catch {
      // Ignore cleanup errors
    }
  }

  // Micro cursor click/tick
  playTick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      // Extremely quick high frequency decay
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  }

  // Smooth slide/whoosh effect
  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(80, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {
      // Ignore
    }
  }

  // Golden chime chord when major success occurs (e.g. Easter egg, quiz completed)
  playChimeChord() {
    if (this.isMuted || !this.ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.9);
      });
    } catch {
      // Ignore
    }
  }
}

export const AudioEngine = new AudioSynthEngine();
