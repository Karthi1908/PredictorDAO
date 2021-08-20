import React, { useState } from "react"
import { getContract } from '../tezos';

import '../static/css/register.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register(){

    const [modalIsOpen, setIsOpen] = useState(false);
    const [address, setaddress] = useState("");
    

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    async function handleClick() {
        // Register here
        
        const contract = await getContract();
        const op =  await contract.methods.addDaoMembers(address).send();
        await op.confirmation();
        alert("Registered!")
        
    }

    return(
        <>
            <Modal
                show={modalIsOpen}
                onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Useraddress</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter useraddress" 
                            id="address"
                            onChange={e => setaddress(e.target.value)}
                            value={address}
                            classaddress="modal-input"/>
                    </Form.Group>

                   
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleClick} className="modal-submit-btn">Submit</Button>
                </Modal.Footer>
            </Modal>
            <button onClick={openModal} className="btn btn-register">REGISTER</button>
        </>
    );
}

export default Register;
