import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import GalleryItem from "./GalleryItem"

const Gallery = () => {

    const data = useContext( DataContext );

    
        return (
            <div style={{'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center'}}> 
                {data.map((item, i) => (
                    <GalleryItem item={ item } key={ i } />))
                }
            </div>
        )
    }

export default Gallery