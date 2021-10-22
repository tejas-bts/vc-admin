import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from './user';

export const PrivateRoute = ({component: Component, permission, ...rest}) => {
    const isAllowed = () => {
        const currentUser = getCurrentUser()
        console.log("Current User", currentUser);
        return currentUser?.permissions?.includes(permission);
    }
    return (
        <Route {...rest} render={props => (
            isAllowed() ?
                <Component {...props} />
            : <Redirect to="/unauthorized" />
        )} />
    );
};