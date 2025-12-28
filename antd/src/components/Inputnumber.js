import React, { useState } from "react";
import { InputNumber } from 'antd';




const Inputnumber = (props) => {

    // todo : useState로 바꿔서 해보기
    const [num, setNum] = useState(5);

    const onChange = value => {
        console.log('changed', value);
        setNum(value)
    };

    return (
        <>

            <InputNumber min={1} max={10} defaultValue={5} onChange={onChange} />
            <h3>{num}값</h3>
        </>
    );
}

export default Inputnumber