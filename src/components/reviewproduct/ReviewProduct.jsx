import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import "./ReviewProduct.scss"
import Card from '../card/Card'
import spinnerImg from "../../assets/spinner.jpg"
import StarsRating from "react-star-rate"
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import useFetchDocument from '../../customHooks/usefetchDocument'

const ReviewProduct = () => {
    const {id} = useParams()
    const [rate, setRate] = useState(0)
    const [review, setReview] = useState("")
    const [product, setProduct] = useState(null)
    const {document} = useFetchDocument("products", id)
    const userID = useSelector((state)=> state.slice.userID)
    const userName =  useSelector((state)=> state.slice.userName)

    useEffect(()=>{
        setProduct(document)
    },[document])

    const submitReview = (e)=>{
        e.preventDefault()

        const today = new Date()
        const date = today.toDateString()
        try{
            addDoc(collection(db, "reviews"), {
                userID,
                userName,
                productID:id,
                rate,
                review,
                reviewDate : date,
                createAt: Timestamp.now().toDate(),
            })
            setReview("")
            toast.success("Review submitted Successfully")
        }catch(err){
            toast.error(err.message)
        }
    }
  return (
    <section>
        <div className={`container ${"review"}`}>
        <h2>Review Products</h2>
        {product === null ? (
            <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
            <>
            <p>
                <b>Product name:</b> {product.name}
            </p>
            <img
                src={product.imageURL}
                alt={product.name}
                style={{ width: "100px" }}
            />
            </>
        )}

        <Card cardClass="card">
            <form onSubmit={(e) => submitReview(e)}>
                <label>Rating:</label>
                <StarsRating
                    value={rate}
                    onChange={(rate) => {
                    setRate(rate);
                    }}
                />
                <label>Review</label>
                <textarea
                    value={review}
                    required
                    onChange={(e) => setReview(e.target.value)}
                    cols="30"
                    rows="10"
                ></textarea>
                <button type="submit" className="--btn --btn-primary">
                    Submit Review
                </button>
            </form>
        </Card>
        </div>
  </section>
  )
}

export default ReviewProduct