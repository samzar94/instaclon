import React from 'react';
import {Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {map} from 'lodash'
import {useQuery} from '@apollo/client'
import {GET_NOT_FOLLOWEDS} from '../../../gql/follow'
import ImageNotFount from '../../../assets/png/avatar.png'
import "./UsersNotFolloweds.scss";

export default function UsersNotFolloweds() {
    const {data, loading}= useQuery(GET_NOT_FOLLOWEDS);
    if(loading) return null;
    console.log(data);
    const {getNotFolloweds}=data;
    return (
        <div className="users-not-followeds">
            <h3>Usuarios no seguidos</h3>
            {map(getNotFolloweds,(user,index)=>(
                <Link key={index} to={`${user.username}`} className="users-not-followeds__user">
                    <Image src={user.avatar || ImageNotFount} avatar/>
                    <span>{user.username}</span>
                </Link>
            ))}
        </div>
    )
}
