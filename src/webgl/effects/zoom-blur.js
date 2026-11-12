/** Fly-through: radial zoom blur towards the pointer while the slides cross-fade. */
export const meta = {
	label: "Zoom Blur",
	description: "Radialer Zoom-Blur, als würde man durch das Bild hindurchfliegen.",
	order: 70,
	ease: "power2.inOut",
	textures: [],
};

export const uniforms = {
	uStrength: 0.6,
	uZoom: 0.3,
};

export const fragment = /* glsl */ `
uniform float uStrength;
uniform float uZoom;

vec4 transition(vec2 uv) {
	float p = uProgress;
	vec2 c = uMouse;
	float blur = uStrength * sin(p * GLA_PI);
	float sw = smoothstep(0.35, 0.65, p);

	vec4 acc = vec4(0.0);
	float total = 0.0;
	for (int i = 0; i < 14; i++) {
		float f = float(i) / 13.0;
		float w = 1.0 - f * 0.6;
		vec2 suv = c + (uv - c) * (1.0 - blur * f * 0.5);
		vec2 uvF = c + (suv - c) * (1.0 - uZoom * p);          // outgoing slide zooms in
		vec2 uvT = c + (suv - c) * (1.0 + uZoom * (1.0 - p));  // incoming slide settles from far away
		acc += mix(getFrom(uvF), getTo(uvT), sw) * w;
		total += w;
	}
	return acc / total;
}
`;
