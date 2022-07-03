import React from 'react';

import 'bulma/css/bulma.min.css';
import Measure from 'react-measure';

import Hero from './Hero.js';
import Input from './Input.js';
import Output from './Output.js';

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

    return (
        <div style={style}>

          <Measure bounds onResize={rect => setBounds(rect.bounds)}>
            {({ measureRef }) => (
                <div ref={measureRef}>
                  <Hero />
                </div>
            )}
          </Measure>

          {bounds && (
              <div style={{
                  height: `calc(100vh - ${bounds.height}px)`,
                  width: '100%' }}>
                <Output source={DATA} />
                {/* <Input source={DATA} /> */}
              </div>
          )}
        </div>

    );
}

export default App;
