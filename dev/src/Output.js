import React, { useState, useEffect } from 'react';

import D3Gantt from './lib/index.js';

export default function Output (props) {
    return (
        <D3Gantt source={props.source}/>
    );
}
