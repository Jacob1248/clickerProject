import React, { Component, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

let labels =  ["Iphone 11", "Flowers", "Chocolate", "Wrench", "Water","Headphones"]

export const PieChart = (props) =>{

    return(
<div className="time-series-holder pie-width pie-height" style={{marginTop:"1rem",marginLeft:"2rem",marginBottom:"1rem",justifyContent:"initial",paddingBottom:"1rem"}}>

        <Pie data={{
      datasets: [
        {
          label: "Total left clicks",
          backgroundColor: ["white", "green","red","blue","orange","purple"],
          data: props?props.leftClicks:[0,0,0,0,0]
        }
      ],
      labels: labels,
    }}
                        options={
                        {
                            responsive:true,

                            maintainAspectRatio: false,
                            title:{
                                display:true,
                                text:"Product popularity by clicks"},                            
                        }
                    }>
                    </Pie>
    </div>
    )
}