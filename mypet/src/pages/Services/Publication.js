import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPublications, getDeletePublication } from './../../redux/actions/getPublcationActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AiFillDelete } from "react-icons/ai";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './services.css';




const Publication = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const publications = useSelector(state => state.publication.publications)
  const auth = useSelector(state => state.auth.auth)
  const [search, setSearch] = useState();
  const [publicationsSearch, setPublications] = useState([]);

  useEffect(() => {
    setPublications(publications)
  }, [publications])

  useEffect(() => {
    dispatch(getAllPublications())
  }, [dispatch])

  useEffect(() => {
    let dataFilter = publications.filter((searchInput) => {
      if (search === '') {
        return searchInput;
      }
      if (searchInput.header.toLowerCase().includes(search) ||
      searchInput.name.toLowerCase().includes(search) ||
        searchInput.text.toLowerCase().includes(search)) {
        return searchInput
      }
    })
    setPublications(dataFilter)
  }, [search])

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  return (
    <div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-primary" style={{ marginTop: "0.5rem" }} onClick={() => navigate('/AddAdoptions')}>Add publication</button>
      </div><br />

      <InputGroup size="sm">
        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          onChange={inputHandler}
        />
      </InputGroup> <br />


      {
        publicationsSearch.map((i, index) => {
          return <Accordion key={i._id}>
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{i.header}</Accordion.Header>
              <Accordion.Body>
                <Row xs='auto'>
                  <Col>
                    <img style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt={i.header} src={i.picture} />
                    <br />
                    {
                      auth?.admin ?
                        <><Button onClick={() => dispatch(getDeletePublication(i._id))} variant="danger" size="sm"><AiFillDelete /> Delete</Button></> : null
                    }
                  </Col>
                  <Col>
                    <h4>{i.name}</h4>
                    <p>{i.text}</p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        })
      }
    </div>
  );
}

export default Publication;