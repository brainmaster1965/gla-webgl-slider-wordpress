<?php

/**
 * Frontend render template for the "gla/webglslider" block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content.
 * @var WP_Block $block      Block instance.
 */

$slides = [];
if (isset($attributes['slides']) && is_array($attributes['slides'])) {
	$slides = array_values($attributes['slides']);
}

if (empty($slides)) {
	return;
}

$slide_count      = count($slides);
$interval         = (int) ($attributes['interval'] ?? 7000);
$autoplay         = $attributes['autoplay'] ?? true;
$stop_on_hover    = $attributes['stopOnHover'] ?? true;
$hide_progress    = $attributes['hideProgress'] ?? false;
$hide_navigation  = $attributes['hideNavigation'] ?? false;
$hide_pagination  = $attributes['hidePagination'] ?? false;
// Transition duration. The attribute is still called "webglDuration" (kept from the old
// webgl effect so existing blocks keep their setting), it is the duration of the WebGL effect now.
$webgl_duration = (int) ($attributes['webglDuration'] ?? 1500);

// WebGL effect = file name in src/webgl/effects/ (without .js). Whitelisted to the characters of
// such a file name; view.js falls back to the default effect if no file with this name exists.
$effect = preg_replace('/[^a-z0-9-]/', '', strtolower((string) ($attributes['effect'] ?? '')));
if ($effect === '') {
	$effect = 'displacement';
}

// Plugin root URL (this file lives in {plugin}/build/). Helper textures (noise / disp) and the
// lazy loaded WebGL chunks are resolved from it.
$plugin_url = plugin_dir_url(dirname(__DIR__) . '/gla-webglslider.php');

// Content position: set individually per slide (slide['contentPosition']).
// Format "{vertical}-{horizontal}", 9 allowed values.
$allowed_positions = [
	'top-left',
	'top-center',
	'top-right',
	'center-left',
	'center-center',
	'center-right',
	'bottom-left',
	'bottom-center',
	'bottom-right',
];

// Fallback for slides saved before the per-slide setting existed: they used the
// old block-wide attribute "contentAlignment" (left / center / right).
$legacy_positions = [
	'left'   => 'center-left',
	'center' => 'center-center',
	'right'  => 'center-right',
];
$default_position = $legacy_positions[$attributes['contentAlignment'] ?? 'center'] ?? 'center-center';

// With a single slide there is nothing to navigate: no arrows, dots or autoplay.
if ($slide_count < 2) {
	$autoplay        = false;
	$hide_navigation = true;
	$hide_pagination = true;
	$hide_progress   = true;
}

/**
 * Strips characters that could break out of a CSS declaration.
 * (Quotes stay allowed, e.g. for font families like 'Open Sans', sans-serif.)
 */
if (!function_exists('gla_webglslider_css_value')) {
	function gla_webglslider_css_value($value)
	{
		return trim(preg_replace('/[;{}<>\\\\]/', '', (string) $value));
	}
}

/**
 * Generates the CSS custom properties for one button (button1 / button2) of a slide.
 */
if (!function_exists('gla_webglslider_button_style')) {
	function gla_webglslider_button_style($slide, $prefix)
	{
		$styles = [];

		$colors = [
			'Color'          => 'color',
			'TextColor'      => 'textcolor',
			'HoverColor'     => 'hovercolor',
			'HoverTextColor' => 'hovertextcolor',
			'OutlineColor'   => 'outlinecolor',
		];
		foreach ($colors as $key => $css_name) {
			$value = gla_webglslider_css_value($slide[$prefix . $key] ?? '');
			if ($value !== '') {
				$styles[] = "--slider-{$prefix}-{$css_name}: {$value};";
			}
		}

		$border_radius = (float) ($slide[$prefix . 'BorderRadius'] ?? 0);
		if ($border_radius > 0) {
			$styles[] = "--slider-{$prefix}-borderradius: {$border_radius}px;";
		}

		$outline_width = (float) ($slide[$prefix . 'OutlineWidth'] ?? 0);
		if ($outline_width > 0) {
			$styles[] = "--slider-{$prefix}-outlinewidth: {$outline_width}px;";
		}

		return implode(' ', $styles);
	}
}

