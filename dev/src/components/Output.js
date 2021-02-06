import React, { useState, useEffect } from 'react';

import D3Gantt, {Camera} from '../gantt/index.js';

const style={
    root: {
        width: 1111,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
};

function Output (props) {
    const [camera] = useState(new Camera({
        look: {
            at: {x:1500, y:1000},
            scale: 4,
        },
    }));

    const graph_data = props.source;

    return (
        <div style={{padding: 22}}>
          <div style={{height:555, border: '1px solid #eee'}}>
            <D3Gantt source={graph_data} camera={camera} />
          </div>
        </div>
    );
}

export default Output;
