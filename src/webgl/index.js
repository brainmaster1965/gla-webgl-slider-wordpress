/**
 * Entry of the lazy "webgl" chunk (three.js + gsap + engine).
 * view.js loads it with import() only when a slider needs it.
 */
import { GlStage } from "./engine.js";
import { loadEffect } from "./effect-loader.js";

/**
 * @param {object} options
 * @param {string} options.effectId
 * @param {HTMLElement} options.host
 * @param {string[]} options.sources
 * @param {HTMLImageElement|null} options.referenceImage
 * @param {string} options.assetsUrl
 * @param {Function} options.onLost
 * @returns {Promise<GlStage>}
 */
export async function createStage({ effectId, ...options }) {
	const effect = await loadEffect(effectId);
	const stage = new GlStage({ ...options, effect });
	await stage.init();
	return stage;
}
