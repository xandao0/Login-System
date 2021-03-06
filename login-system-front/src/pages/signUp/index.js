import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import './style.css'

function SignUp(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [cpf, setCPF] = useState("")
    const [error, setError] = useState("")

         
    const handleSignUp = async (e) => {
       e.preventDefault();       

      
        if (!name || !cpf || !email || !password ) {
            setError("Preencha todos os campos!");
        }   
        else {
            try {
                const FD = new FormData()    
                            
                FD.append('name', name);
                FD.append('cpf', cpf);               
                FD.append('email', email);
                FD.append('password', password);
                console.log(FD)                
                await api.post("/users", FD);
                console.log("Aqui passou")
                
                props.history.push("/");
            } catch (err) {
                console.warn(err);
                setError("Ocorreu um erro ao registrar sua conta.");
            }
        }       
    }
    
        return (
        <div className="signUp">         
            <form onSubmit={handleSignUp}>
                <div className="signUp-inputs">
                    <h1>Cadastro</h1>
        
                    <div className="signUp-inputEmail">    
                        Email:            
                        <input
                        type="email"
                        placeholder="Digite um email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                         
                        />
                    </div>
                        
                    <div className="signUp-inputName">     
                        Nome:            
                        <input
                        
                        type="text"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        
                        />
                    </div>

                    <div className="signUp-inputCPF">  
                        CPF:              
                        <input
                        type="text"
                        placeholder="Digite seu CPF"
                        value={cpf}
                        onChange={e => setCPF(e.target.value)}
                        
                        />
                    </div>
        
                    <div className="signUp-inputPassword">   
                        Senha:             
                        <input
                        placeholder="Digite sua senha"
                        type="password"
                        value={password}                   
                        onChange={e => setPassword(e.target.value)}
                        
                        />                
                    </div>
        
                    <button type="submit">
                        Cadastrar
                    </button>             
                
                 </div>
            </form>
        </div>
        )    
 }
 
 export default withRouter(SignUp);