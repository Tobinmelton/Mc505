const trackDefinitions = [
  { id: "bd", label: "Kick", voice: "kick" },
  { id: "sd", label: "Snare", voice: "snare" },
  { id: "clap", label: "Clap", voice: "clap" },
  { id: "chh", label: "Closed HH", voice: "hatClosed" },
  { id: "ohh", label: "Open HH", voice: "hatOpen" },
  { id: "perc", label: "Perc", voice: "perc" },
  { id: "bass", label: "Bass", voice: "bass" }
];

const deckIds = ["A", "B", "C"];

const makeSteps = (hits) => {
  const steps = Array(16).fill(0);
  hits.forEach(([step, value]) => { steps[step] = value; });
  return steps;
};

const buildPattern = (name, nativeBpm, hits) => ({
  name,
  nativeBpm,
  parts: Object.fromEntries(trackDefinitions.map(({ id }) => [id, makeSteps(hits[id] || [])]))
});
const createTrackEnvelope = () => ({
  target: "filter",
  pitch: { depth: 24, attack: 14, decay: 24, sustain: 0, release: 12 },
  filter: { depth: 32, attack: 8, decay: 32, sustain: 56, release: 24 },
  amp: { depth: 0, attack: 4, decay: 18, sustain: 72, release: 20 }
});

const createTrackLfo = () => ({
  target: "off",
  shape: "sine",
  rate: 4,
  depth: 0
});

const patternLibrary = {
  "001": {
    name: "Warehouse",
    nativeBpm: 126,
    parts: {
      bd: makeSteps([[0, 118], [4, 108], [8, 118], [12, 108]]),
      sd: makeSteps([[4, 108], [12, 112]]),
      clap: makeSteps([[12, 82]]),
      chh: makeSteps([[0, 78], [2, 58], [4, 76], [6, 58], [8, 80], [10, 58], [12, 76], [14, 64]]),
      ohh: makeSteps([[6, 65], [14, 72]]),
      perc: makeSteps([[3, 56], [7, 78], [11, 58], [15, 82]]),
      bass: makeSteps([[0, 43], [6, 43], [8, 38], [14, 41]])
    }
  },
  "002": {
    name: "Broken Circuit",
    nativeBpm: 122,
    parts: {
      bd: makeSteps([[0, 116], [6, 92], [10, 108], [14, 88]]),
      sd: makeSteps([[4, 110], [12, 104], [15, 62]]),
      clap: makeSteps([[7, 86], [15, 70]]),
      chh: makeSteps([[0, 82], [2, 54], [5, 66], [7, 58], [8, 75], [10, 54], [13, 66], [15, 58]]),
      ohh: makeSteps([[2, 66], [10, 76]]),
      perc: makeSteps([[1, 64], [6, 82], [9, 68], [14, 96]]),
      bass: makeSteps([[0, 43], [3, 46], [6, 50], [8, 38], [11, 42], [14, 46]])
    }
  },
  "003": buildPattern("One Drop", 82, {
    bd: [[8, 116]], sd: [[8, 104]], clap: [[8, 42]],
    chh: [[2, 54], [6, 66], [10, 58], [14, 70]],
    ohh: [[6, 46], [14, 58]], perc: [[3, 52], [11, 64]],
    bass: [[0, 43], [6, 50], [8, 38], [14, 46]]
  }),
  "004": buildPattern("Rockers", 112, {
    bd: [[0, 112], [4, 96], [8, 112], [12, 100]], sd: [[4, 102], [12, 108]], clap: [[12, 38]],
    chh: [[0, 70], [2, 48], [4, 68], [6, 48], [8, 72], [10, 50], [12, 70], [14, 54]],
    ohh: [[6, 48], [14, 62]], perc: [[3, 58], [7, 72], [11, 60], [15, 78]],
    bass: [[0, 43], [4, 43], [8, 38], [12, 41]]
  }),
  "005": buildPattern("Steppers", 128, {
    bd: [[0, 116], [4, 108], [8, 116], [12, 108]], sd: [[4, 88], [8, 98], [12, 90]], clap: [[12, 62]],
    chh: [[0, 64], [2, 48], [4, 66], [6, 50], [8, 68], [10, 48], [12, 66], [14, 52]],
    ohh: [[6, 44], [14, 58]], perc: [[3, 60], [7, 78], [11, 58], [15, 84]],
    bass: [[0, 43], [4, 43], [8, 38], [12, 41]]
  }),
  "006": buildPattern("Dubwise One Drop", 76, {
    bd: [[8, 118]], sd: [[8, 110]],
    chh: [[2, 48], [6, 62], [10, 50], [14, 66]], ohh: [[14, 58]],
    perc: [[1, 52], [5, 70], [11, 48], [15, 76]], bass: [[0, 43], [7, 50], [8, 38], [15, 46]]
  }),
  "007": buildPattern("Nyabinghi Pulse", 88, {
    bd: [[0, 108], [8, 104]], sd: [[8, 78]], clap: [[8, 34]],
    chh: [[3, 46], [7, 56], [11, 50], [15, 60]],
    perc: [[2, 82], [6, 60], [10, 88], [14, 66]], bass: [[0, 43], [5, 50], [8, 38], [13, 46]]
  }),
  "008": buildPattern("Digital Roots", 94, {
    bd: [[0, 112], [6, 80], [10, 106]], sd: [[4, 106], [12, 110]], clap: [[12, 54]],
    chh: [[0, 68], [2, 48], [4, 66], [7, 58], [8, 70], [10, 50], [12, 68], [15, 60]],
    ohh: [[6, 52], [14, 64]], perc: [[3, 62], [9, 72], [15, 84]],
    bass: [[0, 43], [3, 46], [6, 50], [8, 38], [11, 41], [14, 46]]
  }),
  "009": buildPattern("Sound System", 120, {
    bd: [[0, 116], [4, 100], [8, 116], [12, 102]], sd: [[4, 92], [12, 108]], clap: [[12, 72]],
    chh: [[0, 66], [2, 50], [4, 66], [6, 52], [8, 70], [10, 50], [12, 68], [14, 56]],
    ohh: [[6, 54], [14, 70]], perc: [[3, 58], [7, 80], [11, 64], [15, 92]],
    bass: [[0, 43], [4, 43], [7, 50], [8, 38], [12, 41], [15, 46]]
  }),
  "010": buildPattern("Half-Time Dub", 70, {
    bd: [[0, 116], [10, 92]], sd: [[8, 112]], clap: [[8, 50]],
    chh: [[2, 46], [6, 58], [10, 48], [14, 64]], ohh: [[14, 52]],
    perc: [[3, 62], [7, 74], [15, 80]], bass: [[0, 43], [6, 50], [8, 38], [14, 41]]
  }),
  "011": buildPattern("Rub-a-Dub", 108, {
    bd: [[0, 108], [8, 114]], sd: [[4, 104], [12, 110]], clap: [[12, 48]],
    chh: [[0, 62], [2, 48], [4, 66], [6, 52], [8, 68], [10, 48], [12, 66], [14, 54]],
    ohh: [[6, 50], [14, 66]], perc: [[2, 54], [7, 86], [10, 58], [15, 92]],
    bass: [[0, 43], [3, 50], [6, 46], [8, 38], [11, 46], [14, 41]]
  }),
  "012": buildPattern("Echo Chamber", 116, {
    bd: [[0, 110], [4, 94], [8, 114], [12, 98]], sd: [[4, 100], [12, 106]], clap: [[12, 46]],
    chh: [[2, 46], [6, 58], [10, 50], [14, 64]], ohh: [[6, 54], [14, 72]],
    perc: [[1, 54], [5, 66], [9, 58], [13, 74]], bass: [[0, 43], [4, 46], [8, 38], [12, 41]]
  }),
  "013": buildPattern("Dubplate Stepper", 132, {
    bd: [[0, 118], [4, 110], [8, 118], [12, 110]], sd: [[4, 86], [8, 94], [12, 90]], clap: [[12, 58]],
    chh: [[0, 62], [2, 46], [4, 64], [6, 50], [8, 68], [10, 48], [12, 66], [14, 52]],
    ohh: [[6, 48], [14, 62]], perc: [[3, 64], [7, 84], [11, 66], [15, 94]],
    bass: [[0, 43], [4, 43], [7, 50], [8, 38], [12, 41], [15, 46]]
  }),
  "014": buildPattern("Deep Roots", 84, {
    bd: [[0, 110], [8, 116]], sd: [[8, 106]], clap: [[8, 38]],
    chh: [[2, 42], [6, 54], [10, 48], [14, 62]], ohh: [[14, 48]],
    perc: [[3, 52], [6, 72], [11, 56], [15, 84]], bass: [[0, 43], [5, 50], [8, 38], [11, 41], [14, 46]]
  })
};

const projectStorageKey = "mc505-groovebox-project-v1";

