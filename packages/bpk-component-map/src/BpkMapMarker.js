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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayView } from 'react-google-maps';
import { cssModules } from 'bpk-react-utils';
import { withRtlSupport } from 'bpk-component-icon';
import BpkLargeLocationIcon from 'bpk-component-icon/lg/location';

import STYLES from './bpk-map.scss';

const getClassName = cssModules(STYLES);

class BpkMapMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: this.props.selected,
      tooltip: null,
    };
  }

  componentWillMount() {
    const {
      name,
      size,
      latitude,
      longitude,
      buildMarkerTooltip,
      ...rest
    } = this.props;
    let tooltipElement = null;
    if (buildMarkerTooltip) {
      tooltipElement = buildMarkerTooltip({
        name,
        size,
        latitude,
        longitude,
        ...rest,
      });
    } else {
      tooltipElement = (
        <div className={getClassName('bpk-map__marker-title')}>{name}</div>
      );
    }
    if (tooltipElement) {
      this.setState({ tooltip: tooltipElement });
    }
  }

  handleMouseEnterEvent = () => {
    this.setState({ isShow: true });
  };

  handleMouseLeaveEvent = () => {
    this.setState({ isShow: false });
  };

  handleClickEvent = ({
    name,
    size,
    latitude,
    longitude,
    callback,
    ...rest
  }) => {
    if (callback) {
      callback({ name, size, latitude, longitude, ...rest });
    }
  };

  render() {
    const {
      className,
      iconClass,
      name,
      size,
      latitude,
      longitude,
      icon,
      onMarkerClick,
      buildMarkerTooltip,
      ...rest
    } = this.props;
    const classNames = [getClassName('bpk-map__marker')];

    if (className) {
      classNames.push(className);
    }

    const RtlSupportedMarkerIcon = withRtlSupport(icon || BpkLargeLocationIcon);

    return (
      <OverlayView
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        position={{ lat: latitude, lng: longitude }}
      >
        <div>
          <button
            className={classNames.join(' ')}
            onMouseEnter={this.handleMouseEnterEvent}
            onMouseLeave={this.handleMouseLeaveEvent}
            onClick={() =>
              this.handleClickEvent({
                name,
                size,
                latitude,
                longitude,
                callback: onMarkerClick,
                ...rest,
              })
            }
            {...rest}
          >
            <RtlSupportedMarkerIcon className={iconClass} />
          </button>
          {this.state.isShow && this.state.tooltip}
        </div>
      </OverlayView>
    );
  }
}

BpkMapMarker.propTypes = {
  className: PropTypes.string,
  iconClass: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  icon: PropTypes.element,
  buildMarkerTooltip: PropTypes.func,
  onMarkerClick: PropTypes.func,
};

BpkMapMarker.defaultProps = {
  className: null,
  iconClass: null,
  name: null,
  size: 'regular',
  selected: false,
  icon: null,
  buildMarkerTooltip: null,
  onMarkerClick: null,
};

export default BpkMapMarker;
