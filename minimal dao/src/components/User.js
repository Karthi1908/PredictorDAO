import React, { useMemo, useState, useEffect } from 'react';

import '../static/css/home.css'
import Transfer from './Transfer.js';

import {getContractStorage} from '../tezos';


function User(){

   let userdata = []
   async function fetchStorage() {
            // Fetch data from contract
            let storage = await getContractStorage();
            let stakeHolders = storage.daoStakeHolders;
           
	    stakeHolders.forEach(stakeHolder => {
	        console.log(stakeHolder)
    		userdata.push(stakeHolder);
		});
           
        }
        fetchStorage();
       
      const [state, setState] = React.useState(userdata);   


 


    
     return (
     <div className="container">
            <h3 className="p-3 text-center">DAO Stake Holders</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Token Balance</th>
                        <th>Community Points</th>
                        <th>DAO Points</th>
                        <th>Platform Points</th>
                      
                        
                    </tr>
                </thead>
                <tbody>
     			{state.map((item) => (
        <tr key={item.tokenBalance}>
          {Object.values(item).c[0].map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
                </tbody>
            </table>
        </div>
  );
}


export default User;
