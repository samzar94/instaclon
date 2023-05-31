import React, { useCallback , useState} from 'react'
import {Modal,Icon, Button,Dimmer, Loader} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone'
import {PUBLISH} from '../../../gql/publication'
import {useMutation} from '@apollo/client'
import {toast} from 'react-toastify'
import './ModalUpload.scss'

export default function ModalUpload(props) {
    const {show, setShow}= props;
    const [FileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading]= useState(false)
    const [publish]= useMutation(PUBLISH)
    console.log(FileUpload);

    const onDrop=useCallback ((acceptedFile)=>{//accepteFile es el aarchivo que devulve. el que sube el usuario
        const file=acceptedFile[0];
        setFileUpload({
            type: "image",
            file,
            preview: URL.createObjectURL(file),
        })
    });

    const {getRootProps, getInputProps}=useDropzone({
        accept:"image/jpeg,image/png",
        noKeyboard:true,
        multiple:false,
        onDrop 
    })

    const onClose=()=>{
        setIsLoading(false);
        setFileUpload(null);
        setShow(false)
    }

    const onPublish= async()=>{
       try {
           setIsLoading(true);
           const result=  await publish({
               variables:{
                   file: FileUpload.file,
               }
           });
           const {data}= result;
           console.log(result);
           if(!data.publish.status){
               toast.warning("Error en la publicacion");
               isLoading(false);
           }else{
               onClose();
            //    window.location.reload();  //para recargar lla pagina 
           }
       } catch (error) {
           console.log(error);
       }
    }
    return (
       <Modal size="small" open={show} onClose={onClose} className="modal-upload">
           <div {...getRootProps()} className="dropzone" style={FileUpload && {border:0}}>
               {!FileUpload && (
                   <>
                    <Icon name="cloud upload"/>
                    <p>Arrastra tu foto que quieras publicar</p>
               </>
               )}
                <input {...getInputProps()}/>
           </div>
           {FileUpload?.type==="image" &&(
               <div className="image" style={{backgroundImage:`url("${FileUpload.preview}")`}}/>
           )}
    {FileUpload && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
            Publicar
        </Button>
    )}
     {isLoading && (
            <Dimmer active className="publishing">
            <Loader />
            <p>Publicando</p>
            </Dimmer>
        )}
       </Modal>
    )
}
