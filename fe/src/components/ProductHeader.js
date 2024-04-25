import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Card, Row } from 'react-bootstrap'

function ProductHeader() {
    const location = useLocation();
    const dispatch = useDispatch();
    async function getTag() {
        const res = await fetch(`http://localhost:8000/api/tag/${location.pathname}`);
        const data = await res.json();
        return data;
    }
    const tags = getTag();
    return (
        <Row>
            {tags.map((tag) => (
                <Card key={tag.id}>
                    {/* <Link to={`/tag/${tag._id}`}>
                        <Card.Img src={tag.image} alt={tag.name} />
                    </Link> */}
                    <Card.Body>
                        {/* <Link to={`/tag/${tag._id}`}> */}
                            <Card.Title as="div">
                                <strong>{tag.name}</strong>
                            </Card.Title>
                        {/* </Link> */}
                    </Card.Body>
                </Card>
            ))

            }
        </Row>
    )
}

export default ProductHeader
