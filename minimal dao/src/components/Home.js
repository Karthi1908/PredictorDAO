import React, { useState, useEffect } from 'react';
import '../static/css/home.css'
import Transfer from './Transfer.js';

import {getContractStorage} from '../tezos';


function Home(){

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchStorage() {
            // Fetch data from contract
            let storage = await getContractStorage();
            let proposals = storage.proposals.valueMap;
	    let users = []
	    proposals.forEach(proposal => {
    		users.push(proposal);
		});
		setUserData(users);
            
        }
        fetchStorage();
        
    }, [])

    return(
        <div className="container">
            <div className="row">
                {userData.map((user, index) => 
                    <div className="col-md-4" key={index}>
                        <div className="card" >
                            <div className="card-header">
                                <div className="Proposer">{user.proposer}</div>
                            </div>
                            <div className="card-body">
                            	 <h5>Proposal:</h5>
                                <h5 className="Proposal">{user.proposalName}</h5>
                                 <h5>Proposal Options:</h5>
                                <p className="Options" title = "Options">{user.proposalOptions}</p>
                                <h5>Proposal Status:</h5>
                                <p className="Status">{user.proposalStatus}</p>
                                <h5>Proposal Result:</h5>
                                 <p className="bio">{user.proposalVoteResult}</p>
                                <Transfer
                                    address={user.address}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default Home;
