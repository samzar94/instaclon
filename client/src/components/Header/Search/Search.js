import React,{useState,useEffect} from 'react'
import {Search as SearchSU,Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {size} from 'lodash'
import {useQuery} from '@apollo/client'
import {SEARCH} from '../../../gql/user'
import ImageNoFound from '../../../assets/png/avatar.png';
import "./Search.scss";

export default function Search() {

const [search, setSearch] = useState(null);
const [results, setResults] = useState([])
const {data,loading} =useQuery(SEARCH,{
    variables:{search}
});
//console.log(results);
useEffect(() => {
    if(size(data?.search)>0){
        const users=[];
        data.search.forEach((user,index) => {
           users.push({
               key:index,
               title:user.name,
               username:user.username,
               avatar:user.avatar,
           });
        });
        setResults(users);
    }else{
        setResults([]);
    }
}, [data]);//cuando data actualice su valor

const onChange=(e)=>{
// setSearch(e.target.value)  si lo dejo hace doble unefined
if(e.target.value) setSearch(e.target.value);
else setSearch(null);
};
const handleResultSelect=()=>{
    setSearch(null);
    setResults([]);
}

    return (
       <SearchSU 
       className="search-users"
       fluid
       input={{icon:"search",iconPosition:"left"}}
       loading={loading}
       value={search || ""}
       onSearchChange={onChange}
       onResultSelect={handleResultSelect}
       results={results}
       resultRenderer={(e)=><ResultsSearch data={e}/>}
       />
    )
}


// componente interno

function ResultsSearch(props) {
    const {data}= props;
    //console.log(data);
     return(
         <Link className="search-users__item" to={`/${data.username}`}>
         <Image src={data.avatar || ImageNoFound}/>
         <div>
             <p>{data.title}</p>
             <p>{data.username}</p>
         </div>
         </Link>
     )
}