"use strict";
(globalThis["webpackChunkgla_webglslider"] ||= []).push([["effect-wave-js"],{

/***/ "./src/webgl/effects/wave.js"
/*!***********************************!*\
  !*** ./src/webgl/effects/wave.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fragment: () => (/* binding */ fragment),
/* harmony export */   meta: () => (/* binding */ meta),
/* harmony export */   uniforms: () => (/* binding */ uniforms)
/* harmony export */ });
/** Wipe with a wobbling, wavy edge that drags the picture along. */
const meta = {
  label: "Wave",
  description: "Wischer mit wellenförmiger Kante, die das Bild mitzieht.",
  order: 80,
  ease: "power2.inOut",
  textures: []
};
const uniforms = {
  uAmp: 0.06,
  uFreq: 7.0,
  uSoft: 0.08
};
const fragment = /* glsl */`
uniform float uAmp;
uniform float uFreq;
uniform float uSoft;

vec4 transition(vec2 uv) {
	float p = uProgress;
	float side = uDir > 0.0 ? 1.0 - uv.x : uv.x;

	float wv = sin(uv.y * uFreq + uTime * 3.0) * uAmp
		+ sin(uv.y * uFreq * 2.3 - uTime * 2.0) * uAmp * 0.4;

	float margin = uAmp * 1.4 + uSoft;
	float front = mix(-margin, 1.0 + margin, p);
	float x = side + wv;
	float reveal = 1.0 - smoothstep(front - uSoft, front + uSoft, x);

	float closeness = 1.0 - smoothstep(0.0, 0.25, abs(x - front));
	vec2 off = vec2(wv * closeness * sin(p * GLA_PI) * 0.6, 0.0);

	return mix(getFrom(uv + off), getTo(uv + off), reveal);
}
`;

/***/ }

}]);
//# sourceMappingURL=effect-wave-js.js.map?ver=d9c9453bff73dfec7196