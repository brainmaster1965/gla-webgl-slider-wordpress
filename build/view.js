/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	__webpack_require__.f = {};
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = (chunkId) => {
/******/ 		return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 			__webpack_require__.f[key](chunkId, promises);
/******/ 			return promises;
/******/ 		}, []));
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.u = (chunkId) => (chunkId + ".js?ver=" + {"vendors-node_modules_gsap_index_js-node_modules_three_build_three_module_js":"d147a276b620cc31d363","webgl":"653131d7b666388e66bb","effect-_template-js":"e501122c9faa66ca1c3e","effect-displacement-js":"c3bf74b4d1dbfbdf4b7c","effect-dissolve-js":"ddd79dd22a05eac2e802","effect-dots-js":"2ffa5bd404ed03c99139","effect-fluid-js":"abbbdbcb6cd768483cf1","effect-glitch-js":"e5156028d09d81e10707","effect-pixelate-js":"6c6f67db24732889476b","effect-ripple-js":"b7c2cc52e6c62921fa32","effect-swirl-js":"782ba96e547da74e4361","effect-wave-js":"d9c9453bff73dfec7196","effect-zoom-blur-js":"706207e774d6e710f107"}[chunkId] + "");
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.miniCssF = (chunkId) => (undefined);
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		const inProgress = {};
/******/ 		const dataWebpackPrefix = "gla-webglslider:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			let script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					const s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			const onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				const doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode?.removeChild(script);
/******/ 				doneFns?.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			const timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		let scriptUrl;
/******/ 		if (globalThis.importScripts) scriptUrl = globalThis.location + "";
/******/ 		const document = globalThis.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript?.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					let i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^https?:/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:|[?#].*$/g, "").replace(/\/[^/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"view": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				let installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							const promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							const error = new Error();
/******/ 							const loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										const errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										const realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										error.event = event;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(__webpack_require__.p + __webpack_require__.u(chunkId), loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkgla_webglslider"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Frontend script for the Glawebglslider (Hero Slider) block.
 *
 * WebGL transitions: every slide stays in the DOM (text, buttons, SEO, no-JS).
 * The images are drawn by ONE canvas per slider (see ./webgl/), the transition
 * between two slides is a fragment shader from ./webgl/effects/. A jump to any
 * slide (pagination) is ONE single transition.
 *
 * Progressive enhancement: the plain <img> slider is shown right away. three.js
 * and the chosen effect are loaded lazily after page load (own chunks); once the
 * canvas is ready it takes over (class "is-webgl"). Without WebGL, with "reduce
 * motion" or "save data", or if anything fails, the slider keeps working with a
 * simple CSS cross-fade.
 *
 * State machine: idle -> transition running (is-animating) -> idle.
 * Input (arrows, dots, swipe, autoplay) is ignored while a transition is running.
 *
 * Handles multiple instances of the block on a single page.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
/* global __webpack_public_path__ */

const DEFAULT_DURATION = 1500; // ms, fallback if --webgl-duration is missing
const DEFAULT_INTERVAL = 7000; // ms
const MIN_SWIPE_DISTANCE = 50; // px
const CENTER = {
  x: 0.5,
  y: 0.5
}; // transition origin when there is no pointer (autoplay)

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const clamp01 = value => Math.min(1, Math.max(0, value));
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;

/** Runs `callback` once the page (incl. the hero image) has loaded, so WebGL never competes with the LCP. */
function afterPageLoad(callback) {
  if (document.readyState === 'complete') callback();else window.addEventListener('load', callback, {
    once: true
  });
}

/**
 * Reads the transition duration (ms) from the CSS custom property --webgl-duration.
 * The value is set per block instance by render.php and mirrored in style.scss
 * (the name is a leftover of the old webgl effect, kept for compatibility).
 * Supports "1500ms" and "1.5s".
 *
 * @param {HTMLElement} container
 * @returns {number}
 */
function readWebglDuration(container) {
  const raw = getComputedStyle(container).getPropertyValue('--webgl-duration').trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value) || value <= 0) return DEFAULT_DURATION;
  return raw.endsWith('ms') ? value : value * 1000;
}

/**
 * Initializes the slider logic for a specific block instance.
 * @param {HTMLElement} container The main block wrapper (.wp-block-gla-webglslider).
 * @returns {{setParallax: (px: number) => void}|undefined}
 */
