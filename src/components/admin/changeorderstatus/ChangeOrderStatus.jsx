import React, { useState } from 'react'
import "./ChangeOrderStatus.scss"
import Loader from '../../loader/Loader'
import Card from '../../card/Card'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../../firebase/config'
import { useNavigate } from 'react-router-dom'

const ChangeOrderStatus = ({order, id}) => {

  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
console.log(order)
  const editOrder =async (e, id)=>{
    e.preventDefault()
    try {
       await setDoc(doc(db, 'orders', id), {
        ...order,
        orderStatus: status,
        editAt: Timestamp.now().toDate()
      });
      toast.success("Order status chagen Successfully")
      navigate("/admin/view-orders")
      setLoading(false)
    } catch (err) {
      toast.error(err.message)
    }

  }
  return (
    <div>
      {loading && <Loader/>}
      <div className="status">
        <Card cardClass="card">
          <h4>Update Status</h4>
          <form onSubmit={(e)=> editOrder(e, id)}>
            <span>
              <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                <option value="" disabled>-- Choose One --</option>
                <option value="Processing...">Processing...</option>
                <option value="Order Place...">Order Place...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <button type='submit' className='--btn --btn-primary'>Update Status</button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ChangeOrderStatus