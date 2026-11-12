/**
 * Effect map for the BLOCK EDITOR.
 *
 * Scans src/webgl/effects/ at build time (webpack require.context) and returns
 * what is available, so the select field in the sidebar always matches the
 * folder. Drop a new file into the folder, rebuild, done.
 *
 * Rules for effect files (see effects/_template.js):
 *   - file name = effect id, lowercase letters / digits / hyphens, e.g. "zoom-blur.js"
 *   - files starting with "_" are ignored (templates, helpers)
 */
const context = require.context(
	"./effects",
	false,
	/^\.\/[a-z0-9][a-z0-9-]*\.js$/,
);

/**
 * @returns {{id: string, label: string, description: string}[]}
 */
export function listEffects() {
	return context
		.keys()
		.map((key) => {
			const id = key.replace(/^\.\//, "").replace(/\.js$/, "");
			const meta = context(key).meta || {};
			return {
				id,
				label: meta.label || id,
				description: meta.description || "",
				order: typeof meta.order === "number" ? meta.order : 1000,
			};
		})
		.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
}

export const DEFAULT_EFFECT = "displacement";
