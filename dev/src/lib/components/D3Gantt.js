import React, { useState, useEffect } from 'react';

import Asshole from '@yanqirenshi/assh0le';
import Rectum from '../js/Rectum.js';

const rectum = new Rectum();

const style={
    root: {
        width: 1111,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
};

export default function D3Gantt (props) {
    const [data, setData] = useState(props.source);

    useEffect(()=> rectum.data(rectum.styling(data)), [data]);

    return (
        <div style={{padding: 22}}>
          <div style={{height:555, border: '1px solid #eee'}}>
            <Asshole id="asshole-graph" rectum={rectum}/>
          </div>
        </div>
    );
}
