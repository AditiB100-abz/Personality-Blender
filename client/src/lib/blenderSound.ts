let audioContext: AudioContext | null = null;
let noiseNode: AudioBufferSourceNode | null = null;
let gainNode: GainNode | null = null;
let oscillatorNode: OscillatorNode | null = null;
let isPlaying = false;

function createNoiseBuffer(context: AudioContext): AudioBuffer {
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  return buffer;
}

export function startBlenderSound(): void {
  if (isPlaying) return;
  
  try {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    const noiseBuffer = createNoiseBuffer(audioContext);
    noiseNode = audioContext.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 800;
    noiseFilter.Q.value = 1;
    
    const noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.15;
    
    oscillatorNode = audioContext.createOscillator();
    oscillatorNode.type = "sawtooth";
    oscillatorNode.frequency.value = 120;
    
    const oscFilter = audioContext.createBiquadFilter();
    oscFilter.type = "lowpass";
    oscFilter.frequency.value = 400;
    
    const oscGain = audioContext.createGain();
    oscGain.gain.value = 0.08;
    
    const lfo = audioContext.createOscillator();
    lfo.frequency.value = 8;
    const lfoGain = audioContext.createGain();
    lfoGain.gain.value = 30;
    lfo.connect(lfoGain);
    lfoGain.connect(oscillatorNode.frequency);
    
    const lfo2 = audioContext.createOscillator();
    lfo2.frequency.value = 3;
    const lfo2Gain = audioContext.createGain();
    lfo2Gain.gain.value = 100;
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(noiseFilter.frequency);
    
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0;
    
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(gainNode);
    
    oscillatorNode.connect(oscFilter);
    oscFilter.connect(oscGain);
    oscGain.connect(gainNode);
    
    gainNode.connect(audioContext.destination);
    
    noiseNode.start();
    oscillatorNode.start();
    lfo.start();
    lfo2.start();
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.3);
    
    isPlaying = true;
  } catch (e) {
    console.log("Audio not supported");
  }
}

export function stopBlenderSound(): void {
  if (!isPlaying || !audioContext || !gainNode) return;
  
  try {
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
    gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.2);
    
    setTimeout(() => {
      if (noiseNode) {
        noiseNode.stop();
        noiseNode.disconnect();
        noiseNode = null;
      }
      if (oscillatorNode) {
        oscillatorNode.stop();
        oscillatorNode.disconnect();
        oscillatorNode = null;
      }
      if (gainNode) {
        gainNode.disconnect();
        gainNode = null;
      }
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
      isPlaying = false;
    }, 300);
  } catch (e) {
    isPlaying = false;
  }
}
