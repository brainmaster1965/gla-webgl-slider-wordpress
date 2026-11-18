"use strict";
(globalThis["webpackChunkgla_webglslider"] ||= []).push([["effect-displacement-js"],{

/***/ "./src/webgl/effects/displacement.js"
/*!*******************************************!*\
  !*** ./src/webgl/effects/displacement.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fragment: () => (/* binding */ fragment),
/* harmony export */   meta: () => (/* binding */ meta),
/* harmony export */   uniforms: () => (/* binding */ uniforms)
/* harmony export */ });
/** Classic displacement-map distortion (uses assets/textures/disp.png). */
const meta = {
  label: "Displacement",
  description: "Klassische Verzerrung anhand der Displacement-Map (disp.png).",
  order: 10,
  ease: "power2.inOut",
  textures: ["disp"]
};
const uniforms = {
  uIntensity: 0.45,
  uScale: 0.8
};
const fragment = /* glsl */`
uniform float uIntensity;
uniform float uScale;

vec4 transition(vec2 uv) {
	float p = uProgress;
	vec2 duv = vec2(uv.x * GLA_ASPECT, uv.y) * uScale;
	float d = texture2D(uDisp, duv).r;
	vec2 dir = vec2(uDir, 0.3);

	vec2 uvFrom = uv + dir * d * uIntensity * p;
	vec2 uvTo   = uv - dir * d * uIntensity * (1.0 - p);
	return mix(getFrom(uvFrom), getTo(uvTo), p);
}
`;

/***/ }

}]);
//# sourceMappingURL=effect-displacement-js.js.map?ver=c3bf74b4d1dbfbdf4b7c