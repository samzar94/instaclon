import React from 'react'
import {Form,Button} from 'semantic-ui-react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useMutation} from '@apollo/client'
import {ADD_COMMENT} from '../../../../gql/comment'
import "./CommentForm.scss"


export default function CommentForm(props) {
    const {publication}=props;
    const [addComent]= useMutation(ADD_COMMENT)


    const formik= useFormik({
        initialValues:{
            comment:"",
        },
        validationSchema: Yup.object({
            comment: Yup.string().required(),
        }),
        onSubmit: async(formData)=>{
           try {
             await addComent({
                   variables:{
                       input:{
                           idPublication: publication.id,
                           comment: formData.comment
                       }
                   }
               });
               formik.handleReset();
           } catch (error) {
               console.log(error);
           }
        }
    })

    return (
        <Form className="coment-form" onSubmit={formik.handleSubmit}>  
            <Form.Input placeholder="Añade un comentario..." name="comment" 
            value={formik.values.comment}
            onChange={formik.handleChange}
            error={formik.errors.comment && true}
            />
            <Button>Publicar</Button>
        </Form>
    )
}
