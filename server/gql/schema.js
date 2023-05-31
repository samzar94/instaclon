const { gql }  =require ("apollo-server");

const typeDefs= gql`
    type User{
        id:ID
        name:String
        username:String
        email:String
        siteWeb:String
        description:String
        password:String
        avatar:String
        createAt: String
    }
    type Token{
        token:String
    }
    type UpdateAvatar{
        status:Boolean
        urlAvatar:String
    }
    type Publish{
        status:Boolean
        urlFile:String
    }
    type Publication{
        id:ID #id de la publicacion
        idUser:ID #id del usuarion que ha hecho la publicaccion 
        file:String
        typeFile:String
        createAt:String
    }
    type Comment{
        idPublication:ID
        idUser:User  #esto es para que funcione el populate
        comment:String
        createAt:String
    }
    type FeedPublication{
        id:ID
        idUser: User
        file:String
        typeFile:String
        createAt:String
    }
    ###******type-input*************###

    input UserInput{
        name:String!
        username:String!
        email:String!
        password:String!
    }
    input loginInput{
        email:String!
        password:String!
    }
    input UserUpdateInput{
        name:String
        email:String
        currentPassword:String
        newPassword:String
        siteWeb:String
        description:String
    }
    input CommentInput{
        idPublication:ID
        comment:String
    }


    type Query{
        # User
        getUser(id:ID,username:String):User
        showsomething:User
        search(search:String): [User]

        #follow
        isFollow(username:String!): Boolean
        getFollowers(username:String!): [User]
        getFolloweds(username:String!): [User]
        getNotFolloweds:[User]

        #PUblication
        getPublications(username:String!):[Publication]
        getPublicationsFolloweds:[FeedPublication]

        #Commnet
        getComments(idPublication:ID!): [Comment]
         
         #like
         isLike(idPublication:ID!):Boolean
         countLikes(idPublication:ID!):Int 


    }
    type Mutation{
        #user
        register(input:UserInput): User
        login(input:loginInput):Token
        updateAvatar(file: Upload):UpdateAvatar
        deleteAvatar:Boolean
        updateUser(input:UserUpdateInput):Boolean

        #Follow
        follow(username:String!):Boolean
        unFollow(username:String!): Boolean

        #publication
        publish(file:Upload): Publish

        #coments
        addComment(input:CommentInput): Comment

        #LIKES
        addLike(idPublication:ID!): Boolean
        deleteLike(idPublication:ID!):Boolean

       
    }
`;

module.exports=typeDefs;