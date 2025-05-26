import * as React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function HomePage() {
  const {user} = useAuth();
  return (
    <React.Fragment>
        <h1>Página inicial da aplicação </h1>
        <h3>Bem vindo, {user.username}</h3>
    </React.Fragment>
  );
}

export default HomePage;
