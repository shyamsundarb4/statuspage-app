import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import StatusPage from './pages/StatusPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();
  console.log({ isAuthenticated, isLoading, user });
  if (isLoading) return <div>Loading...</div>;
  //if (!isAuthenticated) return <div>Please log in</div>;
  return (
    <div>
      <header>
        <h1>Status Page App</h1>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.email}</span>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
          </>
        ) : (
          <button onClick={loginWithRedirect}>Login</button>
        )}
      </header>
      <main>
        <StatusPage />
        {isAuthenticated && <AdminDashboard />}
      </main>
    </div>
  );
}

export default App;
