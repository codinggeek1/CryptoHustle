import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useContractWrite , useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xa80dFbE0197983CF923d3e669617c6356fF9C724');

  const {contract : userContract} = useContract('0x33f07Df2E667f29994BE7344886e265dCe3Fb6a5');
  const { mutateAsync: updateUserProfile } = useContractWrite(userContract, "updateUserProfile")
  const address = useAddress(0x87684B126Ceb30f616Eb3d084795Ac39C356413F);
  const {mutateAsync : users} = useContractRead(userContract,"users")
  const updateProfile = async (form) => {
    try {
      const data = await updateUserProfile([
        form.title, 
        form.description, 
        form.image,
         form.mail, 
         form.twitter, 
         form.github 
        ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const getProfile = async () =>{
    try{
      const user = await userContract.call('getUserProfile',address);
        console.info("contract call successs", user);
        return user;
    }catch(err){
      console.error("contract call failure", err);
    }
  }


//   const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
const { mutateAsync: postProject } = useContractWrite(contract, "postProject")
const { mutateAsync: postProposal} = useContractWrite(contract, "postProposal")
const { mutateAsync: approveProposal} = useContractWrite(contract, "approveProposal")
const { mutateAsync: rejectProposal } = useContractWrite(contract, "rejectProposal")
// const { mutateAsync: AcceptProject} = useContractWrite(contract, "AcceptProject")
  
  const createProject= async (form) => {
    try {
      const data = await postProject([
        form.title,
        form.description,
        form.budget,
        new Date(form.deadline).getTime(),
        form.image ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  const createProposal = async(form) =>{
    try {
      const data = await postProposal([
        form.id,
        form.description,
        form.amount,
       ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  const getProjects = async () => {
    
        const projects = await contract.call('getProjects');
        const parsedProjects = projects.map((project, i) => ({
          owner: project.owner,
          title: project.title,
          description: project.description,
          budget: ethers.utils.formatEther(project.budget.toString()),
          deadline: project.deadline.toNumber(),
          image: project.image,
          freelancer : project.freelancer,
          updates : project.updates,
          isApproved : project.isApproved,
          proposals : project.proposals,
          status : project.status,
          pId: i
        }));
    
        return parsedProjects;
      }

  const getProposalsFromContract = async (_projectId) => {
    try{
      const proposals = await contract.call('getProposals',_projectId);
      const parsedProposals = proposals.map((proposal, i) => ({
          description: proposal.description,
          amount: ethers.utils.formatEther(proposal.amount.toString()),
          isAccepted : proposal.isAccepted,
          isRejected : proposal.isRejected,
          pId: i
        }));
        console.info("contract call successs", parsedProposals);
        return parsedProposals;
    }catch(err){
      console.error("contract call failure", err);
    }
     
   }

   const approve = async (_projectId,_proposalOwner) => {
    try {
      const data = await approveProposal([ _projectId, _proposalOwner ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const reject = async (_projectId,_proposalOwner) => {
    try {
      const data = await rejectProposal([ _projectId, _proposalOwner ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const acceptProject = async (_projectId,amount) => {
      const data = await contract.call('AcceptProject',_projectId,{ value: ethers.utils.parseEther(amount)});
    }
  

  
//   const publishCampaign = async (form) => {
//     try {
//       const data = await createCampaign([
//         address, // owner
//         form.title, // title
//         form.description, // description
//         form.target,
//         new Date(form.deadline).getTime(), // deadline,
//         form.image
//       ])

//       console.log("contract call success", data)
//     } catch (error) {
//       console.log("contract call failure", error)
//     }
//   }

//   const getCampaigns = async () => {
//     const campaigns = await contract.call('getCampaigns');

//     const parsedCampaings = campaigns.map((campaign, i) => ({
//       owner: campaign.owner,
//       title: campaign.title,
//       description: campaign.description,
//       target: ethers.utils.formatEther(campaign.target.toString()),
//       deadline: campaign.deadline.toNumber(),
//       amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
//       image: campaign.image,
//       pId: i
//     }));

//     return parsedCampaings;
//   }

//   const getUserCampaigns = async () => {
//     const allCampaigns = await getCampaigns();
//     const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
//     return filteredCampaigns;
//   }

//   const donate = async (pId, amount) => {
//     const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});
//     return data;
//   }

//   const getDonations = async (pId) => {
//     const donations = await contract.call('getDonators', pId);
//     const numberOfDonations = donations[0].length;

//     const parsedDonations = [];

//     for(let i = 0; i < numberOfDonations; i++) {
//       parsedDonations.push({
//         donator: donations[0][i],
//         donation: ethers.utils.formatEther(donations[1][i].toString())
//       })
//     }

//     return parsedDonations;
//   }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        createProject,
        getProjects,
        updateProfile,
        getProfile,
        createProposal,
        getProposalsFromContract,
        approve,
        reject,
        acceptProject,
        // connect,
        // createCampaign: publishCampaign,
        // getCampaigns,
        // getUserCampaigns,
        // donate,
        // getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}


export const useStateContext = () => useContext(StateContext);
