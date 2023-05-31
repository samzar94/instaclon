import React from 'react'
import {Button} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import {useApolloClient} from '@apollo/client';
import "./SettingsForm.scss";
import PasswordForm from '../PasswordForm'
import DescriptionForm from '../DescriptionForm'
import EmailForm from '../EmailForm'
import SiteWebForm from '../SiteWebForm'
import useAuth from '../../../hooks/useAuth'

export default function SettingsForm(props) {
    const {setShowModal,setTitleModal,setChildrenModal,getUser,refetch}=props;
    const history=useHistory();
    const client=useApolloClient();
    const {logout}=useAuth();//devuele auth, logout, setuser

    const onChangePassword=()=>{
       setTitleModal("cambiar contraseña");
       setChildrenModal(<PasswordForm logout={onLogout}/>
        //    <div>
        //        <h1>formpassword</h1>
        //    </div>
       )
    }

    const onChangeEmail=()=>{
        setTitleModal("Cambiar Email");
        setChildrenModal(
            <EmailForm 
            setShowModal={setShowModal}
            currentEmail={getUser.email} 
            refetch={refetch}
            />
        );
    }

    const onChangeDescription=()=>{
        setTitleModal("Actualizar tu biografia");
        setChildrenModal(
            <DescriptionForm 
            setShowModal={setShowModal} 
            currentDescription={getUser.description} 
            refetch={refetch} 
            />
        );
    }

    const onChangeSiteWeb=()=>{
        setTitleModal("Actualizar sitio web");
        setChildrenModal(<SiteWebForm setShowModal={setShowModal} currentSiteWeb={getUser.siteWeb} refetch={refetch} />)
    }

    const onLogout=()=>{
        client.clearStore();
        logout();
        history.push("/");
    }



    return (
        <div className="settings-form">
        <Button onClick={onChangePassword}>Cambiar contraseña</Button>
        <Button onClick={onChangeEmail}>Cambiar Email</Button>
        <Button onClick={onChangeDescription}>Descripción</Button>
        <Button onClick={onChangeSiteWeb}>Sitio web</Button>
        <Button onClick={()=>onLogout()}>Cerrar sesión</Button>
        <Button onClick={()=>setShowModal(false)}>Cancelar</Button>
        </div>
    )
}
