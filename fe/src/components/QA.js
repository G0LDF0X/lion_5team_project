import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function QA({ qna }) {
    // if (!qa) return <div>QA not found</div>;
    return (

        <Card className="my-3 p-3 rounded">
            <Link to={`/items/detail/${qna.id}`}> 
                {/* <Card.Img src={qa.image_url} variant="top" /> */}
            </Link>

            <Card.Body>
                <Link to={`/qa/${qna.id}`}> 
                    <Card.Title as="div">
                        <strong>{qna.title}</strong>
                    </Card.Title>
                </Link>

            </Card.Body>
        </Card>
    );
}

export default QA;
