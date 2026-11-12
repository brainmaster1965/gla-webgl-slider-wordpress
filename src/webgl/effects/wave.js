/** Wipe with a wobbling, wavy edge that drags the picture along. */
export const meta = {
	label: "Wave",
	description: "Wischer mit wellenförmiger Kante, die das Bild mitzieht.",
	order: 80,
	ease: "power2.inOut",
	textures: [],
};

export const uniforms = {
	uAmp: 0.06,
	uFreq: 7.0,
	uSoft: 0.08,
};

export const fragment = /* glsl */ `
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
