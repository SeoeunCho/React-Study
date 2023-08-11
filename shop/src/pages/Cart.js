import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {
  let cart = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((el, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{el.name}</td>
                <td>{el.count}</td>
                <td>안녕</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
