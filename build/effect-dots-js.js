"use strict";
(globalThis["webpackChunkgla_webglslider"] ||= []).push([["effect-dots-js"],{

/***/ "./src/webgl/effects/dots.js"
/*!***********************************!*\
  !*** ./src/webgl/effects/dots.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fragment: () => (/* binding */ fragment),
/* harmony export */   meta: () => (/* binding */ meta),
/* harmony export */   uniforms: () => (/* binding */ uniforms)
/* harmony export */ });
/** Halftone dots that grow from the click position until the new slide fills the screen. */
const meta = {
  label: "Dots",
  description: "Wachsende Halbton-Punkte, ausgehend von der Mausposition.",
  order: 30,
  ease: "power2.inOut",
  textures: []
};
const uniforms = {
  uCells: 36.0,
  // dots along the height
  uSpread: 1.2 // how much the start is delayed with the distance to the origin
};
const fragment = /* glsl */`
uniform float uCells;
uniform float uSpread;

vec4 transition(vec2 uv) {
	float p = uProgress;
	float ar = GLA_ASPECT;

	vec2 g = vec2(uv.x * ar, uv.y) * uCells;
	vec2 f = fract(g) - 0.5;
	vec2 center = (floor(g) + 0.5) / uCells;
	vec2 origin = vec2(uMouse.x * ar, uMouse.y);

	float d = distance(center, origin) / length(vec2(ar, 1.0)); // ~0..1
	float local = clamp(p * (1.0 + uSpread) - d * uSpread, 0.0, 1.0);

	float r = local * 0.75; // 0.75 > half a cell diagonal: dots merge into a full area
	float aa = 0.04;
	float mask = 1.0 - smoothstep(r - aa, r + aa, length(f));
	mask *= smoothstep(0.0, 0.03, local);

	return mix(getFrom(uv), getTo(uv), mask);
}
`;

/***/ }

}]);
//# sourceMappingURL=effect-dots-js.js.map?ver=2ffa5bd404ed03c99139