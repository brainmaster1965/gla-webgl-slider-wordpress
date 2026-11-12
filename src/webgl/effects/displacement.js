/** Classic displacement-map distortion (uses assets/textures/disp.png). */
export const meta = {
	label: "Displacement",
	description: "Klassische Verzerrung anhand der Displacement-Map (disp.png).",
	order: 10,
	ease: "power2.inOut",
	textures: ["disp"],
};

export const uniforms = {
	uIntensity: 0.45,
	uScale: 0.8,
};

export const fragment = /* glsl */ `
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
