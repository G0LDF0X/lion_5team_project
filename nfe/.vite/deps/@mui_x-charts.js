import {
  NoSsr,
  Popper,
  Typography_default
} from "./chunk-HYIKZEWG.js";
import {
  useSlotProps
} from "./chunk-7TUWJNLA.js";
import "./chunk-SPZ6GBH3.js";
import {
  useTheme
} from "./chunk-PWAT4VWD.js";
import {
  shouldForwardProp
} from "./chunk-6UFXRDMC.js";
import "./chunk-H6ZDTJFW.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_composeClasses,
  init_extends,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  init_ownerWindow,
  init_useEnhancedEffect,
  init_useForkRef,
  init_useId,
  init_utils,
  ownerWindow,
  styled_default,
  useEnhancedEffect_default,
  useForkRef,
  useId,
  useThemeProps2 as useThemeProps
} from "./chunk-5T5L66UB.js";
import "./chunk-HGULYAII.js";
import {
  require_react_dom
} from "./chunk-L5IZIIHU.js";
import {
  require_jsx_runtime
} from "./chunk-P5MFGWBF.js";
import {
  require_prop_types
} from "./chunk-JNTERZHJ.js";
import {
  require_react
} from "./chunk-6P5PNMGD.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/@mui/x-charts/esm/constants.js
var DEFAULT_X_AXIS_KEY = "DEFAULT_X_AXIS_KEY";
var DEFAULT_Y_AXIS_KEY = "DEFAULT_Y_AXIS_KEY";
var DEFAULT_MARGINS = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50
};

// node_modules/@mui/x-charts/esm/context/ZAxisContextProvider.js
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/d3-array/src/ascending.js
function ascending(a2, b) {
  return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-array/src/descending.js
function descending(a2, b) {
  return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x2) => ascending(f(d), x2);
    delta = (d, x2) => f(d) - x2;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }
  function left(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) < 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) <= 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x2, lo = 0, hi = a2.length) {
    const i = left(a2, x2, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero() {
  return 0;
}

// node_modules/d3-array/src/number.js
function number(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector(number).center;
var bisect_default = bisectRight;

// node_modules/d3-array/src/blur.js
var blur2 = Blur2(blurf);
var blurImage = Blur2(blurfImage);
function Blur2(blur3) {
  return function(data, rx, ry = rx) {
    if (!((rx = +rx) >= 0))
      throw new RangeError("invalid rx");
    if (!((ry = +ry) >= 0))
      throw new RangeError("invalid ry");
    let { data: values, width, height } = data;
    if (!((width = Math.floor(width)) >= 0))
      throw new RangeError("invalid width");
    if (!((height = Math.floor(height !== void 0 ? height : values.length / width)) >= 0))
      throw new RangeError("invalid height");
    if (!width || !height || !rx && !ry)
      return data;
    const blurx = rx && blur3(rx);
    const blury = ry && blur3(ry);
    const temp = values.slice();
    if (blurx && blury) {
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    } else if (blurx) {
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
    } else if (blury) {
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    }
    return data;
  };
}
function blurh(blur3, T, S, w, h) {
  for (let y2 = 0, n = w * h; y2 < n; ) {
    blur3(T, S, y2, y2 += w, 1);
  }
}
function blurv(blur3, T, S, w, h) {
  for (let x2 = 0, n = w * h; x2 < w; ++x2) {
    blur3(T, S, x2, x2 + n, w);
  }
}
function blurfImage(radius) {
  const blur3 = blurf(radius);
  return (T, S, start2, stop2, step) => {
    start2 <<= 2, stop2 <<= 2, step <<= 2;
    blur3(T, S, start2 + 0, stop2 + 0, step);
    blur3(T, S, start2 + 1, stop2 + 1, step);
    blur3(T, S, start2 + 2, stop2 + 2, step);
    blur3(T, S, start2 + 3, stop2 + 3, step);
  };
}
function blurf(radius) {
  const radius0 = Math.floor(radius);
  if (radius0 === radius)
    return bluri(radius);
  const t = radius - radius0;
  const w = 2 * radius + 1;
  return (T, S, start2, stop2, step) => {
    if (!((stop2 -= step) >= start2))
      return;
    let sum4 = radius0 * S[start2];
    const s0 = step * radius0;
    const s1 = s0 + step;
    for (let i = start2, j = start2 + s0; i < j; i += step) {
      sum4 += S[Math.min(stop2, i)];
    }
    for (let i = start2, j = stop2; i <= j; i += step) {
      sum4 += S[Math.min(stop2, i + s0)];
      T[i] = (sum4 + t * (S[Math.max(start2, i - s1)] + S[Math.min(stop2, i + s1)])) / w;
      sum4 -= S[Math.max(start2, i - s0)];
    }
  };
}
function bluri(radius) {
  const w = 2 * radius + 1;
  return (T, S, start2, stop2, step) => {
    if (!((stop2 -= step) >= start2))
      return;
    let sum4 = radius * S[start2];
    const s2 = step * radius;
    for (let i = start2, j = start2 + s2; i < j; i += step) {
      sum4 += S[Math.min(stop2, i)];
    }
    for (let i = start2, j = stop2; i <= j; i += step) {
      sum4 += S[Math.min(stop2, i + s2)];
      T[i] = sum4 / w;
      sum4 -= S[Math.max(start2, i - s2)];
    }
  };
}

// node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null)
      for (const [key2, value] of entries)
        this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
};
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key))
    return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

// node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function tickSpec(start2, stop2, count2) {
  const step = (stop2 - start2) / Math.max(0, count2), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start2 * inc);
    i2 = Math.round(stop2 * inc);
    if (i1 / inc < start2)
      ++i1;
    if (i2 / inc > stop2)
      --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start2 / inc);
    i2 = Math.round(stop2 / inc);
    if (i1 * inc < start2)
      ++i1;
    if (i2 * inc > stop2)
      --i2;
  }
  if (i2 < i1 && 0.5 <= count2 && count2 < 2)
    return tickSpec(start2, stop2, count2 * 2);
  return [i1, i2, inc];
}
function ticks(start2, stop2, count2) {
  stop2 = +stop2, start2 = +start2, count2 = +count2;
  if (!(count2 > 0))
    return [];
  if (start2 === stop2)
    return [start2];
  const reverse2 = stop2 < start2, [i1, i2, inc] = reverse2 ? tickSpec(stop2, start2, count2) : tickSpec(start2, stop2, count2);
  if (!(i2 >= i1))
    return [];
  const n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse2) {
    if (inc < 0)
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i2 - i) / -inc;
    else
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0)
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i1 + i) / -inc;
    else
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement(start2, stop2, count2) {
  stop2 = +stop2, start2 = +start2, count2 = +count2;
  return tickSpec(start2, stop2, count2)[2];
}
function tickStep(start2, stop2, count2) {
  stop2 = +stop2, start2 = +start2, count2 = +count2;
  const reverse2 = stop2 < start2, inc = reverse2 ? tickIncrement(stop2, start2, count2) : tickIncrement(start2, stop2, count2);
  return (reverse2 ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// node_modules/d3-array/src/range.js
function range(start2, stop2, step) {
  start2 = +start2, stop2 = +stop2, step = (n = arguments.length) < 2 ? (stop2 = start2, start2 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop2 - start2) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start2 + i * step;
  }
  return range2;
}

// node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array2, i0 = 0, i1 = array2.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0, t = array2[m + i0];
      array2[m + i0] = array2[i + i0];
      array2[i + i0] = t;
    }
    return array2;
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}
function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      if (typeof domain === "function")
        this.interpolator(domain);
      else
        this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function")
        this.interpolator(interpolator);
      else
        this.range(interpolator);
      break;
    }
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index2 = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale2(d) {
    let i = index2.get(d);
    if (i === void 0) {
      if (unknown !== implicit)
        return unknown;
      index2.set(d, i = domain.push(d) - 1);
    }
    return range2[i % range2.length];
  }
  scale2.domain = function(_) {
    if (!arguments.length)
      return domain.slice();
    domain = [], index2 = new InternMap();
    for (const value of _) {
      if (index2.has(value))
        continue;
      index2.set(value, domain.push(value) - 1);
    }
    return scale2;
  };
  scale2.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), scale2) : range2.slice();
  };
  scale2.unknown = function(_) {
    return arguments.length ? (unknown = _, scale2) : unknown;
  };
  scale2.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale2, arguments);
  return scale2;
}

// node_modules/d3-scale/src/band.js
function band() {
  var scale2 = ordinal().unknown(void 0), domain = scale2.domain, ordinalRange = scale2.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale2.unknown;
  function rescale() {
    var n = domain().length, reverse2 = r1 < r0, start2 = reverse2 ? r1 : r0, stop2 = reverse2 ? r0 : r1;
    step = (stop2 - start2) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round)
      step = Math.floor(step);
    start2 += (stop2 - start2 - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round)
      start2 = Math.round(start2), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) {
      return start2 + step * i;
    });
    return ordinalRange(reverse2 ? values.reverse() : values);
  }
  scale2.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale2.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale2.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };
  scale2.bandwidth = function() {
    return bandwidth;
  };
  scale2.step = function() {
    return step;
  };
  scale2.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };
  scale2.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };
  scale2.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };
  scale2.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };
  scale2.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale2.copy = function() {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}
function pointish(scale2) {
  var copy3 = scale2.copy;
  scale2.padding = scale2.paddingOuter;
  delete scale2.paddingInner;
  delete scale2.paddingOuter;
  scale2.copy = function() {
    return pointish(copy3());
  };
  return scale2;
}
function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a2) {
  if (a2 <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s2, l, a2) {
  if (a2 <= 0)
    h = s2 = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s2 = NaN;
  else if (s2 <= 0)
    h = NaN;
  return new Hsl(h, s2, l, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min3 = Math.min(r, g, b), max3 = Math.max(r, g, b), h = NaN, s2 = max3 - min3, l = (max3 + min3) / 2;
  if (s2) {
    if (r === max3)
      h = (g - b) / s2 + (g < b) * 6;
    else if (g === max3)
      h = (b - r) / s2 + 2;
    else
      h = (r - g) / s2 + 4;
    s2 /= l < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h *= 60;
  } else {
    s2 = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s2, l, o.opacity);
}
function hsl(h, s2, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s2, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s2, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab)
    return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl)
    return hcl2lab(o);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y2 = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x2, z;
  if (r === g && g === b)
    x2 = z = y2;
  else {
    x2 = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y2 - 16, 500 * (x2 - y2), 200 * (y2 - z), o.opacity);
}
function lab(l, a2, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a2, b, opacity == null ? 1 : opacity);
}
function Lab(l, a2, b, opacity) {
  this.l = +l;
  this.a = +a2;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter(k2) {
    return new Lab(this.l + K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  darker(k2) {
    return new Lab(this.l - K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  rgb() {
    var y2 = (this.l + 16) / 116, x2 = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x2 = Xn * lab2xyz(x2);
    y2 = Yn * lab2xyz(y2);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb(3.1338561 * x2 - 1.6168667 * y2 - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x2 + 1.9161415 * y2 + 0.033454 * z),
      lrgb2rgb(0.0719453 * x2 - 0.2289914 * y2 + 1.4052427 * z),
      this.opacity
    );
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x2) {
  return 255 * (x2 <= 31308e-7 ? 12.92 * x2 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x2) {
  return (x2 /= 255) <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl)
    return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab))
    o = labConvert(o);
  if (o.a === 0 && o.b === 0)
    return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c6, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c6, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c6, l, opacity) {
  this.h = +h;
  this.c = +c6;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h))
    return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k2) {
    return new Hcl(this.h, this.c, this.l + K * (k2 == null ? 1 : k2), this.opacity);
  },
  darker(k2) {
    return new Hcl(this.h, this.c, this.l - K * (k2 == null ? 1 : k2), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix)
    return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k2 = (E * (g - l) - C * bl) / D, s2 = Math.sqrt(k2 * k2 + bl * bl) / (E * l * (1 - l)), h = s2 ? Math.atan2(k2, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s2, l, o.opacity);
}
function cubehelix(h, s2, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s2, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh2 = Math.cos(h), sinh2 = Math.sin(h);
    return new Rgb(
      255 * (l + a2 * (A * cosh2 + B * sinh2)),
      255 * (l + a2 * (C * cosh2 + D * sinh2)),
      255 * (l + a2 * (E * cosh2)),
      this.opacity
    );
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t13, v0, v1, v2, v3) {
  var t22 = t13 * t13, t32 = t22 * t13;
  return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x2) => () => x2;

// node_modules/d3-interpolate/src/color.js
function linear(a2, d) {
  return function(t) {
    return a2 + t * d;
  };
}
function exponential(a2, b, y2) {
  return a2 = Math.pow(a2, y2), b = Math.pow(b, y2) - a2, y2 = 1 / y2, function(t) {
    return Math.pow(a2 + t * b, y2);
  };
}
function hue(a2, b) {
  var d = b - a2;
  return d ? linear(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default(isNaN(a2) ? b : a2);
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y2) : constant_default(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d = b - a2;
  return d ? linear(a2, d) : constant_default(isNaN(a2) ? b : a2);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb3(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb3.gamma = rgbGamma;
  return rgb3;
}(1);
function rgbSpline(spline) {
  return function(colors3) {
    var n = colors3.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors3[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a2, b) {
  if (!b)
    b = [];
  var n = a2 ? Math.min(b.length, a2.length) : 0, c6 = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i)
      c6[i] = a2[i] * (1 - t) + b[i] * t;
    return c6;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a2, b) {
  var nb = b ? b.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x2 = new Array(na), c6 = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x2[i] = value_default(a2[i], b[i]);
  for (; i < nb; ++i)
    c6[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i)
      c6[i] = x2[i](t);
    return c6;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a2, b) {
  var d = /* @__PURE__ */ new Date();
  return a2 = +a2, b = +b, function(t) {
    return d.setTime(a2 * (1 - t) + b * t), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return a2 * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a2, b) {
  var i = {}, c6 = {}, k2;
  if (a2 === null || typeof a2 !== "object")
    a2 = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k2 in b) {
    if (k2 in a2) {
      i[k2] = value_default(a2[k2], b[k2]);
    } else {
      c6[k2] = b[k2];
    }
  }
  return function(t) {
    for (k2 in i)
      c6[k2] = i[k2](t);
    return c6;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero2(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a2, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s2[i])
        s2[i] += bs;
      else
        s2[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i])
        s2[i] += bm;
      else
        s2[++i] = bm;
    } else {
      s2[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s2[i])
      s2[i] += bs;
    else
      s2[++i] = bs;
  }
  return s2.length < 2 ? q[0] ? one(q[0].x) : zero2(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s2[(o = q[i2]).i] = o.x(t);
    return s2.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a2, b) {
  var t = typeof b, c6;
  return b == null || t === "boolean" ? constant_default(b) : (t === "number" ? number_default : t === "string" ? (c6 = color(b)) ? (b = c6, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a2, b);
}

// node_modules/d3-interpolate/src/round.js
function round_default(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return Math.round(a2 * (1 - t) + b * t);
  };
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a2, b, c6, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b * b))
    a2 /= scaleX, b /= scaleX;
  if (skewX = a2 * c6 + b * d)
    c6 -= a2 * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c6 * c6 + d * d))
    c6 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a2 * d < b * c6)
    a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a2) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity2 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity2;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity2;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s2) {
    return s2.length ? s2.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s2.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a2, b, s2, q) {
    if (a2 !== b) {
      if (a2 - b > 180)
        b += 360;
      else if (b - a2 > 180)
        a2 += 360;
      q.push({ i: s2.push(pop(s2) + "rotate(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s2.push(pop(s2) + "rotate(" + b + degParen);
    }
  }
  function skewX(a2, b, s2, q) {
    if (a2 !== b) {
      q.push({ i: s2.push(pop(s2) + "skewX(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s2.push(pop(s2) + "skewX(" + b + degParen);
    }
  }
  function scale2(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push(pop(s2) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s2.push(pop(s2) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b) {
    var s2 = [], q = [];
    a2 = parse(a2), b = parse(b);
    translate(a2.translateX, a2.translateY, b.translateX, b.translateY, s2, q);
    rotate(a2.rotate, b.rotate, s2, q);
    skewX(a2.skewX, b.skewX, s2, q);
    scale2(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s2, q);
    a2 = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n)
        s2[(o = q[i]).i] = o.x(t);
      return s2.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x2) {
  return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
}
function sinh(x2) {
  return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
}
function tanh(x2) {
  return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s2 = t * S, coshr0 = cosh(r0), u4 = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s2 + r0) - sinh(r0));
        return [
          ux0 + u4 * dx,
          uy0 + u4 * dy,
          w0 * coshr0 / cosh(rho * s2 + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hsl(start2)).h, (end = hsl(end)).h), s2 = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.h = h(t);
      start2.s = s2(t);
      start2.l = l(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start2, end) {
    var h = hue2((start2 = hcl(start2)).h, (end = hcl(end)).h), c6 = nogamma(start2.c, end.c), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.h = h(t);
      start2.c = c6(t);
      start2.l = l(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix3(start2, end) {
      var h = hue2((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s2 = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.h = h(t);
        start2.s = s2(t);
        start2.l = l(Math.pow(t, y2));
        start2.opacity = opacity(t);
        return start2 + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-scale/src/constant.js
function constants(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-scale/src/number.js
function number2(x2) {
  return +x2;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity3(x2) {
  return x2;
}
function normalize(a2, b) {
  return (b -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a2, b) {
  var t;
  if (a2 > b)
    t = a2, a2 = b, b = t;
  return function(x2) {
    return Math.max(a2, Math.min(b, x2));
  };
}
function bimap(domain, range2, interpolate2) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0)
    d0 = normalize(d1, d0), r0 = interpolate2(r1, r0);
  else
    d0 = normalize(d0, d1), r0 = interpolate2(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate2) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate2(range2[i], range2[i + 1]);
  }
  return function(x2) {
    var i2 = bisect_default(domain, x2, 1, j) - 1;
    return r[i2](d[i2](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range2 = unit, interpolate2 = value_default, transform, untransform, unknown, clamp2 = identity3, piecewise2, output, input;
  function rescale() {
    var n = Math.min(domain.length, range2.length);
    if (clamp2 !== identity3)
      clamp2 = clamper(domain[0], domain[n - 1]);
    piecewise2 = n > 2 ? polymap : bimap;
    output = input = null;
    return scale2;
  }
  function scale2(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise2(domain.map(transform), range2, interpolate2)))(transform(clamp2(x2)));
  }
  scale2.invert = function(y2) {
    return clamp2(untransform((input || (input = piecewise2(range2, domain.map(transform), number_default)))(y2)));
  };
  scale2.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number2), rescale()) : domain.slice();
  };
  scale2.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale2.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate2 = round_default, rescale();
  };
  scale2.clamp = function(_) {
    return arguments.length ? (clamp2 = _ ? true : identity3, rescale()) : clamp2 !== identity3;
  };
  scale2.interpolate = function(_) {
    return arguments.length ? (interpolate2 = _, rescale()) : interpolate2;
  };
  scale2.unknown = function(_) {
    return arguments.length ? (unknown = _, scale2) : unknown;
  };
  return function(t, u4) {
    transform = t, untransform = u4;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity3, identity3);
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p) {
  if ((i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e")) < 0)
    return null;
  var i, coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width)
        g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width)
        break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s2) {
  out:
    for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s2[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0)
            i0 = i;
          i1 = i;
          break;
        default:
          if (!+s2[i])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x2, p) => (x2 * 100).toFixed(p),
  "b": (x2) => Math.round(x2).toString(2),
  "c": (x2) => x2 + "",
  "d": formatDecimal_default,
  "e": (x2, p) => x2.toExponential(p),
  "f": (x2, p) => x2.toFixed(p),
  "g": (x2, p) => x2.toPrecision(p),
  "o": (x2) => Math.round(x2).toString(8),
  "p": (x2, p) => formatRounded_default(x2 * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
  "x": (x2) => Math.round(x2).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x2) {
  return x2;
}

// node_modules/d3-format/src/locale.js
var map3 = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group2 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map3.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map3.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "−" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n")
      comma = true, type = "g";
    else if (!formatTypes_default[type])
      precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero3 || fill === "0" && align === "=")
      zero3 = true, fill = "0", align = "=";
    var prefix2 = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix2, valueSuffix = suffix, i, n, c6;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign2 !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c6 = value.charCodeAt(i), 48 > c6 || c6 > 57) {
              valueSuffix = (c6 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero3)
        value = group2(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3)
        value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k2 = Math.pow(10, -e), prefix2 = prefixes[8 + e / 3];
    return function(value2) {
      return f(k2 * value2) + prefix2;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max3) {
  step = Math.abs(step), max3 = Math.abs(max3) - step;
  return Math.max(0, exponent_default(max3) - exponent_default(step)) + 1;
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start2, stop2, count2, specifier) {
  var step = tickStep(start2, stop2, count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop2));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start2), Math.abs(stop2)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale2) {
  var domain = scale2.domain;
  scale2.ticks = function(count2) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count2 == null ? 10 : count2);
  };
  scale2.tickFormat = function(count2, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count2 == null ? 10 : count2, specifier);
  };
  scale2.nice = function(count2) {
    if (count2 == null)
      count2 = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start2 = d[i0];
    var stop2 = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop2 < start2) {
      step = start2, start2 = stop2, stop2 = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop2, count2);
      if (step === prestep) {
        d[i0] = start2;
        d[i1] = stop2;
        return domain(d);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop2 = Math.ceil(stop2 / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop2 = Math.floor(stop2 * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale2;
  };
  return scale2;
}
function linear2() {
  var scale2 = continuous();
  scale2.copy = function() {
    return copy(scale2, linear2());
  };
  initRange.apply(scale2, arguments);
  return linearish(scale2);
}

// node_modules/d3-scale/src/nice.js
function nice2(domain, interval) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }
  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

// node_modules/d3-scale/src/log.js
function transformLog(x2) {
  return Math.log(x2);
}
function transformExp(x2) {
  return Math.exp(x2);
}
function transformLogn(x2) {
  return -Math.log(-x2);
}
function transformExpn(x2) {
  return -Math.exp(-x2);
}
function pow10(x2) {
  return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : (x2) => Math.pow(base, x2);
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x2) => Math.log(x2) / base);
}
function reflect(f) {
  return (x2, k2) => -f(-x2, k2);
}
function loggish(transform) {
  const scale2 = transform(transformLog, transformExp);
  const domain = scale2.domain;
  let base = 10;
  let logs;
  let pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale2;
  }
  scale2.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };
  scale2.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale2.ticks = (count2) => {
    const d = domain();
    let u4 = d[0];
    let v2 = d[d.length - 1];
    const r = v2 < u4;
    if (r)
      [u4, v2] = [v2, u4];
    let i = logs(u4);
    let j = logs(v2);
    let k2;
    let t;
    const n = count2 == null ? 10 : +count2;
    let z = [];
    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u4 > 0)
        for (; i <= j; ++i) {
          for (k2 = 1; k2 < base; ++k2) {
            t = i < 0 ? k2 / pows(-i) : k2 * pows(i);
            if (t < u4)
              continue;
            if (t > v2)
              break;
            z.push(t);
          }
        }
      else
        for (; i <= j; ++i) {
          for (k2 = base - 1; k2 >= 1; --k2) {
            t = i > 0 ? k2 / pows(-i) : k2 * pows(i);
            if (t < u4)
              continue;
            if (t > v2)
              break;
            z.push(t);
          }
        }
      if (z.length * 2 < n)
        z = ticks(u4, v2, n);
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };
  scale2.tickFormat = (count2, specifier) => {
    if (count2 == null)
      count2 = 10;
    if (specifier == null)
      specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null)
        specifier.trim = true;
      specifier = format(specifier);
    }
    if (count2 === Infinity)
      return specifier;
    const k2 = Math.max(1, base * count2 / scale2.ticks().length);
    return (d) => {
      let i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5)
        i *= base;
      return i <= k2 ? specifier(d) : "";
    };
  };
  scale2.nice = () => {
    return domain(nice2(domain(), {
      floor: (x2) => pows(Math.floor(logs(x2))),
      ceil: (x2) => pows(Math.ceil(logs(x2)))
    }));
  };
  return scale2;
}
function log() {
  const scale2 = loggish(transformer()).domain([1, 10]);
  scale2.copy = () => copy(scale2, log()).base(scale2.base());
  initRange.apply(scale2, arguments);
  return scale2;
}

// node_modules/d3-scale/src/pow.js
function transformPow(exponent) {
  return function(x2) {
    return x2 < 0 ? -Math.pow(-x2, exponent) : Math.pow(x2, exponent);
  };
}
function transformSqrt(x2) {
  return x2 < 0 ? -Math.sqrt(-x2) : Math.sqrt(x2);
}
function transformSquare(x2) {
  return x2 < 0 ? -x2 * x2 : x2 * x2;
}
function powish(transform) {
  var scale2 = transform(identity3, identity3), exponent = 1;
  function rescale() {
    return exponent === 1 ? transform(identity3, identity3) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
  }
  scale2.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };
  return linearish(scale2);
}
function pow() {
  var scale2 = powish(transformer());
  scale2.copy = function() {
    return copy(scale2, pow()).exponent(scale2.exponent());
  };
  initRange.apply(scale2, arguments);
  return scale2;
}
function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}

// node_modules/d3-scale/src/threshold.js
function threshold() {
  var domain = [0.5], range2 = [0, 1], unknown, n = 1;
  function scale2(x2) {
    return x2 != null && x2 <= x2 ? range2[bisect_default(domain, x2, 0, n)] : unknown;
  }
  scale2.domain = function(_) {
    return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale2) : domain.slice();
  };
  scale2.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale2) : range2.slice();
  };
  scale2.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return [domain[i - 1], domain[i]];
  };
  scale2.unknown = function(_) {
    return arguments.length ? (unknown = _, scale2) : unknown;
  };
  scale2.copy = function() {
    return threshold().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale2, arguments);
}

// node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count2, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = (date2) => {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = (date2) => {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = (date2) => {
    const d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = (date2, step) => {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = (start2, stop2, step) => {
    const range2 = [];
    start2 = interval.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop2) || !(step > 0))
      return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop2);
    return range2;
  };
  interval.filter = (test) => {
    return timeInterval((date2) => {
      if (date2 >= date2)
        while (floori(date2), !test(date2))
          date2.setTime(date2 - 1);
    }, (date2, step) => {
      if (date2 >= date2) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date2, -1), !test(date2)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date2, 1), !test(date2)) {
            }
          }
      }
    });
  };
  if (count2) {
    interval.count = (start2, end) => {
      t02.setTime(+start2), t12.setTime(+end);
      floori(t02), floori(t12);
      return Math.floor(count2(t02, t12));
    };
    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? (d) => field(d) % step === 0 : (d) => interval.count(0, d) % step === 0);
    };
  }
  return interval;
}

// node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {
}, (date2, step) => {
  date2.setTime(+date2 + step);
}, (start2, end) => {
  return end - start2;
});
millisecond.every = (k2) => {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0))
    return null;
  if (!(k2 > 1))
    return millisecond;
  return timeInterval((date2) => {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, (date2, step) => {
    date2.setTime(+date2 + step * k2);
  }, (start2, end) => {
    return (end - start2) / k2;
  });
};
var milliseconds = millisecond.range;

// node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/d3-time/src/second.js
var second = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds());
}, (date2, step) => {
  date2.setTime(+date2 + step * durationSecond);
}, (start2, end) => {
  return (end - start2) / durationSecond;
}, (date2) => {
  return date2.getUTCSeconds();
});
var seconds = second.range;

// node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start2, end) => {
  return (end - start2) / durationMinute;
}, (date2) => {
  return date2.getMinutes();
});
var timeMinutes = timeMinute.range;
var utcMinute = timeInterval((date2) => {
  date2.setUTCSeconds(0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start2, end) => {
  return (end - start2) / durationMinute;
}, (date2) => {
  return date2.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

// node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start2, end) => {
  return (end - start2) / durationHour;
}, (date2) => {
  return date2.getHours();
});
var timeHours = timeHour.range;
var utcHour = timeInterval((date2) => {
  date2.setUTCMinutes(0, 0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start2, end) => {
  return (end - start2) / durationHour;
}, (date2) => {
  return date2.getUTCHours();
});
var utcHours = utcHour.range;

// node_modules/d3-time/src/day.js
var timeDay = timeInterval(
  (date2) => date2.setHours(0, 0, 0, 0),
  (date2, step) => date2.setDate(date2.getDate() + step),
  (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay,
  (date2) => date2.getDate() - 1
);
var timeDays = timeDay.range;
var utcDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay;
}, (date2) => {
  return date2.getUTCDate() - 1;
});
var utcDays = utcDay.range;
var unixDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start2, end) => {
  return (end - start2) / durationDay;
}, (date2) => {
  return Math.floor(date2 / durationDay);
});
var unixDays = unixDay.range;

// node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date2) => {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i) % 7);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setDate(date2.getDate() + step * 7);
  }, (start2, end) => {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var timeSunday = timeWeekday(0);
var timeMonday = timeWeekday(1);
var timeTuesday = timeWeekday(2);
var timeWednesday = timeWeekday(3);
var timeThursday = timeWeekday(4);
var timeFriday = timeWeekday(5);
var timeSaturday = timeWeekday(6);
var timeSundays = timeSunday.range;
var timeMondays = timeMonday.range;
var timeTuesdays = timeTuesday.range;
var timeWednesdays = timeWednesday.range;
var timeThursdays = timeThursday.range;
var timeFridays = timeFriday.range;
var timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date2) => {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, (start2, end) => {
    return (end - start2) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date2) => {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setMonth(date2.getMonth() + step);
}, (start2, end) => {
  return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
}, (date2) => {
  return date2.getMonth();
});
var timeMonths = timeMonth.range;
var utcMonth = timeInterval((date2) => {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, (start2, end) => {
  return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
}, (date2) => {
  return date2.getUTCMonth();
});
var utcMonths = utcMonth.range;

// node_modules/d3-time/src/year.js
var timeYear = timeInterval((date2) => {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setFullYear(date2.getFullYear() + step);
}, (start2, end) => {
  return end.getFullYear() - start2.getFullYear();
}, (date2) => {
  return date2.getFullYear();
});
timeYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
var timeYears = timeYear.range;
var utcYear = timeInterval((date2) => {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, (start2, end) => {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, (date2) => {
  return date2.getUTCFullYear();
});
utcYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
var utcYears = utcYear.range;

// node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute, 1, durationMinute],
    [minute, 5, 5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [hour, 1, durationHour],
    [hour, 3, 3 * durationHour],
    [hour, 6, 6 * durationHour],
    [hour, 12, 12 * durationHour],
    [day, 1, durationDay],
    [day, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month, 1, durationMonth],
    [month, 3, 3 * durationMonth],
    [year, 1, durationYear]
  ];
  function ticks2(start2, stop2, count2) {
    const reverse2 = stop2 < start2;
    if (reverse2)
      [start2, stop2] = [stop2, start2];
    const interval = count2 && typeof count2.range === "function" ? count2 : tickInterval(start2, stop2, count2);
    const ticks3 = interval ? interval.range(start2, +stop2 + 1) : [];
    return reverse2 ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start2, stop2, count2) {
    const target = Math.abs(stop2 - start2) / count2;
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length)
      return year.every(tickStep(start2 / durationYear, stop2 / durationYear, count2));
    if (i === 0)
      return millisecond.every(Math.max(tickStep(start2, stop2, count2), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }
  return [ticks2, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
var [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date2.setFullYear(d.y);
    return date2;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date2.setUTCFullYear(d.y);
    return date2;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y2, m, d) {
  return { y: y2, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date2) {
      var string = [], i = -1, j = 0, n = specifier.length, c6, pad2, format2;
      if (!(date2 instanceof Date))
        date2 = /* @__PURE__ */ new Date(+date2);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad2 = pads[c6 = specifier.charAt(++i)]) != null)
            c6 = specifier.charAt(++i);
          else
            pad2 = c6 === "e" ? " " : "0";
          if (format2 = formats2[c6])
            c6 = format2(date2, pad2);
          string.push(c6);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("s" in d)
        return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d))
        d.Z = 0;
      if ("p" in d)
        d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0)
        d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        if (!("w" in d))
          d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d))
          d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m = string.length, c6, parse;
    while (i < n) {
      if (j >= m)
        return -1;
      c6 = specifier.charCodeAt(i++);
      if (c6 === 37) {
        c6 = specifier.charAt(i++);
        parse = parses[c6 in pads ? specifier.charAt(i++) : c6];
        if (!parse || (j = parse(d, string, j)) < 0)
          return -1;
      } else if (c6 != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string = (sign2 ? -value : value) + "", length = string.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date2) {
  return date2.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date2 = new Date(string);
  return isNaN(date2) ? null : date2;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/d3-scale/src/time.js
function date(t) {
  return new Date(t);
}
function number3(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2) {
  var scale2 = continuous(), invert = scale2.invert, domain = scale2.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear2 = format2("%Y");
  function tickFormat2(date2) {
    return (second2(date2) < date2 ? formatMillisecond : minute(date2) < date2 ? formatSecond : hour(date2) < date2 ? formatMinute : day(date2) < date2 ? formatHour : month(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year(date2) < date2 ? formatMonth : formatYear2)(date2);
  }
  scale2.invert = function(y2) {
    return new Date(invert(y2));
  };
  scale2.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number3)) : domain().map(date);
  };
  scale2.ticks = function(interval) {
    var d = domain();
    return ticks2(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };
  scale2.tickFormat = function(count2, specifier) {
    return specifier == null ? tickFormat2 : format2(specifier);
  };
  scale2.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function")
      interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice2(d, interval)) : scale2;
  };
  scale2.copy = function() {
    return copy(scale2, calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2));
  };
  return scale2;
}
function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale/src/utcTime.js
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale/src/sequential.js
function transformer2() {
  var x0 = 0, x1 = 1, t03, t13, k10, transform, interpolator = identity3, clamp2 = false, unknown;
  function scale2(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : interpolator(k10 === 0 ? 0.5 : (x2 = (transform(x2) - t03) * k10, clamp2 ? Math.max(0, Math.min(1, x2)) : x2));
  }
  scale2.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t03 = transform(x0 = +x0), t13 = transform(x1 = +x1), k10 = t03 === t13 ? 0 : 1 / (t13 - t03), scale2) : [x0, x1];
  };
  scale2.clamp = function(_) {
    return arguments.length ? (clamp2 = !!_, scale2) : clamp2;
  };
  scale2.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale2) : interpolator;
  };
  function range2(interpolate2) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate2(r0, r1), scale2) : [interpolator(0), interpolator(1)];
    };
  }
  scale2.range = range2(value_default);
  scale2.rangeRound = range2(round_default);
  scale2.unknown = function(_) {
    return arguments.length ? (unknown = _, scale2) : unknown;
  };
  return function(t) {
    transform = t, t03 = t(x0), t13 = t(x1), k10 = t03 === t13 ? 0 : 1 / (t13 - t03);
    return scale2;
  };
}
function copy2(source, target) {
  return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
  var scale2 = linearish(transformer2()(identity3));
  scale2.copy = function() {
    return copy2(scale2, sequential());
  };
  return initInterpolator.apply(scale2, arguments);
}

// node_modules/@mui/x-charts/esm/internals/colorScale.js
function getSequentialColorScale(config2) {
  if (config2.type === "piecewise") {
    return threshold(config2.thresholds, config2.colors);
  }
  return sequential([config2.min ?? 0, config2.max ?? 100], config2.color);
}
function getOrdinalColorScale(config2) {
  if (config2.values) {
    return ordinal(config2.values, config2.colors).unknown(config2.unknownColor ?? null);
  }
  return ordinal(config2.colors.map((_, index2) => index2), config2.colors).unknown(config2.unknownColor ?? null);
}
function getColorScale(config2) {
  return config2.type === "ordinal" ? getOrdinalColorScale(config2) : getSequentialColorScale(config2);
}

// node_modules/@mui/x-charts/esm/context/ZAxisContextProvider.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ZAxisContext = React.createContext({
  zAxis: {},
  zAxisIds: []
});
if (true) {
  ZAxisContext.displayName = "ZAxisContext";
}
function ZAxisContextProvider(props) {
  const {
    zAxis: inZAxis,
    dataset,
    children
  } = props;
  const zAxis = React.useMemo(() => inZAxis == null ? void 0 : inZAxis.map((axisConfig) => {
    const dataKey = axisConfig.dataKey;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return axisConfig;
    }
    if (dataset === void 0) {
      throw Error("MUI X Charts: z-axis uses `dataKey` but no `dataset` is provided.");
    }
    return _extends({}, axisConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  }), [inZAxis, dataset]);
  const value = React.useMemo(() => {
    const allZAxis = (zAxis == null ? void 0 : zAxis.map((axis, index2) => _extends({
      id: `defaultized-z-axis-${index2}`
    }, axis))) ?? [];
    const completedZAxis = {};
    allZAxis.forEach((axis) => {
      completedZAxis[axis.id] = _extends({}, axis, {
        colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" && axis.data ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
    });
    return {
      zAxis: completedZAxis,
      zAxisIds: allZAxis.map(({
        id
      }) => id)
    };
  }, [zAxis]);
  return (0, import_jsx_runtime.jsx)(ZAxisContext.Provider, {
    value,
    children
  });
}
true ? ZAxisContextProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types.default.node,
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types.default.arrayOf(import_prop_types.default.object),
  /**
   * The configuration of the z-axes.
   */
  zAxis: import_prop_types.default.arrayOf(import_prop_types.default.shape({
    colorMap: import_prop_types.default.oneOfType([import_prop_types.default.shape({
      colors: import_prop_types.default.arrayOf(import_prop_types.default.string).isRequired,
      type: import_prop_types.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types.default.string,
      values: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number, import_prop_types.default.string]).isRequired)
    }), import_prop_types.default.shape({
      color: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.string.isRequired), import_prop_types.default.func]).isRequired,
      max: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
      min: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
      type: import_prop_types.default.oneOf(["continuous"]).isRequired
    }), import_prop_types.default.shape({
      colors: import_prop_types.default.arrayOf(import_prop_types.default.string).isRequired,
      thresholds: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]).isRequired).isRequired,
      type: import_prop_types.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types.default.array,
    dataKey: import_prop_types.default.string,
    id: import_prop_types.default.string
  }))
} : void 0;

// node_modules/@mui/x-charts/esm/hooks/useDrawingArea.js
var React4 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/context/DrawingProvider.js
init_extends();
var React3 = __toESM(require_react());
init_useId();

// node_modules/@mui/x-charts/esm/hooks/useChartDimensions.js
init_extends();
var React2 = __toESM(require_react());
var useChartDimensions = (width, height, margin) => {
  const defaultizedMargin = _extends({}, DEFAULT_MARGINS, margin);
  const drawingArea = React2.useMemo(() => ({
    left: defaultizedMargin.left,
    top: defaultizedMargin.top,
    right: defaultizedMargin.right,
    bottom: defaultizedMargin.bottom,
    width: Math.max(0, width - defaultizedMargin.left - defaultizedMargin.right),
    height: Math.max(0, height - defaultizedMargin.top - defaultizedMargin.bottom)
  }), [width, height, defaultizedMargin.top, defaultizedMargin.bottom, defaultizedMargin.left, defaultizedMargin.right]);
  return drawingArea;
};
var useChartDimensions_default = useChartDimensions;

// node_modules/@mui/x-charts/esm/context/DrawingProvider.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var DrawingContext = React3.createContext({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 300,
  width: 400,
  chartId: ""
});
if (true) {
  DrawingContext.displayName = "DrawingContext";
}
var SvgContext = React3.createContext({
  current: null
});
if (true) {
  SvgContext.displayName = "SvgContext";
}
function DrawingProvider(props) {
  const {
    width,
    height,
    margin,
    svgRef,
    children
  } = props;
  const drawingArea = useChartDimensions_default(width, height, margin);
  const chartId = useId();
  const value = React3.useMemo(() => _extends({
    chartId: chartId ?? ""
  }, drawingArea), [chartId, drawingArea]);
  return (0, import_jsx_runtime2.jsx)(SvgContext.Provider, {
    value: svgRef,
    children: (0, import_jsx_runtime2.jsx)(DrawingContext.Provider, {
      value,
      children
    })
  });
}

// node_modules/@mui/x-charts/esm/hooks/useDrawingArea.js
function useDrawingArea() {
  const {
    left,
    top,
    width,
    height,
    bottom,
    right
  } = React4.useContext(DrawingContext);
  return React4.useMemo(() => ({
    left,
    top,
    width,
    height,
    bottom,
    right
  }), [height, left, top, width, bottom, right]);
}

// node_modules/@mui/x-charts/esm/hooks/useChartId.js
var React5 = __toESM(require_react());
function useChartId() {
  const {
    chartId
  } = React5.useContext(DrawingContext);
  return React5.useMemo(() => chartId, [chartId]);
}

// node_modules/@mui/x-charts/esm/hooks/useScale.js
var React9 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/context/CartesianContextProvider.js
init_extends();
var React8 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/BarChart/extremums.js
var getBaseExtremum = (params) => {
  const {
    axis
  } = params;
  const minX = Math.min(...axis.data ?? []);
  const maxX = Math.max(...axis.data ?? []);
  return [minX, maxX];
};
var getValueExtremum = (params) => {
  const {
    series,
    axis,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter((seriesId) => series[seriesId].yAxisKey === axis.id || isDefaultAxis && series[seriesId].yAxisKey === void 0).reduce((acc, seriesId) => {
    var _a;
    const [seriesMin, seriesMax] = ((_a = series[seriesId].stackedData) == null ? void 0 : _a.reduce((seriesAcc, values) => [Math.min(...values, ...seriesAcc[0] === null ? [] : [seriesAcc[0]]), Math.max(...values, ...seriesAcc[1] === null ? [] : [seriesAcc[1]])], series[seriesId].stackedData[0])) ?? [null, null];
    return [acc[0] === null ? seriesMin : Math.min(seriesMin, acc[0]), acc[1] === null ? seriesMax : Math.max(seriesMax, acc[1])];
  }, [null, null]);
};
var getExtremumX = (params) => {
  const isHorizontal = Object.keys(params.series).some((seriesId) => params.series[seriesId].layout === "horizontal");
  if (isHorizontal) {
    return getValueExtremum(params);
  }
  return getBaseExtremum(params);
};
var getExtremumY = (params) => {
  const isHorizontal = Object.keys(params.series).some((seriesId) => params.series[seriesId].layout === "horizontal");
  if (isHorizontal) {
    return getBaseExtremum(params);
  }
  return getValueExtremum(params);
};

// node_modules/@mui/x-charts/esm/ScatterChart/extremums.js
var mergeMinMax = (acc, val) => {
  if (acc[0] === null || acc[1] === null) {
    return val;
  }
  if (val[0] === null || val[1] === null) {
    return acc;
  }
  return [Math.min(acc[0], val[0]), Math.max(acc[1], val[1])];
};
var getExtremumX2 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter((seriesId) => series[seriesId].xAxisKey === axis.id || series[seriesId].xAxisKey === void 0 && isDefaultAxis).reduce((acc, seriesId) => {
    const seriesMinMax = series[seriesId].data.reduce((accSeries, {
      x: x2
    }) => {
      const val = [x2, x2];
      return mergeMinMax(accSeries, val);
    }, [null, null]);
    return mergeMinMax(acc, seriesMinMax);
  }, [null, null]);
};
var getExtremumY2 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter((seriesId) => series[seriesId].yAxisKey === axis.id || series[seriesId].yAxisKey === void 0 && isDefaultAxis).reduce((acc, seriesId) => {
    const seriesMinMax = series[seriesId].data.reduce((accSeries, {
      y: y2
    }) => {
      const val = [y2, y2];
      return mergeMinMax(accSeries, val);
    }, [null, null]);
    return mergeMinMax(acc, seriesMinMax);
  }, [null, null]);
};

// node_modules/@mui/x-charts/esm/LineChart/extremums.js
var getExtremumX3 = (params) => {
  const {
    axis
  } = params;
  const minX = Math.min(...axis.data ?? []);
  const maxX = Math.max(...axis.data ?? []);
  return [minX, maxX];
};
function getSeriesExtremums(getValues, stackedData) {
  if (stackedData.length === 0) {
    return [null, null];
  }
  return stackedData.reduce((seriesAcc, stackedValue) => {
    const [base, value] = getValues(stackedValue);
    if (seriesAcc[0] === null) {
      return [Math.min(base, value), Math.max(base, value)];
    }
    return [Math.min(base, value, seriesAcc[0]), Math.max(base, value, seriesAcc[1])];
  }, getValues(stackedData[0]));
}
var getExtremumY3 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter((seriesId) => series[seriesId].yAxisKey === axis.id || isDefaultAxis && series[seriesId].yAxisKey === void 0).reduce((acc, seriesId) => {
    const {
      area,
      stackedData
    } = series[seriesId];
    const isArea = area !== void 0;
    const getValues = isArea ? (d) => d : (d) => [d[1], d[1]];
    const seriesExtremums = getSeriesExtremums(getValues, stackedData);
    if (acc[0] === null) {
      return seriesExtremums;
    }
    if (seriesExtremums[0] === null) {
      return acc;
    }
    const [seriesMin, seriesMax] = seriesExtremums;
    return [Math.min(seriesMin, acc[0]), Math.max(seriesMax, acc[1])];
  }, [null, null]);
};

// node_modules/@mui/x-charts/esm/models/axis.js
function isBandScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === "band";
}
function isPointScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === "point";
}

// node_modules/@mui/x-charts/esm/internals/getScale.js
function getScale(scaleType, domain, range2) {
  switch (scaleType) {
    case "log":
      return log(domain, range2);
    case "pow":
      return pow(domain, range2);
    case "sqrt":
      return sqrt(domain, range2);
    case "time":
      return time(domain, range2);
    case "utc":
      return utcTime(domain, range2);
    default:
      return linear2(domain, range2);
  }
}

// node_modules/@mui/x-charts/esm/context/SeriesContextProvider.js
init_extends();
var React6 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/BarChart/formatter.js
init_extends();

// node_modules/d3-shape/src/constant.js
function constant_default2(x2) {
  return function constant2() {
    return x2;
  };
}

// node_modules/d3-shape/src/math.js
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max2 = Math.max;
var min2 = Math.min;
var sin = Math.sin;
var sqrt2 = Math.sqrt;
var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;
function acos(x2) {
  return x2 > 1 ? 0 : x2 < -1 ? pi : Math.acos(x2);
}
function asin(x2) {
  return x2 >= 1 ? halfPi : x2 <= -1 ? -halfPi : Math.asin(x2);
}

// node_modules/d3-path/src/path.js
var pi2 = Math.PI;
var tau2 = 2 * pi2;
var epsilon3 = 1e-6;
var tauEpsilon = tau2 - epsilon3;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0))
    throw new Error(`invalid digits: ${digits}`);
  if (d > 15)
    return append;
  const k2 = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k2) / k2 + strings[i];
    }
  };
}
var Path = class {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x2, y2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x2, y2) {
    this._append`L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  quadraticCurveTo(x1, y1, x2, y2) {
    this._append`Q${+x1},${+y1},${this._x1 = +x2},${this._y1 = +y2}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    if (r < 0)
      throw new Error(`negative radius: ${r}`);
    let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon3))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon3) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    } else {
      let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon3) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    if (r < 0)
      throw new Error(`negative radius: ${r}`);
    let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da2 = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    } else if (Math.abs(this._x1 - x0) > epsilon3 || Math.abs(this._y1 - y0) > epsilon3) {
      this._append`L${x0},${y0}`;
    }
    if (!r)
      return;
    if (da2 < 0)
      da2 = da2 % tau2 + tau2;
    if (da2 > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x2 - dx},${y2 - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    } else if (da2 > epsilon3) {
      this._append`A${r},${r},0,${+(da2 >= pi2)},${cw},${this._x1 = x2 + r * Math.cos(a1)},${this._y1 = y2 + r * Math.sin(a1)}`;
    }
  }
  rect(x2, y2, w, h) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
};
function path() {
  return new Path();
}
path.prototype = Path.prototype;

// node_modules/d3-shape/src/path.js
function withPath(shape) {
  let digits = 3;
  shape.digits = function(_) {
    if (!arguments.length)
      return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0))
        throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };
  return () => new Path(digits);
}

// node_modules/d3-shape/src/arc.js
function arcInnerRadius(d) {
  return d.innerRadius;
}
function arcOuterRadius(d) {
  return d.outerRadius;
}
function arcStartAngle(d) {
  return d.startAngle;
}
function arcEndAngle(d) {
  return d.endAngle;
}
function arcPadAngle(d) {
  return d && d.padAngle;
}
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
  if (t * t < epsilon)
    return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / sqrt2(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D3 = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt2(max2(0, r * r * d2 - D3 * D3)), cx0 = (D3 * dy - dx * d) / d2, cy0 = (-D3 * dx - dy * d) / d2, cx1 = (D3 * dy + dx * d) / d2, cy1 = (-D3 * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
    cx0 = cx1, cy0 = cy1;
  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}
function arc_default() {
  var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant_default2(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null, path2 = withPath(arc);
  function arc() {
    var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da2 = abs(a1 - a0), cw = a1 > a0;
    if (!context)
      context = buffer = path2();
    if (r1 < r0)
      r = r1, r1 = r0, r0 = r;
    if (!(r1 > epsilon))
      context.moveTo(0, 0);
    else if (da2 > tau - epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    } else {
      var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da2, da1 = da2, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon && (padRadius ? +padRadius.apply(this, arguments) : sqrt2(r0 * r0 + r1 * r1)), rc = min2(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t03, t13;
      if (rp > epsilon) {
        var p0 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon)
          p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
        else
          da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon)
          p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
        else
          da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }
      var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
      if (rc > epsilon) {
        var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x00 = r0 * cos(a00), y00 = r0 * sin(a00), oc;
        if (da2 < pi) {
          if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
            var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt2(ax * ax + ay * ay) * sqrt2(bx * bx + by * by))) / 2), lc = sqrt2(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min2(rc, (r0 - lc) / (kc - 1));
            rc1 = min2(rc, (r1 - lc) / (kc + 1));
          } else {
            rc0 = rc1 = 0;
          }
        }
      }
      if (!(da1 > epsilon))
        context.moveTo(x01, y01);
      else if (rc1 > epsilon) {
        t03 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t13 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
        context.moveTo(t03.cx + t03.x01, t03.cy + t03.y01);
        if (rc1 < rc)
          context.arc(t03.cx, t03.cy, rc1, atan2(t03.y01, t03.x01), atan2(t13.y01, t13.x01), !cw);
        else {
          context.arc(t03.cx, t03.cy, rc1, atan2(t03.y01, t03.x01), atan2(t03.y11, t03.x11), !cw);
          context.arc(0, 0, r1, atan2(t03.cy + t03.y11, t03.cx + t03.x11), atan2(t13.cy + t13.y11, t13.cx + t13.x11), !cw);
          context.arc(t13.cx, t13.cy, rc1, atan2(t13.y11, t13.x11), atan2(t13.y01, t13.x01), !cw);
        }
      } else
        context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
      if (!(r0 > epsilon) || !(da0 > epsilon))
        context.lineTo(x10, y10);
      else if (rc0 > epsilon) {
        t03 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t13 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
        context.lineTo(t03.cx + t03.x01, t03.cy + t03.y01);
        if (rc0 < rc)
          context.arc(t03.cx, t03.cy, rc0, atan2(t03.y01, t03.x01), atan2(t13.y01, t13.x01), !cw);
        else {
          context.arc(t03.cx, t03.cy, rc0, atan2(t03.y01, t03.x01), atan2(t03.y11, t03.x11), !cw);
          context.arc(0, 0, r0, atan2(t03.cy + t03.y11, t03.cx + t03.x11), atan2(t13.cy + t13.y11, t13.cx + t13.x11), cw);
          context.arc(t13.cx, t13.cy, rc0, atan2(t13.y11, t13.x11), atan2(t13.y01, t13.x01), !cw);
        }
      } else
        context.arc(0, 0, r0, a10, a00, cw);
    }
    context.closePath();
    if (buffer)
      return context = null, buffer + "" || null;
  }
  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a2 = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
    return [cos(a2) * r, sin(a2) * r];
  };
  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant_default2(+_), arc) : innerRadius;
  };
  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant_default2(+_), arc) : outerRadius;
  };
  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant_default2(+_), arc) : cornerRadius;
  };
  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant_default2(+_), arc) : padRadius;
  };
  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default2(+_), arc) : startAngle;
  };
  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default2(+_), arc) : endAngle;
  };
  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default2(+_), arc) : padAngle;
  };
  arc.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, arc) : context;
  };
  return arc;
}

// node_modules/d3-shape/src/array.js
var slice2 = Array.prototype.slice;
function array_default2(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}

// node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/d3-shape/src/point.js
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}

// node_modules/d3-shape/src/line.js
function line_default(x2, y2) {
  var defined = constant_default2(true), context = null, curve = linear_default, output = null, path2 = withPath(line);
  x2 = typeof x2 === "function" ? x2 : x2 === void 0 ? x : constant_default2(x2);
  y2 = typeof y2 === "function" ? y2 : y2 === void 0 ? y : constant_default2(y2);
  function line(data) {
    var i, n = (data = array_default2(data)).length, d, defined0 = false, buffer;
    if (context == null)
      output = curve(buffer = path2());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0)
          output.lineStart();
        else
          output.lineEnd();
      }
      if (defined0)
        output.point(+x2(d, i, data), +y2(d, i, data));
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default2(+_), line) : x2;
  };
  line.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default2(+_), line) : y2;
  };
  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default2(!!_), line) : defined;
  };
  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };
  return line;
}

// node_modules/d3-shape/src/area.js
function area_default(x0, y0, y1) {
  var x1 = null, defined = constant_default2(true), context = null, curve = linear_default, output = null, path2 = withPath(area);
  x0 = typeof x0 === "function" ? x0 : x0 === void 0 ? x : constant_default2(+x0);
  y0 = typeof y0 === "function" ? y0 : y0 === void 0 ? constant_default2(0) : constant_default2(+y0);
  y1 = typeof y1 === "function" ? y1 : y1 === void 0 ? y : constant_default2(+y1);
  function area(data) {
    var i, j, k2, n = (data = array_default2(data)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
    if (context == null)
      output = curve(buffer = path2());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k2 = i - 1; k2 >= j; --k2) {
            output.point(x0z[k2], y0z[k2]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  function arealine() {
    return line_default().defined(defined).curve(curve).context(context);
  }
  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default2(+_), x1 = null, area) : x0;
  };
  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default2(+_), area) : x0;
  };
  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant_default2(+_), area) : x1;
  };
  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default2(+_), y1 = null, area) : y0;
  };
  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default2(+_), area) : y0;
  };
  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant_default2(+_), area) : y1;
  };
  area.lineX0 = area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };
  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default2(!!_), area) : defined;
  };
  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };
  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };
  return area;
}

// node_modules/d3-shape/src/descending.js
function descending_default(a2, b) {
  return b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/d3-shape/src/identity.js
function identity_default2(d) {
  return d;
}

// node_modules/d3-shape/src/pie.js
function pie_default() {
  var value = identity_default2, sortValues = descending_default, sort2 = null, startAngle = constant_default2(0), endAngle = constant_default2(tau), padAngle = constant_default2(0);
  function pie(data) {
    var i, n = (data = array_default2(data)).length, j, k2, sum4 = 0, index2 = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da2 = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da2) / n, padAngle.apply(this, arguments)), pa = p * (da2 < 0 ? -1 : 1), v2;
    for (i = 0; i < n; ++i) {
      if ((v2 = arcs[index2[i] = i] = +value(data[i], i, data)) > 0) {
        sum4 += v2;
      }
    }
    if (sortValues != null)
      index2.sort(function(i2, j2) {
        return sortValues(arcs[i2], arcs[j2]);
      });
    else if (sort2 != null)
      index2.sort(function(i2, j2) {
        return sort2(data[i2], data[j2]);
      });
    for (i = 0, k2 = sum4 ? (da2 - n * pa) / sum4 : 0; i < n; ++i, a0 = a1) {
      j = index2[i], v2 = arcs[j], a1 = a0 + (v2 > 0 ? v2 * k2 : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v2,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }
    return arcs;
  }
  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default2(+_), pie) : value;
  };
  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort2 = null, pie) : sortValues;
  };
  pie.sort = function(_) {
    return arguments.length ? (sort2 = _, sortValues = null, pie) : sort2;
  };
  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : startAngle;
  };
  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : endAngle;
  };
  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : padAngle;
  };
  return pie;
}

// node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear = curveRadial(linear_default);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a2, r) {
    this._curve.point(r * Math.sin(a2), r * -Math.cos(a2));
  }
};
function curveRadial(curve) {
  function radial2(context) {
    return new Radial(curve(context));
  }
  radial2._curve = curve;
  return radial2;
}

// node_modules/d3-shape/src/symbol/asterisk.js
var sqrt3 = sqrt2(3);

// node_modules/d3-shape/src/symbol/circle.js
var circle_default = {
  draw(context, size) {
    const r = sqrt2(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau);
  }
};

// node_modules/d3-shape/src/symbol/cross.js
var cross_default = {
  draw(context, size) {
    const r = sqrt2(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

// node_modules/d3-shape/src/symbol/diamond.js
var tan30 = sqrt2(1 / 3);
var tan30_2 = tan30 * 2;
var diamond_default = {
  draw(context, size) {
    const y2 = sqrt2(size / tan30_2);
    const x2 = y2 * tan30;
    context.moveTo(0, -y2);
    context.lineTo(x2, 0);
    context.lineTo(0, y2);
    context.lineTo(-x2, 0);
    context.closePath();
  }
};

// node_modules/d3-shape/src/symbol/square.js
var square_default = {
  draw(context, size) {
    const w = sqrt2(size);
    const x2 = -w / 2;
    context.rect(x2, x2, w, w);
  }
};

// node_modules/d3-shape/src/symbol/star.js
var ka = 0.8908130915292852;
var kr = sin(pi / 10) / sin(7 * pi / 10);
var kx = sin(tau / 10) * kr;
var ky = -cos(tau / 10) * kr;
var star_default = {
  draw(context, size) {
    const r = sqrt2(size * ka);
    const x2 = kx * r;
    const y2 = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x2, y2);
    for (let i = 1; i < 5; ++i) {
      const a2 = tau * i / 5;
      const c6 = cos(a2);
      const s2 = sin(a2);
      context.lineTo(s2 * r, -c6 * r);
      context.lineTo(c6 * x2 - s2 * y2, s2 * x2 + c6 * y2);
    }
    context.closePath();
  }
};

// node_modules/d3-shape/src/symbol/triangle.js
var sqrt32 = sqrt2(3);
var triangle_default = {
  draw(context, size) {
    const y2 = -sqrt2(size / (sqrt32 * 3));
    context.moveTo(0, y2 * 2);
    context.lineTo(-sqrt32 * y2, -y2);
    context.lineTo(sqrt32 * y2, -y2);
    context.closePath();
  }
};

// node_modules/d3-shape/src/symbol/triangle2.js
var sqrt33 = sqrt2(3);

// node_modules/d3-shape/src/symbol/wye.js
var c = -0.5;
var s = sqrt2(3) / 2;
var k = 1 / sqrt2(12);
var a = (k / 2 + 1) * 3;
var wye_default = {
  draw(context, size) {
    const r = sqrt2(size / a);
    const x0 = r / 2, y0 = r * k;
    const x1 = x0, y1 = r * k + r;
    const x2 = -x1, y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

// node_modules/d3-shape/src/symbol.js
var symbolsFill = [
  circle_default,
  cross_default,
  diamond_default,
  square_default,
  star_default,
  triangle_default,
  wye_default
];
function Symbol2(type, size) {
  let context = null, path2 = withPath(symbol);
  type = typeof type === "function" ? type : constant_default2(type || circle_default);
  size = typeof size === "function" ? size : constant_default2(size === void 0 ? 64 : +size);
  function symbol() {
    let buffer;
    if (!context)
      context = buffer = path2();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer)
      return context = null, buffer + "" || null;
  }
  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant_default2(_), symbol) : type;
  };
  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant_default2(+_), symbol) : size;
  };
  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };
  return symbol;
}

// node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/d3-shape/src/curve/basis.js
function point2(that, x2, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
    (that._y0 + 4 * that._y1 + y2) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point2(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/bundle.js
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, j = x2.length - 1;
    if (j > 0) {
      var x0 = x2[0], y0 = y2[0], dx = x2[j] - x0, dy = y2[j] - y0, i = -1, t;
      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x2[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y2[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
var bundle_default = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle;
}(0.85);

// node_modules/d3-shape/src/curve/cardinal.js
function point3(that, x2, y2) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x2),
    that._y2 + that._k * (that._y1 - y2),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point3(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinal_default = function custom2(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalClosed_default = function custom3(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalOpen_default = function custom4(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/catmullRom.js
function point4(that, x2, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
    y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRom_default = function custom5(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomClosed_default = function custom6(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomOpen_default = function custom7(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point)
      this._context.closePath();
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point)
      this._context.lineTo(x2, y2);
    else
      this._point = 1, this._context.moveTo(x2, y2);
  }
};

// node_modules/d3-shape/src/curve/monotone.js
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
function point5(that, t03, t13) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t03, x1 - dx, y1 - dx * t13, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point5(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    var t13 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1)
      return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point5(this, slope2(this, t13 = slope3(this, x2, y2)), t13);
        break;
      default:
        point5(this, this._t0, t13 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t13;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}

// node_modules/d3-shape/src/curve/natural.js
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, n = x2.length;
    if (n) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n === 1)
      this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
  a2[0] = 0, b[0] = 2, r[0] = x2[0] + 2 * x2[1];
  for (i = 1; i < n - 1; ++i)
    a2[i] = 1, b[i] = 4, r[i] = 4 * x2[i] + 2 * x2[i + 1];
  a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x2[n - 1] + x2[n];
  for (i = 1; i < n; ++i)
    m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a2[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i)
    a2[i] = (r[i] - a2[i + 1]) / b[i];
  b[n - 1] = (x2[n] + a2[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i)
    b[i] = 2 * x2[i + 1] - a2[i + 1];
  return [a2, b];
}
function natural_default(context) {
  return new Natural(context);
}

// node_modules/d3-shape/src/curve/step.js
function Step(context, t) {
  this._context = context;
  this._t = t;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2)
      this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    if (this._line >= 0)
      this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};
function step_default(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}

// node_modules/d3-shape/src/offset/none.js
function none_default(series, order) {
  if (!((n = series.length) > 1))
    return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

// node_modules/d3-shape/src/order/none.js
function none_default2(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0)
    o[n] = n;
  return o;
}

// node_modules/d3-shape/src/stack.js
function stackValue(d, key) {
  return d[key];
}
function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}
function stack_default() {
  var keys = constant_default2([]), order = none_default2, offset = none_default, value = stackValue;
  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }
    for (i = 0, oz = array_default2(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant_default2(Array.from(_)), stack) : keys;
  };
  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default2(+_), stack) : value;
  };
  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none_default2 : typeof _ === "function" ? _ : constant_default2(Array.from(_)), stack) : order;
  };
  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none_default : _, stack) : offset;
  };
  return stack;
}

// node_modules/d3-shape/src/offset/expand.js
function expand_default(series, order) {
  if (!((n = series.length) > 0))
    return;
  for (var i, n, j = 0, m = series[0].length, y2; j < m; ++j) {
    for (y2 = i = 0; i < n; ++i)
      y2 += series[i][j][1] || 0;
    if (y2)
      for (i = 0; i < n; ++i)
        series[i][j][1] /= y2;
  }
  none_default(series, order);
}

// node_modules/d3-shape/src/offset/diverging.js
function diverging_default(series, order) {
  if (!((n = series.length) > 0))
    return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}

// node_modules/d3-shape/src/offset/silhouette.js
function silhouette_default(series, order) {
  if (!((n = series.length) > 0))
    return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y2 = 0; i < n; ++i)
      y2 += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y2 / 2;
  }
  none_default(series, order);
}

// node_modules/d3-shape/src/offset/wiggle.js
function wiggle_default(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0))
    return;
  for (var y2 = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
      for (var k2 = 0; k2 < i; ++k2) {
        var sk = series[order[k2]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y2;
    if (s1)
      y2 -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y2;
  none_default(series, order);
}

// node_modules/d3-shape/src/order/appearance.js
function appearance_default(series) {
  var peaks = series.map(peak);
  return none_default2(series).sort(function(a2, b) {
    return peaks[a2] - peaks[b];
  });
}
function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n)
    if ((vi = +series[i][1]) > vj)
      vj = vi, j = i;
  return j;
}

// node_modules/d3-shape/src/order/ascending.js
function ascending_default(series) {
  var sums = series.map(sum2);
  return none_default2(series).sort(function(a2, b) {
    return sums[a2] - sums[b];
  });
}
function sum2(series) {
  var s2 = 0, i = -1, n = series.length, v2;
  while (++i < n)
    if (v2 = +series[i][1])
      s2 += v2;
  return s2;
}

// node_modules/d3-shape/src/order/descending.js
function descending_default2(series) {
  return ascending_default(series).reverse();
}

// node_modules/d3-shape/src/order/insideOut.js
function insideOut_default(series) {
  var n = series.length, i, j, sums = series.map(sum2), order = appearance_default(series), top = 0, bottom = 0, tops = [], bottoms = [];
  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }
  return bottoms.reverse().concat(tops);
}

// node_modules/d3-shape/src/order/reverse.js
function reverse_default(series) {
  return none_default2(series).reverse();
}

// node_modules/@mui/x-charts/esm/internals/stackSeries.js
var StackOrder = {
  /**
   * Series order such that the earliest series (according to the maximum value) is at the bottom.
   * */
  appearance: appearance_default,
  /**
   *  Series order such that the smallest series (according to the sum of values) is at the bottom.
   * */
  ascending: ascending_default,
  /**
   * Series order such that the largest series (according to the sum of values) is at the bottom.
   */
  descending: descending_default2,
  /**
   * Series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the wiggle offset. See Stacked Graphs—Geometry & Aesthetics by Byron & Wattenberg for more information.
   */
  insideOut: insideOut_default,
  /**
   * Given series order [0, 1, … n - 1] where n is the number of elements in series. Thus, the stack order is given by the key accessor.
   */
  none: none_default2,
  /**
   * Reverse of the given series order [n - 1, n - 2, … 0] where n is the number of elements in series. Thus, the stack order is given by the reverse of the key accessor.
   */
  reverse: reverse_default
};
var StackOffset = {
  /**
   * Applies a zero baseline and normalizes the values for each point such that the topline is always one.
   * */
  expand: expand_default,
  /**
   * Positive values are stacked above zero, negative values are stacked below zero, and zero values are stacked at zero.
   * */
  diverging: diverging_default,
  /**
   * Applies a zero baseline.
   * */
  none: none_default,
  /**
   * Shifts the baseline down such that the center of the streamgraph is always at zero.
   * */
  silhouette: silhouette_default,
  /**
   * Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the inside-out order. See Stacked Graphs—Geometry & Aesthetics by Bryon & Wattenberg for more information.
   * */
  wiggle: wiggle_default
};
var getStackingGroups = (params) => {
  const {
    series,
    seriesOrder,
    defaultStrategy
  } = params;
  const stackingGroups = [];
  const stackIndex = {};
  seriesOrder.forEach((id) => {
    const {
      stack,
      stackOrder,
      stackOffset
    } = series[id];
    if (stack === void 0) {
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder.none,
        stackingOffset: StackOffset.none
      });
    } else if (stackIndex[stack] === void 0) {
      stackIndex[stack] = stackingGroups.length;
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder[stackOrder ?? (defaultStrategy == null ? void 0 : defaultStrategy.stackOrder) ?? "none"],
        stackingOffset: StackOffset[stackOffset ?? (defaultStrategy == null ? void 0 : defaultStrategy.stackOffset) ?? "diverging"]
      });
    } else {
      stackingGroups[stackIndex[stack]].ids.push(id);
      if (stackOrder !== void 0) {
        stackingGroups[stackIndex[stack]].stackingOrder = StackOrder[stackOrder];
      }
      if (stackOffset !== void 0) {
        stackingGroups[stackIndex[stack]].stackingOffset = StackOffset[stackOffset];
      }
    }
  });
  return stackingGroups;
};

// node_modules/@mui/x-charts/esm/internals/defaultizeValueFormatter.js
init_extends();
function defaultizeValueFormatter(series, defaultValueFormatter) {
  const defaultizedSeries = {};
  Object.keys(series).forEach((seriesId) => {
    defaultizedSeries[seriesId] = _extends({}, series[seriesId], {
      valueFormatter: series[seriesId].valueFormatter ?? defaultValueFormatter
    });
  });
  return defaultizedSeries;
}
var defaultizeValueFormatter_default = defaultizeValueFormatter;

// node_modules/@mui/x-charts/esm/BarChart/formatter.js
var warnOnce = false;
var formatter = (params, dataset) => {
  const {
    seriesOrder,
    series
  } = params;
  const stackingGroups = getStackingGroups(params);
  const d3Dataset = dataset ?? [];
  seriesOrder.forEach((id) => {
    const data = series[id].data;
    if (data !== void 0) {
      data.forEach((value, index2) => {
        if (d3Dataset.length <= index2) {
          d3Dataset.push({
            [id]: value
          });
        } else {
          d3Dataset[index2][id] = value;
        }
      });
    } else if (dataset === void 0) {
      throw new Error([`MUI X Charts: bar series with id='${id}' has no data.`, "Either provide a data property to the series or use the dataset prop."].join("\n"));
    }
  });
  const completedSeries = {};
  stackingGroups.forEach((stackingGroup) => {
    const {
      ids,
      stackingOffset,
      stackingOrder
    } = stackingGroup;
    const stackedSeries = stack_default().keys(ids.map((id) => {
      const dataKey = series[id].dataKey;
      return series[id].data === void 0 && dataKey !== void 0 ? dataKey : id;
    })).value((d, key) => d[key] ?? 0).order(stackingOrder).offset(stackingOffset)(d3Dataset);
    ids.forEach((id, index2) => {
      const dataKey = series[id].dataKey;
      completedSeries[id] = _extends({
        layout: "vertical"
      }, series[id], {
        data: dataKey ? dataset.map((data) => {
          const value = data[dataKey];
          if (typeof value !== "number") {
            if (!warnOnce && value !== null) {
              warnOnce = true;
              console.error([`MUI-X charts: your dataset key "${dataKey}" is used for plotting bars, but contains nonnumerical elements.`, "Bar plots only support numbers and null values."]);
            }
            return 0;
          }
          return value;
        }) : series[id].data,
        stackedData: stackedSeries[index2].map(([a2, b]) => [a2, b])
      });
    });
  });
  return {
    seriesOrder,
    stackingGroups,
    series: defaultizeValueFormatter_default(completedSeries, (v2) => v2 == null ? "" : v2.toLocaleString())
  };
};
var formatter_default = formatter;

// node_modules/@mui/x-charts/esm/ScatterChart/formatter.js
var formatter2 = ({
  series,
  seriesOrder
}) => {
  return {
    series: defaultizeValueFormatter_default(series, (v2) => `(${v2.x}, ${v2.y})`),
    seriesOrder
  };
};
var formatter_default2 = formatter2;

// node_modules/@mui/x-charts/esm/LineChart/formatter.js
init_extends();
var warnedOnce = false;
var formatter3 = (params, dataset) => {
  const {
    seriesOrder,
    series
  } = params;
  const stackingGroups = getStackingGroups(_extends({}, params, {
    defaultStrategy: {
      stackOffset: "none"
    }
  }));
  const d3Dataset = dataset ?? [];
  seriesOrder.forEach((id) => {
    const data = series[id].data;
    if (data !== void 0) {
      data.forEach((value, index2) => {
        if (d3Dataset.length <= index2) {
          d3Dataset.push({
            [id]: value
          });
        } else {
          d3Dataset[index2][id] = value;
        }
      });
    } else if (dataset === void 0 && true) {
      throw new Error([`MUI X Charts: line series with id='${id}' has no data.`, "Either provide a data property to the series or use the dataset prop."].join("\n"));
    }
  });
  const completedSeries = {};
  stackingGroups.forEach((stackingGroup) => {
    const {
      ids,
      stackingOrder,
      stackingOffset
    } = stackingGroup;
    const stackedSeries = stack_default().keys(ids.map((id) => {
      const dataKey = series[id].dataKey;
      return series[id].data === void 0 && dataKey !== void 0 ? dataKey : id;
    })).value((d, key) => d[key] ?? 0).order(stackingOrder).offset(stackingOffset)(d3Dataset);
    ids.forEach((id, index2) => {
      const dataKey = series[id].dataKey;
      completedSeries[id] = _extends({}, series[id], {
        data: dataKey ? dataset.map((data) => {
          const value = data[dataKey];
          if (typeof value !== "number") {
            if (!warnedOnce && value !== null) {
              warnedOnce = true;
              console.error([`MUI-X charts: your dataset key "${dataKey}" is used for plotting line, but contains nonnumerical elements.`, "Line plots only support numbers and null values."]);
            }
            return null;
          }
          return value;
        }) : series[id].data,
        stackedData: stackedSeries[index2].map(([a2, b]) => [a2, b])
      });
    });
  });
  return {
    seriesOrder,
    stackingGroups,
    series: defaultizeValueFormatter_default(completedSeries, (v2) => v2 == null ? "" : v2.toLocaleString())
  };
};
var formatter_default3 = formatter3;

// node_modules/@mui/x-charts/esm/PieChart/formatter.js
init_extends();

// node_modules/@mui/x-charts/esm/internals/getLabel.js
function getLabel(value, location) {
  return typeof value === "function" ? value(location) : value;
}

// node_modules/@mui/x-charts/esm/PieChart/formatter.js
var getSortingComparator = (comparator = "none") => {
  if (typeof comparator === "function") {
    return comparator;
  }
  switch (comparator) {
    case "none":
      return null;
    case "desc":
      return (a2, b) => b - a2;
    case "asc":
      return (a2, b) => a2 - b;
    default:
      return null;
  }
};
var formatter4 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  const defaultizedSeries = {};
  seriesOrder.forEach((seriesId) => {
    const arcs = pie_default().startAngle(2 * Math.PI * (series[seriesId].startAngle ?? 0) / 360).endAngle(2 * Math.PI * (series[seriesId].endAngle ?? 360) / 360).padAngle(2 * Math.PI * (series[seriesId].paddingAngle ?? 0) / 360).sortValues(getSortingComparator(series[seriesId].sortingValues ?? "none"))(series[seriesId].data.map((piePoint) => piePoint.value));
    defaultizedSeries[seriesId] = _extends({
      valueFormatter: (item) => item.value.toLocaleString()
    }, series[seriesId], {
      data: series[seriesId].data.map((item, index2) => _extends({}, item, {
        id: item.id ?? `auto-generated-pie-id-${seriesId}-${index2}`
      }, arcs[index2])).map((item, index2) => {
        var _a, _b;
        return _extends({}, item, {
          formattedValue: ((_b = (_a = series[seriesId]).valueFormatter) == null ? void 0 : _b.call(_a, _extends({}, item, {
            label: getLabel(item.label, "arc")
          }), {
            dataIndex: index2
          })) ?? item.value.toLocaleString()
        });
      })
    });
  });
  return {
    seriesOrder,
    series: defaultizedSeries
  };
};
var formatter_default4 = formatter4;

// node_modules/@mui/x-charts/esm/internals/defaultizeColor.js
init_extends();
var DEFAULT_COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
function defaultizeColor(series, seriesIndex, colors3 = DEFAULT_COLORS) {
  if (series.type === "pie") {
    return _extends({}, series, {
      data: series.data.map((d, index2) => _extends({
        color: colors3[index2 % colors3.length]
      }, d))
    });
  }
  return _extends({
    color: colors3[seriesIndex % colors3.length]
  }, series);
}

// node_modules/@mui/x-charts/esm/colorPalettes/colorPalettes.js
var blueberryTwilightPaletteLight = ["#02B2AF", "#2E96FF", "#B800D8", "#60009B", "#2731C8", "#03008D"];
var blueberryTwilightPaletteDark = ["#02B2AF", "#72CCFF", "#DA00FF", "#9001CB", "#2E96FF", "#3B48E0"];
var blueberryTwilightPalette = (mode2) => mode2 === "dark" ? blueberryTwilightPaletteDark : blueberryTwilightPaletteLight;
var mangoFusionPaletteLight = ["#173A5E", "#00A3A0", "#C91B63", "#EF5350", "#FFA726", "#B800D8", "#60009B", "#2E96FF", "#2731C8", "#03008D"];
var mangoFusionPaletteDark = ["#41698F", "#19D0CD", "#DE196B", "#FC5F5C", "#FFD771", "#DA00FF", "#9001CB", "#72CCFF", "#2E96FF", "#3B48E0"];
var mangoFusionPalette = (mode2) => mode2 === "dark" ? mangoFusionPaletteDark : mangoFusionPaletteLight;
var cheerfulFiestaPaletteDark = ["#0059B2", "#2E96FF", "#FFC24C", "#FF9F0E", "#F38200", "#2ABFDE", "#1F94AD", "#BD2C38", "#FF3143", "#FF8282"];
var cheerfulFiestaPaletteLight = ["#003A75", "#007FFF", "#FFC24C", "#FF9D09", "#CA6C00", "#127D94", "#1F94AD", "#C82634", "#FF3143", "#FF7E7E"];
var cheerfulFiestaPalette = (mode2) => mode2 === "dark" ? cheerfulFiestaPaletteDark : cheerfulFiestaPaletteLight;

// node_modules/@mui/x-charts/esm/context/SeriesContextProvider.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var SeriesContext = React6.createContext({});
if (true) {
  SeriesContext.displayName = "SeriesContext";
}
var seriesTypeFormatter = {
  bar: formatter_default,
  scatter: formatter_default2,
  line: formatter_default3,
  pie: formatter_default4
};
var formatSeries = (series, colors3, dataset) => {
  const seriesGroups = {};
  series.forEach((seriesData, seriesIndex) => {
    var _a;
    const {
      id = `auto-generated-id-${seriesIndex}`,
      type
    } = seriesData;
    if (seriesGroups[type] === void 0) {
      seriesGroups[type] = {
        series: {},
        seriesOrder: []
      };
    }
    if (((_a = seriesGroups[type]) == null ? void 0 : _a.series[id]) !== void 0) {
      throw new Error(`MUI X Charts: series' id "${id}" is not unique.`);
    }
    seriesGroups[type].series[id] = _extends({
      id
    }, defaultizeColor(seriesData, seriesIndex, colors3));
    seriesGroups[type].seriesOrder.push(id);
  });
  const formattedSeries = {};
  Object.keys(seriesTypeFormatter).forEach((type) => {
    var _a;
    if (seriesGroups[type] !== void 0) {
      formattedSeries[type] = ((_a = seriesTypeFormatter[type]) == null ? void 0 : _a.call(seriesTypeFormatter, seriesGroups[type], dataset)) ?? seriesGroups[type];
    }
  });
  return formattedSeries;
};
function SeriesContextProvider(props) {
  const {
    series,
    dataset,
    colors: colors3 = blueberryTwilightPalette,
    children
  } = props;
  const theme = useTheme();
  const formattedSeries = React6.useMemo(() => formatSeries(series, typeof colors3 === "function" ? colors3(theme.palette.mode) : colors3, dataset), [series, colors3, theme.palette.mode, dataset]);
  return (0, import_jsx_runtime3.jsx)(SeriesContext.Provider, {
    value: formattedSeries,
    children
  });
}

// node_modules/@mui/x-charts/esm/hooks/useTicks.js
var React7 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/internals/isBandScale.js
function isBandScale(scale2) {
  return scale2.bandwidth !== void 0;
}

// node_modules/@mui/x-charts/esm/hooks/useTicks.js
function getTickNumber(params) {
  const {
    tickMaxStep,
    tickMinStep,
    tickNumber,
    range: range2,
    domain
  } = params;
  const maxTicks = tickMinStep === void 0 ? 999 : Math.floor(Math.abs(domain[1] - domain[0]) / tickMinStep);
  const minTicks = tickMaxStep === void 0 ? 2 : Math.ceil(Math.abs(domain[1] - domain[0]) / tickMaxStep);
  const defaultizedTickNumber = tickNumber ?? Math.floor(Math.abs(range2[1] - range2[0]) / 50);
  return Math.min(maxTicks, Math.max(minTicks, defaultizedTickNumber));
}
var offsetRatio = {
  start: 0,
  extremities: 0,
  end: 1,
  middle: 0.5
};
function useTicks(options) {
  const {
    scale: scale2,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement = "extremities",
    tickLabelPlacement = "middle"
  } = options;
  return React7.useMemo(() => {
    if (isBandScale(scale2)) {
      const domain = scale2.domain();
      if (scale2.bandwidth() > 0) {
        return [...domain.map((value) => ({
          value,
          formattedValue: (valueFormatter == null ? void 0 : valueFormatter(value, {
            location: "tick"
          })) ?? `${value}`,
          offset: scale2(value) - (scale2.step() - scale2.bandwidth()) / 2 + offsetRatio[tickPlacement] * scale2.step(),
          labelOffset: tickLabelPlacement === "tick" ? 0 : scale2.step() * (offsetRatio[tickLabelPlacement] - offsetRatio[tickPlacement])
        })), ...tickPlacement === "extremities" ? [{
          formattedValue: void 0,
          offset: scale2.range()[1],
          labelOffset: 0
        }] : []];
      }
      const filteredDomain = typeof tickInterval === "function" && domain.filter(tickInterval) || typeof tickInterval === "object" && tickInterval || domain;
      return filteredDomain.map((value) => ({
        value,
        formattedValue: (valueFormatter == null ? void 0 : valueFormatter(value, {
          location: "tick"
        })) ?? `${value}`,
        offset: scale2(value),
        labelOffset: 0
      }));
    }
    if (scale2.domain().length === 0 || scale2.domain()[0] === scale2.domain()[1]) {
      return [];
    }
    const ticks2 = typeof tickInterval === "object" ? tickInterval : scale2.ticks(tickNumber);
    return ticks2.map((value) => ({
      value,
      formattedValue: (valueFormatter == null ? void 0 : valueFormatter(value, {
        location: "tick"
      })) ?? scale2.tickFormat(tickNumber)(value),
      offset: scale2(value),
      labelOffset: 0
    }));
  }, [scale2, tickInterval, tickNumber, valueFormatter, tickPlacement, tickLabelPlacement]);
}

// node_modules/@mui/x-charts/esm/context/CartesianContextProvider.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var DEFAULT_CATEGORY_GAP_RATIO = 0.2;
var DEFAULT_BAR_GAP_RATIO = 0.1;
var xExtremumGetters = {
  bar: getExtremumX,
  scatter: getExtremumX2,
  line: getExtremumX3
};
var yExtremumGetters = {
  bar: getExtremumY,
  scatter: getExtremumY2,
  line: getExtremumY3
};
var CartesianContext = React8.createContext({
  xAxis: {},
  yAxis: {},
  xAxisIds: [],
  yAxisIds: []
});
if (true) {
  CartesianContext.displayName = "CartesianContext";
}
function CartesianContextProvider(props) {
  const {
    xAxis: inXAxis,
    yAxis: inYAxis,
    dataset,
    children
  } = props;
  const formattedSeries = React8.useContext(SeriesContext);
  const drawingArea = useDrawingArea();
  const xAxis = React8.useMemo(() => inXAxis == null ? void 0 : inXAxis.map((axisConfig) => {
    const dataKey = axisConfig.dataKey;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return axisConfig;
    }
    if (dataset === void 0) {
      throw Error("MUI X Charts: x-axis uses `dataKey` but no `dataset` is provided.");
    }
    return _extends({}, axisConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  }), [inXAxis, dataset]);
  const yAxis = React8.useMemo(() => inYAxis == null ? void 0 : inYAxis.map((axisConfig) => {
    const dataKey = axisConfig.dataKey;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return axisConfig;
    }
    if (dataset === void 0) {
      throw Error("MUI X Charts: y-axis uses `dataKey` but no `dataset` is provided.");
    }
    return _extends({}, axisConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  }), [inYAxis, dataset]);
  const value = React8.useMemo(() => {
    const axisExtremumCallback = (acc, chartType, axis, getters, isDefaultAxis) => {
      var _a;
      const getter = getters[chartType];
      const series = ((_a = formattedSeries[chartType]) == null ? void 0 : _a.series) ?? {};
      const [minChartTypeData, maxChartTypeData] = getter({
        series,
        axis,
        isDefaultAxis
      });
      const [minData, maxData] = acc;
      if (minData === null || maxData === null) {
        return [minChartTypeData, maxChartTypeData];
      }
      if (minChartTypeData === null || maxChartTypeData === null) {
        return [minData, maxData];
      }
      return [Math.min(minChartTypeData, minData), Math.max(maxChartTypeData, maxData)];
    };
    const getAxisExtremum = (axis, getters, isDefaultAxis) => {
      const charTypes = Object.keys(getters);
      return charTypes.reduce((acc, charType) => axisExtremumCallback(acc, charType, axis, getters, isDefaultAxis), [null, null]);
    };
    const allXAxis = [
      ...(xAxis == null ? void 0 : xAxis.map((axis, index2) => _extends({
        id: `defaultized-x-axis-${index2}`
      }, axis))) ?? [],
      // Allows to specify an axis with id=DEFAULT_X_AXIS_KEY
      ...xAxis === void 0 || xAxis.findIndex(({
        id
      }) => id === DEFAULT_X_AXIS_KEY) === -1 ? [{
        id: DEFAULT_X_AXIS_KEY,
        scaleType: "linear"
      }] : []
    ];
    const completedXAxis = {};
    allXAxis.forEach((axis, axisIndex) => {
      const isDefaultAxis = axisIndex === 0;
      const [minData, maxData] = getAxisExtremum(axis, xExtremumGetters, isDefaultAxis);
      const range2 = axis.reverse ? [drawingArea.left + drawingArea.width, drawingArea.left] : [drawingArea.left, drawingArea.left + drawingArea.width];
      if (isBandScaleConfig(axis)) {
        const categoryGapRatio = axis.categoryGapRatio ?? DEFAULT_CATEGORY_GAP_RATIO;
        const barGapRatio = axis.barGapRatio ?? DEFAULT_BAR_GAP_RATIO;
        completedXAxis[axis.id] = _extends({
          categoryGapRatio,
          barGapRatio
        }, axis, {
          scale: band(axis.data, range2).paddingInner(categoryGapRatio).paddingOuter(categoryGapRatio / 2),
          tickNumber: axis.data.length,
          colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
            values: axis.data
          }, axis.colorMap)) : getColorScale(axis.colorMap))
        });
      }
      if (isPointScaleConfig(axis)) {
        completedXAxis[axis.id] = _extends({}, axis, {
          scale: point(axis.data, range2),
          tickNumber: axis.data.length,
          colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
            values: axis.data
          }, axis.colorMap)) : getColorScale(axis.colorMap))
        });
      }
      if (axis.scaleType === "band" || axis.scaleType === "point") {
        return;
      }
      const scaleType = axis.scaleType ?? "linear";
      const extremums = [axis.min ?? minData, axis.max ?? maxData];
      const tickNumber = getTickNumber(_extends({}, axis, {
        range: range2,
        domain: extremums
      }));
      const niceScale = getScale(scaleType, extremums, range2).nice(tickNumber);
      const niceDomain = niceScale.domain();
      const domain = [axis.min ?? niceDomain[0], axis.max ?? niceDomain[1]];
      completedXAxis[axis.id] = _extends({}, axis, {
        scaleType,
        scale: niceScale.domain(domain),
        tickNumber,
        colorScale: axis.colorMap && getColorScale(axis.colorMap)
      });
    });
    const allYAxis = [...(yAxis == null ? void 0 : yAxis.map((axis, index2) => _extends({
      id: `defaultized-y-axis-${index2}`
    }, axis))) ?? [], ...yAxis === void 0 || yAxis.findIndex(({
      id
    }) => id === DEFAULT_Y_AXIS_KEY) === -1 ? [{
      id: DEFAULT_Y_AXIS_KEY,
      scaleType: "linear"
    }] : []];
    const completedYAxis = {};
    allYAxis.forEach((axis, axisIndex) => {
      const isDefaultAxis = axisIndex === 0;
      const [minData, maxData] = getAxisExtremum(axis, yExtremumGetters, isDefaultAxis);
      const range2 = axis.reverse ? [drawingArea.top, drawingArea.top + drawingArea.height] : [drawingArea.top + drawingArea.height, drawingArea.top];
      if (isBandScaleConfig(axis)) {
        const categoryGapRatio = axis.categoryGapRatio ?? DEFAULT_CATEGORY_GAP_RATIO;
        completedYAxis[axis.id] = _extends({
          categoryGapRatio,
          barGapRatio: 0
        }, axis, {
          scale: band(axis.data, [range2[1], range2[0]]).paddingInner(categoryGapRatio).paddingOuter(categoryGapRatio / 2),
          tickNumber: axis.data.length,
          colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
            values: axis.data
          }, axis.colorMap)) : getColorScale(axis.colorMap))
        });
      }
      if (isPointScaleConfig(axis)) {
        completedYAxis[axis.id] = _extends({}, axis, {
          scale: point(axis.data, [range2[1], range2[0]]),
          tickNumber: axis.data.length,
          colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
            values: axis.data
          }, axis.colorMap)) : getColorScale(axis.colorMap))
        });
      }
      if (axis.scaleType === "band" || axis.scaleType === "point") {
        return;
      }
      const scaleType = axis.scaleType ?? "linear";
      const extremums = [axis.min ?? minData, axis.max ?? maxData];
      const tickNumber = getTickNumber(_extends({}, axis, {
        range: range2,
        domain: extremums
      }));
      const niceScale = getScale(scaleType, extremums, range2).nice(tickNumber);
      const niceDomain = niceScale.domain();
      const domain = [axis.min ?? niceDomain[0], axis.max ?? niceDomain[1]];
      completedYAxis[axis.id] = _extends({}, axis, {
        scaleType,
        scale: niceScale.domain(domain),
        tickNumber,
        colorScale: axis.colorMap && getColorScale(axis.colorMap)
      });
    });
    return {
      xAxis: completedXAxis,
      yAxis: completedYAxis,
      xAxisIds: allXAxis.map(({
        id
      }) => id),
      yAxisIds: allYAxis.map(({
        id
      }) => id)
    };
  }, [drawingArea.height, drawingArea.left, drawingArea.top, drawingArea.width, formattedSeries, xAxis, yAxis]);
  return (0, import_jsx_runtime4.jsx)(CartesianContext.Provider, {
    value,
    children
  });
}

// node_modules/@mui/x-charts/esm/hooks/useScale.js
function getValueToPositionMapper(scale2) {
  if (isBandScale(scale2)) {
    return (value) => scale2(value) + scale2.bandwidth() / 2;
  }
  return (value) => scale2(value);
}
function useXScale(identifier) {
  const {
    xAxis,
    xAxisIds
  } = React9.useContext(CartesianContext);
  const id = typeof identifier === "string" ? identifier : xAxisIds[identifier ?? 0];
  return xAxis[id].scale;
}
function useYScale(identifier) {
  const {
    yAxis,
    yAxisIds
  } = React9.useContext(CartesianContext);
  const id = typeof identifier === "string" ? identifier : yAxisIds[identifier ?? 0];
  return yAxis[id].scale;
}

// node_modules/@mui/x-charts/esm/hooks/useSvgRef.js
var React10 = __toESM(require_react());
function useSvgRef() {
  const svgRef = React10.useContext(SvgContext);
  if (svgRef === void 0) {
    throw new Error(["MUI X: Could not find the svg ref context.", "It looks like you rendered your component outside of a ChartsContainer parent component."].join("\n"));
  }
  return svgRef;
}

// node_modules/@mui/x-charts/esm/hooks/useSeries.js
var React11 = __toESM(require_react());
function useSeries() {
  const series = React11.useContext(SeriesContext);
  if (series === void 0) {
    throw new Error(["MUI X: Could not find the series ref context.", "It looks like you rendered your component outside of a ChartsContainer parent component."].join("\n"));
  }
  return series;
}
function usePieSeries() {
  const series = useSeries();
  return React11.useMemo(() => series.pie, [series.pie]);
}
function useLineSeries() {
  const series = useSeries();
  return React11.useMemo(() => series.line, [series.line]);
}
function useBarSeries() {
  const series = useSeries();
  return React11.useMemo(() => series.bar, [series.bar]);
}
function useScatterSeries() {
  const series = useSeries();
  return React11.useMemo(() => series.scatter, [series.scatter]);
}

// node_modules/@mui/x-charts/esm/models/seriesType/index.js
function isDefaultizedBarSeries(series) {
  return series.type === "bar";
}
function isBarSeries(series) {
  return series.type === "bar";
}

// node_modules/@mui/x-charts/esm/ChartsClipPath/ChartsClipPath.js
init_extends();
var React12 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
function ChartsClipPath(props) {
  const {
    id,
    offset: offsetProps
  } = props;
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const offset = _extends({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, offsetProps);
  return (0, import_jsx_runtime5.jsx)("clipPath", {
    id,
    children: (0, import_jsx_runtime5.jsx)("rect", {
      x: left - offset.left,
      y: top - offset.top,
      width: width + offset.left + offset.right,
      height: height + offset.top + offset.bottom
    })
  });
}
true ? ChartsClipPath.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  id: import_prop_types2.default.string.isRequired,
  offset: import_prop_types2.default.shape({
    bottom: import_prop_types2.default.number,
    left: import_prop_types2.default.number,
    right: import_prop_types2.default.number,
    top: import_prop_types2.default.number
  })
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/ChartsReferenceLine.js
init_extends();
var React16 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/ChartsXReferenceLine.js
init_extends();
var React14 = __toESM(require_react());
init_composeClasses();

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/common.js
init_extends();

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/chartsReferenceLineClasses.js
init_generateUtilityClass();
init_generateUtilityClasses();
function getReferenceLineUtilityClass(slot) {
  return generateUtilityClass("MuiChartsReferenceLine", slot);
}
var referenceLineClasses = generateUtilityClasses("MuiChartsReferenceLine", ["root", "vertical", "horizontal", "line", "label"]);

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/common.js
var ReferenceLineRoot = styled_default("g")(({
  theme
}) => ({
  [`& .${referenceLineClasses.line}`]: {
    fill: "none",
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: "crispEdges",
    strokeWidth: 1,
    pointerEvents: "none"
  },
  [`& .${referenceLineClasses.label}`]: _extends({
    fill: (theme.vars || theme).palette.text.primary,
    stroke: "none",
    pointerEvents: "none",
    fontSize: 12
  }, theme.typography.body1)
}));

// node_modules/@mui/x-charts/esm/ChartsText/ChartsText.js
init_extends();
init_objectWithoutPropertiesLoose();
var React13 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/internals/getWordsByLines.js
init_extends();

// node_modules/@mui/x-charts/esm/internals/domUtils.js
init_extends();
function isSsr() {
  return typeof window === "undefined";
}
var stringCache = {
  widthCache: {},
  cacheCount: 0
};
var MAX_CACHE_NUM = 2e3;
var SPAN_STYLE = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
};
var STYLE_LIST = ["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height", "top", "left", "fontSize", "padding", "margin", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom"];
var MEASUREMENT_SPAN_ID = "mui_measurement_span";
function autoCompleteStyle(name, value) {
  if (STYLE_LIST.indexOf(name) >= 0 && value === +value) {
    return `${value}px`;
  }
  return value;
}
function camelToMiddleLine(text) {
  const strs = text.split("");
  const formatStrs = strs.reduce((result, entry) => {
    if (entry === entry.toUpperCase()) {
      return [...result, "-", entry.toLowerCase()];
    }
    return [...result, entry];
  }, []);
  return formatStrs.join("");
}
var getStyleString = (style) => Object.keys(style).sort().reduce((result, s2) => `${result}${camelToMiddleLine(s2)}:${autoCompleteStyle(s2, style[s2])};`, "");
var getStringSize = (text, style = {}) => {
  if (text === void 0 || text === null || isSsr()) {
    return {
      width: 0,
      height: 0
    };
  }
  const str = `${text}`;
  const styleString = getStyleString(style);
  const cacheKey2 = `${str}-${styleString}`;
  if (stringCache.widthCache[cacheKey2]) {
    return stringCache.widthCache[cacheKey2];
  }
  try {
    let measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (measurementSpan === null) {
      measurementSpan = document.createElement("span");
      measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute("aria-hidden", "true");
      document.body.appendChild(measurementSpan);
    }
    const measurementSpanStyle = _extends({}, SPAN_STYLE, style);
    Object.keys(measurementSpanStyle).map((styleKey) => {
      measurementSpan.style[camelToMiddleLine(styleKey)] = autoCompleteStyle(styleKey, measurementSpanStyle[styleKey]);
      return styleKey;
    });
    measurementSpan.textContent = str;
    const rect = measurementSpan.getBoundingClientRect();
    const result = {
      width: rect.width,
      height: rect.height
    };
    stringCache.widthCache[cacheKey2] = result;
    if (stringCache.cacheCount + 1 > MAX_CACHE_NUM) {
      stringCache.cacheCount = 0;
      stringCache.widthCache = {};
    } else {
      stringCache.cacheCount += 1;
    }
    return result;
  } catch (e) {
    return {
      width: 0,
      height: 0
    };
  }
};

// node_modules/@mui/x-charts/esm/internals/getWordsByLines.js
function getWordsByLines({
  style,
  needsComputation,
  text
}) {
  return text.split("\n").map((subText) => _extends({
    text: subText
  }, needsComputation ? getStringSize(subText, style) : {
    width: 0,
    height: 0
  }));
}

// node_modules/@mui/x-charts/esm/ChartsText/ChartsText.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var _excluded = ["x", "y", "style", "text", "ownerState"];
var _excluded2 = ["angle", "textAnchor", "dominantBaseline"];
function ChartsText(props) {
  const {
    x: x2,
    y: y2,
    style: styleProps,
    text
  } = props, textProps = _objectWithoutPropertiesLoose(props, _excluded);
  const _ref = styleProps ?? {}, {
    angle,
    textAnchor,
    dominantBaseline
  } = _ref, style = _objectWithoutPropertiesLoose(_ref, _excluded2);
  const wordsByLines = React13.useMemo(() => getWordsByLines({
    style,
    needsComputation: text.includes("\n"),
    text
  }), [style, text]);
  let startDy;
  switch (dominantBaseline) {
    case "hanging":
      startDy = 0;
      break;
    case "central":
      startDy = (wordsByLines.length - 1) / 2 * -wordsByLines[0].height;
      break;
    default:
      startDy = (wordsByLines.length - 1) * -wordsByLines[0].height;
      break;
  }
  const transforms = [];
  if (angle) {
    transforms.push(`rotate(${angle}, ${x2}, ${y2})`);
  }
  if (transforms.length) {
    textProps.transform = transforms.join(" ");
  }
  return (0, import_jsx_runtime6.jsx)("text", _extends({}, textProps, {
    x: x2,
    y: y2,
    textAnchor,
    dominantBaseline,
    style,
    children: wordsByLines.map((line, index2) => (0, import_jsx_runtime6.jsx)("tspan", {
      x: x2,
      dy: `${index2 === 0 ? startDy : wordsByLines[0].height}px`,
      dominantBaseline,
      children: line.text
    }, index2))
  }));
}
true ? ChartsText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Height of a text line (in `em`).
   */
  lineHeight: import_prop_types3.default.number,
  /**
   * If `true`, the line width is computed.
   * @default false
   */
  needsComputation: import_prop_types3.default.bool,
  ownerState: import_prop_types3.default.any,
  /**
   * Style applied to text elements.
   */
  style: import_prop_types3.default.object,
  /**
   * Text displayed.
   */
  text: import_prop_types3.default.string.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/ChartsXReferenceLine.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var getTextParams = ({
  top,
  height,
  spacingY,
  labelAlign = "middle"
}) => {
  switch (labelAlign) {
    case "start":
      return {
        y: top + spacingY,
        style: {
          dominantBaseline: "hanging",
          textAnchor: "start"
        }
      };
    case "end":
      return {
        y: top + height - spacingY,
        style: {
          dominantBaseline: "auto",
          textAnchor: "start"
        }
      };
    default:
      return {
        y: top + height / 2,
        style: {
          dominantBaseline: "central",
          textAnchor: "start"
        }
      };
  }
};
function getXReferenceLineClasses(classes) {
  return composeClasses({
    root: ["root", "vertical"],
    line: ["line"],
    label: ["label"]
  }, getReferenceLineUtilityClass, classes);
}
var warnedOnce2 = false;
function ChartsXReferenceLine(props) {
  const {
    x: x2,
    label = "",
    spacing = 5,
    classes: inClasses,
    labelAlign,
    lineStyle,
    labelStyle,
    axisId
  } = props;
  const {
    top,
    height
  } = useDrawingArea();
  const xAxisScale = useXScale(axisId);
  const xPosition = xAxisScale(x2);
  if (xPosition === void 0) {
    if (true) {
      if (!warnedOnce2) {
        warnedOnce2 = true;
        console.error(`MUI X Charts: the value ${x2} does not exist in the data of x axis with id ${axisId}.`);
      }
    }
    return null;
  }
  const d = `M ${xPosition} ${top} l 0 ${height}`;
  const classes = getXReferenceLineClasses(inClasses);
  const spacingX = typeof spacing === "object" ? spacing.x ?? 0 : spacing;
  const spacingY = typeof spacing === "object" ? spacing.y ?? 0 : spacing;
  const textParams = _extends({
    x: xPosition + spacingX,
    text: label,
    fontSize: 12
  }, getTextParams({
    top,
    height,
    spacingY,
    labelAlign
  }), {
    className: classes.label
  });
  return (0, import_jsx_runtime7.jsxs)(ReferenceLineRoot, {
    className: classes.root,
    children: [(0, import_jsx_runtime7.jsx)("path", {
      d,
      className: classes.line,
      style: lineStyle
    }), (0, import_jsx_runtime7.jsx)(ChartsText, _extends({}, textParams, {
      style: _extends({}, textParams.style, labelStyle)
    }))]
  });
}

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/ChartsYReferenceLine.js
init_extends();
var React15 = __toESM(require_react());
init_composeClasses();
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var getTextParams2 = ({
  left,
  width,
  spacingX,
  labelAlign = "middle"
}) => {
  switch (labelAlign) {
    case "start":
      return {
        x: left + spacingX,
        style: {
          dominantBaseline: "auto",
          textAnchor: "start"
        }
      };
    case "end":
      return {
        x: left + width - spacingX,
        style: {
          dominantBaseline: "auto",
          textAnchor: "end"
        }
      };
    default:
      return {
        x: left + width / 2,
        style: {
          dominantBaseline: "auto",
          textAnchor: "middle"
        }
      };
  }
};
var warnedOnce3 = false;
function getYReferenceLineClasses(classes) {
  return composeClasses({
    root: ["root", "horizontal"],
    line: ["line"],
    label: ["label"]
  }, getReferenceLineUtilityClass, classes);
}
function ChartsYReferenceLine(props) {
  const {
    y: y2,
    label = "",
    spacing = 5,
    classes: inClasses,
    labelAlign,
    lineStyle,
    labelStyle,
    axisId
  } = props;
  const {
    left,
    width
  } = useDrawingArea();
  const yAxisScale = useYScale(axisId);
  const yPosition = yAxisScale(y2);
  if (yPosition === void 0) {
    if (true) {
      if (!warnedOnce3) {
        warnedOnce3 = true;
        console.error(`MUI X Charts: the value ${y2} does not exist in the data of y axis with id ${axisId}.`);
      }
    }
    return null;
  }
  const d = `M ${left} ${yPosition} l ${width} 0`;
  const classes = getYReferenceLineClasses(inClasses);
  const spacingX = typeof spacing === "object" ? spacing.x ?? 0 : spacing;
  const spacingY = typeof spacing === "object" ? spacing.y ?? 0 : spacing;
  const textParams = _extends({
    y: yPosition - spacingY,
    text: label,
    fontSize: 12
  }, getTextParams2({
    left,
    width,
    spacingX,
    labelAlign
  }), {
    className: classes.label
  });
  return (0, import_jsx_runtime8.jsxs)(ReferenceLineRoot, {
    className: classes.root,
    children: [(0, import_jsx_runtime8.jsx)("path", {
      d,
      className: classes.line,
      style: lineStyle
    }), (0, import_jsx_runtime8.jsx)(ChartsText, _extends({}, textParams, {
      style: _extends({}, textParams.style, labelStyle)
    }))]
  });
}

// node_modules/@mui/x-charts/esm/ChartsReferenceLine/ChartsReferenceLine.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
function ChartsReferenceLine(props) {
  const {
    x: x2,
    y: y2
  } = props;
  if (x2 !== void 0 && y2 !== void 0) {
    throw new Error("MUI X Charts: The ChartsReferenceLine cannot have both `x` and `y` props set.");
  }
  if (x2 === void 0 && y2 === void 0) {
    throw new Error("MUI X Charts: The ChartsReferenceLine should have a value in `x` or `y` prop.");
  }
  if (x2 !== void 0) {
    return (0, import_jsx_runtime9.jsx)(ChartsXReferenceLine, _extends({}, props));
  }
  return (0, import_jsx_runtime9.jsx)(ChartsYReferenceLine, _extends({}, props));
}
true ? ChartsReferenceLine.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The id of the axis used for the reference value.
   * @default The `id` of the first defined axis.
   */
  axisId: import_prop_types4.default.oneOfType([import_prop_types4.default.number, import_prop_types4.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types4.default.object,
  /**
   * The label to display along the reference line.
   */
  label: import_prop_types4.default.string,
  /**
   * The alignment if the label is in the chart drawing area.
   * @default 'middle'
   */
  labelAlign: import_prop_types4.default.oneOf(["end", "middle", "start"]),
  /**
   * The style applied to the label.
   */
  labelStyle: import_prop_types4.default.object,
  /**
   * The style applied to the line.
   */
  lineStyle: import_prop_types4.default.object,
  /**
   * Additional space around the label in px.
   * Can be a number or an object `{ x, y }` to distinguish space with the reference line and space with axes.
   * @default 5
   */
  spacing: import_prop_types4.default.oneOfType([import_prop_types4.default.number, import_prop_types4.default.shape({
    x: import_prop_types4.default.number,
    y: import_prop_types4.default.number
  })]),
  /**
   * The x value associated with the reference line.
   * If defined the reference line will be vertical.
   */
  x: import_prop_types4.default.oneOfType([import_prop_types4.default.instanceOf(Date), import_prop_types4.default.number, import_prop_types4.default.string]),
  /**
   * The y value associated with the reference line.
   * If defined the reference line will be horizontal.
   */
  y: import_prop_types4.default.oneOfType([import_prop_types4.default.instanceOf(Date), import_prop_types4.default.number, import_prop_types4.default.string])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsAxis/ChartsAxis.js
init_extends();
var React20 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/ChartsXAxis/ChartsXAxis.js
init_objectWithoutPropertiesLoose();
init_extends();
var React18 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
init_utils();

// node_modules/@mui/x-charts/esm/ChartsAxis/axisClasses.js
init_utils();
function getAxisUtilityClass(slot) {
  return generateUtilityClass("MuiChartsAxis", slot);
}
var axisClasses = generateUtilityClasses("MuiChartsAxis", ["root", "line", "tickContainer", "tick", "tickLabel", "label", "directionX", "directionY", "top", "bottom", "left", "right"]);

// node_modules/@mui/x-charts/esm/internals/components/AxisSharedComponents.js
init_extends();
var AxisRoot = styled_default("g", {
  name: "MuiChartsAxis",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  [`& .${axisClasses.tickLabel}`]: _extends({}, theme.typography.caption, {
    fill: (theme.vars || theme).palette.text.primary
  }),
  [`& .${axisClasses.label}`]: _extends({}, theme.typography.body1, {
    fill: (theme.vars || theme).palette.text.primary
  }),
  [`& .${axisClasses.line}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: "crispEdges",
    strokeWidth: 1
  },
  [`& .${axisClasses.tick}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: "crispEdges"
  }
}));

// node_modules/@mui/x-charts/esm/internals/geometry.js
var ANGLE_APPROX = 5;
var warnedOnce4 = false;
function getMinXTranslation(width, height, angle = 0) {
  if (true) {
    if (!warnedOnce4 && angle > 90 && angle < -90) {
      warnedOnce4 = true;
      console.warn([`MUI X Charts: It seems you applied an angle larger than 90° or smaller than -90° to an axis text.`, `This could cause some text overlapping.`, `If you encounter a use case where it's needed, please open an issue.`].join("\n"));
    }
  }
  const standardAngle = Math.min(Math.abs(angle) % 180, Math.abs(Math.abs(angle) % 180 - 180) % 180);
  if (standardAngle < ANGLE_APPROX) {
    return width;
  }
  if (standardAngle > 90 - ANGLE_APPROX) {
    return height;
  }
  const radAngle = standardAngle * Math.PI / 180;
  const angleSwich = Math.atan2(height, width);
  if (radAngle < angleSwich) {
    return width / Math.cos(radAngle);
  }
  return height / Math.sin(radAngle);
}

// node_modules/@mui/x-charts/esm/hooks/useMounted.js
var React17 = __toESM(require_react());
init_useEnhancedEffect();
function useMounted(defer = false) {
  const [mountedState, setMountedState] = React17.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React17.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return mountedState;
}

// node_modules/@mui/x-charts/esm/ChartsXAxis/ChartsXAxis.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var _excluded3 = ["scale", "tickNumber", "reverse"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    position
  } = ownerState;
  const slots = {
    root: ["root", "directionX", position],
    line: ["line"],
    tickContainer: ["tickContainer"],
    tick: ["tick"],
    tickLabel: ["tickLabel"],
    label: ["label"]
  };
  return composeClasses(slots, getAxisUtilityClass, classes);
};
function addLabelDimension(xTicks, {
  tickLabelStyle: style,
  tickLabelInterval,
  reverse: reverse2,
  isMounted
}) {
  const withDimension = xTicks.map((tick) => {
    if (!isMounted || tick.formattedValue === void 0) {
      return _extends({}, tick, {
        width: 0,
        height: 0
      });
    }
    const tickSizes = getWordsByLines({
      style,
      needsComputation: true,
      text: tick.formattedValue
    });
    return _extends({}, tick, {
      width: Math.max(...tickSizes.map((size) => size.width)),
      height: Math.max(tickSizes.length * tickSizes[0].height)
    });
  });
  if (typeof tickLabelInterval === "function") {
    return withDimension.map((item, index2) => _extends({}, item, {
      skipLabel: !tickLabelInterval(item.value, index2)
    }));
  }
  let currentTextLimit = 0;
  let previousTextLimit = 0;
  const direction = reverse2 ? -1 : 1;
  return withDimension.map((item, labelIndex) => {
    const {
      width,
      offset,
      labelOffset,
      height
    } = item;
    const distance = getMinXTranslation(width, height, style == null ? void 0 : style.angle);
    const textPosition = offset + labelOffset;
    const gapRatio = 1.2;
    currentTextLimit = textPosition - direction * (gapRatio * distance) / 2;
    if (labelIndex > 0 && direction * currentTextLimit < direction * previousTextLimit) {
      return _extends({}, item, {
        skipLabel: true
      });
    }
    previousTextLimit = textPosition + direction * (gapRatio * distance) / 2;
    return item;
  });
}
var defaultProps = {
  position: "bottom",
  disableLine: false,
  disableTicks: false,
  tickSize: 6
};
function ChartsXAxis(inProps) {
  const props = useThemeProps({
    props: _extends({}, defaultProps, inProps),
    name: "MuiChartsXAxis"
  });
  const {
    xAxisIds
  } = React18.useContext(CartesianContext);
  const _React$useContext = React18.useContext(CartesianContext), _ref = props.axisId ?? xAxisIds[0], {
    xAxis: {
      [_ref]: {
        scale: xScale,
        tickNumber,
        reverse: reverse2
      }
    }
  } = _React$useContext, settings = _objectWithoutPropertiesLoose(_React$useContext.xAxis[_ref], _excluded3);
  const isMounted = useMounted();
  const defaultizedProps = _extends({}, defaultProps, settings, props);
  const {
    position,
    disableLine,
    disableTicks,
    tickLabelStyle,
    label,
    labelStyle,
    tickFontSize,
    labelFontSize,
    tickSize: tickSizeProp,
    valueFormatter,
    slots,
    slotProps,
    tickInterval,
    tickLabelInterval,
    tickPlacement,
    tickLabelPlacement
  } = defaultizedProps;
  const theme = useTheme();
  const classes = useUtilityClasses(_extends({}, defaultizedProps, {
    theme
  }));
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const positionSign = position === "bottom" ? 1 : -1;
  const Line = (slots == null ? void 0 : slots.axisLine) ?? "line";
  const Tick = (slots == null ? void 0 : slots.axisTick) ?? "line";
  const TickLabel = (slots == null ? void 0 : slots.axisTickLabel) ?? ChartsText;
  const Label = (slots == null ? void 0 : slots.axisLabel) ?? ChartsText;
  const axisTickLabelProps = useSlotProps({
    elementType: TickLabel,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisTickLabel,
    additionalProps: {
      style: _extends({
        textAnchor: "middle",
        dominantBaseline: position === "bottom" ? "hanging" : "auto",
        fontSize: tickFontSize ?? 12
      }, tickLabelStyle)
    },
    className: classes.tickLabel,
    ownerState: {}
  });
  const xTicks = useTicks({
    scale: xScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement
  });
  const xTicksWithDimension = addLabelDimension(xTicks, {
    tickLabelStyle: axisTickLabelProps.style,
    tickLabelInterval,
    reverse: reverse2,
    isMounted
  });
  const labelRefPoint = {
    x: left + width / 2,
    y: positionSign * (tickSize + 22)
  };
  const axisLabelProps = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLabel,
    additionalProps: {
      style: _extends({
        fontSize: labelFontSize ?? 14,
        textAnchor: "middle",
        dominantBaseline: position === "bottom" ? "hanging" : "auto"
      }, labelStyle)
    },
    ownerState: {}
  });
  const domain = xScale.domain();
  if (domain.length === 0 || domain[0] === domain[1]) {
    return null;
  }
  return (0, import_jsx_runtime10.jsxs)(AxisRoot, {
    transform: `translate(0, ${position === "bottom" ? top + height : top})`,
    className: classes.root,
    children: [!disableLine && (0, import_jsx_runtime10.jsx)(Line, _extends({
      x1: xScale.range()[0],
      x2: xScale.range()[1],
      className: classes.line
    }, slotProps == null ? void 0 : slotProps.axisLine)), xTicksWithDimension.map(({
      formattedValue,
      offset,
      labelOffset,
      skipLabel
    }, index2) => {
      const xTickLabel = labelOffset ?? 0;
      const yTickLabel = positionSign * (tickSize + 3);
      return (0, import_jsx_runtime10.jsxs)("g", {
        transform: `translate(${offset}, 0)`,
        className: classes.tickContainer,
        children: [!disableTicks && (0, import_jsx_runtime10.jsx)(Tick, _extends({
          y2: positionSign * tickSize,
          className: classes.tick
        }, slotProps == null ? void 0 : slotProps.axisTick)), formattedValue !== void 0 && !skipLabel && (0, import_jsx_runtime10.jsx)(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel
        }, axisTickLabelProps, {
          text: formattedValue.toString()
        }))]
      }, index2);
    }), label && (0, import_jsx_runtime10.jsx)("g", {
      className: classes.label,
      children: (0, import_jsx_runtime10.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}
true ? ChartsXAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The id of the axis to render.
   * If undefined, it will be the first defined axis.
   */
  axisId: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types5.default.object,
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine: import_prop_types5.default.bool,
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks: import_prop_types5.default.bool,
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill: import_prop_types5.default.string,
  /**
   * The label of the axis.
   */
  label: import_prop_types5.default.string,
  /**
   * The font size of the axis label.
   * @default 14
   * @deprecated Consider using `labelStyle.fontSize` instead.
   */
  labelFontSize: import_prop_types5.default.number,
  /**
   * The style applied to the axis label.
   */
  labelStyle: import_prop_types5.default.object,
  /**
   * Position of the axis.
   */
  position: import_prop_types5.default.oneOf(["bottom", "top"]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types5.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types5.default.object,
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke: import_prop_types5.default.string,
  /**
   * The font size of the axis ticks text.
   * @default 12
   * @deprecated Consider using `tickLabelStyle.fontSize` instead.
   */
  tickFontSize: import_prop_types5.default.number,
  /**
   * Defines which ticks are displayed. Its value can be:
   * - 'auto' In such case the ticks are computed based on axis scale and other parameters.
   * - a filtering function of the form `(value, index) => boolean` which is available only if the axis has a data property.
   * - an array containing the values where ticks should be displayed.
   * @default 'auto'
   */
  tickInterval: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["auto"]), import_prop_types5.default.array, import_prop_types5.default.func]),
  /**
   * Defines which ticks get its label displayed. Its value can be:
   * - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
   * - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
   * @default 'auto'
   */
  tickLabelInterval: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["auto"]), import_prop_types5.default.func]),
  /**
   * The placement of ticks label. Can be the middle of the band, or the tick position.
   * Only used if scale is 'band'.
   * @default 'middle'
   */
  tickLabelPlacement: import_prop_types5.default.oneOf(["middle", "tick"]),
  /**
   * The style applied to ticks text.
   */
  tickLabelStyle: import_prop_types5.default.object,
  /**
   * Maximal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMaxStep: import_prop_types5.default.number,
  /**
   * Minimal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMinStep: import_prop_types5.default.number,
  /**
   * The number of ticks. This number is not guaranteed.
   * Not supported by categorical axis (band, points).
   */
  tickNumber: import_prop_types5.default.number,
  /**
   * The placement of ticks in regard to the band interval.
   * Only used if scale is 'band'.
   * @default 'extremities'
   */
  tickPlacement: import_prop_types5.default.oneOf(["end", "extremities", "middle", "start"]),
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize: import_prop_types5.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsYAxis/ChartsYAxis.js
init_objectWithoutPropertiesLoose();
init_extends();
var React19 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());
init_utils();
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var _excluded4 = ["scale", "tickNumber"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    position
  } = ownerState;
  const slots = {
    root: ["root", "directionY", position],
    line: ["line"],
    tickContainer: ["tickContainer"],
    tick: ["tick"],
    tickLabel: ["tickLabel"],
    label: ["label"]
  };
  return composeClasses(slots, getAxisUtilityClass, classes);
};
var defaultProps2 = {
  position: "left",
  disableLine: false,
  disableTicks: false,
  tickFontSize: 12,
  labelFontSize: 14,
  tickSize: 6
};
function ChartsYAxis(inProps) {
  const props = useThemeProps({
    props: _extends({}, defaultProps2, inProps),
    name: "MuiChartsYAxis"
  });
  const {
    yAxisIds
  } = React19.useContext(CartesianContext);
  const _React$useContext = React19.useContext(CartesianContext), _ref = props.axisId ?? yAxisIds[0], {
    yAxis: {
      [_ref]: {
        scale: yScale,
        tickNumber
      }
    }
  } = _React$useContext, settings = _objectWithoutPropertiesLoose(_React$useContext.yAxis[_ref], _excluded4);
  const defaultizedProps = _extends({}, defaultProps2, settings, props);
  const {
    position,
    disableLine,
    disableTicks,
    tickFontSize,
    label,
    labelFontSize,
    labelStyle,
    tickLabelStyle,
    tickSize: tickSizeProp,
    valueFormatter,
    slots,
    slotProps,
    tickPlacement,
    tickLabelPlacement,
    tickInterval,
    tickLabelInterval
  } = defaultizedProps;
  const theme = useTheme();
  const classes = useUtilityClasses2(_extends({}, defaultizedProps, {
    theme
  }));
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const yTicks = useTicks({
    scale: yScale,
    tickNumber,
    valueFormatter,
    tickPlacement,
    tickLabelPlacement,
    tickInterval
  });
  const positionSign = position === "right" ? 1 : -1;
  const labelRefPoint = {
    x: positionSign * (tickFontSize + tickSize + 10),
    y: top + height / 2
  };
  const Line = (slots == null ? void 0 : slots.axisLine) ?? "line";
  const Tick = (slots == null ? void 0 : slots.axisTick) ?? "line";
  const TickLabel = (slots == null ? void 0 : slots.axisTickLabel) ?? ChartsText;
  const Label = (slots == null ? void 0 : slots.axisLabel) ?? ChartsText;
  const axisTickLabelProps = useSlotProps({
    elementType: TickLabel,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisTickLabel,
    additionalProps: {
      style: _extends({
        fontSize: tickFontSize,
        textAnchor: position === "right" ? "start" : "end",
        dominantBaseline: "central"
      }, tickLabelStyle)
    },
    className: classes.tickLabel,
    ownerState: {}
  });
  const axisLabelProps = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLabel,
    additionalProps: {
      style: _extends({
        fontSize: labelFontSize,
        angle: positionSign * 90,
        textAnchor: "middle",
        dominantBaseline: "auto"
      }, labelStyle)
    },
    ownerState: {}
  });
  const domain = yScale.domain();
  if (domain.length === 0 || domain[0] === domain[1]) {
    return null;
  }
  return (0, import_jsx_runtime11.jsxs)(AxisRoot, {
    transform: `translate(${position === "right" ? left + width : left}, 0)`,
    className: classes.root,
    children: [!disableLine && (0, import_jsx_runtime11.jsx)(Line, _extends({
      y1: yScale.range()[0],
      y2: yScale.range()[1],
      className: classes.line
    }, slotProps == null ? void 0 : slotProps.axisLine)), yTicks.map(({
      formattedValue,
      offset,
      labelOffset,
      value
    }, index2) => {
      const xTickLabel = positionSign * (tickSize + 2);
      const yTickLabel = labelOffset;
      const skipLabel = typeof tickLabelInterval === "function" && !(tickLabelInterval == null ? void 0 : tickLabelInterval(value, index2));
      return (0, import_jsx_runtime11.jsxs)("g", {
        transform: `translate(0, ${offset})`,
        className: classes.tickContainer,
        children: [!disableTicks && (0, import_jsx_runtime11.jsx)(Tick, _extends({
          x2: positionSign * tickSize,
          className: classes.tick
        }, slotProps == null ? void 0 : slotProps.axisTick)), formattedValue !== void 0 && !skipLabel && (0, import_jsx_runtime11.jsx)(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel,
          text: formattedValue.toString()
        }, axisTickLabelProps))]
      }, index2);
    }), label && (0, import_jsx_runtime11.jsx)("g", {
      className: classes.label,
      children: (0, import_jsx_runtime11.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}
true ? ChartsYAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The id of the axis to render.
   * If undefined, it will be the first defined axis.
   */
  axisId: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types6.default.object,
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine: import_prop_types6.default.bool,
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks: import_prop_types6.default.bool,
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill: import_prop_types6.default.string,
  /**
   * The label of the axis.
   */
  label: import_prop_types6.default.string,
  /**
   * The font size of the axis label.
   * @default 14
   * @deprecated Consider using `labelStyle.fontSize` instead.
   */
  labelFontSize: import_prop_types6.default.number,
  /**
   * The style applied to the axis label.
   */
  labelStyle: import_prop_types6.default.object,
  /**
   * Position of the axis.
   */
  position: import_prop_types6.default.oneOf(["left", "right"]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types6.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types6.default.object,
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke: import_prop_types6.default.string,
  /**
   * The font size of the axis ticks text.
   * @default 12
   * @deprecated Consider using `tickLabelStyle.fontSize` instead.
   */
  tickFontSize: import_prop_types6.default.number,
  /**
   * Defines which ticks are displayed. Its value can be:
   * - 'auto' In such case the ticks are computed based on axis scale and other parameters.
   * - a filtering function of the form `(value, index) => boolean` which is available only if the axis has a data property.
   * - an array containing the values where ticks should be displayed.
   * @default 'auto'
   */
  tickInterval: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["auto"]), import_prop_types6.default.array, import_prop_types6.default.func]),
  /**
   * Defines which ticks get its label displayed. Its value can be:
   * - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
   * - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
   * @default 'auto'
   */
  tickLabelInterval: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["auto"]), import_prop_types6.default.func]),
  /**
   * The placement of ticks label. Can be the middle of the band, or the tick position.
   * Only used if scale is 'band'.
   * @default 'middle'
   */
  tickLabelPlacement: import_prop_types6.default.oneOf(["middle", "tick"]),
  /**
   * The style applied to ticks text.
   */
  tickLabelStyle: import_prop_types6.default.object,
  /**
   * Maximal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMaxStep: import_prop_types6.default.number,
  /**
   * Minimal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMinStep: import_prop_types6.default.number,
  /**
   * The number of ticks. This number is not guaranteed.
   * Not supported by categorical axis (band, points).
   */
  tickNumber: import_prop_types6.default.number,
  /**
   * The placement of ticks in regard to the band interval.
   * Only used if scale is 'band'.
   * @default 'extremities'
   */
  tickPlacement: import_prop_types6.default.oneOf(["end", "extremities", "middle", "start"]),
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize: import_prop_types6.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsAxis/ChartsAxis.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var getAxisId = (propsValue, defaultAxisId) => {
  if (propsValue == null) {
    return null;
  }
  if (typeof propsValue === "object") {
    return propsValue.axisId ?? defaultAxisId ?? null;
  }
  return propsValue;
};
var mergeProps = (axisConfig, slots, slotProps) => {
  return typeof axisConfig === "object" ? _extends({}, axisConfig, {
    slots: _extends({}, slots, axisConfig == null ? void 0 : axisConfig.slots),
    slotProps: _extends({}, slotProps, axisConfig == null ? void 0 : axisConfig.slotProps)
  }) : {
    slots,
    slotProps
  };
};
function ChartsAxis(props) {
  const {
    topAxis,
    leftAxis,
    rightAxis,
    bottomAxis,
    slots,
    slotProps
  } = props;
  const {
    xAxis,
    xAxisIds,
    yAxis,
    yAxisIds
  } = React20.useContext(CartesianContext);
  const leftId = getAxisId(leftAxis === void 0 ? yAxisIds[0] : leftAxis, yAxisIds[0]);
  const bottomId = getAxisId(bottomAxis === void 0 ? xAxisIds[0] : bottomAxis, xAxisIds[0]);
  const topId = getAxisId(topAxis, xAxisIds[0]);
  const rightId = getAxisId(rightAxis, yAxisIds[0]);
  if (topId !== null && !xAxis[topId]) {
    throw Error([`MUI X Charts: id used for top axis "${topId}" is not defined.`, `Available ids are: ${xAxisIds.join(", ")}.`].join("\n"));
  }
  if (leftId !== null && !yAxis[leftId]) {
    throw Error([`MUI X Charts: id used for left axis "${leftId}" is not defined.`, `Available ids are: ${yAxisIds.join(", ")}.`].join("\n"));
  }
  if (rightId !== null && !yAxis[rightId]) {
    throw Error([`MUI X Charts: id used for right axis "${rightId}" is not defined.`, `Available ids are: ${yAxisIds.join(", ")}.`].join("\n"));
  }
  if (bottomId !== null && !xAxis[bottomId]) {
    throw Error([`MUI X Charts: id used for bottom axis "${bottomId}" is not defined.`, `Available ids are: ${xAxisIds.join(", ")}.`].join("\n"));
  }
  const topAxisProps = mergeProps(topAxis, slots, slotProps);
  const bottomAxisProps = mergeProps(bottomAxis, slots, slotProps);
  const leftAxisProps = mergeProps(leftAxis, slots, slotProps);
  const rightAxisProps = mergeProps(rightAxis, slots, slotProps);
  return (0, import_jsx_runtime12.jsxs)(React20.Fragment, {
    children: [topId && (0, import_jsx_runtime12.jsx)(ChartsXAxis, _extends({}, topAxisProps, {
      position: "top",
      axisId: topId
    })), bottomId && (0, import_jsx_runtime12.jsx)(ChartsXAxis, _extends({}, bottomAxisProps, {
      position: "bottom",
      axisId: bottomId
    })), leftId && (0, import_jsx_runtime12.jsx)(ChartsYAxis, _extends({}, leftAxisProps, {
      position: "left",
      axisId: leftId
    })), rightId && (0, import_jsx_runtime12.jsx)(ChartsYAxis, _extends({}, rightAxisProps, {
      position: "right",
      axisId: rightId
    }))]
  });
}
true ? ChartsAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Indicate which axis to display the bottom of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default xAxisIds[0] The id of the first provided axis
   */
  bottomAxis: import_prop_types7.default.oneOfType([import_prop_types7.default.object, import_prop_types7.default.string]),
  /**
   * Indicate which axis to display the left of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default yAxisIds[0] The id of the first provided axis
   */
  leftAxis: import_prop_types7.default.oneOfType([import_prop_types7.default.object, import_prop_types7.default.string]),
  /**
   * Indicate which axis to display the right of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  rightAxis: import_prop_types7.default.oneOfType([import_prop_types7.default.object, import_prop_types7.default.string]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types7.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types7.default.object,
  /**
   * Indicate which axis to display the top of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  topAxis: import_prop_types7.default.oneOfType([import_prop_types7.default.object, import_prop_types7.default.string])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsGrid/ChartsGrid.js
init_extends();
init_objectWithoutPropertiesLoose();
var React21 = __toESM(require_react());
var import_prop_types8 = __toESM(require_prop_types());
init_composeClasses();

// node_modules/@mui/x-charts/esm/ChartsGrid/chartsGridClasses.js
init_generateUtilityClass();
init_generateUtilityClasses();
function getChartsGridUtilityClass(slot) {
  return generateUtilityClass("MuiChartsGrid", slot);
}
var chartsGridClasses = generateUtilityClasses("MuiChartsGrid", ["root", "line", "horizontalLine", "verticalLine"]);

// node_modules/@mui/x-charts/esm/ChartsGrid/ChartsGrid.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var _excluded5 = ["vertical", "horizontal"];
var GridRoot = styled_default("g", {
  name: "MuiChartsGrid",
  slot: "Root",
  overridesResolver: (props, styles) => [{
    [`&.${chartsGridClasses.verticalLine}`]: styles.verticalLine
  }, {
    [`&.${chartsGridClasses.horizontalLine}`]: styles.horizontalLine
  }, styles.root]
})({});
var GridLine = styled_default("line", {
  name: "MuiChartsGrid",
  slot: "Line",
  overridesResolver: (props, styles) => styles.line
})(({
  theme
}) => ({
  stroke: (theme.vars || theme).palette.divider,
  shapeRendering: "crispEdges",
  strokeWidth: 1
}));
var useUtilityClasses3 = ({
  classes
}) => {
  const slots = {
    root: ["root"],
    verticalLine: ["line", "verticalLine"],
    horizontalLine: ["line", "horizontalLine"]
  };
  return composeClasses(slots, getChartsGridUtilityClass, classes);
};
function ChartsGrid(props) {
  const themeProps = useThemeProps({
    props,
    name: "MuiChartsGrid"
  });
  const {
    vertical,
    horizontal
  } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded5);
  const {
    xAxis,
    xAxisIds,
    yAxis,
    yAxisIds
  } = React21.useContext(CartesianContext);
  const classes = useUtilityClasses3(themeProps);
  const horizontalAxisId = yAxisIds[0];
  const verticalAxisId = xAxisIds[0];
  const {
    scale: xScale,
    tickNumber: xTickNumber,
    tickInterval: xTickInterval
  } = xAxis[verticalAxisId];
  const {
    scale: yScale,
    tickNumber: yTickNumber,
    tickInterval: yTickInterval
  } = yAxis[horizontalAxisId];
  const xTicks = useTicks({
    scale: xScale,
    tickNumber: xTickNumber,
    tickInterval: xTickInterval
  });
  const yTicks = useTicks({
    scale: yScale,
    tickNumber: yTickNumber,
    tickInterval: yTickInterval
  });
  return (0, import_jsx_runtime13.jsxs)(GridRoot, _extends({}, other, {
    className: classes.root,
    children: [vertical && xTicks.map(({
      formattedValue,
      offset
    }) => (0, import_jsx_runtime13.jsx)(GridLine, {
      y1: yScale.range()[0],
      y2: yScale.range()[1],
      x1: offset,
      x2: offset,
      className: classes.verticalLine
    }, `vertical-${formattedValue}`)), horizontal && yTicks.map(({
      formattedValue,
      offset
    }) => (0, import_jsx_runtime13.jsx)(GridLine, {
      y1: offset,
      y2: offset,
      x1: xScale.range()[0],
      x2: xScale.range()[1],
      className: classes.horizontalLine
    }, `horizontal-${formattedValue}`))]
  }));
}
true ? ChartsGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types8.default.object,
  /**
   * Displays horizontal grid.
   */
  horizontal: import_prop_types8.default.bool,
  /**
   * Displays vertical grid.
   */
  vertical: import_prop_types8.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltip.js
init_extends();
var React28 = __toESM(require_react());
var import_prop_types13 = __toESM(require_prop_types());
init_composeClasses();

// node_modules/@mui/x-charts/esm/context/InteractionProvider.js
init_extends();
var React22 = __toESM(require_react());
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var InteractionContext = React22.createContext({
  item: null,
  axis: {
    x: null,
    y: null
  },
  useVoronoiInteraction: false,
  dispatch: () => null
});
if (true) {
  InteractionContext.displayName = "InteractionContext";
}
var dataReducer = (prevState, action) => {
  switch (action.type) {
    case "enterItem":
      return _extends({}, prevState, {
        item: action.data
      });
    case "exitChart":
      if (prevState.item === null && prevState.axis.x === null && prevState.axis.y === null) {
        return prevState;
      }
      return _extends({}, prevState, {
        axis: {
          x: null,
          y: null
        },
        item: null
      });
    case "updateVoronoiUsage":
      return _extends({}, prevState, {
        useVoronoiInteraction: action.useVoronoiInteraction
      });
    case "leaveItem":
      if (prevState.item === null || Object.keys(action.data).some((key) => action.data[key] !== prevState.item[key])) {
        return prevState;
      }
      return _extends({}, prevState, {
        item: null
      });
    case "updateAxis":
      if (action.data.x === prevState.axis.x && action.data.y === prevState.axis.y) {
        return prevState;
      }
      return _extends({}, prevState, {
        axis: action.data
      });
    default:
      return prevState;
  }
};
function InteractionProvider(props) {
  const {
    children
  } = props;
  const [data, dispatch] = React22.useReducer(dataReducer, {
    item: null,
    axis: {
      x: null,
      y: null
    },
    useVoronoiInteraction: false
  });
  const value = React22.useMemo(() => _extends({}, data, {
    dispatch
  }), [data]);
  return (0, import_jsx_runtime14.jsx)(InteractionContext.Provider, {
    value,
    children
  });
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/utils.js
var React23 = __toESM(require_react());
function generateVirtualElement(mousePosition) {
  if (mousePosition === null) {
    return {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: () => ""
      })
    };
  }
  const {
    x: x2,
    y: y2
  } = mousePosition;
  return {
    getBoundingClientRect: () => ({
      width: 0,
      height: 0,
      x: x2,
      y: y2,
      top: y2,
      right: x2,
      bottom: y2,
      left: x2,
      toJSON: () => JSON.stringify({
        width: 0,
        height: 0,
        x: x2,
        y: y2,
        top: y2,
        right: x2,
        bottom: y2,
        left: x2
      })
    })
  };
}
function useMouseTracker() {
  const svgRef = React23.useContext(SvgContext);
  const [mousePosition, setMousePosition] = React23.useState(null);
  React23.useEffect(() => {
    const element = svgRef.current;
    if (element === null) {
      return () => {
      };
    }
    const handleOut = () => {
      setMousePosition(null);
    };
    const handleMove = (event) => {
      const target = "targetTouches" in event ? event.targetTouches[0] : event;
      setMousePosition({
        x: target.clientX,
        y: target.clientY
      });
    };
    element.addEventListener("mouseout", handleOut);
    element.addEventListener("mousemove", handleMove);
    element.addEventListener("touchend", handleOut);
    element.addEventListener("touchmove", handleMove);
    return () => {
      element.removeEventListener("mouseout", handleOut);
      element.removeEventListener("mousemove", handleMove);
      element.addEventListener("touchend", handleOut);
      element.addEventListener("touchmove", handleMove);
    };
  }, [svgRef]);
  return mousePosition;
}
function getTooltipHasData(trigger, displayedData) {
  if (trigger === "item") {
    return displayedData !== null;
  }
  const hasAxisXData = displayedData.x !== null;
  const hasAxisYData = displayedData.y !== null;
  return hasAxisXData || hasAxisYData;
}
function isCartesianSeriesType(seriesType) {
  return ["bar", "line", "scatter"].includes(seriesType);
}
function isCartesianSeries(series) {
  return isCartesianSeriesType(series.type);
}
function utcFormatter(v2) {
  if (v2 instanceof Date) {
    return v2.toUTCString();
  }
  return v2.toLocaleString();
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsItemTooltipContent.js
init_extends();
var React25 = __toESM(require_react());
var import_prop_types10 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/ChartsTooltip/DefaultChartsItemTooltipContent.js
init_extends();
var React24 = __toESM(require_react());
var import_prop_types9 = __toESM(require_prop_types());
init_clsx();

// node_modules/@mui/x-charts/esm/ChartsTooltip/chartsTooltipClasses.js
init_utils();
function getChartsTooltipUtilityClass(slot) {
  return generateUtilityClass("MuiChartsTooltip", slot);
}
var chartsTooltipClasses = generateUtilityClasses("MuiChartsTooltip", ["root", "table", "row", "cell", "mark", "markCell", "labelCell", "valueCell"]);

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltipTable.js
var ChartsTooltipPaper = styled_default("div", {
  name: "MuiChartsTooltip",
  slot: "Container"
})(({
  theme
}) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.primary,
  transition: theme.transitions.create("box-shadow"),
  borderRadius: theme.shape.borderRadius
}));
var ChartsTooltipTable = styled_default("table", {
  name: "MuiChartsTooltip",
  slot: "Table"
})(({
  theme
}) => ({
  borderSpacing: 0,
  "& thead td": {
    borderBottom: `solid ${(theme.vars || theme).palette.divider} 1px`
  }
}));
var ChartsTooltipRow = styled_default("tr", {
  name: "MuiChartsTooltip",
  slot: "Row"
})(({
  theme
}) => ({
  "tr:first-of-type& td": {
    paddingTop: theme.spacing(1)
  },
  "tr:last-of-type& td": {
    paddingBottom: theme.spacing(1)
  }
}));
var ChartsTooltipCell = styled_default("td", {
  name: "MuiChartsTooltip",
  slot: "Cell"
})(({
  theme
}) => ({
  verticalAlign: "middle",
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${chartsTooltipClasses.labelCell}`]: {
    paddingLeft: theme.spacing(1)
  },
  [`&.${chartsTooltipClasses.valueCell}`]: {
    paddingLeft: theme.spacing(4),
    color: (theme.vars || theme).palette.text.primary
  },
  "td:first-of-type&": {
    paddingLeft: theme.spacing(2)
  },
  "td:last-of-type&": {
    paddingRight: theme.spacing(2)
  }
}));
var ChartsTooltipMark = styled_default("div", {
  name: "MuiChartsTooltip",
  slot: "Mark",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "color"
})(({
  theme,
  color: color2
}) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  borderRadius: "50%",
  boxShadow: theme.shadows[1],
  backgroundColor: color2,
  borderColor: (theme.vars || theme).palette.background.paper,
  border: `solid ${(theme.vars || theme).palette.background.paper} ${theme.spacing(0.25)}`,
  boxSizing: "content-box"
}));

// node_modules/@mui/x-charts/esm/ChartsTooltip/DefaultChartsItemTooltipContent.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
function DefaultChartsItemTooltipContent(props) {
  var _a;
  const {
    series,
    itemData,
    sx,
    classes,
    getColor: getColor6
  } = props;
  if (itemData.dataIndex === void 0 || !series.data[itemData.dataIndex]) {
    return null;
  }
  const {
    displayedLabel,
    color: color2
  } = series.type === "pie" ? {
    color: getColor6(itemData.dataIndex),
    displayedLabel: getLabel(series.data[itemData.dataIndex].label, "tooltip")
  } : {
    color: getColor6(itemData.dataIndex) ?? series.color,
    displayedLabel: getLabel(series.label, "tooltip")
  };
  const value = series.type === "pie" ? _extends({}, series.data[itemData.dataIndex], {
    label: getLabel(series.data[itemData.dataIndex].label, "tooltip")
  }) : series.data[itemData.dataIndex];
  const formattedValue = (_a = series.valueFormatter) == null ? void 0 : _a.call(series, value, {
    dataIndex: itemData.dataIndex
  });
  return (0, import_jsx_runtime15.jsx)(ChartsTooltipPaper, {
    sx,
    className: classes.root,
    children: (0, import_jsx_runtime15.jsx)(ChartsTooltipTable, {
      className: classes.table,
      children: (0, import_jsx_runtime15.jsx)("tbody", {
        children: (0, import_jsx_runtime15.jsxs)(ChartsTooltipRow, {
          className: classes.row,
          children: [(0, import_jsx_runtime15.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.markCell, classes.cell),
            children: (0, import_jsx_runtime15.jsx)(ChartsTooltipMark, {
              color: color2,
              className: classes.mark
            })
          }), (0, import_jsx_runtime15.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.labelCell, classes.cell),
            children: displayedLabel
          }), (0, import_jsx_runtime15.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.valueCell, classes.cell),
            children: formattedValue
          })]
        })
      })
    })
  });
}
true ? DefaultChartsItemTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types9.default.object.isRequired,
  /**
   * Get the color of the item with index `dataIndex`.
   * @param {number} dataIndex The data index of the item.
   * @returns {string} The color to display.
   */
  getColor: import_prop_types9.default.func.isRequired,
  /**
   * The data used to identify the triggered item.
   */
  itemData: import_prop_types9.default.shape({
    dataIndex: import_prop_types9.default.number,
    seriesId: import_prop_types9.default.oneOfType([import_prop_types9.default.number, import_prop_types9.default.string]).isRequired,
    type: import_prop_types9.default.oneOf(["bar", "line", "pie", "scatter"]).isRequired
  }).isRequired,
  /**
   * The series linked to the triggered axis.
   */
  series: import_prop_types9.default.object.isRequired,
  sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/BarChart/getColor.js
function getColor(series, xAxis, yAxis) {
  const verticalLayout = series.layout === "vertical";
  const bandColorScale = verticalLayout ? xAxis.colorScale : yAxis.colorScale;
  const valueColorScale = verticalLayout ? yAxis.colorScale : xAxis.colorScale;
  const bandValues = verticalLayout ? xAxis.data : yAxis.data;
  if (valueColorScale) {
    return (dataIndex) => {
      const value = series.data[dataIndex];
      const color2 = value === null ? series.color : valueColorScale(value);
      if (color2 === null) {
        return series.color;
      }
      return color2;
    };
  }
  if (bandColorScale) {
    return (dataIndex) => {
      const value = bandValues[dataIndex];
      const color2 = value === null ? series.color : bandColorScale(value);
      if (color2 === null) {
        return series.color;
      }
      return color2;
    };
  }
  return () => series.color;
}

// node_modules/@mui/x-charts/esm/LineChart/getColor.js
function getColor2(series, xAxis, yAxis) {
  const yColorScale = yAxis.colorScale;
  const xColorScale = xAxis.colorScale;
  if (yColorScale) {
    return (dataIndex) => {
      const value = series.data[dataIndex];
      const color2 = value === null ? series.color : yColorScale(value);
      if (color2 === null) {
        return series.color;
      }
      return color2;
    };
  }
  if (xColorScale) {
    return (dataIndex) => {
      var _a;
      const value = (_a = xAxis.data) == null ? void 0 : _a[dataIndex];
      const color2 = value === null ? series.color : xColorScale(value);
      if (color2 === null) {
        return series.color;
      }
      return color2;
    };
  }
  return () => series.color;
}

// node_modules/@mui/x-charts/esm/ScatterChart/getColor.js
function getColor3(series, xAxis, yAxis, zAxis) {
  const zColorScale = zAxis == null ? void 0 : zAxis.colorScale;
  const yColorScale = yAxis.colorScale;
  const xColorScale = xAxis.colorScale;
  if (zColorScale) {
    return (dataIndex) => {
      var _a, _b;
      if (((_a = zAxis == null ? void 0 : zAxis.data) == null ? void 0 : _a[dataIndex]) !== void 0) {
        const color3 = zColorScale((_b = zAxis == null ? void 0 : zAxis.data) == null ? void 0 : _b[dataIndex]);
        if (color3 !== null) {
          return color3;
        }
      }
      const value = series.data[dataIndex];
      const color2 = value === null ? series.color : zColorScale(value.z);
      if (color2 === null) {
        return series.color;
      }
      return color2;
    };
  }
  if (yColorScale) {
    return (dataIndex) => {
      const value = series.data[dataIndex];
      const color2 = value === null ? series.color : yColorScale(value.y);
      if (color2 === null) {
        return series.color;
      }
      return color2;
    };
  }
  if (xColorScale) {
    return (dataIndex) => {
      const value = series.data[dataIndex];
      const color2 = value === null ? series.color : xColorScale(value.x);
      if (color2 === null) {
        return series.color;
      }
      return color2;
    };
  }
  return () => series.color;
}

// node_modules/@mui/x-charts/esm/PieChart/getColor.js
function getColor4(series) {
  return (dataIndex) => {
    return series.data[dataIndex].color;
  };
}

// node_modules/@mui/x-charts/esm/internals/colorGetter.js
function getColor5(series, xAxis, yAxis, zAxis) {
  if (xAxis !== void 0 && yAxis !== void 0) {
    if (series.type === "bar") {
      return getColor(series, xAxis, yAxis);
    }
    if (series.type === "line") {
      return getColor2(series, xAxis, yAxis);
    }
    if (series.type === "scatter") {
      return getColor3(series, xAxis, yAxis, zAxis);
    }
  }
  if (series.type === "pie") {
    return getColor4(series);
  }
  throw Error(`MUI X Charts: getColor called with unexpected arguments for series with id "${series.id}"`);
}
var colorGetter_default = getColor5;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsItemTooltipContent.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
function ChartsItemTooltipContent(props) {
  const {
    content,
    itemData,
    sx,
    classes,
    contentProps
  } = props;
  const series = React25.useContext(SeriesContext)[itemData.type].series[itemData.seriesId];
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = React25.useContext(CartesianContext);
  const {
    zAxis,
    zAxisIds
  } = React25.useContext(ZAxisContext);
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  const defaultZAxisId = zAxisIds[0];
  let getColor6;
  switch (series.type) {
    case "pie":
      getColor6 = colorGetter_default(series);
      break;
    case "scatter":
      getColor6 = colorGetter_default(series, xAxis[series.xAxisKey ?? defaultXAxisId], yAxis[series.yAxisKey ?? defaultYAxisId], zAxis[series.zAxisKey ?? defaultZAxisId]);
      break;
    default:
      getColor6 = colorGetter_default(series, xAxis[series.xAxisKey ?? defaultXAxisId], yAxis[series.yAxisKey ?? defaultYAxisId]);
      break;
  }
  const Content = content ?? DefaultChartsItemTooltipContent;
  const chartTooltipContentProps = useSlotProps({
    elementType: Content,
    externalSlotProps: contentProps,
    additionalProps: {
      itemData,
      series,
      sx,
      classes,
      getColor: getColor6
    },
    ownerState: {}
  });
  return (0, import_jsx_runtime16.jsx)(Content, _extends({}, chartTooltipContentProps));
}
true ? ChartsItemTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types10.default.object.isRequired,
  content: import_prop_types10.default.elementType,
  contentProps: import_prop_types10.default.shape({
    classes: import_prop_types10.default.object,
    getColor: import_prop_types10.default.func,
    itemData: import_prop_types10.default.shape({
      dataIndex: import_prop_types10.default.number,
      seriesId: import_prop_types10.default.oneOfType([import_prop_types10.default.number, import_prop_types10.default.string]).isRequired,
      type: import_prop_types10.default.oneOf(["bar", "line", "pie", "scatter"]).isRequired
    }),
    series: import_prop_types10.default.object,
    sx: import_prop_types10.default.oneOfType([import_prop_types10.default.arrayOf(import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object, import_prop_types10.default.bool])), import_prop_types10.default.func, import_prop_types10.default.object])
  }),
  itemData: import_prop_types10.default.shape({
    dataIndex: import_prop_types10.default.number,
    seriesId: import_prop_types10.default.oneOfType([import_prop_types10.default.number, import_prop_types10.default.string]).isRequired,
    type: import_prop_types10.default.oneOf(["bar", "line", "pie", "scatter"]).isRequired
  }).isRequired,
  sx: import_prop_types10.default.oneOfType([import_prop_types10.default.arrayOf(import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object, import_prop_types10.default.bool])), import_prop_types10.default.func, import_prop_types10.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsAxisTooltipContent.js
init_extends();
var React27 = __toESM(require_react());
var import_prop_types12 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/ChartsTooltip/DefaultChartsAxisTooltipContent.js
var React26 = __toESM(require_react());
var import_prop_types11 = __toESM(require_prop_types());
init_clsx();
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
function DefaultChartsAxisTooltipContent(props) {
  const {
    series,
    axis,
    dataIndex,
    axisValue,
    sx,
    classes
  } = props;
  if (dataIndex == null) {
    return null;
  }
  const axisFormatter = axis.valueFormatter ?? ((v2) => axis.scaleType === "utc" ? utcFormatter(v2) : v2.toLocaleString());
  return (0, import_jsx_runtime17.jsx)(ChartsTooltipPaper, {
    sx,
    className: classes.root,
    children: (0, import_jsx_runtime17.jsxs)(ChartsTooltipTable, {
      className: classes.table,
      children: [axisValue != null && !axis.hideTooltip && (0, import_jsx_runtime17.jsx)("thead", {
        children: (0, import_jsx_runtime17.jsx)(ChartsTooltipRow, {
          children: (0, import_jsx_runtime17.jsx)(ChartsTooltipCell, {
            colSpan: 3,
            children: (0, import_jsx_runtime17.jsx)(Typography_default, {
              children: axisFormatter(axisValue, {
                location: "tooltip"
              })
            })
          })
        })
      }), (0, import_jsx_runtime17.jsx)("tbody", {
        children: series.filter(isCartesianSeries).map(({
          color: color2,
          id,
          label,
          valueFormatter,
          data,
          getColor: getColor6
        }) => {
          const formattedValue = valueFormatter(data[dataIndex] ?? null, {
            dataIndex
          });
          if (formattedValue == null) {
            return null;
          }
          const formattedLabel = getLabel(label, "tooltip");
          return (0, import_jsx_runtime17.jsxs)(ChartsTooltipRow, {
            className: classes.row,
            children: [(0, import_jsx_runtime17.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.markCell, classes.cell),
              children: (0, import_jsx_runtime17.jsx)(ChartsTooltipMark, {
                color: getColor6(dataIndex) ?? color2,
                className: classes.mark
              })
            }), (0, import_jsx_runtime17.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.labelCell, classes.cell),
              children: formattedLabel ? (0, import_jsx_runtime17.jsx)(Typography_default, {
                children: formattedLabel
              }) : null
            }), (0, import_jsx_runtime17.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.valueCell, classes.cell),
              children: (0, import_jsx_runtime17.jsx)(Typography_default, {
                children: formattedValue
              })
            })]
          }, id);
        })
      })]
    })
  });
}
true ? DefaultChartsAxisTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The properties of the triggered axis.
   */
  axis: import_prop_types11.default.object.isRequired,
  /**
   * Data identifying the triggered axis.
   */
  axisData: import_prop_types11.default.shape({
    x: import_prop_types11.default.shape({
      index: import_prop_types11.default.number,
      value: import_prop_types11.default.oneOfType([import_prop_types11.default.instanceOf(Date), import_prop_types11.default.number, import_prop_types11.default.string]).isRequired
    }),
    y: import_prop_types11.default.shape({
      index: import_prop_types11.default.number,
      value: import_prop_types11.default.oneOfType([import_prop_types11.default.instanceOf(Date), import_prop_types11.default.number, import_prop_types11.default.string]).isRequired
    })
  }).isRequired,
  /**
   * The value associated to the current mouse position.
   */
  axisValue: import_prop_types11.default.oneOfType([import_prop_types11.default.instanceOf(Date), import_prop_types11.default.number, import_prop_types11.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types11.default.object.isRequired,
  /**
   * The index of the data item triggered.
   */
  dataIndex: import_prop_types11.default.number,
  /**
   * The series linked to the triggered axis.
   */
  series: import_prop_types11.default.arrayOf(import_prop_types11.default.object).isRequired,
  sx: import_prop_types11.default.oneOfType([import_prop_types11.default.arrayOf(import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object, import_prop_types11.default.bool])), import_prop_types11.default.func, import_prop_types11.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsAxisTooltipContent.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
function ChartsAxisTooltipContent(props) {
  const {
    content,
    contentProps,
    axisData,
    sx,
    classes
  } = props;
  const isXaxis = (axisData.x && axisData.x.index) !== void 0;
  const dataIndex = isXaxis ? axisData.x && axisData.x.index : axisData.y && axisData.y.index;
  const axisValue = isXaxis ? axisData.x && axisData.x.value : axisData.y && axisData.y.value;
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = React27.useContext(CartesianContext);
  const {
    zAxisIds,
    zAxis
  } = React27.useContext(ZAxisContext);
  const series = React27.useContext(SeriesContext);
  const USED_AXIS_ID = isXaxis ? xAxisIds[0] : yAxisIds[0];
  const relevantSeries = React27.useMemo(() => {
    const rep = [];
    Object.keys(series).filter(isCartesianSeriesType).forEach((seriesType) => {
      series[seriesType].seriesOrder.forEach((seriesId) => {
        const item = series[seriesType].series[seriesId];
        const axisKey = isXaxis ? item.xAxisKey : item.yAxisKey;
        if (axisKey === void 0 || axisKey === USED_AXIS_ID) {
          const seriesToAdd = series[seriesType].series[seriesId];
          let getColor6;
          switch (seriesToAdd.type) {
            case "scatter":
              getColor6 = colorGetter_default(seriesToAdd, xAxis[seriesToAdd.xAxisKey ?? xAxisIds[0]], yAxis[seriesToAdd.yAxisKey ?? yAxisIds[0]], zAxis[seriesToAdd.zAxisKey ?? zAxisIds[0]]);
              break;
            default:
              getColor6 = colorGetter_default(seriesToAdd, xAxis[seriesToAdd.xAxisKey ?? xAxisIds[0]], yAxis[seriesToAdd.yAxisKey ?? yAxisIds[0]]);
              break;
          }
          rep.push(_extends({}, seriesToAdd, {
            getColor: getColor6
          }));
        }
      });
    });
    return rep;
  }, [USED_AXIS_ID, isXaxis, series, xAxis, xAxisIds, yAxis, yAxisIds, zAxis, zAxisIds]);
  const relevantAxis = React27.useMemo(() => {
    return isXaxis ? xAxis[USED_AXIS_ID] : yAxis[USED_AXIS_ID];
  }, [USED_AXIS_ID, isXaxis, xAxis, yAxis]);
  const Content = content ?? DefaultChartsAxisTooltipContent;
  const chartTooltipContentProps = useSlotProps({
    elementType: Content,
    externalSlotProps: contentProps,
    additionalProps: {
      axisData,
      series: relevantSeries,
      axis: relevantAxis,
      dataIndex,
      axisValue,
      sx,
      classes
    },
    ownerState: {}
  });
  return (0, import_jsx_runtime18.jsx)(Content, _extends({}, chartTooltipContentProps));
}
true ? ChartsAxisTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  axisData: import_prop_types12.default.shape({
    x: import_prop_types12.default.shape({
      index: import_prop_types12.default.number,
      value: import_prop_types12.default.oneOfType([import_prop_types12.default.instanceOf(Date), import_prop_types12.default.number, import_prop_types12.default.string]).isRequired
    }),
    y: import_prop_types12.default.shape({
      index: import_prop_types12.default.number,
      value: import_prop_types12.default.oneOfType([import_prop_types12.default.instanceOf(Date), import_prop_types12.default.number, import_prop_types12.default.string]).isRequired
    })
  }).isRequired,
  classes: import_prop_types12.default.object.isRequired,
  content: import_prop_types12.default.elementType,
  contentProps: import_prop_types12.default.shape({
    axis: import_prop_types12.default.object,
    axisData: import_prop_types12.default.shape({
      x: import_prop_types12.default.shape({
        index: import_prop_types12.default.number,
        value: import_prop_types12.default.oneOfType([import_prop_types12.default.instanceOf(Date), import_prop_types12.default.number, import_prop_types12.default.string]).isRequired
      }),
      y: import_prop_types12.default.shape({
        index: import_prop_types12.default.number,
        value: import_prop_types12.default.oneOfType([import_prop_types12.default.instanceOf(Date), import_prop_types12.default.number, import_prop_types12.default.string]).isRequired
      })
    }),
    axisValue: import_prop_types12.default.oneOfType([import_prop_types12.default.instanceOf(Date), import_prop_types12.default.number, import_prop_types12.default.string]),
    classes: import_prop_types12.default.object,
    dataIndex: import_prop_types12.default.number,
    series: import_prop_types12.default.arrayOf(import_prop_types12.default.object),
    sx: import_prop_types12.default.oneOfType([import_prop_types12.default.arrayOf(import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object, import_prop_types12.default.bool])), import_prop_types12.default.func, import_prop_types12.default.object])
  }),
  sx: import_prop_types12.default.oneOfType([import_prop_types12.default.arrayOf(import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object, import_prop_types12.default.bool])), import_prop_types12.default.func, import_prop_types12.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltip.js
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var useUtilityClasses4 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    table: ["table"],
    row: ["row"],
    cell: ["cell"],
    mark: ["mark"],
    markCell: ["markCell"],
    labelCell: ["labelCell"],
    valueCell: ["valueCell"]
  };
  return composeClasses(slots, getChartsTooltipUtilityClass, classes);
};
var ChartsTooltipRoot = styled_default(Popper, {
  name: "MuiChartsTooltip",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  pointerEvents: "none",
  zIndex: theme.zIndex.modal
}));
function ChartsTooltip(props) {
  const themeProps = useThemeProps({
    props,
    name: "MuiChartsTooltip"
  });
  const {
    trigger = "axis",
    itemContent,
    axisContent,
    slots,
    slotProps
  } = themeProps;
  const mousePosition = useMouseTracker();
  const {
    item,
    axis
  } = React28.useContext(InteractionContext);
  const displayedData = trigger === "item" ? item : axis;
  const tooltipHasData = getTooltipHasData(trigger, displayedData);
  const popperOpen = mousePosition !== null && tooltipHasData;
  const classes = useUtilityClasses4({
    classes: themeProps.classes
  });
  const PopperComponent = (slots == null ? void 0 : slots.popper) ?? ChartsTooltipRoot;
  const popperProps = useSlotProps({
    elementType: PopperComponent,
    externalSlotProps: slotProps == null ? void 0 : slotProps.popper,
    additionalProps: {
      open: popperOpen,
      placement: "right-start",
      anchorEl: generateVirtualElement(mousePosition)
    },
    ownerState: {}
  });
  if (trigger === "none") {
    return null;
  }
  return (0, import_jsx_runtime19.jsx)(NoSsr, {
    children: popperOpen && (0, import_jsx_runtime19.jsx)(PopperComponent, _extends({}, popperProps, {
      children: trigger === "item" ? (0, import_jsx_runtime19.jsx)(ChartsItemTooltipContent, {
        itemData: displayedData,
        content: (slots == null ? void 0 : slots.itemContent) ?? itemContent,
        contentProps: slotProps == null ? void 0 : slotProps.itemContent,
        sx: {
          mx: 2
        },
        classes
      }) : (0, import_jsx_runtime19.jsx)(ChartsAxisTooltipContent, {
        axisData: displayedData,
        content: (slots == null ? void 0 : slots.axisContent) ?? axisContent,
        contentProps: slotProps == null ? void 0 : slotProps.axisContent,
        sx: {
          mx: 2
        },
        classes
      })
    }))
  });
}
true ? ChartsTooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Component to override the tooltip content when trigger is set to 'axis'.
   * @deprecated Use slots.axisContent instead
   */
  axisContent: import_prop_types13.default.elementType,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types13.default.object,
  /**
   * Component to override the tooltip content when trigger is set to 'item'.
   * @deprecated Use slots.itemContent instead
   */
  itemContent: import_prop_types13.default.elementType,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types13.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types13.default.object,
  /**
   * Select the kind of tooltip to display
   * - 'item': Shows data about the item below the mouse.
   * - 'axis': Shows values associated with the hovered x value
   * - 'none': Does not display tooltip
   * @default 'item'
   */
  trigger: import_prop_types13.default.oneOf(["axis", "item", "none"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/ChartsLegend.js
init_extends();
var React30 = __toESM(require_react());
var import_prop_types15 = __toESM(require_prop_types());
init_utils();

// node_modules/@mui/x-charts/esm/BarChart/legend.js
var legendGetter = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      color: series[seriesId].color,
      label: formattedLabel,
      id: seriesId
    });
    return acc;
  }, []);
};
var legend_default = legendGetter;

// node_modules/@mui/x-charts/esm/ScatterChart/legend.js
var legendGetter2 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      color: series[seriesId].color,
      label: formattedLabel,
      id: seriesId
    });
    return acc;
  }, []);
};
var legend_default2 = legendGetter2;

// node_modules/@mui/x-charts/esm/LineChart/legend.js
var legendGetter3 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      color: series[seriesId].color,
      label: formattedLabel,
      id: seriesId
    });
    return acc;
  }, []);
};
var legend_default3 = legendGetter3;

// node_modules/@mui/x-charts/esm/PieChart/legend.js
var legendGetter4 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    series[seriesId].data.forEach((item) => {
      const formattedLabel = getLabel(item.label, "legend");
      if (formattedLabel === void 0) {
        return;
      }
      acc.push({
        color: item.color,
        label: formattedLabel,
        id: item.id
      });
    });
    return acc;
  }, []);
};
var legend_default4 = legendGetter4;

// node_modules/@mui/x-charts/esm/ChartsLegend/utils.js
var legendGetter5 = {
  bar: legend_default,
  scatter: legend_default2,
  line: legend_default3,
  pie: legend_default4
};
function getSeriesToDisplay(series) {
  return Object.keys(series).flatMap((seriesType) => legendGetter5[seriesType](series[seriesType]));
}

// node_modules/@mui/x-charts/esm/ChartsLegend/chartsLegendClasses.js
init_utils();
function getLegendUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLegend", slot);
}
var legendClasses = generateUtilityClasses("MuiChartsLegend", ["root", "series", "mark", "label", "column", "row"]);

// node_modules/@mui/x-charts/esm/ChartsLegend/DefaultChartsLegend.js
init_objectWithoutPropertiesLoose();
init_extends();
var React29 = __toESM(require_react());
var import_prop_types14 = __toESM(require_prop_types());
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var _excluded6 = ["rotate", "dominantBaseline"];
var _excluded22 = ["label"];
var ChartsLegendRoot = styled_default("g", {
  name: "MuiChartsLegend",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({});
var getStandardizedPadding = (padding) => {
  if (typeof padding === "number") {
    return {
      left: padding,
      right: padding,
      top: padding,
      bottom: padding
    };
  }
  return _extends({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }, padding);
};
function DefaultChartsLegend(props) {
  const {
    hidden,
    position,
    direction,
    seriesToDisplay,
    drawingArea,
    classes,
    itemMarkWidth = 20,
    itemMarkHeight = 20,
    markGap = 5,
    itemGap = 10,
    padding: paddingProps = 10,
    labelStyle: inLabelStyle
  } = props;
  const theme = useTheme();
  const isRTL = theme.direction === "rtl";
  const labelStyle = React29.useMemo(
    () => _extends({}, theme.typography.subtitle1, {
      color: "inherit",
      dominantBaseline: "central",
      textAnchor: "start",
      fill: (theme.vars || theme).palette.text.primary,
      lineHeight: 1
    }, inLabelStyle),
    // To say to TS that the dominantBaseline and textAnchor are correct
    [inLabelStyle, theme]
  );
  const padding = React29.useMemo(() => getStandardizedPadding(paddingProps), [paddingProps]);
  const getItemSpace = React29.useCallback((label, inStyle = {}) => {
    const style = _objectWithoutPropertiesLoose(inStyle, _excluded6);
    const linesSize = getWordsByLines({
      style,
      needsComputation: true,
      text: label
    });
    const innerSize = {
      innerWidth: itemMarkWidth + markGap + Math.max(...linesSize.map((size) => size.width)),
      innerHeight: Math.max(itemMarkHeight, linesSize.length * linesSize[0].height)
    };
    return _extends({}, innerSize, {
      outerWidth: innerSize.innerWidth + itemGap,
      outerHeight: innerSize.innerHeight + itemGap
    });
  }, [itemGap, itemMarkHeight, itemMarkWidth, markGap]);
  const totalWidth = drawingArea.left + drawingArea.width + drawingArea.right;
  const totalHeight = drawingArea.top + drawingArea.height + drawingArea.bottom;
  const availableWidth = totalWidth - padding.left - padding.right;
  const availableHeight = totalHeight - padding.top - padding.bottom;
  const [seriesWithPosition, legendWidth, legendHeight] = React29.useMemo(() => {
    let x2 = 0;
    let y2 = 0;
    let totalWidthUsed = 0;
    let totalHeightUsed = 0;
    let rowIndex = 0;
    const rowMaxHeight = [0];
    const seriesWithRawPosition = seriesToDisplay.map((_ref) => {
      let {
        label
      } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded22);
      const itemSpace = getItemSpace(label, labelStyle);
      const rep = _extends({}, other, {
        label,
        positionX: x2,
        positionY: y2,
        innerHeight: itemSpace.innerHeight,
        innerWidth: itemSpace.innerWidth,
        outerHeight: itemSpace.outerHeight,
        outerWidth: itemSpace.outerWidth,
        rowIndex
      });
      if (direction === "row") {
        if (x2 + itemSpace.innerWidth > availableWidth) {
          x2 = 0;
          y2 += rowMaxHeight[rowIndex];
          rowIndex += 1;
          if (rowMaxHeight.length <= rowIndex) {
            rowMaxHeight.push(0);
          }
          rep.positionX = x2;
          rep.positionY = y2;
          rep.rowIndex = rowIndex;
        }
        totalWidthUsed = Math.max(totalWidthUsed, x2 + itemSpace.outerWidth);
        totalHeightUsed = Math.max(totalHeightUsed, y2 + itemSpace.outerHeight);
        rowMaxHeight[rowIndex] = Math.max(rowMaxHeight[rowIndex], itemSpace.outerHeight);
        x2 += itemSpace.outerWidth;
      }
      if (direction === "column") {
        if (y2 + itemSpace.innerHeight > availableHeight) {
          x2 = totalWidthUsed + itemGap;
          y2 = 0;
          rowIndex = 0;
          rep.positionX = x2;
          rep.positionY = y2;
          rep.rowIndex = rowIndex;
        }
        if (rowMaxHeight.length <= rowIndex) {
          rowMaxHeight.push(0);
        }
        totalWidthUsed = Math.max(totalWidthUsed, x2 + itemSpace.outerWidth);
        totalHeightUsed = Math.max(totalHeightUsed, y2 + itemSpace.outerHeight);
        rowIndex += 1;
        y2 += itemSpace.outerHeight;
      }
      return rep;
    });
    return [seriesWithRawPosition.map((item) => _extends({}, item, {
      positionY: item.positionY + (direction === "row" ? rowMaxHeight[item.rowIndex] / 2 : item.outerHeight / 2)
      // Get the center of the item
    })), totalWidthUsed, totalHeightUsed];
  }, [seriesToDisplay, getItemSpace, labelStyle, direction, availableWidth, availableHeight, itemGap]);
  const gapX = React29.useMemo(() => {
    switch (position.horizontal) {
      case "left":
        return padding.left;
      case "right":
        return totalWidth - padding.right - legendWidth;
      default:
        return (totalWidth - legendWidth) / 2;
    }
  }, [position.horizontal, padding.left, padding.right, totalWidth, legendWidth]);
  const gapY = React29.useMemo(() => {
    switch (position.vertical) {
      case "top":
        return padding.top;
      case "bottom":
        return totalHeight - padding.bottom - legendHeight;
      default:
        return (totalHeight - legendHeight) / 2;
    }
  }, [position.vertical, padding.top, padding.bottom, totalHeight, legendHeight]);
  if (hidden) {
    return null;
  }
  return (0, import_jsx_runtime20.jsx)(NoSsr, {
    children: (0, import_jsx_runtime20.jsx)(ChartsLegendRoot, {
      className: classes.root,
      children: seriesWithPosition.map(({
        id,
        label,
        color: color2,
        positionX,
        positionY
      }) => (0, import_jsx_runtime20.jsxs)("g", {
        className: classes.series,
        transform: `translate(${gapX + (isRTL ? legendWidth - positionX : positionX)} ${gapY + positionY})`,
        children: [(0, import_jsx_runtime20.jsx)("rect", {
          className: classes.mark,
          x: isRTL ? -itemMarkWidth : 0,
          y: -itemMarkHeight / 2,
          width: itemMarkWidth,
          height: itemMarkHeight,
          fill: color2
        }), (0, import_jsx_runtime20.jsx)(ChartsText, {
          style: labelStyle,
          text: label,
          x: (isRTL ? -1 : 1) * (itemMarkWidth + markGap),
          y: 0
        })]
      }, id))
    })
  });
}
true ? DefaultChartsLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types14.default.object.isRequired,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types14.default.oneOf(["column", "row"]).isRequired,
  drawingArea: import_prop_types14.default.shape({
    bottom: import_prop_types14.default.number.isRequired,
    height: import_prop_types14.default.number.isRequired,
    left: import_prop_types14.default.number.isRequired,
    right: import_prop_types14.default.number.isRequired,
    top: import_prop_types14.default.number.isRequired,
    width: import_prop_types14.default.number.isRequired
  }).isRequired,
  /**
   * Set to true to hide the legend.
   * @default false
   */
  hidden: import_prop_types14.default.bool,
  /**
   * Space between two legend items (in px).
   * @default 10
   */
  itemGap: import_prop_types14.default.number,
  /**
   * Height of the item mark (in px).
   * @default 20
   */
  itemMarkHeight: import_prop_types14.default.number,
  /**
   * Width of the item mark (in px).
   * @default 20
   */
  itemMarkWidth: import_prop_types14.default.number,
  /**
   * Style applied to legend labels.
   * @default theme.typography.subtitle1
   */
  labelStyle: import_prop_types14.default.object,
  /**
   * Space between the mark and the label (in px).
   * @default 5
   */
  markGap: import_prop_types14.default.number,
  /**
   * Legend padding (in px).
   * Can either be a single number, or an object with top, left, bottom, right properties.
   * @default 10
   */
  padding: import_prop_types14.default.oneOfType([import_prop_types14.default.number, import_prop_types14.default.shape({
    bottom: import_prop_types14.default.number,
    left: import_prop_types14.default.number,
    right: import_prop_types14.default.number,
    top: import_prop_types14.default.number
  })]),
  /**
   * The position of the legend.
   */
  position: import_prop_types14.default.shape({
    horizontal: import_prop_types14.default.oneOf(["left", "middle", "right"]).isRequired,
    vertical: import_prop_types14.default.oneOf(["bottom", "middle", "top"]).isRequired
  }).isRequired,
  series: import_prop_types14.default.object.isRequired,
  seriesToDisplay: import_prop_types14.default.arrayOf(import_prop_types14.default.shape({
    color: import_prop_types14.default.string.isRequired,
    id: import_prop_types14.default.oneOfType([import_prop_types14.default.number, import_prop_types14.default.string]).isRequired,
    label: import_prop_types14.default.string.isRequired
  })).isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/ChartsLegend.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var useUtilityClasses5 = (ownerState) => {
  const {
    classes,
    direction
  } = ownerState;
  const slots = {
    root: ["root", direction],
    mark: ["mark"],
    label: ["label"],
    series: ["series"]
  };
  return composeClasses(slots, getLegendUtilityClass, classes);
};
var defaultProps3 = {
  position: {
    horizontal: "middle",
    vertical: "top"
  },
  direction: "row"
};
function ChartsLegend(inProps) {
  const props = useThemeProps({
    props: _extends({}, defaultProps3, inProps),
    name: "MuiChartsLegend"
  });
  const {
    position,
    direction,
    hidden,
    slots,
    slotProps
  } = props;
  const theme = useTheme();
  const classes = useUtilityClasses5(_extends({}, props, {
    theme
  }));
  const drawingArea = useDrawingArea();
  const series = React30.useContext(SeriesContext);
  const seriesToDisplay = getSeriesToDisplay(series);
  const ChartLegendRender = (slots == null ? void 0 : slots.legend) ?? DefaultChartsLegend;
  const chartLegendRenderProps = useSlotProps({
    elementType: ChartLegendRender,
    externalSlotProps: slotProps == null ? void 0 : slotProps.legend,
    additionalProps: {
      position,
      direction,
      classes,
      drawingArea,
      series,
      hidden,
      seriesToDisplay
    },
    ownerState: {}
  });
  return (0, import_jsx_runtime21.jsx)(ChartLegendRender, _extends({}, chartLegendRenderProps));
}
true ? ChartsLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types15.default.object,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types15.default.oneOf(["column", "row"]),
  /**
   * Set to true to hide the legend.
   * @default false
   */
  hidden: import_prop_types15.default.bool,
  /**
   * The position of the legend.
   */
  position: import_prop_types15.default.shape({
    horizontal: import_prop_types15.default.oneOf(["left", "middle", "right"]).isRequired,
    vertical: import_prop_types15.default.oneOf(["bottom", "middle", "top"]).isRequired
  }),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types15.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types15.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/ChartsAxisHighlight.js
init_extends();
var React31 = __toESM(require_react());
var import_prop_types16 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
function getAxisHighlightUtilityClass(slot) {
  return generateUtilityClass("MuiChartsAxisHighlight", slot);
}
var chartsAxisHighlightClasses = generateUtilityClasses("MuiChartsAxisHighlight", ["root"]);
var useUtilityClasses6 = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getAxisHighlightUtilityClass);
};
var ChartsAxisHighlightPath = styled_default("path", {
  name: "MuiChartsAxisHighlight",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState,
  theme
}) => _extends({
  pointerEvents: "none"
}, ownerState.axisHighlight === "band" && {
  fill: theme.palette.mode === "light" ? "gray" : "white",
  fillOpacity: 0.1
}, ownerState.axisHighlight === "line" && {
  strokeDasharray: "5 2",
  stroke: theme.palette.mode === "light" ? "#000000" : "#ffffff"
}));
function ChartsAxisHighlight(props) {
  const {
    x: xAxisHighlight,
    y: yAxisHighlight
  } = props;
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = React31.useContext(CartesianContext);
  const classes = useUtilityClasses6();
  const USED_X_AXIS_ID = xAxisIds[0];
  const USED_Y_AXIS_ID = yAxisIds[0];
  const xScale = xAxis[USED_X_AXIS_ID].scale;
  const yScale = yAxis[USED_Y_AXIS_ID].scale;
  const {
    axis
  } = React31.useContext(InteractionContext);
  const getXPosition = getValueToPositionMapper(xScale);
  const getYPosition = getValueToPositionMapper(yScale);
  return (0, import_jsx_runtime22.jsxs)(React31.Fragment, {
    children: [xAxisHighlight === "band" && axis.x !== null && isBandScale(xScale) && (0, import_jsx_runtime22.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale(axis.x.value) - (xScale.step() - xScale.bandwidth()) / 2} ${yScale.range()[0]} l ${xScale.step()} 0 l 0 ${yScale.range()[1] - yScale.range()[0]} l ${-xScale.step()} 0 Z`,
      className: classes.root,
      ownerState: {
        axisHighlight: "band"
      }
    }), yAxisHighlight === "band" && axis.y !== null && isBandScale(yScale) && (0, import_jsx_runtime22.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale.range()[0]} ${yScale(axis.y.value) - (yScale.step() - yScale.bandwidth()) / 2} l 0 ${yScale.step()} l ${xScale.range()[1] - xScale.range()[0]} 0 l 0 ${-yScale.step()} Z`,
      className: classes.root,
      ownerState: {
        axisHighlight: "band"
      }
    }), xAxisHighlight === "line" && axis.x !== null && (0, import_jsx_runtime22.jsx)(ChartsAxisHighlightPath, {
      d: `M ${getXPosition(axis.x.value)} ${yScale.range()[0]} L ${getXPosition(axis.x.value)} ${yScale.range()[1]}`,
      className: classes.root,
      ownerState: {
        axisHighlight: "line"
      }
    }), yAxisHighlight === "line" && axis.y !== null && (0, import_jsx_runtime22.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale.range()[0]} ${getYPosition(axis.y.value)} L ${xScale.range()[1]} ${getYPosition(axis.y.value)}`,
      className: classes.root,
      ownerState: {
        axisHighlight: "line"
      }
    })]
  });
}
true ? ChartsAxisHighlight.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  x: import_prop_types16.default.oneOf(["band", "line", "none"]),
  y: import_prop_types16.default.oneOf(["band", "line", "none"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsVoronoiHandler/ChartsVoronoiHandler.js
var React32 = __toESM(require_react());
var import_prop_types17 = __toESM(require_prop_types());

// node_modules/robust-predicates/esm/util.js
var epsilon4 = 11102230246251565e-32;
var splitter = 134217729;
var resulterrbound = (3 + 8 * epsilon4) * epsilon4;
function sum3(elen, e, flen, f, h) {
  let Q, Qnew, hh, bvirt;
  let enow = e[0];
  let fnow = f[0];
  let eindex = 0;
  let findex = 0;
  if (fnow > enow === fnow > -enow) {
    Q = enow;
    enow = e[++eindex];
  } else {
    Q = fnow;
    fnow = f[++findex];
  }
  let hindex = 0;
  if (eindex < elen && findex < flen) {
    if (fnow > enow === fnow > -enow) {
      Qnew = enow + Q;
      hh = Q - (Qnew - enow);
      enow = e[++eindex];
    } else {
      Qnew = fnow + Q;
      hh = Q - (Qnew - fnow);
      fnow = f[++findex];
    }
    Q = Qnew;
    if (hh !== 0) {
      h[hindex++] = hh;
    }
    while (eindex < elen && findex < flen) {
      if (fnow > enow === fnow > -enow) {
        Qnew = Q + enow;
        bvirt = Qnew - Q;
        hh = Q - (Qnew - bvirt) + (enow - bvirt);
        enow = e[++eindex];
      } else {
        Qnew = Q + fnow;
        bvirt = Qnew - Q;
        hh = Q - (Qnew - bvirt) + (fnow - bvirt);
        fnow = f[++findex];
      }
      Q = Qnew;
      if (hh !== 0) {
        h[hindex++] = hh;
      }
    }
  }
  while (eindex < elen) {
    Qnew = Q + enow;
    bvirt = Qnew - Q;
    hh = Q - (Qnew - bvirt) + (enow - bvirt);
    enow = e[++eindex];
    Q = Qnew;
    if (hh !== 0) {
      h[hindex++] = hh;
    }
  }
  while (findex < flen) {
    Qnew = Q + fnow;
    bvirt = Qnew - Q;
    hh = Q - (Qnew - bvirt) + (fnow - bvirt);
    fnow = f[++findex];
    Q = Qnew;
    if (hh !== 0) {
      h[hindex++] = hh;
    }
  }
  if (Q !== 0 || hindex === 0) {
    h[hindex++] = Q;
  }
  return hindex;
}
function estimate(elen, e) {
  let Q = e[0];
  for (let i = 1; i < elen; i++)
    Q += e[i];
  return Q;
}
function vec(n) {
  return new Float64Array(n);
}

// node_modules/robust-predicates/esm/orient2d.js
var ccwerrboundA = (3 + 16 * epsilon4) * epsilon4;
var ccwerrboundB = (2 + 12 * epsilon4) * epsilon4;
var ccwerrboundC = (9 + 64 * epsilon4) * epsilon4 * epsilon4;
var B2 = vec(4);
var C1 = vec(8);
var C2 = vec(12);
var D2 = vec(16);
var u = vec(4);
function orient2dadapt(ax, ay, bx, by, cx, cy, detsum) {
  let acxtail, acytail, bcxtail, bcytail;
  let bvirt, c6, ahi, alo, bhi, blo, _i, _j, _0, s1, s0, t13, t03, u32;
  const acx = ax - cx;
  const bcx = bx - cx;
  const acy = ay - cy;
  const bcy = by - cy;
  s1 = acx * bcy;
  c6 = splitter * acx;
  ahi = c6 - (c6 - acx);
  alo = acx - ahi;
  c6 = splitter * bcy;
  bhi = c6 - (c6 - bcy);
  blo = bcy - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t13 = acy * bcx;
  c6 = splitter * acy;
  ahi = c6 - (c6 - acy);
  alo = acy - ahi;
  c6 = splitter * bcx;
  bhi = c6 - (c6 - bcx);
  blo = bcx - bhi;
  t03 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t03;
  bvirt = s0 - _i;
  B2[0] = s0 - (_i + bvirt) + (bvirt - t03);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t13;
  bvirt = _0 - _i;
  B2[1] = _0 - (_i + bvirt) + (bvirt - t13);
  u32 = _j + _i;
  bvirt = u32 - _j;
  B2[2] = _j - (u32 - bvirt) + (_i - bvirt);
  B2[3] = u32;
  let det = estimate(4, B2);
  let errbound = ccwerrboundB * detsum;
  if (det >= errbound || -det >= errbound) {
    return det;
  }
  bvirt = ax - acx;
  acxtail = ax - (acx + bvirt) + (bvirt - cx);
  bvirt = bx - bcx;
  bcxtail = bx - (bcx + bvirt) + (bvirt - cx);
  bvirt = ay - acy;
  acytail = ay - (acy + bvirt) + (bvirt - cy);
  bvirt = by - bcy;
  bcytail = by - (bcy + bvirt) + (bvirt - cy);
  if (acxtail === 0 && acytail === 0 && bcxtail === 0 && bcytail === 0) {
    return det;
  }
  errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
  det += acx * bcytail + bcy * acxtail - (acy * bcxtail + bcx * acytail);
  if (det >= errbound || -det >= errbound)
    return det;
  s1 = acxtail * bcy;
  c6 = splitter * acxtail;
  ahi = c6 - (c6 - acxtail);
  alo = acxtail - ahi;
  c6 = splitter * bcy;
  bhi = c6 - (c6 - bcy);
  blo = bcy - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t13 = acytail * bcx;
  c6 = splitter * acytail;
  ahi = c6 - (c6 - acytail);
  alo = acytail - ahi;
  c6 = splitter * bcx;
  bhi = c6 - (c6 - bcx);
  blo = bcx - bhi;
  t03 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t03;
  bvirt = s0 - _i;
  u[0] = s0 - (_i + bvirt) + (bvirt - t03);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t13;
  bvirt = _0 - _i;
  u[1] = _0 - (_i + bvirt) + (bvirt - t13);
  u32 = _j + _i;
  bvirt = u32 - _j;
  u[2] = _j - (u32 - bvirt) + (_i - bvirt);
  u[3] = u32;
  const C1len = sum3(4, B2, 4, u, C1);
  s1 = acx * bcytail;
  c6 = splitter * acx;
  ahi = c6 - (c6 - acx);
  alo = acx - ahi;
  c6 = splitter * bcytail;
  bhi = c6 - (c6 - bcytail);
  blo = bcytail - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t13 = acy * bcxtail;
  c6 = splitter * acy;
  ahi = c6 - (c6 - acy);
  alo = acy - ahi;
  c6 = splitter * bcxtail;
  bhi = c6 - (c6 - bcxtail);
  blo = bcxtail - bhi;
  t03 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t03;
  bvirt = s0 - _i;
  u[0] = s0 - (_i + bvirt) + (bvirt - t03);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t13;
  bvirt = _0 - _i;
  u[1] = _0 - (_i + bvirt) + (bvirt - t13);
  u32 = _j + _i;
  bvirt = u32 - _j;
  u[2] = _j - (u32 - bvirt) + (_i - bvirt);
  u[3] = u32;
  const C2len = sum3(C1len, C1, 4, u, C2);
  s1 = acxtail * bcytail;
  c6 = splitter * acxtail;
  ahi = c6 - (c6 - acxtail);
  alo = acxtail - ahi;
  c6 = splitter * bcytail;
  bhi = c6 - (c6 - bcytail);
  blo = bcytail - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t13 = acytail * bcxtail;
  c6 = splitter * acytail;
  ahi = c6 - (c6 - acytail);
  alo = acytail - ahi;
  c6 = splitter * bcxtail;
  bhi = c6 - (c6 - bcxtail);
  blo = bcxtail - bhi;
  t03 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t03;
  bvirt = s0 - _i;
  u[0] = s0 - (_i + bvirt) + (bvirt - t03);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t13;
  bvirt = _0 - _i;
  u[1] = _0 - (_i + bvirt) + (bvirt - t13);
  u32 = _j + _i;
  bvirt = u32 - _j;
  u[2] = _j - (u32 - bvirt) + (_i - bvirt);
  u[3] = u32;
  const Dlen = sum3(C2len, C2, 4, u, D2);
  return D2[Dlen - 1];
}
function orient2d(ax, ay, bx, by, cx, cy) {
  const detleft = (ay - cy) * (bx - cx);
  const detright = (ax - cx) * (by - cy);
  const det = detleft - detright;
  const detsum = Math.abs(detleft + detright);
  if (Math.abs(det) >= ccwerrboundA * detsum)
    return det;
  return -orient2dadapt(ax, ay, bx, by, cx, cy, detsum);
}

// node_modules/robust-predicates/esm/orient3d.js
var o3derrboundA = (7 + 56 * epsilon4) * epsilon4;
var o3derrboundB = (3 + 28 * epsilon4) * epsilon4;
var o3derrboundC = (26 + 288 * epsilon4) * epsilon4 * epsilon4;
var bc = vec(4);
var ca = vec(4);
var ab = vec(4);
var at_b = vec(4);
var at_c = vec(4);
var bt_c = vec(4);
var bt_a = vec(4);
var ct_a = vec(4);
var ct_b = vec(4);
var bct = vec(8);
var cat = vec(8);
var abt = vec(8);
var u2 = vec(4);
var _8 = vec(8);
var _8b = vec(8);
var _16 = vec(8);
var _12 = vec(12);
var fin = vec(192);
var fin2 = vec(192);

// node_modules/robust-predicates/esm/incircle.js
var iccerrboundA = (10 + 96 * epsilon4) * epsilon4;
var iccerrboundB = (4 + 48 * epsilon4) * epsilon4;
var iccerrboundC = (44 + 576 * epsilon4) * epsilon4 * epsilon4;
var bc2 = vec(4);
var ca2 = vec(4);
var ab2 = vec(4);
var aa = vec(4);
var bb = vec(4);
var cc = vec(4);
var u3 = vec(4);
var v = vec(4);
var axtbc = vec(8);
var aytbc = vec(8);
var bxtca = vec(8);
var bytca = vec(8);
var cxtab = vec(8);
var cytab = vec(8);
var abt2 = vec(8);
var bct2 = vec(8);
var cat2 = vec(8);
var abtt = vec(4);
var bctt = vec(4);
var catt = vec(4);
var _82 = vec(8);
var _162 = vec(16);
var _16b = vec(16);
var _16c = vec(16);
var _32 = vec(32);
var _32b = vec(32);
var _48 = vec(48);
var _64 = vec(64);
var fin3 = vec(1152);
var fin22 = vec(1152);

// node_modules/robust-predicates/esm/insphere.js
var isperrboundA = (16 + 224 * epsilon4) * epsilon4;
var isperrboundB = (5 + 72 * epsilon4) * epsilon4;
var isperrboundC = (71 + 1408 * epsilon4) * epsilon4 * epsilon4;
var ab3 = vec(4);
var bc3 = vec(4);
var cd = vec(4);
var de = vec(4);
var ea = vec(4);
var ac = vec(4);
var bd = vec(4);
var ce = vec(4);
var da = vec(4);
var eb = vec(4);
var abc = vec(24);
var bcd = vec(24);
var cde = vec(24);
var dea = vec(24);
var eab = vec(24);
var abd = vec(24);
var bce = vec(24);
var cda = vec(24);
var deb = vec(24);
var eac = vec(24);
var adet = vec(1152);
var bdet = vec(1152);
var cdet = vec(1152);
var ddet = vec(1152);
var edet = vec(1152);
var abdet = vec(2304);
var cddet = vec(2304);
var cdedet = vec(3456);
var deter = vec(5760);
var _83 = vec(8);
var _8b2 = vec(8);
var _8c = vec(8);
var _163 = vec(16);
var _24 = vec(24);
var _482 = vec(48);
var _48b = vec(48);
var _96 = vec(96);
var _192 = vec(192);
var _384x = vec(384);
var _384y = vec(384);
var _384z = vec(384);
var _768 = vec(768);
var xdet = vec(96);
var ydet = vec(96);
var zdet = vec(96);
var fin4 = vec(1152);

// node_modules/delaunator/index.js
var EPSILON = Math.pow(2, -52);
var EDGE_STACK = new Uint32Array(512);
var Delaunator = class _Delaunator {
  static from(points, getX = defaultGetX, getY = defaultGetY) {
    const n = points.length;
    const coords = new Float64Array(n * 2);
    for (let i = 0; i < n; i++) {
      const p = points[i];
      coords[2 * i] = getX(p);
      coords[2 * i + 1] = getY(p);
    }
    return new _Delaunator(coords);
  }
  constructor(coords) {
    const n = coords.length >> 1;
    if (n > 0 && typeof coords[0] !== "number")
      throw new Error("Expected coords to contain numbers.");
    this.coords = coords;
    const maxTriangles = Math.max(2 * n - 5, 0);
    this._triangles = new Uint32Array(maxTriangles * 3);
    this._halfedges = new Int32Array(maxTriangles * 3);
    this._hashSize = Math.ceil(Math.sqrt(n));
    this._hullPrev = new Uint32Array(n);
    this._hullNext = new Uint32Array(n);
    this._hullTri = new Uint32Array(n);
    this._hullHash = new Int32Array(this._hashSize);
    this._ids = new Uint32Array(n);
    this._dists = new Float64Array(n);
    this.update();
  }
  update() {
    const { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this;
    const n = coords.length >> 1;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      const x2 = coords[2 * i];
      const y2 = coords[2 * i + 1];
      if (x2 < minX)
        minX = x2;
      if (y2 < minY)
        minY = y2;
      if (x2 > maxX)
        maxX = x2;
      if (y2 > maxY)
        maxY = y2;
      this._ids[i] = i;
    }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    let i0, i1, i2;
    for (let i = 0, minDist = Infinity; i < n; i++) {
      const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
      if (d < minDist) {
        i0 = i;
        minDist = d;
      }
    }
    const i0x = coords[2 * i0];
    const i0y = coords[2 * i0 + 1];
    for (let i = 0, minDist = Infinity; i < n; i++) {
      if (i === i0)
        continue;
      const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
      if (d < minDist && d > 0) {
        i1 = i;
        minDist = d;
      }
    }
    let i1x = coords[2 * i1];
    let i1y = coords[2 * i1 + 1];
    let minRadius = Infinity;
    for (let i = 0; i < n; i++) {
      if (i === i0 || i === i1)
        continue;
      const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
      if (r < minRadius) {
        i2 = i;
        minRadius = r;
      }
    }
    let i2x = coords[2 * i2];
    let i2y = coords[2 * i2 + 1];
    if (minRadius === Infinity) {
      for (let i = 0; i < n; i++) {
        this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
      }
      quicksort(this._ids, this._dists, 0, n - 1);
      const hull = new Uint32Array(n);
      let j = 0;
      for (let i = 0, d0 = -Infinity; i < n; i++) {
        const id = this._ids[i];
        const d = this._dists[id];
        if (d > d0) {
          hull[j++] = id;
          d0 = d;
        }
      }
      this.hull = hull.subarray(0, j);
      this.triangles = new Uint32Array(0);
      this.halfedges = new Uint32Array(0);
      return;
    }
    if (orient2d(i0x, i0y, i1x, i1y, i2x, i2y) < 0) {
      const i = i1;
      const x2 = i1x;
      const y2 = i1y;
      i1 = i2;
      i1x = i2x;
      i1y = i2y;
      i2 = i;
      i2x = x2;
      i2y = y2;
    }
    const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
    this._cx = center.x;
    this._cy = center.y;
    for (let i = 0; i < n; i++) {
      this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
    }
    quicksort(this._ids, this._dists, 0, n - 1);
    this._hullStart = i0;
    let hullSize = 3;
    hullNext[i0] = hullPrev[i2] = i1;
    hullNext[i1] = hullPrev[i0] = i2;
    hullNext[i2] = hullPrev[i1] = i0;
    hullTri[i0] = 0;
    hullTri[i1] = 1;
    hullTri[i2] = 2;
    hullHash.fill(-1);
    hullHash[this._hashKey(i0x, i0y)] = i0;
    hullHash[this._hashKey(i1x, i1y)] = i1;
    hullHash[this._hashKey(i2x, i2y)] = i2;
    this.trianglesLen = 0;
    this._addTriangle(i0, i1, i2, -1, -1, -1);
    for (let k2 = 0, xp, yp; k2 < this._ids.length; k2++) {
      const i = this._ids[k2];
      const x2 = coords[2 * i];
      const y2 = coords[2 * i + 1];
      if (k2 > 0 && Math.abs(x2 - xp) <= EPSILON && Math.abs(y2 - yp) <= EPSILON)
        continue;
      xp = x2;
      yp = y2;
      if (i === i0 || i === i1 || i === i2)
        continue;
      let start2 = 0;
      for (let j = 0, key = this._hashKey(x2, y2); j < this._hashSize; j++) {
        start2 = hullHash[(key + j) % this._hashSize];
        if (start2 !== -1 && start2 !== hullNext[start2])
          break;
      }
      start2 = hullPrev[start2];
      let e = start2, q;
      while (q = hullNext[e], orient2d(x2, y2, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1]) >= 0) {
        e = q;
        if (e === start2) {
          e = -1;
          break;
        }
      }
      if (e === -1)
        continue;
      let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);
      hullTri[i] = this._legalize(t + 2);
      hullTri[e] = t;
      hullSize++;
      let n2 = hullNext[e];
      while (q = hullNext[n2], orient2d(x2, y2, coords[2 * n2], coords[2 * n2 + 1], coords[2 * q], coords[2 * q + 1]) < 0) {
        t = this._addTriangle(n2, i, q, hullTri[i], -1, hullTri[n2]);
        hullTri[i] = this._legalize(t + 2);
        hullNext[n2] = n2;
        hullSize--;
        n2 = q;
      }
      if (e === start2) {
        while (q = hullPrev[e], orient2d(x2, y2, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1]) < 0) {
          t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
          this._legalize(t + 2);
          hullTri[q] = t;
          hullNext[e] = e;
          hullSize--;
          e = q;
        }
      }
      this._hullStart = hullPrev[i] = e;
      hullNext[e] = hullPrev[n2] = i;
      hullNext[i] = n2;
      hullHash[this._hashKey(x2, y2)] = i;
      hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
    }
    this.hull = new Uint32Array(hullSize);
    for (let i = 0, e = this._hullStart; i < hullSize; i++) {
      this.hull[i] = e;
      e = hullNext[e];
    }
    this.triangles = this._triangles.subarray(0, this.trianglesLen);
    this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
  }
  _hashKey(x2, y2) {
    return Math.floor(pseudoAngle(x2 - this._cx, y2 - this._cy) * this._hashSize) % this._hashSize;
  }
  _legalize(a2) {
    const { _triangles: triangles, _halfedges: halfedges, coords } = this;
    let i = 0;
    let ar = 0;
    while (true) {
      const b = halfedges[a2];
      const a0 = a2 - a2 % 3;
      ar = a0 + (a2 + 2) % 3;
      if (b === -1) {
        if (i === 0)
          break;
        a2 = EDGE_STACK[--i];
        continue;
      }
      const b0 = b - b % 3;
      const al = a0 + (a2 + 1) % 3;
      const bl = b0 + (b + 2) % 3;
      const p0 = triangles[ar];
      const pr = triangles[a2];
      const pl = triangles[al];
      const p1 = triangles[bl];
      const illegal = inCircle(
        coords[2 * p0],
        coords[2 * p0 + 1],
        coords[2 * pr],
        coords[2 * pr + 1],
        coords[2 * pl],
        coords[2 * pl + 1],
        coords[2 * p1],
        coords[2 * p1 + 1]
      );
      if (illegal) {
        triangles[a2] = p1;
        triangles[b] = p0;
        const hbl = halfedges[bl];
        if (hbl === -1) {
          let e = this._hullStart;
          do {
            if (this._hullTri[e] === bl) {
              this._hullTri[e] = a2;
              break;
            }
            e = this._hullPrev[e];
          } while (e !== this._hullStart);
        }
        this._link(a2, hbl);
        this._link(b, halfedges[ar]);
        this._link(ar, bl);
        const br = b0 + (b + 1) % 3;
        if (i < EDGE_STACK.length) {
          EDGE_STACK[i++] = br;
        }
      } else {
        if (i === 0)
          break;
        a2 = EDGE_STACK[--i];
      }
    }
    return ar;
  }
  _link(a2, b) {
    this._halfedges[a2] = b;
    if (b !== -1)
      this._halfedges[b] = a2;
  }
  // add a new triangle given vertex indices and adjacent half-edge ids
  _addTriangle(i0, i1, i2, a2, b, c6) {
    const t = this.trianglesLen;
    this._triangles[t] = i0;
    this._triangles[t + 1] = i1;
    this._triangles[t + 2] = i2;
    this._link(t, a2);
    this._link(t + 1, b);
    this._link(t + 2, c6);
    this.trianglesLen += 3;
    return t;
  }
};
function pseudoAngle(dx, dy) {
  const p = dx / (Math.abs(dx) + Math.abs(dy));
  return (dy > 0 ? 3 - p : 1 + p) / 4;
}
function dist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}
function inCircle(ax, ay, bx, by, cx, cy, px, py) {
  const dx = ax - px;
  const dy = ay - py;
  const ex = bx - px;
  const ey = by - py;
  const fx = cx - px;
  const fy = cy - py;
  const ap = dx * dx + dy * dy;
  const bp = ex * ex + ey * ey;
  const cp = fx * fx + fy * fy;
  return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
}
function circumradius(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d = 0.5 / (dx * ey - dy * ex);
  const x2 = (ey * bl - dy * cl) * d;
  const y2 = (dx * cl - ex * bl) * d;
  return x2 * x2 + y2 * y2;
}
function circumcenter(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d = 0.5 / (dx * ey - dy * ex);
  const x2 = ax + (ey * bl - dy * cl) * d;
  const y2 = ay + (dx * cl - ex * bl) * d;
  return { x: x2, y: y2 };
}
function quicksort(ids, dists, left, right) {
  if (right - left <= 20) {
    for (let i = left + 1; i <= right; i++) {
      const temp = ids[i];
      const tempDist = dists[temp];
      let j = i - 1;
      while (j >= left && dists[ids[j]] > tempDist)
        ids[j + 1] = ids[j--];
      ids[j + 1] = temp;
    }
  } else {
    const median2 = left + right >> 1;
    let i = left + 1;
    let j = right;
    swap(ids, median2, i);
    if (dists[ids[left]] > dists[ids[right]])
      swap(ids, left, right);
    if (dists[ids[i]] > dists[ids[right]])
      swap(ids, i, right);
    if (dists[ids[left]] > dists[ids[i]])
      swap(ids, left, i);
    const temp = ids[i];
    const tempDist = dists[temp];
    while (true) {
      do
        i++;
      while (dists[ids[i]] < tempDist);
      do
        j--;
      while (dists[ids[j]] > tempDist);
      if (j < i)
        break;
      swap(ids, i, j);
    }
    ids[left + 1] = ids[j];
    ids[j] = temp;
    if (right - i + 1 >= j - left) {
      quicksort(ids, dists, i, right);
      quicksort(ids, dists, left, j - 1);
    } else {
      quicksort(ids, dists, left, j - 1);
      quicksort(ids, dists, i, right);
    }
  }
}
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
function defaultGetX(p) {
  return p[0];
}
function defaultGetY(p) {
  return p[1];
}

// node_modules/d3-delaunay/src/path.js
var epsilon5 = 1e-6;
var Path2 = class {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
  }
  moveTo(x2, y2) {
    this._ += `M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  }
  lineTo(x2, y2) {
    this._ += `L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  arc(x2, y2, r) {
    x2 = +x2, y2 = +y2, r = +r;
    const x0 = x2 + r;
    const y0 = y2;
    if (r < 0)
      throw new Error("negative radius");
    if (this._x1 === null)
      this._ += `M${x0},${y0}`;
    else if (Math.abs(this._x1 - x0) > epsilon5 || Math.abs(this._y1 - y0) > epsilon5)
      this._ += "L" + x0 + "," + y0;
    if (!r)
      return;
    this._ += `A${r},${r},0,1,1,${x2 - r},${y2}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
  }
  rect(x2, y2, w, h) {
    this._ += `M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${+w}v${+h}h${-w}Z`;
  }
  value() {
    return this._ || null;
  }
};

// node_modules/d3-delaunay/src/polygon.js
var Polygon = class {
  constructor() {
    this._ = [];
  }
  moveTo(x2, y2) {
    this._.push([x2, y2]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x2, y2) {
    this._.push([x2, y2]);
  }
  value() {
    return this._.length ? this._ : null;
  }
};

// node_modules/d3-delaunay/src/voronoi.js
var Voronoi = class {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin)))
      throw new Error("invalid bounds");
    this.delaunay = delaunay;
    this._circumcenters = new Float64Array(delaunay.points.length * 2);
    this.vectors = new Float64Array(delaunay.points.length * 2);
    this.xmax = xmax, this.xmin = xmin;
    this.ymax = ymax, this.ymin = ymin;
    this._init();
  }
  update() {
    this.delaunay.update();
    this._init();
    return this;
  }
  _init() {
    const { delaunay: { points, hull, triangles }, vectors } = this;
    let bx, by;
    const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
    for (let i = 0, j = 0, n = triangles.length, x2, y2; i < n; i += 3, j += 2) {
      const t13 = triangles[i] * 2;
      const t22 = triangles[i + 1] * 2;
      const t32 = triangles[i + 2] * 2;
      const x12 = points[t13];
      const y12 = points[t13 + 1];
      const x22 = points[t22];
      const y22 = points[t22 + 1];
      const x3 = points[t32];
      const y3 = points[t32 + 1];
      const dx = x22 - x12;
      const dy = y22 - y12;
      const ex = x3 - x12;
      const ey = y3 - y12;
      const ab4 = (dx * ey - dy * ex) * 2;
      if (Math.abs(ab4) < 1e-9) {
        if (bx === void 0) {
          bx = by = 0;
          for (const i2 of hull)
            bx += points[i2 * 2], by += points[i2 * 2 + 1];
          bx /= hull.length, by /= hull.length;
        }
        const a2 = 1e9 * Math.sign((bx - x12) * ey - (by - y12) * ex);
        x2 = (x12 + x3) / 2 - a2 * ey;
        y2 = (y12 + y3) / 2 + a2 * ex;
      } else {
        const d = 1 / ab4;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        x2 = x12 + (ey * bl - dy * cl) * d;
        y2 = y12 + (dx * cl - ex * bl) * d;
      }
      circumcenters[j] = x2;
      circumcenters[j + 1] = y2;
    }
    let h = hull[hull.length - 1];
    let p0, p1 = h * 4;
    let x0, x1 = points[2 * h];
    let y0, y1 = points[2 * h + 1];
    vectors.fill(0);
    for (let i = 0; i < hull.length; ++i) {
      h = hull[i];
      p0 = p1, x0 = x1, y0 = y1;
      p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
      vectors[p0 + 2] = vectors[p1] = y0 - y1;
      vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
    }
  }
  render(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
    if (hull.length <= 1)
      return null;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i)
        continue;
      const ti = Math.floor(i / 3) * 2;
      const tj = Math.floor(j / 3) * 2;
      const xi = circumcenters[ti];
      const yi = circumcenters[ti + 1];
      const xj = circumcenters[tj];
      const yj = circumcenters[tj + 1];
      this._renderSegment(xi, yi, xj, yj, context);
    }
    let h0, h1 = hull[hull.length - 1];
    for (let i = 0; i < hull.length; ++i) {
      h0 = h1, h1 = hull[i];
      const t = Math.floor(inedges[h1] / 3) * 2;
      const x2 = circumcenters[t];
      const y2 = circumcenters[t + 1];
      const v2 = h0 * 4;
      const p = this._project(x2, y2, vectors[v2 + 2], vectors[v2 + 3]);
      if (p)
        this._renderSegment(x2, y2, p[0], p[1], context);
    }
    return buffer && buffer.value();
  }
  renderBounds(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i, context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const points = this._clip(i);
    if (points === null || !points.length)
      return;
    context.moveTo(points[0], points[1]);
    let n = points.length;
    while (points[0] === points[n - 2] && points[1] === points[n - 1] && n > 1)
      n -= 2;
    for (let i2 = 2; i2 < n; i2 += 2) {
      if (points[i2] !== points[i2 - 2] || points[i2 + 1] !== points[i2 - 1])
        context.lineTo(points[i2], points[i2 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  *cellPolygons() {
    const { delaunay: { points } } = this;
    for (let i = 0, n = points.length / 2; i < n; ++i) {
      const cell = this.cellPolygon(i);
      if (cell)
        cell.index = i, yield cell;
    }
  }
  cellPolygon(i) {
    const polygon = new Polygon();
    this.renderCell(i, polygon);
    return polygon.value();
  }
  _renderSegment(x0, y0, x1, y1, context) {
    let S;
    const c0 = this._regioncode(x0, y0);
    const c12 = this._regioncode(x1, y1);
    if (c0 === 0 && c12 === 0) {
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
    } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c12)) {
      context.moveTo(S[0], S[1]);
      context.lineTo(S[2], S[3]);
    }
  }
  contains(i, x2, y2) {
    if ((x2 = +x2, x2 !== x2) || (y2 = +y2, y2 !== y2))
      return false;
    return this.delaunay._step(i, x2, y2) === i;
  }
  *neighbors(i) {
    const ci = this._clip(i);
    if (ci)
      for (const j of this.delaunay.neighbors(i)) {
        const cj = this._clip(j);
        if (cj)
          loop:
            for (let ai = 0, li = ci.length; ai < li; ai += 2) {
              for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
                if (ci[ai] === cj[aj] && ci[ai + 1] === cj[aj + 1] && ci[(ai + 2) % li] === cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] === cj[(aj + lj - 1) % lj]) {
                  yield j;
                  break loop;
                }
              }
            }
      }
  }
  _cell(i) {
    const { circumcenters, delaunay: { inedges, halfedges, triangles } } = this;
    const e0 = inedges[i];
    if (e0 === -1)
      return null;
    const points = [];
    let e = e0;
    do {
      const t = Math.floor(e / 3);
      points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i)
        break;
      e = halfedges[e];
    } while (e !== e0 && e !== -1);
    return points;
  }
  _clip(i) {
    if (i === 0 && this.delaunay.hull.length === 1) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    const points = this._cell(i);
    if (points === null)
      return null;
    const { vectors: V } = this;
    const v2 = i * 4;
    return this._simplify(V[v2] || V[v2 + 1] ? this._clipInfinite(i, points, V[v2], V[v2 + 1], V[v2 + 2], V[v2 + 3]) : this._clipFinite(i, points));
  }
  _clipFinite(i, points) {
    const n = points.length;
    let P = null;
    let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
    let c0, c12 = this._regioncode(x1, y1);
    let e0, e1 = 0;
    for (let j = 0; j < n; j += 2) {
      x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
      c0 = c12, c12 = this._regioncode(x1, y1);
      if (c0 === 0 && c12 === 0) {
        e0 = e1, e1 = 0;
        if (P)
          P.push(x1, y1);
        else
          P = [x1, y1];
      } else {
        let S, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S = this._clipSegment(x0, y0, x1, y1, c0, c12)) === null)
            continue;
          [sx0, sy0, sx1, sy1] = S;
        } else {
          if ((S = this._clipSegment(x1, y1, x0, y0, c12, c0)) === null)
            continue;
          [sx1, sy1, sx0, sy0] = S;
          e0 = e1, e1 = this._edgecode(sx0, sy0);
          if (e0 && e1)
            this._edge(i, e0, e1, P, P.length);
          if (P)
            P.push(sx0, sy0);
          else
            P = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1);
        if (e0 && e1)
          this._edge(i, e0, e1, P, P.length);
        if (P)
          P.push(sx1, sy1);
        else
          P = [sx1, sy1];
      }
    }
    if (P) {
      e0 = e1, e1 = this._edgecode(P[0], P[1]);
      if (e0 && e1)
        this._edge(i, e0, e1, P, P.length);
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    return P;
  }
  _clipSegment(x0, y0, x1, y1, c0, c12) {
    const flip = c0 < c12;
    if (flip)
      [x0, y0, x1, y1, c0, c12] = [x1, y1, x0, y0, c12, c0];
    while (true) {
      if (c0 === 0 && c12 === 0)
        return flip ? [x1, y1, x0, y0] : [x0, y0, x1, y1];
      if (c0 & c12)
        return null;
      let x2, y2, c6 = c0 || c12;
      if (c6 & 8)
        x2 = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y2 = this.ymax;
      else if (c6 & 4)
        x2 = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y2 = this.ymin;
      else if (c6 & 2)
        y2 = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x2 = this.xmax;
      else
        y2 = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x2 = this.xmin;
      if (c0)
        x0 = x2, y0 = y2, c0 = this._regioncode(x0, y0);
      else
        x1 = x2, y1 = y2, c12 = this._regioncode(x1, y1);
    }
  }
  _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
    let P = Array.from(points), p;
    if (p = this._project(P[0], P[1], vx0, vy0))
      P.unshift(p[0], p[1]);
    if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn))
      P.push(p[0], p[1]);
    if (P = this._clipFinite(i, P)) {
      for (let j = 0, n = P.length, c0, c12 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
        c0 = c12, c12 = this._edgecode(P[j], P[j + 1]);
        if (c0 && c12)
          j = this._edge(i, c0, c12, P, j), n = P.length;
      }
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
    }
    return P;
  }
  _edge(i, e0, e1, P, j) {
    while (e0 !== e1) {
      let x2, y2;
      switch (e0) {
        case 5:
          e0 = 4;
          continue;
        case 4:
          e0 = 6, x2 = this.xmax, y2 = this.ymin;
          break;
        case 6:
          e0 = 2;
          continue;
        case 2:
          e0 = 10, x2 = this.xmax, y2 = this.ymax;
          break;
        case 10:
          e0 = 8;
          continue;
        case 8:
          e0 = 9, x2 = this.xmin, y2 = this.ymax;
          break;
        case 9:
          e0 = 1;
          continue;
        case 1:
          e0 = 5, x2 = this.xmin, y2 = this.ymin;
          break;
      }
      if ((P[j] !== x2 || P[j + 1] !== y2) && this.contains(i, x2, y2)) {
        P.splice(j, 0, x2, y2), j += 2;
      }
    }
    return j;
  }
  _project(x0, y0, vx, vy) {
    let t = Infinity, c6, x2, y2;
    if (vy < 0) {
      if (y0 <= this.ymin)
        return null;
      if ((c6 = (this.ymin - y0) / vy) < t)
        y2 = this.ymin, x2 = x0 + (t = c6) * vx;
    } else if (vy > 0) {
      if (y0 >= this.ymax)
        return null;
      if ((c6 = (this.ymax - y0) / vy) < t)
        y2 = this.ymax, x2 = x0 + (t = c6) * vx;
    }
    if (vx > 0) {
      if (x0 >= this.xmax)
        return null;
      if ((c6 = (this.xmax - x0) / vx) < t)
        x2 = this.xmax, y2 = y0 + (t = c6) * vy;
    } else if (vx < 0) {
      if (x0 <= this.xmin)
        return null;
      if ((c6 = (this.xmin - x0) / vx) < t)
        x2 = this.xmin, y2 = y0 + (t = c6) * vy;
    }
    return [x2, y2];
  }
  _edgecode(x2, y2) {
    return (x2 === this.xmin ? 1 : x2 === this.xmax ? 2 : 0) | (y2 === this.ymin ? 4 : y2 === this.ymax ? 8 : 0);
  }
  _regioncode(x2, y2) {
    return (x2 < this.xmin ? 1 : x2 > this.xmax ? 2 : 0) | (y2 < this.ymin ? 4 : y2 > this.ymax ? 8 : 0);
  }
  _simplify(P) {
    if (P && P.length > 4) {
      for (let i = 0; i < P.length; i += 2) {
        const j = (i + 2) % P.length, k2 = (i + 4) % P.length;
        if (P[i] === P[j] && P[j] === P[k2] || P[i + 1] === P[j + 1] && P[j + 1] === P[k2 + 1]) {
          P.splice(j, 2), i -= 2;
        }
      }
      if (!P.length)
        P = null;
    }
    return P;
  }
};

// node_modules/d3-delaunay/src/delaunay.js
var tau3 = 2 * Math.PI;
var pow2 = Math.pow;
function pointX(p) {
  return p[0];
}
function pointY(p) {
  return p[1];
}
function collinear(d) {
  const { triangles, coords } = d;
  for (let i = 0; i < triangles.length; i += 3) {
    const a2 = 2 * triangles[i], b = 2 * triangles[i + 1], c6 = 2 * triangles[i + 2], cross2 = (coords[c6] - coords[a2]) * (coords[b + 1] - coords[a2 + 1]) - (coords[b] - coords[a2]) * (coords[c6 + 1] - coords[a2 + 1]);
    if (cross2 > 1e-10)
      return false;
  }
  return true;
}
function jitter(x2, y2, r) {
  return [x2 + Math.sin(x2 + y2) * r, y2 + Math.cos(x2 - y2) * r];
}
var Delaunay = class _Delaunay {
  static from(points, fx = pointX, fy = pointY, that) {
    return new _Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
  }
  constructor(points) {
    this._delaunator = new Delaunator(points);
    this.inedges = new Int32Array(points.length / 2);
    this._hullIndex = new Int32Array(points.length / 2);
    this.points = this._delaunator.coords;
    this._init();
  }
  update() {
    this._delaunator.update();
    this._init();
    return this;
  }
  _init() {
    const d = this._delaunator, points = this.points;
    if (d.hull && d.hull.length > 2 && collinear(d)) {
      this.collinear = Int32Array.from({ length: points.length / 2 }, (_, i) => i).sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]);
      const e = this.collinear[0], f = this.collinear[this.collinear.length - 1], bounds = [points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1]], r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
      for (let i = 0, n = points.length / 2; i < n; ++i) {
        const p = jitter(points[2 * i], points[2 * i + 1], r);
        points[2 * i] = p[0];
        points[2 * i + 1] = p[1];
      }
      this._delaunator = new Delaunator(points);
    } else {
      delete this.collinear;
    }
    const halfedges = this.halfedges = this._delaunator.halfedges;
    const hull = this.hull = this._delaunator.hull;
    const triangles = this.triangles = this._delaunator.triangles;
    const inedges = this.inedges.fill(-1);
    const hullIndex = this._hullIndex.fill(-1);
    for (let e = 0, n = halfedges.length; e < n; ++e) {
      const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
      if (halfedges[e] === -1 || inedges[p] === -1)
        inedges[p] = e;
    }
    for (let i = 0, n = hull.length; i < n; ++i) {
      hullIndex[hull[i]] = i;
    }
    if (hull.length <= 2 && hull.length > 0) {
      this.triangles = new Int32Array(3).fill(-1);
      this.halfedges = new Int32Array(3).fill(-1);
      this.triangles[0] = hull[0];
      inedges[hull[0]] = 1;
      if (hull.length === 2) {
        inedges[hull[1]] = 0;
        this.triangles[1] = hull[1];
        this.triangles[2] = hull[1];
      }
    }
  }
  voronoi(bounds) {
    return new Voronoi(this, bounds);
  }
  *neighbors(i) {
    const { inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear2 } = this;
    if (collinear2) {
      const l = collinear2.indexOf(i);
      if (l > 0)
        yield collinear2[l - 1];
      if (l < collinear2.length - 1)
        yield collinear2[l + 1];
      return;
    }
    const e0 = inedges[i];
    if (e0 === -1)
      return;
    let e = e0, p0 = -1;
    do {
      yield p0 = triangles[e];
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i)
        return;
      e = halfedges[e];
      if (e === -1) {
        const p = hull[(_hullIndex[i] + 1) % hull.length];
        if (p !== p0)
          yield p;
        return;
      }
    } while (e !== e0);
  }
  find(x2, y2, i = 0) {
    if ((x2 = +x2, x2 !== x2) || (y2 = +y2, y2 !== y2))
      return -1;
    const i0 = i;
    let c6;
    while ((c6 = this._step(i, x2, y2)) >= 0 && c6 !== i && c6 !== i0)
      i = c6;
    return c6;
  }
  _step(i, x2, y2) {
    const { inedges, hull, _hullIndex, halfedges, triangles, points } = this;
    if (inedges[i] === -1 || !points.length)
      return (i + 1) % (points.length >> 1);
    let c6 = i;
    let dc = pow2(x2 - points[i * 2], 2) + pow2(y2 - points[i * 2 + 1], 2);
    const e0 = inedges[i];
    let e = e0;
    do {
      let t = triangles[e];
      const dt = pow2(x2 - points[t * 2], 2) + pow2(y2 - points[t * 2 + 1], 2);
      if (dt < dc)
        dc = dt, c6 = t;
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i)
        break;
      e = halfedges[e];
      if (e === -1) {
        e = hull[(_hullIndex[i] + 1) % hull.length];
        if (e !== t) {
          if (pow2(x2 - points[e * 2], 2) + pow2(y2 - points[e * 2 + 1], 2) < dc)
            return e;
        }
        break;
      }
    } while (e !== e0);
    return c6;
  }
  render(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points, halfedges, triangles } = this;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i)
        continue;
      const ti = triangles[i] * 2;
      const tj = triangles[j] * 2;
      context.moveTo(points[ti], points[ti + 1]);
      context.lineTo(points[tj], points[tj + 1]);
    }
    this.renderHull(context);
    return buffer && buffer.value();
  }
  renderPoints(context, r) {
    if (r === void 0 && (!context || typeof context.moveTo !== "function"))
      r = context, context = null;
    r = r == void 0 ? 2 : +r;
    const buffer = context == null ? context = new Path2() : void 0;
    const { points } = this;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x2 = points[i], y2 = points[i + 1];
      context.moveTo(x2 + r, y2);
      context.arc(x2, y2, r, 0, tau3);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { hull, points } = this;
    const h = hull[0] * 2, n = hull.length;
    context.moveTo(points[h], points[h + 1]);
    for (let i = 1; i < n; ++i) {
      const h2 = 2 * hull[i];
      context.lineTo(points[h2], points[h2 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  hullPolygon() {
    const polygon = new Polygon();
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i, context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points, triangles } = this;
    const t03 = triangles[i *= 3] * 2;
    const t13 = triangles[i + 1] * 2;
    const t22 = triangles[i + 2] * 2;
    context.moveTo(points[t03], points[t03 + 1]);
    context.lineTo(points[t13], points[t13 + 1]);
    context.lineTo(points[t22], points[t22 + 1]);
    context.closePath();
    return buffer && buffer.value();
  }
  *trianglePolygons() {
    const { triangles } = this;
    for (let i = 0, n = triangles.length / 3; i < n; ++i) {
      yield this.trianglePolygon(i);
    }
  }
  trianglePolygon(i) {
    const polygon = new Polygon();
    this.renderTriangle(i, polygon);
    return polygon.value();
  }
};
function flatArray(points, fx, fy, that) {
  const n = points.length;
  const array2 = new Float64Array(n * 2);
  for (let i = 0; i < n; ++i) {
    const p = points[i];
    array2[i * 2] = fx.call(that, p, i, points);
    array2[i * 2 + 1] = fy.call(that, p, i, points);
  }
  return array2;
}
function* flatIterable(points, fx, fy, that) {
  let i = 0;
  for (const p of points) {
    yield fx.call(that, p, i, points);
    yield fy.call(that, p, i, points);
    ++i;
  }
}

// node_modules/@mui/x-charts/esm/ChartsVoronoiHandler/ChartsVoronoiHandler.js
init_useEnhancedEffect();

// node_modules/@mui/x-charts/esm/internals/utils.js
function getSymbol(shape) {
  const symbolNames = "circle cross diamond square star triangle wye".split(/ /);
  return symbolNames.indexOf(shape) || 0;
}
function getSVGPoint(svg, event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
function getPercentageValue(value, refValue) {
  if (typeof value === "number") {
    return value;
  }
  if (value === "100%") {
    return refValue;
  }
  if (value.endsWith("%")) {
    const percentage = Number.parseFloat(value.slice(0, value.length - 1));
    if (!Number.isNaN(percentage)) {
      return percentage * refValue / 100;
    }
  }
  if (value.endsWith("px")) {
    const val = Number.parseFloat(value.slice(0, value.length - 2));
    if (!Number.isNaN(val)) {
      return val;
    }
  }
  throw Error(`MUI-Charts: Received an unknown value "${value}". It should be a number, or a string with a percentage value.`);
}
function cleanId(id) {
  return id.replace(" ", "_");
}

// node_modules/@mui/x-charts/esm/ChartsVoronoiHandler/ChartsVoronoiHandler.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
function ChartsVoronoiHandler(props) {
  const {
    voronoiMaxRadius,
    onItemClick
  } = props;
  const svgRef = useSvgRef();
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = React32.useContext(CartesianContext);
  const {
    dispatch
  } = React32.useContext(InteractionContext);
  const {
    series,
    seriesOrder
  } = React32.useContext(SeriesContext).scatter ?? {};
  const voronoiRef = React32.useRef({});
  const delauneyRef = React32.useRef(void 0);
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  useEnhancedEffect_default(() => {
    dispatch({
      type: "updateVoronoiUsage",
      useVoronoiInteraction: true
    });
    return () => {
      dispatch({
        type: "updateVoronoiUsage",
        useVoronoiInteraction: false
      });
    };
  }, [dispatch]);
  useEnhancedEffect_default(() => {
    if (seriesOrder === void 0 || series === void 0) {
      return;
    }
    voronoiRef.current = {};
    let points = [];
    seriesOrder.forEach((seriesId) => {
      const {
        data,
        xAxisKey,
        yAxisKey
      } = series[seriesId];
      const xScale = xAxis[xAxisKey ?? defaultXAxisId].scale;
      const yScale = yAxis[yAxisKey ?? defaultYAxisId].scale;
      const getXPosition = getValueToPositionMapper(xScale);
      const getYPosition = getValueToPositionMapper(yScale);
      const seriesPoints = data.flatMap(({
        x: x2,
        y: y2
      }) => [getXPosition(x2), getYPosition(y2)]);
      voronoiRef.current[seriesId] = {
        seriesId,
        startIndex: points.length,
        endIndex: points.length + seriesPoints.length
      };
      points = points.concat(seriesPoints);
    });
    delauneyRef.current = new Delaunay(points);
  }, [defaultXAxisId, defaultYAxisId, series, seriesOrder, xAxis, yAxis]);
  React32.useEffect(() => {
    const element = svgRef.current;
    if (element === null) {
      return void 0;
    }
    function getClosestPoint(event) {
      const svgPoint = getSVGPoint(svgRef.current, event);
      const outsideX = svgPoint.x < left || svgPoint.x > left + width;
      const outsideY = svgPoint.y < top || svgPoint.y > top + height;
      if (outsideX || outsideY) {
        return "outside-chart";
      }
      if (!delauneyRef.current) {
        return "no-point-found";
      }
      const closestPointIndex = delauneyRef.current.find(svgPoint.x, svgPoint.y);
      if (closestPointIndex === void 0) {
        return "no-point-found";
      }
      const closestSeries = Object.values(voronoiRef.current).find((value) => {
        return 2 * closestPointIndex >= value.startIndex && 2 * closestPointIndex < value.endIndex;
      });
      if (closestSeries === void 0) {
        return "no-point-found";
      }
      const dataIndex = (2 * closestPointIndex - voronoiRef.current[closestSeries.seriesId].startIndex) / 2;
      if (voronoiMaxRadius !== void 0) {
        const pointX2 = delauneyRef.current.points[2 * closestPointIndex];
        const pointY2 = delauneyRef.current.points[2 * closestPointIndex + 1];
        const dist2 = (pointX2 - svgPoint.x) ** 2 + (pointY2 - svgPoint.y) ** 2;
        if (dist2 > voronoiMaxRadius ** 2) {
          return "outside-voronoi-max-radius";
        }
      }
      return {
        seriesId: closestSeries.seriesId,
        dataIndex
      };
    }
    const handleMouseOut = () => {
      dispatch({
        type: "exitChart"
      });
    };
    const handleMouseMove = (event) => {
      const closestPoint = getClosestPoint(event);
      if (closestPoint === "outside-chart") {
        dispatch({
          type: "exitChart"
        });
        return;
      }
      if (closestPoint === "outside-voronoi-max-radius" || closestPoint === "no-point-found") {
        dispatch({
          type: "leaveItem",
          data: {
            type: "scatter"
          }
        });
        return;
      }
      const {
        seriesId,
        dataIndex
      } = closestPoint;
      dispatch({
        type: "enterItem",
        data: {
          type: "scatter",
          seriesId,
          dataIndex
        }
      });
    };
    const handleMouseClick = (event) => {
      if (!onItemClick) {
        return;
      }
      const closestPoint = getClosestPoint(event);
      if (typeof closestPoint === "string") {
        return;
      }
      const {
        seriesId,
        dataIndex
      } = closestPoint;
      onItemClick(event, {
        type: "scatter",
        seriesId,
        dataIndex
      });
    };
    element.addEventListener("mouseout", handleMouseOut);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleMouseClick);
    return () => {
      element.removeEventListener("mouseout", handleMouseOut);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleMouseClick);
    };
  }, [svgRef, dispatch, left, width, top, height, yAxis, xAxis, voronoiMaxRadius, onItemClick]);
  return (0, import_jsx_runtime23.jsx)(React32.Fragment, {});
}
true ? ChartsVoronoiHandler.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when clicking on a scatter item.
   * @param {MouseEvent} event Mouse event caught at the svg level
   * @param {ScatterItemIdentifier} scatterItemIdentifier Identify which item got clicked
   */
  onItemClick: import_prop_types17.default.func,
  /**
   * Defines the maximal distance between a scatter point and the pointer that triggers the interaction.
   * If `undefined`, the radius is assumed to be infinite.
   */
  voronoiMaxRadius: import_prop_types17.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsOnAxisClickHandler/ChartsOnAxisClickHandler.js
var React33 = __toESM(require_react());
var import_prop_types18 = __toESM(require_prop_types());
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
function ChartsOnAxisClickHandler(props) {
  const {
    onAxisClick
  } = props;
  const svgRef = React33.useContext(SvgContext);
  const series = React33.useContext(SeriesContext);
  const {
    axis
  } = React33.useContext(InteractionContext);
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = React33.useContext(CartesianContext);
  React33.useEffect(() => {
    const element = svgRef.current;
    if (element === null || !onAxisClick) {
      return () => {
      };
    }
    const handleMouseClick = (event) => {
      var _a;
      event.preventDefault();
      const isXaxis = (axis.x && axis.x.index) !== void 0;
      const USED_AXIS_ID = isXaxis ? xAxisIds[0] : yAxisIds[0];
      const dataIndex = isXaxis ? axis.x && axis.x.index : axis.y && axis.y.index;
      if (dataIndex == null) {
        return;
      }
      const seriesValues = {};
      Object.keys(series).filter((seriesType) => ["bar", "line"].includes(seriesType)).forEach((seriesType) => {
        var _a2;
        (_a2 = series[seriesType]) == null ? void 0 : _a2.seriesOrder.forEach((seriesId) => {
          const seriesItem = series[seriesType].series[seriesId];
          const axisKey = isXaxis ? seriesItem.xAxisKey : seriesItem.yAxisKey;
          if (axisKey === void 0 || axisKey === USED_AXIS_ID) {
            seriesValues[seriesId] = seriesItem.data[dataIndex];
          }
        });
      });
      const axisValue = (_a = (isXaxis ? xAxis : yAxis)[USED_AXIS_ID].data) == null ? void 0 : _a[dataIndex];
      onAxisClick(event, {
        dataIndex,
        axisValue,
        seriesValues
      });
    };
    element.addEventListener("click", handleMouseClick);
    return () => {
      element.removeEventListener("click", handleMouseClick);
    };
  }, [axis.x, axis.y, onAxisClick, series, svgRef, xAxis, xAxisIds, yAxis, yAxisIds]);
  return (0, import_jsx_runtime24.jsx)(React33.Fragment, {});
}
true ? ChartsOnAxisClickHandler.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | AxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: import_prop_types18.default.func
} : void 0;

// node_modules/@mui/x-charts/esm/BarChart/BarChart.js
init_extends();
var React55 = __toESM(require_react());
init_useId();
var import_prop_types27 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/BarChart/BarPlot.js
init_objectWithoutPropertiesLoose();
init_extends();
var React43 = __toESM(require_react());
var import_prop_types23 = __toESM(require_prop_types());

// node_modules/@react-spring/shared/dist/react-spring_shared.modern.mjs
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_react5 = __toESM(require_react(), 1);
var import_react6 = __toESM(require_react(), 1);
var import_react7 = __toESM(require_react(), 1);
var import_react8 = __toESM(require_react(), 1);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var globals_exports = {};
__export(globals_exports, {
  assign: () => assign,
  colors: () => colors,
  createStringInterpolator: () => createStringInterpolator,
  skipAnimation: () => skipAnimation,
  to: () => to,
  willAdvance: () => willAdvance
});
var updateQueue = makeQueue();
var raf = (fn) => schedule(fn, updateQueue);
var writeQueue = makeQueue();
raf.write = (fn) => schedule(fn, writeQueue);
var onStartQueue = makeQueue();
raf.onStart = (fn) => schedule(fn, onStartQueue);
var onFrameQueue = makeQueue();
raf.onFrame = (fn) => schedule(fn, onFrameQueue);
var onFinishQueue = makeQueue();
raf.onFinish = (fn) => schedule(fn, onFinishQueue);
var timeouts = [];
raf.setTimeout = (handler, ms) => {
  const time2 = raf.now() + ms;
  const cancel = () => {
    const i = timeouts.findIndex((t) => t.cancel == cancel);
    if (~i)
      timeouts.splice(i, 1);
    pendingCount -= ~i ? 1 : 0;
  };
  const timeout = { time: time2, handler, cancel };
  timeouts.splice(findTimeout(time2), 0, timeout);
  pendingCount += 1;
  start();
  return timeout;
};
var findTimeout = (time2) => ~(~timeouts.findIndex((t) => t.time > time2) || ~timeouts.length);
raf.cancel = (fn) => {
  onStartQueue.delete(fn);
  onFrameQueue.delete(fn);
  onFinishQueue.delete(fn);
  updateQueue.delete(fn);
  writeQueue.delete(fn);
};
raf.sync = (fn) => {
  sync = true;
  raf.batchedUpdates(fn);
  sync = false;
};
raf.throttle = (fn) => {
  let lastArgs;
  function queuedFn() {
    try {
      fn(...lastArgs);
    } finally {
      lastArgs = null;
    }
  }
  function throttled(...args) {
    lastArgs = args;
    raf.onStart(queuedFn);
  }
  throttled.handler = fn;
  throttled.cancel = () => {
    onStartQueue.delete(queuedFn);
    lastArgs = null;
  };
  return throttled;
};
var nativeRaf = typeof window != "undefined" ? window.requestAnimationFrame : (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {
  }
);
raf.use = (impl) => nativeRaf = impl;
raf.now = typeof performance != "undefined" ? () => performance.now() : Date.now;
raf.batchedUpdates = (fn) => fn();
raf.catch = console.error;
raf.frameLoop = "always";
raf.advance = () => {
  if (raf.frameLoop !== "demand") {
    console.warn(
      "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand"
    );
  } else {
    update();
  }
};
var ts = -1;
var pendingCount = 0;
var sync = false;
function schedule(fn, queue) {
  if (sync) {
    queue.delete(fn);
    fn(0);
  } else {
    queue.add(fn);
    start();
  }
}
function start() {
  if (ts < 0) {
    ts = 0;
    if (raf.frameLoop !== "demand") {
      nativeRaf(loop);
    }
  }
}
function stop() {
  ts = -1;
}
function loop() {
  if (~ts) {
    nativeRaf(loop);
    raf.batchedUpdates(update);
  }
}
function update() {
  const prevTs = ts;
  ts = raf.now();
  const count2 = findTimeout(ts);
  if (count2) {
    eachSafely(timeouts.splice(0, count2), (t) => t.handler());
    pendingCount -= count2;
  }
  if (!pendingCount) {
    stop();
    return;
  }
  onStartQueue.flush();
  updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
  onFrameQueue.flush();
  writeQueue.flush();
  onFinishQueue.flush();
}
function makeQueue() {
  let next = /* @__PURE__ */ new Set();
  let current = next;
  return {
    add(fn) {
      pendingCount += current == next && !next.has(fn) ? 1 : 0;
      next.add(fn);
    },
    delete(fn) {
      pendingCount -= current == next && next.has(fn) ? 1 : 0;
      return next.delete(fn);
    },
    flush(arg) {
      if (current.size) {
        next = /* @__PURE__ */ new Set();
        pendingCount -= current.size;
        eachSafely(current, (fn) => fn(arg) && next.add(fn));
        pendingCount += next.size;
        current = next;
      }
    }
  };
}
function eachSafely(values, each2) {
  values.forEach((value) => {
    try {
      each2(value);
    } catch (e) {
      raf.catch(e);
    }
  });
}
function noop() {
}
var defineHidden = (obj, key, value) => Object.defineProperty(obj, key, { value, writable: true, configurable: true });
var is = {
  arr: Array.isArray,
  obj: (a2) => !!a2 && a2.constructor.name === "Object",
  fun: (a2) => typeof a2 === "function",
  str: (a2) => typeof a2 === "string",
  num: (a2) => typeof a2 === "number",
  und: (a2) => a2 === void 0
};
function isEqual(a2, b) {
  if (is.arr(a2)) {
    if (!is.arr(b) || a2.length !== b.length)
      return false;
    for (let i = 0; i < a2.length; i++) {
      if (a2[i] !== b[i])
        return false;
    }
    return true;
  }
  return a2 === b;
}
var each = (obj, fn) => obj.forEach(fn);
function eachProp(obj, fn, ctx2) {
  if (is.arr(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(ctx2, obj[i], `${i}`);
    }
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(ctx2, obj[key], key);
    }
  }
}
var toArray = (a2) => is.und(a2) ? [] : is.arr(a2) ? a2 : [a2];
function flush(queue, iterator) {
  if (queue.size) {
    const items = Array.from(queue);
    queue.clear();
    each(items, iterator);
  }
}
var flushCalls = (queue, ...args) => flush(queue, (fn) => fn(...args));
var isSSR = () => typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var createStringInterpolator;
var to;
var colors = null;
var skipAnimation = false;
var willAdvance = noop;
var assign = (globals) => {
  if (globals.to)
    to = globals.to;
  if (globals.now)
    raf.now = globals.now;
  if (globals.colors !== void 0)
    colors = globals.colors;
  if (globals.skipAnimation != null)
    skipAnimation = globals.skipAnimation;
  if (globals.createStringInterpolator)
    createStringInterpolator = globals.createStringInterpolator;
  if (globals.requestAnimationFrame)
    raf.use(globals.requestAnimationFrame);
  if (globals.batchedUpdates)
    raf.batchedUpdates = globals.batchedUpdates;
  if (globals.willAdvance)
    willAdvance = globals.willAdvance;
  if (globals.frameLoop)
    raf.frameLoop = globals.frameLoop;
};
var startQueue = /* @__PURE__ */ new Set();
var currentFrame = [];
var prevFrame = [];
var priority = 0;
var frameLoop = {
  get idle() {
    return !startQueue.size && !currentFrame.length;
  },
  /** Advance the given animation on every frame until idle. */
  start(animation) {
    if (priority > animation.priority) {
      startQueue.add(animation);
      raf.onStart(flushStartQueue);
    } else {
      startSafely(animation);
      raf(advance);
    }
  },
  /** Advance all animations by the given time. */
  advance,
  /** Call this when an animation's priority changes. */
  sort(animation) {
    if (priority) {
      raf.onFrame(() => frameLoop.sort(animation));
    } else {
      const prevIndex = currentFrame.indexOf(animation);
      if (~prevIndex) {
        currentFrame.splice(prevIndex, 1);
        startUnsafely(animation);
      }
    }
  },
  /**
   * Clear all animations. For testing purposes.
   *
   * ☠️ Never call this from within the frameloop.
   */
  clear() {
    currentFrame = [];
    startQueue.clear();
  }
};
function flushStartQueue() {
  startQueue.forEach(startSafely);
  startQueue.clear();
  raf(advance);
}
function startSafely(animation) {
  if (!currentFrame.includes(animation))
    startUnsafely(animation);
}
function startUnsafely(animation) {
  currentFrame.splice(
    findIndex(currentFrame, (other) => other.priority > animation.priority),
    0,
    animation
  );
}
function advance(dt) {
  const nextFrame = prevFrame;
  for (let i = 0; i < currentFrame.length; i++) {
    const animation = currentFrame[i];
    priority = animation.priority;
    if (!animation.idle) {
      willAdvance(animation);
      animation.advance(dt);
      if (!animation.idle) {
        nextFrame.push(animation);
      }
    }
  }
  priority = 0;
  prevFrame = currentFrame;
  prevFrame.length = 0;
  currentFrame = nextFrame;
  return currentFrame.length > 0;
}
function findIndex(arr, test) {
  const index2 = arr.findIndex(test);
  return index2 < 0 ? arr.length : index2;
}
var clamp = (min3, max3, v2) => Math.min(Math.max(v2, min3), max3);
var colors2 = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
};
var NUMBER = "[-+]?\\d*\\.?\\d+";
var PERCENTAGE = NUMBER + "%";
function call(...parts) {
  return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var rgb2 = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
var rgba2 = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
var hsl3 = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
var hsla2 = new RegExp(
  "hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)
);
var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex6 = /^#([0-9a-fA-F]{6})$/;
var hex8 = /^#([0-9a-fA-F]{8})$/;
function normalizeColor(color2) {
  let match;
  if (typeof color2 === "number") {
    return color2 >>> 0 === color2 && color2 >= 0 && color2 <= 4294967295 ? color2 : null;
  }
  if (match = hex6.exec(color2))
    return parseInt(match[1] + "ff", 16) >>> 0;
  if (colors && colors[color2] !== void 0) {
    return colors[color2];
  }
  if (match = rgb2.exec(color2)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    255) >>> // a
    0;
  }
  if (match = rgba2.exec(color2)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    parse1(match[4])) >>> // a
    0;
  }
  if (match = hex3.exec(color2)) {
    return parseInt(
      match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      "ff",
      // a
      16
    ) >>> 0;
  }
  if (match = hex8.exec(color2))
    return parseInt(match[1], 16) >>> 0;
  if (match = hex4.exec(color2)) {
    return parseInt(
      match[1] + match[1] + // r
      match[2] + match[2] + // g
      match[3] + match[3] + // b
      match[4] + match[4],
      // a
      16
    ) >>> 0;
  }
  if (match = hsl3.exec(color2)) {
    return (hslToRgb(
      parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3])
      // l
    ) | 255) >>> // a
    0;
  }
  if (match = hsla2.exec(color2)) {
    return (hslToRgb(
      parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3])
      // l
    ) | parse1(match[4])) >>> // a
    0;
  }
  return null;
}
function hue2rgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslToRgb(h, s2, l) {
  const q = l < 0.5 ? l * (1 + s2) : l + s2 - l * s2;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}
function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0)
    return 0;
  if (int > 255)
    return 255;
  return int;
}
function parse360(str) {
  const int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}
function parse1(str) {
  const num = parseFloat(str);
  if (num < 0)
    return 0;
  if (num > 1)
    return 255;
  return Math.round(num * 255);
}
function parsePercentage(str) {
  const int = parseFloat(str);
  if (int < 0)
    return 0;
  if (int > 100)
    return 1;
  return int / 100;
}
function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null)
    return input;
  int32Color = int32Color || 0;
  const r = (int32Color & 4278190080) >>> 24;
  const g = (int32Color & 16711680) >>> 16;
  const b = (int32Color & 65280) >>> 8;
  const a2 = (int32Color & 255) / 255;
  return `rgba(${r}, ${g}, ${b}, ${a2})`;
}
var createInterpolator = (range2, output, extrapolate) => {
  if (is.fun(range2)) {
    return range2;
  }
  if (is.arr(range2)) {
    return createInterpolator({
      range: range2,
      output,
      extrapolate
    });
  }
  if (is.str(range2.output[0])) {
    return createStringInterpolator(range2);
  }
  const config2 = range2;
  const outputRange = config2.output;
  const inputRange = config2.range || [0, 1];
  const extrapolateLeft = config2.extrapolateLeft || config2.extrapolate || "extend";
  const extrapolateRight = config2.extrapolateRight || config2.extrapolate || "extend";
  const easing = config2.easing || ((t) => t);
  return (input) => {
    const range22 = findRange(input, inputRange);
    return interpolate(
      input,
      inputRange[range22],
      inputRange[range22 + 1],
      outputRange[range22],
      outputRange[range22 + 1],
      easing,
      extrapolateLeft,
      extrapolateRight,
      config2.map
    );
  };
};
function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map4) {
  let result = map4 ? map4(input) : input;
  if (result < inputMin) {
    if (extrapolateLeft === "identity")
      return result;
    else if (extrapolateLeft === "clamp")
      result = inputMin;
  }
  if (result > inputMax) {
    if (extrapolateRight === "identity")
      return result;
    else if (extrapolateRight === "clamp")
      result = inputMax;
  }
  if (outputMin === outputMax)
    return outputMin;
  if (inputMin === inputMax)
    return input <= inputMin ? outputMin : outputMax;
  if (inputMin === -Infinity)
    result = -result;
  else if (inputMax === Infinity)
    result = result - inputMin;
  else
    result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  if (outputMin === -Infinity)
    result = -result;
  else if (outputMax === Infinity)
    result = result + outputMin;
  else
    result = result * (outputMax - outputMin) + outputMin;
  return result;
}
function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i)
    if (inputRange[i] >= input)
      break;
  return i - 1;
}
var steps = (steps2, direction = "end") => (progress2) => {
  progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
  const expanded = progress2 * steps2;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return clamp(0, 1, rounded / steps2);
};
var c1 = 1.70158;
var c2 = c1 * 1.525;
var c3 = c1 + 1;
var c4 = 2 * Math.PI / 3;
var c5 = 2 * Math.PI / 4.5;
var bounceOut = (x2) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x2 < 1 / d1) {
    return n1 * x2 * x2;
  } else if (x2 < 2 / d1) {
    return n1 * (x2 -= 1.5 / d1) * x2 + 0.75;
  } else if (x2 < 2.5 / d1) {
    return n1 * (x2 -= 2.25 / d1) * x2 + 0.9375;
  } else {
    return n1 * (x2 -= 2.625 / d1) * x2 + 0.984375;
  }
};
var easings = {
  linear: (x2) => x2,
  easeInQuad: (x2) => x2 * x2,
  easeOutQuad: (x2) => 1 - (1 - x2) * (1 - x2),
  easeInOutQuad: (x2) => x2 < 0.5 ? 2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 2) / 2,
  easeInCubic: (x2) => x2 * x2 * x2,
  easeOutCubic: (x2) => 1 - Math.pow(1 - x2, 3),
  easeInOutCubic: (x2) => x2 < 0.5 ? 4 * x2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 3) / 2,
  easeInQuart: (x2) => x2 * x2 * x2 * x2,
  easeOutQuart: (x2) => 1 - Math.pow(1 - x2, 4),
  easeInOutQuart: (x2) => x2 < 0.5 ? 8 * x2 * x2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 4) / 2,
  easeInQuint: (x2) => x2 * x2 * x2 * x2 * x2,
  easeOutQuint: (x2) => 1 - Math.pow(1 - x2, 5),
  easeInOutQuint: (x2) => x2 < 0.5 ? 16 * x2 * x2 * x2 * x2 * x2 : 1 - Math.pow(-2 * x2 + 2, 5) / 2,
  easeInSine: (x2) => 1 - Math.cos(x2 * Math.PI / 2),
  easeOutSine: (x2) => Math.sin(x2 * Math.PI / 2),
  easeInOutSine: (x2) => -(Math.cos(Math.PI * x2) - 1) / 2,
  easeInExpo: (x2) => x2 === 0 ? 0 : Math.pow(2, 10 * x2 - 10),
  easeOutExpo: (x2) => x2 === 1 ? 1 : 1 - Math.pow(2, -10 * x2),
  easeInOutExpo: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : x2 < 0.5 ? Math.pow(2, 20 * x2 - 10) / 2 : (2 - Math.pow(2, -20 * x2 + 10)) / 2,
  easeInCirc: (x2) => 1 - Math.sqrt(1 - Math.pow(x2, 2)),
  easeOutCirc: (x2) => Math.sqrt(1 - Math.pow(x2 - 1, 2)),
  easeInOutCirc: (x2) => x2 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x2, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x2 + 2, 2)) + 1) / 2,
  easeInBack: (x2) => c3 * x2 * x2 * x2 - c1 * x2 * x2,
  easeOutBack: (x2) => 1 + c3 * Math.pow(x2 - 1, 3) + c1 * Math.pow(x2 - 1, 2),
  easeInOutBack: (x2) => x2 < 0.5 ? Math.pow(2 * x2, 2) * ((c2 + 1) * 2 * x2 - c2) / 2 : (Math.pow(2 * x2 - 2, 2) * ((c2 + 1) * (x2 * 2 - 2) + c2) + 2) / 2,
  easeInElastic: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : -Math.pow(2, 10 * x2 - 10) * Math.sin((x2 * 10 - 10.75) * c4),
  easeOutElastic: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : Math.pow(2, -10 * x2) * Math.sin((x2 * 10 - 0.75) * c4) + 1,
  easeInOutElastic: (x2) => x2 === 0 ? 0 : x2 === 1 ? 1 : x2 < 0.5 ? -(Math.pow(2, 20 * x2 - 10) * Math.sin((20 * x2 - 11.125) * c5)) / 2 : Math.pow(2, -20 * x2 + 10) * Math.sin((20 * x2 - 11.125) * c5) / 2 + 1,
  easeInBounce: (x2) => 1 - bounceOut(1 - x2),
  easeOutBounce: bounceOut,
  easeInOutBounce: (x2) => x2 < 0.5 ? (1 - bounceOut(1 - 2 * x2)) / 2 : (1 + bounceOut(2 * x2 - 1)) / 2,
  steps
};
var $get = Symbol.for("FluidValue.get");
var $observers = Symbol.for("FluidValue.observers");
var hasFluidValue = (arg) => Boolean(arg && arg[$get]);
var getFluidValue = (arg) => arg && arg[$get] ? arg[$get]() : arg;
var getFluidObservers = (target) => target[$observers] || null;
function callFluidObserver(observer2, event) {
  if (observer2.eventObserved) {
    observer2.eventObserved(event);
  } else {
    observer2(event);
  }
}
function callFluidObservers(target, event) {
  const observers = target[$observers];
  if (observers) {
    observers.forEach((observer2) => {
      callFluidObserver(observer2, event);
    });
  }
}
var FluidValue = class {
  constructor(get) {
    if (!get && !(get = this.get)) {
      throw Error("Unknown getter");
    }
    setFluidGetter(this, get);
  }
};
var setFluidGetter = (target, get) => setHidden(target, $get, get);
function addFluidObserver(target, observer2) {
  if (target[$get]) {
    let observers = target[$observers];
    if (!observers) {
      setHidden(target, $observers, observers = /* @__PURE__ */ new Set());
    }
    if (!observers.has(observer2)) {
      observers.add(observer2);
      if (target.observerAdded) {
        target.observerAdded(observers.size, observer2);
      }
    }
  }
  return observer2;
}
function removeFluidObserver(target, observer2) {
  const observers = target[$observers];
  if (observers && observers.has(observer2)) {
    const count2 = observers.size - 1;
    if (count2) {
      observers.delete(observer2);
    } else {
      target[$observers] = null;
    }
    if (target.observerRemoved) {
      target.observerRemoved(count2, observer2);
    }
  }
}
var setHidden = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
});
var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
var unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, "i");
var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
var variableToRgba = (input) => {
  const [token, fallback] = parseCSSVariable(input);
  if (!token || isSSR()) {
    return input;
  }
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(token);
  if (value) {
    return value.trim();
  } else if (fallback && fallback.startsWith("--")) {
    const value2 = window.getComputedStyle(document.documentElement).getPropertyValue(fallback);
    if (value2) {
      return value2;
    } else {
      return input;
    }
  } else if (fallback && cssVariableRegex.test(fallback)) {
    return variableToRgba(fallback);
  } else if (fallback) {
    return fallback;
  }
  return input;
};
var parseCSSVariable = (current) => {
  const match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
};
var namedColorRegex;
var rgbaRound = (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;
var createStringInterpolator2 = (config2) => {
  if (!namedColorRegex)
    namedColorRegex = colors ? (
      // match color names, ignore partial matches
      new RegExp(`(${Object.keys(colors).join("|")})(?!\\w)`, "g")
    ) : (
      // never match
      /^\b$/
    );
  const output = config2.output.map((value) => {
    return getFluidValue(value).replace(cssVariableRegex, variableToRgba).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba);
  });
  const keyframes = output.map((value) => value.match(numberRegex).map(Number));
  const outputRanges = keyframes[0].map(
    (_, i) => keyframes.map((values) => {
      if (!(i in values)) {
        throw Error('The arity of each "output" value must be equal');
      }
      return values[i];
    })
  );
  const interpolators = outputRanges.map(
    (output2) => createInterpolator({ ...config2, output: output2 })
  );
  return (input) => {
    var _a;
    const missingUnit = !unitRegex.test(output[0]) && ((_a = output.find((value) => unitRegex.test(value))) == null ? void 0 : _a.replace(numberRegex, ""));
    let i = 0;
    return output[0].replace(
      numberRegex,
      () => `${interpolators[i++](input)}${missingUnit || ""}`
    ).replace(rgbaRegex, rgbaRound);
  };
};
var prefix = "react-spring: ";
var once = (fn) => {
  const func = fn;
  let called = false;
  if (typeof func != "function") {
    throw new TypeError(`${prefix}once requires a function parameter`);
  }
  return (...args) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};
var warnInterpolate = once(console.warn);
function deprecateInterpolate() {
  warnInterpolate(
    `${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`
  );
}
var warnDirectCall = once(console.warn);
function deprecateDirectCall() {
  warnDirectCall(
    `${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`
  );
}
function isAnimatedString(value) {
  return is.str(value) && (value[0] == "#" || /\d/.test(value) || // Do not identify a CSS variable as an AnimatedString if its SSR
  !isSSR() && cssVariableRegex.test(value) || value in (colors || {}));
}
var useIsomorphicLayoutEffect = isSSR() ? import_react4.useEffect : import_react4.useLayoutEffect;
var useIsMounted = () => {
  const isMounted = (0, import_react3.useRef)(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
function useForceUpdate() {
  const update22 = (0, import_react2.useState)()[1];
  const isMounted = useIsMounted();
  return () => {
    if (isMounted.current) {
      update22(Math.random());
    }
  };
}
function useMemoOne(getResult, inputs) {
  const [initial] = (0, import_react5.useState)(
    () => ({
      inputs,
      result: getResult()
    })
  );
  const committed = (0, import_react5.useRef)();
  const prevCache = committed.current;
  let cache = prevCache;
  if (cache) {
    const useCache = Boolean(
      inputs && cache.inputs && areInputsEqual(inputs, cache.inputs)
    );
    if (!useCache) {
      cache = {
        inputs,
        result: getResult()
      };
    }
  } else {
    cache = initial;
  }
  (0, import_react5.useEffect)(() => {
    committed.current = cache;
    if (prevCache == initial) {
      initial.inputs = initial.result = void 0;
    }
  }, [cache]);
  return cache.result;
}
function areInputsEqual(next, prev) {
  if (next.length !== prev.length) {
    return false;
  }
  for (let i = 0; i < next.length; i++) {
    if (next[i] !== prev[i]) {
      return false;
    }
  }
  return true;
}
var useOnce = (effect) => (0, import_react6.useEffect)(effect, emptyDeps);
var emptyDeps = [];
function usePrev(value) {
  const prevRef = (0, import_react7.useRef)();
  (0, import_react7.useEffect)(() => {
    prevRef.current = value;
  });
  return prevRef.current;
}

// node_modules/@react-spring/core/dist/react-spring_core.modern.mjs
var import_react10 = __toESM(require_react(), 1);

// node_modules/@react-spring/animated/dist/react-spring_animated.modern.mjs
var React34 = __toESM(require_react(), 1);
var import_react9 = __toESM(require_react(), 1);
var $node = Symbol.for("Animated:node");
var isAnimated = (value) => !!value && value[$node] === value;
var getAnimated = (owner) => owner && owner[$node];
var setAnimated = (owner, node) => defineHidden(owner, $node, node);
var getPayload = (owner) => owner && owner[$node] && owner[$node].getPayload();
var Animated = class {
  constructor() {
    setAnimated(this, this);
  }
  /** Get every `AnimatedValue` used by this node. */
  getPayload() {
    return this.payload || [];
  }
};
var AnimatedValue = class extends Animated {
  constructor(_value) {
    super();
    this._value = _value;
    this.done = true;
    this.durationProgress = 0;
    if (is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }
  /** @internal */
  static create(value) {
    return new AnimatedValue(value);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(value, step) {
    if (is.num(value)) {
      this.lastPosition = value;
      if (step) {
        value = Math.round(value / step) * step;
        if (this.done) {
          this.lastPosition = value;
        }
      }
    }
    if (this._value === value) {
      return false;
    }
    this._value = value;
    return true;
  }
  reset() {
    const { done } = this;
    this.done = false;
    if (is.num(this._value)) {
      this.elapsedTime = 0;
      this.durationProgress = 0;
      this.lastPosition = this._value;
      if (done)
        this.lastVelocity = null;
      this.v0 = null;
    }
  }
};
var AnimatedString = class extends AnimatedValue {
  constructor(value) {
    super(0);
    this._string = null;
    this._toString = createInterpolator({
      output: [value, value]
    });
  }
  /** @internal */
  static create(value) {
    return new AnimatedString(value);
  }
  getValue() {
    const value = this._string;
    return value == null ? this._string = this._toString(this._value) : value;
  }
  setValue(value) {
    if (is.str(value)) {
      if (value == this._string) {
        return false;
      }
      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }
    return true;
  }
  reset(goal) {
    if (goal) {
      this._toString = createInterpolator({
        output: [this.getValue(), goal]
      });
    }
    this._value = 0;
    super.reset();
  }
};
var TreeContext = { dependencies: null };
var AnimatedObject = class extends Animated {
  constructor(source) {
    super();
    this.source = source;
    this.setValue(source);
  }
  getValue(animated2) {
    const values = {};
    eachProp(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated2);
      } else if (hasFluidValue(source)) {
        values[key] = getFluidValue(source);
      } else if (!animated2) {
        values[key] = source;
      }
    });
    return values;
  }
  /** Replace the raw object data */
  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }
  reset() {
    if (this.payload) {
      each(this.payload, (node) => node.reset());
    }
  }
  /** Create a payload set. */
  _makePayload(source) {
    if (source) {
      const payload = /* @__PURE__ */ new Set();
      eachProp(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }
  /** Add to a payload set. */
  _addToPayload(source) {
    if (TreeContext.dependencies && hasFluidValue(source)) {
      TreeContext.dependencies.add(source);
    }
    const payload = getPayload(source);
    if (payload) {
      each(payload, (node) => this.add(node));
    }
  }
};
var AnimatedArray = class extends AnimatedObject {
  constructor(source) {
    super(source);
  }
  /** @internal */
  static create(source) {
    return new AnimatedArray(source);
  }
  getValue() {
    return this.source.map((node) => node.getValue());
  }
  setValue(source) {
    const payload = this.getPayload();
    if (source.length == payload.length) {
      return payload.map((node, i) => node.setValue(source[i])).some(Boolean);
    }
    super.setValue(source.map(makeAnimated));
    return true;
  }
};
function makeAnimated(value) {
  const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
  return nodeType.create(value);
}
function getAnimatedType(value) {
  const parentNode = getAnimated(value);
  return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
}
var withAnimated = (Component, host2) => {
  const hasInstance = (
    // Function components must use "forwardRef" to avoid being
    // re-rendered on every animation frame.
    !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent
  );
  return (0, import_react9.forwardRef)((givenProps, givenRef) => {
    const instanceRef = (0, import_react9.useRef)(null);
    const ref = hasInstance && // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, import_react9.useCallback)(
      (value) => {
        instanceRef.current = updateRef(givenRef, value);
      },
      [givenRef]
    );
    const [props, deps] = getAnimatedState(givenProps, host2);
    const forceUpdate = useForceUpdate();
    const callback = () => {
      const instance = instanceRef.current;
      if (hasInstance && !instance) {
        return;
      }
      const didUpdate = instance ? host2.applyAnimatedValues(instance, props.getValue(true)) : false;
      if (didUpdate === false) {
        forceUpdate();
      }
    };
    const observer = new PropsObserver(callback, deps);
    const observerRef = (0, import_react9.useRef)();
    useIsomorphicLayoutEffect(() => {
      observerRef.current = observer;
      each(deps, (dep) => addFluidObserver(dep, observer));
      return () => {
        if (observerRef.current) {
          each(
            observerRef.current.deps,
            (dep) => removeFluidObserver(dep, observerRef.current)
          );
          raf.cancel(observerRef.current.update);
        }
      };
    });
    (0, import_react9.useEffect)(callback, []);
    useOnce(() => () => {
      const observer2 = observerRef.current;
      each(observer2.deps, (dep) => removeFluidObserver(dep, observer2));
    });
    const usedProps = host2.getComponentProps(props.getValue());
    return React34.createElement(Component, { ...usedProps, ref });
  });
};
var PropsObserver = class {
  constructor(update3, deps) {
    this.update = update3;
    this.deps = deps;
  }
  eventObserved(event) {
    if (event.type == "change") {
      raf.write(this.update);
    }
  }
};
function getAnimatedState(props, host2) {
  const dependencies = /* @__PURE__ */ new Set();
  TreeContext.dependencies = dependencies;
  if (props.style)
    props = {
      ...props,
      style: host2.createAnimatedStyle(props.style)
    };
  props = new AnimatedObject(props);
  TreeContext.dependencies = null;
  return [props, dependencies];
}
function updateRef(ref, value) {
  if (ref) {
    if (is.fun(ref))
      ref(value);
    else
      ref.current = value;
  }
  return value;
}
var cacheKey = Symbol.for("AnimatedComponent");
var createHost = (components, {
  applyAnimatedValues: applyAnimatedValues2 = () => false,
  createAnimatedStyle = (style) => new AnimatedObject(style),
  getComponentProps = (props) => props
} = {}) => {
  const hostConfig = {
    applyAnimatedValues: applyAnimatedValues2,
    createAnimatedStyle,
    getComponentProps
  };
  const animated2 = (Component) => {
    const displayName = getDisplayName(Component) || "Anonymous";
    if (is.str(Component)) {
      Component = animated2[Component] || (animated2[Component] = withAnimated(Component, hostConfig));
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }
    Component.displayName = `Animated(${displayName})`;
    return Component;
  };
  eachProp(components, (Component, key) => {
    if (is.arr(components)) {
      key = getDisplayName(Component);
    }
    animated2[key] = animated2(Component);
  });
  return {
    animated: animated2
  };
};
var getDisplayName = (arg) => is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;

// node_modules/@react-spring/core/dist/react-spring_core.modern.mjs
var React35 = __toESM(require_react(), 1);
var import_react11 = __toESM(require_react(), 1);
var import_react12 = __toESM(require_react(), 1);
var React210 = __toESM(require_react(), 1);
var import_react13 = __toESM(require_react(), 1);
var import_react14 = __toESM(require_react(), 1);
function callProp(value, ...args) {
  return is.fun(value) ? value(...args) : value;
}
var matchProp = (value, key) => value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));
var resolveProp = (prop, key) => is.obj(prop) ? key && prop[key] : prop;
var getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : void 0;
var noopTransform = (value) => value;
var getDefaultProps = (props, transform = noopTransform) => {
  let keys = DEFAULT_PROPS;
  if (props.default && props.default !== true) {
    props = props.default;
    keys = Object.keys(props);
  }
  const defaults2 = {};
  for (const key of keys) {
    const value = transform(props[key], key);
    if (!is.und(value)) {
      defaults2[key] = value;
    }
  }
  return defaults2;
};
var DEFAULT_PROPS = [
  "config",
  "onProps",
  "onStart",
  "onChange",
  "onPause",
  "onResume",
  "onRest"
];
var RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  // Transition props
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  // Internal props
  keys: 1,
  callId: 1,
  parentId: 1
};
function getForwardProps(props) {
  const forward = {};
  let count2 = 0;
  eachProp(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count2++;
    }
  });
  if (count2) {
    return forward;
  }
}
function inferTo(props) {
  const to22 = getForwardProps(props);
  if (to22) {
    const out = { to: to22 };
    eachProp(props, (val, key) => key in to22 || (out[key] = val));
    return out;
  }
  return { ...props };
}
function computeGoal(value) {
  value = getFluidValue(value);
  return is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? globals_exports.createStringInterpolator({
    range: [0, 1],
    output: [value, value]
  })(1) : value;
}
function hasProps(props) {
  for (const _ in props)
    return true;
  return false;
}
function isAsyncTo(to22) {
  return is.fun(to22) || is.arr(to22) && is.obj(to22[0]);
}
function detachRefs(ctrl, ref) {
  var _a;
  (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
  ref == null ? void 0 : ref.delete(ctrl);
}
function replaceRef(ctrl, ref) {
  var _a;
  if (ref && ctrl.ref !== ref) {
    (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
    ref.add(ctrl);
    ctrl.ref = ref;
  }
}
var config = {
  default: { tension: 170, friction: 26 },
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 280, friction: 60 },
  molasses: { tension: 280, friction: 120 }
};
var defaults = {
  ...config.default,
  mass: 1,
  damping: 1,
  easing: easings.linear,
  clamp: false
};
var AnimationConfig = class {
  constructor() {
    this.velocity = 0;
    Object.assign(this, defaults);
  }
};
function mergeConfig(config2, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = { ...defaultConfig };
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = { ...defaultConfig, ...newConfig };
  }
  sanitizeConfig(config2, newConfig);
  Object.assign(config2, newConfig);
  for (const key in defaults) {
    if (config2[key] == null) {
      config2[key] = defaults[key];
    }
  }
  let { frequency, damping } = config2;
  const { mass } = config2;
  if (!is.und(frequency)) {
    if (frequency < 0.01)
      frequency = 0.01;
    if (damping < 0)
      damping = 0;
    config2.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
    config2.friction = 4 * Math.PI * damping * mass / frequency;
  }
  return config2;
}
function sanitizeConfig(config2, props) {
  if (!is.und(props.decay)) {
    config2.duration = void 0;
  } else {
    const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);
    if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
      config2.duration = void 0;
      config2.decay = void 0;
    }
    if (isTensionConfig) {
      config2.frequency = void 0;
    }
  }
}
var emptyArray = [];
var Animation = class {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.config = new AnimationConfig();
    this.immediate = false;
  }
};
function scheduleProps(callId, { key, props, defaultProps: defaultProps4, state, actions }) {
  return new Promise((resolve, reject) => {
    let delay;
    let timeout;
    let cancel = matchProp(props.cancel ?? (defaultProps4 == null ? void 0 : defaultProps4.cancel), key);
    if (cancel) {
      onStart();
    } else {
      if (!is.und(props.pause)) {
        state.paused = matchProp(props.pause, key);
      }
      let pause = defaultProps4 == null ? void 0 : defaultProps4.pause;
      if (pause !== true) {
        pause = state.paused || matchProp(pause, key);
      }
      delay = callProp(props.delay || 0, key);
      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }
    function onPause() {
      state.resumeQueue.add(onResume);
      state.timeouts.delete(timeout);
      timeout.cancel();
      delay = timeout.time - raf.now();
    }
    function onResume() {
      if (delay > 0 && !globals_exports.skipAnimation) {
        state.delayed = true;
        timeout = raf.setTimeout(onStart, delay);
        state.pauseQueue.add(onPause);
        state.timeouts.add(timeout);
      } else {
        onStart();
      }
    }
    function onStart() {
      if (state.delayed) {
        state.delayed = false;
      }
      state.pauseQueue.delete(onPause);
      state.timeouts.delete(timeout);
      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }
      try {
        actions.start({ ...props, callId, cancel }, resolve);
      } catch (err) {
        reject(err);
      }
    }
  });
}
var getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some((result) => result.cancelled) ? getCancelledResult(target.get()) : results.every((result) => result.noop) ? getNoopResult(target.get()) : getFinishedResult(
  target.get(),
  results.every((result) => result.finished)
);
var getNoopResult = (value) => ({
  value,
  noop: true,
  finished: true,
  cancelled: false
});
var getFinishedResult = (value, finished, cancelled = false) => ({
  value,
  finished,
  cancelled
});
var getCancelledResult = (value) => ({
  value,
  cancelled: true,
  finished: false
});
function runAsync(to22, props, state, target) {
  const { callId, parentId, onRest } = props;
  const { asyncTo: prevTo, promise: prevPromise } = state;
  if (!parentId && to22 === prevTo && !props.reset) {
    return prevPromise;
  }
  return state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to22;
    const defaultProps4 = getDefaultProps(
      props,
      (value, key) => (
        // The `onRest` prop is only called when the `runAsync` promise is resolved.
        key === "onRest" ? void 0 : value
      )
    );
    let preventBail;
    let bail;
    const bailPromise = new Promise(
      (resolve, reject) => (preventBail = resolve, bail = reject)
    );
    const bailIfEnded = (bailSignal) => {
      const bailResult = (
        // The `cancel` prop or `stop` method was used.
        callId <= (state.cancelId || 0) && getCancelledResult(target) || // The async `to` prop was replaced.
        callId !== state.asyncId && getFinishedResult(target, false)
      );
      if (bailResult) {
        bailSignal.result = bailResult;
        bail(bailSignal);
        throw bailSignal;
      }
    };
    const animate = (arg1, arg2) => {
      const bailSignal = new BailSignal();
      const skipAnimationSignal = new SkipAnimationSignal();
      return (async () => {
        if (globals_exports.skipAnimation) {
          stopAsync(state);
          skipAnimationSignal.result = getFinishedResult(target, false);
          bail(skipAnimationSignal);
          throw skipAnimationSignal;
        }
        bailIfEnded(bailSignal);
        const props2 = is.obj(arg1) ? { ...arg1 } : { ...arg2, to: arg1 };
        props2.parentId = callId;
        eachProp(defaultProps4, (value, key) => {
          if (is.und(props2[key])) {
            props2[key] = value;
          }
        });
        const result2 = await target.start(props2);
        bailIfEnded(bailSignal);
        if (state.paused) {
          await new Promise((resume) => {
            state.resumeQueue.add(resume);
          });
        }
        return result2;
      })();
    };
    let result;
    if (globals_exports.skipAnimation) {
      stopAsync(state);
      return getFinishedResult(target, false);
    }
    try {
      let animating;
      if (is.arr(to22)) {
        animating = (async (queue) => {
          for (const props2 of queue) {
            await animate(props2);
          }
        })(to22);
      } else {
        animating = Promise.resolve(to22(animate, target.stop.bind(target)));
      }
      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target.get(), true, false);
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else if (err instanceof SkipAnimationSignal) {
        result = err.result;
      } else {
        throw err;
      }
    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : void 0;
        state.promise = parentId ? prevPromise : void 0;
      }
    }
    if (is.fun(onRest)) {
      raf.batchedUpdates(() => {
        onRest(result, target, target.item);
      });
    }
    return result;
  })();
}
function stopAsync(state, cancelId) {
  flush(state.timeouts, (t) => t.cancel());
  state.pauseQueue.clear();
  state.resumeQueue.clear();
  state.asyncId = state.asyncTo = state.promise = void 0;
  if (cancelId)
    state.cancelId = cancelId;
}
var BailSignal = class extends Error {
  constructor() {
    super(
      "An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."
    );
  }
};
var SkipAnimationSignal = class extends Error {
  constructor() {
    super("SkipAnimationSignal");
  }
};
var isFrameValue = (value) => value instanceof FrameValue;
var nextId = 1;
var FrameValue = class extends FluidValue {
  constructor() {
    super(...arguments);
    this.id = nextId++;
    this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(priority2) {
    if (this._priority != priority2) {
      this._priority = priority2;
      this._onPriorityChange(priority2);
    }
  }
  /** Get the current value */
  get() {
    const node = getAnimated(this);
    return node && node.getValue();
  }
  /** Create a spring that maps our value to another value */
  to(...args) {
    return globals_exports.to(this, args);
  }
  /** @deprecated Use the `to` method instead. */
  interpolate(...args) {
    deprecateInterpolate();
    return globals_exports.to(this, args);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(count2) {
    if (count2 == 1)
      this._attach();
  }
  observerRemoved(count2) {
    if (count2 == 0)
      this._detach();
  }
  /** Called when the first child is added. */
  _attach() {
  }
  /** Called when the last child is removed. */
  _detach() {
  }
  /** Tell our children about our new value */
  _onChange(value, idle = false) {
    callFluidObservers(this, {
      type: "change",
      parent: this,
      value,
      idle
    });
  }
  /** Tell our children about our new priority */
  _onPriorityChange(priority2) {
    if (!this.idle) {
      frameLoop.sort(this);
    }
    callFluidObservers(this, {
      type: "priority",
      parent: this,
      priority: priority2
    });
  }
};
var $P = Symbol.for("SpringPhase");
var HAS_ANIMATED = 1;
var IS_ANIMATING = 2;
var IS_PAUSED = 4;
var hasAnimated = (target) => (target[$P] & HAS_ANIMATED) > 0;
var isAnimating = (target) => (target[$P] & IS_ANIMATING) > 0;
var isPaused = (target) => (target[$P] & IS_PAUSED) > 0;
var setActiveBit = (target, active) => active ? target[$P] |= IS_ANIMATING | HAS_ANIMATED : target[$P] &= ~IS_ANIMATING;
var setPausedBit = (target, paused) => paused ? target[$P] |= IS_PAUSED : target[$P] &= ~IS_PAUSED;
var SpringValue = class extends FrameValue {
  constructor(arg1, arg2) {
    super();
    this.animation = new Animation();
    this.defaultProps = {};
    this._state = {
      paused: false,
      delayed: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    };
    this._pendingCalls = /* @__PURE__ */ new Set();
    this._lastCallId = 0;
    this._lastToId = 0;
    this._memoizedDuration = 0;
    if (!is.und(arg1) || !is.und(arg2)) {
      const props = is.obj(arg1) ? { ...arg1 } : { ...arg2, from: arg1 };
      if (is.und(props.default)) {
        props.default = true;
      }
      this.start(props);
    }
  }
  /** Equals true when not advancing on each frame. */
  get idle() {
    return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
  }
  get goal() {
    return getFluidValue(this.animation.to);
  }
  get velocity() {
    const node = getAnimated(this);
    return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map((node2) => node2.lastVelocity || 0);
  }
  /**
   * When true, this value has been animated at least once.
   */
  get hasAnimated() {
    return hasAnimated(this);
  }
  /**
   * When true, this value has an unfinished animation,
   * which is either active or paused.
   */
  get isAnimating() {
    return isAnimating(this);
  }
  /**
   * When true, all current and future animations are paused.
   */
  get isPaused() {
    return isPaused(this);
  }
  /**
   *
   *
   */
  get isDelayed() {
    return this._state.delayed;
  }
  /** Advance the current animation by a number of milliseconds */
  advance(dt) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let { toValues } = anim;
    const { config: config2 } = anim;
    const payload = getPayload(anim.to);
    if (!payload && hasFluidValue(anim.to)) {
      toValues = toArray(getFluidValue(anim.to));
    }
    anim.values.forEach((node2, i) => {
      if (node2.done)
        return;
      const to22 = (
        // Animated strings always go from 0 to 1.
        node2.constructor == AnimatedString ? 1 : payload ? payload[i].lastPosition : toValues[i]
      );
      let finished = anim.immediate;
      let position = to22;
      if (!finished) {
        position = node2.lastPosition;
        if (config2.tension <= 0) {
          node2.done = true;
          return;
        }
        let elapsed = node2.elapsedTime += dt;
        const from = anim.fromValues[i];
        const v0 = node2.v0 != null ? node2.v0 : node2.v0 = is.arr(config2.velocity) ? config2.velocity[i] : config2.velocity;
        let velocity;
        const precision = config2.precision || (from == to22 ? 5e-3 : Math.min(1, Math.abs(to22 - from) * 1e-3));
        if (!is.und(config2.duration)) {
          let p = 1;
          if (config2.duration > 0) {
            if (this._memoizedDuration !== config2.duration) {
              this._memoizedDuration = config2.duration;
              if (node2.durationProgress > 0) {
                node2.elapsedTime = config2.duration * node2.durationProgress;
                elapsed = node2.elapsedTime += dt;
              }
            }
            p = (config2.progress || 0) + elapsed / this._memoizedDuration;
            p = p > 1 ? 1 : p < 0 ? 0 : p;
            node2.durationProgress = p;
          }
          position = from + config2.easing(p) * (to22 - from);
          velocity = (position - node2.lastPosition) / dt;
          finished = p == 1;
        } else if (config2.decay) {
          const decay = config2.decay === true ? 0.998 : config2.decay;
          const e = Math.exp(-(1 - decay) * elapsed);
          position = from + v0 / (1 - decay) * (1 - e);
          finished = Math.abs(node2.lastPosition - position) <= precision;
          velocity = v0 * e;
        } else {
          velocity = node2.lastVelocity == null ? v0 : node2.lastVelocity;
          const restVelocity = config2.restVelocity || precision / 10;
          const bounceFactor = config2.clamp ? 0 : config2.bounce;
          const canBounce = !is.und(bounceFactor);
          const isGrowing = from == to22 ? node2.v0 > 0 : from < to22;
          let isMoving;
          let isBouncing = false;
          const step = 1;
          const numSteps = Math.ceil(dt / step);
          for (let n = 0; n < numSteps; ++n) {
            isMoving = Math.abs(velocity) > restVelocity;
            if (!isMoving) {
              finished = Math.abs(to22 - position) <= precision;
              if (finished) {
                break;
              }
            }
            if (canBounce) {
              isBouncing = position == to22 || position > to22 == isGrowing;
              if (isBouncing) {
                velocity = -velocity * bounceFactor;
                position = to22;
              }
            }
            const springForce = -config2.tension * 1e-6 * (position - to22);
            const dampingForce = -config2.friction * 1e-3 * velocity;
            const acceleration = (springForce + dampingForce) / config2.mass;
            velocity = velocity + acceleration * step;
            position = position + velocity * step;
          }
        }
        node2.lastVelocity = velocity;
        if (Number.isNaN(position)) {
          console.warn(`Got NaN while animating:`, this);
          finished = true;
        }
      }
      if (payload && !payload[i].done) {
        finished = false;
      }
      if (finished) {
        node2.done = true;
      } else {
        idle = false;
      }
      if (node2.setValue(position, config2.round)) {
        changed = true;
      }
    });
    const node = getAnimated(this);
    const currVal = node.getValue();
    if (idle) {
      const finalVal = getFluidValue(anim.to);
      if ((currVal !== finalVal || changed) && !config2.decay) {
        node.setValue(finalVal);
        this._onChange(finalVal);
      } else if (changed && config2.decay) {
        this._onChange(currVal);
      }
      this._stop();
    } else if (changed) {
      this._onChange(currVal);
    }
  }
  /** Set the current value, while stopping the current animation */
  set(value) {
    raf.batchedUpdates(() => {
      this._stop();
      this._focus(value);
      this._set(value);
    });
    return this;
  }
  /**
   * Freeze the active animation in time, as well as any updates merged
   * before `resume` is called.
   */
  pause() {
    this._update({ pause: true });
  }
  /** Resume the animation if paused. */
  resume() {
    this._update({ pause: false });
  }
  /** Skip to the end of the current animation. */
  finish() {
    if (isAnimating(this)) {
      const { to: to22, config: config2 } = this.animation;
      raf.batchedUpdates(() => {
        this._onStart();
        if (!config2.decay) {
          this._set(to22, false);
        }
        this._stop();
      });
    }
    return this;
  }
  /** Push props into the pending queue. */
  update(props) {
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }
  start(to22, arg2) {
    let queue;
    if (!is.und(to22)) {
      queue = [is.obj(to22) ? to22 : { ...arg2, to: to22 }];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }
    return Promise.all(
      queue.map((props) => {
        const up = this._update(props);
        return up;
      })
    ).then((results) => getCombinedResult(this, results));
  }
  /**
   * Stop the current animation, and cancel any delayed updates.
   *
   * Pass `true` to call `onRest` with `cancelled: true`.
   */
  stop(cancel) {
    const { to: to22 } = this.animation;
    this._focus(this.get());
    stopAsync(this._state, cancel && this._lastCallId);
    raf.batchedUpdates(() => this._stop(to22, cancel));
    return this;
  }
  /** Restart the animation. */
  reset() {
    this._update({ reset: true });
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      this._start();
    } else if (event.type == "priority") {
      this.priority = event.priority + 1;
    }
  }
  /**
   * Parse the `to` and `from` range from the given `props` object.
   *
   * This also ensures the initial value is available to animated components
   * during the render phase.
   */
  _prepareNode(props) {
    const key = this.key || "";
    let { to: to22, from } = props;
    to22 = is.obj(to22) ? to22[key] : to22;
    if (to22 == null || isAsyncTo(to22)) {
      to22 = void 0;
    }
    from = is.obj(from) ? from[key] : from;
    if (from == null) {
      from = void 0;
    }
    const range2 = { to: to22, from };
    if (!hasAnimated(this)) {
      if (props.reverse)
        [to22, from] = [from, to22];
      from = getFluidValue(from);
      if (!is.und(from)) {
        this._set(from);
      } else if (!getAnimated(this)) {
        this._set(to22);
      }
    }
    return range2;
  }
  /** Every update is processed by this method before merging. */
  _update({ ...props }, isLoop) {
    const { key, defaultProps: defaultProps4 } = this;
    if (props.default)
      Object.assign(
        defaultProps4,
        getDefaultProps(
          props,
          (value, prop) => /^on/.test(prop) ? resolveProp(value, key) : value
        )
      );
    mergeActiveFn(this, props, "onProps");
    sendEvent(this, "onProps", props, this);
    const range2 = this._prepareNode(props);
    if (Object.isFrozen(this)) {
      throw Error(
        "Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?"
      );
    }
    const state = this._state;
    return scheduleProps(++this._lastCallId, {
      key,
      props,
      defaultProps: defaultProps4,
      state,
      actions: {
        pause: () => {
          if (!isPaused(this)) {
            setPausedBit(this, true);
            flushCalls(state.pauseQueue);
            sendEvent(
              this,
              "onPause",
              getFinishedResult(this, checkFinished(this, this.animation.to)),
              this
            );
          }
        },
        resume: () => {
          if (isPaused(this)) {
            setPausedBit(this, false);
            if (isAnimating(this)) {
              this._resume();
            }
            flushCalls(state.resumeQueue);
            sendEvent(
              this,
              "onResume",
              getFinishedResult(this, checkFinished(this, this.animation.to)),
              this
            );
          }
        },
        start: this._merge.bind(this, range2)
      }
    }).then((result) => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);
        if (nextProps) {
          return this._update(nextProps, true);
        }
      }
      return result;
    });
  }
  /** Merge props into the current animation */
  _merge(range2, props, resolve) {
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }
    const hasToProp = !is.und(range2.to);
    const hasFromProp = !is.und(range2.from);
    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }
    const { key, defaultProps: defaultProps4, animation: anim } = this;
    const { to: prevTo, from: prevFrom } = anim;
    let { to: to22 = prevTo, from = prevFrom } = range2;
    if (hasFromProp && !hasToProp && (!props.default || is.und(to22))) {
      to22 = from;
    }
    if (props.reverse)
      [to22, from] = [from, to22];
    const hasFromChanged = !isEqual(from, prevFrom);
    if (hasFromChanged) {
      anim.from = from;
    }
    from = getFluidValue(from);
    const hasToChanged = !isEqual(to22, prevTo);
    if (hasToChanged) {
      this._focus(to22);
    }
    const hasAsyncTo = isAsyncTo(props.to);
    const { config: config2 } = anim;
    const { decay, velocity } = config2;
    if (hasToProp || hasFromProp) {
      config2.velocity = 0;
    }
    if (props.config && !hasAsyncTo) {
      mergeConfig(
        config2,
        callProp(props.config, key),
        // Avoid calling the same "config" prop twice.
        props.config !== defaultProps4.config ? callProp(defaultProps4.config, key) : void 0
      );
    }
    let node = getAnimated(this);
    if (!node || is.und(to22)) {
      return resolve(getFinishedResult(this, true));
    }
    const reset = (
      // When `reset` is undefined, the `from` prop implies `reset: true`,
      // except for declarative updates. When `reset` is defined, there
      // must exist a value to animate from.
      is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key)
    );
    const value = reset ? from : this.get();
    const goal = computeGoal(to22);
    const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal);
    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps4.immediate || props.immediate, key));
    if (hasToChanged) {
      const nodeType = getAnimatedType(to22);
      if (nodeType !== node.constructor) {
        if (immediate) {
          node = this._set(goal);
        } else
          throw Error(
            `Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`
          );
      }
    }
    const goalType = node.constructor;
    let started = hasFluidValue(to22);
    let finished = false;
    if (!started) {
      const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;
      if (hasToChanged || hasValueChanged) {
        finished = isEqual(computeGoal(value), goal);
        started = !finished;
      }
      if (!isEqual(anim.immediate, immediate) && !immediate || !isEqual(config2.decay, decay) || !isEqual(config2.velocity, velocity)) {
        started = true;
      }
    }
    if (finished && isAnimating(this)) {
      if (anim.changed && !reset) {
        started = true;
      } else if (!started) {
        this._stop(prevTo);
      }
    }
    if (!hasAsyncTo) {
      if (started || hasFluidValue(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = hasFluidValue(to22) ? null : goalType == AnimatedString ? [1] : toArray(goal);
      }
      if (anim.immediate != immediate) {
        anim.immediate = immediate;
        if (!immediate && !reset) {
          this._set(prevTo);
        }
      }
      if (started) {
        const { onRest } = anim;
        each(ACTIVE_EVENTS, (type) => mergeActiveFn(this, props, type));
        const result = getFinishedResult(this, checkFinished(this, prevTo));
        flushCalls(this._pendingCalls, result);
        this._pendingCalls.add(resolve);
        if (anim.changed)
          raf.batchedUpdates(() => {
            var _a;
            anim.changed = !reset;
            onRest == null ? void 0 : onRest(result, this);
            if (reset) {
              callProp(defaultProps4.onRest, result);
            } else {
              (_a = anim.onStart) == null ? void 0 : _a.call(anim, result, this);
            }
          });
      }
    }
    if (reset) {
      this._set(value);
    }
    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } else if (started) {
      this._start();
    } else if (isAnimating(this) && !hasToChanged) {
      this._pendingCalls.add(resolve);
    } else {
      resolve(getNoopResult(value));
    }
  }
  /** Update the `animation.to` value, which might be a `FluidValue` */
  _focus(value) {
    const anim = this.animation;
    if (value !== anim.to) {
      if (getFluidObservers(this)) {
        this._detach();
      }
      anim.to = value;
      if (getFluidObservers(this)) {
        this._attach();
      }
    }
  }
  _attach() {
    let priority2 = 0;
    const { to: to22 } = this.animation;
    if (hasFluidValue(to22)) {
      addFluidObserver(to22, this);
      if (isFrameValue(to22)) {
        priority2 = to22.priority + 1;
      }
    }
    this.priority = priority2;
  }
  _detach() {
    const { to: to22 } = this.animation;
    if (hasFluidValue(to22)) {
      removeFluidObserver(to22, this);
    }
  }
  /**
   * Update the current value from outside the frameloop,
   * and return the `Animated` node.
   */
  _set(arg, idle = true) {
    const value = getFluidValue(arg);
    if (!is.und(value)) {
      const oldNode = getAnimated(this);
      if (!oldNode || !isEqual(value, oldNode.getValue())) {
        const nodeType = getAnimatedType(value);
        if (!oldNode || oldNode.constructor != nodeType) {
          setAnimated(this, nodeType.create(value));
        } else {
          oldNode.setValue(value);
        }
        if (oldNode) {
          raf.batchedUpdates(() => {
            this._onChange(value, idle);
          });
        }
      }
    }
    return getAnimated(this);
  }
  _onStart() {
    const anim = this.animation;
    if (!anim.changed) {
      anim.changed = true;
      sendEvent(
        this,
        "onStart",
        getFinishedResult(this, checkFinished(this, anim.to)),
        this
      );
    }
  }
  _onChange(value, idle) {
    if (!idle) {
      this._onStart();
      callProp(this.animation.onChange, value, this);
    }
    callProp(this.defaultProps.onChange, value, this);
    super._onChange(value, idle);
  }
  // This method resets the animation state (even if already animating) to
  // ensure the latest from/to range is used, and it also ensures this spring
  // is added to the frameloop.
  _start() {
    const anim = this.animation;
    getAnimated(this).reset(getFluidValue(anim.to));
    if (!anim.immediate) {
      anim.fromValues = anim.values.map((node) => node.lastPosition);
    }
    if (!isAnimating(this)) {
      setActiveBit(this, true);
      if (!isPaused(this)) {
        this._resume();
      }
    }
  }
  _resume() {
    if (globals_exports.skipAnimation) {
      this.finish();
    } else {
      frameLoop.start(this);
    }
  }
  /**
   * Exit the frameloop and notify `onRest` listeners.
   *
   * Always wrap `_stop` calls with `batchedUpdates`.
   */
  _stop(goal, cancel) {
    if (isAnimating(this)) {
      setActiveBit(this, false);
      const anim = this.animation;
      each(anim.values, (node) => {
        node.done = true;
      });
      if (anim.toValues) {
        anim.onChange = anim.onPause = anim.onResume = void 0;
      }
      callFluidObservers(this, {
        type: "idle",
        parent: this
      });
      const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal ?? anim.to));
      flushCalls(this._pendingCalls, result);
      if (anim.changed) {
        anim.changed = false;
        sendEvent(this, "onRest", result, this);
      }
    }
  }
};
function checkFinished(target, to22) {
  const goal = computeGoal(to22);
  const value = computeGoal(target.get());
  return isEqual(value, goal);
}
function createLoopUpdate(props, loop2 = props.loop, to22 = props.to) {
  const loopRet = callProp(loop2);
  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse2 = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate({
      ...props,
      loop: loop2,
      // Avoid updating default props when looping.
      default: false,
      // Never loop the `pause` prop.
      pause: void 0,
      // For the "reverse" prop to loop as expected, the "to" prop
      // must be undefined. The "reverse" prop is ignored when the
      // "to" prop is an array or function.
      to: !reverse2 || isAsyncTo(to22) ? to22 : void 0,
      // Ignore the "from" prop except on reset.
      from: reset ? props.from : void 0,
      reset,
      // The "loop" prop can return a "useSpring" props object to
      // override any of the original props.
      ...overrides
    });
  }
}
function createUpdate(props) {
  const { to: to22, from } = props = inferTo(props);
  const keys = /* @__PURE__ */ new Set();
  if (is.obj(to22))
    findDefined(to22, keys);
  if (is.obj(from))
    findDefined(from, keys);
  props.keys = keys.size ? Array.from(keys) : null;
  return props;
}
function declareUpdate(props) {
  const update22 = createUpdate(props);
  if (is.und(update22.default)) {
    update22.default = getDefaultProps(update22);
  }
  return update22;
}
function findDefined(values, keys) {
  eachProp(values, (value, key) => value != null && keys.add(key));
}
var ACTIVE_EVENTS = [
  "onStart",
  "onRest",
  "onChange",
  "onPause",
  "onResume"
];
function mergeActiveFn(target, props, type) {
  target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
}
function sendEvent(target, type, ...args) {
  var _a, _b, _c, _d;
  (_b = (_a = target.animation)[type]) == null ? void 0 : _b.call(_a, ...args);
  (_d = (_c = target.defaultProps)[type]) == null ? void 0 : _d.call(_c, ...args);
}
var BATCHED_EVENTS = ["onStart", "onChange", "onRest"];
var nextId2 = 1;
var Controller = class {
  constructor(props, flush3) {
    this.id = nextId2++;
    this.springs = {};
    this.queue = [];
    this._lastAsyncId = 0;
    this._active = /* @__PURE__ */ new Set();
    this._changed = /* @__PURE__ */ new Set();
    this._started = false;
    this._state = {
      paused: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    };
    this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    };
    this._onFrame = this._onFrame.bind(this);
    if (flush3) {
      this._flush = flush3;
    }
    if (props) {
      this.start({ default: true, ...props });
    }
  }
  /**
   * Equals `true` when no spring values are in the frameloop, and
   * no async animation is currently active.
   */
  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every((spring) => {
      return spring.idle && !spring.isDelayed && !spring.isPaused;
    });
  }
  get item() {
    return this._item;
  }
  set item(item) {
    this._item = item;
  }
  /** Get the current values of our springs */
  get() {
    const values = {};
    this.each((spring, key) => values[key] = spring.get());
    return values;
  }
  /** Set the current values without animating. */
  set(values) {
    for (const key in values) {
      const value = values[key];
      if (!is.und(value)) {
        this.springs[key].set(value);
      }
    }
  }
  /** Push an update onto the queue of each value. */
  update(props) {
    if (props) {
      this.queue.push(createUpdate(props));
    }
    return this;
  }
  /**
   * Start the queued animations for every spring, and resolve the returned
   * promise once all queued animations have finished or been cancelled.
   *
   * When you pass a queue (instead of nothing), that queue is used instead of
   * the queued animations added with the `update` method, which are left alone.
   */
  start(props) {
    let { queue } = this;
    if (props) {
      queue = toArray(props).map(createUpdate);
    } else {
      this.queue = [];
    }
    if (this._flush) {
      return this._flush(this, queue);
    }
    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }
  /** @internal */
  stop(arg, keys) {
    if (arg !== !!arg) {
      keys = arg;
    }
    if (keys) {
      const springs = this.springs;
      each(toArray(keys), (key) => springs[key].stop(!!arg));
    } else {
      stopAsync(this._state, this._lastAsyncId);
      this.each((spring) => spring.stop(!!arg));
    }
    return this;
  }
  /** Freeze the active animation in time */
  pause(keys) {
    if (is.und(keys)) {
      this.start({ pause: true });
    } else {
      const springs = this.springs;
      each(toArray(keys), (key) => springs[key].pause());
    }
    return this;
  }
  /** Resume the animation if paused. */
  resume(keys) {
    if (is.und(keys)) {
      this.start({ pause: false });
    } else {
      const springs = this.springs;
      each(toArray(keys), (key) => springs[key].resume());
    }
    return this;
  }
  /** Call a function once per spring value */
  each(iterator) {
    eachProp(this.springs, iterator);
  }
  /** @internal Called at the end of every animation frame */
  _onFrame() {
    const { onStart, onChange, onRest } = this._events;
    const active = this._active.size > 0;
    const changed = this._changed.size > 0;
    if (active && !this._started || changed && !this._started) {
      this._started = true;
      flush(onStart, ([onStart2, result]) => {
        result.value = this.get();
        onStart2(result, this, this._item);
      });
    }
    const idle = !active && this._started;
    const values = changed || idle && onRest.size ? this.get() : null;
    if (changed && onChange.size) {
      flush(onChange, ([onChange2, result]) => {
        result.value = values;
        onChange2(result, this, this._item);
      });
    }
    if (idle) {
      this._started = false;
      flush(onRest, ([onRest2, result]) => {
        result.value = values;
        onRest2(result, this, this._item);
      });
    }
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      this._changed.add(event.parent);
      if (!event.idle) {
        this._active.add(event.parent);
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else
      return;
    raf.onFrame(this._onFrame);
  }
};
function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map((props) => flushUpdate(ctrl, props))).then(
    (results) => getCombinedResult(ctrl, results)
  );
}
async function flushUpdate(ctrl, props, isLoop) {
  const { keys, to: to22, from, loop: loop2, onRest, onResolve } = props;
  const defaults2 = is.obj(props.default) && props.default;
  if (loop2) {
    props.loop = false;
  }
  if (to22 === false)
    props.to = null;
  if (from === false)
    props.from = null;
  const asyncTo = is.arr(to22) || is.fun(to22) ? to22 : void 0;
  if (asyncTo) {
    props.to = void 0;
    props.onRest = void 0;
    if (defaults2) {
      defaults2.onRest = void 0;
    }
  } else {
    each(BATCHED_EVENTS, (key) => {
      const handler = props[key];
      if (is.fun(handler)) {
        const queue = ctrl["_events"][key];
        props[key] = ({ finished, cancelled }) => {
          const result2 = queue.get(handler);
          if (result2) {
            if (!finished)
              result2.finished = false;
            if (cancelled)
              result2.cancelled = true;
          } else {
            queue.set(handler, {
              value: null,
              finished: finished || false,
              cancelled: cancelled || false
            });
          }
        };
        if (defaults2) {
          defaults2[key] = props[key];
        }
      }
    });
  }
  const state = ctrl["_state"];
  if (props.pause === !state.paused) {
    state.paused = props.pause;
    flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
  } else if (state.paused) {
    props.pause = true;
  }
  const promises = (keys || Object.keys(ctrl.springs)).map(
    (key) => ctrl.springs[key].start(props)
  );
  const cancel = props.cancel === true || getDefaultProp(props, "cancel") === true;
  if (asyncTo || cancel && state.asyncId) {
    promises.push(
      scheduleProps(++ctrl["_lastAsyncId"], {
        props,
        state,
        actions: {
          pause: noop,
          resume: noop,
          start(props2, resolve) {
            if (cancel) {
              stopAsync(state, ctrl["_lastAsyncId"]);
              resolve(getCancelledResult(ctrl));
            } else {
              props2.onRest = onRest;
              resolve(
                runAsync(
                  asyncTo,
                  props2,
                  state,
                  ctrl
                )
              );
            }
          }
        }
      })
    );
  }
  if (state.paused) {
    await new Promise((resume) => {
      state.resumeQueue.add(resume);
    });
  }
  const result = getCombinedResult(ctrl, await Promise.all(promises));
  if (loop2 && result.finished && !(isLoop && result.noop)) {
    const nextProps = createLoopUpdate(props, loop2, to22);
    if (nextProps) {
      prepareKeys(ctrl, [nextProps]);
      return flushUpdate(ctrl, nextProps, true);
    }
  }
  if (onResolve) {
    raf.batchedUpdates(() => onResolve(result, ctrl, ctrl.item));
  }
  return result;
}
function getSprings(ctrl, props) {
  const springs = { ...ctrl.springs };
  if (props) {
    each(toArray(props), (props2) => {
      if (is.und(props2.keys)) {
        props2 = createUpdate(props2);
      }
      if (!is.obj(props2.to)) {
        props2 = { ...props2, to: void 0 };
      }
      prepareSprings(springs, props2, (key) => {
        return createSpring(key);
      });
    });
  }
  setSprings(ctrl, springs);
  return springs;
}
function setSprings(ctrl, springs) {
  eachProp(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      addFluidObserver(spring, ctrl);
    }
  });
}
function createSpring(key, observer) {
  const spring = new SpringValue();
  spring.key = key;
  if (observer) {
    addFluidObserver(spring, observer);
  }
  return spring;
}
function prepareSprings(springs, props, create) {
  if (props.keys) {
    each(props.keys, (key) => {
      const spring = springs[key] || (springs[key] = create(key));
      spring["_prepareNode"](props);
    });
  }
}
function prepareKeys(ctrl, queue) {
  each(queue, (props) => {
    prepareSprings(ctrl.springs, props, (key) => {
      return createSpring(key, ctrl);
    });
  });
}
var SpringContext = ({
  children,
  ...props
}) => {
  const inherited = (0, import_react11.useContext)(ctx);
  const pause = props.pause || !!inherited.pause, immediate = props.immediate || !!inherited.immediate;
  props = useMemoOne(() => ({ pause, immediate }), [pause, immediate]);
  const { Provider } = ctx;
  return React35.createElement(Provider, { value: props }, children);
};
var ctx = makeContext(SpringContext, {});
SpringContext.Provider = ctx.Provider;
SpringContext.Consumer = ctx.Consumer;
function makeContext(target, init) {
  Object.assign(target, React35.createContext(init));
  target.Provider._context = target;
  target.Consumer._context = target;
  return target;
}
var SpringRef = () => {
  const current = [];
  const SpringRef2 = function(props) {
    deprecateDirectCall();
    const results = [];
    each(current, (ctrl, i) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update22 = _getProps(props, ctrl, i);
        if (update22) {
          results.push(ctrl.start(update22));
        }
      }
    });
    return results;
  };
  SpringRef2.current = current;
  SpringRef2.add = function(ctrl) {
    if (!current.includes(ctrl)) {
      current.push(ctrl);
    }
  };
  SpringRef2.delete = function(ctrl) {
    const i = current.indexOf(ctrl);
    if (~i)
      current.splice(i, 1);
  };
  SpringRef2.pause = function() {
    each(current, (ctrl) => ctrl.pause(...arguments));
    return this;
  };
  SpringRef2.resume = function() {
    each(current, (ctrl) => ctrl.resume(...arguments));
    return this;
  };
  SpringRef2.set = function(values) {
    each(current, (ctrl, i) => {
      const update22 = is.fun(values) ? values(i, ctrl) : values;
      if (update22) {
        ctrl.set(update22);
      }
    });
  };
  SpringRef2.start = function(props) {
    const results = [];
    each(current, (ctrl, i) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update22 = this._getProps(props, ctrl, i);
        if (update22) {
          results.push(ctrl.start(update22));
        }
      }
    });
    return results;
  };
  SpringRef2.stop = function() {
    each(current, (ctrl) => ctrl.stop(...arguments));
    return this;
  };
  SpringRef2.update = function(props) {
    each(current, (ctrl, i) => ctrl.update(this._getProps(props, ctrl, i)));
    return this;
  };
  const _getProps = function(arg, ctrl, index2) {
    return is.fun(arg) ? arg(index2, ctrl) : arg;
  };
  SpringRef2._getProps = _getProps;
  return SpringRef2;
};
function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps)
    deps = [];
  const ref = (0, import_react10.useMemo)(
    () => propsFn || arguments.length == 3 ? SpringRef() : void 0,
    []
  );
  const layoutId = (0, import_react10.useRef)(0);
  const forceUpdate = useForceUpdate();
  const state = (0, import_react10.useMemo)(
    () => ({
      ctrls: [],
      queue: [],
      flush(ctrl, updates2) {
        const springs2 = getSprings(ctrl, updates2);
        const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs2).some((key) => !ctrl.springs[key]);
        return canFlushSync ? flushUpdateQueue(ctrl, updates2) : new Promise((resolve) => {
          setSprings(ctrl, springs2);
          state.queue.push(() => {
            resolve(flushUpdateQueue(ctrl, updates2));
          });
          forceUpdate();
        });
      }
    }),
    []
  );
  const ctrls = (0, import_react10.useRef)([...state.ctrls]);
  const updates = [];
  const prevLength = usePrev(length) || 0;
  (0, import_react10.useMemo)(() => {
    each(ctrls.current.slice(length, prevLength), (ctrl) => {
      detachRefs(ctrl, ref);
      ctrl.stop(true);
    });
    ctrls.current.length = length;
    declareUpdates(prevLength, length);
  }, [length]);
  (0, import_react10.useMemo)(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);
  function declareUpdates(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      const ctrl = ctrls.current[i] || (ctrls.current[i] = new Controller(null, state.flush));
      const update22 = propsFn ? propsFn(i, ctrl) : props[i];
      if (update22) {
        updates[i] = declareUpdate(update22);
      }
    }
  }
  const springs = ctrls.current.map((ctrl, i) => getSprings(ctrl, updates[i]));
  const context = (0, import_react10.useContext)(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useIsomorphicLayoutEffect(() => {
    layoutId.current++;
    state.ctrls = ctrls.current;
    const { queue } = state;
    if (queue.length) {
      state.queue = [];
      each(queue, (cb) => cb());
    }
    each(ctrls.current, (ctrl, i) => {
      ref == null ? void 0 : ref.add(ctrl);
      if (hasContext) {
        ctrl.start({ default: context });
      }
      const update22 = updates[i];
      if (update22) {
        replaceRef(ctrl, update22.ref);
        if (ctrl.ref) {
          ctrl.queue.push(update22);
        } else {
          ctrl.start(update22);
        }
      }
    });
  });
  useOnce(() => () => {
    each(state.ctrls, (ctrl) => ctrl.stop(true));
  });
  const values = springs.map((x2) => ({ ...x2 }));
  return ref ? [values, ref] : values;
}
function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], ref] = useSprings(
    1,
    isFn ? props : [props],
    isFn ? deps || [] : deps
  );
  return isFn || arguments.length == 2 ? [values, ref] : values;
}
function useTransition(data, props, deps) {
  const propsFn = is.fun(props) && props;
  const {
    reset,
    sort: sort2,
    trail = 0,
    expires = true,
    exitBeforeEnter = false,
    onDestroyed,
    ref: propsRef,
    config: propsConfig
  } = propsFn ? propsFn() : props;
  const ref = (0, import_react13.useMemo)(
    () => propsFn || arguments.length == 3 ? SpringRef() : void 0,
    []
  );
  const items = toArray(data);
  const transitions = [];
  const usedTransitions = (0, import_react13.useRef)(null);
  const prevTransitions = reset ? null : usedTransitions.current;
  useIsomorphicLayoutEffect(() => {
    usedTransitions.current = transitions;
  });
  useOnce(() => {
    each(transitions, (t) => {
      ref == null ? void 0 : ref.add(t.ctrl);
      t.ctrl.ref = ref;
    });
    return () => {
      each(usedTransitions.current, (t) => {
        if (t.expired) {
          clearTimeout(t.expirationId);
        }
        detachRefs(t.ctrl, ref);
        t.ctrl.stop(true);
      });
    };
  });
  const keys = getKeys(items, propsFn ? propsFn() : props, prevTransitions);
  const expired = reset && usedTransitions.current || [];
  useIsomorphicLayoutEffect(
    () => each(expired, ({ ctrl, item, key }) => {
      detachRefs(ctrl, ref);
      callProp(onDestroyed, item, key);
    })
  );
  const reused = [];
  if (prevTransitions)
    each(prevTransitions, (t, i) => {
      if (t.expired) {
        clearTimeout(t.expirationId);
        expired.push(t);
      } else {
        i = reused[i] = keys.indexOf(t.key);
        if (~i)
          transitions[i] = t;
      }
    });
  each(items, (item, i) => {
    if (!transitions[i]) {
      transitions[i] = {
        key: keys[i],
        item,
        phase: "mount",
        ctrl: new Controller()
      };
      transitions[i].ctrl.item = item;
    }
  });
  if (reused.length) {
    let i = -1;
    const { leave } = propsFn ? propsFn() : props;
    each(reused, (keyIndex, prevIndex) => {
      const t = prevTransitions[prevIndex];
      if (~keyIndex) {
        i = transitions.indexOf(t);
        transitions[i] = { ...t, item: items[keyIndex] };
      } else if (leave) {
        transitions.splice(++i, 0, t);
      }
    });
  }
  if (is.fun(sort2)) {
    transitions.sort((a2, b) => sort2(a2.item, b.item));
  }
  let delay = -trail;
  const forceUpdate = useForceUpdate();
  const defaultProps4 = getDefaultProps(props);
  const changes = /* @__PURE__ */ new Map();
  const exitingTransitions = (0, import_react13.useRef)(/* @__PURE__ */ new Map());
  const forceChange = (0, import_react13.useRef)(false);
  each(transitions, (t, i) => {
    const key = t.key;
    const prevPhase = t.phase;
    const p = propsFn ? propsFn() : props;
    let to22;
    let phase;
    const propsDelay = callProp(p.delay || 0, key);
    if (prevPhase == "mount") {
      to22 = p.enter;
      phase = "enter";
    } else {
      const isLeave = keys.indexOf(key) < 0;
      if (prevPhase != "leave") {
        if (isLeave) {
          to22 = p.leave;
          phase = "leave";
        } else if (to22 = p.update) {
          phase = "update";
        } else
          return;
      } else if (!isLeave) {
        to22 = p.enter;
        phase = "enter";
      } else
        return;
    }
    to22 = callProp(to22, t.item, i);
    to22 = is.obj(to22) ? inferTo(to22) : { to: to22 };
    if (!to22.config) {
      const config2 = propsConfig || defaultProps4.config;
      to22.config = callProp(config2, t.item, i, phase);
    }
    delay += trail;
    const payload = {
      ...defaultProps4,
      // we need to add our props.delay value you here.
      delay: propsDelay + delay,
      ref: propsRef,
      immediate: p.immediate,
      // This prevents implied resets.
      reset: false,
      // Merge any phase-specific props.
      ...to22
    };
    if (phase == "enter" && is.und(payload.from)) {
      const p2 = propsFn ? propsFn() : props;
      const from = is.und(p2.initial) || prevTransitions ? p2.from : p2.initial;
      payload.from = callProp(from, t.item, i);
    }
    const { onResolve } = payload;
    payload.onResolve = (result) => {
      callProp(onResolve, result);
      const transitions2 = usedTransitions.current;
      const t22 = transitions2.find((t32) => t32.key === key);
      if (!t22)
        return;
      if (result.cancelled && t22.phase != "update") {
        return;
      }
      if (t22.ctrl.idle) {
        const idle = transitions2.every((t32) => t32.ctrl.idle);
        if (t22.phase == "leave") {
          const expiry = callProp(expires, t22.item);
          if (expiry !== false) {
            const expiryMs = expiry === true ? 0 : expiry;
            t22.expired = true;
            if (!idle && expiryMs > 0) {
              if (expiryMs <= 2147483647)
                t22.expirationId = setTimeout(forceUpdate, expiryMs);
              return;
            }
          }
        }
        if (idle && transitions2.some((t32) => t32.expired)) {
          exitingTransitions.current.delete(t22);
          if (exitBeforeEnter) {
            forceChange.current = true;
          }
          forceUpdate();
        }
      }
    };
    const springs = getSprings(t.ctrl, payload);
    if (phase === "leave" && exitBeforeEnter) {
      exitingTransitions.current.set(t, { phase, springs, payload });
    } else {
      changes.set(t, { phase, springs, payload });
    }
  });
  const context = (0, import_react13.useContext)(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useIsomorphicLayoutEffect(() => {
    if (hasContext) {
      each(transitions, (t) => {
        t.ctrl.start({ default: context });
      });
    }
  }, [context]);
  each(changes, (_, t) => {
    if (exitingTransitions.current.size) {
      const ind = transitions.findIndex((state) => state.key === t.key);
      transitions.splice(ind, 1);
    }
  });
  useIsomorphicLayoutEffect(
    () => {
      each(
        exitingTransitions.current.size ? exitingTransitions.current : changes,
        ({ phase, payload }, t) => {
          const { ctrl } = t;
          t.phase = phase;
          ref == null ? void 0 : ref.add(ctrl);
          if (hasContext && phase == "enter") {
            ctrl.start({ default: context });
          }
          if (payload) {
            replaceRef(ctrl, payload.ref);
            if ((ctrl.ref || ref) && !forceChange.current) {
              ctrl.update(payload);
            } else {
              ctrl.start(payload);
              if (forceChange.current) {
                forceChange.current = false;
              }
            }
          }
        }
      );
    },
    reset ? void 0 : deps
  );
  const renderTransitions = (render) => React210.createElement(React210.Fragment, null, transitions.map((t, i) => {
    const { springs } = changes.get(t) || t.ctrl;
    const elem = render({ ...springs }, t.item, t, i);
    return elem && elem.type ? React210.createElement(
      elem.type,
      {
        ...elem.props,
        key: is.str(t.key) || is.num(t.key) ? t.key : t.ctrl.id,
        ref: elem.ref
      }
    ) : elem;
  }));
  return ref ? [renderTransitions, ref] : renderTransitions;
}
var nextKey = 1;
function getKeys(items, { key, keys = key }, prevTransitions) {
  if (keys === null) {
    const reused = /* @__PURE__ */ new Set();
    return items.map((item) => {
      const t = prevTransitions && prevTransitions.find(
        (t22) => t22.item === item && t22.phase !== "leave" && !reused.has(t22)
      );
      if (t) {
        reused.add(t);
        return t.key;
      }
      return nextKey++;
    });
  }
  return is.und(keys) ? items : is.fun(keys) ? items.map(keys) : toArray(keys);
}
var Interpolation = class extends FrameValue {
  constructor(source, args) {
    super();
    this.source = source;
    this.idle = true;
    this._active = /* @__PURE__ */ new Set();
    this.calc = createInterpolator(...args);
    const value = this._get();
    const nodeType = getAnimatedType(value);
    setAnimated(this, nodeType.create(value));
  }
  advance(_dt) {
    const value = this._get();
    const oldValue = this.get();
    if (!isEqual(value, oldValue)) {
      getAnimated(this).setValue(value);
      this._onChange(value, this.idle);
    }
    if (!this.idle && checkIdle(this._active)) {
      becomeIdle(this);
    }
  }
  _get() {
    const inputs = is.arr(this.source) ? this.source.map(getFluidValue) : toArray(getFluidValue(this.source));
    return this.calc(...inputs);
  }
  _start() {
    if (this.idle && !checkIdle(this._active)) {
      this.idle = false;
      each(getPayload(this), (node) => {
        node.done = false;
      });
      if (globals_exports.skipAnimation) {
        raf.batchedUpdates(() => this.advance());
        becomeIdle(this);
      } else {
        frameLoop.start(this);
      }
    }
  }
  // Observe our sources only when we're observed.
  _attach() {
    let priority2 = 1;
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        addFluidObserver(source, this);
      }
      if (isFrameValue(source)) {
        if (!source.idle) {
          this._active.add(source);
        }
        priority2 = Math.max(priority2, source.priority + 1);
      }
    });
    this.priority = priority2;
    this._start();
  }
  // Stop observing our sources once we have no observers.
  _detach() {
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        removeFluidObserver(source, this);
      }
    });
    this._active.clear();
    becomeIdle(this);
  }
  /** @internal */
  eventObserved(event) {
    if (event.type == "change") {
      if (event.idle) {
        this.advance();
      } else {
        this._active.add(event.parent);
        this._start();
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else if (event.type == "priority") {
      this.priority = toArray(this.source).reduce(
        (highest, parent) => Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1),
        0
      );
    }
  }
};
function isIdle(source) {
  return source.idle !== false;
}
function checkIdle(active) {
  return !active.size || Array.from(active).every(isIdle);
}
function becomeIdle(self) {
  if (!self.idle) {
    self.idle = true;
    each(getPayload(self), (node) => {
      node.done = true;
    });
    callFluidObservers(self, {
      type: "idle",
      parent: self
    });
  }
}
var to2 = (source, ...args) => new Interpolation(source, args);
globals_exports.assign({
  createStringInterpolator: createStringInterpolator2,
  to: (source, args) => new Interpolation(source, args)
});
var update2 = frameLoop.advance;

// node_modules/@react-spring/web/dist/react-spring_web.modern.mjs
var import_react_dom = __toESM(require_react_dom(), 1);
var isCustomPropRE = /^--/;
function dangerousStyleValue(name, value) {
  if (value == null || typeof value === "boolean" || value === "")
    return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]))
    return value + "px";
  return ("" + value).trim();
}
var attributeCache = {};
function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const { style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(
    (name) => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(
      /([A-Z])/g,
      // Attributes are written in dash case
      (n) => "-" + n.toLowerCase()
    ))
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (const name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue(name, style[name]);
      if (isCustomPropRE.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i) => {
    instance.setAttribute(name, values[i]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute("viewBox", viewBox);
  }
}
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixKey = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes2 = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes2.forEach((prefix2) => acc[prefixKey(prefix2, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);
var domTransforms = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms = /^(translate)/;
var degTransforms = /^(rotate|skew)/;
var addUnit = (value, unit2) => is.num(value) && value !== 0 ? value + unit2 : value;
var isValueIdentity = (value, id) => is.arr(value) ? value.every((v2) => isValueIdentity(v2, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle = class extends AnimatedObject {
  constructor({ x: x2, y: y2, z, ...style }) {
    const inputs = [];
    const transforms = [];
    if (x2 || y2 || z) {
      inputs.push([x2 || 0, y2 || 0, z || 0]);
      transforms.push((xyz) => [
        `translate3d(${xyz.map((v2) => addUnit(v2, "px")).join(",")})`,
        // prettier-ignore
        isValueIdentity(xyz, 0)
      ]);
    }
    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push((transform) => [transform, transform === ""]);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (is.und(value))
          return;
        const unit2 = pxTransforms.test(key) ? "px" : degTransforms.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(
          key === "rotate3d" ? ([x22, y22, z2, deg]) => [
            `rotate3d(${x22},${y22},${z2},${addUnit(deg, unit2)})`,
            isValueIdentity(deg, 0)
          ] : (input) => [
            `${key}(${input.map((v2) => addUnit(v2, unit2)).join(",")})`,
            isValueIdentity(input, key.startsWith("scale") ? 1 : 0)
          ]
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform = class extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = "";
    let identity5 = true;
    each(this.inputs, (input, i) => {
      const arg1 = getFluidValue(input[0]);
      const [t, id] = this.transforms[i](
        is.arr(arg1) ? arg1 : input.map(getFluidValue)
      );
      transform += " " + t;
      identity5 = identity5 && id;
    });
    return identity5 ? "none" : transform;
  }
  // Start observing our inputs once we have an observer.
  observerAdded(count2) {
    if (count2 == 1)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && addFluidObserver(value, this)
        )
      );
  }
  // Stop observing our inputs once we have no observers.
  observerRemoved(count2) {
    if (count2 == 0)
      each(
        this.inputs,
        (input) => each(
          input,
          (value) => hasFluidValue(value) && removeFluidObserver(value, this)
        )
      );
  }
  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
globals_exports.assign({
  batchedUpdates: import_react_dom.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator2,
  colors: colors2
});
var host = createHost(primitives, {
  applyAnimatedValues,
  createAnimatedStyle: (style) => new AnimatedStyle(style),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getComponentProps: ({ scrollTop, scrollLeft, ...props }) => props
});
var animated = host.animated;

// node_modules/@mui/x-charts/esm/BarChart/BarElement.js
init_extends();
init_objectWithoutPropertiesLoose();
var React38 = __toESM(require_react());
var import_prop_types19 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();

// node_modules/@mui/x-charts/esm/hooks/useInteractionItemProps.js
var React37 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/context/HighlightProvider.js
init_extends();
var React36 = __toESM(require_react());
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var defaultScope = {
  highlighted: "none",
  faded: "none"
};
var HighlighContext = React36.createContext({
  item: null,
  scope: defaultScope,
  dispatch: () => null
});
if (true) {
  HighlighContext.displayName = "HighlighContext";
}
var dataReducer2 = (prevState, action) => {
  switch (action.type) {
    case "enterItem":
      return _extends({}, prevState, {
        item: action.item,
        scope: _extends({}, defaultScope, action.scope)
      });
    case "leaveItem":
      if (prevState.item === null || Object.keys(action.item).some((key) => action.item[key] !== prevState.item[key])) {
        return prevState;
      }
      return _extends({}, prevState, {
        item: null
      });
    default:
      return prevState;
  }
};
function HighlightProvider(props) {
  const {
    children
  } = props;
  const [data, dispatch] = React36.useReducer(dataReducer2, {
    item: null,
    scope: defaultScope
  });
  const value = React36.useMemo(() => _extends({}, data, {
    dispatch
  }), [data]);
  return (0, import_jsx_runtime25.jsx)(HighlighContext.Provider, {
    value,
    children
  });
}

// node_modules/@mui/x-charts/esm/hooks/useInteractionItemProps.js
var useInteractionItemProps = (scope, skip) => {
  const {
    dispatch: dispatchInteraction
  } = React37.useContext(InteractionContext);
  const {
    dispatch: dispatchHighlight
  } = React37.useContext(HighlighContext);
  if (skip) {
    return () => ({});
  }
  const getInteractionItemProps = (data) => {
    const onMouseEnter = () => {
      dispatchInteraction({
        type: "enterItem",
        data
      });
      dispatchHighlight({
        type: "enterItem",
        item: data,
        scope
      });
    };
    const onMouseLeave = () => {
      dispatchInteraction({
        type: "leaveItem",
        data
      });
      dispatchHighlight({
        type: "leaveItem",
        item: data
      });
    };
    return {
      onMouseEnter,
      onMouseLeave
    };
  };
  return getInteractionItemProps;
};
var getIsHighlighted = (selectedItem, currentItem, highlightScope) => {
  if (!(highlightScope == null ? void 0 : highlightScope.highlighted) || highlightScope.highlighted === "none" || selectedItem === null) {
    return false;
  }
  const isSeriesSelected = selectedItem.type === currentItem.type && selectedItem.seriesId === currentItem.seriesId;
  if (!isSeriesSelected) {
    return false;
  }
  if (highlightScope.highlighted === "series") {
    return isSeriesSelected;
  }
  return selectedItem.dataIndex !== void 0 && selectedItem.dataIndex === currentItem.dataIndex;
};
var getIsFaded = (selectedItem, currentItem, highlightScope) => {
  if (!(highlightScope == null ? void 0 : highlightScope.faded) || highlightScope.faded === "none" || selectedItem === null) {
    return false;
  }
  const isSeriesSelected = selectedItem.type === currentItem.type && selectedItem.seriesId === currentItem.seriesId;
  if (highlightScope.faded === "series") {
    return isSeriesSelected && selectedItem.dataIndex !== currentItem.dataIndex;
  }
  if (highlightScope.faded === "global") {
    if (!isSeriesSelected) {
      return true;
    }
    return selectedItem.dataIndex !== void 0 && selectedItem.dataIndex !== currentItem.dataIndex;
  }
  return false;
};

// node_modules/@mui/x-charts/esm/BarChart/BarElement.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var _excluded7 = ["id", "dataIndex", "classes", "color", "highlightScope", "slots", "slotProps", "style", "onClick"];
function getBarElementUtilityClass(slot) {
  return generateUtilityClass("MuiBarElement", slot);
}
var barElementClasses = generateUtilityClasses("MuiBarElement", ["root"]);
var useUtilityClasses7 = (ownerState) => {
  const {
    classes,
    id
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`]
  };
  return composeClasses(slots, getBarElementUtilityClass, classes);
};
var BarElementPath = styled_default(animated.rect, {
  name: "MuiBarElement",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  stroke: "none",
  fill: ownerState.isHighlighted ? color(ownerState.color).brighter(0.5).formatHex() : ownerState.color,
  transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
  opacity: ownerState.isFaded && 0.3 || 1
}));
function BarElement(props) {
  const {
    id,
    dataIndex,
    classes: innerClasses,
    color: color2,
    highlightScope,
    slots,
    slotProps,
    style,
    onClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const getInteractionItemProps = useInteractionItemProps(highlightScope);
  const {
    item
  } = React38.useContext(InteractionContext);
  const isHighlighted = getIsHighlighted(item, {
    type: "bar",
    seriesId: id,
    dataIndex
  }, highlightScope);
  const isFaded = !isHighlighted && getIsFaded(item, {
    type: "bar",
    seriesId: id,
    dataIndex
  }, highlightScope);
  const ownerState = {
    id,
    dataIndex,
    classes: innerClasses,
    color: color2,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses7(ownerState);
  const Bar = (slots == null ? void 0 : slots.bar) ?? BarElementPath;
  const barProps = useSlotProps({
    elementType: Bar,
    externalSlotProps: slotProps == null ? void 0 : slotProps.bar,
    externalForwardedProps: other,
    additionalProps: _extends({}, getInteractionItemProps({
      type: "bar",
      seriesId: id,
      dataIndex
    }), {
      style,
      onClick,
      cursor: onClick ? "pointer" : "unset"
    }),
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime26.jsx)(Bar, _extends({}, barProps));
}
true ? BarElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types19.default.object,
  dataIndex: import_prop_types19.default.number.isRequired,
  highlightScope: import_prop_types19.default.shape({
    faded: import_prop_types19.default.oneOf(["global", "none", "series"]),
    highlighted: import_prop_types19.default.oneOf(["item", "none", "series"])
  }),
  id: import_prop_types19.default.oneOfType([import_prop_types19.default.number, import_prop_types19.default.string]).isRequired,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types19.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types19.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/BarChart/BarClipPath.js
init_objectWithoutPropertiesLoose();
init_extends();
var React39 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/BarChart/getRadius.js
var getRadius = (corner, {
  hasNegative,
  hasPositive,
  borderRadius,
  layout
}) => {
  if (!borderRadius) {
    return 0;
  }
  const isVertical = layout === "vertical";
  if (corner === "top-left" && (isVertical && hasPositive || !isVertical && hasNegative)) {
    return borderRadius;
  }
  if (corner === "top-right" && (isVertical && hasPositive || !isVertical && hasPositive)) {
    return borderRadius;
  }
  if (corner === "bottom-right" && (isVertical && hasNegative || !isVertical && hasPositive)) {
    return borderRadius;
  }
  if (corner === "bottom-left" && (isVertical && hasNegative || !isVertical && hasNegative)) {
    return borderRadius;
  }
  return 0;
};

// node_modules/@mui/x-charts/esm/BarChart/BarClipPath.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
var _excluded8 = ["style", "maskId"];
var buildInset = (corners) => `inset(0px round ${corners.topLeft}px ${corners.topRight}px ${corners.bottomRight}px ${corners.bottomLeft}px)`;
function BarClipRect(props) {
  var _a, _b;
  const radiusData = props.ownerState;
  return (0, import_jsx_runtime27.jsx)(animated.rect, {
    style: _extends({}, props.style, {
      clipPath: (props.ownerState.layout === "vertical" ? (_a = props.style) == null ? void 0 : _a.height : (_b = props.style) == null ? void 0 : _b.width).to((value) => buildInset({
        topLeft: Math.min(value, getRadius("top-left", radiusData)),
        topRight: Math.min(value, getRadius("top-right", radiusData)),
        bottomRight: Math.min(value, getRadius("bottom-right", radiusData)),
        bottomLeft: Math.min(value, getRadius("bottom-left", radiusData))
      }))
    })
  });
}
function BarClipPath(props) {
  const {
    style,
    maskId
  } = props, rest = _objectWithoutPropertiesLoose(props, _excluded8);
  if (!props.borderRadius || props.borderRadius <= 0) {
    return null;
  }
  return (0, import_jsx_runtime27.jsx)("clipPath", {
    id: maskId,
    children: (0, import_jsx_runtime27.jsx)(BarClipRect, {
      ownerState: rest,
      style
    })
  });
}

// node_modules/@mui/x-charts/esm/BarChart/BarLabel/BarLabelPlot.js
init_objectWithoutPropertiesLoose();
init_extends();
var React42 = __toESM(require_react());
var import_prop_types22 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/BarChart/BarLabel/BarLabelItem.js
init_extends();
init_objectWithoutPropertiesLoose();
var React41 = __toESM(require_react());
var import_prop_types21 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/BarChart/BarLabel/barLabelClasses.js
init_generateUtilityClass();
init_generateUtilityClasses();
init_composeClasses();
function getBarLabelUtilityClass(slot) {
  return generateUtilityClass("MuiBarLabel", slot);
}
var barLabelClasses = generateUtilityClasses("MuiBarLabel", ["root", "highlighted", "faded"]);
var useUtilityClasses8 = (ownerState) => {
  const {
    classes,
    seriesId,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${seriesId}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getBarLabelUtilityClass, classes);
};

// node_modules/@mui/x-charts/esm/BarChart/BarLabel/getBarLabel.js
var getBarLabel = (options) => {
  const {
    barLabel,
    value,
    dataIndex,
    seriesId,
    height,
    width
  } = options;
  if (barLabel === "value") {
    return value ? value == null ? void 0 : value.toString() : null;
  }
  return barLabel({
    seriesId,
    dataIndex,
    value
  }, {
    bar: {
      height,
      width
    }
  });
};

// node_modules/@mui/x-charts/esm/BarChart/BarLabel/BarLabel.js
init_objectWithoutPropertiesLoose();
init_extends();
var React40 = __toESM(require_react());
var import_prop_types20 = __toESM(require_prop_types());
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var _excluded9 = ["seriesId", "dataIndex", "color", "isFaded", "isHighlighted", "classes"];
var BarLabelComponent = styled_default(animated.text, {
  name: "MuiBarLabel",
  slot: "Root",
  overridesResolver: (_, styles) => [{
    [`&.${barLabelClasses.faded}`]: styles.faded
  }, {
    [`&.${barLabelClasses.highlighted}`]: styles.highlighted
  }, styles.root]
})(({
  theme
}) => {
  var _a, _b, _c, _d;
  return _extends({}, (_a = theme == null ? void 0 : theme.typography) == null ? void 0 : _a.body2, {
    stroke: "none",
    fill: (_d = (_c = (_b = theme.vars || theme) == null ? void 0 : _b.palette) == null ? void 0 : _c.text) == null ? void 0 : _d.primary,
    transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
    textAnchor: "middle",
    dominantBaseline: "central",
    pointerEvents: "none",
    opacity: 1,
    [`&.${barLabelClasses.faded}`]: {
      opacity: 0.3
    }
  });
});
function BarLabel(props) {
  const themeProps = useThemeProps({
    props,
    name: "MuiBarLabel"
  });
  const otherProps = _objectWithoutPropertiesLoose(themeProps, _excluded9);
  return (0, import_jsx_runtime28.jsx)(BarLabelComponent, _extends({}, otherProps));
}
true ? BarLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types20.default.object,
  dataIndex: import_prop_types20.default.number.isRequired,
  isFaded: import_prop_types20.default.bool.isRequired,
  isHighlighted: import_prop_types20.default.bool.isRequired,
  seriesId: import_prop_types20.default.oneOfType([import_prop_types20.default.number, import_prop_types20.default.string]).isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/BarChart/BarLabel/BarLabelItem.js
var import_jsx_runtime29 = __toESM(require_jsx_runtime());
var _excluded10 = ["seriesId", "classes", "color", "style", "dataIndex", "barLabel", "slots", "slotProps", "height", "width", "value"];
var _excluded23 = ["ownerState"];
function BarLabelItem(props) {
  const {
    seriesId,
    classes: innerClasses,
    color: color2,
    style,
    dataIndex,
    barLabel,
    slots,
    slotProps,
    height,
    width,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const {
    item
  } = React41.useContext(InteractionContext);
  const {
    scope
  } = React41.useContext(HighlighContext);
  const isHighlighted = getIsHighlighted(item, {
    type: "bar",
    seriesId,
    dataIndex
  }, scope);
  const isFaded = !isHighlighted && getIsFaded(item, {
    type: "bar",
    seriesId,
    dataIndex
  }, scope);
  const ownerState = {
    seriesId,
    classes: innerClasses,
    color: color2,
    isFaded,
    isHighlighted,
    dataIndex
  };
  const classes = useUtilityClasses8(ownerState);
  const Component = (slots == null ? void 0 : slots.barLabel) ?? BarLabel;
  const _useSlotProps = useSlotProps({
    elementType: Component,
    externalSlotProps: slotProps == null ? void 0 : slotProps.barLabel,
    additionalProps: _extends({}, other, {
      style,
      className: classes.root
    }),
    ownerState
  }), {
    ownerState: barLabelOwnerState
  } = _useSlotProps, barLabelProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded23);
  if (!barLabel) {
    return null;
  }
  const formattedLabelText = getBarLabel({
    barLabel,
    value,
    dataIndex,
    seriesId,
    height,
    width
  });
  if (!formattedLabelText) {
    return null;
  }
  return (0, import_jsx_runtime29.jsx)(Component, _extends({}, barLabelProps, barLabelOwnerState, {
    children: formattedLabelText
  }));
}
true ? BarLabelItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If provided, the function will be used to format the label of the bar.
   * It can be set to 'value' to display the current value.
   * @param {BarItem} item The item to format.
   * @param {BarLabelContext} context data about the bar.
   * @returns {string} The formatted label.
   */
  barLabel: import_prop_types21.default.oneOfType([import_prop_types21.default.oneOf(["value"]), import_prop_types21.default.func]),
  classes: import_prop_types21.default.object,
  color: import_prop_types21.default.string.isRequired,
  dataIndex: import_prop_types21.default.number.isRequired,
  /**
   * The height of the bar.
   */
  height: import_prop_types21.default.number.isRequired,
  seriesId: import_prop_types21.default.oneOfType([import_prop_types21.default.number, import_prop_types21.default.string]).isRequired,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types21.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types21.default.object,
  /**
   * The value of the data point.
   */
  value: import_prop_types21.default.number,
  /**
   * The width of the bar.
   */
  width: import_prop_types21.default.number.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/BarChart/BarLabel/BarLabelPlot.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime());
var _excluded11 = ["bars", "skipAnimation"];
var leaveStyle = ({
  layout,
  yOrigin,
  x: x2,
  width,
  y: y2,
  xOrigin,
  height
}) => _extends({}, layout === "vertical" ? {
  y: yOrigin,
  x: x2 + width / 2,
  height: 0,
  width
} : {
  y: y2 + height / 2,
  x: xOrigin,
  height,
  width: 0
});
var enterStyle = ({
  x: x2,
  width,
  y: y2,
  height
}) => ({
  x: x2 + width / 2,
  y: y2 + height / 2,
  height,
  width
});
function BarLabelPlot(props) {
  const {
    bars,
    skipAnimation: skipAnimation2
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const barLabelTransition = useTransition(bars, {
    keys: (bar) => `${bar.seriesId}-${bar.dataIndex}`,
    from: leaveStyle,
    leave: null,
    enter: enterStyle,
    update: enterStyle,
    immediate: skipAnimation2
  });
  return (0, import_jsx_runtime30.jsx)(React42.Fragment, {
    children: barLabelTransition((style, {
      seriesId,
      dataIndex,
      color: color2,
      value,
      width,
      height
    }) => (0, import_jsx_runtime30.jsx)(BarLabelItem, _extends({
      seriesId,
      dataIndex,
      value,
      color: color2,
      width,
      height
    }, other, {
      style
    })))
  });
}
true ? BarLabelPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  barLabel: import_prop_types22.default.oneOfType([import_prop_types22.default.oneOf(["value"]), import_prop_types22.default.func]),
  bars: import_prop_types22.default.arrayOf(import_prop_types22.default.shape({
    color: import_prop_types22.default.string.isRequired,
    dataIndex: import_prop_types22.default.number.isRequired,
    height: import_prop_types22.default.number.isRequired,
    highlightScope: import_prop_types22.default.shape({
      faded: import_prop_types22.default.oneOf(["global", "none", "series"]),
      highlighted: import_prop_types22.default.oneOf(["item", "none", "series"])
    }),
    layout: import_prop_types22.default.oneOf(["horizontal", "vertical"]),
    maskId: import_prop_types22.default.string.isRequired,
    seriesId: import_prop_types22.default.oneOfType([import_prop_types22.default.number, import_prop_types22.default.string]).isRequired,
    value: import_prop_types22.default.number,
    width: import_prop_types22.default.number.isRequired,
    x: import_prop_types22.default.number.isRequired,
    xOrigin: import_prop_types22.default.number.isRequired,
    y: import_prop_types22.default.number.isRequired,
    yOrigin: import_prop_types22.default.number.isRequired
  })).isRequired,
  skipAnimation: import_prop_types22.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/BarChart/BarPlot.js
var import_jsx_runtime31 = __toESM(require_jsx_runtime());
var _excluded12 = ["skipAnimation", "onItemClick", "borderRadius", "barLabel"];
function getBandSize({
  bandWidth: W,
  numberOfGroups: N,
  gapRatio: r
}) {
  if (r === 0) {
    return {
      barWidth: W / N,
      offset: 0
    };
  }
  const barWidth = W / (N + (N - 1) * r);
  const offset = r * barWidth;
  return {
    barWidth,
    offset
  };
}
var useAggregatedData = () => {
  const seriesData = React43.useContext(SeriesContext).bar ?? {
    series: {},
    stackingGroups: [],
    seriesOrder: []
  };
  const axisData = React43.useContext(CartesianContext);
  const chartId = useChartId();
  const {
    series,
    stackingGroups
  } = seriesData;
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = axisData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  const masks = {};
  const data = stackingGroups.flatMap(({
    ids: groupIds
  }, groupIndex) => {
    return groupIds.flatMap((seriesId) => {
      const xAxisKey = series[seriesId].xAxisKey ?? defaultXAxisId;
      const yAxisKey = series[seriesId].yAxisKey ?? defaultYAxisId;
      const xAxisConfig = xAxis[xAxisKey];
      const yAxisConfig = yAxis[yAxisKey];
      const verticalLayout = series[seriesId].layout === "vertical";
      let baseScaleConfig;
      if (verticalLayout) {
        if (!isBandScaleConfig(xAxisConfig)) {
          throw new Error(`MUI X Charts: ${xAxisKey === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisKey}"`} should be of type "band" to display the bar series of id "${seriesId}".`);
        }
        if (xAxis[xAxisKey].data === void 0) {
          throw new Error(`MUI X Charts: ${xAxisKey === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisKey}"`} should have data property.`);
        }
        baseScaleConfig = xAxisConfig;
        if (isBandScaleConfig(yAxisConfig) || isPointScaleConfig(yAxisConfig)) {
          throw new Error(`MUI X Charts: ${yAxisKey === DEFAULT_Y_AXIS_KEY ? "The first `yAxis`" : `The y-axis with id "${yAxisKey}"`} should be a continuous type to display the bar series of id "${seriesId}".`);
        }
      } else {
        if (!isBandScaleConfig(yAxisConfig)) {
          throw new Error(`MUI X Charts: ${yAxisKey === DEFAULT_Y_AXIS_KEY ? "The first `yAxis`" : `The y-axis with id "${yAxisKey}"`} should be of type "band" to display the bar series of id "${seriesId}".`);
        }
        if (yAxis[yAxisKey].data === void 0) {
          throw new Error(`MUI X Charts: ${yAxisKey === DEFAULT_Y_AXIS_KEY ? "The first `yAxis`" : `The y-axis with id "${yAxisKey}"`} should have data property.`);
        }
        baseScaleConfig = yAxisConfig;
        if (isBandScaleConfig(xAxisConfig) || isPointScaleConfig(xAxisConfig)) {
          throw new Error(`MUI X Charts: ${xAxisKey === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisKey}"`} should be a continuous type to display the bar series of id "${seriesId}".`);
        }
      }
      const xScale = xAxisConfig.scale;
      const yScale = yAxisConfig.scale;
      const colorGetter = getColor(series[seriesId], xAxis[xAxisKey], yAxis[yAxisKey]);
      const bandWidth = baseScaleConfig.scale.bandwidth();
      const {
        barWidth,
        offset
      } = getBandSize({
        bandWidth,
        numberOfGroups: stackingGroups.length,
        gapRatio: baseScaleConfig.barGapRatio
      });
      const barOffset = groupIndex * (barWidth + offset);
      const {
        stackedData
      } = series[seriesId];
      return stackedData.map((values, dataIndex) => {
        var _a, _b;
        const valueCoordinates = values.map((v2) => verticalLayout ? yScale(v2) : xScale(v2));
        const minValueCoord = Math.round(Math.min(...valueCoordinates));
        const maxValueCoord = Math.round(Math.max(...valueCoordinates));
        const stackId = series[seriesId].stack;
        const result = {
          seriesId,
          dataIndex,
          layout: series[seriesId].layout,
          x: verticalLayout ? xScale((_a = xAxis[xAxisKey].data) == null ? void 0 : _a[dataIndex]) + barOffset : minValueCoord,
          y: verticalLayout ? minValueCoord : yScale((_b = yAxis[yAxisKey].data) == null ? void 0 : _b[dataIndex]) + barOffset,
          xOrigin: xScale(0),
          yOrigin: yScale(0),
          height: verticalLayout ? maxValueCoord - minValueCoord : barWidth,
          width: verticalLayout ? barWidth : maxValueCoord - minValueCoord,
          color: colorGetter(dataIndex),
          highlightScope: series[seriesId].highlightScope,
          value: series[seriesId].data[dataIndex],
          maskId: `${chartId}_${stackId || seriesId}_${groupIndex}_${dataIndex}`
        };
        if (!masks[result.maskId]) {
          masks[result.maskId] = {
            id: result.maskId,
            width: 0,
            height: 0,
            hasNegative: false,
            hasPositive: false,
            layout: result.layout,
            xOrigin: xScale(0),
            yOrigin: yScale(0),
            x: 0,
            y: 0
          };
        }
        const mask = masks[result.maskId];
        mask.width = result.layout === "vertical" ? result.width : mask.width + result.width;
        mask.height = result.layout === "vertical" ? mask.height + result.height : result.height;
        mask.x = Math.min(mask.x === 0 ? Infinity : mask.x, result.x);
        mask.y = Math.min(mask.y === 0 ? Infinity : mask.y, result.y);
        mask.hasNegative = mask.hasNegative || (result.value ?? 0) < 0;
        mask.hasPositive = mask.hasPositive || (result.value ?? 0) > 0;
        return result;
      });
    });
  });
  return {
    completedData: data,
    masksData: Object.values(masks)
  };
};
var leaveStyle2 = ({
  layout,
  yOrigin,
  x: x2,
  width,
  y: y2,
  xOrigin,
  height
}) => _extends({}, layout === "vertical" ? {
  y: yOrigin,
  x: x2,
  height: 0,
  width
} : {
  y: y2,
  x: xOrigin,
  height,
  width: 0
});
var enterStyle2 = ({
  x: x2,
  width,
  y: y2,
  height
}) => ({
  y: y2,
  x: x2,
  height,
  width
});
function BarPlot(props) {
  const {
    completedData,
    masksData
  } = useAggregatedData();
  const {
    skipAnimation: skipAnimation2,
    onItemClick,
    borderRadius,
    barLabel
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
  const transition = useTransition(completedData, {
    keys: (bar) => `${bar.seriesId}-${bar.dataIndex}`,
    from: leaveStyle2,
    leave: leaveStyle2,
    enter: enterStyle2,
    update: enterStyle2,
    immediate: skipAnimation2
  });
  const maskTransition = useTransition(masksData, {
    keys: (v2) => v2.id,
    from: leaveStyle2,
    leave: leaveStyle2,
    enter: enterStyle2,
    update: enterStyle2,
    immediate: skipAnimation2
  });
  return (0, import_jsx_runtime31.jsxs)(React43.Fragment, {
    children: [maskTransition((style, {
      id,
      hasPositive,
      hasNegative,
      layout
    }) => {
      return (0, import_jsx_runtime31.jsx)(BarClipPath, {
        maskId: id,
        borderRadius,
        hasNegative,
        hasPositive,
        layout,
        style
      });
    }), transition((style, {
      seriesId,
      dataIndex,
      color: color2,
      highlightScope,
      maskId
    }) => {
      const barElement = (0, import_jsx_runtime31.jsx)(BarElement, _extends({
        id: seriesId,
        dataIndex,
        color: color2,
        highlightScope
      }, other, {
        onClick: onItemClick && ((event) => {
          onItemClick(event, {
            type: "bar",
            seriesId,
            dataIndex
          });
        }),
        style
      }));
      if (!borderRadius || borderRadius <= 0) {
        return barElement;
      }
      return (0, import_jsx_runtime31.jsx)("g", {
        clipPath: `url(#${maskId})`,
        children: barElement
      });
    }), barLabel && (0, import_jsx_runtime31.jsx)(BarLabelPlot, _extends({
      bars: completedData,
      skipAnimation: skipAnimation2,
      barLabel
    }, other))]
  });
}
true ? BarPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If provided, the function will be used to format the label of the bar.
   * It can be set to 'value' to display the current value.
   * @param {BarItem} item The item to format.
   * @param {BarLabelContext} context data about the bar.
   * @returns {string} The formatted label.
   */
  barLabel: import_prop_types23.default.oneOfType([import_prop_types23.default.oneOf(["value"]), import_prop_types23.default.func]),
  /**
   * Defines the border radius of the bar element.
   */
  borderRadius: import_prop_types23.default.number,
  /**
   * Callback fired when a bar item is clicked.
   * @param {React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
   * @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
   */
  onItemClick: import_prop_types23.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types23.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types23.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types23.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ResponsiveChartContainer/ResponsiveChartContainer.js
init_extends();
init_objectWithoutPropertiesLoose();
var React51 = __toESM(require_react());
var import_prop_types26 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/ChartContainer/ChartContainer.js
var React49 = __toESM(require_react());
var import_prop_types25 = __toESM(require_prop_types());
init_useForkRef();

// node_modules/@mui/x-charts/esm/hooks/useReducedMotion.js
var useReducedMotion2 = () => {
  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion)");
    const handleMediaChange = (e) => {
      globals_exports.assign({
        // Modification such the react-spring implementation such that this hook can remove animation but never activate animation.
        skipAnimation: e.matches || void 0
      });
    };
    handleMediaChange(mql);
    mql.addEventListener("change", handleMediaChange);
    return () => {
      mql.removeEventListener("change", handleMediaChange);
    };
  }, []);
};

// node_modules/@mui/x-charts/esm/ChartsSurface.js
init_extends();
init_objectWithoutPropertiesLoose();
var import_prop_types24 = __toESM(require_prop_types());
var React45 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/hooks/useAxisEvents.js
var React44 = __toESM(require_react());
function getAsANumber(value) {
  return value instanceof Date ? value.getTime() : value;
}
var useAxisEvents = (disableAxisListener) => {
  const svgRef = useSvgRef();
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = React44.useContext(CartesianContext);
  const {
    dispatch
  } = React44.useContext(InteractionContext);
  const usedXAxis = xAxisIds[0];
  const usedYAxis = yAxisIds[0];
  const mousePosition = React44.useRef({
    x: -1,
    y: -1
  });
  React44.useEffect(() => {
    const element = svgRef.current;
    if (element === null || disableAxisListener) {
      return () => {
      };
    }
    const getUpdate = (axisConfig, mouseValue) => {
      if (usedXAxis === null) {
        return null;
      }
      const {
        scale: scale2,
        data: axisData,
        reverse: reverse2
      } = axisConfig;
      if (!isBandScale(scale2)) {
        const value = scale2.invert(mouseValue);
        if (axisData === void 0) {
          return {
            value
          };
        }
        const valueAsNumber = getAsANumber(value);
        const closestIndex = axisData == null ? void 0 : axisData.findIndex((pointValue, index2) => {
          const v2 = getAsANumber(pointValue);
          if (v2 > valueAsNumber) {
            if (index2 === 0 || Math.abs(valueAsNumber - v2) <= Math.abs(valueAsNumber - getAsANumber(axisData[index2 - 1]))) {
              return true;
            }
          }
          if (v2 <= valueAsNumber) {
            if (index2 === axisData.length - 1 || Math.abs(getAsANumber(value) - v2) < Math.abs(getAsANumber(value) - getAsANumber(axisData[index2 + 1]))) {
              return true;
            }
          }
          return false;
        });
        return {
          value: closestIndex !== void 0 && closestIndex >= 0 ? axisData[closestIndex] : value,
          index: closestIndex
        };
      }
      const dataIndex = scale2.bandwidth() === 0 ? Math.floor((mouseValue - Math.min(...scale2.range()) + scale2.step() / 2) / scale2.step()) : Math.floor((mouseValue - Math.min(...scale2.range())) / scale2.step());
      if (dataIndex < 0 || dataIndex >= axisData.length) {
        return null;
      }
      if (reverse2) {
        const reverseIndex = axisData.length - 1 - dataIndex;
        return {
          index: reverseIndex,
          value: axisData[reverseIndex]
        };
      }
      return {
        index: dataIndex,
        value: axisData[dataIndex]
      };
    };
    const handleOut = () => {
      mousePosition.current = {
        x: -1,
        y: -1
      };
      dispatch({
        type: "exitChart"
      });
    };
    const handleMove = (event) => {
      const target = "targetTouches" in event ? event.targetTouches[0] : event;
      const svgPoint = getSVGPoint(svgRef.current, target);
      mousePosition.current = {
        x: svgPoint.x,
        y: svgPoint.y
      };
      const outsideX = svgPoint.x < left || svgPoint.x > left + width;
      const outsideY = svgPoint.y < top || svgPoint.y > top + height;
      if (outsideX || outsideY) {
        dispatch({
          type: "exitChart"
        });
        return;
      }
      const newStateX = getUpdate(xAxis[usedXAxis], svgPoint.x);
      const newStateY = getUpdate(yAxis[usedYAxis], svgPoint.y);
      dispatch({
        type: "updateAxis",
        data: {
          x: newStateX,
          y: newStateY
        }
      });
    };
    element.addEventListener("mouseout", handleOut);
    element.addEventListener("mousemove", handleMove);
    element.addEventListener("touchend", handleOut);
    element.addEventListener("touchmove", handleMove);
    return () => {
      element.removeEventListener("mouseout", handleOut);
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("touchend", handleOut);
      element.removeEventListener("touchmove", handleMove);
    };
  }, [svgRef, dispatch, left, width, top, height, usedYAxis, yAxis, usedXAxis, xAxis, disableAxisListener]);
};

// node_modules/@mui/x-charts/esm/ChartsSurface.js
var import_jsx_runtime32 = __toESM(require_jsx_runtime());
var _excluded13 = ["children", "width", "height", "viewBox", "disableAxisListener", "className", "title", "desc"];
var ChartChartsSurfaceStyles = styled_default("svg", {
  name: "MuiChartsSurface",
  slot: "Root"
})(() => ({}));
var ChartsSurface = React45.forwardRef(function ChartsSurface2(props, ref) {
  const {
    children,
    width,
    height,
    viewBox,
    disableAxisListener = false,
    title,
    desc
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
  const svgView = _extends({
    width,
    height,
    x: 0,
    y: 0
  }, viewBox);
  useAxisEvents(disableAxisListener);
  return (0, import_jsx_runtime32.jsxs)(ChartChartsSurfaceStyles, _extends({
    width,
    height,
    viewBox: `${svgView.x} ${svgView.y} ${svgView.width} ${svgView.height}`,
    ref
  }, other, {
    children: [(0, import_jsx_runtime32.jsx)("title", {
      children: title
    }), (0, import_jsx_runtime32.jsx)("desc", {
      children: desc
    }), children]
  }));
});
true ? ChartsSurface.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types24.default.node,
  className: import_prop_types24.default.string,
  desc: import_prop_types24.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types24.default.bool,
  /**
   * The height of the chart in px.
   */
  height: import_prop_types24.default.number.isRequired,
  sx: import_prop_types24.default.oneOfType([import_prop_types24.default.arrayOf(import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.object, import_prop_types24.default.bool])), import_prop_types24.default.func, import_prop_types24.default.object]),
  title: import_prop_types24.default.string,
  viewBox: import_prop_types24.default.shape({
    height: import_prop_types24.default.number,
    width: import_prop_types24.default.number,
    x: import_prop_types24.default.number,
    y: import_prop_types24.default.number
  }),
  /**
   * The width of the chart in px.
   */
  width: import_prop_types24.default.number.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var React48 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsPiecewiseGradient.js
var React46 = __toESM(require_react());
var import_jsx_runtime33 = __toESM(require_jsx_runtime());
function ChartsPiecewiseGradient(props) {
  const {
    isReversed,
    gradientId,
    size,
    direction,
    scale: scale2,
    colorMap
  } = props;
  return (0, import_jsx_runtime33.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: `${size}px`,
    gradientUnits: "userSpaceOnUse",
    children: colorMap.thresholds.map((threshold2, index2) => {
      const x2 = scale2(threshold2);
      if (x2 === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x2 / size : x2 / size;
      return (0, import_jsx_runtime33.jsxs)(React46.Fragment, {
        children: [(0, import_jsx_runtime33.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index2],
          stopOpacity: 1
        }), (0, import_jsx_runtime33.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index2 + 1],
          stopOpacity: 1
        })]
      }, threshold2.toString() + index2);
    })
  });
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsContinuousGradient.js
var React47 = __toESM(require_react());
var import_jsx_runtime34 = __toESM(require_jsx_runtime());
var PX_PRECISION = 10;
function ChartsContinuousGradient(props) {
  const {
    isReversed,
    gradientId,
    size,
    direction,
    scale: scale2,
    colorScale,
    colorMap
  } = props;
  const extremValues = [colorMap.min ?? 0, colorMap.max ?? 100];
  const extremPositions = extremValues.map(scale2).filter((p) => p !== void 0);
  if (extremPositions.length !== 2) {
    return null;
  }
  const interpolator = typeof extremValues[0] === "number" ? number_default(extremValues[0], extremValues[1]) : date_default(extremValues[0], extremValues[1]);
  const numberOfPoints = Math.round((Math.max(...extremPositions) - Math.min(...extremPositions)) / PX_PRECISION);
  const keyPrefix = `${extremValues[0]}-${extremValues[1]}-`;
  return (0, import_jsx_runtime34.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: `${size}px`,
    gradientUnits: "userSpaceOnUse",
    children: Array.from({
      length: numberOfPoints + 1
    }, (_, index2) => {
      const value = interpolator(index2 / numberOfPoints);
      if (value === void 0) {
        return null;
      }
      const x2 = scale2(value);
      if (x2 === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x2 / size : x2 / size;
      const color2 = colorScale(value);
      if (color2 === null) {
        return null;
      }
      return (0, import_jsx_runtime34.jsx)("stop", {
        offset,
        stopColor: color2,
        stopOpacity: 1
      }, keyPrefix + index2);
    })
  });
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var import_jsx_runtime35 = __toESM(require_jsx_runtime());
function useChartGradient() {
  const {
    chartId
  } = React48.useContext(DrawingContext);
  return React48.useCallback((axisId, direction) => `${chartId}-gradient-${direction}-${axisId}`, [chartId]);
}
function ChartsAxesGradients() {
  const {
    top,
    height,
    bottom,
    left,
    width,
    right
  } = useDrawingArea();
  const svgHeight = top + height + bottom;
  const svgWidth = left + width + right;
  const getGradientId = useChartGradient();
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = React48.useContext(CartesianContext);
  return (0, import_jsx_runtime35.jsxs)("defs", {
    children: [yAxisIds.filter((axisId) => yAxis[axisId].colorMap !== void 0).map((axisId) => {
      const gradientId = getGradientId(axisId, "y");
      const {
        colorMap,
        scale: scale2,
        colorScale,
        reverse: reverse2
      } = yAxis[axisId];
      if ((colorMap == null ? void 0 : colorMap.type) === "piecewise") {
        return (0, import_jsx_runtime35.jsx)(ChartsPiecewiseGradient, {
          isReversed: !reverse2,
          scale: scale2,
          colorMap,
          size: svgHeight,
          gradientId,
          direction: "y"
        }, gradientId);
      }
      if ((colorMap == null ? void 0 : colorMap.type) === "continuous") {
        return (0, import_jsx_runtime35.jsx)(ChartsContinuousGradient, {
          isReversed: !reverse2,
          scale: scale2,
          colorScale,
          colorMap,
          size: svgHeight,
          gradientId,
          direction: "y"
        }, gradientId);
      }
      return null;
    }), xAxisIds.filter((axisId) => xAxis[axisId].colorMap !== void 0).map((axisId) => {
      const gradientId = getGradientId(axisId, "x");
      const {
        colorMap,
        scale: scale2,
        reverse: reverse2,
        colorScale
      } = xAxis[axisId];
      if ((colorMap == null ? void 0 : colorMap.type) === "piecewise") {
        return (0, import_jsx_runtime35.jsx)(ChartsPiecewiseGradient, {
          isReversed: reverse2,
          scale: scale2,
          colorMap,
          size: svgWidth,
          gradientId,
          direction: "x"
        }, gradientId);
      }
      if ((colorMap == null ? void 0 : colorMap.type) === "continuous") {
        return (0, import_jsx_runtime35.jsx)(ChartsContinuousGradient, {
          isReversed: reverse2,
          scale: scale2,
          colorScale,
          colorMap,
          size: svgWidth,
          gradientId,
          direction: "x"
        }, gradientId);
      }
      return null;
    })]
  });
}

// node_modules/@mui/x-charts/esm/ChartContainer/ChartContainer.js
var import_jsx_runtime36 = __toESM(require_jsx_runtime());
var ChartContainer = React49.forwardRef(function ChartContainer2(props, ref) {
  const {
    width,
    height,
    series,
    margin,
    xAxis,
    yAxis,
    colors: colors3,
    dataset,
    sx,
    title,
    desc,
    disableAxisListener,
    children
  } = props;
  const svgRef = React49.useRef(null);
  const handleRef = useForkRef(ref, svgRef);
  useReducedMotion2();
  return (0, import_jsx_runtime36.jsx)(DrawingProvider, {
    width,
    height,
    margin,
    svgRef,
    children: (0, import_jsx_runtime36.jsx)(SeriesContextProvider, {
      series,
      colors: colors3,
      dataset,
      children: (0, import_jsx_runtime36.jsx)(CartesianContextProvider, {
        xAxis,
        yAxis,
        dataset,
        children: (0, import_jsx_runtime36.jsx)(InteractionProvider, {
          children: (0, import_jsx_runtime36.jsx)(HighlightProvider, {
            children: (0, import_jsx_runtime36.jsxs)(ChartsSurface, {
              width,
              height,
              ref: handleRef,
              sx,
              title,
              desc,
              disableAxisListener,
              children: [(0, import_jsx_runtime36.jsx)(ChartsAxesGradients, {}), children]
            })
          })
        })
      })
    })
  });
});
true ? ChartContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types25.default.node,
  className: import_prop_types25.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types25.default.oneOfType([import_prop_types25.default.arrayOf(import_prop_types25.default.string), import_prop_types25.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types25.default.arrayOf(import_prop_types25.default.object),
  desc: import_prop_types25.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types25.default.bool,
  /**
   * The height of the chart in px.
   */
  height: import_prop_types25.default.number.isRequired,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types25.default.shape({
    bottom: import_prop_types25.default.number,
    left: import_prop_types25.default.number,
    right: import_prop_types25.default.number,
    top: import_prop_types25.default.number
  }),
  /**
   * The array of series to display.
   * Each type of series has its own specificity.
   * Please refer to the appropriate docs page to learn more about it.
   */
  series: import_prop_types25.default.arrayOf(import_prop_types25.default.object).isRequired,
  sx: import_prop_types25.default.oneOfType([import_prop_types25.default.arrayOf(import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.object, import_prop_types25.default.bool])), import_prop_types25.default.func, import_prop_types25.default.object]),
  title: import_prop_types25.default.string,
  viewBox: import_prop_types25.default.shape({
    height: import_prop_types25.default.number,
    width: import_prop_types25.default.number,
    x: import_prop_types25.default.number,
    y: import_prop_types25.default.number
  }),
  /**
   * The width of the chart in px.
   */
  width: import_prop_types25.default.number.isRequired,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types25.default.arrayOf(import_prop_types25.default.shape({
    axisId: import_prop_types25.default.oneOfType([import_prop_types25.default.number, import_prop_types25.default.string]),
    classes: import_prop_types25.default.object,
    colorMap: import_prop_types25.default.oneOfType([import_prop_types25.default.shape({
      colors: import_prop_types25.default.arrayOf(import_prop_types25.default.string).isRequired,
      type: import_prop_types25.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types25.default.string,
      values: import_prop_types25.default.arrayOf(import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number, import_prop_types25.default.string]).isRequired)
    }), import_prop_types25.default.shape({
      color: import_prop_types25.default.oneOfType([import_prop_types25.default.arrayOf(import_prop_types25.default.string.isRequired), import_prop_types25.default.func]).isRequired,
      max: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
      min: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
      type: import_prop_types25.default.oneOf(["continuous"]).isRequired
    }), import_prop_types25.default.shape({
      colors: import_prop_types25.default.arrayOf(import_prop_types25.default.string).isRequired,
      thresholds: import_prop_types25.default.arrayOf(import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]).isRequired).isRequired,
      type: import_prop_types25.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types25.default.array,
    dataKey: import_prop_types25.default.string,
    disableLine: import_prop_types25.default.bool,
    disableTicks: import_prop_types25.default.bool,
    fill: import_prop_types25.default.string,
    hideTooltip: import_prop_types25.default.bool,
    id: import_prop_types25.default.oneOfType([import_prop_types25.default.number, import_prop_types25.default.string]),
    label: import_prop_types25.default.string,
    labelFontSize: import_prop_types25.default.number,
    labelStyle: import_prop_types25.default.object,
    max: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
    min: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
    position: import_prop_types25.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types25.default.bool,
    scaleType: import_prop_types25.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types25.default.object,
    slots: import_prop_types25.default.object,
    stroke: import_prop_types25.default.string,
    tickFontSize: import_prop_types25.default.number,
    tickInterval: import_prop_types25.default.oneOfType([import_prop_types25.default.oneOf(["auto"]), import_prop_types25.default.array, import_prop_types25.default.func]),
    tickLabelInterval: import_prop_types25.default.oneOfType([import_prop_types25.default.oneOf(["auto"]), import_prop_types25.default.func]),
    tickLabelPlacement: import_prop_types25.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types25.default.object,
    tickMaxStep: import_prop_types25.default.number,
    tickMinStep: import_prop_types25.default.number,
    tickNumber: import_prop_types25.default.number,
    tickPlacement: import_prop_types25.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types25.default.number,
    valueFormatter: import_prop_types25.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types25.default.arrayOf(import_prop_types25.default.shape({
    axisId: import_prop_types25.default.oneOfType([import_prop_types25.default.number, import_prop_types25.default.string]),
    classes: import_prop_types25.default.object,
    colorMap: import_prop_types25.default.oneOfType([import_prop_types25.default.shape({
      colors: import_prop_types25.default.arrayOf(import_prop_types25.default.string).isRequired,
      type: import_prop_types25.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types25.default.string,
      values: import_prop_types25.default.arrayOf(import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number, import_prop_types25.default.string]).isRequired)
    }), import_prop_types25.default.shape({
      color: import_prop_types25.default.oneOfType([import_prop_types25.default.arrayOf(import_prop_types25.default.string.isRequired), import_prop_types25.default.func]).isRequired,
      max: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
      min: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
      type: import_prop_types25.default.oneOf(["continuous"]).isRequired
    }), import_prop_types25.default.shape({
      colors: import_prop_types25.default.arrayOf(import_prop_types25.default.string).isRequired,
      thresholds: import_prop_types25.default.arrayOf(import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]).isRequired).isRequired,
      type: import_prop_types25.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types25.default.array,
    dataKey: import_prop_types25.default.string,
    disableLine: import_prop_types25.default.bool,
    disableTicks: import_prop_types25.default.bool,
    fill: import_prop_types25.default.string,
    hideTooltip: import_prop_types25.default.bool,
    id: import_prop_types25.default.oneOfType([import_prop_types25.default.number, import_prop_types25.default.string]),
    label: import_prop_types25.default.string,
    labelFontSize: import_prop_types25.default.number,
    labelStyle: import_prop_types25.default.object,
    max: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
    min: import_prop_types25.default.oneOfType([import_prop_types25.default.instanceOf(Date), import_prop_types25.default.number]),
    position: import_prop_types25.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types25.default.bool,
    scaleType: import_prop_types25.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types25.default.object,
    slots: import_prop_types25.default.object,
    stroke: import_prop_types25.default.string,
    tickFontSize: import_prop_types25.default.number,
    tickInterval: import_prop_types25.default.oneOfType([import_prop_types25.default.oneOf(["auto"]), import_prop_types25.default.array, import_prop_types25.default.func]),
    tickLabelInterval: import_prop_types25.default.oneOfType([import_prop_types25.default.oneOf(["auto"]), import_prop_types25.default.func]),
    tickLabelPlacement: import_prop_types25.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types25.default.object,
    tickMaxStep: import_prop_types25.default.number,
    tickMinStep: import_prop_types25.default.number,
    tickNumber: import_prop_types25.default.number,
    tickPlacement: import_prop_types25.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types25.default.number,
    valueFormatter: import_prop_types25.default.func
  }))
} : void 0;

// node_modules/@mui/x-charts/esm/ResponsiveChartContainer/useChartContainerDimensions.js
var React50 = __toESM(require_react());
init_useEnhancedEffect();
init_ownerWindow();
var useChartContainerDimensions = (inWidth, inHeight) => {
  const rootRef = React50.useRef(null);
  const displayError = React50.useRef(false);
  const [width, setWidth] = React50.useState(0);
  const [height, setHeight] = React50.useState(0);
  const computeSize = React50.useCallback(() => {
    const mainEl = rootRef == null ? void 0 : rootRef.current;
    if (!mainEl) {
      return;
    }
    const win = ownerWindow(mainEl);
    const computedStyle = win.getComputedStyle(mainEl);
    const newHeight = Math.floor(parseFloat(computedStyle.height)) || 0;
    const newWidth = Math.floor(parseFloat(computedStyle.width)) || 0;
    setWidth(newWidth);
    setHeight(newHeight);
  }, []);
  React50.useEffect(() => {
    displayError.current = true;
  }, []);
  useEnhancedEffect_default(() => {
    if (inWidth !== void 0 && inHeight !== void 0) {
      return () => {
      };
    }
    computeSize();
    const elementToObserve = rootRef.current;
    if (typeof ResizeObserver === "undefined") {
      return () => {
      };
    }
    let animationFrame;
    const observer = new ResizeObserver(() => {
      animationFrame = requestAnimationFrame(() => {
        computeSize();
      });
    });
    if (elementToObserve) {
      observer.observe(elementToObserve);
    }
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, [computeSize, inHeight, inWidth]);
  if (true) {
    if (displayError.current && inWidth === void 0 && width === 0) {
      console.error(`MUI X Charts: ChartContainer does not have \`width\` prop, and its container has no \`width\` defined.`);
      displayError.current = false;
    }
    if (displayError.current && inHeight === void 0 && height === 0) {
      console.error(`MUI X Charts: ChartContainer does not have \`height\` prop, and its container has no \`height\` defined.`);
      displayError.current = false;
    }
  }
  return [rootRef, inWidth ?? width, inHeight ?? height];
};

// node_modules/@mui/x-charts/esm/ResponsiveChartContainer/ResponsiveChartContainer.js
var import_jsx_runtime37 = __toESM(require_jsx_runtime());
var _excluded14 = ["width", "height"];
var ResizableContainer = styled_default("div", {
  name: "MuiResponsiveChart",
  slot: "Container"
})(({
  ownerState
}) => ({
  width: ownerState.width ?? "100%",
  height: ownerState.height ?? "100%",
  display: "flex",
  position: "relative",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&>svg": {
    width: "100%",
    height: "100%"
  }
}));
var ResponsiveChartContainer = React51.forwardRef(function ResponsiveChartContainer2(props, ref) {
  const {
    width: inWidth,
    height: inHeight
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
  const [containerRef, width, height] = useChartContainerDimensions(inWidth, inHeight);
  return (0, import_jsx_runtime37.jsx)(ResizableContainer, {
    ref: containerRef,
    ownerState: {
      width: inWidth,
      height: inHeight
    },
    children: width && height ? (0, import_jsx_runtime37.jsx)(ChartContainer, _extends({}, other, {
      width,
      height,
      ref
    })) : null
  });
});
true ? ResponsiveChartContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types26.default.node,
  className: import_prop_types26.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types26.default.oneOfType([import_prop_types26.default.arrayOf(import_prop_types26.default.string), import_prop_types26.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types26.default.arrayOf(import_prop_types26.default.object),
  desc: import_prop_types26.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types26.default.bool,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types26.default.number,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types26.default.shape({
    bottom: import_prop_types26.default.number,
    left: import_prop_types26.default.number,
    right: import_prop_types26.default.number,
    top: import_prop_types26.default.number
  }),
  /**
   * The array of series to display.
   * Each type of series has its own specificity.
   * Please refer to the appropriate docs page to learn more about it.
   */
  series: import_prop_types26.default.arrayOf(import_prop_types26.default.object).isRequired,
  sx: import_prop_types26.default.oneOfType([import_prop_types26.default.arrayOf(import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object, import_prop_types26.default.bool])), import_prop_types26.default.func, import_prop_types26.default.object]),
  title: import_prop_types26.default.string,
  viewBox: import_prop_types26.default.shape({
    height: import_prop_types26.default.number,
    width: import_prop_types26.default.number,
    x: import_prop_types26.default.number,
    y: import_prop_types26.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types26.default.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types26.default.arrayOf(import_prop_types26.default.shape({
    axisId: import_prop_types26.default.oneOfType([import_prop_types26.default.number, import_prop_types26.default.string]),
    classes: import_prop_types26.default.object,
    colorMap: import_prop_types26.default.oneOfType([import_prop_types26.default.shape({
      colors: import_prop_types26.default.arrayOf(import_prop_types26.default.string).isRequired,
      type: import_prop_types26.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types26.default.string,
      values: import_prop_types26.default.arrayOf(import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number, import_prop_types26.default.string]).isRequired)
    }), import_prop_types26.default.shape({
      color: import_prop_types26.default.oneOfType([import_prop_types26.default.arrayOf(import_prop_types26.default.string.isRequired), import_prop_types26.default.func]).isRequired,
      max: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
      min: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
      type: import_prop_types26.default.oneOf(["continuous"]).isRequired
    }), import_prop_types26.default.shape({
      colors: import_prop_types26.default.arrayOf(import_prop_types26.default.string).isRequired,
      thresholds: import_prop_types26.default.arrayOf(import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]).isRequired).isRequired,
      type: import_prop_types26.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types26.default.array,
    dataKey: import_prop_types26.default.string,
    disableLine: import_prop_types26.default.bool,
    disableTicks: import_prop_types26.default.bool,
    fill: import_prop_types26.default.string,
    hideTooltip: import_prop_types26.default.bool,
    id: import_prop_types26.default.oneOfType([import_prop_types26.default.number, import_prop_types26.default.string]),
    label: import_prop_types26.default.string,
    labelFontSize: import_prop_types26.default.number,
    labelStyle: import_prop_types26.default.object,
    max: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
    min: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
    position: import_prop_types26.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types26.default.bool,
    scaleType: import_prop_types26.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types26.default.object,
    slots: import_prop_types26.default.object,
    stroke: import_prop_types26.default.string,
    tickFontSize: import_prop_types26.default.number,
    tickInterval: import_prop_types26.default.oneOfType([import_prop_types26.default.oneOf(["auto"]), import_prop_types26.default.array, import_prop_types26.default.func]),
    tickLabelInterval: import_prop_types26.default.oneOfType([import_prop_types26.default.oneOf(["auto"]), import_prop_types26.default.func]),
    tickLabelPlacement: import_prop_types26.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types26.default.object,
    tickMaxStep: import_prop_types26.default.number,
    tickMinStep: import_prop_types26.default.number,
    tickNumber: import_prop_types26.default.number,
    tickPlacement: import_prop_types26.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types26.default.number,
    valueFormatter: import_prop_types26.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types26.default.arrayOf(import_prop_types26.default.shape({
    axisId: import_prop_types26.default.oneOfType([import_prop_types26.default.number, import_prop_types26.default.string]),
    classes: import_prop_types26.default.object,
    colorMap: import_prop_types26.default.oneOfType([import_prop_types26.default.shape({
      colors: import_prop_types26.default.arrayOf(import_prop_types26.default.string).isRequired,
      type: import_prop_types26.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types26.default.string,
      values: import_prop_types26.default.arrayOf(import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number, import_prop_types26.default.string]).isRequired)
    }), import_prop_types26.default.shape({
      color: import_prop_types26.default.oneOfType([import_prop_types26.default.arrayOf(import_prop_types26.default.string.isRequired), import_prop_types26.default.func]).isRequired,
      max: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
      min: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
      type: import_prop_types26.default.oneOf(["continuous"]).isRequired
    }), import_prop_types26.default.shape({
      colors: import_prop_types26.default.arrayOf(import_prop_types26.default.string).isRequired,
      thresholds: import_prop_types26.default.arrayOf(import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]).isRequired).isRequired,
      type: import_prop_types26.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types26.default.array,
    dataKey: import_prop_types26.default.string,
    disableLine: import_prop_types26.default.bool,
    disableTicks: import_prop_types26.default.bool,
    fill: import_prop_types26.default.string,
    hideTooltip: import_prop_types26.default.bool,
    id: import_prop_types26.default.oneOfType([import_prop_types26.default.number, import_prop_types26.default.string]),
    label: import_prop_types26.default.string,
    labelFontSize: import_prop_types26.default.number,
    labelStyle: import_prop_types26.default.object,
    max: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
    min: import_prop_types26.default.oneOfType([import_prop_types26.default.instanceOf(Date), import_prop_types26.default.number]),
    position: import_prop_types26.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types26.default.bool,
    scaleType: import_prop_types26.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types26.default.object,
    slots: import_prop_types26.default.object,
    stroke: import_prop_types26.default.string,
    tickFontSize: import_prop_types26.default.number,
    tickInterval: import_prop_types26.default.oneOfType([import_prop_types26.default.oneOf(["auto"]), import_prop_types26.default.array, import_prop_types26.default.func]),
    tickLabelInterval: import_prop_types26.default.oneOfType([import_prop_types26.default.oneOf(["auto"]), import_prop_types26.default.func]),
    tickLabelPlacement: import_prop_types26.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types26.default.object,
    tickMaxStep: import_prop_types26.default.number,
    tickMinStep: import_prop_types26.default.number,
    tickNumber: import_prop_types26.default.number,
    tickPlacement: import_prop_types26.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types26.default.number,
    valueFormatter: import_prop_types26.default.func
  }))
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsOverlay.js
init_extends();
var React54 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsLoadingOverlay.js
init_objectWithoutPropertiesLoose();
init_extends();
var React52 = __toESM(require_react());
var import_jsx_runtime38 = __toESM(require_jsx_runtime());
var _excluded15 = ["message"];
var StyledText = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: theme.palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsLoadingOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  return (0, import_jsx_runtime38.jsx)(StyledText, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? "Loading data…"
  }));
}

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsNoDataOverlay.js
init_objectWithoutPropertiesLoose();
init_extends();
var React53 = __toESM(require_react());
var import_jsx_runtime39 = __toESM(require_jsx_runtime());
var _excluded16 = ["message"];
var StyledText2 = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: theme.palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsNoDataOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  return (0, import_jsx_runtime39.jsx)(StyledText2, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? "No data to display"
  }));
}

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsOverlay.js
var import_jsx_runtime40 = __toESM(require_jsx_runtime());
function useNoData() {
  const seriesPerType = useSeries();
  return Object.values(seriesPerType).every((seriesOfGivenType) => {
    if (!seriesOfGivenType) {
      return true;
    }
    const {
      series,
      seriesOrder
    } = seriesOfGivenType;
    return seriesOrder.every((seriesId) => series[seriesId].data.length === 0);
  });
}
function ChartsOverlay(props) {
  var _a, _b, _c, _d;
  const noData = useNoData();
  if (props.loading) {
    const LoadingOverlay = ((_a = props.slots) == null ? void 0 : _a.loadingOverlay) ?? ChartsLoadingOverlay;
    return (0, import_jsx_runtime40.jsx)(LoadingOverlay, _extends({}, (_b = props.slotProps) == null ? void 0 : _b.loadingOverlay));
  }
  if (noData) {
    const NoDataOverlay = ((_c = props.slots) == null ? void 0 : _c.noDataOverlay) ?? ChartsNoDataOverlay;
    return (0, import_jsx_runtime40.jsx)(NoDataOverlay, _extends({}, (_d = props.slotProps) == null ? void 0 : _d.noDataOverlay));
  }
  return null;
}

// node_modules/@mui/x-charts/esm/BarChart/BarChart.js
var import_jsx_runtime41 = __toESM(require_jsx_runtime());
var BarChart = React55.forwardRef(function BarChart2(props, ref) {
  const {
    xAxis,
    yAxis,
    series,
    width,
    height,
    margin,
    colors: colors3,
    dataset,
    sx,
    layout,
    tooltip,
    axisHighlight,
    legend,
    grid,
    topAxis,
    leftAxis,
    rightAxis,
    bottomAxis,
    skipAnimation: skipAnimation2,
    borderRadius,
    onItemClick,
    onAxisClick,
    children,
    slots,
    slotProps,
    loading,
    barLabel
  } = props;
  const id = useId();
  const clipPathId = `${id}-clip-path`;
  const hasHorizontalSeries = layout === "horizontal" || layout === void 0 && series.some((item) => item.layout === "horizontal");
  const defaultAxisConfig = {
    scaleType: "band",
    data: Array.from({
      length: Math.max(...series.map((s2) => (s2.data ?? dataset ?? []).length))
    }, (_, index2) => index2)
  };
  const defaultizedAxisHighlight = _extends({}, hasHorizontalSeries ? {
    y: "band"
  } : {
    x: "band"
  }, axisHighlight);
  return (0, import_jsx_runtime41.jsxs)(ResponsiveChartContainer, {
    ref,
    series: series.map((s2) => _extends({
      type: "bar"
    }, s2, {
      layout: hasHorizontalSeries ? "horizontal" : "vertical"
    })),
    width,
    height,
    margin,
    xAxis: xAxis ?? (hasHorizontalSeries ? void 0 : [_extends({
      id: DEFAULT_X_AXIS_KEY
    }, defaultAxisConfig)]),
    yAxis: yAxis ?? (hasHorizontalSeries ? [_extends({
      id: DEFAULT_Y_AXIS_KEY
    }, defaultAxisConfig)] : void 0),
    colors: colors3,
    dataset,
    sx,
    disableAxisListener: (tooltip == null ? void 0 : tooltip.trigger) !== "axis" && (axisHighlight == null ? void 0 : axisHighlight.x) === "none" && (axisHighlight == null ? void 0 : axisHighlight.y) === "none" && !onAxisClick,
    children: [onAxisClick && (0, import_jsx_runtime41.jsx)(ChartsOnAxisClickHandler, {
      onAxisClick
    }), grid && (0, import_jsx_runtime41.jsx)(ChartsGrid, {
      vertical: grid.vertical,
      horizontal: grid.horizontal
    }), (0, import_jsx_runtime41.jsxs)("g", {
      clipPath: `url(#${clipPathId})`,
      children: [(0, import_jsx_runtime41.jsx)(BarPlot, {
        slots,
        slotProps,
        skipAnimation: skipAnimation2,
        onItemClick,
        borderRadius,
        barLabel
      }), (0, import_jsx_runtime41.jsx)(ChartsOverlay, {
        loading,
        slots,
        slotProps
      })]
    }), (0, import_jsx_runtime41.jsx)(ChartsAxis, {
      topAxis,
      leftAxis,
      rightAxis,
      bottomAxis,
      slots,
      slotProps
    }), (0, import_jsx_runtime41.jsx)(ChartsLegend, _extends({}, legend, {
      slots,
      slotProps
    })), (0, import_jsx_runtime41.jsx)(ChartsAxisHighlight, _extends({}, defaultizedAxisHighlight)), !loading && (0, import_jsx_runtime41.jsx)(ChartsTooltip, _extends({}, tooltip, {
      slots,
      slotProps
    })), (0, import_jsx_runtime41.jsx)(ChartsClipPath, {
      id: clipPathId
    }), children]
  });
});
true ? BarChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The configuration of axes highlight.
   * Default is set to 'band' in the bar direction.
   * Depends on `layout` prop.
   * @see See {@link https://mui.com/x/react-charts/tooltip/#highlights highlight docs} for more details.
   */
  axisHighlight: import_prop_types27.default.shape({
    x: import_prop_types27.default.oneOf(["band", "line", "none"]),
    y: import_prop_types27.default.oneOf(["band", "line", "none"])
  }),
  /**
   * If provided, the function will be used to format the label of the bar.
   * It can be set to 'value' to display the current value.
   * @param {BarItem} item The item to format.
   * @param {BarLabelContext} context data about the bar.
   * @returns {string} The formatted label.
   */
  barLabel: import_prop_types27.default.oneOfType([import_prop_types27.default.oneOf(["value"]), import_prop_types27.default.func]),
  /**
   * Defines the border radius of the bar element.
   */
  borderRadius: import_prop_types27.default.number,
  /**
   * Indicate which axis to display the bottom of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default xAxisIds[0] The id of the first provided axis
   */
  bottomAxis: import_prop_types27.default.oneOfType([import_prop_types27.default.object, import_prop_types27.default.string]),
  children: import_prop_types27.default.node,
  className: import_prop_types27.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types27.default.oneOfType([import_prop_types27.default.arrayOf(import_prop_types27.default.string), import_prop_types27.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types27.default.arrayOf(import_prop_types27.default.object),
  desc: import_prop_types27.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types27.default.bool,
  /**
   * Option to display a cartesian grid in the background.
   */
  grid: import_prop_types27.default.shape({
    horizontal: import_prop_types27.default.bool,
    vertical: import_prop_types27.default.bool
  }),
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types27.default.number,
  /**
   * The direction of the bar elements.
   * @default 'vertical'
   */
  layout: import_prop_types27.default.oneOf(["horizontal", "vertical"]),
  /**
   * Indicate which axis to display the left of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default yAxisIds[0] The id of the first provided axis
   */
  leftAxis: import_prop_types27.default.oneOfType([import_prop_types27.default.object, import_prop_types27.default.string]),
  /**
   * @deprecated Consider using `slotProps.legend` instead.
   */
  legend: import_prop_types27.default.shape({
    classes: import_prop_types27.default.object,
    direction: import_prop_types27.default.oneOf(["column", "row"]),
    hidden: import_prop_types27.default.bool,
    position: import_prop_types27.default.shape({
      horizontal: import_prop_types27.default.oneOf(["left", "middle", "right"]).isRequired,
      vertical: import_prop_types27.default.oneOf(["bottom", "middle", "top"]).isRequired
    }),
    slotProps: import_prop_types27.default.object,
    slots: import_prop_types27.default.object
  }),
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: import_prop_types27.default.bool,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types27.default.shape({
    bottom: import_prop_types27.default.number,
    left: import_prop_types27.default.number,
    right: import_prop_types27.default.number,
    top: import_prop_types27.default.number
  }),
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | AxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: import_prop_types27.default.func,
  /**
   * Callback fired when a bar item is clicked.
   * @param {React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
   * @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
   */
  onItemClick: import_prop_types27.default.func,
  /**
   * Indicate which axis to display the right of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  rightAxis: import_prop_types27.default.oneOfType([import_prop_types27.default.object, import_prop_types27.default.string]),
  /**
   * The series to display in the bar chart.
   * An array of [[BarSeriesType]] objects.
   */
  series: import_prop_types27.default.arrayOf(import_prop_types27.default.object).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types27.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types27.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types27.default.object,
  sx: import_prop_types27.default.oneOfType([import_prop_types27.default.arrayOf(import_prop_types27.default.oneOfType([import_prop_types27.default.func, import_prop_types27.default.object, import_prop_types27.default.bool])), import_prop_types27.default.func, import_prop_types27.default.object]),
  title: import_prop_types27.default.string,
  /**
   * The configuration of the tooltip.
   * @see See {@link https://mui.com/x/react-charts/tooltip/ tooltip docs} for more details.
   */
  tooltip: import_prop_types27.default.shape({
    axisContent: import_prop_types27.default.elementType,
    classes: import_prop_types27.default.object,
    itemContent: import_prop_types27.default.elementType,
    slotProps: import_prop_types27.default.object,
    slots: import_prop_types27.default.object,
    trigger: import_prop_types27.default.oneOf(["axis", "item", "none"])
  }),
  /**
   * Indicate which axis to display the top of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  topAxis: import_prop_types27.default.oneOfType([import_prop_types27.default.object, import_prop_types27.default.string]),
  viewBox: import_prop_types27.default.shape({
    height: import_prop_types27.default.number,
    width: import_prop_types27.default.number,
    x: import_prop_types27.default.number,
    y: import_prop_types27.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types27.default.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types27.default.arrayOf(import_prop_types27.default.shape({
    axisId: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string]),
    classes: import_prop_types27.default.object,
    colorMap: import_prop_types27.default.oneOfType([import_prop_types27.default.shape({
      colors: import_prop_types27.default.arrayOf(import_prop_types27.default.string).isRequired,
      type: import_prop_types27.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types27.default.string,
      values: import_prop_types27.default.arrayOf(import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number, import_prop_types27.default.string]).isRequired)
    }), import_prop_types27.default.shape({
      color: import_prop_types27.default.oneOfType([import_prop_types27.default.arrayOf(import_prop_types27.default.string.isRequired), import_prop_types27.default.func]).isRequired,
      max: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
      min: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
      type: import_prop_types27.default.oneOf(["continuous"]).isRequired
    }), import_prop_types27.default.shape({
      colors: import_prop_types27.default.arrayOf(import_prop_types27.default.string).isRequired,
      thresholds: import_prop_types27.default.arrayOf(import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]).isRequired).isRequired,
      type: import_prop_types27.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types27.default.array,
    dataKey: import_prop_types27.default.string,
    disableLine: import_prop_types27.default.bool,
    disableTicks: import_prop_types27.default.bool,
    fill: import_prop_types27.default.string,
    hideTooltip: import_prop_types27.default.bool,
    id: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string]),
    label: import_prop_types27.default.string,
    labelFontSize: import_prop_types27.default.number,
    labelStyle: import_prop_types27.default.object,
    max: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
    min: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
    position: import_prop_types27.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types27.default.bool,
    scaleType: import_prop_types27.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types27.default.object,
    slots: import_prop_types27.default.object,
    stroke: import_prop_types27.default.string,
    tickFontSize: import_prop_types27.default.number,
    tickInterval: import_prop_types27.default.oneOfType([import_prop_types27.default.oneOf(["auto"]), import_prop_types27.default.array, import_prop_types27.default.func]),
    tickLabelInterval: import_prop_types27.default.oneOfType([import_prop_types27.default.oneOf(["auto"]), import_prop_types27.default.func]),
    tickLabelPlacement: import_prop_types27.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types27.default.object,
    tickMaxStep: import_prop_types27.default.number,
    tickMinStep: import_prop_types27.default.number,
    tickNumber: import_prop_types27.default.number,
    tickPlacement: import_prop_types27.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types27.default.number,
    valueFormatter: import_prop_types27.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types27.default.arrayOf(import_prop_types27.default.shape({
    axisId: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string]),
    classes: import_prop_types27.default.object,
    colorMap: import_prop_types27.default.oneOfType([import_prop_types27.default.shape({
      colors: import_prop_types27.default.arrayOf(import_prop_types27.default.string).isRequired,
      type: import_prop_types27.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types27.default.string,
      values: import_prop_types27.default.arrayOf(import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number, import_prop_types27.default.string]).isRequired)
    }), import_prop_types27.default.shape({
      color: import_prop_types27.default.oneOfType([import_prop_types27.default.arrayOf(import_prop_types27.default.string.isRequired), import_prop_types27.default.func]).isRequired,
      max: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
      min: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
      type: import_prop_types27.default.oneOf(["continuous"]).isRequired
    }), import_prop_types27.default.shape({
      colors: import_prop_types27.default.arrayOf(import_prop_types27.default.string).isRequired,
      thresholds: import_prop_types27.default.arrayOf(import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]).isRequired).isRequired,
      type: import_prop_types27.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types27.default.array,
    dataKey: import_prop_types27.default.string,
    disableLine: import_prop_types27.default.bool,
    disableTicks: import_prop_types27.default.bool,
    fill: import_prop_types27.default.string,
    hideTooltip: import_prop_types27.default.bool,
    id: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string]),
    label: import_prop_types27.default.string,
    labelFontSize: import_prop_types27.default.number,
    labelStyle: import_prop_types27.default.object,
    max: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
    min: import_prop_types27.default.oneOfType([import_prop_types27.default.instanceOf(Date), import_prop_types27.default.number]),
    position: import_prop_types27.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types27.default.bool,
    scaleType: import_prop_types27.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types27.default.object,
    slots: import_prop_types27.default.object,
    stroke: import_prop_types27.default.string,
    tickFontSize: import_prop_types27.default.number,
    tickInterval: import_prop_types27.default.oneOfType([import_prop_types27.default.oneOf(["auto"]), import_prop_types27.default.array, import_prop_types27.default.func]),
    tickLabelInterval: import_prop_types27.default.oneOfType([import_prop_types27.default.oneOf(["auto"]), import_prop_types27.default.func]),
    tickLabelPlacement: import_prop_types27.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types27.default.object,
    tickMaxStep: import_prop_types27.default.number,
    tickMinStep: import_prop_types27.default.number,
    tickNumber: import_prop_types27.default.number,
    tickPlacement: import_prop_types27.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types27.default.number,
    valueFormatter: import_prop_types27.default.func
  }))
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineChart.js
init_extends();
var React67 = __toESM(require_react());
init_useId();
var import_prop_types38 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/LineChart/AreaPlot.js
init_objectWithoutPropertiesLoose();
init_extends();
var React59 = __toESM(require_react());
var import_prop_types30 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/LineChart/AreaElement.js
init_extends();
init_objectWithoutPropertiesLoose();
var React58 = __toESM(require_react());
var import_prop_types29 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();

// node_modules/@mui/x-charts/esm/LineChart/AnimatedArea.js
init_extends();
init_objectWithoutPropertiesLoose();
var React57 = __toESM(require_react());
var import_prop_types28 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/internals/useAnimatedPath.js
var React56 = __toESM(require_react());
function usePrevious(value) {
  const ref = React56.useRef(null);
  React56.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var useAnimatedPath = (path2, skipAnimation2) => {
  const previousPath = usePrevious(path2);
  const interpolator = React56.useMemo(() => previousPath ? string_default(previousPath, path2) : () => path2, [previousPath, path2]);
  const {
    value
  } = useSpring({
    from: {
      value: 0
    },
    to: {
      value: 1
    },
    reset: true,
    immediate: skipAnimation2
  });
  return to2([value], interpolator);
};

// node_modules/@mui/x-charts/esm/LineChart/AnimatedArea.js
var import_jsx_runtime42 = __toESM(require_jsx_runtime());
var _excluded17 = ["d", "skipAnimation", "ownerState"];
var AreaElementPath = styled_default(animated.path, {
  name: "MuiAreaElement",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  stroke: "none",
  fill: ownerState.gradientId && `url(#${ownerState.gradientId})` || ownerState.isHighlighted && color(ownerState.color).brighter(1).formatHex() || color(ownerState.color).brighter(0.5).formatHex(),
  transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
  opacity: ownerState.isFaded ? 0.3 : 1
}));
function AnimatedArea(props) {
  const {
    d,
    skipAnimation: skipAnimation2,
    ownerState
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded17);
  const {
    left,
    top,
    right,
    bottom,
    width,
    height
  } = useDrawingArea();
  const chartId = useChartId();
  const path2 = useAnimatedPath(d, skipAnimation2);
  const {
    animatedWidth
  } = useSpring({
    from: {
      animatedWidth: left
    },
    to: {
      animatedWidth: width + left + right
    },
    reset: false,
    immediate: skipAnimation2
  });
  const clipId = cleanId(`${chartId}-${ownerState.id}-area-clip`);
  return (0, import_jsx_runtime42.jsxs)(React57.Fragment, {
    children: [(0, import_jsx_runtime42.jsx)("clipPath", {
      id: clipId,
      children: (0, import_jsx_runtime42.jsx)(animated.rect, {
        x: 0,
        y: 0,
        width: animatedWidth,
        height: top + height + bottom
      })
    }), (0, import_jsx_runtime42.jsx)("g", {
      clipPath: `url(#${clipId})`,
      children: (0, import_jsx_runtime42.jsx)(AreaElementPath, _extends({}, other, {
        ownerState,
        d: path2
      }))
    })]
  });
}
true ? AnimatedArea.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  d: import_prop_types28.default.string.isRequired,
  ownerState: import_prop_types28.default.shape({
    classes: import_prop_types28.default.object,
    color: import_prop_types28.default.string.isRequired,
    gradientId: import_prop_types28.default.string,
    id: import_prop_types28.default.oneOfType([import_prop_types28.default.number, import_prop_types28.default.string]).isRequired,
    isFaded: import_prop_types28.default.bool.isRequired,
    isHighlighted: import_prop_types28.default.bool.isRequired
  }).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types28.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/AreaElement.js
var import_jsx_runtime43 = __toESM(require_jsx_runtime());
var _excluded18 = ["id", "classes", "color", "gradientId", "highlightScope", "slots", "slotProps", "onClick"];
function getAreaElementUtilityClass(slot) {
  return generateUtilityClass("MuiAreaElement", slot);
}
var areaElementClasses = generateUtilityClasses("MuiAreaElement", ["root", "highlighted", "faded"]);
var useUtilityClasses9 = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getAreaElementUtilityClass, classes);
};
function AreaElement(props) {
  const {
    id,
    classes: innerClasses,
    color: color2,
    gradientId,
    highlightScope,
    slots,
    slotProps,
    onClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded18);
  const getInteractionItemProps = useInteractionItemProps(highlightScope);
  const {
    item
  } = React58.useContext(InteractionContext);
  const isHighlighted = getIsHighlighted(item, {
    type: "line",
    seriesId: id
  }, highlightScope);
  const isFaded = !isHighlighted && getIsFaded(item, {
    type: "line",
    seriesId: id
  }, highlightScope);
  const ownerState = {
    id,
    classes: innerClasses,
    color: color2,
    gradientId,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses9(ownerState);
  const Area = (slots == null ? void 0 : slots.area) ?? AnimatedArea;
  const areaProps = useSlotProps({
    elementType: Area,
    externalSlotProps: slotProps == null ? void 0 : slotProps.area,
    additionalProps: _extends({}, getInteractionItemProps({
      type: "line",
      seriesId: id
    }), {
      onClick,
      cursor: onClick ? "pointer" : "unset"
    }),
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime43.jsx)(Area, _extends({}, other, areaProps));
}
true ? AreaElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types29.default.object,
  color: import_prop_types29.default.string.isRequired,
  d: import_prop_types29.default.string.isRequired,
  gradientId: import_prop_types29.default.string,
  highlightScope: import_prop_types29.default.shape({
    faded: import_prop_types29.default.oneOf(["global", "none", "series"]),
    highlighted: import_prop_types29.default.oneOf(["item", "none", "series"])
  }),
  id: import_prop_types29.default.oneOfType([import_prop_types29.default.number, import_prop_types29.default.string]).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types29.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types29.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types29.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/internals/getCurve.js
function getCurveFactory(curveType) {
  switch (curveType) {
    case "catmullRom": {
      return catmullRom_default.alpha(0.5);
    }
    case "linear": {
      return linear_default;
    }
    case "monotoneX": {
      return monotoneX;
    }
    case "monotoneY": {
      return monotoneY;
    }
    case "natural": {
      return natural_default;
    }
    case "step": {
      return step_default;
    }
    case "stepBefore": {
      return stepBefore;
    }
    case "stepAfter": {
      return stepAfter;
    }
    default:
      return monotoneX;
  }
}

// node_modules/@mui/x-charts/esm/LineChart/AreaPlot.js
var import_jsx_runtime44 = __toESM(require_jsx_runtime());
var _excluded19 = ["slots", "slotProps", "onItemClick", "skipAnimation"];
var useAggregatedData2 = () => {
  const seriesData = React59.useContext(SeriesContext).line;
  const axisData = React59.useContext(CartesianContext);
  if (seriesData === void 0) {
    return [];
  }
  const {
    series,
    stackingGroups
  } = seriesData;
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = axisData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  return stackingGroups.flatMap(({
    ids: groupIds
  }) => {
    return [...groupIds].reverse().map((seriesId) => {
      const {
        xAxisKey = defaultXAxisId,
        yAxisKey = defaultYAxisId,
        stackedData,
        data,
        connectNulls
      } = series[seriesId];
      const xScale = getValueToPositionMapper(xAxis[xAxisKey].scale);
      const yScale = yAxis[yAxisKey].scale;
      const xData = xAxis[xAxisKey].data;
      const gradientUsed = yAxis[yAxisKey].colorScale && [yAxisKey, "y"] || xAxis[xAxisKey].colorScale && [xAxisKey, "x"] || void 0;
      if (true) {
        if (xData === void 0) {
          throw new Error(`MUI X Charts: ${xAxisKey === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisKey}"`} should have data property to be able to display a line plot.`);
        }
        if (xData.length < stackedData.length) {
          throw new Error(`MUI X Charts: The data length of the x axis (${xData.length} items) is lower than the length of series (${stackedData.length} items).`);
        }
      }
      const areaPath = area_default().x((d2) => xScale(d2.x)).defined((_, i) => connectNulls || data[i] != null).y0((d2) => d2.y && yScale(d2.y[0])).y1((d2) => d2.y && yScale(d2.y[1]));
      const curve = getCurveFactory(series[seriesId].curve);
      const formattedData = (xData == null ? void 0 : xData.map((x2, index2) => ({
        x: x2,
        y: stackedData[index2]
      }))) ?? [];
      const d3Data = connectNulls ? formattedData.filter((_, i) => data[i] != null) : formattedData;
      const d = areaPath.curve(curve)(d3Data) || "";
      return _extends({}, series[seriesId], {
        gradientUsed,
        d,
        seriesId
      });
    });
  });
};
function AreaPlot(props) {
  const {
    slots,
    slotProps,
    onItemClick,
    skipAnimation: skipAnimation2
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
  const getGradientId = useChartGradient();
  const completedData = useAggregatedData2();
  return (0, import_jsx_runtime44.jsx)("g", _extends({}, other, {
    children: completedData.map(({
      d,
      seriesId,
      color: color2,
      highlightScope,
      area,
      gradientUsed
    }) => !!area && (0, import_jsx_runtime44.jsx)(AreaElement, {
      id: seriesId,
      d,
      color: color2,
      gradientId: gradientUsed && getGradientId(...gradientUsed),
      highlightScope,
      slots,
      slotProps,
      onClick: onItemClick && ((event) => onItemClick(event, {
        type: "line",
        seriesId
      })),
      skipAnimation: skipAnimation2
    }, seriesId))
  }));
}
true ? AreaPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line area item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
   */
  onItemClick: import_prop_types30.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types30.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types30.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types30.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LinePlot.js
init_objectWithoutPropertiesLoose();
init_extends();
var React62 = __toESM(require_react());
var import_prop_types33 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/LineChart/LineElement.js
init_extends();
init_objectWithoutPropertiesLoose();
var React61 = __toESM(require_react());
var import_prop_types32 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();

// node_modules/@mui/x-charts/esm/LineChart/AnimatedLine.js
init_extends();
init_objectWithoutPropertiesLoose();
var React60 = __toESM(require_react());
var import_prop_types31 = __toESM(require_prop_types());
var import_jsx_runtime45 = __toESM(require_jsx_runtime());
var _excluded20 = ["d", "skipAnimation", "ownerState"];
var LineElementPath = styled_default(animated.path, {
  name: "MuiLineElement",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  strokeWidth: 2,
  strokeLinejoin: "round",
  fill: "none",
  stroke: ownerState.gradientId && `url(#${ownerState.gradientId})` || ownerState.isHighlighted && color(ownerState.color).brighter(0.5).formatHex() || ownerState.color,
  transition: "opacity 0.2s ease-in, stroke 0.2s ease-in",
  opacity: ownerState.isFaded ? 0.3 : 1
}));
function AnimatedLine(props) {
  const {
    d,
    skipAnimation: skipAnimation2,
    ownerState
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
  const {
    left,
    top,
    bottom,
    width,
    height,
    right
  } = useDrawingArea();
  const chartId = useChartId();
  const path2 = useAnimatedPath(d, skipAnimation2);
  const {
    animatedWidth
  } = useSpring({
    from: {
      animatedWidth: left
    },
    to: {
      animatedWidth: width + left + right
    },
    reset: false,
    immediate: skipAnimation2
  });
  const clipId = cleanId(`${chartId}-${ownerState.id}-line-clip`);
  return (0, import_jsx_runtime45.jsxs)(React60.Fragment, {
    children: [(0, import_jsx_runtime45.jsx)("clipPath", {
      id: clipId,
      children: (0, import_jsx_runtime45.jsx)(animated.rect, {
        x: 0,
        y: 0,
        width: animatedWidth,
        height: top + height + bottom
      })
    }), (0, import_jsx_runtime45.jsx)("g", {
      clipPath: `url(#${clipId})`,
      children: (0, import_jsx_runtime45.jsx)(LineElementPath, _extends({}, other, {
        ownerState,
        d: path2
      }))
    })]
  });
}
true ? AnimatedLine.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  d: import_prop_types31.default.string.isRequired,
  ownerState: import_prop_types31.default.shape({
    classes: import_prop_types31.default.object,
    color: import_prop_types31.default.string.isRequired,
    gradientId: import_prop_types31.default.string,
    id: import_prop_types31.default.oneOfType([import_prop_types31.default.number, import_prop_types31.default.string]).isRequired,
    isFaded: import_prop_types31.default.bool.isRequired,
    isHighlighted: import_prop_types31.default.bool.isRequired
  }).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types31.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineElement.js
var import_jsx_runtime46 = __toESM(require_jsx_runtime());
var _excluded21 = ["id", "classes", "color", "gradientId", "highlightScope", "slots", "slotProps", "onClick"];
function getLineElementUtilityClass(slot) {
  return generateUtilityClass("MuiLineElement", slot);
}
var lineElementClasses = generateUtilityClasses("MuiLineElement", ["root", "highlighted", "faded"]);
var useUtilityClasses10 = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getLineElementUtilityClass, classes);
};
function LineElement(props) {
  const {
    id,
    classes: innerClasses,
    color: color2,
    gradientId,
    highlightScope,
    slots,
    slotProps,
    onClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
  const getInteractionItemProps = useInteractionItemProps(highlightScope);
  const {
    item
  } = React61.useContext(InteractionContext);
  const isHighlighted = getIsHighlighted(item, {
    type: "line",
    seriesId: id
  }, highlightScope);
  const isFaded = !isHighlighted && getIsFaded(item, {
    type: "line",
    seriesId: id
  }, highlightScope);
  const ownerState = {
    id,
    classes: innerClasses,
    color: color2,
    gradientId,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses10(ownerState);
  const Line = (slots == null ? void 0 : slots.line) ?? AnimatedLine;
  const lineProps = useSlotProps({
    elementType: Line,
    externalSlotProps: slotProps == null ? void 0 : slotProps.line,
    additionalProps: _extends({}, getInteractionItemProps({
      type: "line",
      seriesId: id
    }), {
      onClick,
      cursor: onClick ? "pointer" : "unset"
    }),
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime46.jsx)(Line, _extends({}, other, lineProps));
}
true ? LineElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types32.default.object,
  color: import_prop_types32.default.string.isRequired,
  d: import_prop_types32.default.string.isRequired,
  gradientId: import_prop_types32.default.string,
  highlightScope: import_prop_types32.default.shape({
    faded: import_prop_types32.default.oneOf(["global", "none", "series"]),
    highlighted: import_prop_types32.default.oneOf(["item", "none", "series"])
  }),
  id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types32.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types32.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types32.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LinePlot.js
var import_jsx_runtime47 = __toESM(require_jsx_runtime());
var _excluded24 = ["slots", "slotProps", "skipAnimation", "onItemClick"];
var useAggregatedData3 = () => {
  const seriesData = React62.useContext(SeriesContext).line;
  const axisData = React62.useContext(CartesianContext);
  if (seriesData === void 0) {
    return [];
  }
  const {
    series,
    stackingGroups
  } = seriesData;
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = axisData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  return stackingGroups.flatMap(({
    ids: groupIds
  }) => {
    return groupIds.flatMap((seriesId) => {
      const {
        xAxisKey = defaultXAxisId,
        yAxisKey = defaultYAxisId,
        stackedData,
        data,
        connectNulls
      } = series[seriesId];
      const xScale = getValueToPositionMapper(xAxis[xAxisKey].scale);
      const yScale = yAxis[yAxisKey].scale;
      const xData = xAxis[xAxisKey].data;
      const gradientUsed = yAxis[yAxisKey].colorScale && [yAxisKey, "y"] || xAxis[xAxisKey].colorScale && [xAxisKey, "x"] || void 0;
      if (true) {
        if (xData === void 0) {
          throw new Error(`MUI X Charts: ${xAxisKey === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisKey}"`} should have data property to be able to display a line plot.`);
        }
        if (xData.length < stackedData.length) {
          throw new Error(`MUI X Charts: The data length of the x axis (${xData.length} items) is lower than the length of series (${stackedData.length} items).`);
        }
      }
      const linePath = line_default().x((d2) => xScale(d2.x)).defined((_, i) => connectNulls || data[i] != null).y((d2) => yScale(d2.y[1]));
      const formattedData = (xData == null ? void 0 : xData.map((x2, index2) => ({
        x: x2,
        y: stackedData[index2]
      }))) ?? [];
      const d3Data = connectNulls ? formattedData.filter((_, i) => data[i] != null) : formattedData;
      const d = linePath.curve(getCurveFactory(series[seriesId].curve))(d3Data) || "";
      return _extends({}, series[seriesId], {
        gradientUsed,
        d,
        seriesId
      });
    });
  });
};
function LinePlot(props) {
  const {
    slots,
    slotProps,
    skipAnimation: skipAnimation2,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded24);
  const getGradientId = useChartGradient();
  const completedData = useAggregatedData3();
  return (0, import_jsx_runtime47.jsx)("g", _extends({}, other, {
    children: completedData.map(({
      d,
      seriesId,
      color: color2,
      highlightScope,
      gradientUsed
    }) => {
      return (0, import_jsx_runtime47.jsx)(LineElement, {
        id: seriesId,
        d,
        color: color2,
        gradientId: gradientUsed && getGradientId(...gradientUsed),
        highlightScope,
        skipAnimation: skipAnimation2,
        slots,
        slotProps,
        onClick: onItemClick && ((event) => onItemClick(event, {
          type: "line",
          seriesId
        }))
      }, seriesId);
    })
  }));
}
true ? LinePlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
   */
  onItemClick: import_prop_types33.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types33.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types33.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types33.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/MarkPlot.js
init_extends();
init_objectWithoutPropertiesLoose();
var React64 = __toESM(require_react());
var import_prop_types35 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/LineChart/MarkElement.js
init_extends();
init_objectWithoutPropertiesLoose();
var React63 = __toESM(require_react());
var import_prop_types34 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();
var import_jsx_runtime48 = __toESM(require_jsx_runtime());
var _excluded25 = ["x", "y", "id", "classes", "color", "shape", "dataIndex", "highlightScope", "onClick", "skipAnimation"];
function getMarkElementUtilityClass(slot) {
  return generateUtilityClass("MuiMarkElement", slot);
}
var markElementClasses = generateUtilityClasses("MuiMarkElement", ["root", "highlighted", "faded"]);
var useUtilityClasses11 = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getMarkElementUtilityClass, classes);
};
var MarkElementPath = styled_default(animated.path, {
  name: "MuiMarkElement",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState,
  theme
}) => ({
  fill: (theme.vars || theme).palette.background.paper,
  stroke: ownerState.color,
  strokeWidth: 2
}));
function MarkElement(props) {
  var _a;
  const {
    x: x2,
    y: y2,
    id,
    classes: innerClasses,
    color: color2,
    shape,
    dataIndex,
    highlightScope,
    onClick,
    skipAnimation: skipAnimation2
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded25);
  const getInteractionItemProps = useInteractionItemProps(highlightScope);
  const {
    item,
    axis
  } = React63.useContext(InteractionContext);
  const isHighlighted = ((_a = axis.x) == null ? void 0 : _a.index) === dataIndex || getIsHighlighted(item, {
    type: "line",
    seriesId: id
  }, highlightScope);
  const isFaded = !isHighlighted && getIsFaded(item, {
    type: "line",
    seriesId: id
  }, highlightScope);
  const position = useSpring({
    x: x2,
    y: y2,
    immediate: skipAnimation2
  });
  const ownerState = {
    id,
    classes: innerClasses,
    isHighlighted,
    isFaded,
    color: color2
  };
  const classes = useUtilityClasses11(ownerState);
  return (0, import_jsx_runtime48.jsx)(MarkElementPath, _extends({}, other, {
    style: {
      transform: to2([position.x, position.y], (pX, pY) => `translate(${pX}px, ${pY}px)`),
      transformOrigin: to2([position.x, position.y], (pX, pY) => `${pX}px ${pY}px`)
    },
    ownerState,
    className: classes.root,
    d: Symbol2(symbolsFill[getSymbol(shape)])(),
    onClick,
    cursor: onClick ? "pointer" : "unset"
  }, getInteractionItemProps({
    type: "line",
    seriesId: id,
    dataIndex
  })));
}
true ? MarkElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types34.default.object,
  /**
   * The index to the element in the series' data array.
   */
  dataIndex: import_prop_types34.default.number.isRequired,
  highlightScope: import_prop_types34.default.shape({
    faded: import_prop_types34.default.oneOf(["global", "none", "series"]),
    highlighted: import_prop_types34.default.oneOf(["item", "none", "series"])
  }),
  id: import_prop_types34.default.oneOfType([import_prop_types34.default.number, import_prop_types34.default.string]).isRequired,
  /**
   * The shape of the marker.
   */
  shape: import_prop_types34.default.oneOf(["circle", "cross", "diamond", "square", "star", "triangle", "wye"]).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types34.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/MarkPlot.js
var import_jsx_runtime49 = __toESM(require_jsx_runtime());
var _excluded26 = ["slots", "slotProps", "skipAnimation", "onItemClick"];
function MarkPlot(props) {
  const {
    slots,
    slotProps,
    skipAnimation: skipAnimation2,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded26);
  const seriesData = React64.useContext(SeriesContext).line;
  const axisData = React64.useContext(CartesianContext);
  const chartId = useChartId();
  const Mark = (slots == null ? void 0 : slots.mark) ?? MarkElement;
  if (seriesData === void 0) {
    return null;
  }
  const {
    series,
    stackingGroups
  } = seriesData;
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = axisData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  return (0, import_jsx_runtime49.jsx)("g", _extends({}, other, {
    children: stackingGroups.flatMap(({
      ids: groupIds
    }) => {
      return groupIds.map((seriesId) => {
        const {
          xAxisKey = defaultXAxisId,
          yAxisKey = defaultYAxisId,
          stackedData,
          data,
          showMark = true
        } = series[seriesId];
        if (showMark === false) {
          return null;
        }
        const xScale = getValueToPositionMapper(xAxis[xAxisKey].scale);
        const yScale = yAxis[yAxisKey].scale;
        const xData = xAxis[xAxisKey].data;
        const xRange = xAxis[xAxisKey].scale.range();
        const yRange = yScale.range();
        const isInRange = ({
          x: x2,
          y: y2
        }) => {
          if (x2 < Math.min(...xRange) || x2 > Math.max(...xRange)) {
            return false;
          }
          if (y2 < Math.min(...yRange) || y2 > Math.max(...yRange)) {
            return false;
          }
          return true;
        };
        if (xData === void 0) {
          throw new Error(`MUI X Charts: ${xAxisKey === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisKey}"`} should have data property to be able to display a line plot.`);
        }
        const clipId = cleanId(`${chartId}-${seriesId}-line-clip`);
        const colorGetter = getColor2(series[seriesId], xAxis[xAxisKey], yAxis[yAxisKey]);
        return (0, import_jsx_runtime49.jsx)("g", {
          clipPath: `url(#${clipId})`,
          children: xData == null ? void 0 : xData.map((x2, index2) => {
            const value = data[index2] == null ? null : stackedData[index2][1];
            return {
              x: xScale(x2),
              y: value === null ? null : yScale(value),
              position: x2,
              value,
              index: index2
            };
          }).filter(({
            x: x2,
            y: y2,
            index: index2,
            position,
            value
          }) => {
            if (value === null || y2 === null) {
              return false;
            }
            if (!isInRange({
              x: x2,
              y: y2
            })) {
              return false;
            }
            if (showMark === true) {
              return true;
            }
            return showMark({
              x: x2,
              y: y2,
              index: index2,
              position,
              value
            });
          }).map(({
            x: x2,
            y: y2,
            index: index2
          }) => {
            return (0, import_jsx_runtime49.jsx)(Mark, _extends({
              id: seriesId,
              dataIndex: index2,
              shape: "circle",
              color: colorGetter(index2),
              x: x2,
              y: y2,
              highlightScope: series[seriesId].highlightScope,
              skipAnimation: skipAnimation2,
              onClick: onItemClick && ((event) => onItemClick(event, {
                type: "line",
                seriesId,
                dataIndex: index2
              }))
            }, slotProps == null ? void 0 : slotProps.mark), `${seriesId}-${index2}`);
          })
        }, seriesId);
      });
    })
  }));
}
true ? MarkPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line mark item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line mark item identifier.
   */
  onItemClick: import_prop_types35.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types35.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types35.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types35.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineHighlightPlot.js
init_extends();
init_objectWithoutPropertiesLoose();
var React66 = __toESM(require_react());
var import_prop_types37 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/LineChart/LineHighlightElement.js
init_extends();
init_objectWithoutPropertiesLoose();
var React65 = __toESM(require_react());
var import_prop_types36 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();
var import_jsx_runtime50 = __toESM(require_jsx_runtime());
var _excluded27 = ["x", "y", "id", "classes", "color"];
function getHighlightElementUtilityClass(slot) {
  return generateUtilityClass("MuiHighlightElement", slot);
}
var lineHighlightElementClasses = generateUtilityClasses("MuiHighlightElement", ["root"]);
var useUtilityClasses12 = (ownerState) => {
  const {
    classes,
    id
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`]
  };
  return composeClasses(slots, getHighlightElementUtilityClass, classes);
};
var HighlightElement = styled_default("circle", {
  name: "MuiHighlightElement",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  transform: `translate(${ownerState.x}px, ${ownerState.y}px)`,
  transformOrigin: `${ownerState.x}px ${ownerState.y}px`,
  fill: ownerState.color
}));
function LineHighlightElement(props) {
  const {
    x: x2,
    y: y2,
    id,
    classes: innerClasses,
    color: color2
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded27);
  const ownerState = {
    id,
    classes: innerClasses,
    color: color2,
    x: x2,
    y: y2
  };
  const classes = useUtilityClasses12(ownerState);
  return (0, import_jsx_runtime50.jsx)(HighlightElement, _extends({
    pointerEvents: "none",
    ownerState,
    className: classes.root,
    cx: 0,
    cy: 0,
    r: other.r === void 0 ? 5 : other.r
  }, other));
}
true ? LineHighlightElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types36.default.object,
  id: import_prop_types36.default.oneOfType([import_prop_types36.default.number, import_prop_types36.default.string]).isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineHighlightPlot.js
var import_jsx_runtime51 = __toESM(require_jsx_runtime());
var _excluded28 = ["slots", "slotProps"];
function LineHighlightPlot(props) {
  var _a;
  const {
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded28);
  const seriesData = React66.useContext(SeriesContext).line;
  const axisData = React66.useContext(CartesianContext);
  const {
    axis
  } = React66.useContext(InteractionContext);
  const highlightedIndex = (_a = axis.x) == null ? void 0 : _a.index;
  if (highlightedIndex === void 0) {
    return null;
  }
  if (seriesData === void 0) {
    return null;
  }
  const {
    series,
    stackingGroups
  } = seriesData;
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = axisData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  const Element = (slots == null ? void 0 : slots.lineHighlight) ?? LineHighlightElement;
  return (0, import_jsx_runtime51.jsx)("g", _extends({}, other, {
    children: stackingGroups.flatMap(({
      ids: groupIds
    }) => {
      return groupIds.flatMap((seriesId) => {
        const {
          xAxisKey = defaultXAxisId,
          yAxisKey = defaultYAxisId,
          stackedData,
          data,
          disableHighlight
        } = series[seriesId];
        if (disableHighlight || data[highlightedIndex] == null) {
          return null;
        }
        const xScale = getValueToPositionMapper(xAxis[xAxisKey].scale);
        const yScale = yAxis[yAxisKey].scale;
        const xData = xAxis[xAxisKey].data;
        if (xData === void 0) {
          throw new Error(`MUI X Charts: ${xAxisKey === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisKey}"`} should have data property to be able to display a line plot.`);
        }
        const x2 = xScale(xData[highlightedIndex]);
        const y2 = yScale(stackedData[highlightedIndex][1]);
        const colorGetter = getColor2(series[seriesId], xAxis[xAxisKey], yAxis[yAxisKey]);
        return (0, import_jsx_runtime51.jsx)(Element, _extends({
          id: seriesId,
          color: colorGetter(highlightedIndex),
          x: x2,
          y: y2
        }, slotProps == null ? void 0 : slotProps.lineHighlight), `${seriesId}`);
      });
    })
  }));
}
true ? LineHighlightPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types37.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types37.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineChart.js
var import_jsx_runtime52 = __toESM(require_jsx_runtime());
var LineChart = React67.forwardRef(function LineChart2(props, ref) {
  const {
    xAxis,
    yAxis,
    series,
    width,
    height,
    margin,
    colors: colors3,
    dataset,
    sx,
    tooltip,
    onAxisClick,
    onAreaClick,
    onLineClick,
    onMarkClick,
    axisHighlight = {
      x: "line"
    },
    disableLineItemHighlight,
    legend,
    grid,
    topAxis,
    leftAxis,
    rightAxis,
    bottomAxis,
    children,
    slots,
    slotProps,
    skipAnimation: skipAnimation2,
    loading
  } = props;
  const id = useId();
  const clipPathId = `${id}-clip-path`;
  return (0, import_jsx_runtime52.jsxs)(ResponsiveChartContainer, {
    ref,
    series: series.map((s2) => _extends({
      disableHighlight: !!disableLineItemHighlight,
      type: "line"
    }, s2)),
    width,
    height,
    margin,
    xAxis: xAxis ?? [{
      id: DEFAULT_X_AXIS_KEY,
      scaleType: "point",
      data: Array.from({
        length: Math.max(...series.map((s2) => (s2.data ?? dataset ?? []).length))
      }, (_, index2) => index2)
    }],
    yAxis,
    colors: colors3,
    dataset,
    sx,
    disableAxisListener: (tooltip == null ? void 0 : tooltip.trigger) !== "axis" && (axisHighlight == null ? void 0 : axisHighlight.x) === "none" && (axisHighlight == null ? void 0 : axisHighlight.y) === "none" && !onAxisClick,
    children: [onAxisClick && (0, import_jsx_runtime52.jsx)(ChartsOnAxisClickHandler, {
      onAxisClick
    }), grid && (0, import_jsx_runtime52.jsx)(ChartsGrid, {
      vertical: grid.vertical,
      horizontal: grid.horizontal
    }), (0, import_jsx_runtime52.jsxs)("g", {
      clipPath: `url(#${clipPathId})`,
      children: [(0, import_jsx_runtime52.jsx)(AreaPlot, {
        slots,
        slotProps,
        onItemClick: onAreaClick,
        skipAnimation: skipAnimation2
      }), (0, import_jsx_runtime52.jsx)(LinePlot, {
        slots,
        slotProps,
        onItemClick: onLineClick,
        skipAnimation: skipAnimation2
      }), (0, import_jsx_runtime52.jsx)(ChartsOverlay, {
        loading,
        slots,
        slotProps
      })]
    }), (0, import_jsx_runtime52.jsx)(ChartsAxis, {
      topAxis,
      leftAxis,
      rightAxis,
      bottomAxis,
      slots,
      slotProps
    }), (0, import_jsx_runtime52.jsx)(ChartsAxisHighlight, _extends({}, axisHighlight)), (0, import_jsx_runtime52.jsx)(MarkPlot, {
      slots,
      slotProps,
      onItemClick: onMarkClick,
      skipAnimation: skipAnimation2
    }), (0, import_jsx_runtime52.jsx)(LineHighlightPlot, {
      slots,
      slotProps
    }), (0, import_jsx_runtime52.jsx)(ChartsLegend, _extends({}, legend, {
      slots,
      slotProps
    })), !loading && (0, import_jsx_runtime52.jsx)(ChartsTooltip, _extends({}, tooltip, {
      slots,
      slotProps
    })), (0, import_jsx_runtime52.jsx)(ChartsClipPath, {
      id: clipPathId
    }), children]
  });
});
true ? LineChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The configuration of axes highlight.
   * @see See {@link https://mui.com/x/react-charts/tooltip/#highlights highlight docs} for more details.
   * @default { x: 'line' }
   */
  axisHighlight: import_prop_types38.default.shape({
    x: import_prop_types38.default.oneOf(["band", "line", "none"]),
    y: import_prop_types38.default.oneOf(["band", "line", "none"])
  }),
  /**
   * Indicate which axis to display the bottom of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default xAxisIds[0] The id of the first provided axis
   */
  bottomAxis: import_prop_types38.default.oneOfType([import_prop_types38.default.object, import_prop_types38.default.string]),
  children: import_prop_types38.default.node,
  className: import_prop_types38.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types38.default.oneOfType([import_prop_types38.default.arrayOf(import_prop_types38.default.string), import_prop_types38.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types38.default.arrayOf(import_prop_types38.default.object),
  desc: import_prop_types38.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types38.default.bool,
  /**
   * If `true`, render the line highlight item.
   */
  disableLineItemHighlight: import_prop_types38.default.bool,
  /**
   * Option to display a cartesian grid in the background.
   */
  grid: import_prop_types38.default.shape({
    horizontal: import_prop_types38.default.bool,
    vertical: import_prop_types38.default.bool
  }),
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types38.default.number,
  /**
   * Indicate which axis to display the left of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default yAxisIds[0] The id of the first provided axis
   */
  leftAxis: import_prop_types38.default.oneOfType([import_prop_types38.default.object, import_prop_types38.default.string]),
  /**
   * @deprecated Consider using `slotProps.legend` instead.
   */
  legend: import_prop_types38.default.shape({
    classes: import_prop_types38.default.object,
    direction: import_prop_types38.default.oneOf(["column", "row"]),
    hidden: import_prop_types38.default.bool,
    position: import_prop_types38.default.shape({
      horizontal: import_prop_types38.default.oneOf(["left", "middle", "right"]).isRequired,
      vertical: import_prop_types38.default.oneOf(["bottom", "middle", "top"]).isRequired
    }),
    slotProps: import_prop_types38.default.object,
    slots: import_prop_types38.default.object
  }),
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: import_prop_types38.default.bool,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types38.default.shape({
    bottom: import_prop_types38.default.number,
    left: import_prop_types38.default.number,
    right: import_prop_types38.default.number,
    top: import_prop_types38.default.number
  }),
  /**
   * Callback fired when an area element is clicked.
   */
  onAreaClick: import_prop_types38.default.func,
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | AxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: import_prop_types38.default.func,
  /**
   * Callback fired when a line element is clicked.
   */
  onLineClick: import_prop_types38.default.func,
  /**
   * Callback fired when a mark element is clicked.
   */
  onMarkClick: import_prop_types38.default.func,
  /**
   * Indicate which axis to display the right of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  rightAxis: import_prop_types38.default.oneOfType([import_prop_types38.default.object, import_prop_types38.default.string]),
  /**
   * The series to display in the line chart.
   * An array of [[LineSeriesType]] objects.
   */
  series: import_prop_types38.default.arrayOf(import_prop_types38.default.object).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types38.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types38.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types38.default.object,
  sx: import_prop_types38.default.oneOfType([import_prop_types38.default.arrayOf(import_prop_types38.default.oneOfType([import_prop_types38.default.func, import_prop_types38.default.object, import_prop_types38.default.bool])), import_prop_types38.default.func, import_prop_types38.default.object]),
  title: import_prop_types38.default.string,
  /**
   * The configuration of the tooltip.
   * @see See {@link https://mui.com/x/react-charts/tooltip/ tooltip docs} for more details.
   * @default { trigger: 'item' }
   */
  tooltip: import_prop_types38.default.shape({
    axisContent: import_prop_types38.default.elementType,
    classes: import_prop_types38.default.object,
    itemContent: import_prop_types38.default.elementType,
    slotProps: import_prop_types38.default.object,
    slots: import_prop_types38.default.object,
    trigger: import_prop_types38.default.oneOf(["axis", "item", "none"])
  }),
  /**
   * Indicate which axis to display the top of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  topAxis: import_prop_types38.default.oneOfType([import_prop_types38.default.object, import_prop_types38.default.string]),
  viewBox: import_prop_types38.default.shape({
    height: import_prop_types38.default.number,
    width: import_prop_types38.default.number,
    x: import_prop_types38.default.number,
    y: import_prop_types38.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types38.default.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types38.default.arrayOf(import_prop_types38.default.shape({
    axisId: import_prop_types38.default.oneOfType([import_prop_types38.default.number, import_prop_types38.default.string]),
    classes: import_prop_types38.default.object,
    colorMap: import_prop_types38.default.oneOfType([import_prop_types38.default.shape({
      colors: import_prop_types38.default.arrayOf(import_prop_types38.default.string).isRequired,
      type: import_prop_types38.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types38.default.string,
      values: import_prop_types38.default.arrayOf(import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number, import_prop_types38.default.string]).isRequired)
    }), import_prop_types38.default.shape({
      color: import_prop_types38.default.oneOfType([import_prop_types38.default.arrayOf(import_prop_types38.default.string.isRequired), import_prop_types38.default.func]).isRequired,
      max: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
      min: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
      type: import_prop_types38.default.oneOf(["continuous"]).isRequired
    }), import_prop_types38.default.shape({
      colors: import_prop_types38.default.arrayOf(import_prop_types38.default.string).isRequired,
      thresholds: import_prop_types38.default.arrayOf(import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]).isRequired).isRequired,
      type: import_prop_types38.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types38.default.array,
    dataKey: import_prop_types38.default.string,
    disableLine: import_prop_types38.default.bool,
    disableTicks: import_prop_types38.default.bool,
    fill: import_prop_types38.default.string,
    hideTooltip: import_prop_types38.default.bool,
    id: import_prop_types38.default.oneOfType([import_prop_types38.default.number, import_prop_types38.default.string]),
    label: import_prop_types38.default.string,
    labelFontSize: import_prop_types38.default.number,
    labelStyle: import_prop_types38.default.object,
    max: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
    min: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
    position: import_prop_types38.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types38.default.bool,
    scaleType: import_prop_types38.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types38.default.object,
    slots: import_prop_types38.default.object,
    stroke: import_prop_types38.default.string,
    tickFontSize: import_prop_types38.default.number,
    tickInterval: import_prop_types38.default.oneOfType([import_prop_types38.default.oneOf(["auto"]), import_prop_types38.default.array, import_prop_types38.default.func]),
    tickLabelInterval: import_prop_types38.default.oneOfType([import_prop_types38.default.oneOf(["auto"]), import_prop_types38.default.func]),
    tickLabelPlacement: import_prop_types38.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types38.default.object,
    tickMaxStep: import_prop_types38.default.number,
    tickMinStep: import_prop_types38.default.number,
    tickNumber: import_prop_types38.default.number,
    tickPlacement: import_prop_types38.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types38.default.number,
    valueFormatter: import_prop_types38.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types38.default.arrayOf(import_prop_types38.default.shape({
    axisId: import_prop_types38.default.oneOfType([import_prop_types38.default.number, import_prop_types38.default.string]),
    classes: import_prop_types38.default.object,
    colorMap: import_prop_types38.default.oneOfType([import_prop_types38.default.shape({
      colors: import_prop_types38.default.arrayOf(import_prop_types38.default.string).isRequired,
      type: import_prop_types38.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types38.default.string,
      values: import_prop_types38.default.arrayOf(import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number, import_prop_types38.default.string]).isRequired)
    }), import_prop_types38.default.shape({
      color: import_prop_types38.default.oneOfType([import_prop_types38.default.arrayOf(import_prop_types38.default.string.isRequired), import_prop_types38.default.func]).isRequired,
      max: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
      min: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
      type: import_prop_types38.default.oneOf(["continuous"]).isRequired
    }), import_prop_types38.default.shape({
      colors: import_prop_types38.default.arrayOf(import_prop_types38.default.string).isRequired,
      thresholds: import_prop_types38.default.arrayOf(import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]).isRequired).isRequired,
      type: import_prop_types38.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types38.default.array,
    dataKey: import_prop_types38.default.string,
    disableLine: import_prop_types38.default.bool,
    disableTicks: import_prop_types38.default.bool,
    fill: import_prop_types38.default.string,
    hideTooltip: import_prop_types38.default.bool,
    id: import_prop_types38.default.oneOfType([import_prop_types38.default.number, import_prop_types38.default.string]),
    label: import_prop_types38.default.string,
    labelFontSize: import_prop_types38.default.number,
    labelStyle: import_prop_types38.default.object,
    max: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
    min: import_prop_types38.default.oneOfType([import_prop_types38.default.instanceOf(Date), import_prop_types38.default.number]),
    position: import_prop_types38.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types38.default.bool,
    scaleType: import_prop_types38.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types38.default.object,
    slots: import_prop_types38.default.object,
    stroke: import_prop_types38.default.string,
    tickFontSize: import_prop_types38.default.number,
    tickInterval: import_prop_types38.default.oneOfType([import_prop_types38.default.oneOf(["auto"]), import_prop_types38.default.array, import_prop_types38.default.func]),
    tickLabelInterval: import_prop_types38.default.oneOfType([import_prop_types38.default.oneOf(["auto"]), import_prop_types38.default.func]),
    tickLabelPlacement: import_prop_types38.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types38.default.object,
    tickMaxStep: import_prop_types38.default.number,
    tickMinStep: import_prop_types38.default.number,
    tickNumber: import_prop_types38.default.number,
    tickPlacement: import_prop_types38.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types38.default.number,
    valueFormatter: import_prop_types38.default.func
  }))
} : void 0;

// node_modules/@mui/x-charts/esm/PieChart/PieChart.js
init_extends();
var React74 = __toESM(require_react());
var import_prop_types44 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/PieChart/PiePlot.js
var React73 = __toESM(require_react());
var import_prop_types43 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/PieChart/PieArcPlot.js
init_extends();
init_objectWithoutPropertiesLoose();
var React70 = __toESM(require_react());
var import_prop_types40 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/PieChart/PieArc.js
init_extends();
init_objectWithoutPropertiesLoose();
var React68 = __toESM(require_react());
var import_prop_types39 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();
var import_jsx_runtime53 = __toESM(require_jsx_runtime());
var _excluded29 = ["classes", "color", "cornerRadius", "dataIndex", "endAngle", "highlightScope", "id", "innerRadius", "isFaded", "isHighlighted", "onClick", "outerRadius", "paddingAngle", "startAngle"];
function getPieArcUtilityClass(slot) {
  return generateUtilityClass("MuiPieArc", slot);
}
var pieArcClasses = generateUtilityClasses("MuiPieArc", ["root", "highlighted", "faded"]);
var useUtilityClasses13 = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getPieArcUtilityClass, classes);
};
var PieArcRoot = styled_default(animated.path, {
  name: "MuiPieArc",
  slot: "Root",
  overridesResolver: (_, styles) => styles.arc
})(({
  theme
}) => ({
  stroke: (theme.vars || theme).palette.background.paper,
  strokeWidth: 1,
  strokeLinejoin: "round"
}));
function PieArc(props) {
  const {
    classes: innerClasses,
    color: color2,
    cornerRadius,
    dataIndex,
    endAngle,
    highlightScope,
    id,
    innerRadius,
    isFaded,
    isHighlighted,
    onClick,
    outerRadius,
    paddingAngle,
    startAngle
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded29);
  const ownerState = {
    id,
    dataIndex,
    classes: innerClasses,
    color: color2,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses13(ownerState);
  const getInteractionItemProps = useInteractionItemProps(highlightScope);
  return (0, import_jsx_runtime53.jsx)(PieArcRoot, _extends({
    d: to2([startAngle, endAngle, paddingAngle, innerRadius, outerRadius, cornerRadius], (sA, eA, pA, iR, oR, cR) => arc_default().cornerRadius(cR)({
      padAngle: pA,
      startAngle: sA,
      endAngle: eA,
      innerRadius: iR,
      outerRadius: oR
    })),
    onClick,
    cursor: onClick ? "pointer" : "unset",
    ownerState,
    className: classes.root
  }, other, getInteractionItemProps({
    type: "pie",
    seriesId: id,
    dataIndex
  })));
}
true ? PieArc.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types39.default.object,
  dataIndex: import_prop_types39.default.number.isRequired,
  highlightScope: import_prop_types39.default.shape({
    faded: import_prop_types39.default.oneOf(["global", "none", "series"]),
    highlighted: import_prop_types39.default.oneOf(["item", "none", "series"])
  }),
  id: import_prop_types39.default.oneOfType([import_prop_types39.default.number, import_prop_types39.default.string]).isRequired,
  isFaded: import_prop_types39.default.bool.isRequired,
  isHighlighted: import_prop_types39.default.bool.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/PieChart/dataTransform/transition.js
var defaultTransitionConfig = {
  keys: (item) => item.id,
  from: ({
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    paddingAngle,
    color: color2,
    isFaded
  }) => ({
    innerRadius,
    outerRadius: (innerRadius + outerRadius) / 2,
    cornerRadius,
    startAngle: (startAngle + endAngle) / 2,
    endAngle: (startAngle + endAngle) / 2,
    paddingAngle,
    fill: color2,
    opacity: isFaded ? 0.3 : 1
  }),
  leave: ({
    innerRadius,
    startAngle,
    endAngle
  }) => ({
    innerRadius,
    outerRadius: innerRadius,
    startAngle: (startAngle + endAngle) / 2,
    endAngle: (startAngle + endAngle) / 2
  }),
  enter: ({
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  }) => ({
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  }),
  update: ({
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    paddingAngle,
    color: color2,
    isFaded
  }) => ({
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    paddingAngle,
    fill: color2,
    opacity: isFaded ? 0.3 : 1
  }),
  config: {
    tension: 120,
    friction: 14,
    clamp: true
  }
};
var defaultLabelTransitionConfig = {
  keys: (item) => item.id,
  from: ({
    innerRadius,
    outerRadius,
    arcLabelRadius,
    cornerRadius,
    startAngle,
    endAngle,
    paddingAngle
  }) => ({
    innerRadius,
    outerRadius: (innerRadius + outerRadius) / 2,
    cornerRadius,
    arcLabelRadius,
    startAngle: (startAngle + endAngle) / 2,
    endAngle: (startAngle + endAngle) / 2,
    paddingAngle,
    opacity: 0
  }),
  leave: ({
    innerRadius,
    startAngle,
    endAngle
  }) => ({
    innerRadius,
    outerRadius: innerRadius,
    arcLabelRadius: innerRadius,
    startAngle: (startAngle + endAngle) / 2,
    endAngle: (startAngle + endAngle) / 2,
    opacity: 0
  }),
  enter: ({
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    arcLabelRadius
  }) => ({
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    arcLabelRadius,
    opacity: 1
  }),
  update: ({
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    paddingAngle,
    arcLabelRadius
  }) => ({
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    paddingAngle,
    arcLabelRadius,
    opacity: 1
  }),
  config: {
    tension: 120,
    friction: 14,
    clamp: true
  }
};

// node_modules/@mui/x-charts/esm/PieChart/dataTransform/useTransformData.js
init_extends();
var React69 = __toESM(require_react());
function useTransformData(series) {
  const {
    id: seriesId,
    highlightScope,
    data,
    faded,
    highlighted,
    paddingAngle: basePaddingAngle = 0,
    innerRadius: baseInnerRadius = 0,
    arcLabelRadius: baseArcLabelRadius,
    outerRadius: baseOuterRadius,
    cornerRadius: baseCornerRadius = 0
  } = series;
  const {
    item: highlightedItem
  } = React69.useContext(InteractionContext);
  const getHighlightStatus = React69.useCallback((dataIndex) => {
    const isHighlighted = getIsHighlighted(highlightedItem, {
      type: "pie",
      seriesId,
      dataIndex
    }, highlightScope);
    const isFaded = !isHighlighted && getIsFaded(highlightedItem, {
      type: "pie",
      seriesId,
      dataIndex
    }, highlightScope);
    return {
      isHighlighted,
      isFaded
    };
  }, [highlightScope, highlightedItem, seriesId]);
  const dataWithHighlight = React69.useMemo(() => data.map((item, itemIndex) => {
    const {
      isHighlighted,
      isFaded
    } = getHighlightStatus(itemIndex);
    const attributesOverride = _extends({
      additionalRadius: 0
    }, isFaded && faded || isHighlighted && highlighted || {});
    const paddingAngle = Math.max(0, Math.PI * (attributesOverride.paddingAngle ?? basePaddingAngle) / 180);
    const innerRadius = Math.max(0, attributesOverride.innerRadius ?? baseInnerRadius);
    const outerRadius = Math.max(0, attributesOverride.outerRadius ?? baseOuterRadius + attributesOverride.additionalRadius);
    const cornerRadius = attributesOverride.cornerRadius ?? baseCornerRadius;
    const arcLabelRadius = attributesOverride.arcLabelRadius ?? baseArcLabelRadius ?? (innerRadius + outerRadius) / 2;
    return _extends({}, item, attributesOverride, {
      isFaded,
      isHighlighted,
      paddingAngle,
      innerRadius,
      outerRadius,
      cornerRadius,
      arcLabelRadius
    });
  }), [baseCornerRadius, baseInnerRadius, baseOuterRadius, basePaddingAngle, baseArcLabelRadius, data, faded, getHighlightStatus, highlighted]);
  return dataWithHighlight;
}

// node_modules/@mui/x-charts/esm/PieChart/PieArcPlot.js
var import_jsx_runtime54 = __toESM(require_jsx_runtime());
var _excluded30 = ["slots", "slotProps", "innerRadius", "outerRadius", "cornerRadius", "paddingAngle", "id", "highlightScope", "highlighted", "faded", "data", "onItemClick", "skipAnimation"];
var _excluded210 = ["startAngle", "endAngle", "paddingAngle", "innerRadius", "arcLabelRadius", "outerRadius", "cornerRadius"];
function PieArcPlot(props) {
  const {
    slots,
    slotProps,
    innerRadius = 0,
    outerRadius,
    cornerRadius = 0,
    paddingAngle = 0,
    id,
    highlightScope,
    highlighted,
    faded = {
      additionalRadius: -5
    },
    data,
    onItemClick,
    skipAnimation: skipAnimation2
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded30);
  const transformedData = useTransformData({
    innerRadius,
    outerRadius,
    cornerRadius,
    paddingAngle,
    id,
    highlightScope,
    highlighted,
    faded,
    data
  });
  const transition = useTransition(transformedData, _extends({}, defaultTransitionConfig, {
    immediate: skipAnimation2
  }));
  if (data.length === 0) {
    return null;
  }
  const Arc = (slots == null ? void 0 : slots.pieArc) ?? PieArc;
  return (0, import_jsx_runtime54.jsx)("g", _extends({}, other, {
    children: transition((_ref, item, _, index2) => {
      let {
        startAngle,
        endAngle,
        paddingAngle: pA,
        innerRadius: iR,
        outerRadius: oR,
        cornerRadius: cR
      } = _ref, style = _objectWithoutPropertiesLoose(_ref, _excluded210);
      return (0, import_jsx_runtime54.jsx)(Arc, _extends({
        startAngle,
        endAngle,
        paddingAngle: pA,
        innerRadius: iR,
        outerRadius: oR,
        cornerRadius: cR,
        style,
        id,
        color: item.color,
        dataIndex: index2,
        highlightScope,
        isFaded: item.isFaded,
        isHighlighted: item.isHighlighted,
        onClick: onItemClick && ((event) => {
          onItemClick(event, {
            type: "pie",
            seriesId: id,
            dataIndex: index2
          }, item);
        })
      }, slotProps == null ? void 0 : slotProps.pieArc));
    })
  }));
}
true ? PieArcPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The radius between circle center and the arc label in px.
   * @default (innerRadius - outerRadius) / 2
   */
  arcLabelRadius: import_prop_types40.default.number,
  /**
   * The radius applied to arc corners (similar to border radius).
   * @default 0
   */
  cornerRadius: import_prop_types40.default.number,
  data: import_prop_types40.default.arrayOf(import_prop_types40.default.shape({
    color: import_prop_types40.default.string.isRequired,
    endAngle: import_prop_types40.default.number.isRequired,
    formattedValue: import_prop_types40.default.string.isRequired,
    id: import_prop_types40.default.oneOfType([import_prop_types40.default.number, import_prop_types40.default.string]).isRequired,
    index: import_prop_types40.default.number.isRequired,
    label: import_prop_types40.default.oneOfType([import_prop_types40.default.func, import_prop_types40.default.string]),
    padAngle: import_prop_types40.default.number.isRequired,
    startAngle: import_prop_types40.default.number.isRequired,
    value: import_prop_types40.default.number.isRequired
  })).isRequired,
  /**
   * Override the arc attributes when it is faded.
   * @default { additionalRadius: -5 }
   */
  faded: import_prop_types40.default.shape({
    additionalRadius: import_prop_types40.default.number,
    arcLabelRadius: import_prop_types40.default.number,
    color: import_prop_types40.default.string,
    cornerRadius: import_prop_types40.default.number,
    innerRadius: import_prop_types40.default.number,
    outerRadius: import_prop_types40.default.number,
    paddingAngle: import_prop_types40.default.number
  }),
  /**
   * Override the arc attributes when it is highlighted.
   */
  highlighted: import_prop_types40.default.shape({
    additionalRadius: import_prop_types40.default.number,
    arcLabelRadius: import_prop_types40.default.number,
    color: import_prop_types40.default.string,
    cornerRadius: import_prop_types40.default.number,
    innerRadius: import_prop_types40.default.number,
    outerRadius: import_prop_types40.default.number,
    paddingAngle: import_prop_types40.default.number
  }),
  highlightScope: import_prop_types40.default.shape({
    faded: import_prop_types40.default.oneOf(["global", "none", "series"]),
    highlighted: import_prop_types40.default.oneOf(["item", "none", "series"])
  }),
  id: import_prop_types40.default.oneOfType([import_prop_types40.default.number, import_prop_types40.default.string]).isRequired,
  /**
   * The radius between circle center and the beginning of the arc.
   * @default 0
   */
  innerRadius: import_prop_types40.default.number,
  /**
   * Callback fired when a pie item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {PieItemIdentifier} pieItemIdentifier The pie item identifier.
   * @param {DefaultizedPieValueType} item The pie item.
   */
  onItemClick: import_prop_types40.default.func,
  /**
   * The radius between circle center and the end of the arc.
   */
  outerRadius: import_prop_types40.default.number.isRequired,
  /**
   * The padding angle (deg) between two arcs.
   * @default 0
   */
  paddingAngle: import_prop_types40.default.number,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types40.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types40.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types40.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/PieChart/PieArcLabelPlot.js
init_objectWithoutPropertiesLoose();
init_extends();
var React72 = __toESM(require_react());
var import_prop_types42 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/PieChart/PieArcLabel.js
init_extends();
init_objectWithoutPropertiesLoose();
var React71 = __toESM(require_react());
var import_prop_types41 = __toESM(require_prop_types());
init_composeClasses();
init_generateUtilityClass();
init_generateUtilityClasses();
var import_jsx_runtime55 = __toESM(require_jsx_runtime());
var _excluded31 = ["id", "classes", "color", "startAngle", "endAngle", "paddingAngle", "arcLabelRadius", "innerRadius", "outerRadius", "cornerRadius", "formattedArcLabel", "isHighlighted", "isFaded", "style"];
function getPieArcLabelUtilityClass(slot) {
  return generateUtilityClass("MuiPieArcLabel", slot);
}
var pieArcLabelClasses = generateUtilityClasses("MuiPieArcLabel", ["root", "highlighted", "faded"]);
var useUtilityClasses14 = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getPieArcLabelUtilityClass, classes);
};
var PieArcLabelRoot = styled_default(animated.text, {
  name: "MuiPieArcLabel",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  fill: (theme.vars || theme).palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "middle",
  pointerEvents: "none"
}));
var getLabelPosition = (formattedArcLabel, variable) => (startAngle, endAngle, padAngle, arcLabelRadius, cornerRadius) => {
  if (!formattedArcLabel) {
    return 0;
  }
  const [x2, y2] = arc_default().cornerRadius(cornerRadius).centroid({
    padAngle,
    startAngle,
    endAngle,
    innerRadius: arcLabelRadius,
    outerRadius: arcLabelRadius
  });
  if (variable === "x") {
    return x2;
  }
  return y2;
};
function PieArcLabel(props) {
  const {
    id,
    classes: innerClasses,
    color: color2,
    startAngle,
    endAngle,
    paddingAngle,
    arcLabelRadius,
    cornerRadius,
    formattedArcLabel,
    isHighlighted,
    isFaded,
    style
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded31);
  const ownerState = {
    id,
    classes: innerClasses,
    color: color2,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses14(ownerState);
  return (0, import_jsx_runtime55.jsx)(PieArcLabelRoot, _extends({
    className: classes.root
  }, other, {
    style: _extends({
      x: to2([startAngle, endAngle, paddingAngle, arcLabelRadius, cornerRadius], getLabelPosition(formattedArcLabel, "x")),
      y: to2([startAngle, endAngle, paddingAngle, arcLabelRadius, cornerRadius], getLabelPosition(formattedArcLabel, "y"))
    }, style),
    children: formattedArcLabel
  }));
}
true ? PieArcLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types41.default.object,
  color: import_prop_types41.default.string.isRequired,
  formattedArcLabel: import_prop_types41.default.string,
  id: import_prop_types41.default.oneOfType([import_prop_types41.default.number, import_prop_types41.default.string]).isRequired,
  isFaded: import_prop_types41.default.bool.isRequired,
  isHighlighted: import_prop_types41.default.bool.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/PieChart/PieArcLabelPlot.js
var import_jsx_runtime56 = __toESM(require_jsx_runtime());
var _excluded32 = ["arcLabel", "arcLabelMinAngle", "arcLabelRadius", "cornerRadius", "data", "faded", "highlighted", "highlightScope", "id", "innerRadius", "outerRadius", "paddingAngle", "skipAnimation", "slotProps", "slots"];
var _excluded211 = ["startAngle", "endAngle", "paddingAngle", "innerRadius", "outerRadius", "arcLabelRadius", "cornerRadius"];
var RATIO = 180 / Math.PI;
function getItemLabel(arcLabel, arcLabelMinAngle, item) {
  var _a;
  if (!arcLabel) {
    return null;
  }
  const angle = (item.endAngle - item.startAngle) * RATIO;
  if (angle < arcLabelMinAngle) {
    return null;
  }
  switch (arcLabel) {
    case "label":
      return getLabel(item.label, "arc");
    case "value":
      return (_a = item.value) == null ? void 0 : _a.toString();
    case "formattedValue":
      return item.formattedValue;
    default:
      return arcLabel(_extends({}, item, {
        label: getLabel(item.label, "arc")
      }));
  }
}
function PieArcLabelPlot(props) {
  const {
    arcLabel,
    arcLabelMinAngle = 0,
    arcLabelRadius,
    cornerRadius = 0,
    data,
    faded = {
      additionalRadius: -5
    },
    highlighted,
    highlightScope,
    id,
    innerRadius,
    outerRadius,
    paddingAngle = 0,
    skipAnimation: skipAnimation2,
    slotProps,
    slots
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded32);
  const transformedData = useTransformData({
    innerRadius,
    outerRadius,
    arcLabelRadius,
    cornerRadius,
    paddingAngle,
    id,
    highlightScope,
    highlighted,
    faded,
    data
  });
  const transition = useTransition(transformedData, _extends({}, defaultLabelTransitionConfig, {
    immediate: skipAnimation2
  }));
  if (data.length === 0) {
    return null;
  }
  const ArcLabel = (slots == null ? void 0 : slots.pieArcLabel) ?? PieArcLabel;
  return (0, import_jsx_runtime56.jsx)("g", _extends({}, other, {
    children: transition((_ref, item) => {
      let {
        startAngle,
        endAngle,
        paddingAngle: pA,
        innerRadius: iR,
        outerRadius: oR,
        arcLabelRadius: aLR,
        cornerRadius: cR
      } = _ref, style = _objectWithoutPropertiesLoose(_ref, _excluded211);
      return (0, import_jsx_runtime56.jsx)(ArcLabel, _extends({
        startAngle,
        endAngle,
        paddingAngle: pA,
        innerRadius: iR,
        outerRadius: oR,
        arcLabelRadius: aLR,
        cornerRadius: cR,
        style,
        id,
        color: item.color,
        isFaded: item.isFaded,
        isHighlighted: item.isHighlighted,
        formattedArcLabel: getItemLabel(arcLabel, arcLabelMinAngle, item)
      }, slotProps == null ? void 0 : slotProps.pieArcLabel));
    })
  }));
}
true ? PieArcLabelPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The label displayed into the arc.
   */
  arcLabel: import_prop_types42.default.oneOfType([import_prop_types42.default.oneOf(["formattedValue", "label", "value"]), import_prop_types42.default.func]),
  /**
   * The minimal angle required to display the arc label.
   * @default 0
   */
  arcLabelMinAngle: import_prop_types42.default.number,
  /**
   * The radius between circle center and the arc label in px.
   * @default (innerRadius - outerRadius) / 2
   */
  arcLabelRadius: import_prop_types42.default.number,
  /**
   * The radius applied to arc corners (similar to border radius).
   * @default 0
   */
  cornerRadius: import_prop_types42.default.number,
  data: import_prop_types42.default.arrayOf(import_prop_types42.default.shape({
    color: import_prop_types42.default.string.isRequired,
    endAngle: import_prop_types42.default.number.isRequired,
    formattedValue: import_prop_types42.default.string.isRequired,
    id: import_prop_types42.default.oneOfType([import_prop_types42.default.number, import_prop_types42.default.string]).isRequired,
    index: import_prop_types42.default.number.isRequired,
    label: import_prop_types42.default.oneOfType([import_prop_types42.default.func, import_prop_types42.default.string]),
    padAngle: import_prop_types42.default.number.isRequired,
    startAngle: import_prop_types42.default.number.isRequired,
    value: import_prop_types42.default.number.isRequired
  })).isRequired,
  /**
   * Override the arc attributes when it is faded.
   * @default { additionalRadius: -5 }
   */
  faded: import_prop_types42.default.shape({
    additionalRadius: import_prop_types42.default.number,
    arcLabelRadius: import_prop_types42.default.number,
    color: import_prop_types42.default.string,
    cornerRadius: import_prop_types42.default.number,
    innerRadius: import_prop_types42.default.number,
    outerRadius: import_prop_types42.default.number,
    paddingAngle: import_prop_types42.default.number
  }),
  /**
   * Override the arc attributes when it is highlighted.
   */
  highlighted: import_prop_types42.default.shape({
    additionalRadius: import_prop_types42.default.number,
    arcLabelRadius: import_prop_types42.default.number,
    color: import_prop_types42.default.string,
    cornerRadius: import_prop_types42.default.number,
    innerRadius: import_prop_types42.default.number,
    outerRadius: import_prop_types42.default.number,
    paddingAngle: import_prop_types42.default.number
  }),
  highlightScope: import_prop_types42.default.shape({
    faded: import_prop_types42.default.oneOf(["global", "none", "series"]),
    highlighted: import_prop_types42.default.oneOf(["item", "none", "series"])
  }),
  id: import_prop_types42.default.oneOfType([import_prop_types42.default.number, import_prop_types42.default.string]).isRequired,
  /**
   * The radius between circle center and the beginning of the arc.
   * @default 0
   */
  innerRadius: import_prop_types42.default.number,
  /**
   * The radius between circle center and the end of the arc.
   */
  outerRadius: import_prop_types42.default.number.isRequired,
  /**
   * The padding angle (deg) between two arcs.
   * @default 0
   */
  paddingAngle: import_prop_types42.default.number,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types42.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types42.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types42.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/PieChart/getPieCoordinates.js
function getPieCoordinates(series, drawing) {
  const {
    height,
    width
  } = drawing;
  const {
    cx: cxParam,
    cy: cyParam
  } = series;
  const availableRadius = Math.min(width, height) / 2;
  const cx = getPercentageValue(cxParam ?? "50%", width);
  const cy = getPercentageValue(cyParam ?? "50%", height);
  return {
    cx,
    cy,
    availableRadius
  };
}

// node_modules/@mui/x-charts/esm/PieChart/PiePlot.js
var import_jsx_runtime57 = __toESM(require_jsx_runtime());
function PiePlot(props) {
  const {
    skipAnimation: skipAnimation2,
    slots,
    slotProps,
    onItemClick
  } = props;
  const seriesData = React73.useContext(SeriesContext).pie;
  const {
    left,
    top,
    width,
    height
  } = React73.useContext(DrawingContext);
  if (seriesData === void 0) {
    return null;
  }
  const {
    series,
    seriesOrder
  } = seriesData;
  return (0, import_jsx_runtime57.jsxs)("g", {
    children: [seriesOrder.map((seriesId) => {
      const {
        innerRadius: innerRadiusParam,
        outerRadius: outerRadiusParam,
        cornerRadius,
        paddingAngle,
        data,
        cx: cxParam,
        cy: cyParam,
        highlighted,
        faded,
        highlightScope
      } = series[seriesId];
      const {
        cx,
        cy,
        availableRadius
      } = getPieCoordinates({
        cx: cxParam,
        cy: cyParam
      }, {
        width,
        height
      });
      const outerRadius = getPercentageValue(outerRadiusParam ?? availableRadius, availableRadius);
      const innerRadius = getPercentageValue(innerRadiusParam ?? 0, availableRadius);
      return (0, import_jsx_runtime57.jsx)("g", {
        transform: `translate(${left + cx}, ${top + cy})`,
        children: (0, import_jsx_runtime57.jsx)(PieArcPlot, {
          innerRadius,
          outerRadius,
          cornerRadius,
          paddingAngle,
          id: seriesId,
          data,
          skipAnimation: skipAnimation2,
          highlightScope,
          highlighted,
          faded,
          onItemClick,
          slots,
          slotProps
        })
      }, seriesId);
    }), seriesOrder.map((seriesId) => {
      const {
        innerRadius: innerRadiusParam,
        outerRadius: outerRadiusParam,
        arcLabelRadius: arcLabelRadiusParam,
        cornerRadius,
        paddingAngle,
        arcLabel,
        arcLabelMinAngle,
        data,
        cx: cxParam,
        cy: cyParam,
        highlightScope
      } = series[seriesId];
      const {
        cx,
        cy,
        availableRadius
      } = getPieCoordinates({
        cx: cxParam,
        cy: cyParam
      }, {
        width,
        height
      });
      const outerRadius = getPercentageValue(outerRadiusParam ?? availableRadius, availableRadius);
      const innerRadius = getPercentageValue(innerRadiusParam ?? 0, availableRadius);
      const arcLabelRadius = arcLabelRadiusParam === void 0 ? (outerRadius + innerRadius) / 2 : getPercentageValue(arcLabelRadiusParam, availableRadius);
      return (0, import_jsx_runtime57.jsx)("g", {
        transform: `translate(${left + cx}, ${top + cy})`,
        children: (0, import_jsx_runtime57.jsx)(PieArcLabelPlot, {
          innerRadius,
          outerRadius: outerRadius ?? availableRadius,
          arcLabelRadius,
          cornerRadius,
          paddingAngle,
          id: seriesId,
          data,
          skipAnimation: skipAnimation2,
          arcLabel,
          arcLabelMinAngle,
          highlightScope,
          slots,
          slotProps
        })
      }, seriesId);
    })]
  });
}
true ? PiePlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a pie item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {PieItemIdentifier} pieItemIdentifier The pie item identifier.
   * @param {DefaultizedPieValueType} item The pie item.
   */
  onItemClick: import_prop_types43.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types43.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types43.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types43.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/internals/useIsRTL.js
var useIsRTL = () => {
  const theme = useTheme();
  return theme.direction === "rtl";
};

// node_modules/@mui/x-charts/esm/PieChart/PieChart.js
var import_jsx_runtime58 = __toESM(require_jsx_runtime());
var defaultMargin = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 100
};
var defaultRTLMargin = {
  top: 5,
  bottom: 5,
  left: 100,
  right: 5
};
function PieChart(props) {
  const {
    xAxis,
    yAxis,
    series,
    width,
    height,
    margin: marginProps,
    colors: colors3,
    sx,
    tooltip = {
      trigger: "item"
    },
    axisHighlight = {
      x: "none",
      y: "none"
    },
    skipAnimation: skipAnimation2,
    legend: legendProps,
    topAxis = null,
    leftAxis = null,
    rightAxis = null,
    bottomAxis = null,
    children,
    slots,
    slotProps,
    onItemClick,
    loading
  } = props;
  const isRTL = useIsRTL();
  const margin = _extends({}, isRTL ? defaultRTLMargin : defaultMargin, marginProps);
  const legend = _extends({
    direction: "column",
    position: {
      vertical: "middle",
      horizontal: isRTL ? "left" : "right"
    }
  }, legendProps);
  return (0, import_jsx_runtime58.jsxs)(ResponsiveChartContainer, {
    series: series.map((s2) => _extends({
      type: "pie"
    }, s2)),
    width,
    height,
    margin,
    xAxis: xAxis ?? [{
      id: DEFAULT_X_AXIS_KEY,
      scaleType: "point",
      data: [...new Array(Math.max(...series.map((s2) => s2.data.length)))].map((_, index2) => index2)
    }],
    yAxis,
    colors: colors3,
    sx,
    disableAxisListener: (tooltip == null ? void 0 : tooltip.trigger) !== "axis" && (axisHighlight == null ? void 0 : axisHighlight.x) === "none" && (axisHighlight == null ? void 0 : axisHighlight.y) === "none",
    children: [(0, import_jsx_runtime58.jsx)(ChartsAxis, {
      topAxis,
      leftAxis,
      rightAxis,
      bottomAxis,
      slots,
      slotProps
    }), (0, import_jsx_runtime58.jsx)(PiePlot, {
      slots,
      slotProps,
      onItemClick,
      skipAnimation: skipAnimation2
    }), (0, import_jsx_runtime58.jsx)(ChartsOverlay, {
      loading,
      slots,
      slotProps
    }), (0, import_jsx_runtime58.jsx)(ChartsLegend, _extends({}, legend, {
      slots,
      slotProps
    })), (0, import_jsx_runtime58.jsx)(ChartsAxisHighlight, _extends({}, axisHighlight)), !loading && (0, import_jsx_runtime58.jsx)(ChartsTooltip, _extends({}, tooltip, {
      slots,
      slotProps
    })), children]
  });
}
true ? PieChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The configuration of axes highlight.
   * @see See {@link https://mui.com/x/react-charts/tooltip/#highlights highlight docs} for more details.
   * @default { x: 'none', y: 'none' }
   */
  axisHighlight: import_prop_types44.default.shape({
    x: import_prop_types44.default.oneOf(["band", "line", "none"]),
    y: import_prop_types44.default.oneOf(["band", "line", "none"])
  }),
  /**
   * Indicate which axis to display the bottom of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  bottomAxis: import_prop_types44.default.oneOfType([import_prop_types44.default.object, import_prop_types44.default.string]),
  children: import_prop_types44.default.node,
  className: import_prop_types44.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types44.default.oneOfType([import_prop_types44.default.arrayOf(import_prop_types44.default.string), import_prop_types44.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types44.default.arrayOf(import_prop_types44.default.object),
  desc: import_prop_types44.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types44.default.bool,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types44.default.number,
  /**
   * Indicate which axis to display the left of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  leftAxis: import_prop_types44.default.oneOfType([import_prop_types44.default.object, import_prop_types44.default.string]),
  /**
   * The props of the legend.
   * @default { direction: 'column', position: { vertical: 'middle', horizontal: 'right' } }
   * @deprecated Consider using `slotProps.legend` instead.
   */
  legend: import_prop_types44.default.shape({
    classes: import_prop_types44.default.object,
    direction: import_prop_types44.default.oneOf(["column", "row"]),
    hidden: import_prop_types44.default.bool,
    position: import_prop_types44.default.shape({
      horizontal: import_prop_types44.default.oneOf(["left", "middle", "right"]).isRequired,
      vertical: import_prop_types44.default.oneOf(["bottom", "middle", "top"]).isRequired
    }),
    slotProps: import_prop_types44.default.object,
    slots: import_prop_types44.default.object
  }),
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: import_prop_types44.default.bool,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types44.default.shape({
    bottom: import_prop_types44.default.number,
    left: import_prop_types44.default.number,
    right: import_prop_types44.default.number,
    top: import_prop_types44.default.number
  }),
  /**
   * Callback fired when a pie arc is clicked.
   */
  onItemClick: import_prop_types44.default.func,
  /**
   * Indicate which axis to display the right of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  rightAxis: import_prop_types44.default.oneOfType([import_prop_types44.default.object, import_prop_types44.default.string]),
  /**
   * The series to display in the pie chart.
   * An array of [[PieSeriesType]] objects.
   */
  series: import_prop_types44.default.arrayOf(import_prop_types44.default.object).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types44.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types44.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types44.default.object,
  sx: import_prop_types44.default.oneOfType([import_prop_types44.default.arrayOf(import_prop_types44.default.oneOfType([import_prop_types44.default.func, import_prop_types44.default.object, import_prop_types44.default.bool])), import_prop_types44.default.func, import_prop_types44.default.object]),
  title: import_prop_types44.default.string,
  /**
   * The configuration of the tooltip.
   * @see See {@link https://mui.com/x/react-charts/tooltip/ tooltip docs} for more details.
   * @default { trigger: 'item' }
   */
  tooltip: import_prop_types44.default.shape({
    axisContent: import_prop_types44.default.elementType,
    classes: import_prop_types44.default.object,
    itemContent: import_prop_types44.default.elementType,
    slotProps: import_prop_types44.default.object,
    slots: import_prop_types44.default.object,
    trigger: import_prop_types44.default.oneOf(["axis", "item", "none"])
  }),
  /**
   * Indicate which axis to display the top of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  topAxis: import_prop_types44.default.oneOfType([import_prop_types44.default.object, import_prop_types44.default.string]),
  viewBox: import_prop_types44.default.shape({
    height: import_prop_types44.default.number,
    width: import_prop_types44.default.number,
    x: import_prop_types44.default.number,
    y: import_prop_types44.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types44.default.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types44.default.arrayOf(import_prop_types44.default.shape({
    axisId: import_prop_types44.default.oneOfType([import_prop_types44.default.number, import_prop_types44.default.string]),
    classes: import_prop_types44.default.object,
    colorMap: import_prop_types44.default.oneOfType([import_prop_types44.default.shape({
      colors: import_prop_types44.default.arrayOf(import_prop_types44.default.string).isRequired,
      type: import_prop_types44.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types44.default.string,
      values: import_prop_types44.default.arrayOf(import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number, import_prop_types44.default.string]).isRequired)
    }), import_prop_types44.default.shape({
      color: import_prop_types44.default.oneOfType([import_prop_types44.default.arrayOf(import_prop_types44.default.string.isRequired), import_prop_types44.default.func]).isRequired,
      max: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
      min: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
      type: import_prop_types44.default.oneOf(["continuous"]).isRequired
    }), import_prop_types44.default.shape({
      colors: import_prop_types44.default.arrayOf(import_prop_types44.default.string).isRequired,
      thresholds: import_prop_types44.default.arrayOf(import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]).isRequired).isRequired,
      type: import_prop_types44.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types44.default.array,
    dataKey: import_prop_types44.default.string,
    disableLine: import_prop_types44.default.bool,
    disableTicks: import_prop_types44.default.bool,
    fill: import_prop_types44.default.string,
    hideTooltip: import_prop_types44.default.bool,
    id: import_prop_types44.default.oneOfType([import_prop_types44.default.number, import_prop_types44.default.string]),
    label: import_prop_types44.default.string,
    labelFontSize: import_prop_types44.default.number,
    labelStyle: import_prop_types44.default.object,
    max: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
    min: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
    position: import_prop_types44.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types44.default.bool,
    scaleType: import_prop_types44.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types44.default.object,
    slots: import_prop_types44.default.object,
    stroke: import_prop_types44.default.string,
    tickFontSize: import_prop_types44.default.number,
    tickInterval: import_prop_types44.default.oneOfType([import_prop_types44.default.oneOf(["auto"]), import_prop_types44.default.array, import_prop_types44.default.func]),
    tickLabelInterval: import_prop_types44.default.oneOfType([import_prop_types44.default.oneOf(["auto"]), import_prop_types44.default.func]),
    tickLabelPlacement: import_prop_types44.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types44.default.object,
    tickMaxStep: import_prop_types44.default.number,
    tickMinStep: import_prop_types44.default.number,
    tickNumber: import_prop_types44.default.number,
    tickPlacement: import_prop_types44.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types44.default.number,
    valueFormatter: import_prop_types44.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types44.default.arrayOf(import_prop_types44.default.shape({
    axisId: import_prop_types44.default.oneOfType([import_prop_types44.default.number, import_prop_types44.default.string]),
    classes: import_prop_types44.default.object,
    colorMap: import_prop_types44.default.oneOfType([import_prop_types44.default.shape({
      colors: import_prop_types44.default.arrayOf(import_prop_types44.default.string).isRequired,
      type: import_prop_types44.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types44.default.string,
      values: import_prop_types44.default.arrayOf(import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number, import_prop_types44.default.string]).isRequired)
    }), import_prop_types44.default.shape({
      color: import_prop_types44.default.oneOfType([import_prop_types44.default.arrayOf(import_prop_types44.default.string.isRequired), import_prop_types44.default.func]).isRequired,
      max: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
      min: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
      type: import_prop_types44.default.oneOf(["continuous"]).isRequired
    }), import_prop_types44.default.shape({
      colors: import_prop_types44.default.arrayOf(import_prop_types44.default.string).isRequired,
      thresholds: import_prop_types44.default.arrayOf(import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]).isRequired).isRequired,
      type: import_prop_types44.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types44.default.array,
    dataKey: import_prop_types44.default.string,
    disableLine: import_prop_types44.default.bool,
    disableTicks: import_prop_types44.default.bool,
    fill: import_prop_types44.default.string,
    hideTooltip: import_prop_types44.default.bool,
    id: import_prop_types44.default.oneOfType([import_prop_types44.default.number, import_prop_types44.default.string]),
    label: import_prop_types44.default.string,
    labelFontSize: import_prop_types44.default.number,
    labelStyle: import_prop_types44.default.object,
    max: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
    min: import_prop_types44.default.oneOfType([import_prop_types44.default.instanceOf(Date), import_prop_types44.default.number]),
    position: import_prop_types44.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types44.default.bool,
    scaleType: import_prop_types44.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types44.default.object,
    slots: import_prop_types44.default.object,
    stroke: import_prop_types44.default.string,
    tickFontSize: import_prop_types44.default.number,
    tickInterval: import_prop_types44.default.oneOfType([import_prop_types44.default.oneOf(["auto"]), import_prop_types44.default.array, import_prop_types44.default.func]),
    tickLabelInterval: import_prop_types44.default.oneOfType([import_prop_types44.default.oneOf(["auto"]), import_prop_types44.default.func]),
    tickLabelPlacement: import_prop_types44.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types44.default.object,
    tickMaxStep: import_prop_types44.default.number,
    tickMinStep: import_prop_types44.default.number,
    tickNumber: import_prop_types44.default.number,
    tickPlacement: import_prop_types44.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types44.default.number,
    valueFormatter: import_prop_types44.default.func
  }))
} : void 0;

// node_modules/@mui/x-charts/esm/ScatterChart/ScatterChart.js
init_extends();
var React77 = __toESM(require_react());
var import_prop_types47 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/ScatterChart/ScatterPlot.js
init_extends();
var React76 = __toESM(require_react());
var import_prop_types46 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/esm/ScatterChart/Scatter.js
init_extends();
var React75 = __toESM(require_react());
var import_prop_types45 = __toESM(require_prop_types());
var import_jsx_runtime59 = __toESM(require_jsx_runtime());
function Scatter(props) {
  const {
    series,
    xScale,
    yScale,
    color: color2,
    colorGetter,
    markerSize,
    onItemClick
  } = props;
  const highlightScope = React75.useMemo(() => _extends({
    highlighted: "item",
    faded: "global"
  }, series.highlightScope), [series.highlightScope]);
  const {
    item,
    useVoronoiInteraction
  } = React75.useContext(InteractionContext);
  const skipInteractionHandlers = useVoronoiInteraction || series.disableHover;
  const getInteractionItemProps = useInteractionItemProps(highlightScope, skipInteractionHandlers);
  const cleanData = React75.useMemo(() => {
    const getXPosition = getValueToPositionMapper(xScale);
    const getYPosition = getValueToPositionMapper(yScale);
    const xRange = xScale.range();
    const yRange = yScale.range();
    const minXRange = Math.min(...xRange);
    const maxXRange = Math.max(...xRange);
    const minYRange = Math.min(...yRange);
    const maxYRange = Math.max(...yRange);
    const temp = [];
    for (let i = 0; i < series.data.length; i += 1) {
      const scatterPoint = series.data[i];
      const x2 = getXPosition(scatterPoint.x);
      const y2 = getYPosition(scatterPoint.y);
      const isInRange = x2 >= minXRange && x2 <= maxXRange && y2 >= minYRange && y2 <= maxYRange;
      const pointCtx = {
        type: "scatter",
        seriesId: series.id,
        dataIndex: i
      };
      if (isInRange) {
        const isHighlighted = getIsHighlighted(item, pointCtx, highlightScope);
        temp.push({
          x: x2,
          y: y2,
          isHighlighted,
          isFaded: !isHighlighted && getIsFaded(item, pointCtx, highlightScope),
          interactionProps: getInteractionItemProps(pointCtx),
          id: scatterPoint.id,
          dataIndex: i,
          color: colorGetter ? colorGetter(i) : color2
        });
      }
    }
    return temp;
  }, [xScale, yScale, series.data, series.id, item, highlightScope, getInteractionItemProps, color2, colorGetter]);
  return (0, import_jsx_runtime59.jsx)("g", {
    children: cleanData.map((dataPoint) => (0, import_jsx_runtime59.jsx)("circle", _extends({
      cx: 0,
      cy: 0,
      r: (dataPoint.isHighlighted ? 1.2 : 1) * markerSize,
      transform: `translate(${dataPoint.x}, ${dataPoint.y})`,
      fill: dataPoint.color,
      opacity: dataPoint.isFaded && 0.3 || 1,
      onClick: onItemClick && ((event) => onItemClick(event, {
        type: "scatter",
        seriesId: series.id,
        dataIndex: dataPoint.dataIndex
      })),
      cursor: onItemClick ? "pointer" : "unset"
    }, dataPoint.interactionProps), dataPoint.id))
  });
}
true ? Scatter.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  color: import_prop_types45.default.string.isRequired,
  colorGetter: import_prop_types45.default.func,
  markerSize: import_prop_types45.default.number.isRequired,
  /**
   * Callback fired when clicking on a scatter item.
   * @param {MouseEvent} event Mouse event recorded on the `<svg/>` element.
   * @param {ScatterItemIdentifier} scatterItemIdentifier The scatter item identifier.
   */
  onItemClick: import_prop_types45.default.func,
  series: import_prop_types45.default.object.isRequired,
  xScale: import_prop_types45.default.func.isRequired,
  yScale: import_prop_types45.default.func.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/ScatterChart/ScatterPlot.js
var import_jsx_runtime60 = __toESM(require_jsx_runtime());
function ScatterPlot(props) {
  const {
    slots,
    slotProps,
    onItemClick
  } = props;
  const seriesData = React76.useContext(SeriesContext).scatter;
  const axisData = React76.useContext(CartesianContext);
  const {
    zAxis,
    zAxisIds
  } = React76.useContext(ZAxisContext);
  if (seriesData === void 0) {
    return null;
  }
  const {
    series,
    seriesOrder
  } = seriesData;
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = axisData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  const defaultZAxisId = zAxisIds[0];
  const ScatterItems = (slots == null ? void 0 : slots.scatter) ?? Scatter;
  return (0, import_jsx_runtime60.jsx)(React76.Fragment, {
    children: seriesOrder.map((seriesId) => {
      const {
        id,
        xAxisKey,
        yAxisKey,
        zAxisKey,
        markerSize,
        color: color2
      } = series[seriesId];
      const colorGetter = getColor3(series[seriesId], xAxis[xAxisKey ?? defaultXAxisId], yAxis[yAxisKey ?? defaultYAxisId], zAxis[zAxisKey ?? defaultZAxisId]);
      const xScale = xAxis[xAxisKey ?? defaultXAxisId].scale;
      const yScale = yAxis[yAxisKey ?? defaultYAxisId].scale;
      return (0, import_jsx_runtime60.jsx)(ScatterItems, _extends({
        xScale,
        yScale,
        color: color2,
        colorGetter,
        markerSize: markerSize ?? 4,
        series: series[seriesId],
        onItemClick
      }, slotProps == null ? void 0 : slotProps.scatter), id);
    })
  });
}
true ? ScatterPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when clicking on a scatter item.
   * @param {MouseEvent} event Mouse event recorded on the `<svg/>` element.
   * @param {ScatterItemIdentifier} scatterItemIdentifier The scatter item identifier.
   */
  onItemClick: import_prop_types46.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types46.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types46.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ScatterChart/ScatterChart.js
var import_jsx_runtime61 = __toESM(require_jsx_runtime());
var ScatterChart = React77.forwardRef(function ScatterChart2(props, ref) {
  const {
    xAxis,
    yAxis,
    zAxis,
    series,
    tooltip,
    axisHighlight,
    voronoiMaxRadius,
    disableVoronoi,
    legend,
    width,
    height,
    margin,
    colors: colors3,
    sx,
    grid,
    topAxis,
    leftAxis,
    rightAxis,
    bottomAxis,
    onItemClick,
    children,
    slots,
    slotProps,
    loading
  } = props;
  return (0, import_jsx_runtime61.jsx)(ResponsiveChartContainer, {
    ref,
    series: series.map((s2) => _extends({
      type: "scatter"
    }, s2)),
    width,
    height,
    margin,
    colors: colors3,
    xAxis,
    yAxis,
    sx,
    children: (0, import_jsx_runtime61.jsxs)(ZAxisContextProvider, {
      zAxis,
      children: [!disableVoronoi && (0, import_jsx_runtime61.jsx)(ChartsVoronoiHandler, {
        voronoiMaxRadius,
        onItemClick
      }), (0, import_jsx_runtime61.jsx)(ChartsAxis, {
        topAxis,
        leftAxis,
        rightAxis,
        bottomAxis,
        slots,
        slotProps
      }), grid && (0, import_jsx_runtime61.jsx)(ChartsGrid, {
        vertical: grid.vertical,
        horizontal: grid.horizontal
      }), (0, import_jsx_runtime61.jsx)(ScatterPlot, {
        slots,
        slotProps,
        onItemClick: disableVoronoi ? onItemClick : void 0
      }), (0, import_jsx_runtime61.jsx)(ChartsOverlay, {
        loading,
        slots,
        slotProps
      }), (0, import_jsx_runtime61.jsx)(ChartsLegend, _extends({}, legend, {
        slots,
        slotProps
      })), (0, import_jsx_runtime61.jsx)(ChartsAxisHighlight, _extends({
        x: "none",
        y: "none"
      }, axisHighlight)), !loading && (0, import_jsx_runtime61.jsx)(ChartsTooltip, _extends({
        trigger: "item"
      }, tooltip)), children]
    })
  });
});
true ? ScatterChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The configuration of axes highlight.
   * @see See {@link https://mui.com/x/react-charts/tooltip/#highlights highlight docs} for more details.
   * @default { x: 'none', y: 'none' }
   */
  axisHighlight: import_prop_types47.default.shape({
    x: import_prop_types47.default.oneOf(["band", "line", "none"]),
    y: import_prop_types47.default.oneOf(["band", "line", "none"])
  }),
  /**
   * Indicate which axis to display the bottom of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default xAxisIds[0] The id of the first provided axis
   */
  bottomAxis: import_prop_types47.default.oneOfType([import_prop_types47.default.object, import_prop_types47.default.string]),
  children: import_prop_types47.default.node,
  className: import_prop_types47.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types47.default.oneOfType([import_prop_types47.default.arrayOf(import_prop_types47.default.string), import_prop_types47.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types47.default.arrayOf(import_prop_types47.default.object),
  desc: import_prop_types47.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types47.default.bool,
  /**
   * If true, the interaction will not use the Voronoi cell and fall back to hover events.
   * @default false
   */
  disableVoronoi: import_prop_types47.default.bool,
  /**
   * Option to display a cartesian grid in the background.
   */
  grid: import_prop_types47.default.shape({
    horizontal: import_prop_types47.default.bool,
    vertical: import_prop_types47.default.bool
  }),
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types47.default.number,
  /**
   * Indicate which axis to display the left of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default yAxisIds[0] The id of the first provided axis
   */
  leftAxis: import_prop_types47.default.oneOfType([import_prop_types47.default.object, import_prop_types47.default.string]),
  /**
   * @deprecated Consider using `slotProps.legend` instead.
   */
  legend: import_prop_types47.default.shape({
    classes: import_prop_types47.default.object,
    direction: import_prop_types47.default.oneOf(["column", "row"]),
    hidden: import_prop_types47.default.bool,
    position: import_prop_types47.default.shape({
      horizontal: import_prop_types47.default.oneOf(["left", "middle", "right"]).isRequired,
      vertical: import_prop_types47.default.oneOf(["bottom", "middle", "top"]).isRequired
    }),
    slotProps: import_prop_types47.default.object,
    slots: import_prop_types47.default.object
  }),
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: import_prop_types47.default.bool,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types47.default.shape({
    bottom: import_prop_types47.default.number,
    left: import_prop_types47.default.number,
    right: import_prop_types47.default.number,
    top: import_prop_types47.default.number
  }),
  /**
   * Callback fired when clicking on a scatter item.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element if using Voronoi cells. Or the Mouse event from the scatter element, when `disableVoronoi=true`.
   * @param {ScatterItemIdentifier} scatterItemIdentifier The scatter item identifier.
   */
  onItemClick: import_prop_types47.default.func,
  /**
   * Indicate which axis to display the right of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  rightAxis: import_prop_types47.default.oneOfType([import_prop_types47.default.object, import_prop_types47.default.string]),
  /**
   * The series to display in the scatter chart.
   * An array of [[ScatterSeriesType]] objects.
   */
  series: import_prop_types47.default.arrayOf(import_prop_types47.default.object).isRequired,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types47.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types47.default.object,
  sx: import_prop_types47.default.oneOfType([import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.func, import_prop_types47.default.object, import_prop_types47.default.bool])), import_prop_types47.default.func, import_prop_types47.default.object]),
  title: import_prop_types47.default.string,
  /**
   * The configuration of the tooltip.
   * @see See {@link https://mui.com/x/react-charts/tooltip/ tooltip docs} for more details.
   * @default { trigger: 'item' }
   */
  tooltip: import_prop_types47.default.shape({
    axisContent: import_prop_types47.default.elementType,
    classes: import_prop_types47.default.object,
    itemContent: import_prop_types47.default.elementType,
    slotProps: import_prop_types47.default.object,
    slots: import_prop_types47.default.object,
    trigger: import_prop_types47.default.oneOf(["axis", "item", "none"])
  }),
  /**
   * Indicate which axis to display the top of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  topAxis: import_prop_types47.default.oneOfType([import_prop_types47.default.object, import_prop_types47.default.string]),
  viewBox: import_prop_types47.default.shape({
    height: import_prop_types47.default.number,
    width: import_prop_types47.default.number,
    x: import_prop_types47.default.number,
    y: import_prop_types47.default.number
  }),
  /**
   * Defines the maximal distance between a scatter point and the pointer that triggers the interaction.
   * If `undefined`, the radius is assumed to be infinite.
   */
  voronoiMaxRadius: import_prop_types47.default.number,
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types47.default.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types47.default.arrayOf(import_prop_types47.default.shape({
    axisId: import_prop_types47.default.oneOfType([import_prop_types47.default.number, import_prop_types47.default.string]),
    classes: import_prop_types47.default.object,
    colorMap: import_prop_types47.default.oneOfType([import_prop_types47.default.shape({
      colors: import_prop_types47.default.arrayOf(import_prop_types47.default.string).isRequired,
      type: import_prop_types47.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types47.default.string,
      values: import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number, import_prop_types47.default.string]).isRequired)
    }), import_prop_types47.default.shape({
      color: import_prop_types47.default.oneOfType([import_prop_types47.default.arrayOf(import_prop_types47.default.string.isRequired), import_prop_types47.default.func]).isRequired,
      max: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
      min: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
      type: import_prop_types47.default.oneOf(["continuous"]).isRequired
    }), import_prop_types47.default.shape({
      colors: import_prop_types47.default.arrayOf(import_prop_types47.default.string).isRequired,
      thresholds: import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]).isRequired).isRequired,
      type: import_prop_types47.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types47.default.array,
    dataKey: import_prop_types47.default.string,
    disableLine: import_prop_types47.default.bool,
    disableTicks: import_prop_types47.default.bool,
    fill: import_prop_types47.default.string,
    hideTooltip: import_prop_types47.default.bool,
    id: import_prop_types47.default.oneOfType([import_prop_types47.default.number, import_prop_types47.default.string]),
    label: import_prop_types47.default.string,
    labelFontSize: import_prop_types47.default.number,
    labelStyle: import_prop_types47.default.object,
    max: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
    min: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
    position: import_prop_types47.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types47.default.bool,
    scaleType: import_prop_types47.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types47.default.object,
    slots: import_prop_types47.default.object,
    stroke: import_prop_types47.default.string,
    tickFontSize: import_prop_types47.default.number,
    tickInterval: import_prop_types47.default.oneOfType([import_prop_types47.default.oneOf(["auto"]), import_prop_types47.default.array, import_prop_types47.default.func]),
    tickLabelInterval: import_prop_types47.default.oneOfType([import_prop_types47.default.oneOf(["auto"]), import_prop_types47.default.func]),
    tickLabelPlacement: import_prop_types47.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types47.default.object,
    tickMaxStep: import_prop_types47.default.number,
    tickMinStep: import_prop_types47.default.number,
    tickNumber: import_prop_types47.default.number,
    tickPlacement: import_prop_types47.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types47.default.number,
    valueFormatter: import_prop_types47.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types47.default.arrayOf(import_prop_types47.default.shape({
    axisId: import_prop_types47.default.oneOfType([import_prop_types47.default.number, import_prop_types47.default.string]),
    classes: import_prop_types47.default.object,
    colorMap: import_prop_types47.default.oneOfType([import_prop_types47.default.shape({
      colors: import_prop_types47.default.arrayOf(import_prop_types47.default.string).isRequired,
      type: import_prop_types47.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types47.default.string,
      values: import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number, import_prop_types47.default.string]).isRequired)
    }), import_prop_types47.default.shape({
      color: import_prop_types47.default.oneOfType([import_prop_types47.default.arrayOf(import_prop_types47.default.string.isRequired), import_prop_types47.default.func]).isRequired,
      max: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
      min: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
      type: import_prop_types47.default.oneOf(["continuous"]).isRequired
    }), import_prop_types47.default.shape({
      colors: import_prop_types47.default.arrayOf(import_prop_types47.default.string).isRequired,
      thresholds: import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]).isRequired).isRequired,
      type: import_prop_types47.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types47.default.array,
    dataKey: import_prop_types47.default.string,
    disableLine: import_prop_types47.default.bool,
    disableTicks: import_prop_types47.default.bool,
    fill: import_prop_types47.default.string,
    hideTooltip: import_prop_types47.default.bool,
    id: import_prop_types47.default.oneOfType([import_prop_types47.default.number, import_prop_types47.default.string]),
    label: import_prop_types47.default.string,
    labelFontSize: import_prop_types47.default.number,
    labelStyle: import_prop_types47.default.object,
    max: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
    min: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
    position: import_prop_types47.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types47.default.bool,
    scaleType: import_prop_types47.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types47.default.object,
    slots: import_prop_types47.default.object,
    stroke: import_prop_types47.default.string,
    tickFontSize: import_prop_types47.default.number,
    tickInterval: import_prop_types47.default.oneOfType([import_prop_types47.default.oneOf(["auto"]), import_prop_types47.default.array, import_prop_types47.default.func]),
    tickLabelInterval: import_prop_types47.default.oneOfType([import_prop_types47.default.oneOf(["auto"]), import_prop_types47.default.func]),
    tickLabelPlacement: import_prop_types47.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types47.default.object,
    tickMaxStep: import_prop_types47.default.number,
    tickMinStep: import_prop_types47.default.number,
    tickNumber: import_prop_types47.default.number,
    tickPlacement: import_prop_types47.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types47.default.number,
    valueFormatter: import_prop_types47.default.func
  })),
  /**
   * The configuration of the z-axes.
   */
  zAxis: import_prop_types47.default.arrayOf(import_prop_types47.default.shape({
    colorMap: import_prop_types47.default.oneOfType([import_prop_types47.default.shape({
      colors: import_prop_types47.default.arrayOf(import_prop_types47.default.string).isRequired,
      type: import_prop_types47.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types47.default.string,
      values: import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number, import_prop_types47.default.string]).isRequired)
    }), import_prop_types47.default.shape({
      color: import_prop_types47.default.oneOfType([import_prop_types47.default.arrayOf(import_prop_types47.default.string.isRequired), import_prop_types47.default.func]).isRequired,
      max: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
      min: import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]),
      type: import_prop_types47.default.oneOf(["continuous"]).isRequired
    }), import_prop_types47.default.shape({
      colors: import_prop_types47.default.arrayOf(import_prop_types47.default.string).isRequired,
      thresholds: import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.instanceOf(Date), import_prop_types47.default.number]).isRequired).isRequired,
      type: import_prop_types47.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types47.default.array,
    dataKey: import_prop_types47.default.string,
    id: import_prop_types47.default.string
  }))
} : void 0;

// node_modules/@mui/x-charts/esm/SparkLineChart/SparkLineChart.js
init_extends();
var React78 = __toESM(require_react());
var import_prop_types48 = __toESM(require_prop_types());
var import_jsx_runtime62 = __toESM(require_jsx_runtime());
var SPARKLINE_DEFAULT_MARGIN = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5
};
var SparkLineChart = React78.forwardRef(function SparkLineChart2(props, ref) {
  const {
    xAxis,
    width,
    height,
    margin = SPARKLINE_DEFAULT_MARGIN,
    colors: colors3,
    sx,
    showTooltip,
    tooltip,
    showHighlight,
    axisHighlight: inAxisHighlight,
    children,
    slots,
    slotProps,
    data,
    plotType = "line",
    valueFormatter = (value) => value === null ? "" : value.toString(),
    area,
    curve = "linear"
  } = props;
  const defaultXHighlight = showHighlight && plotType === "bar" ? {
    x: "band"
  } : {
    x: "none"
  };
  const axisHighlight = _extends({}, defaultXHighlight, inAxisHighlight);
  return (0, import_jsx_runtime62.jsxs)(ResponsiveChartContainer, {
    ref,
    series: [_extends({
      type: plotType,
      data,
      valueFormatter
    }, plotType === "bar" ? {} : {
      area,
      curve,
      disableHighlight: !showHighlight
    })],
    width,
    height,
    margin,
    xAxis: [_extends({
      id: DEFAULT_X_AXIS_KEY,
      scaleType: plotType === "bar" ? "band" : "point",
      data: Array.from({
        length: data.length
      }, (_, index2) => index2),
      hideTooltip: xAxis === void 0
    }, xAxis)],
    colors: colors3,
    sx,
    disableAxisListener: (!showTooltip || (tooltip == null ? void 0 : tooltip.trigger) !== "axis") && (axisHighlight == null ? void 0 : axisHighlight.x) === "none" && (axisHighlight == null ? void 0 : axisHighlight.y) === "none",
    children: [plotType === "bar" && (0, import_jsx_runtime62.jsx)(BarPlot, {
      skipAnimation: true,
      slots,
      slotProps,
      sx: {
        shapeRendering: "auto"
      }
    }), plotType === "line" && (0, import_jsx_runtime62.jsxs)(React78.Fragment, {
      children: [(0, import_jsx_runtime62.jsx)(AreaPlot, {
        skipAnimation: true,
        slots,
        slotProps
      }), (0, import_jsx_runtime62.jsx)(LinePlot, {
        skipAnimation: true,
        slots,
        slotProps
      }), (0, import_jsx_runtime62.jsx)(LineHighlightPlot, {
        slots,
        slotProps
      })]
    }), (0, import_jsx_runtime62.jsx)(ChartsAxisHighlight, _extends({}, axisHighlight)), showTooltip && (0, import_jsx_runtime62.jsx)(ChartsTooltip, _extends({}, tooltip, {
      slotProps,
      slots
    })), children]
  });
});
true ? SparkLineChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Set to `true` to fill spark line area.
   * Has no effect if plotType='bar'.
   * @default false
   */
  area: import_prop_types48.default.bool,
  axisHighlight: import_prop_types48.default.shape({
    x: import_prop_types48.default.oneOf(["band", "line", "none"]),
    y: import_prop_types48.default.oneOf(["band", "line", "none"])
  }),
  children: import_prop_types48.default.node,
  className: import_prop_types48.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.string), import_prop_types48.default.func]),
  /**
   * @default 'linear'
   */
  curve: import_prop_types48.default.oneOf(["catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"]),
  /**
   * Data to plot.
   */
  data: import_prop_types48.default.arrayOf(import_prop_types48.default.number).isRequired,
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types48.default.arrayOf(import_prop_types48.default.object),
  desc: import_prop_types48.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types48.default.bool,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types48.default.number,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default {
   *   top: 5,
   *   bottom: 5,
   *   left: 5,
   *   right: 5,
   * }
   */
  margin: import_prop_types48.default.shape({
    bottom: import_prop_types48.default.number,
    left: import_prop_types48.default.number,
    right: import_prop_types48.default.number,
    top: import_prop_types48.default.number
  }),
  /**
   * Type of plot used.
   * @default 'line'
   */
  plotType: import_prop_types48.default.oneOf(["bar", "line"]),
  /**
   * Set to `true` to highlight the value.
   * With line, it shows a point.
   * With bar, it shows a highlight band.
   * @default false
   */
  showHighlight: import_prop_types48.default.bool,
  /**
   * Set to `true` to enable the tooltip in the sparkline.
   * @default false
   */
  showTooltip: import_prop_types48.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types48.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types48.default.object,
  sx: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.oneOfType([import_prop_types48.default.func, import_prop_types48.default.object, import_prop_types48.default.bool])), import_prop_types48.default.func, import_prop_types48.default.object]),
  title: import_prop_types48.default.string,
  tooltip: import_prop_types48.default.shape({
    axisContent: import_prop_types48.default.elementType,
    classes: import_prop_types48.default.object,
    itemContent: import_prop_types48.default.elementType,
    slotProps: import_prop_types48.default.object,
    slots: import_prop_types48.default.object,
    trigger: import_prop_types48.default.oneOf(["axis", "item", "none"])
  }),
  /**
   * Formatter used by the tooltip.
   * @param {number} value The value to format.
   * @returns {string} the formatted value.
   * @default (value: number | null) => (value === null ? '' : value.toString())
   */
  valueFormatter: import_prop_types48.default.func,
  viewBox: import_prop_types48.default.shape({
    height: import_prop_types48.default.number,
    width: import_prop_types48.default.number,
    x: import_prop_types48.default.number,
    y: import_prop_types48.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types48.default.number,
  /**
   * The xAxis configuration.
   * Notice it is a single configuration object, not an array of configuration.
   */
  xAxis: import_prop_types48.default.shape({
    axisId: import_prop_types48.default.oneOfType([import_prop_types48.default.number, import_prop_types48.default.string]),
    classes: import_prop_types48.default.object,
    colorMap: import_prop_types48.default.oneOfType([import_prop_types48.default.shape({
      colors: import_prop_types48.default.arrayOf(import_prop_types48.default.string).isRequired,
      type: import_prop_types48.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types48.default.string,
      values: import_prop_types48.default.arrayOf(import_prop_types48.default.oneOfType([import_prop_types48.default.instanceOf(Date), import_prop_types48.default.number, import_prop_types48.default.string]).isRequired)
    }), import_prop_types48.default.shape({
      color: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.string.isRequired), import_prop_types48.default.func]).isRequired,
      max: import_prop_types48.default.oneOfType([import_prop_types48.default.instanceOf(Date), import_prop_types48.default.number]),
      min: import_prop_types48.default.oneOfType([import_prop_types48.default.instanceOf(Date), import_prop_types48.default.number]),
      type: import_prop_types48.default.oneOf(["continuous"]).isRequired
    }), import_prop_types48.default.shape({
      colors: import_prop_types48.default.arrayOf(import_prop_types48.default.string).isRequired,
      thresholds: import_prop_types48.default.arrayOf(import_prop_types48.default.oneOfType([import_prop_types48.default.instanceOf(Date), import_prop_types48.default.number]).isRequired).isRequired,
      type: import_prop_types48.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types48.default.array,
    dataKey: import_prop_types48.default.string,
    disableLine: import_prop_types48.default.bool,
    disableTicks: import_prop_types48.default.bool,
    fill: import_prop_types48.default.string,
    hideTooltip: import_prop_types48.default.bool,
    id: import_prop_types48.default.oneOfType([import_prop_types48.default.number, import_prop_types48.default.string]),
    label: import_prop_types48.default.string,
    labelFontSize: import_prop_types48.default.number,
    labelStyle: import_prop_types48.default.object,
    max: import_prop_types48.default.oneOfType([import_prop_types48.default.instanceOf(Date), import_prop_types48.default.number]),
    min: import_prop_types48.default.oneOfType([import_prop_types48.default.instanceOf(Date), import_prop_types48.default.number]),
    position: import_prop_types48.default.oneOf(["bottom", "left", "right", "top"]),
    reverse: import_prop_types48.default.bool,
    scaleType: import_prop_types48.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types48.default.object,
    slots: import_prop_types48.default.object,
    stroke: import_prop_types48.default.string,
    tickFontSize: import_prop_types48.default.number,
    tickInterval: import_prop_types48.default.oneOfType([import_prop_types48.default.oneOf(["auto"]), import_prop_types48.default.array, import_prop_types48.default.func]),
    tickLabelInterval: import_prop_types48.default.oneOfType([import_prop_types48.default.oneOf(["auto"]), import_prop_types48.default.func]),
    tickLabelPlacement: import_prop_types48.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types48.default.object,
    tickMaxStep: import_prop_types48.default.number,
    tickMinStep: import_prop_types48.default.number,
    tickNumber: import_prop_types48.default.number,
    tickPlacement: import_prop_types48.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types48.default.number,
    valueFormatter: import_prop_types48.default.func
  })
} : void 0;

// node_modules/@mui/x-charts/esm/Gauge/Gauge.js
init_extends();
init_objectWithoutPropertiesLoose();
var React84 = __toESM(require_react());
var import_prop_types51 = __toESM(require_prop_types());
init_composeClasses();

// node_modules/@mui/x-charts/esm/Gauge/GaugeContainer.js
init_extends();
init_objectWithoutPropertiesLoose();
var React80 = __toESM(require_react());
var import_prop_types49 = __toESM(require_prop_types());
init_useForkRef();

// node_modules/@mui/x-charts/esm/Gauge/GaugeProvider.js
var React79 = __toESM(require_react());

// node_modules/@mui/x-charts/esm/Gauge/utils.js
function deg2rad(angle) {
  return Math.PI * angle / 180;
}
function getPoint(angle) {
  const radAngle = deg2rad(angle);
  return [Math.sin(radAngle), -Math.cos(radAngle)];
}
function getArcRatios(startAngle, endAngle) {
  const points = [[0, 0], getPoint(startAngle), getPoint(endAngle)];
  const minAngle = Math.min(startAngle, endAngle);
  const maxAngle = Math.max(startAngle, endAngle);
  const initialAngle = Math.floor(minAngle / 90) * 90;
  for (let step = 1; step <= 4; step += 1) {
    const cardinalAngle = initialAngle + step * 90;
    if (cardinalAngle < maxAngle) {
      points.push(getPoint(cardinalAngle));
    }
  }
  const minX = Math.min(...points.map(([x2]) => x2));
  const maxX = Math.max(...points.map(([x2]) => x2));
  const minY = Math.min(...points.map(([, y2]) => y2));
  const maxY = Math.max(...points.map(([, y2]) => y2));
  return {
    cx: -minX / (maxX - minX),
    cy: -minY / (maxY - minY),
    minX,
    maxX,
    minY,
    maxY
  };
}
function getAvailableRadius(cx, cy, width, height, {
  minX,
  maxX,
  minY,
  maxY
}) {
  return Math.min(...[{
    ratio: Math.abs(minX),
    space: cx
  }, {
    ratio: Math.abs(maxX),
    space: width - cx
  }, {
    ratio: Math.abs(minY),
    space: cy
  }, {
    ratio: Math.abs(maxY),
    space: height - cy
  }].map(({
    ratio,
    space
  }) => {
    if (ratio < 1e-5) {
      return Infinity;
    }
    return space / ratio;
  }));
}

// node_modules/@mui/x-charts/esm/Gauge/GaugeProvider.js
var import_jsx_runtime63 = __toESM(require_jsx_runtime());
var GaugeContext = React79.createContext({
  value: null,
  valueMin: 0,
  valueMax: 0,
  startAngle: 0,
  endAngle: 0,
  innerRadius: 0,
  outerRadius: 0,
  cornerRadius: 0,
  cx: 0,
  cy: 0,
  maxRadius: 0,
  valueAngle: null
});
if (true) {
  GaugeContext.displayName = "GaugeContext";
}
function GaugeProvider(props) {
  const {
    value = null,
    valueMin = 0,
    valueMax = 100,
    startAngle = 0,
    endAngle = 360,
    outerRadius: outerRadiusParam,
    innerRadius: innerRadiusParam,
    cornerRadius: cornerRadiusParam,
    cx: cxParam,
    cy: cyParam,
    children
  } = props;
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const ratios = getArcRatios(startAngle, endAngle);
  const innerCx = cxParam ? getPercentageValue(cxParam, width) : ratios.cx * width;
  const innerCy = cyParam ? getPercentageValue(cyParam, height) : ratios.cy * height;
  let cx = left + innerCx;
  let cy = top + innerCy;
  const maxRadius = getAvailableRadius(innerCx, innerCy, width, height, ratios);
  if (cxParam === void 0) {
    const usedWidth = maxRadius * (ratios.maxX - ratios.minX);
    cx = left + (width - usedWidth) / 2 + ratios.cx * usedWidth;
  }
  if (cyParam === void 0) {
    const usedHeight = maxRadius * (ratios.maxY - ratios.minY);
    cy = top + (height - usedHeight) / 2 + ratios.cy * usedHeight;
  }
  const outerRadius = getPercentageValue(outerRadiusParam ?? maxRadius, maxRadius);
  const innerRadius = getPercentageValue(innerRadiusParam ?? "80%", maxRadius);
  const cornerRadius = getPercentageValue(cornerRadiusParam ?? 0, outerRadius - innerRadius);
  const contextValue = React79.useMemo(() => {
    const startAngleRad = Math.PI * startAngle / 180;
    const endAngleRad = Math.PI * endAngle / 180;
    return {
      value,
      valueMin,
      valueMax,
      startAngle: startAngleRad,
      endAngle: endAngleRad,
      outerRadius,
      innerRadius,
      cornerRadius,
      cx,
      cy,
      maxRadius,
      valueAngle: value === null ? null : startAngleRad + (endAngleRad - startAngleRad) * (value - valueMin) / (valueMax - valueMin)
    };
  }, [value, valueMin, valueMax, startAngle, endAngle, outerRadius, innerRadius, cornerRadius, cx, cy, maxRadius]);
  return (0, import_jsx_runtime63.jsx)(GaugeContext.Provider, {
    value: contextValue,
    children
  });
}
function useGaugeState() {
  return React79.useContext(GaugeContext);
}

// node_modules/@mui/x-charts/esm/Gauge/GaugeContainer.js
var import_jsx_runtime64 = __toESM(require_jsx_runtime());
var _excluded33 = ["width", "height", "margin", "title", "desc", "value", "valueMin", "valueMax", "startAngle", "endAngle", "outerRadius", "innerRadius", "cornerRadius", "cx", "cy", "children"];
var ResizableContainer2 = styled_default("div", {
  name: "MuiGauge",
  slot: "Container"
})(({
  ownerState,
  theme
}) => ({
  width: ownerState.width ?? "100%",
  height: ownerState.height ?? "100%",
  display: "flex",
  position: "relative",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&>svg": {
    width: "100%",
    height: "100%"
  },
  "& text": {
    fill: (theme.vars || theme).palette.text.primary
  }
}));
var GaugeContainer = React80.forwardRef(function GaugeContainer2(props, ref) {
  const {
    width: inWidth,
    height: inHeight,
    margin,
    title,
    desc,
    value,
    valueMin = 0,
    valueMax = 100,
    startAngle,
    endAngle,
    outerRadius,
    innerRadius,
    cornerRadius,
    cx,
    cy,
    children
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded33);
  const [containerRef, width, height] = useChartContainerDimensions(inWidth, inHeight);
  const svgRef = React80.useRef(null);
  const handleRef = useForkRef(ref, svgRef);
  return (0, import_jsx_runtime64.jsx)(ResizableContainer2, _extends({
    ref: containerRef,
    ownerState: {
      width: inWidth,
      height: inHeight
    },
    role: "meter",
    "aria-valuenow": value === null ? void 0 : value,
    "aria-valuemin": valueMin,
    "aria-valuemax": valueMax
  }, other, {
    children: width && height ? (0, import_jsx_runtime64.jsx)(DrawingProvider, {
      width,
      height,
      margin: _extends({
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }, margin),
      svgRef,
      children: (0, import_jsx_runtime64.jsx)(GaugeProvider, {
        value,
        valueMin,
        valueMax,
        startAngle,
        endAngle,
        outerRadius,
        innerRadius,
        cornerRadius,
        cx,
        cy,
        children: (0, import_jsx_runtime64.jsx)(ChartsSurface, {
          width,
          height,
          ref: handleRef,
          title,
          desc,
          disableAxisListener: true,
          "aria-hidden": "true",
          children
        })
      })
    }) : null
  }));
});
true ? GaugeContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types49.default.node,
  className: import_prop_types49.default.string,
  /**
   * The radius applied to arc corners (similar to border radius).
   * Set it to '50%' to get rounded arc.
   * @default 0
   */
  cornerRadius: import_prop_types49.default.oneOfType([import_prop_types49.default.number, import_prop_types49.default.string]),
  /**
   * The x coordinate of the arc center.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the width the drawing area.
   */
  cx: import_prop_types49.default.oneOfType([import_prop_types49.default.number, import_prop_types49.default.string]),
  /**
   * The y coordinate of the arc center.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the height the drawing area.
   */
  cy: import_prop_types49.default.oneOfType([import_prop_types49.default.number, import_prop_types49.default.string]),
  desc: import_prop_types49.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types49.default.bool,
  /**
   * The end angle (deg).
   * @default 360
   */
  endAngle: import_prop_types49.default.number,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types49.default.number,
  /**
   * The radius between circle center and the beginning of the arc.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the maximal radius that fit into the drawing area.
   * @default '80%'
   */
  innerRadius: import_prop_types49.default.oneOfType([import_prop_types49.default.number, import_prop_types49.default.string]),
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types49.default.shape({
    bottom: import_prop_types49.default.number,
    left: import_prop_types49.default.number,
    right: import_prop_types49.default.number,
    top: import_prop_types49.default.number
  }),
  /**
   * The radius between circle center and the end of the arc.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the maximal radius that fit into the drawing area.
   * @default '100%'
   */
  outerRadius: import_prop_types49.default.oneOfType([import_prop_types49.default.number, import_prop_types49.default.string]),
  /**
   * The start angle (deg).
   * @default 0
   */
  startAngle: import_prop_types49.default.number,
  sx: import_prop_types49.default.oneOfType([import_prop_types49.default.arrayOf(import_prop_types49.default.oneOfType([import_prop_types49.default.func, import_prop_types49.default.object, import_prop_types49.default.bool])), import_prop_types49.default.func, import_prop_types49.default.object]),
  title: import_prop_types49.default.string,
  /**
   * The value of the gauge.
   * Set to `null` to not display a value.
   */
  value: import_prop_types49.default.number,
  /**
   * The maximal value of the gauge.
   * @default 100
   */
  valueMax: import_prop_types49.default.number,
  /**
   * The minimal value of the gauge.
   * @default 0
   */
  valueMin: import_prop_types49.default.number,
  viewBox: import_prop_types49.default.shape({
    height: import_prop_types49.default.number,
    width: import_prop_types49.default.number,
    x: import_prop_types49.default.number,
    y: import_prop_types49.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types49.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/Gauge/GaugeValueArc.js
init_extends();
var React81 = __toESM(require_react());
var import_jsx_runtime65 = __toESM(require_jsx_runtime());
var StyledPath = styled_default("path", {
  name: "MuiGauge",
  slot: "ReferenceArc",
  overridesResolver: (props, styles) => styles.referenceArc
})(({
  theme
}) => ({
  fill: (theme.vars || theme).palette.primary.main
}));
function GaugeValueArc(props) {
  const {
    value,
    valueMin,
    valueMax,
    startAngle,
    endAngle,
    outerRadius,
    innerRadius,
    cornerRadius,
    cx,
    cy
  } = useGaugeState();
  if (value === null) {
    return null;
  }
  const valueAngle = startAngle + (value - valueMin) / (valueMax - valueMin) * (endAngle - startAngle);
  return (0, import_jsx_runtime65.jsx)(StyledPath, _extends({
    transform: `translate(${cx}, ${cy})`,
    d: arc_default().cornerRadius(cornerRadius)({
      startAngle,
      endAngle: valueAngle,
      innerRadius,
      outerRadius
    })
  }, props));
}

// node_modules/@mui/x-charts/esm/Gauge/GaugeReferenceArc.js
init_extends();
var React82 = __toESM(require_react());
var import_jsx_runtime66 = __toESM(require_jsx_runtime());
var StyledPath2 = styled_default("path", {
  name: "MuiGauge",
  slot: "ReferenceArc",
  overridesResolver: (props, styles) => styles.referenceArc
})(({
  theme
}) => ({
  fill: (theme.vars || theme).palette.divider
}));
function GaugeReferenceArc(props) {
  const {
    startAngle,
    endAngle,
    outerRadius,
    innerRadius,
    cornerRadius,
    cx,
    cy
  } = useGaugeState();
  return (0, import_jsx_runtime66.jsx)(StyledPath2, _extends({
    transform: `translate(${cx}, ${cy})`,
    d: arc_default().cornerRadius(cornerRadius)({
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    })
  }, props));
}

// node_modules/@mui/x-charts/esm/Gauge/gaugeClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getGaugeUtilityClass(slot) {
  return generateUtilityClass("MuiGauge", slot);
}
var gaugeClasses = generateUtilityClasses("MuiGauge", ["root", "valueArc", "referenceArc", "valueText"]);

// node_modules/@mui/x-charts/esm/Gauge/GaugeValueText.js
init_extends();
init_objectWithoutPropertiesLoose();
var React83 = __toESM(require_react());
var import_prop_types50 = __toESM(require_prop_types());
var import_jsx_runtime67 = __toESM(require_jsx_runtime());
var _excluded34 = ["text", "className"];
function defaultFormatter({
  value
}) {
  return value === null ? null : value.toLocaleString();
}
function GaugeValueText(props) {
  const {
    text = defaultFormatter,
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded34);
  const {
    value,
    valueMin,
    valueMax,
    cx,
    cy
  } = useGaugeState();
  const formattedText = typeof text === "function" ? text({
    value,
    valueMin,
    valueMax
  }) : text;
  if (formattedText === null) {
    return null;
  }
  return (0, import_jsx_runtime67.jsx)("g", {
    className,
    children: (0, import_jsx_runtime67.jsx)(ChartsText, _extends({
      x: cx,
      y: cy,
      text: formattedText,
      style: {
        textAnchor: "middle",
        dominantBaseline: "central"
      }
    }, other))
  });
}
true ? GaugeValueText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Height of a text line (in `em`).
   */
  lineHeight: import_prop_types50.default.number,
  /**
   * If `true`, the line width is computed.
   * @default false
   */
  needsComputation: import_prop_types50.default.bool,
  ownerState: import_prop_types50.default.any,
  /**
   * Style applied to text elements.
   */
  style: import_prop_types50.default.object,
  text: import_prop_types50.default.oneOfType([import_prop_types50.default.func, import_prop_types50.default.string])
} : void 0;

// node_modules/@mui/x-charts/esm/Gauge/Gauge.js
var import_jsx_runtime68 = __toESM(require_jsx_runtime());
var _excluded35 = ["text", "children", "classes"];
var useUtilityClasses15 = (props) => {
  const {
    classes
  } = props;
  const slots = {
    root: ["root"],
    valueArc: ["valueArc"],
    referenceArc: ["referenceArc"],
    valueText: ["valueText"]
  };
  return composeClasses(slots, getGaugeUtilityClass, classes);
};
function Gauge(props) {
  const {
    text,
    children
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded35);
  const classes = useUtilityClasses15(props);
  return (0, import_jsx_runtime68.jsxs)(GaugeContainer, _extends({}, other, {
    className: classes.root,
    children: [(0, import_jsx_runtime68.jsx)(GaugeReferenceArc, {
      className: classes.referenceArc
    }), (0, import_jsx_runtime68.jsx)(GaugeValueArc, {
      className: classes.valueArc
    }), (0, import_jsx_runtime68.jsx)(GaugeValueText, {
      className: classes.valueText,
      text
    }), children]
  }));
}
true ? Gauge.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types51.default.node,
  classes: import_prop_types51.default.object,
  className: import_prop_types51.default.string,
  /**
   * The radius applied to arc corners (similar to border radius).
   * Set it to '50%' to get rounded arc.
   * @default 0
   */
  cornerRadius: import_prop_types51.default.oneOfType([import_prop_types51.default.number, import_prop_types51.default.string]),
  /**
   * The x coordinate of the arc center.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the width the drawing area.
   */
  cx: import_prop_types51.default.oneOfType([import_prop_types51.default.number, import_prop_types51.default.string]),
  /**
   * The y coordinate of the arc center.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the height the drawing area.
   */
  cy: import_prop_types51.default.oneOfType([import_prop_types51.default.number, import_prop_types51.default.string]),
  desc: import_prop_types51.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types51.default.bool,
  /**
   * The end angle (deg).
   * @default 360
   */
  endAngle: import_prop_types51.default.number,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types51.default.number,
  /**
   * The radius between circle center and the beginning of the arc.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the maximal radius that fit into the drawing area.
   * @default '80%'
   */
  innerRadius: import_prop_types51.default.oneOfType([import_prop_types51.default.number, import_prop_types51.default.string]),
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types51.default.shape({
    bottom: import_prop_types51.default.number,
    left: import_prop_types51.default.number,
    right: import_prop_types51.default.number,
    top: import_prop_types51.default.number
  }),
  /**
   * The radius between circle center and the end of the arc.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the maximal radius that fit into the drawing area.
   * @default '100%'
   */
  outerRadius: import_prop_types51.default.oneOfType([import_prop_types51.default.number, import_prop_types51.default.string]),
  /**
   * The start angle (deg).
   * @default 0
   */
  startAngle: import_prop_types51.default.number,
  sx: import_prop_types51.default.oneOfType([import_prop_types51.default.arrayOf(import_prop_types51.default.oneOfType([import_prop_types51.default.func, import_prop_types51.default.object, import_prop_types51.default.bool])), import_prop_types51.default.func, import_prop_types51.default.object]),
  text: import_prop_types51.default.oneOfType([import_prop_types51.default.func, import_prop_types51.default.string]),
  title: import_prop_types51.default.string,
  /**
   * The value of the gauge.
   * Set to `null` to not display a value.
   */
  value: import_prop_types51.default.number,
  /**
   * The maximal value of the gauge.
   * @default 100
   */
  valueMax: import_prop_types51.default.number,
  /**
   * The minimal value of the gauge.
   * @default 0
   */
  valueMin: import_prop_types51.default.number,
  viewBox: import_prop_types51.default.shape({
    height: import_prop_types51.default.number,
    width: import_prop_types51.default.number,
    x: import_prop_types51.default.number,
    y: import_prop_types51.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types51.default.number
} : void 0;
export {
  AnimatedArea,
  AnimatedLine,
  AreaElement,
  AreaElementPath,
  AreaPlot,
  BarChart,
  BarElement,
  BarElementPath,
  BarLabel,
  BarPlot,
  ChartContainer,
  ChartsAxis,
  ChartsAxisHighlight,
  ChartsAxisHighlightPath,
  ChartsAxisTooltipContent,
  ChartsClipPath,
  ChartsGrid,
  ChartsItemTooltipContent,
  ChartsLegend,
  ChartsLegendRoot,
  ChartsOnAxisClickHandler,
  ChartsReferenceLine,
  ChartsSurface,
  ChartsText,
  ChartsTooltip,
  ChartsVoronoiHandler,
  ChartsXAxis,
  ChartsYAxis,
  DEFAULT_MARGINS,
  DEFAULT_X_AXIS_KEY,
  DEFAULT_Y_AXIS_KEY,
  DefaultChartsAxisTooltipContent,
  DefaultChartsItemTooltipContent,
  DefaultChartsLegend,
  Gauge,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  GaugeValueText,
  LineChart,
  LineElement,
  LineElementPath,
  LineHighlightElement,
  LineHighlightPlot,
  LinePlot,
  MarkElement,
  MarkPlot,
  PieArc,
  PieArcLabel,
  PieArcLabelPlot,
  PieArcPlot,
  PieChart,
  PiePlot,
  ResponsiveChartContainer,
  Scatter,
  ScatterChart,
  ScatterPlot,
  SparkLineChart,
  ZAxisContextProvider,
  areaElementClasses,
  axisClasses,
  barElementClasses,
  barLabelClasses,
  blueberryTwilightPalette,
  blueberryTwilightPaletteDark,
  blueberryTwilightPaletteLight,
  chartsAxisHighlightClasses,
  chartsGridClasses,
  chartsTooltipClasses,
  cheerfulFiestaPalette,
  cheerfulFiestaPaletteDark,
  cheerfulFiestaPaletteLight,
  gaugeClasses,
  getAreaElementUtilityClass,
  getAxisHighlightUtilityClass,
  getAxisUtilityClass,
  getBarElementUtilityClass,
  getBarLabelUtilityClass,
  getChartsGridUtilityClass,
  getChartsTooltipUtilityClass,
  getGaugeUtilityClass,
  getHighlightElementUtilityClass,
  getLegendUtilityClass,
  getLineElementUtilityClass,
  getMarkElementUtilityClass,
  getPieArcLabelUtilityClass,
  getPieArcUtilityClass,
  getPieCoordinates,
  getReferenceLineUtilityClass,
  getSeriesToDisplay,
  getValueToPositionMapper,
  isBarSeries,
  isDefaultizedBarSeries,
  legendClasses,
  lineElementClasses,
  lineHighlightElementClasses,
  mangoFusionPalette,
  mangoFusionPaletteDark,
  mangoFusionPaletteLight,
  markElementClasses,
  pieArcClasses,
  pieArcLabelClasses,
  referenceLineClasses,
  useBarSeries as unstable_useBarSeries,
  useLineSeries as unstable_useLineSeries,
  usePieSeries as unstable_usePieSeries,
  useScatterSeries as unstable_useScatterSeries,
  useSeries as unstable_useSeries,
  useChartId,
  useDrawingArea,
  useGaugeState,
  useSvgRef,
  useXScale,
  useYScale
};
//# sourceMappingURL=@mui_x-charts.js.map