const appState = {
  playing: false,
  selectedTrack: "bd",
  editDeck: "A",
  patternIds: { A: "001", B: "002", C: "003" },
  deckEnabled: { A: true, B: true, C: true },
  activeDeck: "A",
  beatSync: true,
  tempo: 126,
  octave: 0,
  mixerMode: "level",
  activeMasterParameter: "quantize",
  filterType: "lowpass",
  mfxType: "off",
  mfxAmount: 72,
  output: { volume: 82, lowBoost: 20, cutoff: 12000, resonance: 0.8 },
  master: {
    quantize: { label: "Quantize", options: ["Off", "1/4", "1/8", "1/16", "1/32"], value: 3 },
    velocity: { label: "Velocity", min: 0, max: 127, value: 100 },
    groove: { label: "Groove", min: 0, max: 100, value: 0 },
    shuffle: { label: "Shuffle", min: 50, max: 75, value: 50 }
  }
};

appState.channels = Object.fromEntries(trackDefinitions.map((track) => {
  const element = document.querySelector(`[data-track="${track.id}"]`);
  return [track.id, {
    level: Number(element.dataset.level),
    reverb: Number(element.dataset.reverb),
    delay: Number(element.dataset.delay),
    pan: Number(element.dataset.pan),
    mfxSend: 18,
    muted: false,
    soloed: false,
    envelope: createTrackEnvelope(),
    lfo: createTrackLfo()
  }];
}));

const elements = {
  play: document.querySelector("#playButton"),
  stop: document.querySelector("#stopButton"),
  status: document.querySelector("#playbackStatus"),
  tempoValue: document.querySelector("#tempoValue"),
  beatSync: document.querySelector("#beatSync"),
  projectStatus: document.querySelector("#projectStatus"),
  saveProject: document.querySelector("#saveProjectButton"),
  recallProject: document.querySelector("#recallProjectButton"),
  octaveValue: document.querySelector("#octaveValue"),
  sequencerTarget: document.querySelector("#sequencerTarget"),
  steps: [...document.querySelectorAll(".step")]
};

class GrooveboxAudio {
  constructor() {
    this.context = null;
    this.timer = null;
    this.decks = {};
    this.channels = {};
    this.deckGains = Object.fromEntries(deckIds.map((deckId) => [deckId, {}]));
    this.pendingActiveDeck = null;
    this.mfxBranches = {};
    this.isPlaying = false;
    this.meterTimer = null;
  }

  ensureGraph() {
    if (this.context) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContextClass();
    const context = this.context;

    this.masterInput = context.createGain();
    this.lowShelf = context.createBiquadFilter();
    this.lowShelf.type = "lowshelf";
    this.lowShelf.frequency.value = 120;
    this.masterFilter = context.createBiquadFilter();
    this.masterFilter.type = appState.filterType;
    this.masterGain = context.createGain();
    this.limiter = context.createDynamicsCompressor();
    this.limiter.threshold.value = -8;
    this.limiter.knee.value = 8;
    this.limiter.ratio.value = 8;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.16;
    this.masterInput.connect(this.lowShelf);
    this.lowShelf.connect(this.masterFilter);
    this.masterFilter.connect(this.masterGain);
    this.masterGain.connect(this.limiter);
    this.limiter.connect(context.destination);
    this.createMultiFx();

    this.reverbImpulse = this.makeImpulse(1.25, 2.2);

    this.noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const noise = this.noiseBuffer.getChannelData(0);
    for (let index = 0; index < noise.length; index += 1) noise[index] = Math.random() * 2 - 1;

    for (const track of trackDefinitions) {
      const input = context.createGain();
      const panner = context.createStereoPanner();
      const gain = context.createGain();
      const meter = context.createAnalyser();
      meter.fftSize = 256;
      meter.smoothingTimeConstant = 0.18;
      const reverbSend = context.createGain();
      const delaySend = context.createGain();
      const mfxSend = context.createGain();
      const reverbReturn = context.createConvolver();
      reverbReturn.buffer = this.reverbImpulse;
      reverbReturn.connect(this.masterInput);
      const delayReturn = context.createDelay(1.5);
      const delayFeedback = context.createGain();
      delayFeedback.gain.value = 0.22;
      delayReturn.connect(delayFeedback);
      delayFeedback.connect(delayReturn);
      delayReturn.connect(this.masterInput);
      input.connect(panner);
      panner.connect(gain);
      gain.connect(meter);
      meter.connect(this.masterInput);
      gain.connect(reverbSend);
      reverbSend.connect(reverbReturn);
      gain.connect(delaySend);
      delaySend.connect(delayReturn);
      for (const branch of Object.values(this.mfxBranches)) mfxSend.connect(branch.input);
      gain.connect(mfxSend);
      this.channels[track.id] = { input, panner, gain, meter, reverbSend, delaySend, mfxSend, reverbReturn, delayReturn, delayFeedback };

      for (const deck of deckIds) {
        const deckGain = context.createGain();
        deckGain.connect(input);
        this.deckGains[deck][track.id] = deckGain;
      }
    }

    this.applyMaster();
    this.applyMultiFx(appState.mfxType);
    this.applyActiveDeck();
    for (const track of trackDefinitions) this.applyChannel(track.id);
    this.startMetering();
  }

  createMfxBranch(name, build) {
    const input = this.context.createGain();
    const output = this.context.createGain();
    output.gain.value = 0;
    output.connect(this.masterInput);
    const nodes = build(input, output);
    this.mfxBranches[name] = { input, output, ...nodes };
  }

  createMultiFx() {
    const context = this.context;
    const createModulatedDelay = (delayTime, rate, depth, feedbackAmount) => (input, output) => {
      const delay = context.createDelay(0.08);
      delay.delayTime.value = delayTime;
      const feedback = context.createGain();
      feedback.gain.value = feedbackAmount;
      const lfo = context.createOscillator();
      const modulation = context.createGain();
      lfo.frequency.value = rate;
      modulation.gain.value = depth;
      lfo.connect(modulation);
      modulation.connect(delay.delayTime);
      input.connect(delay);
      delay.connect(output);
      delay.connect(feedback);
      feedback.connect(delay);
      lfo.start();
      return { delay, feedback, lfo };
    };

    this.createMfxBranch("chorus", createModulatedDelay(0.022, 0.7, 0.005, 0.08));
    this.createMfxBranch("flanger", createModulatedDelay(0.0045, 0.22, 0.0025, 0.42));
    this.createMfxBranch("phaser", (input, output) => {
      const lfo = context.createOscillator();
      lfo.frequency.value = 0.22;
      const frequencies = [350, 700, 1400, 2800];
      let previous = input;
      const stages = frequencies.map((frequency, index) => {
        const stage = context.createBiquadFilter();
        stage.type = "allpass";
        stage.frequency.value = frequency;
        stage.Q.value = 0.8;
        const modulation = context.createGain();
        modulation.gain.value = frequency * 0.45;
        lfo.connect(modulation);
        modulation.connect(stage.frequency);
        previous.connect(stage);
        previous = stage;
        return stage;
      });
      previous.connect(output);
      lfo.start();
      return { lfo, stages };
    });
    this.createMfxBranch("drive", (input, output) => {
      const shaper = context.createWaveShaper();
      const curve = new Float32Array(2048);
      for (let index = 0; index < curve.length; index += 1) {
        const sample = index * 2 / (curve.length - 1) - 1;
        curve[index] = Math.tanh(sample * 3.5);
      }
      shaper.curve = curve;
      shaper.oversample = "4x";
      input.connect(shaper);
      shaper.connect(output);
      return { shaper };
    });
    this.createMfxBranch("echo", (input, output) => {
      const delay = context.createDelay(2);
      delay.delayTime.value = 60 / appState.tempo * 0.75;
      const feedback = context.createGain();
      feedback.gain.value = 0.38;
      input.connect(delay);
      delay.connect(output);
      delay.connect(feedback);
      feedback.connect(delay);
      return { delay, feedback };
    });
  }

  applyMultiFx(type) {
    if (!this.context) return;
    const amount = appState.mfxAmount / 100 * 0.72;
    for (const [name, branch] of Object.entries(this.mfxBranches)) {
      this.setParam(branch.output.gain, name === type ? amount : 0);
    }
  }

