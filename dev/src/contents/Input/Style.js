import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Style () {
    return (
        <div style={{display: 'flex', justifyContent: 'center' }}>
          <div style={{width:1111}}>
            <div style={{width:444}}>
              <SyntaxHighlighter language="javascript" style={dark}>
                {JSON.stringify(style, null, '    ')}
              </SyntaxHighlighter>
            </div>

            <div>
            </div>
          </div>
        </div>
    );
}

const style = {
    stage: {
        padding: 22,
        background: '#f8f8f8',
    },
    head: {
        h: 111,
        cell: {
            size: { w:0, h:0 },
            color: '#333',
            background: '#fafafa',
        },
        background: '#fff',
    },
    body: {
        row: {
            padding: 33,
            background: '#fff',
        },
        chart: {
            h: 111,
            padding: 11,
            background: '#e0ebaf',
            label: {
                h: 122,
                margin: { bottom:10 },
            },
            plan: {
                h: 111,
                background: '#e0ebaf',
            },
            result: {
                h: 111,
                shift: 22,
                background: '#eeeeee',
            },
            progress: {
                h: 111,
                background: '#f00',
            },
        },
        background: '#fff',
    },
    foot: {
        h: 33,
        background: '#fff',
    },
};
