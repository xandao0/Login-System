import React, { useEffect, useState } from "react"
import decode from 'jwt-decode'
import { getToken, logout} from '../../services/auth';
import api from '../../services/api';

import './style.css'

function UserDash(props) {

    const [user, setUser] = useState();
    
    
    useEffect(() => {
        const { uid } = decode(getToken());
        api
        .get(`/users/${uid}`)
        .then((response) => setUser(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err)
        });
    }, [])

    
    const handleLogout = () => {
        logout();
        props.history.push("/");
    }

    const handleEdit = () => {
        props.history.push("/edit");
    }

    return (
        <div className="userDash">
            <div className="userDash-box">
                <h1>Meu Perfil</h1>
                <hr id="title"/>
                <div className="gridUserDash">                
                    <div className="dataUserDash">
                        <p><strong>Nome: </strong>{user?.name}</p>
                        <p><strong>CPF: </strong>{user?.cpf}</p>
                        <p><strong>E-mail: </strong>{user?.email}</p>
                    </div>
                </div>
                <hr/>
                <div className="buttonsUserDash">
                    <button className="btnUD" onClick={handleEdit}>Editar Informações</button>
                    <button className="btnUD" onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </div>
    )
    
}

export default UserDash;