  makeImpulse(seconds, decay) {
    const context = this.context;
    const length = Math.floor(context.sampleRate * seconds);
    const impulse = context.createBuffer(2, length, context.sampleRate);
    for (let channel = 0; channel < 2; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let index = 0; index < length; index += 1) {
        data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / length, decay);
      }
    }
    return impulse;
  }

  setParam(audioParam, value) {
    if (!this.context || !audioParam) return;
    audioParam.cancelScheduledValues(this.context.currentTime);
    audioParam.setTargetAtTime(value, this.context.currentTime, 0.015);
  }

  applyMaster() {
    if (!this.context) return;
    this.setParam(this.masterGain.gain, appState.output.volume / 100);
    this.setParam(this.lowShelf.gain, appState.output.lowBoost * 0.12);
    this.setParam(this.masterFilter.frequency, appState.output.cutoff);
    this.setParam(this.masterFilter.Q, appState.output.resonance);
    const delayTime = 60 / appState.tempo * 0.375;
    for (const nodes of Object.values(this.channels)) this.setParam(nodes.delayReturn.delayTime, delayTime);
    if (this.mfxBranches.echo) this.setParam(this.mfxBranches.echo.delay.delayTime, 60 / appState.tempo * 0.75);
  }

  applyChannel(trackId) {
    if (!this.context) return;
    const channel = appState.channels[trackId];
    const nodes = this.channels[trackId];
    const anySolo = trackDefinitions.some((track) => appState.channels[track.id].soloed);
    const audible = anySolo ? channel.soloed : !channel.muted;
    this.setParam(nodes.gain.gain, audible ? channel.level / 100 : 0);
    this.setParam(nodes.panner.pan, (channel.pan - 50) / 50);
    this.setParam(nodes.reverbSend.gain, channel.reverb / 100 * 0.55);
    this.setParam(nodes.delaySend.gain, channel.delay / 100 * 0.45);
    this.setParam(nodes.mfxSend.gain, channel.mfxSend / 100 * 0.55);
  }

  startMetering() {
    if (this.meterTimer !== null) return;
    const samples = Object.fromEntries(trackDefinitions.map((track) => [track.id, new Float32Array(this.channels[track.id].meter.fftSize)]));
    const update = () => {
      if (!this.context || this.context.state === "closed") {
        window.clearInterval(this.meterTimer);
        this.meterTimer = null;
        return;
      }
      for (const track of trackDefinitions) {
        const analyser = this.channels[track.id].meter;
        const waveform = samples[track.id];
        analyser.getFloatTimeDomainData(waveform);
        let energy = 0;
        for (const sample of waveform) energy += sample * sample;
        const rms = Math.sqrt(energy / waveform.length);
        const decibels = 20 * Math.log10(Math.max(rms, 0.00001));
        const measured = Math.max(0, Math.min(100, (decibels + 54) / 48 * 100));
        const meter = document.querySelector(`[data-track="${track.id}"] .meter`);
        const previous = Number(meter.dataset.level || 0);
        const level = measured >= previous ? measured : Math.max(measured, previous - 1.8);
        meter.dataset.level = String(level);
        meter.style.setProperty("--meter-level", `${level}%`);
      }
    };
    update();
    this.meterTimer = window.setInterval(update, 40);
  }

  applyActiveDeck() {
    if (!this.context) return;
    for (const deckId of deckIds) {
      const audible = appState.activeDeck === deckId && appState.deckEnabled[deckId];
      for (const track of trackDefinitions) {
        this.setParam(this.deckGains[deckId][track.id].gain, audible ? 1 : 0);
      }
    }
  }

  async start() {
    this.ensureGraph();
    await this.context.resume();
    if (this.timer) window.clearInterval(this.timer);
    this.isPlaying = true;
    const firstStep = this.context.currentTime + 0.12;
    this.pendingActiveDeck = null;
    this.decks = Object.fromEntries(deckIds.map((deckId) => [deckId, {
      step: 0, nextTime: firstStep, barStart: firstStep, patternId: appState.patternIds[deckId], pendingPattern: null
    }]));
    this.schedule();
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) window.clearInterval(this.timer);
    this.timer = null;
    this.decks = {};
  }

  selectPattern(deckId, patternId) {
    if (this.isPlaying && this.decks[deckId]) {
      this.decks[deckId].pendingPattern = patternId;
      if (appState.deckEnabled[deckId]) {
        this.pendingActiveDeck = deckId;
        setStatus(`DECK ${deckId} QUEUED`);
      } else {
        setStatus(`DECK ${deckId} PATTERN SET`);
      }
      renderActiveDeck();
      return;
    }
    if (this.decks[deckId]) this.decks[deckId].patternId = patternId;
    if (appState.deckEnabled[deckId]) appState.activeDeck = deckId;
    appState.editDeck = deckId;
    this.applyActiveDeck();
    renderActiveDeck();
    updateSequencerTarget();
    if (!this.isPlaying) setStatus(`READY · DECK ${appState.activeDeck}`);
  }

  setBeatSync(enabled) {
    if (!enabled || !this.isPlaying || !this.decks.A) return;
    for (const deckId of deckIds) {
      if (deckId === "A" || !this.decks[deckId]) continue;
      this.decks[deckId].step = this.decks.A.step;
      this.decks[deckId].nextTime = this.decks.A.nextTime;
      this.decks[deckId].barStart = this.decks.A.barStart;
    }
  }

  timingForStep(deck, pattern, stepIndex, stepDuration, baseTime) {
    const shuffle = Math.max(0, (appState.master.shuffle.value - 50) / 25);
    const groove = appState.master.groove.value / 100;
    let offset = (stepIndex % 2 ? shuffle * 0.5 * stepDuration : 0)
      + Math.sin(stepIndex * Math.PI / 2) * groove * 0.035 * stepDuration;
    const quantize = appState.master.quantize.options[appState.master.quantize.value];
    const subdivisions = { "1/4": 1, "1/8": 2, "1/16": 4, "1/32": 8 }[quantize];
    if (subdivisions) {
      const gridInSteps = 4 / subdivisions;
      const offsetInSteps = offset / stepDuration;
      const snappedOffset = Math.round(offsetInSteps / gridInSteps) * gridInSteps;
      offset = Math.max(-0.45, Math.min(0.45, snappedOffset)) * stepDuration;
    }
    return Math.max(this.context.currentTime + 0.002, baseTime + offset);
  }

  schedule() {
    if (!this.isPlaying || !this.context) return;
    const now = this.context.currentTime;
    const horizon = now + 0.12;
    for (const deckId of deckIds) {
      const deck = this.decks[deckId];
      while (deck.nextTime < horizon) {
        if (deck.step === 0) {
          deck.barStart = deck.nextTime;
          if (deck.pendingPattern) {
            deck.patternId = deck.pendingPattern;
            deck.pendingPattern = null;
            appState.patternIds[deckId] = deck.patternId;
            renderPatternSelection(deckId, deck.patternId);
          }
          if (this.pendingActiveDeck === deckId) {
            this.pendingActiveDeck = null;
            if (appState.deckEnabled[deckId]) appState.activeDeck = deckId;
            appState.editDeck = deckId;
            this.applyActiveDeck();
            renderActiveDeck();
            updateSequencerTarget();
            setStatus(`PLAYING · DECK ${deckId}`);
          }
        }
        const pattern = patternLibrary[deck.patternId];
        const bpm = deckId === "A" || appState.beatSync ? appState.tempo : pattern.nativeBpm;
        const stepDuration = 60 / bpm / 4;
        const stepIndex = deck.step;
        const baseTime = deck.nextTime;
        const eventTime = this.timingForStep(deck, pattern, stepIndex, stepDuration, baseTime);
        onSequencerStep(deckId, stepIndex);

        for (const track of trackDefinitions) {
          if (appState.channels[track.id].muted) continue;
          const value = pattern.parts[track.id][stepIndex];
          if (!value) continue;
          if (track.id === "bass") {
            this.trigger(track, 92, value + appState.octave * 12, eventTime, deckId, stepDuration);
          } else {
            this.trigger(track, value, 0, eventTime, deckId, stepDuration);
          }
        }

        deck.nextTime += stepDuration;
        deck.step = (stepIndex + 1) % 16;
      }
    }
  }

  trigger(track, velocity, note, time, deckId, stepDuration) {
    const context = this.context;
    const masterVelocity = appState.master.velocity.value / 100;
    const trackEnvelope = appState.channels[track.id].envelope;
    const pitchEnvelope = trackEnvelope.pitch;
    const filterEnvelope = trackEnvelope.filter;
    const ampEnvelope = trackEnvelope.amp;
    const velocityFactor = Math.max(0.05, 1 + (velocity / 127 - 0.5) * ampEnvelope.depth / 100);
    const amplitude = Math.max(0.0001, velocity / 127 * masterVelocity * velocityFactor);
    const destination = this.deckGains[deckId][track.id];
    const envelope = context.createGain();
    const panner = context.createStereoPanner();
    envelope.connect(panner);
    panner.connect(destination);

    const envelopeTiming = (settings, duration) => {
      const attack = 0.003 + settings.attack / 127 * 0.12;
      const decay = 0.01 + settings.decay / 127 * 0.16;
      const release = 0.015 + settings.release / 127 * 0.22;
      return { attack, decay, release, hold: Math.max(attack + decay, duration - release) };
    };

    const voiceEnd = (duration) => {
      const timing = envelopeTiming(ampEnvelope, duration);
      return timing.hold + timing.release + 0.02;
    };

    const decay = (duration, peak = amplitude) => {
      const timing = envelopeTiming(ampEnvelope, duration);
      const peakLevel = Math.max(0.0002, peak);
      const sustainLevel = Math.max(0.0001, peakLevel * ampEnvelope.sustain / 127);
      envelope.gain.setValueAtTime(0.0001, time);
      envelope.gain.linearRampToValueAtTime(peakLevel, time + timing.attack);
      envelope.gain.setTargetAtTime(sustainLevel, time + timing.attack, Math.max(0.005, timing.decay / 3));
      envelope.gain.setValueAtTime(sustainLevel, time + timing.hold);
      envelope.gain.exponentialRampToValueAtTime(0.0001, time + timing.hold + timing.release);
    };

    const modulateFilter = (filter, baseFrequency, duration) => {
      if (filterEnvelope.depth === 0 && filterEnvelope.sustain === 0) return;
      const timing = envelopeTiming(filterEnvelope, duration);
      const peakFrequency = Math.max(20, Math.min(context.sampleRate * 0.45, baseFrequency + filterEnvelope.depth * 80));
      const sustainFrequency = Math.max(20, Math.min(context.sampleRate * 0.45, baseFrequency + filterEnvelope.depth * 80 * filterEnvelope.sustain / 127));
      filter.frequency.cancelScheduledValues(time);
      filter.frequency.setValueAtTime(Math.max(20, baseFrequency), time);
      filter.frequency.linearRampToValueAtTime(peakFrequency, time + timing.attack);
      filter.frequency.setTargetAtTime(sustainFrequency, time + timing.attack, Math.max(0.005, timing.decay / 3));
      filter.frequency.setValueAtTime(sustainFrequency, time + timing.hold);
      filter.frequency.exponentialRampToValueAtTime(baseFrequency, time + timing.hold + timing.release);
    };

    const modulatePitch = (oscillator, baseFrequency, duration) => {
      if (pitchEnvelope.depth === 0 && pitchEnvelope.sustain === 0) return;
      const timing = envelopeTiming(pitchEnvelope, duration);
      const peakSemitones = pitchEnvelope.depth / 63 * 24;
      const sustainSemitones = pitchEnvelope.sustain / 63 * 24;
      const peakFrequency = baseFrequency * Math.pow(2, peakSemitones / 12);
      const sustainFrequency = baseFrequency * Math.pow(2, sustainSemitones / 12);
      oscillator.frequency.setValueAtTime(baseFrequency * Math.pow(2, (pitchEnvelope.sustain / 63 * 24) / 12), time);
      oscillator.frequency.linearRampToValueAtTime(peakFrequency, time + timing.attack);
      oscillator.frequency.setTargetAtTime(sustainFrequency, time + timing.attack, Math.max(0.005, timing.decay / 3));
      oscillator.frequency.setValueAtTime(sustainFrequency, time + timing.hold);
      oscillator.frequency.exponentialRampToValueAtTime(baseFrequency, time + timing.hold + timing.release);
    };

    if (track.voice === "kick") {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(145, time);
      oscillator.frequency.exponentialRampToValueAtTime(46, time + 0.12);
      modulatePitch(oscillator, 145, 0.26);
      decay(0.26, amplitude * 0.9);
      this.applyLfo(track, time, time + voiceEnd(0.26), { oscillator, envelope, panner, baseFrequency: 145 });
      oscillator.connect(envelope);
      oscillator.start(time);
      oscillator.stop(time + voiceEnd(0.26));
      return;
    }

    if (track.voice === "snare" || track.voice === "clap" || track.voice.startsWith("hat")) {
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      source.buffer = this.noiseBuffer;
      filter.type = "highpass";
      const baseFrequency = track.voice === "snare" ? 1200 : track.voice === "hatOpen" ? 6200 : 7600;
      filter.frequency.value = baseFrequency;
      modulateFilter(filter, baseFrequency, track.voice === "snare" ? 0.16 : track.voice === "hatOpen" ? 0.19 : 0.045);
      source.connect(filter);
      filter.connect(envelope);
      const noiseDuration = track.voice === "snare" ? 0.16 : track.voice === "hatOpen" ? 0.19 : 0.045;
      this.applyLfo(track, time, time + voiceEnd(noiseDuration), { filter, envelope, panner, baseFrequency });
      if (track.voice === "clap") {
        const pulse = amplitude * 0.55;
        envelope.gain.setValueAtTime(0.0001, time);
        for (const offset of [0, 0.026, 0.054]) {
          envelope.gain.setValueAtTime(0.0001, time + offset);
          envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, pulse), time + offset + 0.003);
          envelope.gain.exponentialRampToValueAtTime(0.0001, time + offset + 0.038);
        }
        source.start(time, 0, 0.18);
        source.stop(time + 0.2);
      } else {
        decay(track.voice === "snare" ? 0.16 : track.voice === "hatOpen" ? 0.19 : 0.045, amplitude * (track.voice === "snare" ? 0.7 : 0.42));
        const duration = track.voice === "snare" ? 0.16 : track.voice === "hatOpen" ? 0.19 : 0.045;
        source.start(time, 0, Math.max(track.voice === "snare" ? 0.18 : 0.22, voiceEnd(duration)));
        source.stop(time + voiceEnd(duration));
      }
      return;
    }

    const oscillator = context.createOscillator();
    if (track.voice === "bass") {
      oscillator.type = "sawtooth";
      const baseFrequency = 440 * Math.pow(2, (note - 69) / 12);
      oscillator.frequency.value = baseFrequency;
      const voiceFilter = context.createBiquadFilter();
      voiceFilter.type = "lowpass";
      voiceFilter.frequency.value = 720;
      modulatePitch(oscillator, baseFrequency, stepDuration * 0.8);
      modulateFilter(voiceFilter, 720, stepDuration * 0.8);
      decay(stepDuration * 0.8, amplitude * 0.46);
      this.applyLfo(track, time, time + voiceEnd(stepDuration * 0.8), { oscillator, filter: voiceFilter, envelope, panner, baseFrequency });
      oscillator.connect(voiceFilter);
      voiceFilter.connect(envelope);
      oscillator.start(time);
      oscillator.stop(time + voiceEnd(stepDuration * 0.8));
      return;
    }

    oscillator.type = "triangle";
    oscillator.frequency.value = stepPercPitch[track.id] || 520;
    modulatePitch(oscillator, oscillator.frequency.value, 0.12);
    decay(0.12, amplitude * 0.34);
    this.applyLfo(track, time, time + voiceEnd(0.12), { oscillator, envelope, panner, baseFrequency: oscillator.frequency.value });
    oscillator.connect(envelope);
    oscillator.start(time);
    oscillator.stop(time + voiceEnd(0.12));
  }

  applyLfo(track, time, stopTime, targets) {
    const lfo = appState.channels[track.id].lfo;
    if (!lfo || lfo.target === "off" || lfo.depth <= 0) return;
    const context = this.context;
    const osc = context.createOscillator();
    osc.type = lfo.shape;
    osc.frequency.value = Math.max(0.05, lfo.rate);
    const gain = context.createGain();
    const depth = lfo.depth / 100;

    if (lfo.target === "pitch" && targets.oscillator) {
      gain.gain.value = targets.baseFrequency * depth * 0.5;
      osc.connect(gain);
      gain.connect(targets.oscillator.frequency);
    } else if (lfo.target === "filter" && targets.filter) {
      gain.gain.value = Math.max(20, targets.filter.frequency.value * depth);
      osc.connect(gain);
      gain.connect(targets.filter.frequency);
    } else if (lfo.target === "amp" && targets.envelope) {
      gain.gain.value = depth * 0.6;
      osc.connect(gain);
      gain.connect(targets.envelope.gain);
    } else if (lfo.target === "pan" && targets.panner) {
      gain.gain.value = depth;
      osc.connect(gain);
      gain.connect(targets.panner.pan);
    } else {
      return;
    }
    osc.start(time);
    osc.stop(stopTime);
  }
}

