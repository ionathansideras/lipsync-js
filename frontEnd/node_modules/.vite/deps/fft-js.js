import {
  __commonJS
} from "./chunk-BUSYA2B4.js";

// node_modules/fft-js/src/complex.js
var require_complex = __commonJS({
  "node_modules/fft-js/src/complex.js"(exports, module) {
    var complexAdd = function(a, b) {
      return [a[0] + b[0], a[1] + b[1]];
    };
    var complexSubtract = function(a, b) {
      return [a[0] - b[0], a[1] - b[1]];
    };
    var complexMultiply = function(a, b) {
      return [
        a[0] * b[0] - a[1] * b[1],
        a[0] * b[1] + a[1] * b[0]
      ];
    };
    var complexMagnitude = function(c) {
      return Math.sqrt(c[0] * c[0] + c[1] * c[1]);
    };
    module.exports = {
      add: complexAdd,
      subtract: complexSubtract,
      multiply: complexMultiply,
      magnitude: complexMagnitude
    };
  }
});

// node_modules/fft-js/src/fftutil.js
var require_fftutil = __commonJS({
  "node_modules/fft-js/src/fftutil.js"(exports, module) {
    var complex = require_complex();
    var mapExponent = {};
    var exponent = function(k, N) {
      var x = -2 * Math.PI * (k / N);
      mapExponent[N] = mapExponent[N] || {};
      mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)];
      return mapExponent[N][k];
    };
    var fftMag = function(fftBins) {
      var ret = fftBins.map(complex.magnitude);
      return ret.slice(0, ret.length / 2);
    };
    var fftFreq = function(fftBins, sampleRate) {
      var stepFreq = sampleRate / fftBins.length;
      var ret = fftBins.slice(0, fftBins.length / 2);
      return ret.map(function(__, ix) {
        return ix * stepFreq;
      });
    };
    module.exports = {
      fftMag,
      fftFreq,
      exponent
    };
  }
});

