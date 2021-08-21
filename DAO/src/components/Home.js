import React, { useState, useEffect } from 'react';
import '../static/css/home.css'
import SubmitOptions from './SubmitOptions.js';

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
			proposal.end =  Date(proposal.end ).toString();
			console.log(proposal.end);
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
                    <div className="col-md-8" key={index}>
                        <div className="card" >
                            <div className="card-header">
                                <div className="Proposer">{user.proposer}</div>
                            </div>
                            <div className="card-body">
                            	<tr>
									<h6>Proposal &emsp;&emsp;&emsp;&emsp;:</h6> <td className="Proposal">&emsp;{user.proposalName}</td>
								 </tr>
								 <tr>
									<h6>Proposal Options&ensp;:</h6> <td className="Options" title = "Options">&emsp; <SubmitOptions
                                    pID={user.pID.c[0]}
                                /></td>
								 </tr>
								 <tr>
									<h6>Proposal Status &emsp;:</h6> <td className="Status">&emsp;{user.proposalStatus}</td>
								</tr>
								<tr>
									<h6>Proposal Result &emsp;:</h6> <td className="bio">&emsp;{user.proposalVoteResult}</td>
								</tr>
								<tr>
									<h6>Vote Close on &emsp;:</h6> <td className="bio">&emsp;{user.end}</td>
								</tr>

                            </div>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default Home;
