import React, { useState } from "react";
import styled from "styled-components";
import Result from "./Result";
import { ethers } from "ethers";
import Election from "../abi/Election.json";
import data from "../data"

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #27b0b0;
`;
const Box = styled.div`
  height: 90vh;
  width: 90vw;
  background-color: white;
  opacity: 0.9;
  border-radius: 5px;
  padding: 20px 20px;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const Heading = styled.div`
  font-size: 2.5em;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
`;
const CandidateList = styled.div``;
const Ul = styled.ul``;
const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 30px 0px;
`;
const Image = styled.div`
  height: 400px;
  width: 350px;
  background-image: url(${(props) => props.imageurl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px 10px;
  filter: brightness(95%);
  border-radius: 5px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 25px;
  margin-bottom: 12px;
`;
const Discription = styled.div`
  width: 600px;
  text-align: justify;
`;
const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  padding: 15px 15px;
  width: 500px;
  border-radius: 2px;
  border: 1px solid black;
  outline: none;
  margin: 20px 0px;
`;
const DataList = styled.datalist``;
const Option = styled.option`
`;
const Button = styled.button`
  padding: 13px 60px;
  border-radius: 2px;
  background: #243738;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 17px;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-right: 20px;

  &:hover {
    background: #27b0b0;
  }
`;

export default function CastVote(props) {
  let [vote_status, setvote_status] = useState(false);
  let [input, setInput] = useState();
  let ElectionContractAddress = "0xfEd9146CF709C2a7269a7dF926E967846E750682";
  let Candidates = [
    "Narender Modi",
    "Rahul Gandhi",
    "Akhilesh Yadav",
    "Mamta Baneerjee",
    "Yogi Adityanath",
    "Smriti Irani",
    "Sushma Swaraj",
    "Amit Shah",
  ];
  let url = "http://localhost:8000/updatefile"

  async function vote() {
    console.log(props.account)
    if(CheckAddress()==100){
      console.log("Voted2");
      return
    }
    console.log("Voted");
    const contract = new ethers.Contract(
      ElectionContractAddress,
      Election.abi,
      props.signer
    );
    console.log(input);
    if (!input) {
      alert("Enter Correct Candidate Name");
      return;
    }
    for (let i = 0; i < Candidates.length; i++) {
      if (input === Candidates[i]) {
        const vote = await contract.vote(i + 1);
        console.log(vote)
        let index = CheckAddress()
        const response = await fetch(url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"index":index})
        })
        const data = await response.json()
        return;
      }
    }
    alert("Enter Correct Candidate Name");
    return;
  }

  function CheckAddress(){
    for(let i = 0;i<data.length;i++){
      console.log(data[i].address)
      if(props.account === data[i].address.toLowerCase()){
        if(data[i].voted){
          alert("Already Voted")
          return 100
        }
        return i
      }
    }
    alert("Not Authorized To Vote")
    return 100
  }

  function updateInputValue(evt) {
    const val = evt.target.value;
    setInput(val);
  }

  function result() {
    setvote_status(true);
  }

  if (vote_status) {
    return <Result signer2={props.signer} account2={props.account}></Result>;
  } else {
    return (
      <Container>
        <Box>
          <Heading>Candidates Information</Heading>
          <CandidateList>
            <Ul>
              <Li>
                <Image imageurl="https://wallpaperaccess.com/full/1917934.jpg"></Image>
                <Content>
                  <Title>Narender Modi</Title>
                  <Discription>
                    Narendra Damodardas Modi (born 17 September 1950) is an
                    Indian politician serving as the 14th and current prime
                    minister of India since 2014. Modi was the chief minister of
                    Gujarat from 2001 to 2014 and is the Member of Parliament
                    from Varanasi. He is a member of the Bharatiya Janata Party
                    (BJP) and of the Rashtriya Swayamsevak Sangh (RSS), a
                    right-wing Hindu nationalist paramilitary volunteer
                    organisation. <br />
                    Modi led the BJP in the 2014 general election which gave the
                    party a majority in the Indian lower house of parliament,
                    the Lok Sabha, the first time for any single party since
                    1984. Modi's administration has tried to raise foreign
                    direct investment in the Indian economy and reduced spending
                    on healthcare and social welfare programmes. He began a
                    high-profile sanitation campaign, initiated a controversial
                    demonetisation of high-denomination banknotes and weakened
                    or abolished environmental and labour laws.{" "}
                  </Discription>
                </Content>
              </Li>
              <Li>
                <Content>
                  <Title>Rahul Gandhi</Title>
                  <Discription>
                    Rahul Gandhi is an Indian politician and a member of the
                    Indian Parliament, representing the constituency of Wayanad,
                    Kerala in the 17th Lok Sabha. A member of the Indian
                    National Congress, he served as the president of the Indian
                    National Congress from 16 December 2017 to 3 July 2019.
                    Gandhi is the chairperson of the Indian Youth Congress, the
                    National Students Union of India also a trustee of Rajiv
                    Gandhi Foundation and Rajiv Gandhi Charitable Trust.
                    <br /> In 2004, Gandhi announced to enter in active politics
                    and successfully contested the general elections held that
                    year from Amethi, a seat that was earlier held by his
                    father; he won again from the constituency in 2009 and 2014.
                    Gandhi was elected Congress Vice-President in 2013. Gandhi
                    led the Congress's campaign in the 2014 Indian general
                    elections; the party suffered its worst electoral result in
                    its history, winning only 44 seats compared to 206 seats won
                    previously in the 2009 general election.{" "}
                  </Discription>
                </Content>
                <Image imageurl="https://upload.wikimedia.org/wikipedia/commons/e/e5/Rahul_Gandhi.jpg"></Image>
              </Li>
              <Li>
                <Image imageurl="https://www.kindpng.com/picc/m/598-5982305_samajwadi-party-akhilesh-yadav-png-png-download-akhilesh.png"></Image>
                <Content>
                  <Title>Akhilesh Yadav</Title>
                  <Discription>
                    Akhilesh Yadav (born 1 July 1973) is an Indian politician
                    and national president of the Samajwadi Party who served as
                    the 20th Chief Minister of Uttar Pradesh from 2012 to 2017.
                    Having assumed office on 15 March 2012 at the age of 38, he
                    is the youngest person to have held the office. Yadav is the
                    Member of Parliament for Azamgarh in the 17th Lok Sabha,
                    being elected in 2019.
                    <br /> His first significant success in politics was being
                    elected as the Member of the Lok Sabha for the Kannauj
                    constituency in 2000. He is the son of veteran politician
                    Mulayam Singh Yadav, the founder-patron of Samajwadi Party
                    who has served as the Minister of Defence in the Government
                    of India and three terms as the Chief Minister of Uttar
                    Pradesh.{" "}
                  </Discription>
                </Content>
              </Li>
              <Li>
                <Content>
                  <Title>Mamta Baneerjee</Title>
                  <Discription>
                    Mamata Banerjee ( born 5 January 1955) is an Indian
                    politician who is serving as the ninth and current chief
                    minister of the Indian state of West Bengal since 2011, the
                    first woman to hold the office. She founded the All India
                    Trinamool Congress (AITC or TMC) in 1998 after separating
                    from the Indian National Congress, and became its first
                    chairperson. <br />
                    Banerjee previously served twice as Minister of Railways,
                    the first woman to do so. She is also the first female
                    Minister of Coal, and Minister of Human Resource
                    Development, Youth Affairs and Sports, Women and Child
                    Development in the cabinet of the Indian government. She
                    rose to prominence after opposing the erstwhile land
                    acquisition policies for industrialisation of the Communist
                    government in West Bengal for Special Economic Zones at the
                    cost of agriculturalists and farmers at Singur.
                  </Discription>
                </Content>
                <Image imageurl="https://upload.wikimedia.org/wikipedia/commons/4/49/Ms._Mamata_Banerjee%2C_in_Kolkata_on_July_17%2C_2018_%28cropped%29_%28cropped%29.JPG"></Image>
              </Li>
              <Li>
                <Image imageurl="https://scontent-del1-2.xx.fbcdn.net/v/t1.6435-1/58549584_345481709505906_5116154662059245568_n.png?_nc_cat=104&ccb=1-5&_nc_sid=1eb0c7&_nc_ohc=9xbHZLHBbN0AX--OTEi&_nc_ht=scontent-del1-2.xx&oh=00_AT8rRT4Y_x6rt_N5Z9HknPBG01n6oz3XAIA7dpzVm34LOw&oe=62120A51"></Image>
                <Content>
                  <Title>Yogi Adityanath</Title>
                  <Discription>
                    Yogi Adityanath (born Ajay Mohan Bisht 5 June 1972) is an
                    Indian Hindu monk and politician serving as the 22nd and
                    current Chief Minister of Uttar Pradesh, in office since 19
                    March 2017.He was appointed as the Chief Minister on 26
                    March 2017 after the Bharatiya Janata Party (BJP) won the
                    2017 State Assembly elections, in which he was a prominent
                    campaigner. He has been the Member of Parliament from the
                    Gorakhpur constituency, Uttar Pradesh, for five consecutive
                    terms since 1998.
                    <br />
                    Adityanath is also the mahant or head priest of the
                    Gorakhnath Math, a Hindu temple in Gorakhpur, a position he
                    has held since the death of his spiritual "father", Mahant
                    Avaidyanath, in September 2014. He is also the founder of
                    Hindu Yuva Vahini, a Hindu nationalist organisation. He has
                    an image of a Hindutva nationalist and a right-wing
                    populist.
                  </Discription>
                </Content>
              </Li>
              <Li>
                <Content>
                  <Title>Smriti Irani</Title>
                  <Discription>
                    Smriti Zubin Irani (born 23 March 1976) is an Indian
                    politician and a former television actress and producer. She
                    is the Minister of Women and Child Development in the Union
                    Cabinet of India since May 2019. A prominent leader within
                    the Bharatiya Janata Party, she is a Member of Parliament in
                    the Lok Sabha, representing Amethi.In the 2019 Indian
                    general election, she defeated Rahul Gandhi - the country's
                    principal opposition leader and the president of Indian
                    National Congress - to win the Amethi seat. Previously the
                    Amethi constituency had been represented by the members of
                    the Gandhi family for the last four decades. Earlier in
                    2011, Irani had become a member of the Rajya Sabha from
                    Gujarat.
                    <br />
                    Irani was the youngest minister in the 2019 Council of
                    Ministers, when she was sworn in as a Cabinet Minister in
                    May 2019 at the age of 43. Having a diverse family
                    background, Irani can speak in several Indian languages
                    including Hindi, Bengali, Marathi, Gujarati, and Punjabi.
                  </Discription>
                </Content>
                <Image imageurl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Smriti_Irani_-_2019.jpg/440px-Smriti_Irani_-_2019.jpg"></Image>
              </Li>
              <Li>
                <Image imageurl="https://www.oneindia.com/img/1200x80/2020/08/sushma-swaraj-1596689283.jpg"></Image>
                <Content>
                  <Title>Sushma Swaraj</Title>
                  <Discription>
                    Sushma Swaraj (14 February 1952 - 6 August 2019) was an
                    Indian politician and a Supreme Court lawyer. A senior
                    leader of Bharatiya Janata Party, Swaraj served as the
                    Minister of External Affairs of India in the first Narendra
                    Modi government (2014-2019). She was the second woman to
                    hold the office, after Indira Gandhi. She was elected seven
                    times as a Member of Parliament and three times as a Member
                    of the Legislative Assembly. At the age of 25 in 1977, she
                    became the youngest cabinet minister of Indian state of
                    Haryana. She also served as 5th Chief Minister of Delhi for
                    a short duration in 1998 and became the First female Chief
                    Minister of Delhi.
                    <br /> According to the doctors at AIIMS New Delhi, Swaraj
                    succumbed to a cardiac arrest following a heart attack on
                    the night of 6 August 2019. She was awarded the Padma
                    Vibhushan, India's second highest civilian award
                    posthumously in 2020 in the field of Public Affairs
                  </Discription>
                </Content>
              </Li>
              <Li>
                <Content>
                  <Title>Amit Shah</Title>
                  <Discription>
                    Amit Anil Chandra Shah (born 22 October 1964) is an Indian
                    politician currently serving as the Minister of Home Affairs
                    and the first Minister of Co-operation of India. He served
                    as the President of the Bharatiya Janata Party (BJP) from
                    2014 to 2020. He has also served as chairman of the National
                    Democratic Alliance (NDA) since 2014. He was elected to the
                    lower house of Parliament, Lok Sabha, in the 2019 Indian
                    general elections from Gandhinagar. Earlier, he had been
                    elected as a member of the upper house of Parliament, Rajya
                    Sabha, from Gujarat in 2017. Sworn in at the age of 54, he
                    is the youngest serving full-time Home Minister. He is the
                    chief strategist of the BJP and a close aide to Narendra
                    Modi.
                    <br />
                    Shah was the BJP's in-charge for India's largest and
                    politically most crucial state, Uttar Pradesh, during the
                    2014 Lok Sabha elections. The BJP and its NDA won 73 out of
                    80 seats. As a result, Shah rose to national prominence and
                    was appointed as the party's national president in July
                    2014.
                  </Discription>
                </Content>
                <Image imageurl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Shri_Amit_Shah_taking_charge_as_the_Union_Minister_for_Home_Affairs%2C_in_New_Delhi_on_June_01%2C_2019.jpg/440px-Shri_Amit_Shah_taking_charge_as_the_Union_Minister_for_Home_Affairs%2C_in_New_Delhi_on_June_01%2C_2019.jpg"></Image>
              </Li>
            </Ul>
          </CandidateList>
          <Heading>Cast Your Vote</Heading>
          <InputBox>
            <Input
              type="text"
              list="candidates"
              placeholder="Enter Name of your candidate"
              value={input}
              onChange={(evt) => updateInputValue(evt)}
            ></Input>
            <DataList id="candidates">
              <Option value="Narender Modi"></Option>
              <Option value="Rahul Gandhi"></Option>
              <Option value="Akhilesh Yadav"></Option>
              <Option value="Mamta Bannerjee"></Option>
              <Option value="Yogi Adityanath"></Option>
              <Option value="Smriti Irani"></Option>
              <Option value="Sushma Swaraj"></Option>
              <Option value="Amit Shah"></Option>
            </DataList>
            <div>
              <Button className="submit_button" onClick={vote}>
                Vote
              </Button>
              <Button onClick={result}>View Result</Button>
            </div>
          </InputBox>
        </Box>
      </Container>
    );
  }
}
