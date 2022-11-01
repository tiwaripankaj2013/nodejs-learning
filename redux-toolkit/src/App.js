import { useEffect } from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {increment,decrement,increaseByAmount, fetchPost } from './redux/slices/counterSlices';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchPost());
  },[]);
  const post  = useSelector(state =>state.post);
  const {postsList,loading} = post;
  console.log({postsList,loading});
  const counter  = useSelector(state => state?.counter);
  console.log(counter);
  return (
    <div className="App">
      <h1>Redux learning</h1>
    <h2>Counter:{counter?.value}</h2>
    <button onClick={()=>dispatch(increment())}>+</button>
    <button onClick={()=>dispatch(decrement())}>-</button>
    <button onClick={()=>dispatch(increaseByAmount(11))}>increase Amount</button>
    <div>
      <h3>Post List</h3>
      {loading ?<h2>Loading...</h2>:postsList?.map(post =>(
        <div key={post?.id}>
        <h4>{post?.title}</h4>
        <p>{post?.body}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
