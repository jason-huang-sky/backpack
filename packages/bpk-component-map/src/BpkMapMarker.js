/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow */

import Popper from '@skyscanner/popper.js';
import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import { Portal, cssModules } from 'bpk-react-utils';
import { OverlayView } from 'react-google-maps';

import BpkTooltip from './BpkTooltip';
import { ARROW_ID } from './constants';
import STYLES from './bpk-map.scss';

const getClassName = cssModules(STYLES);

const hasTouchSupport = () =>
  !!(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch))
  );

type State = {
  isOpen: boolean,
};

export type Props = {
  target: Node,
  children: Node,
  latitude: ?number,
  longitude: ?number,
  placement: 'top' | 'right' | 'bottom' | 'left' | 'auto',
  padded: boolean,
  selected: boolean,
  hideOnTouchDevices: boolean,
  portalStyle: ?Object, // eslint-disable-line react/forbid-prop-types
  portalClassName: ?string,
  popperModifiers: ?Object,
};

class BpkMapMarker extends Component<Props, State> {
  popper: ?Popper;
  targetRef: ?HTMLElement;

  static propTypes = {
    target: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    placement: PropTypes.oneOf(Popper.placements),
    padded: PropTypes.bool,
    selected: PropTypes.bool,
    hideOnTouchDevices: PropTypes.bool,
    portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    portalClassName: PropTypes.string,
    popperModifiers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    placement: 'top',
    hideOnTouchDevices: true,
    padded: true,
    selected: false,
    portalStyle: null,
    portalClassName: null,
    popperModifiers: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: this.props.selected,
    };

    this.popper = null;
    this.targetRef = null;
  }

  componentWillUnmount() {
    if (this.targetRef) {
      const ref = this.targetRef;

      ref.removeEventListener('mouseenter', this.openTooltip);
      ref.removeEventListener('mouseleave', this.closeTooltip);
    }
  }

  onOpen = (tooltipElement: HTMLElement, targetElement: HTMLElement) => {
    this.popper = new Popper(targetElement, tooltipElement, {
      placement: this.props.placement,
      modifiers: {
        ...this.props.popperModifiers,
        arrow: {
          element: `#${ARROW_ID}`,
        },
      },
    });

    this.popper.scheduleUpdate();
  };

  beforeClose = (done: () => mixed) => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    done();
  };

  openTooltip = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeTooltip = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      target,
      children,
      latitude,
      longitude,
      placement,
      padded,
      selected,
      hideOnTouchDevices,
      portalStyle,
      portalClassName,
      popperModifiers,
      ...rest
    } = this.props;
    const classNames = [getClassName('bpk-map-marker')];
    const renderPortal = !hasTouchSupport() || !hideOnTouchDevices;

    if (portalClassName) {
      classNames.push(portalClassName);
    }

    return (
      <OverlayView
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        position={{ lat: latitude, lng: longitude }}
      >
        {renderPortal ? (
          <Portal
            target={target}
            targetRef={ref => {
              this.targetRef = ref;
              if (this.targetRef) {
                this.targetRef.addEventListener('mouseenter', this.openTooltip);
                this.targetRef.addEventListener(
                  'mouseleave',
                  this.closeTooltip,
                );
              }
            }}
            isOpen={this.state.isOpen}
            onOpen={this.onOpen}
            onClose={this.closeTooltip}
            style={portalStyle}
            className={classNames.join(' ')}
          >
            <BpkTooltip id="" padded={padded} {...rest}>
              {children}
            </BpkTooltip>
          </Portal>
        ) : (
          target
        )}
      </OverlayView>
    );
  }
}

export default BpkMapMarker;
