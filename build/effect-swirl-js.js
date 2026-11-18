"use strict";
(globalThis["webpackChunkgla_webglslider"] ||= []).push([["effect-swirl-js"],{

/***/ "./src/webgl/effects/swirl.js"
/*!************************************!*\
  !*** ./src/webgl/effects/swirl.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fragment: () => (/* binding */ fragment),
/* harmony export */   meta: () => (/* binding */ meta),
/* harmony export */   uniforms: () => (/* binding */ uniforms)
/* harmony export */ });
/** Twirl around the pointer, cross-fade in the middle of the spin. */
const meta = {
  label: "Swirl",
  description: "Strudel um die Mausposition, Überblendung mitten in der Drehung.",
  order: 100,
  ease: "power2.inOut",
  textures: []
};
const uniforms = {
  uAngle: 5.0,
  // radians in the centre
  uRadius: 1.1
};
const fragment = /* glsl */`
uniform float uAngle;
uniform float uRadius;

vec4 transition(vec2 uv) {
	float p = uProgress;
	vec2 aspect = vec2(GLA_ASPECT, 1.0);

	vec2 d = (uv - uMouse) * aspect;
	float falloff = 1.0 - smoothstep(0.0, uRadius, length(d));
	float a = uAngle * falloff * sin(p * GLA_PI) * uDir;

	float s = sin(a);
	float c = cos(a);
	vec2 rd = vec2(d.x * c - d.y * s, d.x * s + d.y * c);
	vec2 suv = uMouse + rd / aspect;

	return mix(getFrom(suv), getTo(suv), smoothstep(0.3, 0.7, p));
}
`;

/***/ }

}]);
//# sourceMappingURL=effect-swirl-js.js.map?ver=782ba96e547da74e4361