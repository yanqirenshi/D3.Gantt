import React, { useState, useEffect } from 'react';

import D3Gantt, {Rectum} from './lib/index.js';

const rectum = new Rectum();

export default function Output (props) {
    const [data, setData] = useState(props.source);

    useEffect(()=> rectum.data(rectum.styling(data)), [data]);

    return (
        <div>
          <D3Gantt rectum={rectum}/>
        </div>
    );
}
