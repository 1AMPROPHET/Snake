/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5089:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var isCallable = __webpack_require__(930);
var tryToString = __webpack_require__(9268);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var isObject = __webpack_require__(8759);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 6198:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(4088);
var toAbsoluteIndex = __webpack_require__(7740);
var lengthOfArrayLike = __webpack_require__(2871);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(8240);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 2306:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(8240);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 8474:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(9606);
var ownKeys = __webpack_require__(6095);
var getOwnPropertyDescriptorModule = __webpack_require__(4399);
var definePropertyModule = __webpack_require__(7826);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 2585:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5283);
var definePropertyModule = __webpack_require__(7826);
var createPropertyDescriptor = __webpack_require__(5736);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 5736:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 5283:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(3677);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 821:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var isObject = __webpack_require__(8759);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 4999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(563);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 1448:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var userAgent = __webpack_require__(4999);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 8684:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 1695:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var getOwnPropertyDescriptor = (__webpack_require__(4399).f);
var createNonEnumerableProperty = __webpack_require__(2585);
var redefine = __webpack_require__(1007);
var setGlobal = __webpack_require__(3648);
var copyConstructorProperties = __webpack_require__(8474);
var isForced = __webpack_require__(7189);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 3677:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7258:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(6059);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 6059:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(3677);

module.exports = !fails(function () {
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9413:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(6059);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 4398:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5283);
var hasOwn = __webpack_require__(9606);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 8240:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(6059);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 563:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var isCallable = __webpack_require__(930);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 2964:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(5089);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 2086:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 9606:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(8240);
var toObject = __webpack_require__(3060);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 7153:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 6761:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5283);
var fails = __webpack_require__(3677);
var createElement = __webpack_require__(821);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 5974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var uncurryThis = __webpack_require__(8240);
var fails = __webpack_require__(3677);
var classof = __webpack_require__(2306);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(8240);
var isCallable = __webpack_require__(930);
var store = __webpack_require__(4489);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 3278:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(9316);
var global = __webpack_require__(2086);
var uncurryThis = __webpack_require__(8240);
var isObject = __webpack_require__(8759);
var createNonEnumerableProperty = __webpack_require__(2585);
var hasOwn = __webpack_require__(9606);
var shared = __webpack_require__(4489);
var sharedKey = __webpack_require__(8944);
var hiddenKeys = __webpack_require__(7153);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 930:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 7189:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(3677);
var isCallable = __webpack_require__(930);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 8759:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(930);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 3296:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2071:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var getBuiltIn = __webpack_require__(563);
var isCallable = __webpack_require__(930);
var isPrototypeOf = __webpack_require__(5516);
var USE_SYMBOL_AS_UID = __webpack_require__(1876);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 2871:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(4005);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 3193:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(1448);
var fails = __webpack_require__(3677);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 9316:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var isCallable = __webpack_require__(930);
var inspectSource = __webpack_require__(9277);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 7826:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(2086);
var DESCRIPTORS = __webpack_require__(5283);
var IE8_DOM_DEFINE = __webpack_require__(6761);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8202);
var anObject = __webpack_require__(6112);
var toPropertyKey = __webpack_require__(2258);

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 4399:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5283);
var call = __webpack_require__(9413);
var propertyIsEnumerableModule = __webpack_require__(7446);
var createPropertyDescriptor = __webpack_require__(5736);
var toIndexedObject = __webpack_require__(4088);
var toPropertyKey = __webpack_require__(2258);
var hasOwn = __webpack_require__(9606);
var IE8_DOM_DEFINE = __webpack_require__(6761);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 62:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(1352);
var enumBugKeys = __webpack_require__(8684);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 6952:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 5516:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(8240);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1352:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(8240);
var hasOwn = __webpack_require__(9606);
var toIndexedObject = __webpack_require__(4088);
var indexOf = (__webpack_require__(6198).indexOf);
var hiddenKeys = __webpack_require__(7153);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 7446:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var call = __webpack_require__(9413);
var isCallable = __webpack_require__(930);
var isObject = __webpack_require__(8759);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 6095:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(563);
var uncurryThis = __webpack_require__(8240);
var getOwnPropertyNamesModule = __webpack_require__(62);
var getOwnPropertySymbolsModule = __webpack_require__(6952);
var anObject = __webpack_require__(6112);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 1007:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var isCallable = __webpack_require__(930);
var hasOwn = __webpack_require__(9606);
var createNonEnumerableProperty = __webpack_require__(2585);
var setGlobal = __webpack_require__(3648);
var inspectSource = __webpack_require__(9277);
var InternalStateModule = __webpack_require__(3278);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(4398).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 9586:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 8944:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(9197);
var uid = __webpack_require__(5422);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 4489:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var setGlobal = __webpack_require__(3648);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 9197:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(3296);
var store = __webpack_require__(4489);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.21.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.21.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 7740:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9502);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 4088:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5974);
var requireObjectCoercible = __webpack_require__(9586);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9502:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 4005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9502);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 3060:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var requireObjectCoercible = __webpack_require__(9586);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 1288:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var call = __webpack_require__(9413);
var isObject = __webpack_require__(8759);
var isSymbol = __webpack_require__(2071);
var getMethod = __webpack_require__(2964);
var ordinaryToPrimitive = __webpack_require__(7999);
var wellKnownSymbol = __webpack_require__(211);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 2258:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(1288);
var isSymbol = __webpack_require__(2071);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 9268:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 5422:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(8240);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 1876:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(3193);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 8202:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5283);
var fails = __webpack_require__(3677);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 1635:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);

