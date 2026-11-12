/**
 * Shared GLSL for every transition effect.
 *
 * An effect file only has to provide:
 *
 *     vec4 transition(vec2 uv)
 *
 * and may use everything declared in PRELUDE below. The engine glues
 * PRELUDE + effect + MAIN together into one fragment shader.
 *
 * Contract every effect must keep (otherwise the slide "jumps" when the
 * transition ends):  uProgress == 0.0  ->  exactly getFrom(uv)
 *                    uProgress == 1.0  ->  exactly getTo(uv)
 *
 * Careful with GLSL ES 3.00 reserved words as variable names: sample, filter,
 * input, output, common, active, half, fixed, long, short, static, this ...
 */

export const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const PRELUDE = /* glsl */ `
#define GLA_PI 3.14159265359
#define GLA_ASPECT (uRes.x / uRes.y)

varying vec2 vUv;

uniform sampler2D uTexFrom;   // outgoing slide
uniform sampler2D uTexTo;     // incoming slide
uniform sampler2D uNoise;     // assets/textures/noise.png (only if the effect lists it in meta.textures)
uniform sampler2D uDisp;      // assets/textures/disp.png  (only if the effect lists it in meta.textures)

uniform float uProgress;      // 0 -> 1, already eased
uniform float uTime;          // seconds since the transition started
uniform float uDir;           // +1 = next, -1 = previous
uniform vec2  uRes;           // canvas size in CSS px
uniform vec2  uMouse;         // origin of the transition, 0..1, y up (pointer position, centre for autoplay)

// parallax / cover-fit, used by getFrom() / getTo()
uniform float uBoxH;          // height of the (taller) image box in CSS px
uniform float uParallax;      // vertical offset of the image box in CSS px (<= 0)
uniform vec2  uAspect;        // image aspect ratios (from, to)

// uv (0..1, y up, canvas space) -> texture coordinate. Does the same as
// "object-fit: cover" on the 150vh high, parallax shifted <img> of the CSS version.
vec2 coverUv(vec2 uv, float imgAspect) {
	float fromTop = (1.0 - uv.y) * uRes.y;
	float boxV = (fromTop - uParallax) / uBoxH;
	float boxAspect = uRes.x / uBoxH;
	vec2 scale = boxAspect > imgAspect
		? vec2(1.0, imgAspect / boxAspect)
		: vec2(boxAspect / imgAspect, 1.0);
	vec2 t = (vec2(uv.x, boxV) - 0.5) * scale + 0.5;
	return vec2(t.x, 1.0 - t.y);
}

vec4 getFrom(vec2 uv) { return texture2D(uTexFrom, coverUv(uv, uAspect.x)); }
vec4 getTo(vec2 uv)   { return texture2D(uTexTo,   coverUv(uv, uAspect.y)); }

// --- small helpers ------------------------------------------------------
float rand2(vec2 c) {
	return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

float vnoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	float a = rand2(i);
	float b = rand2(i + vec2(1.0, 0.0));
	float c = rand2(i + vec2(0.0, 1.0));
	float d = rand2(i + vec2(1.0, 1.0));
	return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// 5 octaves, result 0..1
float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	for (int i = 0; i < 5; i++) {
		v += a * vnoise(p);
		p = p * 2.0 + vec2(17.0, 9.0);
		a *= 0.5;
	}
	return v / 0.96875;
}
`;

export const MAIN = /* glsl */ `
void main() {
	gl_FragColor = vec4(transition(vUv).rgb, 1.0);
}
`;
