import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import Election from "../abi/Election.json";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #27b0b0;
`;
const Box = styled.div`
  height: 80vh;
  width: 85vw;
  background-color: white;
  opacity: 0.9;
  border-radius: 5px;
  padding: 20px 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.div`
  font-size: 2.5em;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;
const TableDiv = styled.div`
  width: 90%;
`;

export default function Result(props) {
  let [ModiVote, setModiVote] = useState(0);
  let [RahulVote, setRahulVote] = useState(0);
  let [AkhileshVote, setAkhileshVote] = useState(0);
  let [MamtaVote, setMamtaVote] = useState(0);
  let [YogiVote, setYogiVote] = useState(0);
  let [SmritiVote, setSmritiVote] = useState(0);
  let [SushmaVote, setSushmaVote] = useState(0);
  let [AmitVote, setAmitVote] = useState(0);

  let ElectionContractAddress = "0xfEd9146CF709C2a7269a7dF926E967846E750682";
  async function VotesCount() {
    console.log("Fetching Results");
    const contract = new ethers.Contract(
      ElectionContractAddress,
      Election.abi,
      props.signer2
    );
    let votecount1 = await contract.candidates(1);
    let votecount2 = await contract.candidates(2);
    let votecount3 = await contract.candidates(3);
    let votecount4 = await contract.candidates(4);
    let votecount5 = await contract.candidates(5);
    let votecount6 = await contract.candidates(6);
    let votecount7 = await contract.candidates(7);
    let votecount8 = await contract.candidates(8);

    setModiVote(votecount1[2].toString());
    setRahulVote(votecount2[2].toString());
    setAkhileshVote(votecount3[2].toString());
    setMamtaVote(votecount4[2].toString());
    setYogiVote(votecount5[2].toString());
    setSmritiVote(votecount6[2].toString());
    setSushmaVote(votecount7[2].toString());
    setAmitVote(votecount8[2].toString());
  }
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    VotesCount()
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Container>
        <Box>
          <Heading>Results</Heading>
          <TableDiv>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Party</th>
                  <th scope="col">Votes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Narender Modi</td>
                  <td>BJP</td>
                  <td>{ModiVote}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Rahul Gandhi</td>
                  <td>Congress</td>
                  <td>{RahulVote}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Akhilesh Yadav</td>
                  <td>SP</td>
                  <td>{AkhileshVote}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Mamta Baneerjee</td>
                  <td>TC</td>
                  <td>{MamtaVote}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Yogi Adityanath</td>
                  <td>BJP</td>
                  <td>{YogiVote}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Smriti Irani</td>
                  <td>BJP</td>
                  <td>{SmritiVote}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Sushma Swaraj</td>
                  <td>BJP</td>
                  <td>{SushmaVote}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Amit Shah</td>
                  <td>BJP</td>
                  <td>{AmitVote}</td>
                </tr>
              </tbody>
            </table>
          </TableDiv>
        </Box>
      </Container>
    </div>
  );
}
