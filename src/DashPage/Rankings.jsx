import React from 'react';


export const Rankings = (props) =>{

    const getProductName = (number) =>{
        switch(parseInt(number,10)){
            case 0:{
                return "Iphone 11"
            }
            case 1:{
                return "Flowers"
            }
            case 2:{
                return "Chocolate"
            }
            case 3:{
                return "Wrench"
            }
            case 4:{
                return "Water"
            }
            case 5:{
                return "Headphones"
            }
            default:{
                return "productName"
            }
        }
    }

    return(

        <div className="time-series-holder rank-height" style={{marginTop:"1rem",marginLeft:"2rem",justifyContent:"initial",textAlign:"left",backgroundColor:"transparent"}}>
            <div className="additional-info">
                <span className="analytics-header" style={{color: "#A850DD",fontSize:"1.2rem",marginTop:"1rem"}}>Database Information</span>
                <span style={{margin:"auto 0",marginLeft:"1rem"}}>Database name : clickbase</span>
                <span style={{margin:"auto 0",marginLeft:"1rem"}}>Collection name : clickinfo</span>
            </div>
            <div className="additional-info" style={{marginBottom:0}}>
                <span className="analytics-header" style={{color: "#A850DD",fontSize:"1.2rem",marginTop:"1rem"}}>Rankings</span>
                <span style={{margin:"auto 0",marginLeft:"1rem"}}>Most Popular Item : {props.largest?`${getProductName(props.largest.productID)} with ${props.largest.number} left clicks`:"NA"}</span>
                <span style={{margin:"auto 0",marginLeft:"1rem"}}>Least Popular Item : {props.smallest?`${getProductName(props.smallest.productID)} with ${props.smallest.number} left clicks`:"NA"}</span>
            </div>
        

        </div>
    )
}