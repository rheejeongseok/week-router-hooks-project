import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";

export default function Recipe(){
    const [recipe, setRecipe] = useState([]);
    const [page,setPage] = useState(1);
    const [total,setTotal] = useState(0);

    useEffect(() => {
        // 서버를 연결해서 데이터를 읽어온 후 - setRecipe에 저장
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((rs) => {
          setRecipe(rs.data);
        })
    }, []);

    useEffect(() => {
       axios.get('http://localhost:3355/recipe_total')
           .then((rs) => {
           setTotal(rs.data.total)

            })
    }, []);

    const onPrev = () => {
        setPage(page>1 ? page-1:page);
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((rs) => {
            setRecipe(rs.data);
        })
    }

    const onNext = () => {
        setPage(page<total ? page+1:page);
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((rs) => {
            setRecipe(rs.data);
        })
    }

    const html = recipe.map((r) =>
        <div className="col-md-4">
            <div className="thumbnail">
                <NavLink to={"/recipe_detail/"+r.no} >
                    <img src={r.poster} alt="Lights" style={{"width":"100%"}} />
                    <div className="caption">
                        <p style={{"fontSize":"18px"}}>{r.title.length>10?r.title.substring(0,10)+"...":r.title}</p>
                        <sub style={{"color":"gray"}}>{r.chef}</sub>
                    </div>
                </NavLink>
            </div>
        </div>
    );

    return(
        <Fragment>
            <h1>레시피</h1>
            <div className="row">{html}</div>
            <div className="row" style={{"textAlign":"center"}}>
                <button className="btn btn-lg btn-primary" onClick={onPrev}>이전</button>
                {page} page / {total} total
                <button className="btn btn-lg btn-danger" onClick={onNext}>다음</button>
            </div>
        </Fragment>
    );
}