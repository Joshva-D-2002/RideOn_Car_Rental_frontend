import { Navigate } from 'react-router-dom';
const Auth = (Component: any) => {
    return (props: any) => {
        const isAuthenticated = localStorage.getItem('authToken');

        if (!isAuthenticated) {
            return <Navigate to={'/'} replace />
        }

        return <Component {...props} />;
    };
};

export default Auth;
