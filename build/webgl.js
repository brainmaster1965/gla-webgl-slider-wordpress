(globalThis["webpackChunkgla_webglslider"] ||= []).push([["webgl"],{

/***/ "./src/webgl/effect-loader.js"
/*!************************************!*\
  !*** ./src/webgl/effect-loader.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_EFFECT: () => (/* binding */ DEFAULT_EFFECT),
/* harmony export */   loadEffect: () => (/* binding */ loadEffect)
/* harmony export */ });
/**
 * Effect loader for the FRONTEND.
 *
 * Every effect file becomes its own small webpack chunk (build/effect-<id>.js),
 * so a page only downloads the one effect its slider really uses.
 */
const DEFAULT_EFFECT = "displacement";
const VALID_ID = /^[a-z0-9][a-z0-9-]*$/;
function importEffect(id) {
  return __webpack_require__("./src/webgl/effects lazy recursive ^\\.\\/.*\\.js$ include: ^\\.\\/[a-z0-9][a-z0-9-]*\\.js$")(`./${id}.js`);
}

/**
 * @param {string} id effect id = file name in effects/ without ".js"
 * @returns {Promise<{meta: object, fragment: string, uniforms?: object}>}
 */
async function loadEffect(id) {
  const wanted = VALID_ID.test(id || "") ? id : DEFAULT_EFFECT;
  try {
    return await __webpack_require__("./src/webgl/effects lazy recursive ^\\.\\/.*\\.js$")(`./${wanted}.js`);
  } catch (err) {
    if (wanted === DEFAULT_EFFECT) throw err;
    console.warn(`WebGL Slider: effect "${wanted}" not found, using "${DEFAULT_EFFECT}".`);
    return await __webpack_require__("./src/webgl/effects lazy recursive ^\\.\\/.*\\.js$")(`./${DEFAULT_EFFECT}.js`);
  }
}

/***/ },

/***/ "./src/webgl/engine.js"
/*!*****************************!*\
  !*** ./src/webgl/engine.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlStage: () => (/* binding */ GlStage)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _shaders_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shaders.js */ "./src/webgl/shaders.js");
/**
 * GlStage: one WebGL canvas per slider.
 *
 * - draws the current slide as a full-size quad (cover fit + scroll parallax,
 *   pixel-identical to the CSS <img> version, so the swap is invisible)
 * - runs ONE transition between two slide textures with a fragment shader
 *   that comes from a file in ./effects/
 * - renders on demand only (during a transition, on resize, on parallax),
 *   nothing runs while the slider is idle
 *
 * three.js is imported by name, so webpack tree-shakes everything we do not use.
 */



const MAX_TEXTURES = 4; // slides kept on the GPU at the same time (current, target, neighbours)
const MAX_TEXTURE_SIZE = 2560; // px, longest side of a slide texture
const MAX_PIXELS = 4.2e6; // upper limit of the drawing buffer (keeps heavy effects smooth on 4K / retina)
const DEFAULT_EASE = "power2.inOut";

