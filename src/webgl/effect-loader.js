/**
 * Effect loader for the FRONTEND.
 *
 * Every effect file becomes its own small webpack chunk (build/effect-<id>.js),
 * so a page only downloads the one effect its slider really uses.
 */
export const DEFAULT_EFFECT = "displacement";

const VALID_ID = /^[a-z0-9][a-z0-9-]*$/;

function importEffect(id) {
	return import(
		/* webpackChunkName: "effect-[request]" */
		/* webpackInclude: /^\.\/[a-z0-9][a-z0-9-]*\.js$/ */
		`./effects/${id}.js`
	);
}

/**
 * @param {string} id effect id = file name in effects/ without ".js"
 * @returns {Promise<{meta: object, fragment: string, uniforms?: object}>}
 */
export async function loadEffect(id) {
	const wanted = VALID_ID.test(id || "") ? id : DEFAULT_EFFECT;
	try {
		return await import(
			/* webpackChunkName: "effect-[request]" */
			`./effects/${wanted}.js`
		);
	} catch (err) {
		if (wanted === DEFAULT_EFFECT) throw err;
		console.warn(
			`WebGL Slider: effect "${wanted}" not found, using "${DEFAULT_EFFECT}".`,
		);
		return await import(
			/* webpackChunkName: "effect-[request]" */
			`./effects/${DEFAULT_EFFECT}.js`
		);
	}
}