/**
 * Resolves the image URL of a slide.
 * - Full URLs / absolute paths (media library) are used as they are.
 * - Everything else is a bundled asset inside the plugin folder (e.g. assets/images/img1.jpg).
 */
if (!function_exists('gla_webglslider_image_url')) {
	function gla_webglslider_image_url($image_url)
	{
		$image_url = trim((string) $image_url);
		if ($image_url === '') {
			return '';
		}

		if (preg_match('#^(https?:)?//#i', $image_url) || strpos($image_url, '/') === 0) {
			return $image_url;
		}

		// Plugin root URL (this file lives in {plugin}/build/webglslider/ or {plugin}/src/webglslider/).
		// Does not depend on the name of the plugin folder.
		// $base_url = trailingslashit(plugins_url('', dirname(__DIR__, 2) . '/gla-webglslider.php'));
		$base_url = plugin_dir_url(dirname(__DIR__) . '/gla-webglslider.php');

		return $base_url . ltrim($image_url, '/');
	}
}

/**
 * Running number of the slider on the current page (1 = first one).
 * Only the first image of the FIRST slider is loaded eagerly (it is the
 * likely LCP element); everything else is lazy loaded, so sliders further
 * down the page do not load their images before they come close.
 */
if (!function_exists('gla_webglslider_next_instance')) {
	function gla_webglslider_next_instance()
	{
		static $count = 0;
		return ++$count;
	}
}
$slider_number = gla_webglslider_next_instance();

