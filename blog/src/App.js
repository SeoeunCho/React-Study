/* eslint-disable */
import { useState } from 'react';
import './App.css';

function App() {
  let [postTitle, changeTitle] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']);
  let [likes, likeCount] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [titleIdx, changeTitleIdx] = useState(0);
  let [inputVal, changeInputVal] = useState('');
  let [date, setDate] = useState(['2월 1일 발행', '2월 2일 발행', '2월 3일 발행']);

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

      {postTitle.map((el, i) => {
        return (
          <div className="list">
            <h4>
              <span
                onClick={() => {
                  setModal(!modal);
                  changeTitleIdx(i);
                }}>
                {postTitle[i]}

                <span
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    let copy = [...likes];
                    copy[i]++;
                    likeCount(copy);
                  }}>
                  👍
                </span>

                {likes[i]}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    let copy = [...postTitle];
                    copy.splice(i, 1);
                    changeTitle(copy);
                  }}>
                  글삭제
                </button>
              </span>
            </h4>
            <p>{date[i]}</p>
          </div>
        );
      })}

      <div>
        <input
          type="text"
          onChange={(e) => {
            changeInputVal(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (inputVal) {
              let copy = [...postTitle];
              copy.unshift(inputVal);
              changeTitle(copy);

              let now = new Date();
              let month = now.getMonth() + 1;
              let day = now.getDate();
              let dateCopy = [...date];
              dateCopy.unshift(`${month}월 ${day}일 발행`);
              setDate(dateCopy);
            } else {
              alert('제목을 한 글자 이상 입력해주세요.');
            }

            let copy2 = [...likes];
            copy2.unshift(0);
            likeCount(copy2);
          }}>
          글발행
        </button>
      </div>

      {modal ? <Modal postTitle={postTitle} titleIdx={titleIdx} /> : null}

      <Modal2></Modal2>
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.postTitle[props.titleIdx]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  );
}

class Modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'kim',
      age: 20,
    };
  }
  render() {
    return (
      <div>
        안녕 {this.state.age} {this.props}
        <button
          onClick={() => {
            this.setState({ age: 21 });
          }}>
          버튼
        </button>
      </div>
    );
  }
}

export default App;
