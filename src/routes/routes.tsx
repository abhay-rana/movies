import React, { useEffect } from 'react';
import { Route, Router, Switch, useLocation } from 'wouter';

const DetailScreen = React.lazy(() => import('~/screens/detail-screen'));
const MoviesListingScreen = React.lazy(
    () => import('~/screens/listing-screen')
);
const RouteNotFound = React.lazy(() => import('~/screens/404'));

const routeConfig = [
    { path: '/', component: MoviesListingScreen },
    { path: '/movie/:id', component: DetailScreen },
];

const Routes: React.FC = () => {
    return (
        <>
            <Router>
                <React.Suspense fallback={<h1>Loading Routes...</h1>}>
                    <Switch>
                        {routeConfig.map((item, index) => (
                            <Route
                                key={index}
                                path={item.path}
                                component={item.component}
                            />
                        ))}
                        <Route component={RouteNotFound} />
                    </Switch>
                </React.Suspense>
            </Router>
        </>
    );
};

export default Routes;
