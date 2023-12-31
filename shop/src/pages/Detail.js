import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';
import { useDispatch } from 'react-redux';
import { addCart } from './../store.js';

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
  let dispatch = useDispatch();

  let { extra } = useContext(Context1);

  let [count, setCount] = useState(0);
  let [timer, setTimer] = useState(true);
  let [inputVal, setInputVal] = useState('');

  let { id } = useParams();
  let detailData = props.shoes.find((el) => el.id === Number(id));
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState('');

  /**
   * 1. useEffect(() => {  }) : 재렌더링마다 코드실행하고 싶을 때
   * 2. useEffect(() => {  }, []) : mount시 1회 코드 실행하고 싶을 때
   * 3. useEffect(() => {  }, [state명]) : 특정 state 변경시에만 실행하고 싶을 때 (useEffect 실행조건)
   * 4. useEffect(() => { return () => {} }, []) : (= clean up function) unmount시 1회 코드 실행하고 싶을 때,
   *                                                useEffect 실행 전에 뭔가 실행하고 싶을 때 return() => {}
   */
  useEffect(() => {
    let pick = localStorage.getItem('watched');
    pick = JSON.parse(pick);
    pick.unshift(detailData);

    // 중복제거
    pick = [...new Set(pick.map(JSON.stringify))].map(JSON.parse);

    localStorage.setItem('watched', JSON.stringify(pick));

    return () => {};
  }, [detailData]);

  useEffect(() => {
    let removeTimer = setTimeout(() => {
      setTimer(false);
    }, 2000);

    let gap = setTimeout(() => {
      setFade('end');
    }, 100);

    if (isNaN(inputVal)) alert('숫자만 입력해주세요.');

    return () => {
      clearTimeout(removeTimer); // clearTimeout() : 타이머 제거하는 함수
      clearTimeout(gap);
    };
  }, [inputVal, fade]);

  return (
    <div className={`container start ${fade}`}>
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
          <Link
            className="btn btn-danger"
            to="/cart"
            onClick={() => {
              dispatch(addCart({ id: 3, name: detailData.title, count: 1 }));
            }}>
            주문하기
          </Link>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  let [fade2, setFade2] = useState('');
  let { extra } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade2('end');
    }, 100);

    return () => {
      setFade2('');
    };
  }, [tab]);
  return <div className={`start ${fade2}`}>{[<div>{extra}</div>, <div>내용1</div>, <div>내용2</div>][tab]}</div>;
}

export default Detail;
