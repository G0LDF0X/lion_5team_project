import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function QA({ qna }) {
  return (
    <div>
      <Link to={`/items/detail/${qna.id}`}></Link>
      <Card.Body>
        <Link to={`/qna/detail/${qna.id}`}>
          <Card.Title as="div">
            <strong>{qna.title}</strong>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">
              <div
                dangerouslySetInnerHTML={{ __html: qna.content }}
                style={{ color: "black", backgroundColor: "white" }}
              />
            </div>
          </Card.Text>
        </Link>
      </Card.Body>
    </div>
  );
}

export default QA;
