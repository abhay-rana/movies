import React, { useEffect } from 'react';
import { DefaultParams, Redirect, Route, RouteComponentProps } from 'wouter';
import { useAppLocation } from '~/components/library/routing';
import { useAppDispatch, useAppSelector } from '~/hooks/redux-hooks';
import { AddRouteToPrivateRoute } from '~/redux/slices/container-slice';

export interface IPrivateRoute {
    component: React.ComponentType<RouteComponentProps<DefaultParams>>;
    path: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
    component: Component,
    path,
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(AddRouteToPrivateRoute({ path }));
    }, []);

    // const store = useAppSelector((state) => ({
    //     is_auth: false,
    // }));

    console.log('abhay rana');

    // if (!store.is_auth) {
    // }

    return <Redirect to="/login" />;
    // return (
    //     <>
    //         <Route path={path} component={Component} />
    //     </>
    // );
};

export default PrivateRoute;
