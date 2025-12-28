import React, { useState } from 'react';
import {
    BarChartOutlined,
    DotChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Flex, Radio } from 'antd';


const _radio = (props) => {

    const [value, setValue] = useState(5);
    const onChange = e => {
        setValue(e.target.value);
    }
    return (
        <>
            <h3>버튼 페이지 입니다</h3>
            <Radio>Radio</Radio>

            <Radio.Group
                onChange={onChange}
                value={value}
                options={[
                    {
                        value: 1,
                        className: 'option-1',
                        label: (
                            <Flex gap="small" justify="center" align="center" vertical>
                                <LineChartOutlined style={{ fontSize: 18 }} />
                                LineChart
                            </Flex>
                        ),
                    },
                    {
                        value: 2,
                        className: 'option-2',
                        label: (
                            <Flex gap="small" justify="center" align="center" vertical>
                                <DotChartOutlined style={{ fontSize: 18 }} />
                                DotChart
                            </Flex>
                        ),
                    },
                    {
                        value: 3,
                        className: 'option-3',
                        label: (
                            <Flex gap="small" justify="center" align="center" vertical>
                                <BarChartOutlined style={{ fontSize: 18 }} />
                                BarChart
                            </Flex>
                        ),
                    },
                    {
                        value: 4,
                        className: 'option-4',
                        label: (
                            <Flex gap="small" justify="center" align="center" vertical>
                                <PieChartOutlined style={{ fontSize: 18 }} />
                                PieChart
                            </Flex>
                        ),
                    },
                ]}
            />

        </>
    );
}

export default _radio