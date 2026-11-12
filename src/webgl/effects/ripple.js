/** Water ripple that spreads from the pointer position and washes the new slide in. */
export const meta = {
	label: "Ripple",
	description: "Wasserwelle, die von der Mausposition aus das neue Bild einspült.",
	order: 60,
	ease: "power2.inOut",
	textures: [],
};

export const uniforms = {
	uAmp: 0.035,
	uFreq: 45.0,
	uWidth: 0.14,
};

export const fragment = /* glsl */ `
uniform float uAmp;
uniform float uFreq;
uniform float uWidth;

vec4 transition(vec2 uv) {
	float p = uProgress;
	float ar = GLA_ASPECT;
	vec2 aspect = vec2(ar, 1.0);

	vec2 d = (uv - uMouse) * aspect;
	float dist = length(d);
	float maxR = length(max(uMouse, 1.0 - uMouse) * aspect); // distance to the farthest corner

	float front = mix(-uWidth, maxR + 2.0 * uWidth, p);
	float reveal = 1.0 - smoothstep(front - uWidth, front + uWidth, dist);

	float x = dist - front;
	float fade = smoothstep(0.0, 0.1, p) * (1.0 - smoothstep(0.85, 1.0, p));
	float wave = sin(x * uFreq) * exp(-x * x / (2.0 * uWidth * uWidth)) * uAmp * fade;

	vec2 off = (d / max(dist, 0.0001)) * wave / aspect;
	vec4 col = mix(getFrom(uv + off), getTo(uv + off), reveal);
	col.rgb += wave * 1.5;
	return col;
}
`;
