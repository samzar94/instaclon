import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client"
import {size} from 'lodash'
import {GET_PUBLICATIONS} from '../gql/publication';
import Publications from '../components/Publications'
import Profile from "../components/User/Profile"

export default function User() {
    const {username}= useParams();
    const {data, loading, startPolling,stopPolling}=useQuery(GET_PUBLICATIONS,{
      variables:{username}
    })

    useEffect(() => {
      startPolling(1000);
      return () => {
        stopPolling();
      }
    }, [startPolling,stopPolling])

    if(loading) return null;
    // console.log(data);
    const {getPublications}= data;
    console.log(size(getPublications));


    return (
      <>
        <Profile username={username} totalPublicatios={size(getPublications)}/>
        <Publications getPublications={getPublications}/>
      </>
    )
}
