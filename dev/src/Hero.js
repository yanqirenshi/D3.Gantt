export default function Hero() {
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
                  <li className="is-active">
                    <a>Output</a>
                  </li>
                  <li>
                    <a>Input</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

        </section>
    );
}
