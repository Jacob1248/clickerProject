import React, { Component, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = (props) =>{

    return(
        <div className="time-series-holder">
                    <Bar data={{
      labels: ["Iphone 11", "Flowers", "Chocolate", "Wrench", "Water","Headphones"],
      datasets: [
        {
          label: "Total left clicks",
          backgroundColor: ["#3e95cd", "#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd"],
          data: props?props.leftClicks:[0,0,0,0,0]
        },
        {
          label: "Total right clicks",
          backgroundColor: ["#8e5ea2", "#8e5ea2","#8e5ea2","#8e5ea2","#8e5ea2","#8e5ea2"],
          data: props?props.rightClicks:[0,0,0,0,0]
        }
      ]
    }}
                        options={
                        {
                            responsive:true,

maintainAspectRatio: false,
                            title:{
                                display:true,
                                text:"No. of clicks per product"},
                            scales: {
                                xAxes: [{
                                   stacked: true // this should be set to make the bars stacked
                                }],
                                yAxes: [{
                                   stacked: true // this also..,
                                   ,
                                   ticks: {
                                    beginAtZero: true
                                }
                                }]
                            }
                            
                        }
                    }>
                    </Bar>
        </div>
    )
}