const stepPercPitch = { perc: 460 };

const audioEngine = new GrooveboxAudio();

function setStatus(message) {
  elements.status.textContent = message;
}

function updateSequencerTarget() {
  const deck = appState.editDeck;
  const track = trackDefinitions.find((item) => item.id === appState.selectedTrack);
  elements.sequencerTarget.textContent = `DECK ${deck} / ${track.label.toUpperCase()}`;
  renderEnvelope();
  renderLfo();
  document.querySelectorAll("[data-edit-deck]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.editDeck === deck));
  });
  document.querySelectorAll("[data-track-select]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.trackSelect === appState.selectedTrack));
  });
  document.querySelectorAll(".channel[data-track]").forEach((channel) => {
    channel.classList.toggle("selected", channel.dataset.track === appState.selectedTrack);
  });
  renderSequencer();
}

function renderSequencer() {
  const pattern = patternLibrary[appState.patternIds[appState.editDeck]];
  const steps = pattern.parts[appState.selectedTrack];
  elements.steps.forEach((button, index) => {
    const active = Boolean(steps[index]);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function onSequencerStep(deckId, stepIndex) {
  if (deckId !== appState.editDeck) return;
  elements.steps.forEach((button, index) => button.classList.toggle("playhead", index === stepIndex));
  elements.sequencerTarget.dataset.currentStep = String(stepIndex + 1);
}

function renderPatternSelection(deckId, patternId) {
  const picker = document.querySelector(`#pattern${deckId}Picker`);
  if (!picker) return;
  const name = patternLibrary[patternId].name;
  picker.querySelector(".pattern-current").textContent = `${patternId} · ${name}`;
  if (deckId === appState.editDeck) renderSequencer();
}

function renderActiveDeck() {
  document.querySelectorAll(".pattern-deck[data-deck]").forEach((deck) => {
    const deckId = deck.dataset.deck;
    const enabled = appState.deckEnabled[deckId];
    const active = deckId === appState.activeDeck;
    const queued = audioEngine.pendingActiveDeck === deckId;
    deck.classList.toggle("active", active && enabled);
    deck.classList.toggle("disabled", !enabled);
    deck.classList.toggle("queued", queued);
    const status = !enabled ? "OFF" : active ? "LIVE" : queued ? "QUEUED" : "READY";
    deck.querySelector(".deck-status").textContent = status;
    deck.querySelector(".pattern-trigger").setAttribute("aria-pressed", String(active));
    const toggle = deck.querySelector(".deck-toggle");
    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.textContent = enabled ? "On" : "Off";
  });
}

function setDeckEnabled(deckId, enabled) {
  if (!enabled && deckIds.filter((id) => appState.deckEnabled[id]).length === 1) {
    setStatus("LAST DECK STAYS ON");
    return;
  }
  appState.deckEnabled[deckId] = enabled;
  if (!enabled) {
    if (audioEngine.pendingActiveDeck === deckId) audioEngine.pendingActiveDeck = null;
    if (appState.activeDeck === deckId) {
      appState.activeDeck = deckIds.find((id) => appState.deckEnabled[id]);
      if (appState.playing) setStatus(`PLAYING · DECK ${appState.activeDeck}`);
    }
  } else if (!appState.playing && appState.editDeck === deckId) {
    // Re-enabling the deck you're editing makes it live immediately
    appState.activeDeck = deckId;
    setStatus(`READY · DECK ${deckId}`);
  }
  audioEngine.applyActiveDeck();
  renderActiveDeck();
}

function selectPattern(deckId, patternId) {
  appState.patternIds[deckId] = patternId;
  audioEngine.selectPattern(deckId, patternId);
  renderPatternSelection(deckId, patternId);
  renderActiveDeck();
  if (!appState.playing) setStatus(`READY · DECK ${deckId}`);
}

function initializeNumberPicker(picker) {
  const itemLabel = picker.dataset.itemLabel;
  const pickerDeckMatch = picker.id.match(/^pattern([A-C])Picker$/);
  const isPatternPicker = Boolean(pickerDeckMatch);
  const items = isPatternPicker
    ? Object.keys(patternLibrary).slice(0, Number(picker.dataset.count))
    : Array.from({ length: Number(picker.dataset.count) }, (_, index) => String(index + 1).padStart(3, "0"));
  const trigger = picker.querySelector(".pattern-trigger");
  const current = picker.querySelector(".pattern-current");
  const menu = picker.querySelector(".pattern-menu");
  const search = picker.querySelector(".pattern-search");
  const results = picker.querySelector(".pattern-results");
  const count = picker.querySelector(".pattern-count");
  let selected = picker.dataset.initial;

  const labelFor = (number) => isPatternPicker ? patternLibrary[number].name : `${itemLabel} ${number}`;
  const tagFor = (number) => number;
  const render = (query = "") => {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = items.filter((number) => `${tagFor(number)} ${labelFor(number)}`.toLowerCase().includes(normalizedQuery));
    count.textContent = `${matches.length} / ${items.length}`;
    results.innerHTML = matches.length
      ? matches.map((number) => `<button class="pattern-option" type="button" role="option" aria-selected="${number === selected}" data-item="${number}"><span>${tagFor(number)}</span><small>${labelFor(number)}</small></button>`).join("")
      : '<div class="pattern-empty" role="presentation">No matching items</div>';
  };

  const setOpen = (isOpen) => {
    menu.hidden = !isOpen;
    trigger.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      search.value = "";
      render();
      search.focus();
    }
  };

  trigger.addEventListener("click", () => setOpen(menu.hidden));
  search.addEventListener("input", () => render(search.value));
  results.addEventListener("click", (event) => {
    const option = event.target.closest("[data-item]");
    if (!option) return;
    selected = option.dataset.item;
    current.textContent = `${tagFor(selected)} · ${labelFor(selected)}`;
    setOpen(false);
    if (isPatternPicker) selectPattern(pickerDeckMatch[1], selected);
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      trigger.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!picker.contains(event.target)) setOpen(false);
  });
}

function renderMasterParameter() {
  const parameter = appState.master[appState.activeMasterParameter];
  const value = parameter.options ? parameter.options[parameter.value] : `${parameter.value}${parameter.label === "Velocity" ? "" : "%"}`;
  const progress = parameter.options
    ? parameter.value / (parameter.options.length - 1)
    : (parameter.value - parameter.min) / (parameter.max - parameter.min);
  const knob = document.querySelector("#masterKnob");
  document.querySelector("#masterModeLabel").textContent = parameter.label;
  document.querySelector("#masterModeValue").textContent = value;
  knob.style.setProperty("--knob-angle", `${progress * 270 - 135}deg`);
  knob.setAttribute("aria-label", `Master ${parameter.label}`);
  knob.setAttribute("aria-valuemin", parameter.options ? "0" : String(parameter.min));
  knob.setAttribute("aria-valuemax", parameter.options ? String(parameter.options.length - 1) : String(parameter.max));
  knob.setAttribute("aria-valuenow", String(parameter.value));
  knob.setAttribute("aria-valuetext", `${parameter.label} ${value}`);
  document.querySelectorAll("[data-master-mode]").forEach((option) => option.setAttribute("aria-selected", String(option.dataset.masterMode === appState.activeMasterParameter)));
  audioEngine.applyMaster();
}

function changeMasterParameter(progress) {
  const parameter = appState.master[appState.activeMasterParameter];
  const clamped = Math.max(0, Math.min(1, progress));
  parameter.value = parameter.options
    ? Math.round(clamped * (parameter.options.length - 1))
    : Math.round(parameter.min + clamped * (parameter.max - parameter.min));
  renderMasterParameter();
}

function bindDial(element, settings) {
  let dragStartY = 0;
  let dragStartProgress = 0;

  const toProgress = (value) => settings.scale === "log"
    ? Math.log(value / settings.min) / Math.log(settings.max / settings.min)
    : (value - settings.min) / (settings.max - settings.min);
  const fromProgress = (progress) => settings.scale === "log"
    ? settings.min * Math.pow(settings.max / settings.min, progress)
    : settings.min + progress * (settings.max - settings.min);
  const render = () => {
    const progress = toProgress(settings.get());
    element.style.setProperty("--knob-angle", `${progress * 270 - 135}deg`);
    element.setAttribute("aria-valuenow", String(Math.round(settings.get() * 100) / 100));
    element.setAttribute("aria-valuetext", settings.format(settings.get()));
  };
  const setProgress = (progress) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const value = fromProgress(clampedProgress);
    settings.set(settings.step ? Math.round(value / settings.step) * settings.step : value);
    render();
    settings.onChange(settings.get());
  };
  element.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    dragStartY = event.clientY;
    dragStartProgress = toProgress(settings.get());
    element.setPointerCapture(event.pointerId);
  });
  element.addEventListener("pointermove", (event) => {
    if (element.hasPointerCapture(event.pointerId)) {
      const dragDistance = event.shiftKey ? 480 : 180;
      setProgress(dragStartProgress + (dragStartY - event.clientY) / dragDistance);
    }
  });
  element.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)) {
      event.preventDefault();
      const delta = ["ArrowUp", "ArrowRight"].includes(event.key) ? 1 : -1;
      const increment = settings.step || (settings.max - settings.min) / 100;
      settings.set(Math.max(settings.min, Math.min(settings.max, settings.get() + delta * increment)));
      render();
      settings.onChange(settings.get());
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setProgress(event.key === "Home" ? 0 : 1);
    }
  });
  render();
}

