import React,{useCallback,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import {UPDATE_AVATAR,GET_USER,DELTE_AVATAR} from '../../../gql/user'
import {toast} from 'react-toastify'
import "./AvatarForm.scss"

export default function AvatarForm(props) {
    const {setShowModal,auth}=props;
    const [loading, setLoading] = useState(false)

    const [updateAvatar]=useMutation(UPDATE_AVATAR, {
        update(cache, { data: { updateAvatar }}){
        const {getUser}= cache.readQuery({
            query:GET_USER,
            variables: { username: auth.username},
        });
        cache.writeQuery({
            query:GET_USER,
            variables:  {username:auth.username},
            data:{
                getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
            },
        });

        },
    });

    const [deleteAvatar]= useMutation(DELTE_AVATAR,{
        update(cache){
            const {getUser}=cache.readQuery({
                query:GET_USER,
                variables:{username:auth.username}
            });

            cache.writeQuery({
                query:GET_USER,
                variables:{username:auth.username},
                data:{
                    getUser:{...getUser,avatar:""},
                }
            })
        }
    });

    const onDrop= useCallback(async(acceptedFile)=>{
        const file=acceptedFile[0];
        try {
            setLoading(true);
            const result = await updateAvatar({variables:{file}});
            const {data} = result;

            if(!data.updateAvatar.status){
                toast.warning("Error al actualizar su avatar");
                setLoading(false);
            }else{
                setLoading(false)
                setShowModal(false);
            }
            console.log(result);

        } catch (error) {
            console.log(error);
        }
    },[]);


    const {getRootProps, getInputProps} =useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard:true,
        multiple:false,
        onDrop,
    })

    const onDeleteAvatar = async ()=>{
        try {
            const result=await deleteAvatar();
            const {data}=result;

            if(!data.deleteAvatar){
                toast.warning("Error al borrar el avatar")
            }else{
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="avatar-form">
            <Button {...getRootProps()} loading={loading}>Cargar una foto</Button>
            <Button onClick={onDeleteAvatar}>Eliminar foto actual</Button>
            <Button onClick={()=>setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()}/>
        </div>
    )
}
//rsfs