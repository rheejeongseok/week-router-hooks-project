import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';

export default function RecipeDetail(props){

    const {match} = props;
    const [detail, setDetail] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3355/recipe_detail",{
            params:{
                no:match.params.no
            }
        }).then((rs) => {
            setDetail(rs.data);
        })
    },[])


    const food = String(detail.foodmake)
    const ff = food.split('\^')
    /*
       split - 정규식 ^(시작문자), $(끝나는문자)
       정규식에 사용하는 문자를 사용할때 \^, \$
    * */
    const data = ff.map((m,idx) =>
        ff.length-1==idx? "" : <li>{m}</li>
    )


    return(
        <Fragment>
            <h1>레시피 상세</h1>
            {/*<div>{props.match.params.no}</div>*/}
            {/*<div>{match.params.no}</div>*/}
            <div className="row">
                <table className="table" style={{"margin":"0 auto","width":"900px"}}>
                    <tbody>
                        <tr>
                            <td colSpan="3">
                                <img src={detail.poster} alt="" style={{"width":"700px","height":"350px"}}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <h3>{detail.title}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                {detail.content}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center"><img src={"/inwon.png"} alt=""/></td>
                            <td className="text-center"><img src={"/time.png"} alt=""/></td>
                            <td className="text-center"><img src={"/who.png"} alt=""/></td>
                        </tr>
                        <tr>
                            <td className="text-center">{detail.info1}</td>
                            <td className="text-center">{detail.info2}</td>
                            <td className="text-center">{detail.info3}</td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <h3>요리방법</h3>
                                <ul>
                                    {data}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td rowSpan="2" width="30%">
                                                <img src={detail.chef_poster} className="img-circle" width="70" height="70" alt=""/>
                                            </td>
                                            <td>{detail.chef}</td>
                                        </tr>
                                        <tr>
                                            <td>{detail.chef_profile}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}