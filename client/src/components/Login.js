import React, { Component } from "react";
import styled from "styled-components";
import VotingArea from "./VotingArea";
import { ethers } from "ethers";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(90deg, rgba(0,0,0,0.1) 1%, rgba(0,0,0,0.1) 100%) ,url("https://cdn.pixabay.com/photo/2018/07/29/11/59/vote-3569999_1280.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  height: 480px;
  width: 400px;
  background-color: black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Button = styled.button`
  background: white;
  color: black;
  padding: 10px 50px;
  border-radius: 3px;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 12;

  &:hover {
    background: #c603fc;
    color: white;
    font-weight: bold;
  }
`;
const Up = styled.div`
  height: 230px;
  width: 230px;
  background: url("https://i.ibb.co/yVGxFPR/2.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  margin-bottom: 40px;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      account:"",
      signer:""
    };
  }
  authenticate = async () => {
    console.log("Logging In...");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(account)
    this.setState({account:account[0]})
    this.setState({signer:signer})
    this.setState({loggedin:true})
  };
  render() {
    if (this.state.loggedin) {
      return (
        <div>
          <VotingArea signer={this.state.signer} account={this.state.account}></VotingArea>
        </div>
      );
    } else {
      return (
        <div>
          <Container>
            <Box>
              <Up />
              <Button onClick={this.authenticate}>Login</Button>
            </Box>
          </Container>
        </div>
      );
    }
  }
}