function updateChannelReadout(trackId) {
  const channel = document.querySelector(`[data-track="${trackId}"]`);
  const values = appState.channels[trackId];
  const fader = channel.querySelector(".fader");
  const value = values[appState.mixerMode];
  const modeLabel = appState.mixerMode === "mfxSend" ? "MFX" : appState.mixerMode;
  const progress = appState.mixerMode === "pan" ? value : value * 0.85;
  const display = appState.mixerMode === "pan"
    ? value === 50 ? "CTR" : `${value < 50 ? "L" : "R"}${Math.abs(value - 50)}`
    : `${value}%`;
  channel.dataset.mode = appState.mixerMode;
  fader.querySelector("i").style.setProperty("--level", `${progress}%`);
  fader.setAttribute("aria-valuenow", String(value));
  fader.setAttribute("aria-valuetext", `${trackDefinitions.find((track) => track.id === trackId).label} ${modeLabel} send ${display}`);
  channel.querySelector(".readout span").textContent = modeLabel;
  channel.querySelector(".readout b").textContent = display;
  const muteButton = channel.querySelector(".mute");
  muteButton.textContent = "Mute";
  muteButton.setAttribute("aria-pressed", String(values.muted));
  const soloButton = channel.querySelector(".solo");
  soloButton.setAttribute("aria-pressed", String(values.soloed));
  channel.classList.toggle("selected", appState.selectedTrack === trackId);
  audioEngine.applyChannel(trackId);
}

