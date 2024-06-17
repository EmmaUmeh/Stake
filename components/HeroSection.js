"use client";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Dognft from "@/public/assets/dognft.png";
import EthSvg from "@/images/ethereum.svg";
import Image from "next/image";
import StakeAbi from "@/contracts/stake.json"


function HeroSection() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contractInstance, setContractInstance] = useState(null);
  const [stakingAmount, setStakingAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(""); // New state for transaction feedback

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // Request access to the user's accounts
      setWeb3(window.web3);
      setAccount(await window.web3.eth.getAccounts());
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setWeb3(window.web3);
      setAccount(await window.web3.eth.getAccounts());
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const createContractInstance = async () => {
    if (!web3) return; // Ensure web3 is initialized
    const contractABI = StakeAbi.abi;
    const contractAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    setContractInstance(contract);
  };

  useEffect(() => {
    initializeWeb3();
    createContractInstance();
  }, []);

  const handleInputChange = (event) => {
    setStakingAmount(event.target.value);
  };

  const stakeTokens = async () => {
    if (!contractInstance ||!account[0] ||!stakingAmount) return;
  
    // Fetch the user's current balance
    const userBalance = await web3.eth.getBalance(account[0]);
    const userEtherBalance = web3.utils.fromWei(userBalance, 'ether');
  
    // Check if the user has enough Ether to stake
    if (parseFloat(userEtherBalance) < parseFloat(web3.utils.fromWei(stakingAmount, 'ether'))) {
      console.error("Insufficient funds to stake. Please top up your balance.");
      setTransactionStatus("Insufficient funds to stake. Please top up your balance.");
      return;
    }
  
    console.log("Attempting to stake tokens...");
    try {
      const result = await contractInstance.methods.stake().send({
        from: account[0],
        value: web3.utils.toWei(stakingAmount, 'ether'),
      });
      console.log("Staking successful!", result);
      setTransactionStatus("Staking successful!");
    } catch (error) {
      console.error("Staking failed:", error);
      setTransactionStatus("Staking failed. Please try again.");
    }
  };
  
  

  if (!web3 ||!account.length) {
    return <div>Loading...</div>; // Show loading indicator until Web3 is ready
  }

  return (
    <React.Fragment>
      <div className="lg:pl-44 mt-20 mb-10 text-white">
        
      <div className="mb-5">
          <h2 className="font-bold lg:text-4xl text-3xl">Staking</h2>

          <p>No lock-up period staking, let your FIL earn interest in real-time, automatically compound.</p>
        </div>

        <div className="flex flex-col lg:items-start items-center text-[#121212]">

          <div className="lg:flex flex-col  gap-6 bg-white p-2 px-20 rounded-lg py-5">
            <h3>Which action would you like to choose?</h3>


            <div class="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                {/* <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" aria-label="Ethereum" role="img" viewBox="0 0 512 512" fill="#121212"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path fill="#3C3C3B" d="m256 362v107l131-185z"></path><path fill="#343434" d="m256 41l131 218-131 78-132-78"></path><path fill="#8C8C8C" d="m256 41v158l-132 60m0 25l132 78v107"></path><path fill="#141414" d="m256 199v138l131-78"></path><path fill="#393939" d="m124 259l132-60v138"></path></g></svg> */}
              </div>
              <input type="number" 
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="0.00" 
              value={stakingAmount}
              onChange={handleInputChange}
              />
            </div>

            {transactionStatus && <div className="mt-4 text-green-500">{transactionStatus}</div>}

            <div className="flex items-center justify-between">
          <span>You will receive</span>
          <span>{web3.utils.fromWei(stakingAmount, 'ether')} ETH</span>
        </div>
        <div className="flex items-center">
          <button onClick={stakeTokens} className="flex gap-3 text-white items-center bg-primary p-2 px-20 py-2 rounded-lg">
            Stakeb
          </button>
        </div>
        </div>
        
        </div>
      </div>
    </React.Fragment>
  );
}

export default HeroSection;
