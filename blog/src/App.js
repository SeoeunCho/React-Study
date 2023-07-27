/* eslint-disable */
import { useState } from 'react';
import './App.css';

function App() {
  let [postTitle, changeTitle] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']);
  let [likes, likeCount] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <div className="list">
        <button style={{width: '30px', height: '30px'}} onClick={() => {changeTitle(['여자 코트 추천', '강남 우동맛집', '파이썬독학'])}}></button>
        <h4>
          {postTitle[0]}
          <span onClick={() => {likeCount(likes++)}}>👍</span> {likes}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{postTitle[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{postTitle[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