function setMixerMode(mode) {
  appState.mixerMode = mode;
  document.querySelectorAll("[data-mixer-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mixerMode === mode)));
  trackDefinitions.forEach((track) => updateChannelReadout(track.id));
}

function setChannelValue(trackId, value) {
  const mode = appState.mixerMode;
  appState.channels[trackId][mode] = Math.max(0, Math.min(100, Math.round(value)));
  document.querySelector(`[data-track="${trackId}"]`).dataset[mode] = String(appState.channels[trackId][mode]);
  updateChannelReadout(trackId);
}

function selectTrack(trackId) {
  appState.selectedTrack = trackId;
  updateSequencerTarget();
}

function editSequencerStep(index) {
  const pattern = patternLibrary[appState.patternIds[appState.editDeck]];
  const part = pattern.parts[appState.selectedTrack];
  if (appState.selectedTrack === "bass") {
    part[index] = part[index] ? 0 : 43 + appState.octave * 12;
  } else {
    part[index] = part[index] ? 0 : 100;
  }
  renderSequencer();
}

function setBeatSync(enabled) {
  appState.beatSync = enabled;
  elements.beatSync.setAttribute("aria-pressed", String(enabled));
  elements.beatSync.setAttribute("aria-label", `Beat sync ${enabled ? "on" : "off"}`);
  elements.beatSync.querySelector(".sync-state").textContent = enabled ? "On" : "Off";
  audioEngine.setBeatSync(enabled);
}

function registerTrackFader(trackId) {
  const fader = document.querySelector(`[data-track="${trackId}"] .fader`);
  const update = (event) => {
    const bounds = fader.getBoundingClientRect();
    setChannelValue(trackId, (bounds.bottom - event.clientY) / bounds.height * 100);
  };
  fader.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    fader.setPointerCapture(event.pointerId);
    update(event);
    selectTrack(trackId);
  });
  fader.addEventListener("pointermove", (event) => {
    if (fader.hasPointerCapture(event.pointerId)) update(event);
  });
  fader.addEventListener("keydown", (event) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    setChannelValue(trackId, appState.channels[trackId][appState.mixerMode] + (["ArrowUp", "ArrowRight"].includes(event.key) ? 1 : -1));
  });
}

function registerTrack(track) {
  const channel = document.querySelector(`[data-track="${track.id}"]`);
  channel.addEventListener("click", () => selectTrack(track.id));
  channel.querySelector(".mute").addEventListener("click", () => {
    appState.channels[track.id].muted = !appState.channels[track.id].muted;
    updateChannelReadout(track.id);
  });
  channel.querySelector(".solo").addEventListener("click", () => {
    appState.channels[track.id].soloed = !appState.channels[track.id].soloed;
    trackDefinitions.forEach((item) => updateChannelReadout(item.id));
  });
  registerTrackFader(track.id);
  updateChannelReadout(track.id);
}

function setupControlDials() {
  bindDial(document.querySelector("#masterVolumeKnob"), {
    min: 0, max: 100, step: 1, get: () => appState.output.volume,
    set: (value) => { appState.output.volume = value; },
    format: (value) => `Master volume ${Math.round(value)} percent`,
    onChange: () => audioEngine.applyMaster()
  });
  bindDial(document.querySelector("#lowBoostKnob"), {
    min: 0, max: 100, step: 1, get: () => appState.output.lowBoost,
    set: (value) => { appState.output.lowBoost = value; },
    format: (value) => `Low boost ${Math.round(value)} percent`,
    onChange: () => audioEngine.applyMaster()
  });
  bindDial(document.querySelector("#tempoKnob"), {
    min: 60, max: 180, step: 1, get: () => appState.tempo,
    set: (value) => { appState.tempo = value; },
    format: (value) => `${Math.round(value)} beats per minute`,
    onChange: (value) => {
      elements.tempoValue.textContent = String(Math.round(value));
      document.querySelector(".tempo-control").setAttribute("aria-label", `Tempo ${Math.round(value)} beats per minute`);
      audioEngine.applyMaster();
    }
  });
  bindDial(document.querySelector("#cutoffKnob"), {
    min: 40, max: 18000, step: null, scale: "log", get: () => appState.output.cutoff,
    set: (value) => { appState.output.cutoff = value; },
    format: (value) => `Cutoff ${Math.round(value)} hertz`,
    onChange: () => audioEngine.applyMaster()
  });
  bindDial(document.querySelector("#resonanceKnob"), {
    min: 0.1, max: 18, step: 0.1, get: () => appState.output.resonance,
    set: (value) => { appState.output.resonance = value; },
    format: (value) => `Resonance ${value.toFixed(1)}`,
    onChange: () => audioEngine.applyMaster()
  });
  bindDial(document.querySelector("#mfxAmountKnob"), {
    min: 0, max: 100, step: 1, get: () => appState.mfxAmount,
    set: (value) => { appState.mfxAmount = value; },
    format: (value) => `MFX amount ${Math.round(value)} percent`,
    onChange: () => audioEngine.applyMultiFx(appState.mfxType)
  });
  bindDial(document.querySelector("#masterKnob"), {
    min: 0, max: 1, step: null, get: () => {
      const parameter = appState.master[appState.activeMasterParameter];
      return parameter.options ? parameter.value / (parameter.options.length - 1) : (parameter.value - parameter.min) / (parameter.max - parameter.min);
    },
    set: (progress) => {
      const parameter = appState.master[appState.activeMasterParameter];
      parameter.value = parameter.options
        ? Math.round(progress * (parameter.options.length - 1))
        : Math.round(parameter.min + progress * (parameter.max - parameter.min));
    },
    format: () => {
      const parameter = appState.master[appState.activeMasterParameter];
      return `${parameter.label} ${parameter.options ? parameter.options[parameter.value] : parameter.value}`;
    },
    onChange: renderMasterParameter
  });
}

function initializeMasterProcessing() {
  const knob = document.querySelector("#masterKnob");
  const trigger = document.querySelector("#masterModeTrigger");
  const menu = document.querySelector("#masterModeMenu");
  document.querySelectorAll("[data-master-mode]").forEach((option) => {
    option.addEventListener("click", () => {
      appState.activeMasterParameter = option.dataset.masterMode;
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      renderMasterParameter();
    });
  });
  trigger.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    trigger.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!document.querySelector(".master-processing").contains(event.target)) {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }
  });
  renderMasterParameter();
}

function initializeFilters() {
  document.querySelectorAll("[data-filter-type]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.filterType = button.dataset.filterType;
      document.querySelectorAll("[data-filter-type]").forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
      audioEngine.applyMaster();
    });
  });
  const mfxSelector = document.querySelector("#mfxType");
  mfxSelector.value = appState.mfxType;
  mfxSelector.addEventListener("change", () => {
    appState.mfxType = mfxSelector.value;
    audioEngine.applyMultiFx(appState.mfxType);
  });
  document.querySelector("#clearFxSendButton").addEventListener("click", () => {
    for (const track of trackDefinitions) {
      appState.channels[track.id].mfxSend = 0;
      document.querySelector(`[data-track="${track.id}"]`).dataset.mfxSend = "0";
      updateChannelReadout(track.id);
    }
  });
}

function renderEnvelope() {
  const trackEnvelope = appState.channels[appState.selectedTrack].envelope;
  const envelope = trackEnvelope[trackEnvelope.target];
  const track = trackDefinitions.find((item) => item.id === appState.selectedTrack);
  document.querySelector("#envelopePartLabel").textContent = track.label.toUpperCase();
  document.querySelectorAll("[data-envelope-target]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.envelopeTarget === trackEnvelope.target));
  });
  const ranges = trackEnvelope.target === "amp"
    ? { depth: [-100, 150], attack: [0, 127], decay: [0, 127], sustain: [0, 127], release: [0, 127] }
    : trackEnvelope.target === "pitch"
      ? { depth: [-63, 63], attack: [0, 127], decay: [0, 127], sustain: [-63, 63], release: [0, 127] }
      : { depth: [-63, 63], attack: [0, 127], decay: [0, 127], sustain: [0, 127], release: [0, 127] };
  document.querySelector('label[for="envDepth"]').textContent = trackEnvelope.target === "amp" ? "Velo Sens" : "Depth";
  for (const parameter of ["depth", "attack", "decay", "sustain", "release"]) {
    const input = document.querySelector(`#env${parameter[0].toUpperCase()}${parameter.slice(1)}`);
    const output = document.querySelector(`#env${parameter[0].toUpperCase()}${parameter.slice(1)}Value`);
    input.min = String(ranges[parameter][0]);
    input.max = String(ranges[parameter][1]);
    input.value = String(envelope[parameter]);
    output.textContent = input.value;
  }
}

