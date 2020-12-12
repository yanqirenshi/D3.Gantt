import React, { useState, useEffect } from 'react';

import D3Gantt from '../gantt/D3.Gantt.js';

const style={
    root: {
        width: 1111,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
};

function Output (props) {
    const [ass] = useState(new D3Gantt().init({
        svg: {
            selector: '#asshole-graph',
            w: 1111, h: 333,
        }
    }));

    useEffect(() => {
        const graph_data = props.source;
        ass.data(graph_data);
    });

    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         ass.svgSize(document.getElementById('asshole-graph-container'));
    //     });
    // }, []);
    return <section className="section" style={style.root}>
             <div className="container">
               <h1 className="title">Output</h1>

               <div id='asshole-graph-container'>
                 <svg id='asshole-graph'/>
               </div>
             </div>
           </section>;
}

export default Output;
