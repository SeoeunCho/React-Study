import { useParams } from 'react-router-dom';

function Detail(props) {
  let { id } = useParams();
  let detailData = props.shoes.find((el) => el.id === Number(id));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
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
