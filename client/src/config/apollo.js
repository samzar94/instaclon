import {ApolloClient, createHttpLink,InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from 'apollo-link-context'
import {getToken} from '../utils/token'
// createHttpLink es para compartir archivos con apollo del cliente al servidor 
const httpLink=createUploadLink({//aqu se cambio por createHttpLink 
    uri:"http://localhost:3100"
});

const authLink=setContext((_, {headers})=>{
    const token=getToken();
    return{
        headers:{
            ...headers,
            Authorization:token? `Bearer ${token}`: "",
        }
    }
})

const client =new ApolloClient({
    connectToDevTools:true,//para poder usar las extension de google chrome
    cache:new InMemoryCache(),//para guardaar y hacer peticiones a la cache
    link:authLink.concat(httpLink),
    // link:httpLink
});

export default client;