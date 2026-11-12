/** Image breaks up into big pixels, blocks switch to the new slide, pixels shrink again. */
export const meta = {
	label: "Pixelate",
	description: "Bild zerfällt in Pixelblöcke und setzt sich als neues Bild wieder zusammen.",
	order: 40,
	ease: "power1.inOut",
	textures: [],
};

export const uniforms = {
	uMaxSize: 80.0, // px
};

export const fragment = /* glsl */ `
uniform float uMaxSize;

vec4 transition(vec2 uv) {
	float p = uProgress;
	float peak = 1.0 - abs(2.0 * p - 1.0); // 0 -> 1 -> 0
	float size = mix(1.0, uMaxSize, peak * peak);

	vec2 px = uv * uRes;
	vec2 puv = (floor(px / size) + 0.5) * size / uRes;
	puv = mix(uv, puv, step(1.5, size)); // exact uv at the start and the end

	// coarse, fixed random grid: blocks switch one after the other without flickering
	float r = rand2(floor(uv * vec2(GLA_ASPECT, 1.0) * 18.0));
	float sw = clamp((p - 0.5) / 0.15 + (r - 0.5) * 1.6, 0.0, 1.0);

	return mix(getFrom(puv), getTo(puv), sw);
}
`;
