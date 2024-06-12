import {
  require_react
} from "./chunk-6P5PNMGD.js";
import {
  __commonJS
} from "./chunk-WXXH56N5.js";

// node_modules/react-multi-carousel/lib/utils/clones.js
var require_clones = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/clones.js"(exports) {
    "use strict";
    function getOriginalCounterPart(index, _a, childrenArr) {
      var slidesToShow = _a.slidesToShow, currentSlide = _a.currentSlide;
      return childrenArr.length > 2 * slidesToShow ? index + 2 * slidesToShow : currentSlide >= childrenArr.length ? childrenArr.length + index : index;
    }
    function getOriginalIndexLookupTableByClones(slidesToShow, childrenArr) {
      if (childrenArr.length > 2 * slidesToShow) {
        for (var table = {}, firstBeginningOfClones = childrenArr.length - 2 * slidesToShow, firstEndOfClones = childrenArr.length - firstBeginningOfClones, firstCount = firstBeginningOfClones, i = 0; i < firstEndOfClones; i++)
          table[i] = firstCount, firstCount++;
        var secondBeginningOfClones = childrenArr.length + firstEndOfClones, secondEndOfClones = secondBeginningOfClones + childrenArr.slice(0, 2 * slidesToShow).length, secondCount = 0;
        for (i = secondBeginningOfClones; i <= secondEndOfClones; i++)
          table[i] = secondCount, secondCount++;
        var originalEnd = secondBeginningOfClones, originalCounter = 0;
        for (i = firstEndOfClones; i < originalEnd; i++)
          table[i] = originalCounter, originalCounter++;
        return table;
      }
      table = {};
      var totalSlides = 3 * childrenArr.length, count = 0;
      for (i = 0; i < totalSlides; i++)
        table[i] = count, ++count === childrenArr.length && (count = 0);
      return table;
    }
    function getClones(slidesToShow, childrenArr) {
      return childrenArr.length < slidesToShow ? childrenArr : childrenArr.length > 2 * slidesToShow ? childrenArr.slice(childrenArr.length - 2 * slidesToShow, childrenArr.length).concat(childrenArr, childrenArr.slice(0, 2 * slidesToShow)) : childrenArr.concat(childrenArr, childrenArr);
    }
    function getInitialSlideInInfiniteMode(slidesToShow, childrenArr) {
      return childrenArr.length > 2 * slidesToShow ? 2 * slidesToShow : childrenArr.length;
    }
    function checkClonesPosition(_a, childrenArr, props) {
      var isReachingTheEnd, currentSlide = _a.currentSlide, slidesToShow = _a.slidesToShow, itemWidth = _a.itemWidth, totalItems = _a.totalItems, nextSlide = 0, nextPosition = 0, isReachingTheStart = 0 === currentSlide, originalFirstSlide = childrenArr.length - (childrenArr.length - 2 * slidesToShow);
      return childrenArr.length < slidesToShow ? (nextPosition = nextSlide = 0, isReachingTheStart = isReachingTheEnd = false) : childrenArr.length > 2 * slidesToShow ? ((isReachingTheEnd = currentSlide >= originalFirstSlide + childrenArr.length) && (nextPosition = -itemWidth * (nextSlide = currentSlide - childrenArr.length)), isReachingTheStart && (nextPosition = -itemWidth * (nextSlide = originalFirstSlide + (childrenArr.length - 2 * slidesToShow)))) : ((isReachingTheEnd = currentSlide >= 2 * childrenArr.length) && (nextPosition = -itemWidth * (nextSlide = currentSlide - childrenArr.length)), isReachingTheStart && (nextPosition = props.showDots ? -itemWidth * (nextSlide = childrenArr.length) : -itemWidth * (nextSlide = totalItems / 3))), { isReachingTheEnd, isReachingTheStart, nextSlide, nextPosition };
    }
    Object.defineProperty(exports, "__esModule", { value: true }), exports.getOriginalCounterPart = getOriginalCounterPart, exports.getOriginalIndexLookupTableByClones = getOriginalIndexLookupTableByClones, exports.getClones = getClones, exports.getInitialSlideInInfiniteMode = getInitialSlideInInfiniteMode, exports.checkClonesPosition = checkClonesPosition;
  }
});

// node_modules/react-multi-carousel/lib/utils/elementWidth.js
var require_elementWidth = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/elementWidth.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hasWarnAboutTypo = false;
    function getPartialVisibilityGutter(responsive, partialVisible, serverSideDeviceType, clientSideDeviceType) {
      var gutter = 0, deviceType = clientSideDeviceType || serverSideDeviceType;
      return partialVisible && deviceType && (!hasWarnAboutTypo && true && responsive[deviceType].paritialVisibilityGutter && (hasWarnAboutTypo = true, console.warn("You appear to be using paritialVisibilityGutter instead of partialVisibilityGutter which will be moved to partialVisibilityGutter in the future completely")), gutter = responsive[deviceType].partialVisibilityGutter || responsive[deviceType].paritialVisibilityGutter), gutter;
    }
    function getWidthFromDeviceType(deviceType, responsive) {
      var itemWidth;
      responsive[deviceType] && (itemWidth = (100 / responsive[deviceType].items).toFixed(1));
      return itemWidth;
    }
    function getItemClientSideWidth(props, slidesToShow, containerWidth) {
      return Math.round(containerWidth / (slidesToShow + (props.centerMode ? 1 : 0)));
    }
    exports.getPartialVisibilityGutter = getPartialVisibilityGutter, exports.getWidthFromDeviceType = getWidthFromDeviceType, exports.getItemClientSideWidth = getItemClientSideWidth;
  }
});

