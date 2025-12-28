import React, { useState } from 'react';
import { Alert, Switch, Tooltip } from 'antd';
const App = () => {
    const [visible, setVisible] = useState(true);
    const handleClose = () => {
        setVisible(false);
    };
    return (
        <>
            {visible && (
                <Alert message="Error"
                       description="이 경고를 닫지 않으면 버튼을 누를 수 없습니다."
                       type="error"
                       showIcon
                       closable afterClose={handleClose} />
            )}
            <p>에러창을 닫으세요 </p>
            <Tooltip title="에러가 난 상태에선 스위치를 누를 수 없습니다.">
                <Switch onChange={setVisible} checked={visible} disabled={visible}  />
            </Tooltip>

            <p> 버튼을 누르면 에러가 뜹니다 </p>

        </>
    );
};
export default App;