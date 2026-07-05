export interface WaveSpec {
    color: string;
    speed: number;
    amplitude: number; // px at the 1080p reference height, scaled at runtime
    heightRatio: number; // crest baseline as a fraction of viewport height
    alpha?: number;
    strokeColor?: string;
}

// Ink-outlined greyscale swells on white paper (opaque so nothing bleeds
// through). Crest baselines are viewport-relative so the ocean fills the
// same portion of the screen at 1080p, 1440p, and on phones.
export const WAVE_CONFIG: WaveSpec[] = [
    { color: "#a6a6a6", speed: 0.2, amplitude: 25, heightRatio: 0.67, alpha: 1, strokeColor: "#0a0a0a" },
    { color: "#595959", speed: 0.3, amplitude: 25, heightRatio: 0.72, alpha: 1, strokeColor: "#0a0a0a" },
    { color: "#0a0a0a", speed: 0.45, amplitude: 15, heightRatio: 0.74, alpha: 1, strokeColor: "#0a0a0a" },
];

// Wave the ship rides (index into WAVE_CONFIG). The front-most wave — the
// ship sits IN the nearest ink line, so no closer wave with a different
// rhythm can visually contradict its bobbing.
export const SHIP_RIDE_INDEX = WAVE_CONFIG.length - 1;

const REFERENCE_HEIGHT = 1080;

// Swell size grows/shrinks with the viewport, within sane bounds
export function amplitudeScale(viewportHeight: number): number {
    return Math.min(1.5, Math.max(0.8, viewportHeight / REFERENCE_HEIGHT));
}

// Same formulas as the Waves canvas. Negative time term = waves travel
// left → right. Both canvases feed these the raw rAF timestamp, so every
// consumer shares one clock and one phase.
function wavePhase(index: number, elapsedMs: number): number {
    const wave = WAVE_CONFIG[index];
    return (
        -elapsedMs * wave.speed * 0.002 +
        (index * Math.PI * 2) / WAVE_CONFIG.length
    );
}

export function waveFrequency(index: number): number {
    return 0.01 + index * 0.005;
}

export function waveSurfaceY(
    index: number,
    x: number,
    elapsedMs: number,
    viewportHeight: number
): number {
    const wave = WAVE_CONFIG[index];
    return (
        wave.heightRatio * viewportHeight +
        Math.sin(x * waveFrequency(index) + wavePhase(index, elapsedMs)) *
            wave.amplitude *
            amplitudeScale(viewportHeight)
    );
}

export function waveSlopeAt(
    index: number,
    x: number,
    elapsedMs: number,
    viewportHeight: number
): number {
    const wave = WAVE_CONFIG[index];
    const frequency = waveFrequency(index);
    return (
        wave.amplitude *
        amplitudeScale(viewportHeight) *
        frequency *
        Math.cos(x * frequency + wavePhase(index, elapsedMs))
    );
}
