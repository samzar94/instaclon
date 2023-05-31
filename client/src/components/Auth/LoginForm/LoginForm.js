import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../gql/user'
import { setToken, decodeToken } from '../../../utils/token'
import useAuth from '../../../hooks/useAuth'
import './LoginForm.scss'

export default function LoginForm() {
  const [error, seterror] = useState('')
  const [login] = useMutation(LOGIN)

  const { setUser } = useAuth()
  console.log('log de setUser')
  console.log(setUser)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email('el email no es valido')
        .required('el email es obligatorio'),
      password: Yup.string().required('la contraseña es obligatoria'),
    }),
    onSubmit: async (formData) => {
      //onChange={formik.onChange} para que obtenga los datos del formulario
      seterror('')
      try {
        const { data } = await login({
          variables: {
            input: formData,
          },
        })
        const { token } = data.login
        setToken(token)
        setUser(decodeToken(token))
      } catch (error) {
        seterror(error.message)
      }
    },
  })
  console.log(formik)
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>Entra para ver fotos y videos de tus amigos</h2>
      <Form.Input
        type="text"
        placeholder="correo electronico"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
        // {formik.touched.firstName && formik.errors.firstName ? (
        //     <div>{formik.errors.firstName}</div>
        //   ) : null}
      />
      {/* {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null} */}

      <Form.Input
        type="password"
        placeholder="contraseña"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur} //va de la mano de touched y sirve para que pinte el error antes de dar a enviar
        error={formik.touched.password && formik.errors.password}
      />
      <Button type="submit" className="btn-submit">
        Iniciar sesión
      </Button>
      {/* {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null} */}
      {error && <p className="submit-error">{error}</p>}
    </Form>
  )
}

function initialValues() {
  return {
    email: '',
    password: '',
  }
}
