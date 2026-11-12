=== Gla WebGL Slider ===
Contributors:      gla
Tags:              block, slider, hero, slideshow, parallax
Requires at least: 6.8
Tested up to:      6.8
Requires PHP:      7.4
Stable tag:        1.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A slider block for the WordPress block editor (Gutenberg).

== Description ==

**Gla WebGL Slider** adds 'WebGL Slider' block to the block editor's widgets category. The block is the **WebGL Slider**: a full-width hero slider with WebGL transition effects (Displacement, Fluid, Dots, Pixelate, Glitch, Ripple, Zoom Blur, Wave, Dissolve, Swirl), scroll parallax and animated slide content.

The block is rendered on the server (`render.php`) and needs no jQuery. The WebGL part (three.js, gsap and the chosen effect) is loaded lazily after page load.

= Key features =

* **WebGL transitions** - 10 shader effects, chosen in the block sidebar. New effects are single files in `src/webgl/effects/`. A jump via pagination is always one single transition. Without WebGL the slider cross-fades.
* **Scroll parallax** - the slide image moves while the page scrolls (reduced on tablets, off on smartphones).
* **Full width** - the slider breaks out of the content column and uses the full viewport width.
* **Content position per slide** - every slide has its own position, 9 options: top / center / bottom x left / center / right.
* **Animated content** - author, title, topic, description and buttons fade in one after the other once the image is revealed.
* **Per slide settings** - image (media library), texts, visible elements, typography (color, size, font family for author, title and topic) and two buttons with their own colors, hover colors, border radius and outline.
* **Slider settings** - autoplay, interval (3-15 s), pause on hover, transition effect and duration (0.5-3 s), show/hide arrows, pagination and progress bar.
* **Touch and mouse** - swipe or drag to change slides, plus arrows and pagination dots.
* **Accessible** - carousel roles and labels, hidden slides are `inert`, and the OS setting "reduce motion" switches slides instantly without parallax and text animation.
* **Multiple sliders per page** and graceful handling of a single slide (no arrows, dots or autoplay).

= Content position =

Each slide can be placed in one of 9 positions:

* top-left, top-center, top-right
* center-left, center-center, center-right
* bottom-left, bottom-center, bottom-right

Slides saved with an older version (one alignment for the whole slider) keep their look until you pick a position for them.

= Demo images =

The demo images in `assets/images/` were generated with Google Gemini (AI). They are meant as demo content only.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/gla-webglslider` directory, or upload the ZIP via *Plugins > Add New > Upload Plugin*.
2. Activate the plugin through the *Plugins* screen in WordPress.
3. Edit a page or post and open the block inserter.
4. Add the **WebGL Slider** block from the **GLA Blocks** category.
5. Use the block sidebar: *General slider settings* for autoplay, interval, WebGL duration and navigation, *Manage slides* for image, texts, content position, typography and buttons of every slide.
6. Use the preview/external link of the editor to check the result on the frontend. The editor shows only the first slide.

= Development =

The block source lives in `src/`, the WebGL effects in `src/webgl/effects/`. Node.js and npm are required.

1. `npm install`
2. `npm start` for development with watch mode, or `npm run build` for a production build.
3. `npm run plugin-zip` creates an installable ZIP.

== Frequently Asked Questions ==

= Can every slide have its own content position? =

Yes. Open a slide in *Manage slides* and choose one of the 9 positions in the 3x3 grid.

= Why do I only see the first slide in the editor? =

The editor preview is intentionally minimal (first slide, no animation). Use the preview of the page to see the real slider.

= Why does the parallax effect not work on my phone? =

Parallax is switched off on smartphones (viewport up to 767 px) and for visitors who enabled "reduce motion" in their operating system.

= Which WordPress and PHP versions are required? =

WordPress 6.8 or newer and PHP 7.4 or newer.

== Screenshots ==

1. WebGL Slider block preview (demo image generated with Google Gemini).

== Changelog ==

= 1.0.1 =
* New: autoplay pauses while a slider is not visible (several sliders per page no longer rotate in the background).
* New: slide images are lazy loaded; only the first image of the first slider on a page loads eagerly.

= 1.0.0 =
* First stable release. Changes since 0.1.0:
* New: content position is set individually for every slide.
* New: 9 positions (top / center / bottom x left / center / right) with a 3x3 picker in the slide settings.
* Changed: the block-wide "content alignment" setting was removed. Old values are still used as fallback for slides without their own position.
* Changed: content layout in frontend and editor preview reworked (shared SCSS mixin); smaller arrows and more side spacing on smartphones.
* Fixed: block inserter preview and editor image paths (`window.glawebglsliderData` was never provided).
* Fixed: hook order in the editor component (`useBlockProps` is now called before the preview return).
* Fixed: new slides had no typography defaults (editor showed `undefinedpx`).
* Fixed: bundled image URLs no longer depend on the plugin folder name.
* Added: README (txt and md) and LICENSE file.

= 0.1.0 =
* Initial release with the WebGL Slider block: WebGL transition, scroll parallax, autoplay, swipe, pagination, arrows, progress bar, per slide texts, typography and buttons.

== Upgrade Notice ==

= 1.0.1 =
Autoplay pauses for sliders that are off screen and images are lazy loaded. Content alignment is set per slide since 1.0.0; existing sliders keep their previous alignment until you change a slide. Run `npm run build` if you build from source.

== Credits ==

Demo images were generated with Google Gemini (AI). Please check the current terms for generated content before using them in commercial projects.
