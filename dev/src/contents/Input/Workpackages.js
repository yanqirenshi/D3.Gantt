import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Workpackages () {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width:1111}}>
            <div style={{width:333}}>
              <SyntaxHighlighter language="javascript" style={dark}>
                {JSON.stringify(workpackages, null, '    ')}
              </SyntaxHighlighter>
            </div>

            <div>
            </div>
          </div>
        </div>
    );
}

const workpackages = {
    id: 1000,
    parent: 10,
    name: 'Task 1000',
    plan:   { start: '2020-09-01', end: '2021-09-30'},
    result: { start: '2020-09-01', end: '2021-09-30'},
    style:  { background: '#c1e4e9' },
};
