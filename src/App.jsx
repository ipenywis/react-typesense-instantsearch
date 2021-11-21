import logo from "./logo.svg";
import "./App.css";

import styled from "styled-components";
import {
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";
import { searchClient } from "./typesenseAdapter";
import MoviesHits from "./components/moviesHits";
import "instantsearch.css/themes/satellite.css";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
`;

function App() {
  return (
    <AppContainer>
      <h2>React/Typesense Movies InstantSearch</h2>
      <InstantSearch indexName="movies" searchClient={searchClient}>
        <h4>Search Movies</h4>
        <SearchBox />
        <RefinementList attribute="genres" />
        <MoviesHits />
        <Pagination />
      </InstantSearch>
    </AppContainer>
  );
}

export default App;
