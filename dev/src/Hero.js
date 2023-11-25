export default function Hero(props) {
    const tabs = props.tabs;
    const callbacks = props.callbacks;

    const click = (e)=> {
        const code = e.target.getAttribute('code');

        if (tabs.selected===code) return;

        const new_tabs = {...tabs};

        new_tabs.selected = code;

        callbacks.tabs.change(new_tabs);
    };

    return (
        <section className="hero" style={{background:'#4d5aaf'}}>

          <div className="hero-body">
            <div className="container">
              <h1 className="title" style={{color:'#fff'}}>
                D3.Gantt
              </h1>
            </div>
          </div>

          <div className="hero-foot">
            <nav className="tabs is-boxed is-centered">
              <div className="container">
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
            </nav>
          </div>

        </section>
    );
}
