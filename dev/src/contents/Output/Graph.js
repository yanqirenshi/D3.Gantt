import React, { useEffect } from 'react';

import D3Gantt, {Rectum} from '../../lib/index.js';

const rectum = new Rectum({
    transform:  {
        k: 0.3,
        x: 0.0,
        y: 0.0,
    },
});

export default function Graph (props) {
    const data = props.data;

    React.useEffect(()=> {
        rectum.data(data);
    }, [data]);

    return (
        <div style={{height:'100%'}}>
          <D3Gantt rectum={rectum}/>
        </div>
    );
}
