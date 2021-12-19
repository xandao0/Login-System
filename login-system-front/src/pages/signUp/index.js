import React, {Component, useState} from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import './style.css'

class SignUp extends Component {
    /*const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [CPF, setCPF] = useState("")*/

    state = {
        name: '',
        cpf: '', 
        email: '',
        password: '',          
    }

    resetForm() {
        this.setState({
            name: '',
            cpf: '', 
            email: '',
            password: '',            
        })
    }
     
    handleSignUp = async (e) => {
       e.preventDefault();       

       const { name, cpf, email, password } = this.state;
        if (!name || !cpf || !email || !password ) {
            this.setState({ error: "Preencha todos os campos!" });
        }   
        else {
            try {
                const FD = new FormData()    
                            
                FD.append('name', this.state.name);
                FD.append('cpf', this.state.cpf);
                console.log("Aqui passou")
                FD.append('email', this.state.email);
                FD.append('password', this.state.password);
                console.log(FD)
                await api.post("/users", FD);
                this.props.history.push("/");
            } catch (err) {
                console.warn(err);
                this.setState({ error: "Ocorreu um erro ao registrar sua conta."});
            }
        }
       
    }

    render() {
        return (
        <div className="signUp">         
            <form onSubmit={this.handleSignUp}>
            <div className="signUp-inputs">
                <h1>Cadastro</h1>
    
                <div className="signUp-inputEmail">    
                    Email:            
                    <input
                    type="email"
                    placeholder="Digite um email"
                    //value={email}
                    //onChange={e => setEmail(e.target.value)}
                    onChange={e => this.setState({ email: e.target.value})} 
                    />
                </div>
                    
                <div className="signUp-inputName">    
                    Nome:            
                    <input
                    
                    type="text"
                    placeholder="Digite seu nome"
                    //value={name}
                    //onChange={e => setName(e.target.value)}
                    onChange={e => this.setState({ name: e.target.value})}
                    />
                </div>

                <div className="signUp-inputCPF">  
                    CPF:              
                    <input
                    type="text"
                    placeholder="Digite seu CPF"
                    //value={CPF}
                    //onChange={e => setCPF(e.target.value)}
                    onChange={e => this.setState({ cpf: e.target.value})}
                    />
                </div>
    
                <div className="signUp-inputPassword">   
                    Senha:             
                    <input
                    placeholder="Digite sua senha"
                    type="password"
                    //value={password}                   
                    //onChange={e => setPassword(e.target.value)}
                    onChange={e => this.setState({ password: e.target.value})}
                    />                
                </div>
    
                <button type="submit">
                    Cadastrar
                </button>             
                
            </div>
            </form>
        </div>
        );
    }
 }
 
 export default withRouter(SignUp);