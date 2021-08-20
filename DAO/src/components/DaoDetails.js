import React, { useState } from "react"
import { getContract } from '../tezos';

import '../static/css/register.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DaoDetails(){

    const [modalIsOpen, setIsOpen] = useState(false);
    const [daoName, setdaoName] = useState("");
    const [daoTokenId, setdaoTokenId] = useState("");
    const [tokenSymbol, settokenSymbol] = useState("");
    const [daoTokenLimit, setdaoTokenLimit] = useState("");
    

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    async function handleClick() {
        // DaoDetails here
        
        const contract = await getContract();
        const op =  await contract.methods.defineDAO(daoName=daoName, daoTokenId = daoTokenId, tokenSymbol = tokenSymbol, daoTokenLimit = daoTokenLimit ).send();
        await op.confirmation();
        alert("DAO Details Updated!")
        
    }

    return(
        <>
            <Modal
                show={modalIsOpen}
                onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Dao Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>DAO Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter DAO Name" 
                            id="daoName"
                            onChange={e => setdaoName(e.target.value)}
                            value={daoName}
                            classname="modal-input"/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Token Id</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="(numbers only)" 
                            id="daoTokenId"
                            onChange={e => setdaoTokenId(e.target.value)}
                            value={daoTokenId}
                            classname="modal-input"/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Token Symbol</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Token Symbol" 
                            id="tokenSymbol"
                            onChange={e => settokenSymbol(e.target.value)}
                            value={tokenSymbol}
                            classname="modal-input"/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Max Token Limit</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="(numbers only)" 
                            id="daoTokenLimit"
                            onChange={e => setdaoTokenLimit(e.target.value)}
                            value={daoTokenLimit}
                            classname="modal-input"/>
                    </Form.Group>

                   
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleClick} className="modal-submit-btn">Submit</Button>
                </Modal.Footer>
            </Modal>
            <button onClick={openModal} className="btn btn-DaoDetails">Modify DaoDetails</button>
        </>
    );
}

export default DaoDetails;
