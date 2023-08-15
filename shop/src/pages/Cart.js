import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useState } from 'react';
import { changeName, increase } from './../store/useSlice';
import { addCount } from './../store';

let Child = memo(() => {
  console.log('재렌더링됨');
  return <div>자식임</div>;
});

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        +
      </button>
      <h6>
        {state.user.name}
        {state.user.age}의 장바구니
      </h6>

      <button
        onClick={() => {
          dispatch(increase(10));
        }}>
        버튼
      </button>
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
          {state.cart.map((el, i) => (
            <tr key={i}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCount(el.id));
                  }}>
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
