import React, { useState, useEffect } from 'react';

import OutputController from './Output/OutputController.js';
import Graph from './Output/Graph.js';

export default function Output (props) {
    const source = props.source;

    const [unit, setUnit] = React.useState('w');
    const [filter, setFilter] = React.useState({
        status: {
            active: true,
            close: true,
        }
    });

    const changeUnit = (e)=> setUnit(e.target.value);
    const changeFilter = (new_filter)=> setFilter(new_filter);

    if (!source)
        return null;

    return (
        <div style={{height:'100%', width:'100%', position:'relative'}}>

          <OutputController unit={unit} changeUnit={changeUnit}
                            filter={filter} changeFilter={changeFilter}/>

          <Graph data={source}/>
        </div>
    );
}
