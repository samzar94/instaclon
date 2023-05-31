import React, { useState, useEffect, useMemo } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from 'react-toastify'
import client from './config/apollo'
import { getToken, decodeToken, removeToken } from './utils/token'
import AuthContext from './context/AuthContext'
import Auth from './pages/Auth' //automaticamente jala el archivo index
import Navigation from './routes/Navigation'
export default function App() {
  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    //hook que se ejecuta cuando se remderiza el dom
    const token = getToken()
    console.log('este debe ser el token :' + token)
    if (!token) {
      setAuth(null)
    } else {
      setAuth(decodeToken(token))
      // setAuth(token);
    }
  }, []) //las variables que detecta que cambien para que se ejecute
  // si le quito las [] ak useEffect este se ejecuta en bucle
  const logout = () => {
    removeToken()
    setAuth(null)
  }

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth],
  )
  if (auth === undefined) return null
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  )
}
