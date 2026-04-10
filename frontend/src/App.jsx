import React, { useEffect, useState } from 'react';
import { createOrder, fetchOrders, updateStatus } from './apiservice/Allapi';

function App() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const[loading, setLoading] = useState(false)



  useEffect(() => {
    async function fetData (){
      setLoading(true)
      try {
        const data = await fetchOrders('orders');
        setOrders(data)
      } catch (error) {
        console.log(error);
        
      } finally {
        setLoading(false)
      }
    }
    fetData()
  }, [name]);

  const createOrderHandler = async () => {
    setLoading(true)
      try {
         const res =  await  createOrder('orders',name)
         // console.log(res)
          if(res.status === 200) alert("product placed successfully")
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    setName('');
  };

  const updateStatusHandler = async (id) => {
        await updateStatus(id);
        let update =  await fetchOrders('orders');
        setOrders(update)
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Tracking System  {loading && <span>Loading ......</span>} </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />
      <button onClick={createOrderHandler}>Create</button>

      <hr />

      {orders?.map(val => (
        <div key={val.id} style={{ marginBottom: 10 }}>
          <strong>{val.product_name}</strong> - {val.status}
          {val.status !== 'DELIVERED' && (
            <button onClick={() => updateStatusHandler(val.id)}>
              Next
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
