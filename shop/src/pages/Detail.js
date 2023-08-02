import { useParams } from 'react-router-dom';
import styled from 'styled-components';

let Btn = styled.button`
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
`;

function Detail(props) {
  let { id } = useParams();
  let detailData = props.shoes.find((el) => el.id === Number(id));

  return (
    <div className="container">
      <Box>
        <Btn bgColor="yellow">버튼</Btn>
        <Btn bgColor="orange">버튼</Btn>
        <Btn bgColor="blue">버튼</Btn>
        <NewBtn>버튼</NewBtn>
      </Box>
      <div className="row">
        <div className="col-md-6 pt-5">
          <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="100%" alt="" />
        </div>
        <div className="col-md-6 mt-4">
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
