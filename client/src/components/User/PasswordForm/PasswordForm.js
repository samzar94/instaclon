import React from 'react'
import {useMutation} from '@apollo/client'
import {UPDATE_USER} from '../../../gql/user'
import {Form,Button} from 'semantic-ui-react'
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import './PasswordForm.scss'

export default function PasswordForm(props) {
    const { logout }=props;
    const [updateUser]=useMutation(UPDATE_USER);


    const formik=useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object({
            currentPassword:Yup.string().required(),
            newPassword:Yup.string().required().oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword:Yup.string().required().oneOf([Yup.ref("newPassword")]),
        }),
        onSubmit:async(formValues)=>{
            try {
                const result=await updateUser({
                    variables:{
                        input:{
                            currentPassword:formValues.currentPassword,
                            newPassword:formValues.newPassword
                        }
                    }
                })
                if(!result.data.updateUser){
                    toast.error("error al cambiar la contraseña")
                }else{
                    logout();
                }
            } catch (error) {
                toast.error("error al cambiar la contraseña")
            }
        }
    })

    return (
        <Form className="password-form" onSubmit={formik.handleSubmit}>
            <Form.Input placeholder="Contraseña actual" name="currentPassword" 
            type="password"
            value={formik.values.currentPassword} //para que se le agreguue el valor que se le asigno en la funcion initial values
            onChange={formik.handleChange}
            error={formik.errors.currentPassword && true}
            />
            <Form.Input placeholder="Nueva contraseña" name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.errors.newPassword && true}
            />
            <Form.Input placeholder="Repetir nueva contraseña" name="repeatNewPassword"
            type="password"
            value={formik.values.repeatNewPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatNewPassword && true}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}


function initialValues(){
    return{
        currentPassword:"",
        newPassword:"",
        repeatNewPassword:""
    }
}