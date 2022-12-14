import './App.css'
import { useState, useRef } from "react";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { DataContext } from './contexts/DataContext';
import { SearchContext } from './contexts/SearchContext';

const App = () => {

  let [ message, setMessage ] = useState('Search for Music')
  let [ data, setData ] = useState([]) 

  let searchInput = useRef('');

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term + '&limit=18')
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
}


  return (
    <div className="App">
      
      {message}

      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch
      }}> 
        <SearchBar />
      </SearchContext.Provider>

      <DataContext.Provider value={ data }> 
        <Gallery />
      </DataContext.Provider>

    </div>
  );
}

export default App;
