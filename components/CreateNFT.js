"use client";

/* pages/create-nft.js */
import { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const client = ipfsHttpClient('https://eth-mainnet.g.alchemy.com/v2/igeZ4fwedy10wX6CTzGVcN3yED2c02zc');
// import Web3Modal from 'web3modal'
import NFTABI from "../contracts/nft.json";

export default function CreateNFT() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`Received: ${prog}%`)
      });
      const url = `https://ipfs.io/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function uploadToIPFS() {
    const { name, description, price } = formInput;
    if (!name ||!description ||!price ||!fileUrl) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log('Error uploading metadata: ', error);
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    // Request the user to switch accounts
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] }); // Switch to Ethereum Mainnet
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request accounts
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const price = ethers.utils.parseUnits(formInput.price, 'ether');
      let contract = new ethers.Contract(marketplaceAddress, NFTABI.abi, signer);
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();
      let transaction = await contract.createToken(url, price, { value: listingPrice });
      await transaction.wait();
  
      // Redirect after successful transaction
      router.push('/');
    } catch (switchError) {
      // Handle any errors related to switching accounts
      console.error("Failed to switch accounts:", switchError);
    } 
  }
  

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({...formInput, price: e.target.value })}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
        <input
            type="file"
            id="image-upload"
            accept="image/*"
          className="my-4"
          onChange={onChange}
        />
        {fileUrl && (
          <Image className="rounded mt-4" width="350" height="300" src={fileUrl} />
        )}
        </label>
        
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  );
}
