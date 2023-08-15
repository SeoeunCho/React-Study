import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';
import { useQuery } from 'react-query';

export let Context1 = createContext();

function App() {
  useEffect(() => {
    if (!watchedList) localStorage.setItem('watched', JSON.stringify([]));
  }, []);

  let [shoes, setShoes] = useState(data);
  let [extra] = useState([10, 11, 12]);
  let navigate = useNavigate();

  let result = useQuery(
    'userName',
    () =>
      axios.get('https://codingapple1.github.io/userdata.json').then((res) => {
        console.log('요청됨');
        return res.data;
      }),
    { staleTime: 2000 }
  );

  let [count, setCount] = useState(1);
  let [more, setMore] = useState(true);
  let [load, setLoad] = useState(false);
  let watchedList = localStorage.getItem('watched');
  watchedList = JSON.parse(watchedList);

  let sortFunc = () => {
    let copy = [...shoes];
    copy.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    setShoes(copy);
  };

  let moreFunc = () => {
    count++;
    setCount(count);
    setLoad(true);

    /** AJAX : 서버에 GET,POST 요청할 때 새로고침 없이 데이터를 주고받을 수 있게 도와주는 브라우저 기능
     *
     * AJAX로 GET/POST 요청하는 방법
     *
     * 1. XMLHttpRequest 라는 옛날 문법 사용
     * 2. fetch() 라는 최신문법 사용
     * 3. axios 같은 외부 라이브러리 사용
     *
     * axios 라이브러리 : JSON -> object/array 변환작업을 자동으로 해줌
     * POST 요청 : axios.post('URL', { name: 'kim' }).then(() => {});
     */

    axios
      .get(`https://codingapple1.github.io/shop/data${count}.json`)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            setLoad(false);
          }, 1000);
        }

        if (count === 2) {
          let copy = [...shoes, ...res.data];
          setShoes(copy);
        } else if (count === 3) {
          let copy = [...shoes, ...res.data];
          setShoes(copy);
          setMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    /** fetch() : 자바스크립트 함수
     * axios와 다르게 JSON -> object/array 변환작업을 해주지 않아서 직접 바꾸는 작업이 필요함
     * 예시)
     * fetch('URL').then((res) => res.json()).then((res) => console.log(res)); */

    /** Promise.all : 동시에 여러 개의 AJAX 요청 할 때
     * 예시)
     * Promise.all([axios.get('/url1'), axios.get('/url2')]).then(() => {});
     */
  };

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Reactshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Detail</Nav.Link>
            <Nav.Link href="/event">Event</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/about');
              }}>
              About
            </Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg">
                <div className="recent-list">
                  <h3>최근 본 상품</h3>
                  {watchedList
                    ? watchedList.map((el, i) => {
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              navigate(`/detail/${el.id}`);
                            }}>
                            <img src={`https://codingapple1.github.io/shop/shoes${el.id + 1}.jpg`} width="80%" alt="" />
                            <p>{el.title}</p>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <Button variant="secondary" className="mt-4" onClick={sortFunc}>
                이름순
              </Button>
              <div className="container pt-4">
                <div className="row">
                  {load ? <Loading /> : ''}
                  {shoes.map((el) => {
                    return <Card shoes={el} idx={el.id} key={el.id} navigate={navigate}></Card>;
                  })}
                </div>
              </div>
              {more ? <Button onClick={moreFunc}>더보기</Button> : null}
            </>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ extra, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />

        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
        <Route path="*" element={<div>404 없는페이지입니다.</div>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div
      className="col-md-4"
      onClick={() => {
        props.navigate(`/detail/${props.idx}`);
      }}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.idx + 1}.jpg`} width="80%" alt="" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price.toLocaleString()}원</p>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Loading() {
  return <div>로딩중입니다.</div>;
}

export default App;
