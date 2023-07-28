/* eslint-disable */
import { useState } from 'react';
import './App.css';

function App() {
  let [postTitle, changeTitle] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']);
  let [likes, likeCount] = useState(0);
  let [modal, setModal] = useState(false);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <div className="list">
        <button
          onClick={() => {
            let copy = [...postTitle];
            copy[0] = '여자 코트 추천';
            changeTitle(copy);
          }}>
          제목수정
        </button>
        <button
          onClick={() => {
            let copy = [...postTitle];
            copy.sort();
            changeTitle(copy);
          }}>
          가나다순 정렬
        </button>
        <h4>
          {postTitle[0]}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              likeCount(likes++);
            }}>
            👍
          </span>
          {likes}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{postTitle[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4
          onClick={() => {
            setModal(!modal);
          }}>
          {postTitle[2]}
        </h4>
        <p>2월 17일 발행</p>
      </div>

      {modal ? <Modal /> : null}
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
