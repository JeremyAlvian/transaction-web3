import React, { useState } from 'react';
import  './styles.modules.css';
import { Network, Alchemy } from 'alchemy-sdk';



const Main = () => {

    const [accounts, setAccounts] = useState([]);

    const settings = {
        apiKey: "-g7YWZzuweY2ZdcgOTDbk7PQnKngraIB",
        network: Network.ETH_GOERLI,
    };
    
    const alchemy = new Alchemy(settings);


    async function connectWalet() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        console.log(accounts)
        setAccounts(accounts);
    }



    async function checkBalance() {
        const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [
                "0x05a39a4F218486f7179a19F131B6798a2d7d2B4C",
                "latest"
            ]
        }).catch((err)=>{
            console.log(err.code)
        })
        console.log(parseInt(balance) / Math.pow(10, 18) + "ETH" )
    }

    async function sendTransaction() {
        // const web3 = new Web3("https://goerli.infura.io/v3/87dd647df0934ab2b57238d2fb436bb2");

        // var value = web3.utils.toWei('0.001', 'ether');

        const params = [{
            "from" : accounts[0],
            "to" : "0x05a39a4F218486f7179a19F131B6798a2d7d2B4C",
            "gasPrice": Number(2500000).toString(16),
            "gas": Number(21000).toString(16),
            "value" : Number(1000000000000000).toString(16),
        }]

        let result = await window.ethereum.request({
            method: "eth_sendTransaction", params
        })
        
        .catch((err) => {
            console.log(err)
        })
        console.log("Transaction Hash is : ", result);
        alchemy.core
        .getTransaction(
          result
        )
        .then(console.log);
 
    }



  return (
    <div className='container'>
            Address:  {accounts}<br />

        <button id='connect-button' onClick={connectWalet}>Connect</button>
    <button onClick={checkBalance}> Check Balance</button>
    <button id="sendEth" onClick={sendTransaction}> Send Transaction</button>
    
    </div>
    
    
  )
}

export default Main