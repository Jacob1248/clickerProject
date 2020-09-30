import React, { Component, useEffect, useState } from 'react';
import "./DashPage.css";
import { MiniAnalytics } from './MiniAnalytics';
import { BarChart } from './BarChart';
import { PieChart } from './PieChart';
import { Rankings } from './Rankings';
import { API_GET } from '../APICall';
import { host } from '../commons';


export const DashPage = () =>{
    let [data,setData] = useState('NA');

    useEffect(
        ()=>{
            
           async  function f(){
               if(data==='NA'){
                let result = await API_GET(`${host}/getMultipleData`);
                if(result.status === 200){
                    let jsonResponse = await result.json();
                    setData(jsonResponse);
                }
                else{
                    setData('Error');
                }

               }
            }
    
            f();
        }
    )

    return (
        <div className="admin">
            <span className="page-header">Dashboard</span>
            <span className="page-subheader">View page analytics here</span>

            <div className="multi-analytics-holder">
                <MiniAnalytics doAPICall={true} displayInfo={true} info={'If users mouse entered the page. These are the users that enter the page and actually navigate that page'} header={"Total impressions on the page"} route="/getImpressions"></MiniAnalytics>
                <MiniAnalytics  data={data.leftClickCount?data.leftClickCount:"NA"} displayInfo={true} info={'Total number of left clicks on products'} header={"Total products opened"} route="/leftclicks"></MiniAnalytics>
                <MiniAnalytics data={data.rightClickCount?data.rightClickCount:"NA"} displayInfo={false} header={"Total products right clicked on"} route="/rightclicks"></MiniAnalytics>
                <MiniAnalytics doAPICall={true} displayInfo={true} info={'Total number of clicks (left + right) on products in the last 24 hours'} header={"Total products Checked out in the last 24 hours"} route="/clickstoday"></MiniAnalytics>
            </div>
            <BarChart leftClicks={data.leftClicks} rightClicks={data.rightClicks}></BarChart>
            <PieChart leftClicks={data.leftClicks}></PieChart>
            <Rankings largest={data.largest} smallest={data.smallest}></Rankings>

        </div>
    )
}