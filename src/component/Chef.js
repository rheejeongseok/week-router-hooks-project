import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";

export default function Chef(){

    const [chef,setChef] = useState([]);
    const [page,setPage] = useState(1);
    const [total,setTotal] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3355/chef", {
            params: {
                page:page
            }
        }).then((rs) => {
            setChef(rs.data);
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3355/chef_total')
            .then((rs) => {
                setTotal(rs.data.total)

            })
    }, []);

    const onPrev = () => {
        setPage(page>1 ? page-1:page);
        axios.get('http://localhost:3355/chef',{
            params:{
                page:page
            }
        }).then((rs) => {
            setChef(rs.data);
        })
    }

    const onNext = () => {
        setPage(page<total ? page+1:page);
        axios.get('http://localhost:3355/chef',{
            params:{
                page:page
            }
        }).then((rs) => {
            setChef(rs.data);
        })
    }

    const html = chef.map((c, idx) =>
        <table className="table">
            <tbody>
            <tr>
                <td className="text-center" width="30%" rowSpan="3">
                    <img src={c.poster} width="100" height="100" className="img-circle" alt=""/>
                </td>
                <td width="30%" colSpan="4">
                    {c.chef}
                </td>
            </tr>
            <tr>
                <td className="text-center"><img src={"/1.png"} alt=""/></td>
                <td className="text-center"><img src={"/3.png"} alt=""/></td>
                <td className="text-center"><img src={"/7.png"} alt=""/></td>
                <td className="text-center"><img src={"/2.png"} alt=""/></td>
            </tr>
            <tr>
                <td className="text-center">{c.mem_cont1}</td>
                <td className="text-center">{c.mem_cont3}</td>
                <td className="text-center">{c.mem_cont7}</td>
                <td className="text-center">{c.mem_cont2}</td>
            </tr>
            </tbody>
        </table>
    )

    return(
        <Fragment>
           <div className="row" style={{"margin":"0px auto","width":"700px"}}>
               <table className="table">
                   <tbody>
                   <tr>
                       <td>
                           {html}
                       </td>
                   </tr>
                   </tbody>
               </table>
           </div>
        </Fragment>
    );
}