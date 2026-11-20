/**
 * Hero sky in dithered dots, drawn by one WebGL fragment shader.
 * - Dark theme: a moon with real near-side maria in today's phase, a soft
 *   halo and blinking stars.
 * - Light theme: an ink-sketch sun with thin rays that slowly turn.
 * Both: drifting cloud bands and the odd shooting star.
 *
 * Each canvas pixel is one dither cell (~2 CSS px), upscaled with
 * `image-rendering: pixelated`, so the shader runs on a tiny grid and every
 * dot stays crisp at any device pixel ratio.
 */

/* ---------- moon phase ---------- */

const SYNODIC_MONTH = 29.530588853; // days, mean new moon → new moon
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const PHASE_NAMES = [
  "new moon",
  "waxing crescent",
  "first quarter",
  "waxing gibbous",
  "full moon",
  "waning gibbous",
  "last quarter",
  "waning crescent",
];

/**
 * Phase for a moment in time: `phase` 0 = new, 0.5 = full; `illumination`
 * is the lit fraction of the disc. Uses the mean synodic month, so it is
 * accurate to about a day, plenty for a label.
 */
export function moonPhase(ms: number) {
  const days = (ms - KNOWN_NEW_MOON) / 86_400_000;
  const phase = (((days / SYNODIC_MONTH) % 1) + 1) % 1;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  const name = PHASE_NAMES[Math.round(phase * 8) % 8];
  return { phase, illumination, name };
}

/* ---------- surface features (selenographic lon, lat, radius in degrees) ---------- */

// Approximate positions of the near-side maria; east (+lon) is on the right.
const MARIA: [number, number, number][] = [
  [-52, 28, 16], // Oceanus Procellarum (north)
  [-58, 8, 17], // Oceanus Procellarum (middle)
  [-45, -6, 12], // Oceanus Procellarum (south)
  [-17, 33, 15], // Mare Imbrium
  [17, 28, 9], // Mare Serenitatis
  [31, 8, 11], // Mare Tranquillitatis
  [59, 17, 7], // Mare Crisium
  [51, -8, 8], // Mare Fecunditatis
  [35, -15, 5], // Mare Nectaris
  [-17, -21, 9], // Mare Nubium
  [-39, -24, 6], // Mare Humorum
  [-28, -3, 8], // Mare Insularum / Cognitum
  [4, 13, 4], // Mare Vaporum
  [-8, 11, 4], // Sinus Aestuum
  [-15, 56, 6], // Mare Frigoris (west)
  [12, 57, 6], // Mare Frigoris (east)
];

// Bright young craters. Tycho comes first: the shader gives it rays.
const SPOTS: [number, number, number][] = [
  [-11, -43, 3.5], // Tycho
  [-20, 10, 3], // Copernicus
  [-47, 24, 2], // Aristarchus
  [-38, 8, 2], // Kepler
];

/** [lon, lat, r] in degrees → xyz unit vector + radius in radians. */
function toVec4s(list: [number, number, number][]) {
  const rad = Math.PI / 180;
  return new Float32Array(
    list.flatMap(([lon, lat, r]) => [
      Math.cos(lat * rad) * Math.sin(lon * rad),
      Math.sin(lat * rad),
      Math.cos(lat * rad) * Math.cos(lon * rad),
      r * rad,
    ]),
  );
}

/* ---------- shaders ---------- */

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0., 1.); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define MARIA ${MARIA.length}
#define SPOTS ${SPOTS.length}
#define TAU 6.2831853

uniform vec2 u_res;      // canvas size in cells
uniform float u_time;    // seconds
uniform float u_ink;     // gray level of the dots
uniform float u_dark;    // 1 = dark theme (halo, glow, stars), 0 = light
uniform vec3 u_moon;     // moon (or sun) center x, y (cells, y down) and radius (cells), with parallax
uniform vec2 u_anchor;   // moon center y and radius without parallax (cloud bands hang off it)
uniform vec2 u_phase;    // phase (0 new, .5 full), lit fraction
uniform vec2 u_lib;      // libration (lon, lat) in radians
uniform vec2 u_far;      // far cloud offset (cells)
uniform vec2 u_near;     // near cloud offset (cells)
uniform vec2 u_stars;    // star field offset (cells)
uniform vec4 u_maria[MARIA];
uniform vec4 u_spots[SPOTS];

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}

