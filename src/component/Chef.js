import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';

export default function Chef(){

    const [chef,setChef] = useState([]);
    const [page,setPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:3355/chef", {
            params: {
                page:page
            }
        }).then((rs) => {
            setChef(rs.data);
        })
    }, [])

    const html = chef.map((c) =>
        <div className="col-md-4">
            <div className="thumbnail">
                <img src={c.poster} alt="Lights" style={{"width":"100%"}} />
                <div className="caption">
                    <p style={{"fontSize":"18px"}}>{c.chef}</p>
                </div>
            </div>
        </div>
    );

    return(
        <Fragment>
            <h1>주방장</h1>
            <div className="row">
                {html}
            </div>
        </Fragment>
    );
}