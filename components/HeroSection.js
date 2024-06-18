"use client";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Image from "next/image";
import StakeAbi from "@/contracts/stake.json";
import Dognft from "@/public/assets/dognft.png";
import EthSvg from "@/images/ethereum.svg";

function HeroSection() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contractInstance, setContractInstance] = useState(null);
  const [stakingAmount, setStakingAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [stakedAmount, setStakedAmount] = useState(null);
  const [stakingTime, setStakingTime] = useState(null);
  const [countdown, setCountdown] = useState("");

  const CLAIM_PERIOD = 86400; // Example claim period in seconds (24 hours)

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3(window.web3);
      const accounts = await window.web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setWeb3(window.web3);
      const accounts = await window.web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };

  const createContractInstance = async () => {
    if (!web3) return;
    const contractABI = StakeAbi.abi;
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    setContractInstance(contract);
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      createContractInstance();
    }
  }, [web3]);

  const handleInputChange = (event) => {
    setStakingAmount(event.target.value);
  };

  const stakeTokens = async () => {
    if (!contractInstance || !account || !stakingAmount) return;

    const userBalance = await web3.eth.getBalance(account);
    const userEtherBalance = web3.utils.fromWei(userBalance, "ether");

    if (parseFloat(userEtherBalance) < parseFloat(stakingAmount)) {
      console.error("Insufficient funds to stake. Please top up your balance.");
      setTransactionStatus("Insufficient funds to stake. Please top up your balance.");
      return;
    }

    console.log("Attempting to stake tokens...");
    try {
      const result = await contractInstance.methods.stake().send({
        from: account,
        value: web3.utils.toWei(stakingAmount, "ether"),
      });
      console.log("Staking successful!", result);
      setTransactionStatus("Staking successful!");
      setStakedAmount(stakingAmount);
      setStakingTime(Date.now());
      getStakedAmount(); // Fetch the updated staked amount
    } catch (error) {
      console.error("Staking failed:", error);
      setTransactionStatus("Staking failed. Please try again.");
    }
  };

  const getStakedAmount = async () => {
    try {
      const amount = await contractInstance.methods.stakedAmount(account).call();
      setStakedAmount(web3.utils.fromWei(amount, "ether"));
    } catch (error) {
      console.error("Error fetching staked amount:", error);
    }
  };

  const updateCountdown = () => {
    if (!stakingTime) return;
    const now = Date.now();
    const timePassed = (now - stakingTime) / 1000;
    const timeRemaining = CLAIM_PERIOD - timePassed;

    if (timeRemaining <= 0) {
      setCountdown("Ready to claim");
    } else {
      const hours = Math.floor(timeRemaining / 3600);
      const minutes = Math.floor((timeRemaining % 3600) / 60);
      const seconds = Math.floor(timeRemaining % 60);
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }
  };

  useEffect(() => {
    if (stakingTime) {
      const timer = setInterval(updateCountdown, 1000);
      return () => clearInterval(timer);
    }
  }, [stakingTime]);

  if (!web3 || !account.length) {
    return <div>Loading...</div>; // Show loading indicator until Web3 is ready
  }

  return (
    <React.Fragment>
      <div className="lg:pl-44 mt-20 mb-10 text-white">
        <div className="mb-5 lg:pl-0 pl-10">
          <h2 className="font-bold lg:text-4xl text-3xl">Staking</h2>
          <p>No lock-up period staking, let your FIL earn interest in real-time, automatically compound.</p>
        </div>

        <div className="flex flex-col lg:items-start items-center text-[#121212]">
          <div className="lg:flex flex-col gap-6 bg-white p-2 px-20 rounded-lg py-5">
            <h3>Which action would you like to choose?</h3>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
              <input
                type="number"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
                value={stakingAmount}
                onChange={handleInputChange}
              />
            </div>

            {transactionStatus && <div className="mt-4 text-green-500">{transactionStatus}</div>}

            <div className="flex items-center justify-between">
              <span>You will receive</span>
              <span>{web3.utils.fromWei(stakingAmount, "ether")} ETH</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={stakeTokens}
                className="flex gap-3 text-white items-center bg-primary p-2 px-20 py-2 rounded-lg"
              >
                Stake
              </button>
            </div>

            {stakedAmount && (
              <div className="mt-4 text-black">
                <h4>Staked Amount: {stakedAmount} ETH</h4>
                <h4>Claim Countdown: {countdown}</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HeroSection;