// node_modules/react-multi-carousel/lib/utils/common.js
var require_common = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var elementWidth_1 = require_elementWidth();
    function notEnoughChildren(state) {
      var slidesToShow = state.slidesToShow;
      return state.totalItems < slidesToShow;
    }
    function getInitialState(state, props) {
      var flexBisis, domLoaded = state.domLoaded, slidesToShow = state.slidesToShow, containerWidth = state.containerWidth, itemWidth = state.itemWidth, deviceType = props.deviceType, responsive = props.responsive, ssr = props.ssr, partialVisbile = props.partialVisbile, partialVisible = props.partialVisible, domFullyLoaded = Boolean(domLoaded && slidesToShow && containerWidth && itemWidth);
      ssr && deviceType && !domFullyLoaded && (flexBisis = elementWidth_1.getWidthFromDeviceType(deviceType, responsive));
      var shouldRenderOnSSR = Boolean(ssr && deviceType && !domFullyLoaded && flexBisis);
      return { shouldRenderOnSSR, flexBisis, domFullyLoaded, partialVisibilityGutter: elementWidth_1.getPartialVisibilityGutter(responsive, partialVisbile || partialVisible, deviceType, state.deviceType), shouldRenderAtAll: shouldRenderOnSSR || domFullyLoaded };
    }
    function getIfSlideIsVisbile(index, state) {
      var currentSlide = state.currentSlide, slidesToShow = state.slidesToShow;
      return currentSlide <= index && index < currentSlide + slidesToShow;
    }
    function getTransformForCenterMode(state, props, transformPlaceHolder) {
      var transform = transformPlaceHolder || state.transform;
      return !props.infinite && 0 === state.currentSlide || notEnoughChildren(state) ? transform : transform + state.itemWidth / 2;
    }
    function isInLeftEnd(_a) {
      return !(0 < _a.currentSlide);
    }
    function isInRightEnd(_a) {
      var currentSlide = _a.currentSlide, totalItems = _a.totalItems;
      return !(currentSlide + _a.slidesToShow < totalItems);
    }
    function getTransformForPartialVsibile(state, partialVisibilityGutter, props, transformPlaceHolder) {
      void 0 === partialVisibilityGutter && (partialVisibilityGutter = 0);
      var currentSlide = state.currentSlide, slidesToShow = state.slidesToShow, isRightEndReach = isInRightEnd(state), shouldRemoveRightGutter = !props.infinite && isRightEndReach, baseTransform = transformPlaceHolder || state.transform;
      if (notEnoughChildren(state))
        return baseTransform;
      var transform = baseTransform + currentSlide * partialVisibilityGutter;
      return shouldRemoveRightGutter ? transform + (state.containerWidth - (state.itemWidth - partialVisibilityGutter) * slidesToShow) : transform;
    }
    function parsePosition(props, position) {
      return props.rtl ? -1 * position : position;
    }
    function getTransform(state, props, transformPlaceHolder) {
      var partialVisbile = props.partialVisbile, partialVisible = props.partialVisible, responsive = props.responsive, deviceType = props.deviceType, centerMode = props.centerMode, transform = transformPlaceHolder || state.transform, partialVisibilityGutter = elementWidth_1.getPartialVisibilityGutter(responsive, partialVisbile || partialVisible, deviceType, state.deviceType);
      return parsePosition(props, partialVisible || partialVisbile ? getTransformForPartialVsibile(state, partialVisibilityGutter, props, transformPlaceHolder) : centerMode ? getTransformForCenterMode(state, props, transformPlaceHolder) : transform);
    }
    function getSlidesToSlide(state, props) {
      var domLoaded = state.domLoaded, slidesToShow = state.slidesToShow, containerWidth = state.containerWidth, itemWidth = state.itemWidth, deviceType = props.deviceType, responsive = props.responsive, slidesToScroll = props.slidesToSlide || 1, domFullyLoaded = Boolean(domLoaded && slidesToShow && containerWidth && itemWidth);
      return props.ssr && props.deviceType && !domFullyLoaded && Object.keys(responsive).forEach(function(device) {
        var slidesToSlide = responsive[device].slidesToSlide;
        deviceType === device && slidesToSlide && (slidesToScroll = slidesToSlide);
      }), domFullyLoaded && Object.keys(responsive).forEach(function(item) {
        var _a = responsive[item], breakpoint = _a.breakpoint, slidesToSlide = _a.slidesToSlide, max = breakpoint.max, min = breakpoint.min;
        slidesToSlide && window.innerWidth >= min && window.innerWidth <= max && (slidesToScroll = slidesToSlide);
      }), slidesToScroll;
    }
    exports.notEnoughChildren = notEnoughChildren, exports.getInitialState = getInitialState, exports.getIfSlideIsVisbile = getIfSlideIsVisbile, exports.getTransformForCenterMode = getTransformForCenterMode, exports.isInLeftEnd = isInLeftEnd, exports.isInRightEnd = isInRightEnd, exports.getTransformForPartialVsibile = getTransformForPartialVsibile, exports.parsePosition = parsePosition, exports.getTransform = getTransform, exports.getSlidesToSlide = getSlidesToSlide;
  }
});

// node_modules/react-multi-carousel/lib/utils/throttle.js
var require_throttle = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/throttle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var throttle = function(func, limit, setIsInThrottle) {
      var inThrottle;
      return function() {
        var args = arguments;
        inThrottle || (func.apply(this, args), inThrottle = true, "function" == typeof setIsInThrottle && setIsInThrottle(true), setTimeout(function() {
          inThrottle = false, "function" == typeof setIsInThrottle && setIsInThrottle(false);
        }, limit));
      };
    };
    exports.default = throttle;
  }
});

// node_modules/react-multi-carousel/lib/utils/throwError.js
var require_throwError = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/throwError.js"(exports) {
    "use strict";
    function throwError(state, props) {
      var partialVisbile = props.partialVisbile, partialVisible = props.partialVisible, centerMode = props.centerMode, ssr = props.ssr, responsive = props.responsive;
      if ((partialVisbile || partialVisible) && centerMode)
        throw new Error("center mode can not be used at the same time with partialVisible");
      if (!responsive)
        throw ssr ? new Error("ssr mode need to be used in conjunction with responsive prop") : new Error("Responsive prop is needed for deciding the amount of items to show on the screen");
      if (responsive && "object" != typeof responsive)
        throw new Error("responsive prop must be an object");
    }
    Object.defineProperty(exports, "__esModule", { value: true }), exports.default = throwError;
  }
});

// node_modules/react-multi-carousel/lib/utils/next.js
var require_next = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/next.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require_common();
    function populateNextSlides(state, props, slidesHavePassed) {
      void 0 === slidesHavePassed && (slidesHavePassed = 0);
      var nextSlides, nextPosition, slidesToShow = state.slidesToShow, currentSlide = state.currentSlide, itemWidth = state.itemWidth, totalItems = state.totalItems, slidesToSlide = common_1.getSlidesToSlide(state, props), nextMaximumSlides = currentSlide + 1 + slidesHavePassed + slidesToShow + (0 < slidesHavePassed ? 0 : slidesToSlide);
      return nextPosition = nextMaximumSlides <= totalItems ? -itemWidth * (nextSlides = currentSlide + slidesHavePassed + (0 < slidesHavePassed ? 0 : slidesToSlide)) : totalItems < nextMaximumSlides && currentSlide !== totalItems - slidesToShow ? -itemWidth * (nextSlides = totalItems - slidesToShow) : nextSlides = void 0, { nextSlides, nextPosition };
    }
    exports.populateNextSlides = populateNextSlides;
  }
});