function renderLfo() {
  const lfo = appState.channels[appState.selectedTrack].lfo;
  const track = trackDefinitions.find((item) => item.id === appState.selectedTrack);
  document.querySelector("#lfoPartLabel").textContent = track.label.toUpperCase();
  document.querySelector("#lfoTarget").value = lfo.target;
  document.querySelector("#lfoShape").value = lfo.shape;
  const rate = document.querySelector("#lfoRate");
  const depth = document.querySelector("#lfoDepth");
  rate.value = String(lfo.rate);
  depth.value = String(lfo.depth);
  document.querySelector("#lfoRateValue").textContent = Number(lfo.rate).toFixed(1);
  document.querySelector("#lfoDepthValue").textContent = String(lfo.depth);
}

function initializeLfo() {
  const lfo = () => appState.channels[appState.selectedTrack].lfo;
  document.querySelector("#lfoTarget").addEventListener("change", (event) => { lfo().target = event.target.value; });
  document.querySelector("#lfoShape").addEventListener("change", (event) => { lfo().shape = event.target.value; });
  document.querySelector("#lfoRate").addEventListener("input", (event) => {
    lfo().rate = Number(event.target.value);
    document.querySelector("#lfoRateValue").textContent = lfo().rate.toFixed(1);
  });
  document.querySelector("#lfoDepth").addEventListener("input", (event) => {
    lfo().depth = Number(event.target.value);
    document.querySelector("#lfoDepthValue").textContent = String(lfo().depth);
  });
  document.querySelector("#lfoRandomizeButton").addEventListener("click", () => {
    const targets = ["off", "pitch", "filter", "amp", "pan"];
    const shapes = ["sine", "triangle", "square", "sawtooth"];
    const settings = lfo();
    settings.target = targets[randomInt(0, targets.length - 1)];
    settings.shape = shapes[randomInt(0, shapes.length - 1)];
    settings.rate = Math.round((0.1 + Math.random() * 19.9) * 10) / 10;
    settings.depth = randomInt(0, 100);
    renderLfo();
  });
  renderLfo();
}

function initializeEnvelope() {
  document.querySelectorAll("[data-envelope-target]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.channels[appState.selectedTrack].envelope.target = button.dataset.envelopeTarget;
      renderEnvelope();
    });
  });
  for (const parameter of ["depth", "attack", "decay", "sustain", "release"]) {
    const input = document.querySelector(`#env${parameter[0].toUpperCase()}${parameter.slice(1)}`);
    input.addEventListener("input", () => {
      const trackEnvelope = appState.channels[appState.selectedTrack].envelope;
      trackEnvelope[trackEnvelope.target][parameter] = Number(input.value);
      document.querySelector(`#env${parameter[0].toUpperCase()}${parameter.slice(1)}Value`).textContent = input.value;
    });
  }
  renderEnvelope();
}

function initializeTransport() {
  elements.play.addEventListener("click", async () => {
    try {
      await audioEngine.start();
      appState.playing = true;
      elements.play.setAttribute("aria-pressed", "true");
      setStatus(`PLAYING · DECK ${appState.activeDeck}`);
    } catch (error) {
      setStatus("AUDIO UNAVAILABLE");
      console.error(error);
    }
  });
  elements.stop.addEventListener("click", () => {
    audioEngine.stop();
    appState.playing = false;
    elements.play.setAttribute("aria-pressed", "false");
    elements.steps.forEach((button) => button.classList.remove("playhead"));
    setStatus("STOPPED");
  });
}

function initializeSequencer() {
  elements.steps.forEach((button, index) => button.addEventListener("click", () => editSequencerStep(index)));
  document.querySelectorAll("[data-edit-deck]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.editDeck = button.dataset.editDeck;
      updateSequencerTarget();
    });
  });
  document.querySelectorAll("[data-octave]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.octave = Math.max(-2, Math.min(2, appState.octave + Number(button.dataset.octave)));
      elements.octaveValue.textContent = `OCT ${appState.octave > 0 ? "+" : ""}${appState.octave}`;
    });
  });
}

function initializePatternPickers() {
  document.querySelectorAll(".pattern-picker").forEach(initializeNumberPicker);
  document.querySelectorAll(".pattern-picker").forEach((picker) => {
    const match = picker.id.match(/^pattern([A-C])Picker$/);
    if (match) renderPatternSelection(match[1], appState.patternIds[match[1]]);
  });
  document.querySelectorAll("[data-deck-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setDeckEnabled(button.dataset.deckToggle, !appState.deckEnabled[button.dataset.deckToggle]);
    });
  });
  renderActiveDeck();
}

function clampProjectValue(value, minimum, maximum, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(minimum, Math.min(maximum, number)) : fallback;
}

function createProjectSnapshot() {
  const patterns = Object.fromEntries(Object.entries(patternLibrary).map(([id, pattern]) => [id, {
    name: pattern.name,
    nativeBpm: pattern.nativeBpm,
    parts: Object.fromEntries(trackDefinitions.map((track) => [track.id, [...pattern.parts[track.id]]]))
  }]));
  return {
    version: 1,
    savedAt: new Date().toISOString(),
    patterns,
    state: {
      patternIds: { ...appState.patternIds },
      deckEnabled: { ...appState.deckEnabled },
      activeDeck: appState.activeDeck,
      editDeck: appState.editDeck,
      beatSync: appState.beatSync,
      tempo: appState.tempo,
      octave: appState.octave,
      mixerMode: appState.mixerMode,
      mfxType: appState.mfxType,
      mfxAmount: appState.mfxAmount,
      activeMasterParameter: appState.activeMasterParameter,
      output: { ...appState.output },
      master: JSON.parse(JSON.stringify(appState.master)),
      channels: JSON.parse(JSON.stringify(appState.channels))
    }
  };
}

const lfoRanges = { rate: [0.1, 20], depth: [0, 100] };
const lfoTargets = ["off", "pitch", "filter", "amp", "pan"];
const lfoShapes = ["sine", "triangle", "square", "sawtooth"];

