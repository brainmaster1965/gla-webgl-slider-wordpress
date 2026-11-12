/** Liquid, flowing wipe: domain-warped noise decides what is revealed when. */
export const meta = {
	label: "Fluid",
	description: "Flüssiger, organisch fließender Übergang (Noise-Strömung).",
	order: 20,
	ease: "power1.inOut",
	textures: [],
};

export const uniforms = {
	uScale: 2.2,
	uWarp: 0.1,
	uSoftness: 0.35,
};

export const fragment = /* glsl */ `
uniform float uScale;
uniform float uWarp;
uniform float uSoftness;

vec4 transition(vec2 uv) {
	float p = uProgress;
	vec2 q = vec2(uv.x * GLA_ASPECT, uv.y) * uScale;
	float t = uTime * 0.4;

	vec2 flow = vec2(fbm(q + vec2(0.0, t)), fbm(q + vec2(5.2, 1.3) - vec2(t, 0.0)));
	float n = fbm(q + 2.0 * flow + vec2(1.7, 9.2));

	// the liquid enters from the side the user is navigating towards
	float side = uDir > 0.0 ? 1.0 - uv.x : uv.x;
	float field = clamp(mix(n, side, 0.4), 0.0, 1.0);

	float reveal = smoothstep(field, field + uSoftness, p * (1.0 + uSoftness));
	float edge = reveal * (1.0 - reveal) * 4.0; // 0 at start and end, 1 in the middle of the front

	vec2 off = (flow - 0.5) * uWarp * edge;
	vec4 col = mix(getFrom(uv + off), getTo(uv - off), reveal);
	col.rgb += vec3(edge * 0.05);
	return col;
}
`;
