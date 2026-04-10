const apiBase = `http://localhost:3000`;

 export const fetchOrders = async (endpoint) => {
    try {
      const res = await fetch(`${apiBase}/${endpoint}`);
      if(!res.ok) throw new Error("server not responding")
    const data = await res.json(); 
    return data 
    } catch (error) {
        console.log(error);
         return [];
    } 

  };


  export const createOrder = async (endpoint, name) => {
    try {
      const res = await fetch(`${apiBase}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name: name })
    });
      if(!res.ok) throw new Error("server not responding")
    return res 
    } catch (error) {
        console.log(error);
        
    } 

  };

 export  const updateStatus = async (id) => {
           try {
      const res = await fetch(`${apiBase}/orders/${id}/status`, {
       method: 'PUT'
    });
      if(!res.ok) throw new Error("server not responding")

    } catch (error) {
        console.log(error);
        
    } 
  };