var TypeError = global.TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 211:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(2086);
var shared = __webpack_require__(9197);
var hasOwn = __webpack_require__(9606);
var uid = __webpack_require__(5422);
var NATIVE_SYMBOL = __webpack_require__(3193);
var USE_SYMBOL_AS_UID = __webpack_require__(1876);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 6252:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(1695);
var global = __webpack_require__(2086);
var apply = __webpack_require__(7258);
var isCallable = __webpack_require__(930);
var userAgent = __webpack_require__(4999);
var arraySlice = __webpack_require__(745);
var validateArgumentsLength = __webpack_require__(1635);

var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var Function = global.Function;

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      apply(fn, this, args);
    } : fn, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXTERNAL MODULE: ../node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__(6252);
;// CONCATENATED MODULE: ./src/ts/modules/snake.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Snake = /*#__PURE__*/function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.element = document.getElementById('snake');
    this.head = document.querySelector('#snake > div');
    this.body = this.element.getElementsByTagName('div');
  } // 获取蛇的X坐标


  _createClass(Snake, [{
    key: "X",
    get: function get() {
      return this.head.offsetLeft;
    } // 获取蛇的Y坐标
    ,
    set: // 设置蛇头坐标
    function set(val) {
      if (this.X === val) {
        return;
      } // X的合法范围


      if (val < 0 || val > 290) {
        // 蛇撞墙了
        throw new Error('Game failed.');
      } // 修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右，反之


      if (this.body[1] && this.body[1].offsetLeft === val) {
        // 发生了掉头, 让蛇向原有方向继续移动
        if (val > this.X) {
          val = this.X - 10;
        } else {
          val = this.X + 10;
        }
      } // 移动身体


      this.moveBody();
      this.head.style.left = val + 'px';
      this.checkHeadBody();
    }
  }, {
    key: "Y",
    get: function get() {
      return this.head.offsetTop;
    },
    set: function set(val) {
      if (this.Y === val) {
        return;
      } // Y的合法范围


      if (val < 0 || val > 290) {
        // 蛇撞墙了
        throw new Error('Game failed.');
      } // 修改Y时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右，反之


      if (this.body[1] && this.body[1].offsetTop === val) {
        // 发生了掉头, 让蛇向原有方向继续移动
        if (val > this.Y) {
          val = this.Y - 10;
        } else {
          val = this.Y + 10;
        }
      } // 移动身体


      this.moveBody();
      this.head.style.top = val + 'px';
      this.checkHeadBody();
    } // 蛇增加身体

  }, {
    key: "addBody",
    value: function addBody() {
      // 向element中添加div
      this.element.appendChild(document.createElement('div')); // this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
  }, {
    key: "moveBody",
    value: function moveBody() {
      /*
        将后面的身体设置为前面身体的位置
      */
      for (var i = this.body.length - 1; i > 0; i--) {
        // 获取前边身体的位置
        var x = this.body[i - 1].offsetLeft;
        var y = this.body[i - 1].offsetTop; // 设置到当前身体位置

        this.body[i].style.left = x + 'px';
        this.body[i].style.top = y + 'px';
      }
    } // 检查身体碰撞

  }, {
    key: "checkHeadBody",
    value: function checkHeadBody() {
      for (var i = 1; i < this.body.length; i++) {
        if (this.X === this.body[i].offsetLeft && this.Y === this.body[i].offsetTop) {
          throw new Error('Game Over.');
        }
      }
    }
  }]);

  return Snake;
}();


