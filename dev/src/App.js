import 'bulma/css/bulma.min.css';

import Hero from './Hero.js';
import Input from './Input.js';
import Output from './Output.js';

import DATA from './DATA.js';

function App() {
    return (
        <>
          <Hero />
          <Output source={DATA} />
          <Input source={DATA} />
        </>
    );
}

export default App;
