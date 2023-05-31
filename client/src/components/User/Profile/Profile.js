import React,{useState} from 'react'
import {useQuery} from "@apollo/client";
import {Grid,Image} from 'semantic-ui-react'
import userAuth from '../../../hooks/useAuth'
import ImageNoFound from '../../../assets/png/avatar.png'
import {GET_USER} from '../../../gql/user';
import UserNotFound from '../../UserNotFound'
import ModalBasic from '../../Modal/ModalBasic'
import AvatarForm from '../AvatarForm'
import HeaderProfile from './HeaderProfile'
import SettingsForm from '../SettingsForm'
import Followers from './Followers'
import './Profile.scss'

export default function Profile(props) {
    const {username,totalPublicatios}=props;
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [childrenModal, setChildrenModal] = useState(null)
    const {data,loading,error,refetch} =useQuery(GET_USER,{
        variables:{username},
    });
    const {auth}=userAuth();
    //console.log(auth);

    if(loading) return null;
    if(error) return <UserNotFound/>;
    const {getUser}=data;
    //console.log(getUser);

    const handlerModal=(type)=>{
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto de perfil")
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth}/>)
                setShowModal(true);
                break;
                case "settings":
                setTitleModal("");
                setChildrenModal(<SettingsForm setShowModal={setShowModal} 
                setTitleModal={setTitleModal}
                setChildrenModal={setChildrenModal}
                getUser={getUser}
                refetch={refetch}
                />);
                setShowModal(true);
                break;
        
            default:
                break;
        }
    }

    return (
    <>
        <Grid className="profile">
            <Grid.Column width={5} className="profile__left">
               <Image src={getUser.avatar?getUser.avatar:ImageNoFound} 
               avatar 
               onClick={()=> username===auth.username && handlerModal("avatar")}/>
            </Grid.Column>
            <Grid.Column width={11} className="profile__right">
                <HeaderProfile getUser={getUser} auth={auth} handlerModal={handlerModal}/>{/*tambien se puede enviar el o username o getUser porque contiene la informacion del usuario que queremos*/}
                <Followers username={username} totalPublicatios={totalPublicatios}/>
                <div className="other">
                    <p className="name">{getUser.name}</p>
                    {getUser.siteWeb &&(
                        <a href={getUser.siteWeb} className="siteweb" target="_blank">
                            {getUser.siteWeb}
                        </a>
                    )}
                    {getUser.description&&(
                        <p className="description">{getUser.description}</p>
                    )}
                </div>
            </Grid.Column>
        </Grid>
        <ModalBasic show={showModal} setShow={setShowModal} title={titleModal} >
           {childrenModal}
        </ModalBasic>
    </>
    )
}