float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  vec2 e = vec2(1., 0.);
  return mix(
    mix(mix(hash(i), hash(i + e.xyy), f.x), mix(hash(i + e.yxy), hash(i + e.xxy), f.x), f.y),
    mix(mix(hash(i + e.yyx), hash(i + e.xyx), f.x), mix(hash(i + e.yxx), hash(i + e.xxx), f.x), f.y),
    f.z);
}

float fbm(vec2 p) {
  float v = 0., a = .5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= .5; }
  return v;
}

float fbm(vec3 p) {
  float v = 0., a = .5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.07 + 5.3; a *= .5; }
  return v;
}

// 4x4 Bayer threshold in [0, 1).
float bayer2(vec2 a) { a = floor(a); return fract(a.x * .5 + a.y * a.y * .75); }
float bayer4(vec2 a) { return bayer2(.5 * a) * .25 + bayer2(a); }

float band(float y, float center, float width) {
  float d = (y - center) / width;
  return exp(-d * d);
}

// Shooting star for one slot: each period it may fire once (some cycles are
// skipped), starting in the upper sky beside the moon and streaking down and
// away from it. Returns the streak's strength at p.
float meteor(vec2 p, float t, float slot) {
  float period = 5. + 3.5 * slot;
  float ct = t / period + .37 * slot;
  vec2 id = vec2(floor(ct), slot);
  float s = fract(ct) * period / .9; // progress through a 0.9 s flight
  if (s > 1. || hash(id + 19.1) < .35) return 0.;

  float h1 = hash(id + .13), h2 = hash(id + 7.7);
  float side = h1 < .5 ? -1. : 1.;
  vec2 dir = normalize(vec2(side, .35 + .3 * h2));
  vec2 start = vec2(u_moon.x + side * (1.5 * u_moon.z + .25 * h2 * u_res.x),
                    u_res.y * (.06 + .26 * fract(h1 * 13.)));
  vec2 v = start + dir * 150. * s - p; // head minus pixel, in cells
  float behind = dot(v, dir);
  float across = abs(dot(v, vec2(-dir.y, dir.x)));
  float len = 44. * min(1., s * 3.); // the tail grows in, then holds
  float tail = step(0., behind) * max(0., 1. - behind / len) * step(across, .75);
  float head = exp(-dot(v, v) * .6);
  return max(tail, head) * smoothstep(0., .1, s) * (1. - smoothstep(.65, 1., s));
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 uv = p / u_res;
  float t = u_time;
  float baseY = u_anchor.x, R = u_anchor.y;

  // Sky layers melt into the page toward the bottom and the far sides.
  float bottom = 1. - smoothstep(.45, .97, uv.y);
  float sky = bottom * smoothstep(0., .1, uv.x) * smoothstep(1., .9, uv.x);
  float cloudInk = mix(.7, 1., u_dark);

  // Stars (dark theme only): rare cells in the upper sky that blink now and then.
  float sh = hash(floor(p + u_stars) + 41.7);
  float star = step(.9986, sh)
    * step(.2, .5 + .5 * sin(t * (.5 + 2. * fract(sh * 91.)) + sh * 300.))
    * u_dark * (1. - smoothstep(.2, .65, uv.y)) * sky;

  // Far clouds: slow and dim, a wide band through the moon and a thin one above.
  vec2 pf = p + u_far;
  float farMask = band(pf.y, baseY - .15 * R, 1.1 * R) + .6 * band(pf.y, baseY - 1.7 * R, .55 * R);
  float far = smoothstep(.42, .8, fbm(pf * vec2(.011, .03) + vec2(t * .012, 3.1)))
    * farMask * sky * cloudInk;

  // Near clouds: faster and brighter, drifting in front of the moon's lower half.
  vec2 pn = p + u_near;
  float near = smoothstep(.48, .82, fbm(pn * vec2(.015, .042) + vec2(t * .028, 11.3)))
    * band(pn.y, baseY + .8 * R, .42 * R) * sky * cloudInk;

  // Moon.
  vec2 q = (p - u_moon.xy) / u_moon.z;
  q.y = -q.y;
  float r2 = dot(q, q);
  float rr = sqrt(r2);
  float onDisc = step(r2, 1.);
  float moon = 0.;

  if (r2 < 1. && u_dark > .5) {
    vec3 n = vec3(q, sqrt(1. - r2));

    // Libration: tip the globe a few degrees so the maria slowly sway.
    float cx = cos(u_lib.y), sx = sin(u_lib.y), cy = cos(u_lib.x), sy = sin(u_lib.x);
    vec3 m = vec3(n.x, cx * n.y - sx * n.z, sx * n.y + cx * n.z);
    m = vec3(cy * m.x + sy * m.z, m.y, -sy * m.x + cy * m.z);

    // Albedo: mottled highlands, dark maria with ragged edges, bright craters.
    float rough = fbm(m * 7.);
    float alb = .84 + .3 * (rough - .44);
    float mare = 0.;
    for (int i = 0; i < MARIA; i++) {
      float d = acos(clamp(dot(m, u_maria[i].xyz), -1., 1.));
      mare = max(mare, smoothstep(u_maria[i].w * 1.2, u_maria[i].w * .65, d + (rough - .44) * .16));
    }
    alb = mix(alb, .4 + .25 * rough, mare);
    for (int i = 0; i < SPOTS; i++) {
      float d = acos(clamp(dot(m, u_spots[i].xyz), -1., 1.));
      alb = max(alb, smoothstep(u_spots[i].w, u_spots[i].w * .4, d));
    }

    // Tycho's rays: bright streaks fanning out from spot 0.
    vec3 c = u_spots[0].xyz;
    vec3 e1 = normalize(cross(c, vec3(0., 1., 0.)));
    vec3 e2 = cross(c, e1);
    vec3 v = m - c * dot(m, c);
    float ang = atan(dot(v, e2), dot(v, e1));
    float dT = acos(clamp(dot(m, c), -1., 1.));
    float rays = smoothstep(.6, .9, noise(vec2(cos(ang), sin(ang)) * 4. + 7.3)) * smoothstep(.75, .08, dT);
    alb = min(1., alb + rays * .22 * (1. - .5 * mare));

    // Sunlight from today's phase: a crisp terminator, then a gentle
    // Lommel–Seeliger falloff so the limb stays bright and gibbous reads as gibbous.
    float ph = u_phase.x * TAU;
    vec3 L = vec3(sin(ph), 0., -cos(ph));
    float mu0 = dot(n, L);
    float ls = 2. * max(mu0, 0.) / (max(mu0, 0.) + max(n.z, .05));
    float lit = smoothstep(-.03, .12, mu0) * (.72 + .28 * clamp(ls, 0., 1.2));

    // Earthshine keeps the unlit side faintly visible.
    moon = max(alb * lit, .06 * alb);
  }

  // Halo of sparse dots around the rim, plus a soft light wash (dark theme only).
  float illum = u_phase.y;
  float halo = u_dark * (1. - onDisc) * (.12 + .45 * illum) * exp(-(rr - 1.) * 4.5);
  float glow = u_dark * (.03 + .08 * illum) * exp(-max(rr - .7, 0.) * 1.4) * bottom;

  // Each layer is dithered on its own and drawn at its own strength, so the
  // moon reads as solid ink and the sky as faint gray dots.
  float th = bayer4(gl_FragCoord.xy) + .02;
  float a = step(th, far * .5) * .2;
  a = max(a, step(th, halo) * .45);
  a = max(a, star * .7);
  // On the disc: the moon (night), dimmed where a near cloud passes in front.
  if (u_dark > .5) {
    float onMoon = max(step(th, moon * (1. - .6 * near)), step(th, near * .45) * .35);
    a = mix(a, onMoon, onDisc);
  } else {
    // Sun (day): an ink outline, a faint dotted fill and twelve thin rays
    // (kept ~2 cells wide at any size) turning slowly; near clouds pass in front.
    float sr = u_moon.z;
    float ring = 1. - smoothstep(.5, 1.1, abs(rr - 1.) * sr);
    float seg = fract(atan(q.y, q.x) / TAU * 12. + t * .02);
    float ray = step(min(seg, 1. - seg) * TAU * rr * sr / 12., 1.2)
      * step(1.35, rr) * step(rr, 1.8);
    float sun = max(max(ring, .9 * ray), .07 * onDisc);
    a = max(a * (1. - onDisc), step(th, sun * (1. - .6 * near)));
    a = max(a, step(th, near * .45) * .35 * onDisc);
  }
  a = max(a, step(th, near * .5) * .3 * (1. - onDisc));
  // Shooting stars, off the disc: bright at night, ink streaks by day.
  float met = 0.;
  for (int i = 0; i < 2; i++) met = max(met, meteor(p, t, float(i)));
  a = max(a, step(th, met * sky * (1. - onDisc)) * mix(.5, .85, u_dark));
  a = max(a, glow);
  gl_FragColor = vec4(vec3(u_ink) * a, a);
}
`;

/* ---------- renderer ---------- */

export type SceneFrame = {
  time: number;
  ink: number;
  dark: boolean;
  /** Moon center x, y and radius, in cells. */
  moon: [number, number, number];
  /** Moon center y and radius without parallax, in cells. */
  anchor: [number, number];
  phase: number;
  illumination: number;
  far: [number, number];
  near: [number, number];
  stars: [number, number];
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[hero scene]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Sets up WebGL on `canvas`. Returns null when WebGL or the shader is unavailable. */
export function createMoonScene(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("[hero scene]", gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);

  // One triangle that covers the whole canvas.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const loc = (name: string) => gl.getUniformLocation(program, name);
  const u = {
    res: loc("u_res"),
    time: loc("u_time"),
    ink: loc("u_ink"),
    dark: loc("u_dark"),
    moon: loc("u_moon"),
    anchor: loc("u_anchor"),
    phase: loc("u_phase"),
    lib: loc("u_lib"),
    far: loc("u_far"),
    near: loc("u_near"),
    stars: loc("u_stars"),
  };
  gl.uniform4fv(loc("u_maria"), toVec4s(MARIA));
  gl.uniform4fv(loc("u_spots"), toVec4s(SPOTS));

  return {
    /** Match the drawing buffer to the canvas's cell grid. */
    resize(cols: number, rows: number) {
      canvas.width = cols;
      canvas.height = rows;
      gl.viewport(0, 0, cols, rows);
    },

    draw(f: SceneFrame) {
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.time, f.time);
      gl.uniform1f(u.ink, f.ink);
      gl.uniform1f(u.dark, f.dark ? 1 : 0);
      gl.uniform3f(u.moon, ...f.moon);
      gl.uniform2f(u.anchor, ...f.anchor);
      gl.uniform2f(u.phase, f.phase, f.illumination);
      // A real moon wobbles ~7° over a month; this sways over about a minute.
      gl.uniform2f(
        u.lib,
        0.14 * Math.sin(f.time * 0.11),
        0.1 * Math.sin(f.time * 0.083 + 1.3),
      );
      gl.uniform2f(u.far, ...f.far);
      gl.uniform2f(u.near, ...f.near);
      gl.uniform2f(u.stars, ...f.stars);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    /** Frees GPU objects. The context itself is kept so a remount can reuse it. */
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}
