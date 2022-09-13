import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {

    let [ searchTerm, setSearchTerm ] = useState('')

    return (
        <form onSubmit={(e) => handleSearch(e, searchTerm)}>

            <input type={"text"} placeholder="Enter an artist" onChange={(e) => setSearchTerm(e.target.value)} />

            <input type={"submit"} /> 
        </form>
    )
}

export default SearchBar