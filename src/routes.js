import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sidebar from './components/Sidebar'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Sidebar} />
            </Switch>
        </BrowserRouter>
    );
}