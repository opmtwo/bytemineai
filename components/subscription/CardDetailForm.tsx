import React from "react"
import {CardNumberElement,CardCvcElement,CardExpiryElement} from "@stripe/react-stripe-js"
import styles from "./CardDetail.module.css"
const CardDetailForm=()=>{
    const options={
        style:{
            base:{
                fontWeight: 'bold',
                 fontSize: '12px',
                 '::placeholder': {
                  color: '#dbdbdb',
                  },
            }
        }
    }
    return (
        <>
            <div className="mb-3">
                 <h1 className="is-size-7 has-text-weight-medium">Credit Card Number</h1>
                 <div className={styles.cardInputWrapper}>
                 <CardNumberElement options={options} />
            </div>
            </div>   
            <div className="columns is-is-mobile">
                <div className="column is-6">
                    <h1 className="is-size-7 has-text-weight-medium">Expiration</h1>
                <div className={styles.cardInputWrapper}>
                 <CardExpiryElement options={options}/>
                </div>
                </div>
                <div className="column is-6 mb-3">
                    <h1 className="is-size-7 has-text-weight-medium">CVS</h1>
                  <div className={styles.cardInputWrapper}>
                   <CardCvcElement options={options}/>
                  </div> 
                </div>
            </div>    
        </>
    )
}
export default CardDetailForm