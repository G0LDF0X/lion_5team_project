import React from "react";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

function Rating({ value, text, color = "#f8e825" }) {
  return (
    <div className="rating" style={{ display: "flex", alignItems: "center" }}>
      <span>
        {value >= 1 ? (
          <Star style={{ color }} />
        ) : value >= 0.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <StarBorder style={{ color }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <Star style={{ color }} />
        ) : value >= 1.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <StarBorder style={{ color }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <Star style={{ color }} />
        ) : value >= 2.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <StarBorder style={{ color }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <Star style={{ color }} />
        ) : value >= 3.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <StarBorder style={{ color }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <Star style={{ color }} />
        ) : value >= 4.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <StarBorder style={{ color }} />
        )}
      </span>
      <span style={{ marginLeft: "8px" }}>{text}</span>
    </div>
  );
}

export default Rating;