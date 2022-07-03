import React, { useState, useEffect } from 'react';

import D3Gantt, {Rectum} from './lib/index.js';
import OutputController from './OutputController.js';

const rectum = new Rectum({
    transform:  {
        k: 0.3,
        x: 0.0,
        y: 0.0,
    },
});

export default function Output (props) {
    const [unit, setUnit] = React.useState('w');
    const [filter, setFilter] = React.useState({
        status: {
            active: true,
            close: true,
        }
    });
    const [data, setData] = React.useState(null);

    React.useEffect(()=> {
        setData(props.source);
    }, []);

    React.useEffect(()=> {
        if (!data)
            return;
        rectum.data(rectum.styling(data));
    }, [data]);

    React.useEffect(()=> {
        if (!data) return;

        const new_data = {...data};

        new_data.scale.cycle = unit;

        setData(new_data);
    }, [unit]);

    const changeUnit = (e)=> setUnit(e.target.value);
    const changeFilter = (new_filter)=> setFilter(new_filter);

    if (!data)
        return null;

    return (
        <div style={{height:'100%', width:'100%', position:'relative'}}>

          <OutputController unit={unit} changeUnit={changeUnit}
                            filter={filter} changeFilter={changeFilter}/>

          <div style={{height:'100%'}}>
            <D3Gantt rectum={rectum}/>
          </div>
        </div>
    );
}
