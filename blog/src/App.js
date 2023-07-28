/* eslint-disable */
import { useState } from 'react';
import './App.css';

function App() {
  let [postTitle, changeTitle] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']);
  let [likes, likeCount] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [titleIdx, changeTitleIdx] = useState(0)

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
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

      {
        postTitle.map((el, i) => {
          return (
            <div className="list">
              <h4 style={{ display: 'flex' }}>
                <span onClick={() => { setModal(!modal); changeTitleIdx(i); }}>{postTitle[i]}</span>
                <span style={{ cursor: 'pointer' }} 
                  onClick={() => {
                    let copy = [...likes];
                    copy[i]++;
                    likeCount(copy);
                  }}>👍
                </span>{likes[i]}
              </h4>
              <p>2월 17일 발행</p>
            </div>
          );
        })
      }

      
      {
        modal ? <Modal postTitle={ postTitle } titleIdx={ titleIdx }/> : null
      }
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{ props.postTitle[props.titleIdx] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  );
}

export default App;