/** number | [x, y] | [x, y, z] | [x, y, z, w] -> value for a three.js uniform */
function toUniformValue(value) {
  if (!Array.isArray(value)) return value;
  if (value.length === 2) return new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(...value);
  if (value.length === 3) return new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(...value);
  if (value.length === 4) return new three__WEBPACK_IMPORTED_MODULE_1__.Vector4(...value);
  return value;
}
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    // needed for textures from another origin (CDN); same-origin is not affected
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Image failed to load: ${url}`));
    image.src = url;
  });
}
class GlStage {
  /**
   * @param {object} options
   * @param {HTMLElement} options.host        element the canvas is inserted into (.slide-list)
   * @param {string[]} options.sources        image url per slide ("" = no image)
   * @param {HTMLImageElement|null} options.referenceImage  a slide <img>, defines the height of the parallax box
   * @param {{meta: object, fragment: string, uniforms?: object}} options.effect
   * @param {string} options.assetsUrl        folder of noise.png / disp.png (with trailing slash)
   * @param {Function} [options.onLost]       called when the browser takes the WebGL context away
   */
  constructor(options) {
    this.host = options.host;
    this.sources = options.sources;
    this.referenceImage = options.referenceImage || null;
    this.effect = options.effect;
    this.assetsUrl = options.assetsUrl || "";
    this.onLost = options.onLost || (() => {});
    this.textures = new Map(); // slide index -> { texture, aspect, used }
    this.pending = new Map(); // slide index -> Promise (loads in flight)
    this.current = 0;
    this.useCounter = 0;
    this.tween = null;
    this.raf = 0;
    this.parallaxRaw = 0;
    this.boxHeight = 1;
    this.destroyed = false;
    this.lost = false;
    this.shaderFailed = false;
  }

  /** Creates renderer, scene and shader. Throws if WebGL or the shader is not usable. */
  async init() {
    const {
      meta,
      fragment,
      uniforms: extra
    } = this.effect;
    try {
      const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance"
      });
      this.renderer = renderer;
      this.maxTextureSize = Math.min(renderer.capabilities.maxTextureSize, MAX_TEXTURE_SIZE);

      // a broken effect shader must not leave a black slider behind
      renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
        this.shaderFailed = true;
        console.error("WebGL Slider: shader error in effect", gl.getShaderInfoLog(fragmentShader) || gl.getProgramInfoLog(program));
      };
      const canvas = renderer.domElement;
      canvas.classList.add("gla-gl-canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.addEventListener("webglcontextlost", event => {
        if (this.destroyed) return; // our own forceContextLoss() in destroy()
        event.preventDefault();
        this.lost = true;
        this.onLost();
      });
      this.host.insertBefore(canvas, this.host.firstChild);

      // uniforms: engine owned + whatever the effect declares
      const u = {
        uTexFrom: {
          value: null
        },
        uTexTo: {
          value: null
        },
        uNoise: {
          value: null
        },
        uDisp: {
          value: null
        },
        uProgress: {
          value: 0
        },
        uTime: {
          value: 0
        },
        uDir: {
          value: 1
        },
        uRes: {
          value: new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(1, 1)
        },
        uMouse: {
          value: new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0.5, 0.5)
        },
        uBoxH: {
          value: 1
        },
        uParallax: {
          value: 0
        },
        uAspect: {
          value: new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(1, 1)
        }
      };
      for (const [name, value] of Object.entries(extra || {})) {
        u[name] = {
          value: toUniformValue(value)
        };
      }
      this.uniforms = u;

      // helper textures requested by the effect (noise / disp)
      const wanted = Array.isArray(meta.textures) ? meta.textures : [];
      await Promise.all(wanted.map(async name => {
        const key = name === "noise" ? "uNoise" : name === "disp" ? "uDisp" : null;
        if (!key) return;
        const {
          texture
        } = this.createTexture(await loadImage(`${this.assetsUrl}${name}.png`), {
          repeat: true,
          limit: 1024
        });
        u[key].value = texture;
      }));
      this.material = new three__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial({
        vertexShader: _shaders_js__WEBPACK_IMPORTED_MODULE_3__.VERTEX,
        fragmentShader: `${_shaders_js__WEBPACK_IMPORTED_MODULE_3__.PRELUDE}\n${fragment}\n${_shaders_js__WEBPACK_IMPORTED_MODULE_3__.MAIN}`,
        uniforms: u,
        depthTest: false,
        depthWrite: false
      });
      this.geometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(2, 2);
      this.mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(this.geometry, this.material);
      this.mesh.frustumCulled = false;
      this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
      this.scene.add(this.mesh);
      this.camera = new three__WEBPACK_IMPORTED_MODULE_1__.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.resize();

      // First draw (canvas is still hidden): three.js links and checks the program on first
      // use, so a broken shader shows up here and not in the middle of a transition.
      this.render();
      if (this.shaderFailed) throw new Error("Effect shader did not compile");
    } catch (err) {
      this.destroy();
      throw err;
    }
  }

  /* ---------------------------------------------------------------- *
   * textures
   * ---------------------------------------------------------------- */

  /** HTMLImageElement -> three.js texture (downscaled if it is bigger than needed) */
  createTexture(image, {
    repeat = false,
    limit
  } = {}) {
    let source = image;
    let width = image.naturalWidth || image.width;
    let height = image.naturalHeight || image.height;
    const maxSide = limit || this.targetTextureSize();
    const longest = Math.max(width, height);
    if (longest > maxSide) {
      const scale = maxSide / longest;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      source = canvas;
      width = canvas.width;
      height = canvas.height;
    }
    const texture = new three__WEBPACK_IMPORTED_MODULE_1__.Texture(source);
    if (repeat) {
      texture.wrapS = three__WEBPACK_IMPORTED_MODULE_1__.MirroredRepeatWrapping;
      texture.wrapT = three__WEBPACK_IMPORTED_MODULE_1__.MirroredRepeatWrapping;
    }
    texture.needsUpdate = true;
    return {
      texture,
      aspect: width / height
    };
  }

  /** No point in uploading more pixels than the canvas can show. */
  targetTextureSize() {
    const pixelRatio = this.renderer ? this.renderer.getPixelRatio() : 1;
    const wanted = Math.ceil(this.uniforms.uRes.value.x * pixelRatio * 1.5);
    return Math.min(this.maxTextureSize, Math.max(1280, wanted));
  }

  /** Makes sure the texture of slide `index` is on the GPU. Resolves with its entry. */
  ensure(index) {
    const known = this.textures.get(index);
    if (known) {
      known.used = ++this.useCounter;
      return Promise.resolve(known);
    }
    if (this.pending.has(index)) return this.pending.get(index);
    const url = this.sources[index];
    const job = (async () => {
      let entry;
      if (url) {
        entry = this.createTexture(await loadImage(url));
      } else {
        // slide without image: dark placeholder
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 2;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, 2, 2);
        const texture = new three__WEBPACK_IMPORTED_MODULE_1__.Texture(canvas);
        texture.needsUpdate = true;
        entry = {
          texture,
          aspect: 1
        };
      }
      if (this.destroyed) {
        entry.texture.dispose();
        throw new Error("stage destroyed");
      }
      entry.used = ++this.useCounter;
      this.textures.set(index, entry);
      this.evict();
      return entry;
    })();
    this.pending.set(index, job);
    const clear = () => this.pending.delete(index);
    job.then(clear, clear);
    return job;
  }

  /** Loads slides in the background (neighbours of the current one). */
  preload(indices) {
    indices.forEach(index => this.ensure(index).catch(() => {}));
  }

  /** Frees the least recently used textures once there are too many. */
  evict() {
    while (this.textures.size > MAX_TEXTURES) {
      let oldest = null;
      for (const [index, entry] of this.textures) {
        if (index === this.current) continue;
        if (!oldest || entry.used < oldest.entry.used) oldest = {
          index,
          entry
        };
      }
      if (!oldest) return;
      // never throw away a texture the shader is using right now
      if (this.uniforms.uTexFrom.value === oldest.entry.texture || this.uniforms.uTexTo.value === oldest.entry.texture) {
        return;
      }
      oldest.entry.texture.dispose();
      this.textures.delete(oldest.index);
    }
  }

  /* ---------------------------------------------------------------- *
   * drawing
   * ---------------------------------------------------------------- */

  /** Shows slide `index` without any transition. */
  async show(index) {
    const entry = await this.ensure(index);
    if (this.destroyed) return;
    this.current = index;
    this.setIdle(entry);
    this.render();
  }
  setIdle(entry) {
    const u = this.uniforms;
    u.uTexFrom.value = entry.texture;
    u.uTexTo.value = entry.texture;
    u.uAspect.value.set(entry.aspect, entry.aspect);
    u.uProgress.value = 0;
  }
  render() {
    if (this.destroyed || this.lost) return;
    this.renderer.render(this.scene, this.camera);
  }

  /** One render per animation frame at most; not needed while a transition renders anyway. */
  requestRender() {
    if (this.raf || this.tween || this.destroyed) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.render();
    });
  }

  /**
   * Runs the transition to slide `to`. Resolves when it is finished (or was
   * interrupted by destroy()).
   *
   * @param {number} to
   * @param {{dir?: number, origin?: {x: number, y: number}, duration?: number}} [options]
   */
  async transition(to, {
    dir = 1,
    origin,
    duration = 1.5
  } = {}) {
    const from = this.current;
    const [fromEntry, toEntry] = await Promise.all([this.ensure(from), this.ensure(to)]);
    if (this.destroyed || this.lost) return;
    const u = this.uniforms;
    u.uTexFrom.value = fromEntry.texture;
    u.uTexTo.value = toEntry.texture;
    u.uAspect.value.set(fromEntry.aspect, toEntry.aspect);
    u.uDir.value = dir;
    u.uMouse.value.set(origin ? origin.x : 0.5, origin ? origin.y : 0.5);
    u.uProgress.value = 0;
    u.uTime.value = 0;
    const startedAt = performance.now();
    await new Promise(resolve => {
      this.tween = gsap__WEBPACK_IMPORTED_MODULE_2__.gsap.to(u.uProgress, {
        value: 1,
        duration: Math.max(0.001, duration),
        ease: this.effect.meta.ease || DEFAULT_EASE,
        onUpdate: () => {
          u.uTime.value = (performance.now() - startedAt) / 1000;
          this.render();
        },
        onComplete: resolve,
        onInterrupt: resolve
      });
    });
    this.tween = null;
    if (this.destroyed) return;

    // settle: the target slide becomes the idle image (looks identical, uProgress was 1)
    this.current = to;
    this.setIdle(toEntry);
    this.render();
    this.evict();
  }

  /** Scroll parallax: vertical offset of the image box in CSS px (<= 0). */
  setParallax(px) {
    this.parallaxRaw = px;
    this.applyParallax();
    this.requestRender();
  }
  applyParallax() {
    // the box must never move further than it is taller than the slider, otherwise an edge shows
    const reserve = Math.max(0, this.boxHeight - this.uniforms.uRes.value.y);
    this.uniforms.uParallax.value = Math.max(-reserve, Math.min(0, this.parallaxRaw));
  }

  /** Call when the slider size changed. */
  resize() {
    if (this.destroyed || !this.renderer) return;
    const width = this.host.clientWidth;
    const height = this.host.clientHeight;
    if (!width || !height) return;
    const dpr = window.devicePixelRatio || 1;
    const pixelRatio = Math.max(1, Math.min(dpr, 2, Math.sqrt(MAX_PIXELS / (width * height))));
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false); // size comes from CSS

    this.uniforms.uRes.value.set(width, height);
    this.boxHeight = this.referenceImage ? this.referenceImage.offsetHeight || height : height;
    this.uniforms.uBoxH.value = this.boxHeight;
    this.applyParallax();
    this.requestRender();
  }
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.tween) this.tween.kill(); // fires onInterrupt, so a waiting transition() resolves
    if (this.raf) cancelAnimationFrame(this.raf);
    this.textures.forEach(entry => entry.texture.dispose());
    this.textures.clear();
    if (this.uniforms) {
      if (this.uniforms.uNoise.value) this.uniforms.uNoise.value.dispose();
      if (this.uniforms.uDisp.value) this.uniforms.uDisp.value.dispose();
    }
    if (this.material) this.material.dispose();
    if (this.geometry) this.geometry.dispose();
    if (this.renderer) {
      const canvas = this.renderer.domElement;
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  }
}

/***/ },

/***/ "./src/webgl/index.js"
/*!****************************!*\
  !*** ./src/webgl/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStage: () => (/* binding */ createStage)
/* harmony export */ });
/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine.js */ "./src/webgl/engine.js");
/* harmony import */ var _effect_loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect-loader.js */ "./src/webgl/effect-loader.js");
/**
 * Entry of the lazy "webgl" chunk (three.js + gsap + engine).
 * view.js loads it with import() only when a slider needs it.
 */



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
async function createStage({
  effectId,
  ...options
}) {
  const effect = await (0,_effect_loader_js__WEBPACK_IMPORTED_MODULE_1__.loadEffect)(effectId);
  const stage = new _engine_js__WEBPACK_IMPORTED_MODULE_0__.GlStage({
    ...options,
    effect
  });
  await stage.init();
  return stage;
}

/***/ },

/***/ "./src/webgl/shaders.js"
/*!******************************!*\
  !*** ./src/webgl/shaders.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAIN: () => (/* binding */ MAIN),
/* harmony export */   PRELUDE: () => (/* binding */ PRELUDE),
/* harmony export */   VERTEX: () => (/* binding */ VERTEX)
/* harmony export */ });
/**
 * Shared GLSL for every transition effect.
 *
 * An effect file only has to provide:
 *
 *     vec4 transition(vec2 uv)
 *
 * and may use everything declared in PRELUDE below. The engine glues
 * PRELUDE + effect + MAIN together into one fragment shader.
 *
 * Contract every effect must keep (otherwise the slide "jumps" when the
 * transition ends):  uProgress == 0.0  ->  exactly getFrom(uv)
 *                    uProgress == 1.0  ->  exactly getTo(uv)
 *
 * Careful with GLSL ES 3.00 reserved words as variable names: sample, filter,
 * input, output, common, active, half, fixed, long, short, static, this ...
 */

const VERTEX = /* glsl */`
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;
const PRELUDE = /* glsl */`
#define GLA_PI 3.14159265359
#define GLA_ASPECT (uRes.x / uRes.y)

varying vec2 vUv;

uniform sampler2D uTexFrom;   // outgoing slide
uniform sampler2D uTexTo;     // incoming slide
uniform sampler2D uNoise;     // assets/textures/noise.png (only if the effect lists it in meta.textures)
uniform sampler2D uDisp;      // assets/textures/disp.png  (only if the effect lists it in meta.textures)

uniform float uProgress;      // 0 -> 1, already eased
uniform float uTime;          // seconds since the transition started
uniform float uDir;           // +1 = next, -1 = previous
uniform vec2  uRes;           // canvas size in CSS px
uniform vec2  uMouse;         // origin of the transition, 0..1, y up (pointer position, centre for autoplay)

// parallax / cover-fit, used by getFrom() / getTo()
uniform float uBoxH;          // height of the (taller) image box in CSS px
uniform float uParallax;      // vertical offset of the image box in CSS px (<= 0)
uniform vec2  uAspect;        // image aspect ratios (from, to)

// uv (0..1, y up, canvas space) -> texture coordinate. Does the same as
// "object-fit: cover" on the 150vh high, parallax shifted <img> of the CSS version.
vec2 coverUv(vec2 uv, float imgAspect) {
	float fromTop = (1.0 - uv.y) * uRes.y;
	float boxV = (fromTop - uParallax) / uBoxH;
	float boxAspect = uRes.x / uBoxH;
	vec2 scale = boxAspect > imgAspect
		? vec2(1.0, imgAspect / boxAspect)
		: vec2(boxAspect / imgAspect, 1.0);
	vec2 t = (vec2(uv.x, boxV) - 0.5) * scale + 0.5;
	return vec2(t.x, 1.0 - t.y);
}

vec4 getFrom(vec2 uv) { return texture2D(uTexFrom, coverUv(uv, uAspect.x)); }
vec4 getTo(vec2 uv)   { return texture2D(uTexTo,   coverUv(uv, uAspect.y)); }

// --- small helpers ------------------------------------------------------
float rand2(vec2 c) {
	return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

float vnoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	float a = rand2(i);
	float b = rand2(i + vec2(1.0, 0.0));
	float c = rand2(i + vec2(0.0, 1.0));
	float d = rand2(i + vec2(1.0, 1.0));
	return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// 5 octaves, result 0..1
float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	for (int i = 0; i < 5; i++) {
		v += a * vnoise(p);
		p = p * 2.0 + vec2(17.0, 9.0);
		a *= 0.5;
	}
	return v / 0.96875;
}
`;
const MAIN = /* glsl */`
void main() {
	gl_FragColor = vec4(transition(vUv).rgb, 1.0);
}
`;

