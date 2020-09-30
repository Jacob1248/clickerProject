import React, { Component, useEffect, useState } from 'react';
import "./ProductPage.css";
import { API_POST } from '../APICall';

export const ProductPage = () =>{

    let [impression,setImpression] = useState(false);
    let [clickPoints,setClickPoints] = useState([]);

    let productRef = null;

    useEffect(
        ()=>{
            
           async  function f(){
            }
    
            f();
        }
    )

    const impressed = async () =>{
        if(impression==false){
            let clickData = {
                url:'http://127.0.0.1:9000/setImpression',
                payload:{
                }
            }
            API_POST(clickData);
            setImpression(true);
        }
    }

    const belongsToContainer = (element, classname) => {
        try{
            if (element.className.split(' ').indexOf(classname)>=0) return {state:true,element:element};
            return element.parentNode && belongsToContainer(element.parentNode, classname);

        }
        catch(error){
            return false
        }
    }

    const handleClick = async (e) =>{
        // e = Mouse click event.
        var rect = productRef.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        
      let container = e.target;
      //if we click on the span children of the container, then try retrieving that container object
      if(container.className!="container"){
        let elementCheck = belongsToContainer(container,'container');
        if(elementCheck.state===true){
            container = elementCheck.element
        }
        else{
        setClickPoints([
            ...clickPoints,
            {
                x:x,
                y:y,
                important:false
            }
        ])
        //if we clicked on anything other than the container or its children,return
            return;
        }
      }
      let clickData = {
          url:'http://127.0.0.1:9000/registerClick',
          payload:{
            //timeClicked:, will be generated on server as Date.now() on client wont be consistent on multiple clients,
            buttonClicked:e.button,//left or right click
            productID:container.firstChild.getAttribute('data-id')//get product id of container that was clicked
          }
      }
      await API_POST(clickData);
      console.log(clickPoints)
      setClickPoints([
          ...clickPoints,
          {
              x:x,
              y:y,
              important:true
          }
      ])
    }  

    return(
        <div ref={ref=>productRef=ref} className="product-page" onMouseMove={impressed} onMouseDown={handleClick}>
            <span className="page-header">Product page</span>
            <span className="page-subheader">Click anything in this site to register click information</span>
            <div className="products-area">
                <div className="container">
                    <span data-id="0" className="product-name">Iphone11</span>
                </div>
                <div className="container">
                    <span data-id="1" className="product-name">Flowers</span>
                </div>
                <div className="container">
                    <span data-id="2" className="product-name">Chocolate</span>
                </div>
                <div className="container">
                    <span data-id="3" className="product-name">Wrench</span>
                </div>
                <div className="container">
                    <span data-id="4" className="product-name">Water</span>
                </div>
                <div className="container">
                    <span data-id="5" className="product-name">Headphones</span>
                </div>
            </div>
            {
                clickPoints?
                clickPoints.map((value,index)=>
                    <span className="fa fa-circle" style={{position:"absolute",display:"block",top:value.y,left:value.x,color:value.important?"green":"red",fontSize:"0.2rem"}}></span>
                )
                :""
            }
        </div>
    )
}