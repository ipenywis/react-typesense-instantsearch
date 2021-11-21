import React from "react";
import { Highlight } from "react-instantsearch-dom";
import styled from "styled-components";
import MovieHighlight from "../movieHighlight";

const HitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 2em 1em;
`;

const MoviePoster = styled.img`
  width: 180px;
  height: auto;
`;

const Title = styled.div`
  font-weight: black;
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
`;

const Overview = styled.div`
  /* max-height: 9px; */
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 1em;
  line-height: 1.3;
  font-size: 14px;
`;

const Rating = styled.b`
  font-size: 16px;
  color: #2ecc71;
  margin-top: 1rem;
`;

const Genre = styled.div`
  font-size: 14px;
  color: #236adb;
  margin-top: 10px;
`;

const HitsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export function MovieHit(props) {
  const { hit } = props;

  return (
    <HitContainer>
      <MoviePoster src={hit.image} alt={hit.title} />
      <Title>
        <MovieHighlight hit={hit} attribute="title" />
      </Title>
      <Overview>
        <MovieHighlight hit={hit} attribute="overview" />
      </Overview>
      <Rating>
        <MovieHighlight hit={hit} attribute="vote_average" />
      </Rating>
    </HitContainer>
  );
}
