import React from 'react';

const style = {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 22,
    left: 20,
    toggles: {
        left: {
            borderRadius:'8px 0px 0px 8px',
        },
        right: {
            borderRadius:'0px 8px 8px 0px',
            borderLeft:'none',
        },
    },
};

export default function OutputController (props) {
    const unit = props.unit;
    const changeUnit = props.changeUnit;
    const filter = props.filter;
    const changeFilter = props.changeFilter;

    const clickButton = (e) => {
        const new_filter = {...filter};

        new_filter.status = {...filter.status};

        const code = e.target.getAttribute('code');
        new_filter.status[code] = !new_filter.status[code];

        changeFilter(new_filter);
    };

    return (
        <div style={style}>

          <div className="select">
            <select onChange={changeUnit}
                    value={unit}>
              <option value="M">月</option>
              <option value="w">週</option>
            </select>
          </div>

          <div style={{marginLeft:22}}>

            <button className={'button ' + (filter.status.active ? 'is-info' : '')}
                    style={style.toggles.left}
                    code="active"
                    onClick={clickButton}>
              未完了
            </button>

            <button className={'button ' + (filter.status.close ? 'is-info' : '')}
                    style={style.toggles.right}
                    code="close"
                    onClick={clickButton}>
              完了
            </button>

          </div>

        </div>
    );
}
