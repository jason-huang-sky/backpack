/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import { storiesOf } from '@storybook/react';

import { BpkDataTable, BpkColumn } from './index';

const rows = [
  { name: 'Jose', description: 'Software Engineer', bla: 'Bla' },
  { name: 'Rolf', description: 'Some guy', bla: 'Bla' },
];

// eslint-disable-next-line no-alert
const onRowClick = row => alert(JSON.stringify(row));

storiesOf('bpk-component-datatable', module)
  .add('Example', () => (
    <BpkDataTable
      rows={rows}
      height={300}
      dir={document.querySelector('html').dir}
      onRowClick={onRowClick}
    >
      <BpkColumn
        label="Name"
        dataKey="name"
        width={100}
      />
      <BpkColumn
        label="Description"
        dataKey="description"
        width={100}
        flexGrow={1}
      />
      <BpkColumn
        label="Bla"
        dataKey="bla"
        width={100}
        disableSort
      />
    </BpkDataTable>
  ));
