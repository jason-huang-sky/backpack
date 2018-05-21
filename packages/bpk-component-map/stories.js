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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import BpkLargeLocationIcon from 'bpk-component-icon/lg/location';
import BpkHotelIcon from 'bpk-component-icon/sm/hotels';
import { BpkMap, BpkMapMarker } from './index';

const AlignedLocationIcon = withButtonAlignment(
  withRtlSupport(BpkLargeLocationIcon),
);
const AlignedHotelIcon = withButtonAlignment(withRtlSupport(BpkHotelIcon));

const zoom = level => {
  console.info(level);
};

const drag = (bounds, center) => {
  console.info(bounds);
  console.info(center);
};

storiesOf('bpk-component-map', module)
  .add('Simple', () => (
    <BpkMap
      zoom={15}
      centerLatitude={55.944357}
      centerLongitude={-3.1967116}
      language="en"
    />
  ))
  .add('Set some props', () => (
    <BpkMap
      zoom={15}
      centerLatitude={55.944357}
      centerLongitude={-3.1967116}
      zoomEnabled={false}
      dragEnabled={false}
      width="600px"
      height="600px"
      language="zh"
    />
  ))
  .add('With onZoom and onDrag callback', () => (
    <BpkMap
      zoom={15}
      centerLatitude={55.944357}
      centerLongitude={-3.1967116}
      onZoom={zoom}
      onDrag={drag}
    />
  ))
  .add('Load Map with BoundBox', () => (
    <BpkMap
      boundSouth={55.94129273544452}
      boundWest={-3.2285547854247625}
      boundNorth={55.952707392208396}
      boundEast={-3.159632742578083}
      onDrag={drag}
    />
  ))
  .add('Load Map with Marker', () => (
    <BpkMap
      boundSouth={55.94129273544452}
      boundWest={-3.2285547854247625}
      boundNorth={55.952707392208396}
      boundEast={-3.159632742578083}
      onDrag={drag}
    >
      <BpkMapMarker
        latitude={55.943763}
        longitude={-3.195272}
        target={
          <div>
            <AlignedHotelIcon />
          </div>
        }
      >
        The Langham London
      </BpkMapMarker>
    </BpkMap>
  ))
  .add('Load Markers, one seleted', () => (
    <BpkMap
      boundSouth={55.94129273544452}
      boundWest={-3.2285547854247625}
      boundNorth={55.952707392208396}
      boundEast={-3.159632742578083}
      onDrag={drag}
    >
      <BpkMapMarker
        id="controlForm"
        latitude={55.944357}
        longitude={-3.1967116}
        target={
          <div>
            <AlignedLocationIcon />
          </div>
        }
      >
        Capital Airport International Hotel
      </BpkMapMarker>
      <BpkMapMarker
        latitude={55.943763}
        longitude={-3.195272}
        target={
          <div>
            <AlignedHotelIcon />
          </div>
        }
        selected
      >
        The Langham London
      </BpkMapMarker>
    </BpkMap>
  ));
