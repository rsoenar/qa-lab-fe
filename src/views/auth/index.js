import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';

const Login = React.lazy(() => import('./login'));
const Register = React.lazy(() => import('./register'));
const Auth = ({ match }) => {
  const { url } = match;

  return (
    <AuthLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${url}/`} to={`${url}/login`} />
          <Route
            path={`${url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${url}/register`}
            render={(props) => <Register {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </AuthLayout>
  );
};

export default Auth;
