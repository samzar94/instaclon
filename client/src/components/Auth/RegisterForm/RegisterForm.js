import React from 'react';
import {Form,Button} from "semantic-ui-react"
import {toast} from "react-toastify"
import { useMutation} from "@apollo/client";
import  {useFormik} from "formik";
import  {REGISTER} from "../../../gql/user"
import * as Yup from "yup";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
    const {setShowLogin}=props;

    const [register]= useMutation(REGISTER);

    const formik=useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            username:Yup.string().matches(
                /^[a-zA-Z0-9-]*$/,
                "El nombre del usuario no puede tener espacios"
                ).required("el nombre de usuario es obligatorio"),
            email: Yup.string().email("el email no es valido").required("el email es obligatorio"),
            password: Yup.string().required("la contraseña es obligatoria")
            .oneOf([Yup.ref("repeatPassword")],"Las contraseñas no son iguales"),
            repeatPassword:Yup.string().required("Confirme contraseña")
            .oneOf([Yup.ref("password")],"las contraseñas son diferentes")

        }),
        onSubmit:async(formData)=>{
            try {
                const newUwser=formData;
                delete newUwser.repeatPassword;
                await register({
                    variables:{
                        input: newUwser,
                    }
                });
                toast.success("Usuario registrado correctamente");
                setShowLogin(true);
            } catch (error) {
                toast.error(error.message);
                console.log(error.message);
            }
        }

    })

    return (
        <>
            <h2 className="register-form-title">
                Registrate para ver fotos y videos de tus amigos
                </h2>
            <Form autoComplete="off" className="register-from" onSubmit={formik.handleSubmit}> 
                <Form.Input
                 type="text" placeholder="nombre y apellido" name="name" 
                 value={formik.values.name} onChange={formik.handleChange} // value={formik.values.name} para que se limpie los campos 
                 error={formik.errors.name && formik.values.password}//onChange={formik.handleChange}para ligar los datos del formularios al squemade formik
                 />
                <Form.Input 
                type="text" placeholder="nombre de usuario" name="username"  
                value={formik.values.username} onChange={formik.handleChange}
                error={formik.errors.username && true}
                />
                <Form.Input 
                type="text" placeholder="Correo electronico"name="email" 
                value={formik.values.email} onChange={formik.handleChange}
                error={formik.errors.email && true}
                />
                <Form.Input 
                type="password" placeholder="contraseña" name="password"
                value={formik.values.password} onChange={formik.handleChange}
                error={formik.errors.password}
                />
                <Form.Input 
                type="password" placeholder="Repetir contraseña" name="repeatPassword" 
                value={formik.values.repeatPassword} onChange={formik.handleChange}//
                error={formik.errors.repeatPassword}
                />
                <Button type="submit" className="btn-submit">Registrase</Button>
                <Button type="button" onClick={formik.handleReset}>Limpiar Formulario</Button>
            </Form>
        </>
    )
}

function initialValues(){
    return{
        name:"",
        username:"",
        email:"",
        password:"",
        repeatPassword:"",
    }
}