;// CONCATENATED MODULE: ./src/ts/modules/food.ts
function food_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function food_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function food_createClass(Constructor, protoProps, staticProps) { if (protoProps) food_defineProperties(Constructor.prototype, protoProps); if (staticProps) food_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Food = /*#__PURE__*/function () {
  function Food() {
    food_classCallCheck(this, Food);

    // 获取页面中的food元素，并将值赋给element,!表示元素不为空
    this.element = document.getElementById('food');
  }

  food_createClass(Food, [{
    key: "X",
    get: function get() {
      // 获取x坐标
      return this.element.offsetLeft;
    }
  }, {
    key: "Y",
    get: function get() {
      // 获取y坐标
      return this.element.offsetTop;
    } // 修改食物位置的方法

  }, {
    key: "change",
    value: function change() {
      // 生成随机位置
      // X最小值为0，最大值为290，且必须是10的倍数
      var top = Math.floor(Math.random() * 30) * 10;
      var left = Math.floor(Math.random() * 30) * 10;
      this.element.style.top = top + 'px';
      this.element.style.left = left + 'px';
    }
  }]);

  return Food;
}();


;// CONCATENATED MODULE: ./src/ts/modules/scorepanel.ts
function scorepanel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scorepanel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function scorepanel_createClass(Constructor, protoProps, staticProps) { if (protoProps) scorepanel_defineProperties(Constructor.prototype, protoProps); if (staticProps) scorepanel_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ScorePanel = /*#__PURE__*/function () {
  function ScorePanel() {
    var maxLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var upScore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    scorepanel_classCallCheck(this, ScorePanel);

    this.score = 0;
    this.level = 1;
    this.scoreSpan = document.getElementById('score');
    this.levelSpan = document.getElementById('level');
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  } // 加分的方法


  scorepanel_createClass(ScorePanel, [{
    key: "addScore",
    value: function addScore() {
      this.score++;
      this.scoreSpan.innerHTML = this.score + '';

      if (this.score % this.upScore === 0) {
        this.levelUp();
      }
    }
  }, {
    key: "levelUp",
    value: function levelUp() {
      if (this.level <= this.maxLevel) {
        this.level++;
        this.levelSpan.innerHTML = this.level + '';
      }
    }
  }]);

  return ScorePanel;
}();


;// CONCATENATED MODULE: ./src/ts/modules/gameControl.ts


function gameControl_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function gameControl_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function gameControl_createClass(Constructor, protoProps, staticProps) { if (protoProps) gameControl_defineProperties(Constructor.prototype, protoProps); if (staticProps) gameControl_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var GameControl = /*#__PURE__*/function () {
  function GameControl() {
    gameControl_classCallCheck(this, GameControl);

    // 创建一个属性来存储蛇移动的方向（按键的方向）
    this.direction = ''; // 创建移动时间间隔

    this.time = 200; // 创建一个属性来记录游戏是否结束

    this.isLive = true;
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 1);
    this.init();
  } // 游戏的初始化方法


  gameControl_createClass(GameControl, [{
    key: "init",
    value: function init() {
      // 绑定键盘按下事件,将this绑定为GameControl
      document.addEventListener('keydown', this.keydownHandler.bind(this)); // 使蛇移动

      this.move();
    } // 键盘响应函数

  }, {
    key: "keydownHandler",
    value: function keydownHandler(event) {
      this.direction = event.key;
    } // 创建控制蛇移动的方法 

  }, {
    key: "move",
    value: function move() {
      /*
        向上：top值减少
        向下：top值增加
        向左：left值减少
        向右：left值增加
      */
      var x = this.snake.X;
      var y = this.snake.Y;

      switch (this.direction) {
        case 'ArrowUp':
        case 'Up':
          y -= 10;
          break;

        case 'ArrowDown':
        case 'Down':
          y += 10;
          break;

        case 'ArrowLeft':
        case 'Left':
          x -= 10;
          break;

        case 'ArrowRight':
        case 'Right':
          x += 10;
          break;
      } // 检查蛇是否吃到了食物


      this.checkEat(x, y);

      try {
        this.snake.X = x;
        this.snake.Y = y;
      } catch (e) {
        alert(e.message);
        this.isLive = false;
      }

      this.isLive && setTimeout(this.move.bind(this), this.time - (this.scorePanel.level - 1) * (this.time / this.scorePanel.maxLevel));
    } // 定义方法来检查是否吃到了食物

  }, {
    key: "checkEat",
    value: function checkEat(x, y) {
      if (x === this.food.X && y === this.food.Y) {
        // 吃到食物后，食物位置改变，分数增加
        this.food.change(); // 升级加速

        this.scorePanel.addScore(); // 蛇增加一节

        this.snake.addBody();
      }
    }
  }]);

  return GameControl;
}();


;// CONCATENATED MODULE: ./src/ts/index.ts


var gc = new GameControl();
}();
/******/ })()
;