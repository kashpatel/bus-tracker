import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AgencyList from './agency-list/AgencyList';
import AgencyRoutes from './agency-routes/AgencyRoutes';

const Content = () => (
    <main
        style={{
            flex: '1 1 auto',
            height: '100%',
            width: '100%'
        }}
    >
        <Switch>
            <Route exact path="/" component={AgencyList} />
            <Route path="/agency/:tag" component={AgencyRoutes} />
        </Switch>
    </main>
);

export default Content;

// <Route path='/roster' component={Roster}/>
//       <Route path='/schedule' component={Schedule}/>
