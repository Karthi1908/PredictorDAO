import React, { useState } from "react"
import { getContract } from '../tezos';
import Transfer from './Transfer.js';

import '../static/css/register.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ProposalDetails(){
	const contractAddress = getContract();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [end, setend] = useState("");
    const [proposalName, setproposalName] = useState("");
    const [proposalOptions, setproposalOptions] = useState("");
    const [quorumRequired, setquorumRequired] = useState("");
	const [resultType, setresultType] = useState("");
    const [start, setstart] = useState("");
    

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    async function handleClick() {
        // DaoDetails here
        
        const contract = await getContract();
		const proposalOptions = ["Agree", "DisAgree"]
        const op =  await contract.methods.addProposal( end, proposalName, proposalOptions,quorumRequired, resultType, start).send();
        await op.confirmation();
        alert("Proposal Created!")
        
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
                        <Form.Label>Proposal</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Proposal" 
                            id="proposalName"
                            onChange={e => setproposalName(e.target.value)}
                            value={proposalName}
                            classname="modal-input"/>
                    </Form.Group>
                    

                    <Form.Group className="mb-3">
                        <Form.Label>Result Type</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Vote/Stake" 
                            id="resultType"
                            onChange={e => setresultType(e.target.value)}
                            value={resultType}
                            classname="modal-input"/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Quorum Required</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="(numbers only)" 
                            id="quorumRequired"
                            onChange={e => setquorumRequired(e.target.value)}
                            value={quorumRequired}
                            classname="modal-input"/>
                    </Form.Group>
					
					 <Form.Group className="mb-3">
                        <Form.Label>Proposal to start in</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="(interval in seconds)" 
                            id="start"
                            onChange={e => setstart(e.target.value)}
                            value={start}
                            classname="modal-input"/>
                    </Form.Group>
					
					 <Form.Group className="mb-3">
                        <Form.Label>Proposal to end in</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="(interval in seconds)" 
                            id="end"
                            onChange={e => setend(e.target.value)}
                            value={end}
                            classname="modal-input"/>
                    </Form.Group>
                   
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleClick} className="modal-submit-btn">Submit</Button>
                </Modal.Footer>
            </Modal>
            <button onClick={openModal} className="btn btn-DaoDetails">Add Proposal</button>
        </>
    );
}

export default ProposalDetails;
