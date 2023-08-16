import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>리액트로 만든 html 페이지입니다.</div>

      <Routes>
        <Route path="/list" element={<div>리스트페이지</div>}></Route>
        <Route path="/mypage" element={<div>마이페이지</div>}></Route>
        {/* <Route path="*" element={<div>없는페이지입니다.</div>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
