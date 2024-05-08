import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function QA({ qna={} }) {
    // if (!qna) return <div>QA not found</div>;
    return (
            <div>
         {/* <Card className="my-3 p-3 rounded"> */}
            {<Link to={`/items/detail/${qna.id}`}> 
                {/* <Card.Img src={qa.image_url} variant="top" /> */}
            </Link> }

            <Card.Body>
                <Link to={`/items/detail/${qna.id}`}> 
                    <Card.Title as="div">
                        <strong>{qna.title}</strong>
                        
                    </Card.Title>
                    <Card.Text as="div">
                        <div className="my-3">
                            {qna.content}
                        </div>
                    </Card.Text>
                </Link>

            </Card.Body>
        {/* </Card>
         */}
    </div>
    );
}

export default QA;
