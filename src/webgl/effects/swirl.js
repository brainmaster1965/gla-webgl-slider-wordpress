/** Twirl around the pointer, cross-fade in the middle of the spin. */
export const meta = {
	label: "Swirl",
	description: "Strudel um die Mausposition, Überblendung mitten in der Drehung.",
	order: 100,
	ease: "power2.inOut",
	textures: [],
};

export const uniforms = {
	uAngle: 5.0, // radians in the centre
	uRadius: 1.1,
};

export const fragment = /* glsl */ `
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