// node_modules/react-multi-carousel/lib/utils/previous.js
var require_previous = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/previous.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    var common_1 = require_common();
    var common_2 = require_common();
    function populatePreviousSlides(state, props, slidesHavePassed) {
      void 0 === slidesHavePassed && (slidesHavePassed = 0);
      var nextSlides, nextPosition, currentSlide = state.currentSlide, itemWidth = state.itemWidth, slidesToShow = state.slidesToShow, children = props.children, showDots = props.showDots, infinite = props.infinite, slidesToSlide = common_1.getSlidesToSlide(state, props), nextMaximumSlides = currentSlide - slidesHavePassed - (0 < slidesHavePassed ? 0 : slidesToSlide), additionalSlides = (React.Children.toArray(children).length - slidesToShow) % slidesToSlide;
      return nextPosition = 0 <= nextMaximumSlides ? (nextSlides = nextMaximumSlides, showDots && !infinite && 0 < additionalSlides && common_2.isInRightEnd(state) && (nextSlides = currentSlide - additionalSlides), -itemWidth * nextSlides) : nextSlides = nextMaximumSlides < 0 && 0 !== currentSlide ? 0 : void 0, { nextSlides, nextPosition };
    }
    exports.populatePreviousSlides = populatePreviousSlides;
  }
});

// node_modules/react-multi-carousel/lib/utils/mouseOrTouchMove.js
var require_mouseOrTouchMove = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/mouseOrTouchMove.js"(exports) {
    "use strict";
    function populateSlidesOnMouseTouchMove(state, props, initialX, lastX, clientX, transformPlaceHolder) {
      var direction, nextPosition, itemWidth = state.itemWidth, slidesToShow = state.slidesToShow, totalItems = state.totalItems, currentSlide = state.currentSlide, infinite = props.infinite, canContinue = false, slidesHavePassedRight = Math.round((initialX - lastX) / itemWidth), slidesHavePassedLeft = Math.round((lastX - initialX) / itemWidth), isMovingLeft = initialX < clientX;
      if (clientX < initialX && !!(slidesHavePassedRight <= slidesToShow)) {
        direction = "right";
        var translateXLimit = Math.abs(-itemWidth * (totalItems - slidesToShow)), nextTranslate = transformPlaceHolder - (lastX - clientX), isLastSlide = currentSlide === totalItems - slidesToShow;
        (Math.abs(nextTranslate) <= translateXLimit || isLastSlide && infinite) && (nextPosition = nextTranslate, canContinue = true);
      }
      isMovingLeft && slidesHavePassedLeft <= slidesToShow && (direction = "left", ((nextTranslate = transformPlaceHolder + (clientX - lastX)) <= 0 || 0 === currentSlide && infinite) && (canContinue = true, nextPosition = nextTranslate));
      return { direction, nextPosition, canContinue };
    }
    Object.defineProperty(exports, "__esModule", { value: true }), exports.populateSlidesOnMouseTouchMove = populateSlidesOnMouseTouchMove;
  }
});

// node_modules/react-multi-carousel/lib/utils/index.js
var require_utils = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var clones_1 = require_clones();
    exports.getOriginalCounterPart = clones_1.getOriginalCounterPart, exports.getClones = clones_1.getClones, exports.checkClonesPosition = clones_1.checkClonesPosition, exports.getInitialSlideInInfiniteMode = clones_1.getInitialSlideInInfiniteMode;
    var elementWidth_1 = require_elementWidth();
    exports.getWidthFromDeviceType = elementWidth_1.getWidthFromDeviceType, exports.getPartialVisibilityGutter = elementWidth_1.getPartialVisibilityGutter, exports.getItemClientSideWidth = elementWidth_1.getItemClientSideWidth;
    var common_1 = require_common();
    exports.getInitialState = common_1.getInitialState, exports.getIfSlideIsVisbile = common_1.getIfSlideIsVisbile, exports.getTransformForCenterMode = common_1.getTransformForCenterMode, exports.getTransformForPartialVsibile = common_1.getTransformForPartialVsibile, exports.isInLeftEnd = common_1.isInLeftEnd, exports.isInRightEnd = common_1.isInRightEnd, exports.notEnoughChildren = common_1.notEnoughChildren, exports.getSlidesToSlide = common_1.getSlidesToSlide;
    var throttle_1 = require_throttle();
    exports.throttle = throttle_1.default;
    var throwError_1 = require_throwError();
    exports.throwError = throwError_1.default;
    var next_1 = require_next();
    exports.populateNextSlides = next_1.populateNextSlides;
    var previous_1 = require_previous();
    exports.populatePreviousSlides = previous_1.populatePreviousSlides;
    var mouseOrTouchMove_1 = require_mouseOrTouchMove();
    exports.populateSlidesOnMouseTouchMove = mouseOrTouchMove_1.populateSlidesOnMouseTouchMove;
  }
});

// node_modules/react-multi-carousel/lib/types.js
var require_types = __commonJS({
  "node_modules/react-multi-carousel/lib/types.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        return (extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            b2.hasOwnProperty(p) && (d2[p] = b2[p]);
        })(d, b);
      };
      return function(d, b) {
        function __() {
          this.constructor = d;
        }
        extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    function isMouseMoveEvent(e) {
      return "clientY" in e;
    }
    exports.isMouseMoveEvent = isMouseMoveEvent;
    var Carousel = function(_super) {
      function Carousel2() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      return __extends(Carousel2, _super), Carousel2;
    }(React.Component);
    exports.default = Carousel;
  }
});