// Wrapper attributes (the transition duration is handed over as CSS variable, see style.scss)
$wrapper_attributes = get_block_wrapper_attributes([
	'role'                 => 'region',
	'aria-roledescription' => 'carousel',
	'aria-label'           => __('Hero slider', 'gla-webglslider'),
	'data-interval'        => $interval,
	'data-autoplay'        => $autoplay ? 'true' : 'false',
	'data-stop-on-hover'   => $stop_on_hover ? 'true' : 'false',
	'data-effect'          => $effect,
	'data-gl-assets'       => $plugin_url . 'assets/textures/',
	'data-gl-build'        => $plugin_url . 'build/',
	'style'                => '--webgl-duration: ' . $webgl_duration . 'ms;',
]);
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="slide-list">
		<?php foreach ($slides as $index => $slide) :
			$is_first = ($index === 0);

			// --- SLIDE SPECIFIC TYPOGRAPHY VARIABLES ---
			$authorColor = gla_webglslider_css_value($slide['authorColor'] ?? '#ffffff');
			$authorSize  = (float) ($slide['authorFontSize'] ?? 14) . 'px';
			$authorFont  = gla_webglslider_css_value($slide['authorFontFamily'] ?? 'inherit');

			$titleColor  = gla_webglslider_css_value($slide['titleColor'] ?? '#ffffff');
			$titleSize   = (float) ($slide['titleFontSize'] ?? 60) . 'px';
			$titleFont   = gla_webglslider_css_value($slide['titleFontFamily'] ?? 'inherit');

			$topicColor  = gla_webglslider_css_value($slide['topicColor'] ?? '#ffffff');
			$topicSize   = (float) ($slide['topicFontSize'] ?? 60) . 'px';
			$topicFont   = gla_webglslider_css_value($slide['topicFontFamily'] ?? 'inherit');

			// Typography and button styles go into one style string for the slide item
			$slide_styles = sprintf(
				'--slider-author-color: %s; --slider-author-size: %s; --slider-author-font: %s; ' .
					'--slider-title-color: %s; --slider-title-size: %s; --slider-title-font: %s; ' .
					'--slider-topic-color: %s; --slider-topic-size: %s; --slider-topic-font: %s; ',
				$authorColor,
				$authorSize,
				$authorFont,
				$titleColor,
				$titleSize,
				$titleFont,
				$topicColor,
				$topicSize,
				$topicFont
			);
			$slide_styles .= gla_webglslider_button_style($slide, 'button1') . ' ';
			$slide_styles .= gla_webglslider_button_style($slide, 'button2');

			$finalImageUrl = gla_webglslider_image_url($slide['imageUrl'] ?? '');

			// Content position of this slide (whitelisted, falls back to the legacy value)
			$contentPosition = $slide['contentPosition'] ?? '';
			if (!in_array($contentPosition, $allowed_positions, true)) {
				$contentPosition = $default_position;
			}

			// Check visibility
			$showContent         = $slide['showContent'] ?? [];
			$any_content_visible = !empty(array_filter($showContent));

			// Classes: first slide is the current one, plus a running number e.g. 'slide-1'
			$slide_classes = 'slide-item slide-' . ($index + 1) . ($is_first ? ' is-current' : '');
		?>

			<div class="<?php echo esc_attr($slide_classes); ?>" style="<?php echo esc_attr($slide_styles); ?>" <?php echo $is_first ? '' : 'inert'; ?>>
				<div class="slide-wrapper">
					<?php if (!empty($finalImageUrl)) : ?>
						<?php $eager_image = ($slider_number === 1 && $is_first); ?>
						<img src="<?php echo esc_url($finalImageUrl); ?>" alt="<?php echo esc_attr($slide['title'] ?? ''); ?>" draggable="false" loading="<?php echo $eager_image ? 'eager' : 'lazy'; ?>" decoding="async" <?php echo $eager_image ? ' fetchpriority="high"' : ''; ?> />
					<?php endif; ?>

					<?php if ($any_content_visible) : ?>
						<div class="slide-content is-position-<?php echo esc_attr($contentPosition); ?>">

							<?php if (!empty($showContent['author']) && !empty($slide['author'])) : ?>
								<div class="slide-author"><?php echo esc_html($slide['author']); ?></div>
							<?php endif; ?>

							<?php if (!empty($showContent['title']) && !empty($slide['title'])) : ?>
								<div class="slide-title"><?php echo esc_html($slide['title']); ?></div>
							<?php endif; ?>

							<?php if (!empty($showContent['topic']) && !empty($slide['topic'])) : ?>
								<div class="slide-topic"><?php echo esc_html($slide['topic']); ?></div>
							<?php endif; ?>

							<?php if (!empty($showContent['description']) && !empty($slide['description'])) : ?>
								<div class="slide-description"><?php echo esc_html($slide['description']); ?></div>
							<?php endif; ?>

							<?php if (!empty($showContent['button1']) || !empty($showContent['button2'])) : ?>
								<div class="slide-buttons">
									<?php if (!empty($showContent['button1']) && !empty($slide['button1Text'])) : ?>
										<a href="<?php echo esc_url($slide['button1Url'] ?? '#'); ?>"
											class="button-1 <?php echo !empty($slide['button1Outline']) ? 'has-outline' : ''; ?>">
											<?php echo esc_html($slide['button1Text']); ?>
										</a>
									<?php endif; ?>

									<?php if (!empty($showContent['button2']) && !empty($slide['button2Text'])) : ?>
										<a href="<?php echo esc_url($slide['button2Url'] ?? '#'); ?>"
											class="button-2 <?php echo !empty($slide['button2Outline']) ? 'has-outline' : ''; ?>">
											<?php echo esc_html($slide['button2Text']); ?>
										</a>
									<?php endif; ?>
								</div>
							<?php endif; ?>

						</div>
					<?php endif; ?>
				</div>
			</div>

		<?php endforeach; ?>
	</div>

	<?php if (!$hide_navigation) : ?>
		<div class="slide-arrows">
			<button type="button" class="slide-prev" aria-label="<?php echo esc_attr__('Previous slide', 'gla-webglslider'); ?>">&lt;</button>
			<button type="button" class="slide-next" aria-label="<?php echo esc_attr__('Next slide', 'gla-webglslider'); ?>">&gt;</button>
		</div>
	<?php endif; ?>

	<?php if (!$hide_pagination) : ?>
		<div class="slide-pagination"></div>
	<?php endif; ?>

	<?php if (!$hide_progress) : ?>
		<div class="slide-time"></div>
	<?php endif; ?>
</div>