import React, { useState, useEffect } from 'react'
import { Container, Image } from 'semantic-ui-react'
import RegisterForm from '../../components/Auth/RegisterForm'
import LoginForm from '../../components/Auth/LoginForm'
import instaclone from '../../assets/png/instaclone.png'
import './Auth.scss'

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    console.log('log en auth component')
  }, [])

  return (
    <Container fluid className="auth">
      <Image src={instaclone} />
      <div className="container-from">
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className="change-form">
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
            </>
          ) : (
            <>
              Entra con tu cuenta!
              <span onClick={() => setShowLogin(!showLogin)}>
                Iniciar sesión
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  )
}
