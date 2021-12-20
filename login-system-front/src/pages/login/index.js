import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import { login } from "../../services/auth";
import decode from 'jwt-decode';

import api from '../../services/api';

import './style.css'

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
     
    const handleLogin = async (e) => {
       e.preventDefault();          

        if (!email || !password) {
            setError("Preencha todos os campos para entrar");
        } 
        else {
            try {
                let response = await api.post("/sessions", { email, password });
                login(response.data.token);

                const { uid } = decode(response.data.token);
                response = await api.get(`/users/${uid}`);

                if (response.data.level === 999)
                    props.history.push("/adminDash");
                else if (response.data.level === 1)
                    props.history.push("/userDash");
                else {
                    setError("Você foi desativado da empresa.");
                }
            } catch (err) {
                console.warn(err);
                setError("Houve um problema com o login, verifique suas credenciais.");
            }
        }       
    }
 
    return (
       <div className="login">         
        <form onSubmit={handleLogin}>
          <div className="login-inputs">
             <h1>Acessar App</h1>
 
             <div className="login-loginInputEmail">                
                <input
                   type="email"
                   placeholder="Digite um email"
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                />
             </div>
 
             <div className="login-loginInputPassword">                
                <input
                   placeholder="Digite sua senha"
                   type="password"
                   value={password}                   
                   onChange={e => setPassword(e.target.value)}
                />                
             </div>
 
             <button type="submit">
                Entrar
             </button>
 
             <h4>Não tenho conta!</h4>

             <button>
                <Link className="linkLogin" to="/signup">Cadastrar</Link>
             </button>
          </div>
        </form>
       </div>
    )
 }
 
 export default withRouter(Login);