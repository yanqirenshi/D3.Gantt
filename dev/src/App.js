import 'bulma/css/bulma.min.css';

import Hero from './components/Hero.js';
import Input from './components/Input.js';
import Output from './components/Output.js';

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
