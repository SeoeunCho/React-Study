import './App.css';
import { useDeferredValue, useState, useEffect, useTransition } from 'react';

// let a = new Array(10000).fill(0);

function App() {
  // let [name, setName] = useState('');
  // let [isPending, startTransition] = useTransition();
  // let state = useDeferredValue(name);
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  useEffect(() => {
    if (count !== 0 && count < 3) {
      setAge(age + 1);
      console.log('2==', count, age);
    }
  }, [count]);

  return (
    <div className="App">
      {/* <input
        onChange={(e) => {
          startTransition(() => {
            setName(e.target.value);
          });
        }}
      />
      {isPending
        ? '로딩중임'
        : a.map(() => {
            return <div>{state}</div>;
          })} */}

      <div>
        <div>안녕하십니까 전 {age}살입니다.</div>
        <button
          onClick={() => {
            setCount(count + 1);
            console.log('1==', count, age);
          }}>
          누르면 한살 먹기
        </button>
      </div>
    </div>
  );
}

export default App;
