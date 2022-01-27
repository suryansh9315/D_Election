// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.11;

contract Election{
    
    struct Candidate{
        uint id;
        string Name;
        uint VoteCount;
    }
    mapping(uint => Candidate) public candidates;
    uint public CandidatesCount;
    
    function addCandidate(string memory _name) private{
        CandidatesCount++;
        candidates[CandidatesCount] = Candidate(CandidatesCount,_name,0);
    }

    constructor() public {
        addCandidate("Narender Modi");
        addCandidate("Rahul gandhi");
        addCandidate("Akhilesh Yadav");
        addCandidate("Mamta Bannerjee");
        addCandidate("Yogi Adityanath");
        addCandidate("Smriti Irani");
        addCandidate("Sushma Swaraj");
        addCandidate("Amit Shah");
    }

    function vote(uint index) public {
        require(index<CandidatesCount, "Cannot vote to non-existent candidate");
        require(index>0, "Negative indexed");
        candidates[index].VoteCount +=1;
    }
}
