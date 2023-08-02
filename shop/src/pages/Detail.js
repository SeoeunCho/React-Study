import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

/* let Btn = styled.button`
  background: ${(props) => props.bgColor};
  color: ${(props) => (props.bgColor === 'blue' ? 'white' : 'black')};
  padding: 10px;
`;

let NewBtn = styled(Btn)`
  border-radius: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`; */

function Detail(props) {
  let [count, setCount] = useState(0);
  let [timer, setTimer] = useState(true);
  let [inputVal, setInputVal] = useState('');
  let { id } = useParams();
  let detailData = props.shoes.find((el) => el.id === Number(id));

  /**
   * 1. useEffect(() => {  }) : 재렌더링마다 코드실행하고 싶을 때
   * 2. useEffect(() => {  }, []) : mount시 1회 코드 실행하고 싶을 때
   * 3. useEffect(() => {  }, [state명]) : 특정 state 변경시에만 실행하고 싶을 때 (useEffect 실행조건)
   * 4. useEffect(() => { return () => {} }, []) : (= clean up function) unmount시 1회 코드 실행하고 싶을 때,
   *                                                useEffect 실행 전에 뭔가 실행하고 싶을 때 return() => {}
   */
  useEffect(() => {
    let removeTimer = setTimeout(() => {
      setTimer(false);
      console.log(2);
    }, 2000);

    if (isNaN(inputVal)) alert('숫자만 입력해주세요.');

    return () => {
      console.log(1);
      clearTimeout(removeTimer); // clearTimeout() : 타이머 제거하는 함수
    };
  }, [inputVal]);

  return (
    <div className="container">
      {/* {timer ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null}
      {count}
      <button onClick={() => { setCount(count + 1); }}>버튼</button> */}

      {/* <Box>
        <Btn bgColor="yellow">버튼</Btn>
        <Btn bgColor="orange">버튼</Btn>
        <Btn bgColor="blue">버튼</Btn>
        <NewBtn>버튼</NewBtn>
      </Box> */}

      <div className="row">
        <div className="col-md-6 pt-5">
          <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="100%" alt="" />
        </div>
        <div className="col-md-6 mt-4">
          {/* <input type="text" onChange={e => {setInputVal(e.target.value)}}></input> */}
          <h4 className="pt-5">{detailData.title}</h4>
          <p>{detailData.content}</p>
          <p>{detailData.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
