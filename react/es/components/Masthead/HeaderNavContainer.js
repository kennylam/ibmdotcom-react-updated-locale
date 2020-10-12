import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import calculateTotalWidth from '@carbon/ibmdotcom-utilities/es/utilities/calculateTotalWidth/calculateTotalWidth';
import CaretLeft20 from '@carbon/icons-react/es/caret--left/20';
import CaretRight20 from '@carbon/icons-react/es/caret--right/20';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
var prefix = settings.prefix;
/**
 * Header nav container component.
 */

var HeaderNavContainer = function HeaderNavContainer(_ref) {
  var children = _ref.children;
  var headerNavContainerRef = useRef(null);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      resizeObserver = _useState2[0],
      setResizeObserver = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showLeftCaret = _useState4[0],
      setShowLeftCaret = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showRightCaret = _useState6[0],
      setShowRightCaret = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      containerWidth = _useState8[0],
      setContainerWidth = _useState8[1];

  var _useState9 = useState(0),
      _useState10 = _slicedToArray(_useState9, 2),
      totalNavWidth = _useState10[0],
      setTotalNavWidth = _useState10[1];

  var paginateLeft = useCallback(function () {
    headerNavContainerRef.current.scrollLeft -= containerWidth;
    setShowRightCaret(true); // 40 accounts for caret size

    if (headerNavContainerRef.current.scrollLeft <= 40) {
      setShowLeftCaret(false);
      headerNavContainerRef.current.scrollLeft = 0;
    }
  }, [containerWidth]);
  var paginateRight = useCallback(function () {
    headerNavContainerRef.current.scrollLeft += containerWidth;
    setShowLeftCaret(true); // 80 accounts for caret sizes

    if (headerNavContainerRef.current.scrollLeft + containerWidth >= totalNavWidth - 80) {
      setShowRightCaret(false);
      headerNavContainerRef.current.scrollLeft += 80;
    }
  }, [containerWidth, totalNavWidth]);
  useEffect(function () {
    if (window.ResizeObserver) {
      setResizeObserver(new ResizeObserver(function () {
        setContainerWidth(calculateTotalWidth(['bx--header__nav-container']));
        setTotalNavWidth(calculateTotalWidth(['bx--header__nav']));
      }));
    }
  }, []);
  useEffect(function () {
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
  useEffect(function () {
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
  return React.createElement(React.Fragment, null, React.createElement("button", {
    className: "".concat(prefix, "--header__nav-caret-left"),
    "aria-label": "Masthead left caret",
    hidden: !showLeftCaret,
    onClick: paginateLeft
  }, React.createElement(CaretLeft20, null)), React.createElement("div", {
    className: "".concat(prefix, "--header__nav-container"),
    ref: headerNavContainerRef
  }, children), React.createElement("button", {
    className: "".concat(prefix, "--header__nav-caret-right"),
    "aria-label": "Masthead right caret",
    hidden: !showRightCaret,
    onClick: paginateRight
  }, React.createElement(CaretRight20, null)));
};

HeaderNavContainer.propTypes = {
  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default HeaderNavContainer;