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
    const [unit, setUnit] = useState('w');
    const [data, setData] = useState(null);

    useEffect(()=> {
        setData(props.source);
    }, []);

    useEffect(()=> {
        if (!data)
            return;
        rectum.data(rectum.styling(data));
    }, [data]);

    useEffect(()=> {
        if (!data) return;

        const new_data = {...data};

        new_data.scale.cycle = unit;

        setData(new_data);
    }, [unit]);

    const changeUnit = (e)=> setUnit(e.target.value);

    if (!data)
        return null;

    return (
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}>

            <div className="select">
              <select onChange={changeUnit}
                      value={unit}>
                <option value="M">月</option>
                <option value="w">週</option>
              </select>
            </div>

          </div>

          <div style={{height:600}}>
            <D3Gantt rectum={rectum}/>
          </div>
        </div>
    );
}
