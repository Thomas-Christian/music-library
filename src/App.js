import { useState, useRef, Fragment } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataContext } from './contexts/DataContext';
import { SearchContext } from './contexts/SearchContext';

import './App.css'
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import ArtistView from "./components/ArtistView";
import AlbumView from "./components/AlbumView";

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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <SearchContext.Provider
                  value={{
                    term: searchInput,
                    handleSearch,
                  }}
                >
                  <SearchBar />
                </SearchContext.Provider>
                <DataContext.Provider value={data}>
                  <Gallery />
                </DataContext.Provider>
              </Fragment>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
