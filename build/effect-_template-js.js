"use strict";
(globalThis["webpackChunkgla_webglslider"] ||= []).push([["effect-_template-js"],{

/***/ "./src/webgl/effects/_template.js"
/*!****************************************!*\
  !*** ./src/webgl/effects/_template.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fragment: () => (/* binding */ fragment),
/* harmony export */   meta: () => (/* binding */ meta),
/* harmony export */   uniforms: () => (/* binding */ uniforms)
/* harmony export */ });
/**
 * TEMPLATE for a new transition effect.
 *
 * 1. Copy this file, e.g. to "my-effect.js"  (lowercase, digits, hyphens; the file
 *    name is the effect id; files starting with "_" are ignored)
 * 2. Edit meta + fragment (+ uniforms)
 * 3. `npm run build`: the effect shows up in the editor select field by itself
 *
 * The shader only has to implement   vec4 transition(vec2 uv)   where uv is
 * 0..1 (y up). Available helpers / uniforms: see ../shaders.js
 *   getFrom(uv), getTo(uv)        sample the outgoing / incoming slide (cover fit + parallax)
 *   uProgress, uTime, uDir, uRes, uMouse, GLA_ASPECT, GLA_PI
 *   rand2(vec2), vnoise(vec2), fbm(vec2), uNoise, uDisp
 *
 * Rule: uProgress == 0 must return exactly getFrom(uv), uProgress == 1 exactly getTo(uv).
 */
const meta = {
  label: "Template (Crossfade)",
  // shown in the editor
  description: "Einfache Überblendung als Ausgangspunkt für eigene Effekte.",
  order: 1000,
  // position in the select field (lower = further up)
  ease: "power2.inOut",
  // any gsap ease
  textures: [] // helper textures to load: "noise" and / or "disp"
};

// optional extra uniforms: number, [x, y], [x, y, z] or [x, y, z, w]
const uniforms = {
  uStrength: 1.0
};
const fragment = /* glsl */`
uniform float uStrength;

vec4 transition(vec2 uv) {
	return mix(getFrom(uv), getTo(uv), smoothstep(0.0, 1.0, uProgress * uStrength));
}
`;

/***/ }

}]);
//# sourceMappingURL=effect-_template-js.js.map?ver=e501122c9faa66ca1c3e