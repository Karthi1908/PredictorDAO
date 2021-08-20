import React, { useState, useEffect } from 'react';
import '../static/css/home.css'
import Transfer from './Transfer.js';

import {getContractStorage} from '../tezos';


function DaoDaoDetails(){

    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        async function fetchStorage() {
            // Fetch data from contract
            let storage = await getContractStorage();
            let proposals = storage.valueMap;
            let admin = storage.administrator
	    let users = { admin : storage.administrator}
	    			

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
                            	 <h5>Administrator:         </h5> 
                            	 <h5>{user.admin}</h5>
                                 <h5>DAO Name:              </h5> <h5 className="DAO Name">{user.daoname}</h5>
                                 <h5>DAO Token Id:          </h5> <h5 className="DAO Token Id">{user.daotokenid}</h5>
                                 <h5>Total Token Generated: </h5> <h5 className="DAO Name">{user.daotokenlimit}</h5>
                                 <h5>Balance in Tokens:     </h5> <h5 className="DAO Name">{user.tokenbalance}</h5>
                                 <h5>Balance in Tezos:      </h5> <h5 className="DAO Name">{user.tezbalance}</h5>

                            </div>
                        </div>
		</div>             
              )}
            </div>
            
        </div>
    );
}

export default DaoDaoDetails;
