import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("")

    function doingASearch(event){
        setSearchTerm(event.target.value)
    }

    function submitSearch(event){
        event.preventDefault();
        props.handleSearch(searchTerm)
        setSearchTerm("")
    }


    return (
        <form onSubmit={submitSearch}>
            <input type="text" name="searchTerm" value={props.searchTerm} placeholder="search" onChange={doingASearch}/>
             <button type="submit">
             <FontAwesomeIcon icon={faMagnifyingGlass}/>
             </button>
        </form>
    )
}

