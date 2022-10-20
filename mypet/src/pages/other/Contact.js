import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { api } from './../api';
import './other.css';


const Contact = () => {
    const [flag, setFlag] = useState(true);
    const [mail, setMail] = useState('')
    const [Name, setName] = useState('')
    const [Message, setMessage] = useState('')

    const send = (e) => {
        e.preventDefault();
        axios.post(`${api}/contact`, mail)
        setMail({})
        setFlag(false);
    }



    return (

        <div className="first">
            {flag ?
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={e => { setName(e.target.value ) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => { setMail( e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMassage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="text" placeholder="Enter massage" onChange={e => { setMessage(e.target.value) }} />
                    </Form.Group>

                    <Button disabled={Name === "" || mail === ""|| Message === "" ? true : false} variant="primary" type="submit" onClick={send}>
                        Submit
                    </Button>
                </Form>
                :
                <div> <h2>Thanks</h2> </div>}
        </div>
    );
}

export default Contact