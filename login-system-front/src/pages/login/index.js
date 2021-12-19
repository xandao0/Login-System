import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";

import api from '../../services/api';

import './style.css'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
     
    const handleLogin = (e) => {
       e.preventDefault();       
       
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