// node_modules/react-multi-carousel/lib/utils/dots.js
var require_dots = __commonJS({
  "node_modules/react-multi-carousel/lib/utils/dots.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var clones_1 = require_clones();
    var common_1 = require_common();
    function getLookupTableForNextSlides(numberOfDotsToShow, state, props, childrenArr) {
      var table = {}, slidesToSlide = common_1.getSlidesToSlide(state, props);
      return Array(numberOfDotsToShow).fill(0).forEach(function(_, i) {
        var nextSlide = clones_1.getOriginalCounterPart(i, state, childrenArr);
        if (0 === i)
          table[0] = nextSlide;
        else {
          var now = table[i - 1] + slidesToSlide;
          table[i] = now;
        }
      }), table;
    }
    exports.getLookupTableForNextSlides = getLookupTableForNextSlides;
  }
});

// node_modules/react-multi-carousel/lib/Dots.js
var require_Dots = __commonJS({
  "node_modules/react-multi-carousel/lib/Dots.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    var clones_1 = require_clones();
    var dots_1 = require_dots();
    var common_1 = require_common();
    var Dots = function(_a) {
      var props = _a.props, state = _a.state, goToSlide = _a.goToSlide, getState = _a.getState, showDots = props.showDots, customDot = props.customDot, dotListClass = props.dotListClass, infinite = props.infinite, children = props.children;
      if (!showDots || common_1.notEnoughChildren(state))
        return null;
      var numberOfDotsToShow, currentSlide = state.currentSlide, slidesToShow = state.slidesToShow, slidesToSlide = common_1.getSlidesToSlide(state, props), childrenArr = React.Children.toArray(children);
      numberOfDotsToShow = infinite ? Math.ceil(childrenArr.length / slidesToSlide) : Math.ceil((childrenArr.length - slidesToShow) / slidesToSlide) + 1;
      var nextSlidesTable = dots_1.getLookupTableForNextSlides(numberOfDotsToShow, state, props, childrenArr), lookupTable = clones_1.getOriginalIndexLookupTableByClones(slidesToShow, childrenArr), currentSlides = lookupTable[currentSlide];
      return React.createElement("ul", { className: "react-multi-carousel-dot-list " + dotListClass }, Array(numberOfDotsToShow).fill(0).map(function(_, index) {
        var isActive, nextSlide;
        if (infinite) {
          nextSlide = nextSlidesTable[index];
          var cloneIndex = lookupTable[nextSlide];
          isActive = currentSlides === cloneIndex || cloneIndex <= currentSlides && currentSlides < cloneIndex + slidesToSlide;
        } else {
          var maximumNextSlide = childrenArr.length - slidesToShow, possibileNextSlides = index * slidesToSlide;
          isActive = (nextSlide = maximumNextSlide < possibileNextSlides ? maximumNextSlide : possibileNextSlides) === currentSlide || nextSlide < currentSlide && currentSlide < nextSlide + slidesToSlide && currentSlide < childrenArr.length - slidesToShow;
        }
        return customDot ? React.cloneElement(customDot, { index, active: isActive, key: index, onClick: function() {
          return goToSlide(nextSlide);
        }, carouselState: getState() }) : React.createElement("li", { "data-index": index, key: index, className: "react-multi-carousel-dot " + (isActive ? "react-multi-carousel-dot--active" : "") }, React.createElement("button", { "aria-label": "Go to slide " + (index + 1), onClick: function() {
          return goToSlide(nextSlide);
        } }));
      }));
    };
    exports.default = Dots;
  }
});

// node_modules/react-multi-carousel/lib/Arrows.js
var require_Arrows = __commonJS({
  "node_modules/react-multi-carousel/lib/Arrows.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    var LeftArrow = function(_a) {
      var customLeftArrow = _a.customLeftArrow, getState = _a.getState, previous = _a.previous, disabled = _a.disabled, rtl = _a.rtl;
      if (customLeftArrow)
        return React.cloneElement(customLeftArrow, { onClick: function() {
          return previous();
        }, carouselState: getState(), disabled, rtl });
      var rtlClassName = rtl ? "rtl" : "";
      return React.createElement("button", { "aria-label": "Go to previous slide", className: "react-multiple-carousel__arrow react-multiple-carousel__arrow--left " + rtlClassName, onClick: function() {
        return previous();
      }, type: "button", disabled });
    };
    exports.LeftArrow = LeftArrow;
    var RightArrow = function(_a) {
      var customRightArrow = _a.customRightArrow, getState = _a.getState, next = _a.next, disabled = _a.disabled, rtl = _a.rtl;
      if (customRightArrow)
        return React.cloneElement(customRightArrow, { onClick: function() {
          return next();
        }, carouselState: getState(), disabled, rtl });
      var rtlClassName = rtl ? "rtl" : "";
      return React.createElement("button", { "aria-label": "Go to next slide", className: "react-multiple-carousel__arrow react-multiple-carousel__arrow--right " + rtlClassName, onClick: function() {
        return next();
      }, type: "button", disabled });
    };
    exports.RightArrow = RightArrow;
  }
});

// node_modules/react-multi-carousel/lib/CarouselItems.js
var require_CarouselItems = __commonJS({
  "node_modules/react-multi-carousel/lib/CarouselItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    var utils_1 = require_utils();
    var CarouselItems = function(_a) {
      var props = _a.props, state = _a.state, goToSlide = _a.goToSlide, clones = _a.clones, notEnoughChildren = _a.notEnoughChildren, itemWidth = state.itemWidth, children = props.children, infinite = props.infinite, itemClass = props.itemClass, itemAriaLabel = props.itemAriaLabel, partialVisbile = props.partialVisbile, partialVisible = props.partialVisible, _b = utils_1.getInitialState(state, props), flexBisis = _b.flexBisis, shouldRenderOnSSR = _b.shouldRenderOnSSR, domFullyLoaded = _b.domFullyLoaded, partialVisibilityGutter = _b.partialVisibilityGutter;
      return _b.shouldRenderAtAll ? (partialVisbile && console.warn('WARNING: Please correct props name: "partialVisible" as old typo will be removed in future versions!'), React.createElement(React.Fragment, null, (infinite ? clones : React.Children.toArray(children)).map(function(child, index) {
        return React.createElement("li", { key: index, "data-index": index, onClick: function() {
          props.focusOnSelect && goToSlide(index);
        }, "aria-hidden": utils_1.getIfSlideIsVisbile(index, state) ? "false" : "true", "aria-label": itemAriaLabel || (child.props.ariaLabel ? child.props.ariaLabel : null), style: { flex: shouldRenderOnSSR ? "1 0 " + flexBisis + "%" : "auto", position: "relative", width: domFullyLoaded ? ((partialVisbile || partialVisible) && partialVisibilityGutter && !notEnoughChildren ? itemWidth - partialVisibilityGutter : itemWidth) + "px" : "auto" }, className: "react-multi-carousel-item " + (utils_1.getIfSlideIsVisbile(index, state) ? "react-multi-carousel-item--active" : "") + " " + itemClass }, child);
      }))) : null;
    };
    exports.default = CarouselItems;
  }
});

