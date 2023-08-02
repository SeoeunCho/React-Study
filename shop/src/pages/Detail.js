function Detail(props) {
  return (
    <div className="container">
      <div className="row">
        {props.shoes.map((el, i) => {
          return (
            <div className="col-md-6 mt-4">
              <img src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`} width="100%" alt="" />
              <h4 className="pt-5">{el.title}</h4>
              <p>{el.content}</p>
              <p>{el.price}</p>
              <button className="btn btn-danger">주문하기</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Detail;
