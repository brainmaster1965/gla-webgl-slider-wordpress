/** Noise dissolve with a glowing edge (uses assets/textures/noise.png, glow = theme orange). */
export const meta = {
	label: "Dissolve",
	description: "Auflösen über Noise-Muster mit leuchtender Kante.",
	order: 90,
	ease: "power1.inOut",
	textures: ["noise"],
};

export const uniforms = {
	uEdge: 0.08,
	uGlow: 1.4,
	uGlowColor: [0.945, 0.408, 0.227], // #f1683a
};

export const fragment = /* glsl */ `
uniform float uEdge;
uniform float uGlow;
uniform vec3 uGlowColor;

vec4 transition(vec2 uv) {
	float p = uProgress;
	vec2 nuv = vec2(uv.x * GLA_ASPECT, uv.y);

	float coarse = texture2D(uNoise, nuv * 0.22).r;
	float fine = texture2D(uNoise, nuv * 1.7 + 0.37).r;
	float n = smoothstep(0.2, 0.8, mix(coarse, fine, 0.25)); // stretch to 0..1

	float side = uDir > 0.0 ? 1.0 - uv.x : uv.x;
	float field = clamp(mix(n, side, 0.25), 0.0, 1.0);

	float t = p * (1.0 + 2.0 * uEdge) - uEdge;
	float reveal = 1.0 - smoothstep(t - uEdge, t + uEdge, field);
	float glow = reveal * (1.0 - reveal) * 4.0;

	vec4 col = mix(getFrom(uv), getTo(uv), reveal);
	col.rgb += uGlowColor * glow * uGlow * 0.5;
	return col;
}
`;
