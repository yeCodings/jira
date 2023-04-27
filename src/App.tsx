import React from 'react';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticateApp } from 'unauthenticated-app';
import 'App.css'


function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticateApp />}
    </div>
  );
}

export default App;
