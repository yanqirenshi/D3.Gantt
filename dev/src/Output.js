import React, { useState, useEffect } from 'react';

import D3Gantt, {Rectum} from './lib/index.js';

const rectum = new Rectum({
    transform:  {
        k: 1.0,
        x: 0.0,
        y: 0.0,
    },
});

export default function Output (props) {
    const [data] = useState(props.source);

    useEffect(()=> rectum.data(rectum.styling(data)), [data]);

    return (
        <div>
          <D3Gantt rectum={rectum}/>
        </div>
    );
}
