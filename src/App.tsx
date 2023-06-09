import React from 'react';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticateApp } from 'unauthenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import 'App.css'


function App() {
  const { user } = useAuth()

  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      {user ? <AuthenticatedApp /> : <UnauthenticateApp />}
    </ErrorBoundary>
  );
}

export default App;
