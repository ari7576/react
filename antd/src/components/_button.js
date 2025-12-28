import React from 'react';

import { Button, Flex } from 'antd';
import {useNavigate} from "react-router-dom";
import _buttonPage from './_buttonPage'




const _button = (props) => {


    let navigate = useNavigate();

    const goToAbout = () => {
        navigate("/_buttonPage");
    };





    return (

        <div>
            <Flex gap="small" wrap>
                <>
                    <Button type="primary"
                            onClick={goToAbout}>
                        일반 버튼
                    </Button>
                </>
            </Flex>
        </div>
    );
}

export default _button