// node_modules/react-multi-carousel/lib/Carousel.js
var require_Carousel = __commonJS({
  "node_modules/react-multi-carousel/lib/Carousel.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        return (extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            b2.hasOwnProperty(p) && (d2[p] = b2[p]);
        })(d, b);
      };
      return function(d, b) {
        function __() {
          this.constructor = d;
        }
        extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    var utils_1 = require_utils();
    var types_1 = require_types();
    var Dots_1 = require_Dots();
    var Arrows_1 = require_Arrows();
    var CarouselItems_1 = require_CarouselItems();
    var common_1 = require_common();
    var defaultTransitionDuration = 400;
    var defaultTransition = "transform 400ms ease-in-out";
    var Carousel = function(_super) {
      function Carousel2(props) {
        var _this = _super.call(this, props) || this;
        return _this.containerRef = React.createRef(), _this.listRef = React.createRef(), _this.state = { itemWidth: 0, slidesToShow: 0, currentSlide: 0, totalItems: React.Children.count(props.children), deviceType: "", domLoaded: false, transform: 0, containerWidth: 0 }, _this.onResize = _this.onResize.bind(_this), _this.handleDown = _this.handleDown.bind(_this), _this.handleMove = _this.handleMove.bind(_this), _this.handleOut = _this.handleOut.bind(_this), _this.onKeyUp = _this.onKeyUp.bind(_this), _this.handleEnter = _this.handleEnter.bind(_this), _this.setIsInThrottle = _this.setIsInThrottle.bind(_this), _this.next = utils_1.throttle(_this.next.bind(_this), props.transitionDuration || defaultTransitionDuration, _this.setIsInThrottle), _this.previous = utils_1.throttle(_this.previous.bind(_this), props.transitionDuration || defaultTransitionDuration, _this.setIsInThrottle), _this.goToSlide = utils_1.throttle(_this.goToSlide.bind(_this), props.transitionDuration || defaultTransitionDuration, _this.setIsInThrottle), _this.onMove = false, _this.initialX = 0, _this.lastX = 0, _this.isAnimationAllowed = false, _this.direction = "", _this.initialY = 0, _this.isInThrottle = false, _this.transformPlaceHolder = 0, _this;
      }
      return __extends(Carousel2, _super), Carousel2.prototype.resetTotalItems = function() {
        var _this = this, totalItems = React.Children.count(this.props.children), currentSlide = utils_1.notEnoughChildren(this.state) ? 0 : Math.max(0, Math.min(this.state.currentSlide, totalItems));
        this.setState({ totalItems, currentSlide }, function() {
          _this.setContainerAndItemWidth(_this.state.slidesToShow, true);
        });
      }, Carousel2.prototype.setIsInThrottle = function(isInThrottle) {
        void 0 === isInThrottle && (isInThrottle = false), this.isInThrottle = isInThrottle;
      }, Carousel2.prototype.setTransformDirectly = function(position, withAnimation) {
        var additionalTransfrom = this.props.additionalTransfrom;
        this.transformPlaceHolder = position;
        var currentTransform = common_1.getTransform(this.state, this.props, this.transformPlaceHolder);
        this.listRef && this.listRef.current && (this.setAnimationDirectly(withAnimation), this.listRef.current.style.transform = "translate3d(" + (currentTransform + additionalTransfrom) + "px,0,0)");
      }, Carousel2.prototype.setAnimationDirectly = function(animationAllowed) {
        this.listRef && this.listRef.current && (this.listRef.current.style.transition = animationAllowed ? this.props.customTransition || defaultTransition : "none");
      }, Carousel2.prototype.componentDidMount = function() {
        this.setState({ domLoaded: true }), this.setItemsToShow(), window.addEventListener("resize", this.onResize), this.onResize(true), this.props.keyBoardControl && window.addEventListener("keyup", this.onKeyUp), this.props.autoPlay && (this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed));
      }, Carousel2.prototype.setClones = function(slidesToShow, itemWidth, forResizing, resetCurrentSlide) {
        var _this = this;
        void 0 === resetCurrentSlide && (resetCurrentSlide = false), this.isAnimationAllowed = false;
        var childrenArr = React.Children.toArray(this.props.children), initialSlide = utils_1.getInitialSlideInInfiniteMode(slidesToShow || this.state.slidesToShow, childrenArr), clones = utils_1.getClones(this.state.slidesToShow, childrenArr), currentSlide = childrenArr.length < this.state.slidesToShow ? 0 : this.state.currentSlide;
        this.setState({ totalItems: clones.length, currentSlide: forResizing && !resetCurrentSlide ? currentSlide : initialSlide }, function() {
          _this.correctItemsPosition(itemWidth || _this.state.itemWidth);
        });
      }, Carousel2.prototype.setItemsToShow = function(shouldCorrectItemPosition, resetCurrentSlide) {
        var _this = this, responsive = this.props.responsive;
        Object.keys(responsive).forEach(function(item) {
          var _a = responsive[item], breakpoint = _a.breakpoint, items = _a.items, max = breakpoint.max, min = breakpoint.min, widths = [window.innerWidth];
          window.screen && window.screen.width && widths.push(window.screen.width);
          var screenWidth = Math.min.apply(Math, widths);
          min <= screenWidth && screenWidth <= max && (_this.setState({ slidesToShow: items, deviceType: item }), _this.setContainerAndItemWidth(items, shouldCorrectItemPosition, resetCurrentSlide));
        });
      }, Carousel2.prototype.setContainerAndItemWidth = function(slidesToShow, shouldCorrectItemPosition, resetCurrentSlide) {
        var _this = this;
        if (this.containerRef && this.containerRef.current) {
          var containerWidth = this.containerRef.current.offsetWidth, itemWidth_1 = utils_1.getItemClientSideWidth(this.props, slidesToShow, containerWidth);
          this.setState({ containerWidth, itemWidth: itemWidth_1 }, function() {
            _this.props.infinite && _this.setClones(slidesToShow, itemWidth_1, shouldCorrectItemPosition, resetCurrentSlide);
          }), shouldCorrectItemPosition && this.correctItemsPosition(itemWidth_1);
        }
      }, Carousel2.prototype.correctItemsPosition = function(itemWidth, isAnimationAllowed, setToDomDirectly) {
        isAnimationAllowed && (this.isAnimationAllowed = true), !isAnimationAllowed && this.isAnimationAllowed && (this.isAnimationAllowed = false);
        var nextTransform = this.state.totalItems < this.state.slidesToShow ? 0 : -itemWidth * this.state.currentSlide;
        setToDomDirectly && this.setTransformDirectly(nextTransform, true), this.setState({ transform: nextTransform });
      }, Carousel2.prototype.onResize = function(value) {
        var shouldCorrectItemPosition;
        shouldCorrectItemPosition = !!this.props.infinite && ("boolean" != typeof value || !value), this.setItemsToShow(shouldCorrectItemPosition);
      }, Carousel2.prototype.componentDidUpdate = function(_a, _b) {
        var _this = this, keyBoardControl = _a.keyBoardControl, autoPlay = _a.autoPlay, children = _a.children, containerWidth = _b.containerWidth, domLoaded = _b.domLoaded, currentSlide = _b.currentSlide;
        if (this.containerRef && this.containerRef.current && this.containerRef.current.offsetWidth !== containerWidth && (this.itemsToShowTimeout && clearTimeout(this.itemsToShowTimeout), this.itemsToShowTimeout = setTimeout(function() {
          _this.setItemsToShow(true);
        }, this.props.transitionDuration || defaultTransitionDuration)), keyBoardControl && !this.props.keyBoardControl && window.removeEventListener("keyup", this.onKeyUp), !keyBoardControl && this.props.keyBoardControl && window.addEventListener("keyup", this.onKeyUp), autoPlay && !this.props.autoPlay && this.autoPlay && (clearInterval(this.autoPlay), this.autoPlay = void 0), autoPlay || !this.props.autoPlay || this.autoPlay || (this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed)), children.length !== this.props.children.length ? Carousel2.clonesTimeout = setTimeout(function() {
          _this.props.infinite ? _this.setClones(_this.state.slidesToShow, _this.state.itemWidth, true, true) : _this.resetTotalItems();
        }, this.props.transitionDuration || defaultTransitionDuration) : this.props.infinite && this.state.currentSlide !== currentSlide && this.correctClonesPosition({ domLoaded }), this.transformPlaceHolder !== this.state.transform && (this.transformPlaceHolder = this.state.transform), this.props.autoPlay && this.props.rewind && !this.props.infinite && utils_1.isInRightEnd(this.state)) {
          var rewindBuffer = this.props.transitionDuration || defaultTransitionDuration;
          Carousel2.isInThrottleTimeout = setTimeout(function() {
            _this.setIsInThrottle(false), _this.resetAutoplayInterval(), _this.goToSlide(0, void 0, !!_this.props.rewindWithAnimation);
          }, rewindBuffer + this.props.autoPlaySpeed);
        }
      }, Carousel2.prototype.correctClonesPosition = function(_a) {
        var _this = this, domLoaded = _a.domLoaded, childrenArr = React.Children.toArray(this.props.children), _b = utils_1.checkClonesPosition(this.state, childrenArr, this.props), isReachingTheEnd = _b.isReachingTheEnd, isReachingTheStart = _b.isReachingTheStart, nextSlide = _b.nextSlide, nextPosition = _b.nextPosition;
        this.state.domLoaded && domLoaded && (isReachingTheEnd || isReachingTheStart) && (this.isAnimationAllowed = false, Carousel2.transformTimeout = setTimeout(function() {
          _this.setState({ transform: nextPosition, currentSlide: nextSlide });
        }, this.props.transitionDuration || defaultTransitionDuration));
      }, Carousel2.prototype.next = function(slidesHavePassed) {
        var _this = this;
        void 0 === slidesHavePassed && (slidesHavePassed = 0);
        var _a = this.props, afterChange = _a.afterChange, beforeChange = _a.beforeChange;
        if (!utils_1.notEnoughChildren(this.state)) {
          var _b = utils_1.populateNextSlides(this.state, this.props, slidesHavePassed), nextSlides = _b.nextSlides, nextPosition = _b.nextPosition, previousSlide = this.state.currentSlide;
          void 0 !== nextSlides && void 0 !== nextPosition && ("function" == typeof beforeChange && beforeChange(nextSlides, this.getState()), this.isAnimationAllowed = true, this.props.shouldResetAutoplay && this.resetAutoplayInterval(), this.setState({ transform: nextPosition, currentSlide: nextSlides }, function() {
            "function" == typeof afterChange && (Carousel2.afterChangeTimeout = setTimeout(function() {
              afterChange(previousSlide, _this.getState());
            }, _this.props.transitionDuration || defaultTransitionDuration));
          }));
        }
      }, Carousel2.prototype.previous = function(slidesHavePassed) {
        var _this = this;
        void 0 === slidesHavePassed && (slidesHavePassed = 0);
        var _a = this.props, afterChange = _a.afterChange, beforeChange = _a.beforeChange;
        if (!utils_1.notEnoughChildren(this.state)) {
          var _b = utils_1.populatePreviousSlides(this.state, this.props, slidesHavePassed), nextSlides = _b.nextSlides, nextPosition = _b.nextPosition;
          if (void 0 !== nextSlides && void 0 !== nextPosition) {
            var previousSlide = this.state.currentSlide;
            "function" == typeof beforeChange && beforeChange(nextSlides, this.getState()), this.isAnimationAllowed = true, this.props.shouldResetAutoplay && this.resetAutoplayInterval(), this.setState({ transform: nextPosition, currentSlide: nextSlides }, function() {
              "function" == typeof afterChange && (Carousel2.afterChangeTimeout2 = setTimeout(function() {
                afterChange(previousSlide, _this.getState());
              }, _this.props.transitionDuration || defaultTransitionDuration));
            });
          }
        }
      }, Carousel2.prototype.resetAutoplayInterval = function() {
        this.props.autoPlay && (clearInterval(this.autoPlay), this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed));
      }, Carousel2.prototype.componentWillUnmount = function() {
        window.removeEventListener("resize", this.onResize), this.props.keyBoardControl && window.removeEventListener("keyup", this.onKeyUp), this.props.autoPlay && this.autoPlay && (clearInterval(this.autoPlay), this.autoPlay = void 0), this.itemsToShowTimeout && clearTimeout(this.itemsToShowTimeout), Carousel2.clonesTimeout && clearTimeout(Carousel2.clonesTimeout), Carousel2.isInThrottleTimeout && clearTimeout(Carousel2.isInThrottleTimeout), Carousel2.transformTimeout && clearTimeout(Carousel2.transformTimeout), Carousel2.afterChangeTimeout && clearTimeout(Carousel2.afterChangeTimeout), Carousel2.afterChangeTimeout2 && clearTimeout(Carousel2.afterChangeTimeout2), Carousel2.afterChangeTimeout3 && clearTimeout(Carousel2.afterChangeTimeout3);
      }, Carousel2.prototype.resetMoveStatus = function() {
        this.onMove = false, this.initialX = 0, this.lastX = 0, this.direction = "", this.initialY = 0;
      }, Carousel2.prototype.getCords = function(_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        return { clientX: common_1.parsePosition(this.props, clientX), clientY: common_1.parsePosition(this.props, clientY) };
      }, Carousel2.prototype.handleDown = function(e) {
        if (!(!types_1.isMouseMoveEvent(e) && !this.props.swipeable || types_1.isMouseMoveEvent(e) && !this.props.draggable || this.isInThrottle)) {
          var _a = this.getCords(types_1.isMouseMoveEvent(e) ? e : e.touches[0]), clientX = _a.clientX, clientY = _a.clientY;
          this.onMove = true, this.initialX = clientX, this.initialY = clientY, this.lastX = clientX, this.isAnimationAllowed = false;
        }
      }, Carousel2.prototype.handleMove = function(e) {
        if (!(!types_1.isMouseMoveEvent(e) && !this.props.swipeable || types_1.isMouseMoveEvent(e) && !this.props.draggable || utils_1.notEnoughChildren(this.state))) {
          var _a = this.getCords(types_1.isMouseMoveEvent(e) ? e : e.touches[0]), clientX = _a.clientX, clientY = _a.clientY, diffX = this.initialX - clientX, diffY = this.initialY - clientY;
          if (this.onMove) {
            if (!(Math.abs(diffX) > Math.abs(diffY)))
              return;
            var _b = utils_1.populateSlidesOnMouseTouchMove(this.state, this.props, this.initialX, this.lastX, clientX, this.transformPlaceHolder), direction = _b.direction, nextPosition = _b.nextPosition, canContinue = _b.canContinue;
            direction && (this.direction = direction, canContinue && void 0 !== nextPosition && this.setTransformDirectly(nextPosition)), this.lastX = clientX;
          }
        }
      }, Carousel2.prototype.handleOut = function(e) {
        this.props.autoPlay && !this.autoPlay && (this.autoPlay = setInterval(this.next, this.props.autoPlaySpeed));
        var shouldDisableOnMobile = "touchend" === e.type && !this.props.swipeable, shouldDisableOnDesktop = ("mouseleave" === e.type || "mouseup" === e.type) && !this.props.draggable;
        if (!shouldDisableOnMobile && !shouldDisableOnDesktop && this.onMove) {
          if (this.setAnimationDirectly(true), "right" === this.direction)
            if (this.initialX - this.lastX >= this.props.minimumTouchDrag) {
              var slidesHavePassed = Math.round((this.initialX - this.lastX) / this.state.itemWidth);
              this.next(slidesHavePassed);
            } else
              this.correctItemsPosition(this.state.itemWidth, true, true);
          if ("left" === this.direction)
            if (this.lastX - this.initialX > this.props.minimumTouchDrag) {
              slidesHavePassed = Math.round((this.lastX - this.initialX) / this.state.itemWidth);
              this.previous(slidesHavePassed);
            } else
              this.correctItemsPosition(this.state.itemWidth, true, true);
          this.resetMoveStatus();
        }
      }, Carousel2.prototype.isInViewport = function(el) {
        var _a = el.getBoundingClientRect(), _b = _a.top, top = void 0 === _b ? 0 : _b, _c = _a.left, left = void 0 === _c ? 0 : _c, _d = _a.bottom, bottom = void 0 === _d ? 0 : _d, _e = _a.right, right = void 0 === _e ? 0 : _e;
        return 0 <= top && 0 <= left && bottom <= (window.innerHeight || document.documentElement.clientHeight) && right <= (window.innerWidth || document.documentElement.clientWidth);
      }, Carousel2.prototype.isChildOfCarousel = function(el) {
        return !!(el instanceof Element && this.listRef && this.listRef.current) && this.listRef.current.contains(el);
      }, Carousel2.prototype.onKeyUp = function(e) {
        var target = e.target;
        switch (e.keyCode) {
          case 37:
            if (this.isChildOfCarousel(target))
              return this.previous();
            break;
          case 39:
            if (this.isChildOfCarousel(target))
              return this.next();
            break;
          case 9:
            if (this.isChildOfCarousel(target) && target instanceof HTMLInputElement && this.isInViewport(target))
              return this.next();
        }
      }, Carousel2.prototype.handleEnter = function(e) {
        types_1.isMouseMoveEvent(e) && this.autoPlay && this.props.autoPlay && this.props.pauseOnHover && (clearInterval(this.autoPlay), this.autoPlay = void 0);
      }, Carousel2.prototype.goToSlide = function(slide, skipCallbacks, animationAllowed) {
        var _this = this;
        if (void 0 === animationAllowed && (animationAllowed = true), !this.isInThrottle) {
          var itemWidth = this.state.itemWidth, _a = this.props, afterChange = _a.afterChange, beforeChange = _a.beforeChange, previousSlide = this.state.currentSlide;
          "function" != typeof beforeChange || skipCallbacks && ("object" != typeof skipCallbacks || skipCallbacks.skipBeforeChange) || beforeChange(slide, this.getState()), this.isAnimationAllowed = animationAllowed, this.props.shouldResetAutoplay && this.resetAutoplayInterval(), this.setState({ currentSlide: slide, transform: -itemWidth * slide }, function() {
            _this.props.infinite && _this.correctClonesPosition({ domLoaded: true }), "function" != typeof afterChange || skipCallbacks && ("object" != typeof skipCallbacks || skipCallbacks.skipAfterChange) || (Carousel2.afterChangeTimeout3 = setTimeout(function() {
              afterChange(previousSlide, _this.getState());
            }, _this.props.transitionDuration || defaultTransitionDuration));
          });
        }
      }, Carousel2.prototype.getState = function() {
        return this.state;
      }, Carousel2.prototype.renderLeftArrow = function(disbaled) {
        var _this = this, _a = this.props, customLeftArrow = _a.customLeftArrow, rtl = _a.rtl;
        return React.createElement(Arrows_1.LeftArrow, { customLeftArrow, getState: function() {
          return _this.getState();
        }, previous: this.previous, disabled: disbaled, rtl });
      }, Carousel2.prototype.renderRightArrow = function(disbaled) {
        var _this = this, _a = this.props, customRightArrow = _a.customRightArrow, rtl = _a.rtl;
        return React.createElement(Arrows_1.RightArrow, { customRightArrow, getState: function() {
          return _this.getState();
        }, next: this.next, disabled: disbaled, rtl });
      }, Carousel2.prototype.renderButtonGroups = function() {
        var _this = this, customButtonGroup = this.props.customButtonGroup;
        return customButtonGroup ? React.cloneElement(customButtonGroup, { previous: function() {
          return _this.previous();
        }, next: function() {
          return _this.next();
        }, goToSlide: function(slideIndex, skipCallbacks) {
          return _this.goToSlide(slideIndex, skipCallbacks);
        }, carouselState: this.getState() }) : null;
      }, Carousel2.prototype.renderDotsList = function() {
        var _this = this;
        return React.createElement(Dots_1.default, { state: this.state, props: this.props, goToSlide: this.goToSlide, getState: function() {
          return _this.getState();
        } });
      }, Carousel2.prototype.renderCarouselItems = function() {
        var clones = [];
        if (this.props.infinite) {
          var childrenArr = React.Children.toArray(this.props.children);
          clones = utils_1.getClones(this.state.slidesToShow, childrenArr);
        }
        return React.createElement(CarouselItems_1.default, { clones, goToSlide: this.goToSlide, state: this.state, notEnoughChildren: utils_1.notEnoughChildren(this.state), props: this.props });
      }, Carousel2.prototype.render = function() {
        var _a = this.props, deviceType = _a.deviceType, arrows = _a.arrows, renderArrowsWhenDisabled = _a.renderArrowsWhenDisabled, removeArrowOnDeviceType = _a.removeArrowOnDeviceType, infinite = _a.infinite, containerClass = _a.containerClass, sliderClass = _a.sliderClass, customTransition = _a.customTransition, additionalTransfrom = _a.additionalTransfrom, renderDotsOutside = _a.renderDotsOutside, renderButtonGroupOutside = _a.renderButtonGroupOutside, className = _a.className, rtl = _a.rtl;
        utils_1.throwError(this.state, this.props);
        var _b = utils_1.getInitialState(this.state, this.props), shouldRenderOnSSR = _b.shouldRenderOnSSR, shouldRenderAtAll = _b.shouldRenderAtAll, isLeftEndReach = utils_1.isInLeftEnd(this.state), isRightEndReach = utils_1.isInRightEnd(this.state), shouldShowArrows = arrows && !(removeArrowOnDeviceType && (deviceType && -1 < removeArrowOnDeviceType.indexOf(deviceType) || this.state.deviceType && -1 < removeArrowOnDeviceType.indexOf(this.state.deviceType))) && !utils_1.notEnoughChildren(this.state) && shouldRenderAtAll, disableLeftArrow = !infinite && isLeftEndReach, disableRightArrow = !infinite && isRightEndReach, currentTransform = common_1.getTransform(this.state, this.props);
        return React.createElement(React.Fragment, null, React.createElement("div", { className: "react-multi-carousel-list " + containerClass + " " + className, dir: rtl ? "rtl" : "ltr", ref: this.containerRef }, React.createElement("ul", { ref: this.listRef, className: "react-multi-carousel-track " + sliderClass, style: { transition: this.isAnimationAllowed ? customTransition || defaultTransition : "none", overflow: shouldRenderOnSSR ? "hidden" : "unset", transform: "translate3d(" + (currentTransform + additionalTransfrom) + "px,0,0)" }, onMouseMove: this.handleMove, onMouseDown: this.handleDown, onMouseUp: this.handleOut, onMouseEnter: this.handleEnter, onMouseLeave: this.handleOut, onTouchStart: this.handleDown, onTouchMove: this.handleMove, onTouchEnd: this.handleOut }, this.renderCarouselItems()), shouldShowArrows && (!disableLeftArrow || renderArrowsWhenDisabled) && this.renderLeftArrow(disableLeftArrow), shouldShowArrows && (!disableRightArrow || renderArrowsWhenDisabled) && this.renderRightArrow(disableRightArrow), shouldRenderAtAll && !renderButtonGroupOutside && this.renderButtonGroups(), shouldRenderAtAll && !renderDotsOutside && this.renderDotsList()), shouldRenderAtAll && renderDotsOutside && this.renderDotsList(), shouldRenderAtAll && renderButtonGroupOutside && this.renderButtonGroups());
      }, Carousel2.defaultProps = { slidesToSlide: 1, infinite: false, draggable: true, swipeable: true, arrows: true, renderArrowsWhenDisabled: false, containerClass: "", sliderClass: "", itemClass: "", keyBoardControl: true, autoPlaySpeed: 3e3, showDots: false, renderDotsOutside: false, renderButtonGroupOutside: false, minimumTouchDrag: 80, className: "", dotListClass: "", focusOnSelect: false, centerMode: false, additionalTransfrom: 0, pauseOnHover: true, shouldResetAutoplay: true, rewind: false, rtl: false, rewindWithAnimation: false }, Carousel2;
    }(React.Component);
    exports.default = Carousel;
  }
});

// node_modules/react-multi-carousel/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-multi-carousel/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Carousel_1 = require_Carousel();
    exports.default = Carousel_1.default;
  }
});

// node_modules/react-multi-carousel/index.js
var require_react_multi_carousel = __commonJS({
  "node_modules/react-multi-carousel/index.js"(exports, module) {
    module.exports = require_lib();
  }
});
export default require_react_multi_carousel();
//# sourceMappingURL=react-multi-carousel.js.map
