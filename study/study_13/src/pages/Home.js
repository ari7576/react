import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h1>홈</h1>
            <p>홈, 그페이지는 가정 먼저 보여지는 페이지</p>
            <ul>
            <li>
                <Link to ="about">소개</Link>
            </li>
            <li>
                <Link to ="/profile/velopert">velopter 프로필</Link>
            </li>
            <li>
                <Link to ="/profile/gildong">gildong 프로필</Link>
            </li>

        </ul>
        </div>
    )
}

export default Home;