/***/ },

/***/ "./src/webgl/effects lazy recursive ^\\.\\/.*\\.js$"
/*!*******************************************************************************************!*\
  !*** ./src/webgl/effects/ lazy ^\.\/.*\.js$ chunkName: effect-[request] namespace object ***!
  \*******************************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const map = {
	"./_template.js": [
		"./src/webgl/effects/_template.js",
		[
			"effect-_template-js"
		]
	],
	"./displacement.js": [
		"./src/webgl/effects/displacement.js",
		[
			"effect-displacement-js"
		]
	],
	"./dissolve.js": [
		"./src/webgl/effects/dissolve.js",
		[
			"effect-dissolve-js"
		]
	],
	"./dots.js": [
		"./src/webgl/effects/dots.js",
		[
			"effect-dots-js"
		]
	],
	"./fluid.js": [
		"./src/webgl/effects/fluid.js",
		[
			"effect-fluid-js"
		]
	],
	"./glitch.js": [
		"./src/webgl/effects/glitch.js",
		[
			"effect-glitch-js"
		]
	],
	"./pixelate.js": [
		"./src/webgl/effects/pixelate.js",
		[
			"effect-pixelate-js"
		]
	],
	"./ripple.js": [
		"./src/webgl/effects/ripple.js",
		[
			"effect-ripple-js"
		]
	],
	"./swirl.js": [
		"./src/webgl/effects/swirl.js",
		[
			"effect-swirl-js"
		]
	],
	"./wave.js": [
		"./src/webgl/effects/wave.js",
		[
			"effect-wave-js"
		]
	],
	"./zoom-blur.js": [
		"./src/webgl/effects/zoom-blur.js",
		[
			"effect-zoom-blur-js"
		]
	]
};
function webpackAsyncContext(req) {
	try {
		if(!__webpack_require__.o(map, req)) {
			return Promise.resolve().then(() => {
	const e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
});
		}
	} catch(err) {
		return Promise.reject(err);
	}

	const ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1][0]).then(() => (__webpack_require__(id)));
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./src/webgl/effects lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ },

/***/ "./src/webgl/effects lazy recursive ^\\.\\/.*\\.js$ include: ^\\.\\/[a-z0-9][a-z0-9-]*\\.js$"
/*!*********************************************************************************************************************************!*\
  !*** ./src/webgl/effects/ lazy ^\.\/.*\.js$ include: ^\.\/[a-z0-9][a-z0-9-]*\.js$ chunkName: effect-[request] namespace object ***!
  \*********************************************************************************************************************************/
(module) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
	const e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/webgl/effects lazy recursive ^\\.\\/.*\\.js$ include: ^\\.\\/[a-z0-9][a-z0-9-]*\\.js$";
module.exports = webpackEmptyAsyncContext;

/***/ }

}]);
//# sourceMappingURL=webgl.js.map?ver=653131d7b666388e66bb