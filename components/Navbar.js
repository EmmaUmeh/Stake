// components/Navbar.js
"use client";

import React, { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { formatAddress } from '../utils/helpers';
import Link from 'next/link';

const pages = ['Stake', 'Lending', 'Governance'];
const location = ['/', '/lending', '/governance'];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const _connectToMetaMask = useCallback(async () => {
    if (isConnecting) {
      console.log("A MetaMask connection request is already pending.");
      return;
    }

    const ethereum = window.ethereum;
    if (typeof ethereum!== "undefined") {
      try {
        setIsConnecting(true);
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        setWalletAddress(address); // Update the wallet address state
        setIsConnected(true); // Set isConnected to true
        console.log("Connected to MetaMask with address: ", address);
      } catch (error) {
        alert(`Error connecting to MetaMask: ${error?.message?? error}`);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, [isConnecting]);

  return (
    <>
      <div className="relative flex justify-between items-center p-2 pt-8 px-10 text-white sm:px-4 md:flex-row md:justify-between md:items-center md:px-10">
        <div>
          <h2 className="font-bold lg:text-4xl text-3xl">Stake🚀</h2>
        </div>

        <div
          className={`lg:flex lg:relative absolute lg:top-0 lg:left-0 top-24 left-52 items-center lg:gap-5 gap-10 font-semibold text-nowrap ${
            isOpen? 'block lg:p-0 p-5 px-10 py-5 rounded-md' : 'hidden'
          } lg:flex top-24 left-52 items-center justify-between font-semibold text-nowrap`}
        >
          {pages.map((page, index) => (
            <div key={index} className="flex gap-10">
             <Link href={location[index]}>
                {page}
              </Link>
            </div>
          ))}
          <button
            onClick={_connectToMetaMask}
            className="flex gap-3 text-[#121212] items-center bg-white p-2 px-4 py-2 rounded-[25px]"
            disabled={isConnecting}
          >
            {!isConnected? 'Connect wallet' : `Connected: ${formatAddress(walletAddress)}`}
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-3 items-center bg-primary p-2 px-7 py-5 rounded-[25px] lg:hidden block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menu
        </button>
      </div>
    </>
  );
}

export default Navbar;