function initializeGlawebglslider(container) {
  // 1. Fetch instance-specific DOM elements (arrows/pagination/progress are optional)
  const sliderDom = container.querySelector('.slide-list');
  const prevDom = container.querySelector('.slide-prev');
  const nextDom = container.querySelector('.slide-next');
  const paginationDom = container.querySelector('.slide-pagination');
  const timeDom = container.querySelector('.slide-time');
  if (!sliderDom) {
    console.error('Hero Slider: .slide-list not found.', container);
    return;
  }
  const slides = Array.from(sliderDom.querySelectorAll('.slide-item'));
  const count = slides.length;
  if (count === 0) return;

  // 2. Settings from data attributes / CSS
  const isAutoplayEnabled = container.dataset.autoplay === 'true' && count > 1;
  const interval = parseInt(container.dataset.interval, 10) || DEFAULT_INTERVAL;
  const isStopOnHoverEnabled = container.dataset.stopOnHover !== 'false';
  const duration = readWebglDuration(container);

  // Progress bar only makes sense together with autoplay
  if (timeDom && !isAutoplayEnabled) timeDom.style.display = 'none';

  // 3. State
  let current = 0; // slide that is shown (or is being left)
  let target = null; // slide that is being revealed, null = idle
  let autoTimer = null;
  let isHovering = false;
  let isDragging = false;
  let isInView = true; // updated by the IntersectionObserver below
  let lastClient = null; // last pointer position, origin of the WebGL transition

  // WebGL (see initWebgl). `stage` is only set while the canvas is active.
  let stage = null;
  let pendingStage = null; // ready, but waits for a running transition to finish
  let webglDisabled = false;
  let resizeObserver = null;
  let lastParallax = 0;
  const dots = [];

  /**
   * Neighbours behave like next/prev (incl. wrap-around), everything else by index.
   * @param {number} to
   * @returns {"next"|"prev"}
   */
  function resolveDirection(to) {
    if (to === (current + 1) % count) return 'next';
    if (to === (current - 1 + count) % count) return 'prev';
    return to > current ? 'next' : 'prev';
  }

  /** Pointer position (0..1, y up) relative to the slider, centre if there is none. */
  function originFromPointer() {
    if (!lastClient) return CENTER;
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return CENTER;
    return {
      x: clamp01((lastClient.x - rect.left) / rect.width),
      y: clamp01(1 - (lastClient.y - rect.top) / rect.height)
    };
  }

  /** Keeps keyboard focus and screen readers out of the hidden slides. */
  function syncInert() {
    slides.forEach((slide, i) => {
      slide.inert = i !== current;
    });
  }
  function setActiveDot(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      if (i === index) dot.setAttribute('aria-current', 'true');else dot.removeAttribute('aria-current');
    });
  }

  /**
   * (Re)starts the autoplay countdown. No timer while paused or animating.
   */
  function scheduleAutoplay() {
    clearTimeout(autoTimer);
    const isPaused = isStopOnHoverEnabled && isHovering || isDragging || !isInView;
    if (!isAutoplayEnabled || isPaused || target !== null) return;
    autoTimer = setTimeout(() => start('next'), interval);
  }

  /* ------------------------------------------------------------------ *
   * WebGL canvas
   * ------------------------------------------------------------------ */

  /** Back to the plain <img> slider (WebGL lost, texture failed, ...). Never throws. */
  function disableWebgl(reason) {
    if (reason) console.warn('WebGL Slider: WebGL switched off.', reason);
    webglDisabled = true;
    container.classList.remove('is-webgl');
    if (resizeObserver) resizeObserver.disconnect();
    resizeObserver = null;
    const old = stage;
    const waiting = pendingStage;
    stage = null;
    pendingStage = null;
    if (old) old.destroy();
    if (waiting) waiting.destroy();
  }

  /** The canvas takes over from the <img> elements (only while idle). */
  async function activateStage(newStage) {
    try {
      newStage.resize();
      newStage.setParallax(lastParallax);
      await newStage.show(current);
      // the slide may have changed while the texture was loading
      if (target === null && newStage.current !== current) {
        await newStage.show(current);
      }
    } catch (err) {
      newStage.destroy();
      disableWebgl(err);
      return;
    }
    if (webglDisabled) {
      newStage.destroy();
      return;
    }
    // a transition started while the texture was loading: try again when it is over
    if (target !== null) {
      pendingStage = newStage;
      return;
    }
    stage = newStage;
    container.classList.add('is-webgl');
    newStage.render(); // canvas just became visible, make sure it shows the frame

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => stage && stage.resize());
      resizeObserver.observe(sliderDom);
    }
    newStage.preload([(current + 1) % count, (current - 1 + count) % count]);
  }

  /** Loads three.js + the chosen effect (own chunks) and prepares the canvas. */
  async function initWebgl() {
    if (webglDisabled || stage || pendingStage) return;
    const images = slides.map(slide => slide.querySelector('img'));
    try {
      // Where the chunks live. Normally detected by webpack itself; this makes it work
      // even if a caching plugin concatenates view.js into a bundle somewhere else.
      if (container.dataset.glBuild) {
        __webpack_require__.p = container.dataset.glBuild;
      }
      const {
        createStage
      } = await Promise.all(/*! import() | webgl */[__webpack_require__.e("vendors-node_modules_gsap_index_js-node_modules_three_build_three_module_js"), __webpack_require__.e("webgl")]).then(() => (__webpack_require__(/*! ./webgl */ "./src/webgl/index.js")));
      const newStage = await createStage({
        effectId: container.dataset.effect,
        host: sliderDom,
        sources: images.map(img => img ? img.src : ''),
        referenceImage: images.find(Boolean) || null,
        assetsUrl: container.dataset.glAssets || '',
        onLost: () => disableWebgl('context lost')
      });
      if (webglDisabled) {
        newStage.destroy();
        return;
      }
      await activateStage(newStage);
    } catch (err) {
      disableWebgl(err);
    }
  }

  /* ------------------------------------------------------------------ *
   * transition
   * ------------------------------------------------------------------ */

  /**
   * Starts ONE transition to the neighbour slide or to a given index.
   * @param {"next"|"prev"} direction
   * @param {number} [to]
   * @param {{x: number, y: number}} [origin] where the effect starts (pointer), centre by default
   */
  async function start(direction, to, origin) {
    if (target !== null || count < 2) return; // animation lock

    const next = to !== undefined ? to : direction === 'next' ? (current + 1) % count : (current - 1 + count) % count;
    if (next === current || next < 0 || next >= count) return;
    clearTimeout(autoTimer);
    target = next;
    setActiveDot(next);

    // the picture of the target slide has to be on the GPU before anything moves
    if (stage) {
      try {
        await stage.ensure(next);
      } catch (err) {
        disableWebgl(err);
      }
    }
    slides[current].classList.add('is-leaving', `leaving-${direction}`);
    slides[target].classList.add('is-target');
    container.classList.add('is-animating');
    let done = false;
    if (stage) {
      try {
        await stage.transition(next, {
          dir: direction === 'next' ? 1 : -1,
          origin: origin || CENTER,
          duration: duration / 1000
        });
        done = true;
      } catch (err) {
        disableWebgl(err);
      }
    }
    // no WebGL: the CSS cross-fade (style.scss) runs for the same time
    if (!done) await wait(duration);
    finish();
  }

  /** Transition finished: the target slide becomes the current one. */
  function finish() {
    const leaving = slides[current];
    leaving.classList.remove('is-current', 'is-leaving', 'leaving-next', 'leaving-prev');
    slides[target].classList.remove('is-target');
    slides[target].classList.add('is-current');
    current = target;
    target = null;
    container.classList.remove('is-animating');
    syncInert();
    if (stage) {
      stage.preload([(current + 1) % count, (current - 1 + count) % count]);
    } else if (pendingStage) {
      const waiting = pendingStage;
      pendingStage = null;
      activateStage(waiting);
    }
    scheduleAutoplay();
  }

  // === PAGINATION (any dot = one single transition) ===
  if (paginationDom) {
    paginationDom.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Go to slide ${i + 1}`);
      button.addEventListener('click', () => {
        if (i !== current) start(resolveDirection(i), i, originFromPointer());
      });
      paginationDom.appendChild(button);
      dots.push(button);
    }
  }

  // === ARROWS ===
  if (nextDom) nextDom.addEventListener('click', () => start('next', undefined, originFromPointer()));
  if (prevDom) prevDom.addEventListener('click', () => start('prev', undefined, originFromPointer()));

  // === POINTER POSITION (origin of effects like ripple, dots, swirl) ===
  container.addEventListener('pointermove', e => {
    lastClient = {
      x: e.clientX,
      y: e.clientY
    };
  }, {
    passive: true
  });

  // === HOVER PAUSE (mouse only, so touch devices never get stuck "hovering") ===
  container.addEventListener('pointerenter', e => {
    if (e.pointerType !== 'mouse') return;
    isHovering = true;
    if (isStopOnHoverEnabled) clearTimeout(autoTimer);
  });
  container.addEventListener('pointerleave', e => {
    if (e.pointerType !== 'mouse') return;
    isHovering = false;
    lastClient = null;
    if (isStopOnHoverEnabled) scheduleAutoplay();
  });

  // === SWIPE (touch + mouse drag) via Pointer Events ===
  let dragStartX = null;
  container.addEventListener('pointerdown', e => {
    if (count < 2) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Do not hijack clicks on links and buttons
    if (e.target.closest('a, button')) return;
    dragStartX = e.clientX;
    lastClient = {
      x: e.clientX,
      y: e.clientY
    };
    isDragging = true;
    clearTimeout(autoTimer);
    try {
      container.setPointerCapture(e.pointerId);
    } catch (err) {
      /* capture is only a convenience (drag keeps working outside the slider) */
    }
  });
  container.addEventListener('pointerup', e => {
    if (dragStartX === null) return;
    const distance = e.clientX - dragStartX;
    dragStartX = null;
    isDragging = false;
    lastClient = {
      x: e.clientX,
      y: e.clientY
    };
    if (Math.abs(distance) >= MIN_SWIPE_DISTANCE) {
      // ignored automatically while a transition is running
      start(distance < 0 ? 'next' : 'prev', undefined, originFromPointer());
    }
    scheduleAutoplay();
  });

  // Browser aborted the gesture (e.g. vertical scroll took over): resume autoplay
  container.addEventListener('pointercancel', () => {
    dragStartX = null;
    isDragging = false;
    scheduleAutoplay();
  });

  // === VISIBILITY: autoplay only runs while the slider is on screen ===
  // (several sliders on one page must not all keep rotating in the background)
  if (isAutoplayEnabled && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      isInView = entries[entries.length - 1].isIntersecting;
      if (isInView) scheduleAutoplay();else clearTimeout(autoTimer);
    }, {
      threshold: 0.1
    });
    observer.observe(container);
  }

  // === WEBGL: enhance once the page has loaded and the slider is (nearly) on screen ===
  const canUseWebgl = count > 1 &&
  // nothing to transition with a single slide
  !prefersReducedMotion() &&
  // those visitors get instant changes anyway
  !(navigator.connection && navigator.connection.saveData);
  if (canUseWebgl) {
    afterPageLoad(() => {
      if ('IntersectionObserver' in window) {
        const glObserver = new IntersectionObserver((entries, obs) => {
          if (!entries.some(entry => entry.isIntersecting)) return;
          obs.disconnect();
          initWebgl();
        }, {
          rootMargin: '200px'
        });
        glObserver.observe(container);
      } else {
        initWebgl();
      }
    });
  }

  // === INITIALIZATION ===
  slides[0].classList.add('is-current');
  syncInert();
  setActiveDot(0);
  scheduleAutoplay();
  return {
    /** Scroll parallax offset in px (<= 0), forwarded to the canvas. */
    setParallax(px) {
      lastParallax = px;
      if (stage) stage.setParallax(px);
    }
  };
}

/**
 * Sets --gla-scrollbar-width on <html>. style.scss subtracts it from 100vw,
 * so the full-width slider never causes horizontal scrolling when a classic
 * (non-overlay) scrollbar is visible.
 */
/* function updateScrollbarWidth() {
	const scrollbarWidth = Math.max(
		0,
		window.innerWidth - document.documentElement.clientWidth,
	);
	document.documentElement.style.setProperty(
		"--gla-scrollbar-width",
		`${scrollbarWidth}px`,
	);
} */ // 2026.11.18

/**
 * Parallax: one shared scroll listener (rAF-throttled) for all slider instances.
 * Writes --parallax-offset directly into the DOM (used by the <img> fallback) and
 * hands the same value to the WebGL canvas, no re-render involved.
 * @param {HTMLElement[]} containers
 * @param {Map<HTMLElement, {setParallax: Function}>} instances
 */
function initParallax(containers, instances) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const viewportHeight = window.innerHeight;
    // style.scss switches parallax off on smartphones and for "reduce motion"
    const parallaxOn = !isMobileViewport() && !prefersReducedMotion();
    containers.forEach(container => {
      const rect = container.getBoundingClientRect();
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const totalDistance = viewportHeight + rect.height;
        const currentProgress = (viewportHeight - rect.top) / totalDistance;
        const maxMovement = viewportHeight * 0.5; // corresponds to height: 150vh in CSS
        const offset = -(currentProgress * maxMovement);
        container.style.setProperty('--parallax-offset', `${offset}px`);
        const instance = instances.get(container);
        if (instance) instance.setParallax(parallaxOn ? offset : 0);
      }
    });
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', requestUpdate, {
    passive: true
  });
  window.addEventListener('resize', () => {
    // updateScrollbarWidth(); // 2026.11.18
    requestUpdate();
  });
}

/**
 * Global initialization on DOM ready.
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const sliderContainers = Array.from(document.querySelectorAll('.wp-block-gla-webglslider'));
  if (sliderContainers.length === 0) return;

  // updateScrollbarWidth(); // 2026.11.18

  const instances = new Map();
  sliderContainers.forEach(container => {
    // Avoid double initialization (useful for AJAX or caching plugins)
    if (container.hasAttribute('data-slider-initialized')) return;
    const instance = initializeGlawebglslider(container);
    if (instance) instances.set(container, instance);
    container.setAttribute('data-slider-initialized', 'true');

    // Fade the images in on the next animation frame
    window.requestAnimationFrame(() => container.classList.add('is-ready'));
  });
  initParallax(sliderContainers, instances);
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map