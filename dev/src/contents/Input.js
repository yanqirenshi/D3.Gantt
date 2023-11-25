import React from 'react';

import Envelope from './Input/Envelope.js';
import Style from './Input/Style.js';
import Wbs from './Input/Wbs.js';
import Workpackages from './Input/Workpackages.js';

const style={
    root: {
        width: 1111,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
};

function Input () {
    const [tabs, setTabs] = React.useState({
        selected: 'envelope',
        list: [
            { code: 'envelope',     label: 'Envelope' },
            { code: 'wbs',          label: 'Wbs' },
            { code: 'workpackages', label: 'Workpackages' },
            { code: 'style',        label: 'Style' },
        ],
    });

    const click = (e)=> {
        const code = e.target.getAttribute('code');

        if (tabs.selected===code) return;

        const new_tabs = {...tabs};

        new_tabs.selected = code;

        setTabs(new_tabs);
    };

    return (
        <div style={{width:'100%', height: '100%', overflow:'auto'}}>
          <div style={{padding:11, display:'flex',justifyContent:'center'}}>
            <div className="tabs is-toggle is-small">
              <ul>
                  {tabs.list.map(tab=> {
                      return (
                          <li key={tab.code}
                              className={tabs.selected===tab.code ? "is-active" : null}
                              code={tab.code}
                              onClick={click}>
                            <a code={tab.code}>
                              {tab.label}
                            </a>
                          </li>
                      );
                  })}
              </ul>
            </div>
          </div>

          {tabs.selected==='envelope' && <Envelope/>}
          {tabs.selected==='wbs' && <Workpackages/>}
          {tabs.selected==='workpackages' && <Wbs/>}
          {tabs.selected==='style' && <Style/>}
        </div>
    );
}

export default Input;
