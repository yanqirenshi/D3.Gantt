import React from 'react';

import 'bulma/css/bulma.min.css';
import Measure from 'react-measure';

import Hero from './Hero.js';
import Input from './contents/Input.js';
import Output from './contents/Output.js';
import Classes from './contents/Classes.js';

import DATA from './DATA.js';

const style = {
    position:'fixed',
    left:0,
    top:0,
    width:'100vw',
    height:'100vh'
};

function App() {
    const [bounds, setBounds] = React.useState(null);
    const [tabs, setTabs] = React.useState({
        selected: 'output',
        list: [
            { code: 'output', label: 'Output' },
            { code: 'input',  label: 'Input' },
            { code: 'classes',  label: 'Classes' },
        ],
    });

    const callbacks = {
        tabs: {
            change: (new_tabs)=> setTabs(new_tabs),
        },
    };

    return (
        <div style={style}>

          <Measure bounds onResize={rect => setBounds(rect.bounds)}>
            {({ measureRef }) => (
                <div ref={measureRef}>
                  <Hero tabs={tabs} callbacks={callbacks}/>
                </div>
            )}
          </Measure>

          {bounds && (
              <div style={{
                  height: `calc(100vh - ${bounds.height}px)`,
                  width: '100%' }}>

                {tabs.selected==='output'  && <Output  source={DATA} />}
                {tabs.selected==='input'   && <Input   source={DATA} />}
                {tabs.selected==='classes' && <Classes source={DATA} />}
              </div>
          )}
        </div>

    );
}

export default App;
