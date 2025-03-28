import { useLocation } from 'wouter';
import { AddRouteToPrivateRoute } from '~/redux/slices/container-slice';
import store from '~/redux/store';

function useAppLocation() {
    const [location, setLocation] = useLocation();
    function setWouterLocation(path: string) {
        if (store.getState().container_store.private_routes.includes(path)) {
            setLocation('/login');
        } else {
            setLocation(path);
        }
    }
    return [location, setWouterLocation];
}

export { useAppLocation };
