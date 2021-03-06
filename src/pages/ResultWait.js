import React, { useState, useEffect } from "react";

import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { actions } from '../store/modules/reducer';
import { useDispatch, useSelector } from "react-redux";
import { selector } from '../store/modules/reducer';


function GoResultPage(){
  const dispatch = useDispatch();
  const history = useHistory();
  let wonScore = '';
  let genderNumber = 0;

  const getScoreList = useSelector(selector.getScoreList);
  const genderStr = useSelector(selector.getGender);

  const [sortScoreList, setSortScoreList] = useState([...getScoreList])

  const resultToString= () => {
    sortScoreList.sort((a, b) => {
      return a.id - b.id
    })
    sortScoreList.map(question => {
        const string = 'B'+question.id+'='+question.score+' ';
        wonScore = wonScore + string;
    })
  }

  useEffect(()=>{
    resultToString();
    genderNumber = genderStr==='male'? genderNumber=100323 : genderNumber=100324;
  }, [getScoreList, genderStr])

  const handleClickFinalResultButton = () => {
    dispatch(actions.setScoreString(wonScore));
    dispatch(actions.setGenderNumber(genderNumber));
    history.push('./finalResult');
  }

  return (
    <Container>
      <Title>검사가 완료되었습니다.</Title>
      <Content>검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,<br/> 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</Content>
      <Button
        onClick={handleClickFinalResultButton}>
        검사 완료
      </Button>
    </Container>    
  )
}

const ResultWait = ({ history }) => {
    return (
        <GoResultPage />
    );
};

export default ResultWait;

const Title = styled.h1`
    margin-top: 150px;
    text-align: center;
    color: #8A2BE2;
`
const Content = styled.p`
  margin-top: 30px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 400px) {
    width: 100%;
    max-width: 400px;
    justify-content: start;
    flex-wrap: wrap;
  }

  Button {
      margin-top: 50px;
      background-color: #8A2BE2;
      border: 0;
      outline: 0;
  }
`