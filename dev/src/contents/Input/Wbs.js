import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Wbs () {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width:1111}}>
            <div style={{width:333}}>
              <SyntaxHighlighter language="javascript" style={dark}>
                {JSON.stringify(wbs, null, '    ')}
              </SyntaxHighlighter>
            </div>

            <div>
            </div>
          </div>
        </div>
    );
}

const wbs = {
    id: 10,
    name: 'WBS 10',
};
