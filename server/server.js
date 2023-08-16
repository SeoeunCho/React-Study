const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
  console.log('listening on 8080');
});

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});

// DB데이터 리액트에서 보여줄 때 ex)DB에 있던 상품명을 보여주려면?
app.get('/product', function (req, res) {
  res.json({ name: 'black shoes' });
});

// 리액트라우터 사용하는 경우 경로 설정
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
