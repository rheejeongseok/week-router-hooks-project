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
            console.log(rs.data)
        })
    },[])



    return(
        <Fragment>
            <h1>레시피 상세</h1>
            {/*<div>{props.match.params.no}</div>*/}
            <div>{match.params.no}</div>
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
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}