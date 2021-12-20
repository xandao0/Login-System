import React, { useEffect, useState} from "react";
import api from "../../services/api";
import decode from 'jwt-decode';
import { getToken } from '../../services/auth';

import './style.css'

function EditInfo(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [cpf, setCPF] = useState("")
    const [error, setError] = useState("")
    const [user, setUser] = useState();

    /*useEffect(() => {
        const { uid } = decode(getToken());
        api
        .get(`/users/${uid}`)
        .then((response) => setUser(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err)
        });
    }, [])*/


    const handleCancel = () => {
        props.history.push("/userDash");
    }
         
    const handleEdit = async (e) => {
       e.preventDefault(); 
      
        if (!name || !cpf || !email || !password ) {
            setError("Preencha todos os campos para salvar!");
        }   
        else {
            try {
                const FD = new FormData()    
                const { uid } = decode(getToken());            
                FD.append('name', name);
                FD.append('cpf', cpf);               
                FD.append('email', email);
                FD.append('password', password);
                console.log(FD)                
                await api.put(`/users/${uid}`, FD);
                console.log("Aqui passou")
                
                props.history.push("/userDash");
            } catch (err) {
                console.warn(err);
                setError("Ocorreu um erro ao registrar sua conta.");
            }
        }       
    }
    
    return (
        <div className="editInfo">         
            
                <div className="editInfo-inputs">
                    <h1>Editar</h1>
        
                    <div className="editInfo-inputEmail">    
                        Email:            
                        <input
                        type="email"
                        placeholder="Digite um email"
                        //value={user?.email}
                        onChange={e => setEmail(e.target.value)}
                         
                        />
                    </div>
                        
                    <div className="editInfo-inputName">    
                        Nome:            
                        <input
                        
                        type="text"
                        placeholder="Digite seu nome"
                        //value={user?.name}
                        onChange={e => setName(e.target.value)}
                        
                        />
                    </div>

                    <div className="editInfo-inputCPF">  
                        CPF:              
                        <input
                        type="text"
                        placeholder="Digite seu CPF"
                        //value={user?.cpf}
                        onChange={e => setCPF(e.target.value)}
                        
                        />
                    </div>
        
                    <div className="editInfo-inputPassword">   
                        Senha:             
                        <input
                        placeholder="Digite sua nova senha"
                        type="password"                                         
                        onChange={e => setPassword(e.target.value)}
                        
                        />                
                    </div>
        
                    <button onClick={handleEdit}>
                        Salvar
                    </button>   

                    <button onClick={handleCancel}>
                        Cancelar
                    </button>           
                
                 </div>
            
        </div>
    )    
 }
 
 export default EditInfo;
