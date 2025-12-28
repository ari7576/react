import React from 'react';
import { Anchor, Col, Row ,FloatButton} from 'antd';

const _anchor = () => (
    <Row>
        <Col span={16}>
            <div id="part-1" style={{ height: '200vh', background: 'red' }} />
            <div id="초록" style={{ height: '200vh', background: 'green' }} />
            <div id="part-3" style={{ height: '200vh', background: 'blue' }} />
        </Col>
        <Col span={8}>
            <Anchor
                items={[
                    {
                        key: 'part-1',
                        href: '#part-1',
                        title: '빨강',
                    },
                    {
                        key: '초록',
                        href: '#초록',
                        title: '초록',
                    },
                    {
                        key: 'part-3',
                        href: '#part-3',
                        title: '파랑',
                    },
                ]}
            />
        </Col>
        <FloatButton.BackTop />
    </Row>
);
export default _anchor;