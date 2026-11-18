"use strict";
(globalThis["webpackChunkgla_webglslider"] ||= []).push([["effect-glitch-js"],{

/***/ "./src/webgl/effects/glitch.js"
/*!*************************************!*\
  !*** ./src/webgl/effects/glitch.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fragment: () => (/* binding */ fragment),
/* harmony export */   meta: () => (/* binding */ meta),
/* harmony export */   uniforms: () => (/* binding */ uniforms)
/* harmony export */ });
/** Digital glitch: sliding bands, RGB split, flicker (random values from assets/textures/noise.png). */
const meta = {
  label: "Glitch",
  description: "Digitaler Glitch mit verschobenen Streifen und RGB-Versatz.",
  order: 50,
  ease: "none",
  textures: ["noise"]
};
const uniforms = {
  uBands: 36.0,
  uSplit: 0.025
};
const fragment = /* glsl */`
uniform float uBands;
uniform float uSplit;

float rnd(float a, float b) {
	return texture2D(uNoise, vec2(a, b)).r;
}

vec4 transition(vec2 uv) {
	float p = uProgress;
	float amount = sin(p * GLA_PI); // 0 -> 1 -> 0
	float tick = floor(uTime * 24.0);
	float band = floor(uv.y * uBands);

	float rBand = rnd(band * 0.0371 + 0.11, tick * 0.0173 + 0.07);
	float hit = step(0.55, rBand);
	float shift = (rBand - 0.5) * 0.35 * amount * hit * uDir;
	float split = uSplit * amount * (0.4 + rBand);

	// every band switches to the new slide at its own moment (static, no flicker)
	float thresh = 0.25 + 0.5 * rnd(band * 0.0371 + 0.5, 0.9);
	float m = step(thresh, p);

	vec2 o = vec2(shift, 0.0);
	vec2 oR = o + vec2(split, 0.0);
	vec2 oB = o - vec2(split, 0.0);

	float r = mix(getFrom(uv + oR).r, getTo(uv + oR).r, m);
	float g = mix(getFrom(uv + o).g, getTo(uv + o).g, m);
	float b = mix(getFrom(uv + oB).b, getTo(uv + oB).b, m);

	float jitter = (rnd(uv.y * 3.1, tick * 0.05) - 0.5) * 0.12 * amount;
	return vec4(vec3(r, g, b) + jitter, 1.0);
}
`;

/***/ }

}]);
//# sourceMappingURL=effect-glitch-js.js.map?ver=e5156028d09d81e10707