import React, { Component, useEffect, useState } from 'react';
import "./NavBar.css"

export const NavBar = (props) =>{
    const { gsap } = require("gsap/dist/gsap")

    let g = gsap.timeline()

    let [openMenu,setMenuOpen] = useState(-1);


    const changeMenuState = () =>{
        if(openMenu==-1){
            setMenuOpen(true);
        }
        else{
            setMenuOpen(!openMenu)
        }
    }

    useEffect(
        ()=>{
            
            function f(){
                if(openMenu!=-1){
                    if(openMenu===true){
                        g.to('.mobile-menu',{display:"flex",duration:0},0)
                    }
                    else{
                        g.to('.mobile-menu',{display:"none",duration:0},0)
                    }
                }
            }
    
            f();
        }
    )

    const getIfMob = () =>{
        if(props.isDesktop){
            return {backgroundColor:"#252323"}
        }
        return {}
    }

    return(
        <nav style={getIfMob()}>
            <h1 style={{fontSize:"1.2rem"}}><a href="/" style={{color:"#A850DD"}}>Clicker Website</a></h1>
            <ul className="laptop-menu" >
                <li style={{marginRight:"2rem",float:"left"}}><a href="Admin">Admin Console</a></li>
            </ul>
            <div className="hamburger-menu-holder" style={{margin:"auto 0"}} >            
                <button className="hamburger" onClick={()=>changeMenuState()} ><i className="fa fa-bars fa-lg" style={{color:"white"}}></i></button>
                    <ul className="mobile-menu" >
                        <li style={{marginLeft:"1rem"}}><a href="Admin">Admin Console</a></li>
                    </ul>
            </div>
        </nav>
    )
}