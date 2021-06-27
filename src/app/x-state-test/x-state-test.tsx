
import './x-state-test.scss';
import React from 'react';

import { Page } from '../layout';
import { SimpleFetch } from './simple-fetch/simple-fetch';

interface XStateTestProps {

}

export function XStateTest(props: XStateTestProps) {
  return (
    <Page>
      <div className="x-state-test">
        <div className="example-section">
          <div className="header-text">
            Simple Fetch
          </div>
          <div className="content-section">
            <SimpleFetch/>
          </div>
        </div>
      </div>
    </Page>
  );
}
