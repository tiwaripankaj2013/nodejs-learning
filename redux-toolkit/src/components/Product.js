import React from "react";
import { useParams } from "react-router-dom";
const Product = () => {
    const {id} =useParams();
    console.log(id);
    const product = products.find(product => product.id === +id);
    console.log(product);
    return(
        <>
        <div>welcome </div>
        </>
    )
}
 
export default Product;