import React from "react";
import { connectHighlight } from "react-instantsearch-core";

const HitHighlight = ({ highlight, attribute, hit, component }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });

  return (
    <span>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <b key={index}>
            <u>{part.value}</u>
          </b>
        ) : (
          <span key={index}>{part.value}</span>
        )
      )}
    </span>
  );
};

export default connectHighlight(HitHighlight);
