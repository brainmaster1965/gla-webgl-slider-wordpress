import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import metadata from "./block.json";
import Edit from "./edit"; // Importiert deine edit.js

registerBlockType(metadata.name, {
	...metadata, // Übernimmt Name, Attribute etc. aus der JSON
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * Da wir eine render.php verwenden, bleibt save: null.
	 * WordPress nutzt dann automatisch das PHP-Template für das Frontend.
	 */
	save: () => null,
});
