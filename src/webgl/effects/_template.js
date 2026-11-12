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
export const meta = {
	label: "Template (Crossfade)", // shown in the editor
	description: "Einfache Überblendung als Ausgangspunkt für eigene Effekte.",
	order: 1000, // position in the select field (lower = further up)
	ease: "power2.inOut", // any gsap ease
	textures: [], // helper textures to load: "noise" and / or "disp"
};

// optional extra uniforms: number, [x, y], [x, y, z] or [x, y, z, w]
export const uniforms = {
	uStrength: 1.0,
};

export const fragment = /* glsl */ `
uniform float uStrength;

vec4 transition(vec2 uv) {
	return mix(getFrom(uv), getTo(uv), smoothstep(0.0, 1.0, uProgress * uStrength));
}
`;
