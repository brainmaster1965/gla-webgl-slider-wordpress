<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gla/webglslider',
		'version' => '1.2.0',
		'title' => 'WebGL Slider',
		'category' => 'widgets',
		'icon' => 'slides',
		'description' => 'Premium hero slider with WebGL transition effects, parallax effect and animated custom content.',
		'example' => array(
			'attributes' => array(
				'preview' => true
			),
			'viewportWidth' => 1200
		),
		'supports' => array(
			'anchor' => true,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'background' => true,
				'text' => false
			),
			'html' => false
		),
		'textdomain' => 'gla-webglslider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => true
			),
			'interval' => array(
				'type' => 'number',
				'default' => 7000,
				'minimum' => 3000,
				'maximum' => 15000
			),
			'stopOnHover' => array(
				'type' => 'boolean',
				'default' => true
			),
			'hideProgress' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideNavigation' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hidePagination' => array(
				'type' => 'boolean',
				'default' => false
			),
			'effect' => array(
				'type' => 'string',
				'default' => 'displacement'
			),
			'webglDuration' => array(
				'type' => 'number',
				'default' => 1500,
				'minimum' => 500,
				'maximum' => 3000
			),
			'contentAlignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'authorColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'authorFontSize' => array(
				'type' => 'number',
				'default' => 24
			),
			'authorFontFamily' => array(
				'type' => 'string',
				'default' => 'sans-serif'
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'titleFontSize' => array(
				'type' => 'number',
				'default' => 48
			),
			'titleFontFamily' => array(
				'type' => 'string',
				'default' => 'sans-serif'
			),
			'topicColor' => array(
				'type' => 'string',
				'default' => '#f1683a'
			),
			'topicFontSize' => array(
				'type' => 'number',
				'default' => 48
			),
			'topicFontFamily' => array(
				'type' => 'string',
				'default' => 'sans-serif'
			),
			'slides' => array(
				'type' => 'array',
				'default' => array(
					array(
						'showContent' => array(
							'author' => true,
							'title' => true,
							'topic' => true,
							'description' => true,
							'button1' => true,
							'button2' => true
						),
						'author' => 'Author 1',
						'title' => 'TITLE 1',
						'topic' => 'TOPIC 1',
						'description' => 'Here comes the description of the slide.',
						'imageUrl' => 'assets/images/img1.jpg',
						'contentPosition' => 'center-center',
						'authorColor' => '#fff',
						'authorFontSize' => 24,
						'authorFontFamily' => 'sans-serif',
						'titleColor' => '#fff',
						'titleFontSize' => 48,
						'titleFontFamily' => 'sans-serif',
						'topicColor' => '#f1683a',
						'topicFontSize' => 48,
						'topicFontFamily' => 'sans-serif',
						'button1Text' => 'SEE MORE',
						'button1Url' => '#',
						'button1Color' => '#eee',
						'button1TextColor' => '#000',
						'button1HoverColor' => '#f1683a',
						'button1HoverTextColor' => '#fff',
						'button1BorderRadius' => 4,
						'button1Outline' => true,
						'button1OutlineColor' => '#fff',
						'button1OutlineWidth' => 1,
						'button2Text' => 'SUBSCRIBE',
						'button2Url' => '#',
						'button2Color' => 'transparent',
						'button2TextColor' => '#fff',
						'button2HoverColor' => '#f1683a',
						'button2HoverTextColor' => '#fff',
						'button2BorderRadius' => 4,
						'button2Outline' => true,
						'button2OutlineColor' => '#fff',
						'button2OutlineWidth' => 1
					),
					array(
						'showContent' => array(
							'author' => true,
							'title' => true,
							'topic' => true,
							'description' => true,
							'button1' => true,
							'button2' => true
						),
						'author' => 'Author 2',
						'title' => 'TITLE 2',
						'topic' => 'TOPIC 2',
						'description' => 'Here comes the description of the slide.',
						'imageUrl' => 'assets/images/img2.jpg',
						'contentPosition' => 'center-center',
						'authorColor' => '#fff',
						'authorFontSize' => 24,
						'authorFontFamily' => 'sans-serif',
						'titleColor' => '#fff',
						'titleFontSize' => 48,
						'titleFontFamily' => 'sans-serif',
						'topicColor' => '#f1683a',
						'topicFontSize' => 48,
						'topicFontFamily' => 'sans-serif',
						'button1Text' => 'SEE MORE',
						'button1Url' => '#',
						'button1Color' => '#eee',
						'button1TextColor' => '#000',
						'button1HoverColor' => '#f1683a',
						'button1HoverTextColor' => '#fff',
						'button1BorderRadius' => 4,
						'button1Outline' => true,
						'button1OutlineColor' => '#fff',
						'button1OutlineWidth' => 1,
						'button2Text' => 'SUBSCRIBE',
						'button2Url' => '#',
						'button2Color' => 'transparent',
						'button2TextColor' => '#fff',
						'button2HoverColor' => '#f1683a',
						'button2HoverTextColor' => '#fff',
						'button2BorderRadius' => 4,
						'button2Outline' => true,
						'button2OutlineColor' => '#fff',
						'button2OutlineWidth' => 1
					)
				),
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'showContent' => array(
							'type' => 'object',
							'properties' => array(
								'author' => array(
									'type' => 'boolean'
								),
								'title' => array(
									'type' => 'boolean'
								),
								'topic' => array(
									'type' => 'boolean'
								),
								'description' => array(
									'type' => 'boolean'
								),
								'button1' => array(
									'type' => 'boolean'
								),
								'button2' => array(
									'type' => 'boolean'
								)
							)
						),
						'author' => array(
							'type' => 'string'
						),
						'title' => array(
							'type' => 'string'
						),
						'topic' => array(
							'type' => 'string'
						),
						'description' => array(
							'type' => 'string'
						),
						'imageUrl' => array(
							'type' => 'string'
						),
						'contentPosition' => array(
							'type' => 'string',
							'enum' => array(
								'top-left',
								'top-center',
								'top-right',
								'center-left',
								'center-center',
								'center-right',
								'bottom-left',
								'bottom-center',
								'bottom-right'
							)
						),
						'authorColor' => array(
							'type' => 'string'
						),
						'authorFontSize' => array(
							'type' => 'number'
						),
						'authorFontFamily' => array(
							'type' => 'string'
						),
						'titleColor' => array(
							'type' => 'string'
						),
						'titleFontSize' => array(
							'type' => 'number'
						),
						'titleFontFamily' => array(
							'type' => 'string'
						),
						'topicColor' => array(
							'type' => 'string'
						),
						'topicFontSize' => array(
							'type' => 'number'
						),
						'topicFontFamily' => array(
							'type' => 'string'
						),
						'button1Text' => array(
							'type' => 'string'
						),
						'button1Url' => array(
							'type' => 'string'
						),
						'button1Color' => array(
							'type' => 'string'
						),
						'button1TextColor' => array(
							'type' => 'string'
						),
						'button1HoverColor' => array(
							'type' => 'string'
						),
						'button1HoverTextColor' => array(
							'type' => 'string'
						),
						'button1BorderRadius' => array(
							'type' => 'number'
						),
						'button1Outline' => array(
							'type' => 'boolean'
						),
						'button1OutlineColor' => array(
							'type' => 'string'
						),
						'button1OutlineWidth' => array(
							'type' => 'number'
						),
						'button2Text' => array(
							'type' => 'string'
						),
						'button2Url' => array(
							'type' => 'string'
						),
						'button2Color' => array(
							'type' => 'string'
						),
						'button2TextColor' => array(
							'type' => 'string'
						),
						'button2HoverColor' => array(
							'type' => 'string'
						),
						'button2HoverTextColor' => array(
							'type' => 'string'
						),
						'button2BorderRadius' => array(
							'type' => 'number'
						),
						'button2Outline' => array(
							'type' => 'boolean'
						),
						'button2OutlineColor' => array(
							'type' => 'string'
						),
						'button2OutlineWidth' => array(
							'type' => 'number'
						)
					)
				)
			)
		)
	)
);
