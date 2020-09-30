import React, { Component, useEffect, useState } from 'react';
import "./DashPage.css"
import { Chart } from "react-charts";
import { API_GET } from '../APICall';
import { host } from '../commons';

export const MiniAnalytics = (props) =>{

    const { gsap } = require("gsap/dist/gsap")

    let g = gsap.timeline()

    let [count,setCount] = useState('NA');

    let infoHolderRef = null;

    useEffect(
        ()=>{
            
           async  function f(){
               if(count==='NA'&&props.doAPICall==true){
                let result = await API_GET(`${host}${props.route}`);
                if(result.status === 200){
                    let jsonResponse = await result.json();
                    setCount(jsonResponse.count);
                }
                else{
                    setCount('Error');
                }

               }
            }
    
            f();
        }
    )

    const onMouseEnter = (e) => {
        gsap
        .to(infoHolderRef,{display:"flex",duration:0},0)
    }

    const onMouseLeave = () => {
        gsap.to(infoHolderRef,{display:"none",duration:0})

    }

    return(

        <div className="mini-analytics">
            <span className="analytics-header" style={{color: "#A850DD"}}>{props.header} <span onMouseEnter={(e)=>onMouseEnter(e)} onMouseLeave={()=>onMouseLeave()} className="fa fa-info-circle" style={{display:props.displayInfo?"initial":"none",color:"white"}}></span></span>
            <span className="analytics-header" style={{margin:"auto 0",marginLeft:"1rem",fontSize:"2rem"}}>{!props.doAPICall?props.data:count}</span>
            {
                props.displayInfo?
                <div ref={ref=>infoHolderRef=ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="info-holder" >
                    <br/>
                    <span style={{width:"90%",fontWeight:"bold",marginTop:"1rem"}}>{props.info}</span>
                </div>
                :
                ""
            }
        </div>
)   
}