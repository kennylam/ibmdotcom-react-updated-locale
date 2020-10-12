"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _calculateTotalWidth = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/calculateTotalWidth/calculateTotalWidth"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/caret--left/20"));

var _2 = _interopRequireDefault(require("@carbon/icons-react/lib/caret--right/20"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _settings = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var prefix = _settings.default.prefix;
/**
 * Header nav container component.
 */

var HeaderNavContainer = function HeaderNavContainer(_ref) {
  var children = _ref.children;
  var headerNavContainerRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      resizeObserver = _useState2[0],
      setResizeObserver = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showLeftCaret = _useState4[0],
      setShowLeftCaret = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      showRightCaret = _useState6[0],
      setShowRightCaret = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      containerWidth = _useState8[0],
      setContainerWidth = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      totalNavWidth = _useState10[0],
      setTotalNavWidth = _useState10[1];

  var paginateLeft = (0, _react.useCallback)(function () {
    headerNavContainerRef.current.scrollLeft -= containerWidth;
    setShowRightCaret(true); // 40 accounts for caret size

    if (headerNavContainerRef.current.scrollLeft <= 40) {
      setShowLeftCaret(false);
      headerNavContainerRef.current.scrollLeft = 0;
    }
  }, [containerWidth]);
  var paginateRight = (0, _react.useCallback)(function () {
    headerNavContainerRef.current.scrollLeft += containerWidth;
    setShowLeftCaret(true); // 80 accounts for caret sizes

    if (headerNavContainerRef.current.scrollLeft + containerWidth >= totalNavWidth - 80) {
      setShowRightCaret(false);
      headerNavContainerRef.current.scrollLeft += 80;
    }
  }, [containerWidth, totalNavWidth]);
  (0, _react.useEffect)(function () {
    if (window.ResizeObserver) {
      setResizeObserver(new ResizeObserver(function () {
        setContainerWidth((0, _calculateTotalWidth.default)(['bx--header__nav-container']));
        setTotalNavWidth((0, _calculateTotalWidth.default)(['bx--header__nav']));
      }));
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (totalNavWidth > containerWidth) {
      // 80 accounts for caret sizes
      if (headerNavContainerRef.current.scrollLeft === 0 || headerNavContainerRef.current.scrollLeft + containerWidth < totalNavWidth - 80) {
        setShowRightCaret(true);
      }

      if (headerNavContainerRef.current.scrollLeft > 0) {
        setShowLeftCaret(true);
      }
    } else {
      setShowLeftCaret(false);
      setShowRightCaret(false);
    }
  }, [containerWidth, totalNavWidth]);
  (0, _react.useEffect)(function () {
    var headerNavContainerNode = headerNavContainerRef.current;

    if (resizeObserver) {
      resizeObserver.observe(headerNavContainerNode);
    }

    return function () {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [resizeObserver]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("button", {
    className: "".concat(prefix, "--header__nav-caret-left"),
    "aria-label": "Masthead left caret",
    hidden: !showLeftCaret,
    onClick: paginateLeft
  }, _react.default.createElement(_.default, null)), _react.default.createElement("div", {
    className: "".concat(prefix, "--header__nav-container"),
    ref: headerNavContainerRef
  }, children), _react.default.createElement("button", {
    className: "".concat(prefix, "--header__nav-caret-right"),
    "aria-label": "Masthead right caret",
    hidden: !showRightCaret,
    onClick: paginateRight
  }, _react.default.createElement(_2.default, null)));
};

HeaderNavContainer.propTypes = {
  /**
   * Container for other components.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};
var _default = HeaderNavContainer;
exports.default = _default;