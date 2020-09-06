import React, { useContext,useState } from 'react';
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
} from '@giphy/react-components';
import ResizeObserver from "react-resize-observer";
import './gifComponent.scss';

const GifComponennt = ({ handleGifSelect, gifVisible}) => (
  <SearchContextManager initialTerm='travel' apiKey={process.env.REACT_APP_API_GIPHY}>
    <Components  handleGifSelect={handleGifSelect} gifVisible={gifVisible} />
  </SearchContextManager>
);

const Components = ({handleGifSelect, gifVisible}) => {

  const { fetchGifs, searchKey } = useContext(SearchContext);
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <>
    { gifVisible && 
      <div className="gifcomponent">
        <SearchBar />
        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width);
          }}
        />
        <Grid key={searchKey} onGifClick={(gif, e) => {
          e.preventDefault();
          handleGifSelect(gif);
        }} noLink={true} columns={3} width={width} fetchGifs={fetchGifs} />
      </div>
    }
    </>
  )
};

export default GifComponennt;