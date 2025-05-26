import React, { createContext, useState, useContext, useEffect } from 'react';
import { createUser, login } from '../services/services.js'; 

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //aqui vai ficar 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); //serve pra mostrar para a aplicacao que o processo ainda esta sendo realizado, nesse tempo pode mostrar um gif de processando

    useEffect(() => { //useEffect que manda na porra toda
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
        setLoading(false); // set this to false at the end
    }, []);

    const SignIn = async (username, password) => {
        try {
            //const response = await login(username, password);
            const response = {
                id: 1,
                username: 'lodi',
                email: 'seu@cu.com'
            }

            console.log(response);

            if (response.id){//(response.ok) {
                setUser({id: response.id,username: response.username}) //email: response.email}); 
                localStorage.setItem('userInfo', JSON.stringify({id: response.id,username: response.username, email: response.email})); //cria o userInfo
                setIsAuthenticated(true); 
                setLoading(false);
                return null;
            } else {
                return "Usuário não cadastrado"; 
            }
        } catch (error) {
            console.error('SignIn error:', error);
            setLoading(false);
            return "Erro ao tentar logar"; 
        }
    };

    const SignUp = async (userName, senha, email) => {
        try {
            const response = await createUser(userName, senha, email);

            if (response.id) {
                console.log("userContext: usuário criado id: ",response.id, "userName:",response.userName);
                setLoading(false);
                return response;
            } else {
                return  "Erro algum erro ao criar usuário"; // User not found or invalid credentials
            }
        } catch (error) {
            console.error('SignUp error:', error);
            setLoading(false);
            return "Exceção ao criar usuário";  // Handle login error
        }
    };

    const SignOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('userInfo');
        setLoading(false);
    };

    //Aqui nesse retorno vc ta dizendo pro react: escuta aqui seu fdp vc vai passar para todos os meus filhos essas informacoes: quem e o usuario, se ele ta autenticado, loading e outras funcioes
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, SignIn, SignUp, SignOut }}> 
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);