// node_modules/bit-twiddle/twiddle.js
var require_twiddle = __commonJS({
  "node_modules/bit-twiddle/twiddle.js"(exports) {
    "use strict";
    "use restrict";
    var INT_BITS = 32;
    exports.INT_BITS = INT_BITS;
    exports.INT_MAX = 2147483647;
    exports.INT_MIN = -1 << INT_BITS - 1;
    exports.sign = function(v) {
      return (v > 0) - (v < 0);
    };
    exports.abs = function(v) {
      var mask = v >> INT_BITS - 1;
      return (v ^ mask) - mask;
    };
    exports.min = function(x, y) {
      return y ^ (x ^ y) & -(x < y);
    };
    exports.max = function(x, y) {
      return x ^ (x ^ y) & -(x < y);
    };
    exports.isPow2 = function(v) {
      return !(v & v - 1) && !!v;
    };
    exports.log2 = function(v) {
      var r, shift;
      r = (v > 65535) << 4;
      v >>>= r;
      shift = (v > 255) << 3;
      v >>>= shift;
      r |= shift;
      shift = (v > 15) << 2;
      v >>>= shift;
      r |= shift;
      shift = (v > 3) << 1;
      v >>>= shift;
      r |= shift;
      return r | v >> 1;
    };
    exports.log10 = function(v) {
      return v >= 1e9 ? 9 : v >= 1e8 ? 8 : v >= 1e7 ? 7 : v >= 1e6 ? 6 : v >= 1e5 ? 5 : v >= 1e4 ? 4 : v >= 1e3 ? 3 : v >= 100 ? 2 : v >= 10 ? 1 : 0;
    };
    exports.popCount = function(v) {
      v = v - (v >>> 1 & 1431655765);
      v = (v & 858993459) + (v >>> 2 & 858993459);
      return (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
    };
    function countTrailingZeros(v) {
      var c = 32;
      v &= -v;
      if (v) c--;
      if (v & 65535) c -= 16;
      if (v & 16711935) c -= 8;
      if (v & 252645135) c -= 4;
      if (v & 858993459) c -= 2;
      if (v & 1431655765) c -= 1;
      return c;
    }
    exports.countTrailingZeros = countTrailingZeros;
    exports.nextPow2 = function(v) {
      v += v === 0;
      --v;
      v |= v >>> 1;
      v |= v >>> 2;
      v |= v >>> 4;
      v |= v >>> 8;
      v |= v >>> 16;
      return v + 1;
    };
    exports.prevPow2 = function(v) {
      v |= v >>> 1;
      v |= v >>> 2;
      v |= v >>> 4;
      v |= v >>> 8;
      v |= v >>> 16;
      return v - (v >>> 1);
    };
    exports.parity = function(v) {
      v ^= v >>> 16;
      v ^= v >>> 8;
      v ^= v >>> 4;
      v &= 15;
      return 27030 >>> v & 1;
    };
    var REVERSE_TABLE = new Array(256);
    (function(tab) {
      for (var i = 0; i < 256; ++i) {
        var v = i, r = i, s = 7;
        for (v >>>= 1; v; v >>>= 1) {
          r <<= 1;
          r |= v & 1;
          --s;
        }
        tab[i] = r << s & 255;
      }
    })(REVERSE_TABLE);
    exports.reverse = function(v) {
      return REVERSE_TABLE[v & 255] << 24 | REVERSE_TABLE[v >>> 8 & 255] << 16 | REVERSE_TABLE[v >>> 16 & 255] << 8 | REVERSE_TABLE[v >>> 24 & 255];
    };
    exports.interleave2 = function(x, y) {
      x &= 65535;
      x = (x | x << 8) & 16711935;
      x = (x | x << 4) & 252645135;
      x = (x | x << 2) & 858993459;
      x = (x | x << 1) & 1431655765;
      y &= 65535;
      y = (y | y << 8) & 16711935;
      y = (y | y << 4) & 252645135;
      y = (y | y << 2) & 858993459;
      y = (y | y << 1) & 1431655765;
      return x | y << 1;
    };
    exports.deinterleave2 = function(v, n) {
      v = v >>> n & 1431655765;
      v = (v | v >>> 1) & 858993459;
      v = (v | v >>> 2) & 252645135;
      v = (v | v >>> 4) & 16711935;
      v = (v | v >>> 16) & 65535;
      return v << 16 >> 16;
    };
    exports.interleave3 = function(x, y, z) {
      x &= 1023;
      x = (x | x << 16) & 4278190335;
      x = (x | x << 8) & 251719695;
      x = (x | x << 4) & 3272356035;
      x = (x | x << 2) & 1227133513;
      y &= 1023;
      y = (y | y << 16) & 4278190335;
      y = (y | y << 8) & 251719695;
      y = (y | y << 4) & 3272356035;
      y = (y | y << 2) & 1227133513;
      x |= y << 1;
      z &= 1023;
      z = (z | z << 16) & 4278190335;
      z = (z | z << 8) & 251719695;
      z = (z | z << 4) & 3272356035;
      z = (z | z << 2) & 1227133513;
      return x | z << 2;
    };
    exports.deinterleave3 = function(v, n) {
      v = v >>> n & 1227133513;
      v = (v | v >>> 2) & 3272356035;
      v = (v | v >>> 4) & 251719695;
      v = (v | v >>> 8) & 4278190335;
      v = (v | v >>> 16) & 1023;
      return v << 22 >> 22;
    };
    exports.nextCombination = function(v) {
      var t = v | v - 1;
      return t + 1 | (~t & -~t) - 1 >>> countTrailingZeros(v) + 1;
    };
  }
});

// node_modules/fft-js/src/fft.js
var require_fft = __commonJS({
  "node_modules/fft-js/src/fft.js"(exports, module) {
    var complex = require_complex();
    var fftUtil = require_fftutil();
    var twiddle = require_twiddle();
    module.exports = {
      //-------------------------------------------------
      // Calculate FFT for vector where vector.length
      // is assumed to be a power of 2.
      //-------------------------------------------------
      fft: function fft(vector) {
        var X = [], N = vector.length;
        if (N == 1) {
          if (Array.isArray(vector[0]))
            return [[vector[0][0], vector[0][1]]];
          else
            return [[vector[0], 0]];
        }
        var X_evens = fft(vector.filter(even)), X_odds = fft(vector.filter(odd));
        for (var k = 0; k < N / 2; k++) {
          var t = X_evens[k], e = complex.multiply(fftUtil.exponent(k, N), X_odds[k]);
          X[k] = complex.add(t, e);
          X[k + N / 2] = complex.subtract(t, e);
        }
        function even(__, ix) {
          return ix % 2 == 0;
        }
        function odd(__, ix) {
          return ix % 2 == 1;
        }
        return X;
      },
      //-------------------------------------------------
      // Calculate FFT for vector where vector.length
      // is assumed to be a power of 2.  This is the in-
      // place implementation, to avoid the memory
      // footprint used by recursion.
      //-------------------------------------------------
      fftInPlace: function(vector) {
        var N = vector.length;
        var trailingZeros = twiddle.countTrailingZeros(N);
        for (var k = 0; k < N; k++) {
          var p = twiddle.reverse(k) >>> twiddle.INT_BITS - trailingZeros;
          if (p > k) {
            var complexTemp = [vector[k], 0];
            vector[k] = vector[p];
            vector[p] = complexTemp;
          } else {
            vector[p] = [vector[p], 0];
          }
        }
        for (var len = 2; len <= N; len += len) {
          for (var i = 0; i < len / 2; i++) {
            var w = fftUtil.exponent(i, len);
            for (var j = 0; j < N / len; j++) {
              var t = complex.multiply(w, vector[j * len + i + len / 2]);
              vector[j * len + i + len / 2] = complex.subtract(vector[j * len + i], t);
              vector[j * len + i] = complex.add(vector[j * len + i], t);
            }
          }
        }
      }
    };
  }
});

// node_modules/fft-js/src/ifft.js
var require_ifft = __commonJS({
  "node_modules/fft-js/src/ifft.js"(exports, module) {
    var fft = require_fft().fft;
    module.exports = {
      ifft: function ifft(signal) {
        var csignal = [];
        for (var i = 0; i < signal.length; i++) {
          csignal[i] = [signal[i][1], signal[i][0]];
        }
        var ps = fft(csignal);
        var res = [];
        for (var j = 0; j < ps.length; j++) {
          res[j] = [ps[j][1] / ps.length, ps[j][0] / ps.length];
        }
        return res;
      }
    };
  }
});

// node_modules/fft-js/src/dft.js
var require_dft = __commonJS({
  "node_modules/fft-js/src/dft.js"(exports, module) {
    var complex = require_complex();
    var fftUtil = require_fftutil();
    var dft = function(vector) {
      var X = [], N = vector.length;
      for (var k = 0; k < N; k++) {
        X[k] = [0, 0];
        for (var i = 0; i < N; i++) {
          var exp = fftUtil.exponent(k * i, N);
          var term;
          if (Array.isArray(vector[i]))
            term = complex.multiply(vector[i], exp);
          else
            term = complex.multiply([vector[i], 0], exp);
          X[k] = complex.add(X[k], term);
        }
      }
      return X;
    };
    module.exports = dft;
  }
});

// node_modules/fft-js/src/idft.js
var require_idft = __commonJS({
  "node_modules/fft-js/src/idft.js"(exports, module) {
    var dft = require_dft();
    function idft(signal) {
      var csignal = [];
      for (var i = 0; i < signal.length; i++) {
        csignal[i] = [signal[i][1], signal[i][0]];
      }
      var ps = dft(csignal);
      var res = [];
      for (var j = 0; j < ps.length; j++) {
        res[j] = [ps[j][1] / ps.length, ps[j][0] / ps.length];
      }
      return res;
    }
    module.exports = idft;
  }
});

// node_modules/fft-js/index.js
var require_fft_js = __commonJS({
  "node_modules/fft-js/index.js"(exports, module) {
    module.exports = {
      fft: require_fft().fft,
      ifft: require_ifft().ifft,
      fftInPlace: require_fft().fftInPlace,
      util: require_fftutil(),
      dft: require_dft(),
      idft: require_idft()
    };
  }
});
export default require_fft_js();
//# sourceMappingURL=fft-js.js.map