function restoreProjectSnapshot(project) {
  if (project?.version !== 1 || !project.state || !project.patterns) throw new Error("Unsupported project file");
  const restoredPatterns = {};
  for (const [id, pattern] of Object.entries(project.patterns)) {
    if (!pattern || typeof pattern.name !== "string" || !Number.isFinite(Number(pattern.nativeBpm))) continue;
    const parts = Object.fromEntries(trackDefinitions.map((track) => {
      const source = pattern.parts?.[track.id];
      const steps = Array.from({ length: 16 }, (_, index) => clampProjectValue(source?.[index], 0, 127, 0));
      return [track.id, steps];
    }));
    restoredPatterns[id] = { name: pattern.name, nativeBpm: clampProjectValue(pattern.nativeBpm, 30, 300, 120), parts };
  }
  if (!Object.keys(restoredPatterns).length) throw new Error("Project has no valid patterns");

  const state = project.state;
  const validPatternId = (patternId) => Object.hasOwn(restoredPatterns, patternId);
  Object.keys(patternLibrary).forEach((patternId) => delete patternLibrary[patternId]);
  Object.assign(patternLibrary, restoredPatterns);

  const fallbackPatternId = Object.keys(patternLibrary)[0];
  appState.patternIds = Object.fromEntries(deckIds.map((deckId) => [
    deckId,
    validPatternId(state.patternIds?.[deckId]) ? state.patternIds[deckId] : fallbackPatternId
  ]));
  appState.deckEnabled = Object.fromEntries(deckIds.map((deckId) => [deckId, state.deckEnabled?.[deckId] !== false]));
  if (!deckIds.some((deckId) => appState.deckEnabled[deckId])) appState.deckEnabled.A = true;
  appState.activeDeck = deckIds.includes(state.activeDeck) ? state.activeDeck : "A";
  if (!appState.deckEnabled[appState.activeDeck]) {
    appState.activeDeck = deckIds.find((deckId) => appState.deckEnabled[deckId]);
  }
  appState.editDeck = deckIds.includes(state.editDeck) ? state.editDeck : "A";
  appState.beatSync = Boolean(state.beatSync);
  appState.tempo = clampProjectValue(state.tempo, 60, 180, 126);
  appState.octave = clampProjectValue(state.octave, -2, 2, 0);
  appState.mixerMode = ["level", "reverb", "delay", "pan", "mfxSend"].includes(state.mixerMode) ? state.mixerMode : "level";
  appState.mfxType = ["off", "chorus", "flanger", "phaser", "drive", "echo"].includes(state.mfxType) ? state.mfxType : "off";
  appState.mfxAmount = clampProjectValue(state.mfxAmount, 0, 100, 72);
  appState.activeMasterParameter = Object.hasOwn(appState.master, state.activeMasterParameter) ? state.activeMasterParameter : "quantize";

  for (const key of ["volume", "lowBoost", "cutoff", "resonance"]) {
    const limits = { volume: [0, 100], lowBoost: [0, 100], cutoff: [40, 18000], resonance: [0.1, 18] }[key];
    appState.output[key] = clampProjectValue(state.output?.[key], limits[0], limits[1], appState.output[key]);
  }
  for (const [key, parameter] of Object.entries(appState.master)) {
    const savedValue = state.master?.[key]?.value;
    parameter.value = parameter.options
      ? Math.round(clampProjectValue(savedValue, 0, parameter.options.length - 1, parameter.value))
      : Math.round(clampProjectValue(savedValue, parameter.min, parameter.max, parameter.value));
  }

  for (const track of trackDefinitions) {
    const saved = state.channels?.[track.id];
    if (!saved) continue;
    const channel = appState.channels[track.id];
    for (const key of ["level", "reverb", "delay", "pan", "mfxSend"]) channel[key] = clampProjectValue(saved[key], 0, 100, channel[key]);
    channel.muted = Boolean(saved.muted);
    channel.soloed = Boolean(saved.soloed);
    for (const target of ["pitch", "filter", "amp"]) {
      const envelope = saved.envelope?.[target];
      if (!envelope) continue;
      const ranges = target === "amp"
        ? { depth: [-100, 150], attack: [0, 127], decay: [0, 127], sustain: [0, 127], release: [0, 127] }
        : target === "pitch"
          ? { depth: [-63, 63], attack: [0, 127], decay: [0, 127], sustain: [-63, 63], release: [0, 127] }
          : { depth: [-63, 63], attack: [0, 127], decay: [0, 127], sustain: [0, 127], release: [0, 127] };
      for (const [parameter, [minimum, maximum]] of Object.entries(ranges)) {
        channel.envelope[target][parameter] = clampProjectValue(envelope[parameter], minimum, maximum, channel.envelope[target][parameter]);
      }
    }
    if (["pitch", "filter", "amp"].includes(saved.envelope?.target)) channel.envelope.target = saved.envelope.target;
    if (saved.lfo) {
      channel.lfo.rate = clampProjectValue(saved.lfo.rate, lfoRanges.rate[0], lfoRanges.rate[1], channel.lfo.rate);
      channel.lfo.depth = clampProjectValue(saved.lfo.depth, lfoRanges.depth[0], lfoRanges.depth[1], channel.lfo.depth);
      if (lfoTargets.includes(saved.lfo.target)) channel.lfo.target = saved.lfo.target;
      if (lfoShapes.includes(saved.lfo.shape)) channel.lfo.shape = saved.lfo.shape;
    }
  }

  audioEngine.stop();
  appState.playing = false;

  elements.play.setAttribute("aria-pressed", "false");
  elements.projectStatus.textContent = "RECALLED";
  document.querySelector("#mfxType").value = appState.mfxType;
  setBeatSync(appState.beatSync);
  setMixerMode(appState.mixerMode);
  renderMasterParameter();
  renderControlDials();
  deckIds.forEach((deckId) => renderPatternSelection(deckId, appState.patternIds[deckId]));
  renderActiveDeck();
  updateSequencerTarget();
  renderLfo();
  setStatus("STOPPED");
  audioEngine.applyActiveDeck();
  audioEngine.applyMultiFx(appState.mfxType);
  audioEngine.applyMaster();
}

function renderControlDials() {
  const dialSettings = [
    ["#masterVolumeKnob", appState.output.volume, 0, 100, false],
    ["#lowBoostKnob", appState.output.lowBoost, 0, 100, false],
    ["#tempoKnob", appState.tempo, 60, 180, false],
    ["#cutoffKnob", appState.output.cutoff, 40, 18000, true],
    ["#resonanceKnob", appState.output.resonance, 0.1, 18, false],
    ["#mfxAmountKnob", appState.mfxAmount, 0, 100, false]
  ];
  for (const [selector, value, minimum, maximum, logarithmic] of dialSettings) {
    const dial = document.querySelector(selector);
    const progress = logarithmic
      ? Math.log(value / minimum) / Math.log(maximum / minimum)
      : (value - minimum) / (maximum - minimum);
    dial.style.setProperty("--knob-angle", `${progress * 270 - 135}deg`);
    dial.setAttribute("aria-valuenow", String(value));
  }
  elements.tempoValue.textContent = String(appState.tempo);
  document.querySelector(".tempo-control").setAttribute("aria-label", `Tempo ${appState.tempo} beats per minute`);
  elements.octaveValue.textContent = `OCT ${appState.octave > 0 ? "+" : ""}${appState.octave}`;
}

function saveProjectToStorage() {
  try {
    localStorage.setItem(projectStorageKey, JSON.stringify(createProjectSnapshot()));
    elements.recallProject.disabled = false;
    elements.projectStatus.textContent = "SAVED";
  } catch (error) {
    elements.projectStatus.textContent = "SAVE UNAVAILABLE";
    console.error(error);
  }
}

function randomInt(minimum, maximum) {
  return Math.round(minimum + Math.random() * (maximum - minimum));
}

function initializeRandomizers() {
  document.querySelector("#envelopeRandomizeButton").addEventListener("click", () => {
    const trackEnvelope = appState.channels[appState.selectedTrack].envelope;
    const envelope = trackEnvelope[trackEnvelope.target];
    const ranges = trackEnvelope.target === "amp"
      ? { depth: [-100, 150], attack: [0, 127], decay: [0, 127], sustain: [0, 127], release: [0, 127] }
      : trackEnvelope.target === "pitch"
        ? { depth: [-63, 63], attack: [0, 127], decay: [0, 127], sustain: [-63, 63], release: [0, 127] }
        : { depth: [-63, 63], attack: [0, 127], decay: [0, 127], sustain: [0, 127], release: [0, 127] };
    for (const parameter of ["depth", "attack", "decay", "sustain", "release"]) {
      envelope[parameter] = randomInt(ranges[parameter][0], ranges[parameter][1]);
    }
    renderEnvelope();
  });

  document.querySelector("#filterRandomizeButton").addEventListener("click", () => {
    const types = ["lowpass", "highpass", "notch"];
    appState.filterType = types[randomInt(0, types.length - 1)];
    appState.output.cutoff = Math.round(40 * Math.pow(18000 / 40, Math.random()));
    appState.output.resonance = Math.round((0.1 + Math.random() * 17.9) * 10) / 10;
    document.querySelectorAll("[data-filter-type]").forEach((option) => {
      option.setAttribute("aria-pressed", String(option.dataset.filterType === appState.filterType));
    });
    renderControlDials();
    audioEngine.applyMaster();
  });

  document.querySelector("#mixerRandomizeButton").addEventListener("click", () => {
    const mode = appState.mixerMode;
    for (const track of trackDefinitions) {
      const value = mode === "pan" ? randomInt(25, 75) : randomInt(0, 100);
      appState.channels[track.id][mode] = value;
      document.querySelector(`[data-track="${track.id}"]`).dataset[mode] = String(value);
      updateChannelReadout(track.id);
    }
  });
}

function initializeProjectControls() {
  try {
    elements.recallProject.disabled = !localStorage.getItem(projectStorageKey);
  } catch {
    elements.recallProject.disabled = true;
  }
  elements.saveProject.addEventListener("click", saveProjectToStorage);
  elements.recallProject.addEventListener("click", () => {
    try {
      const saved = localStorage.getItem(projectStorageKey);
      if (!saved) return;
      restoreProjectSnapshot(JSON.parse(saved));
    } catch (error) {
      elements.projectStatus.textContent = "RECALL FAILED";
      console.error(error);
    }
  });
}

function initialize() {
  setupControlDials();
  initializeMasterProcessing();
  initializeFilters();
  initializeTransport();
  initializeSequencer();
  initializePatternPickers();
  initializeEnvelope();
  initializeLfo();
  initializeProjectControls();
  initializeRandomizers();
  document.querySelectorAll("[data-mixer-mode]").forEach((button) => {
    button.addEventListener("click", () => setMixerMode(button.dataset.mixerMode));
  });
  elements.beatSync.addEventListener("click", () => setBeatSync(!appState.beatSync));
  trackDefinitions.forEach(registerTrack);
  setBeatSync(true);
  updateSequencerTarget();
}

initialize();
