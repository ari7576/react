import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const _dropDown = () => {
    const [open, setOpen] = useState(false);
    const handleMenuClick = e => {
        if (e.key === '3') {
            setOpen(false);
        }
    };
    const handleOpenChange = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setOpen(nextOpen);
        }
    };
    const items = [
        {
            label: '1번.',
            key: '1',
        },
        {
            label: '2번.',
            key: '2',
        },
        {
            label: '메뉴닫기.',
            key: '3',
        },
    ];
    return (
        <Dropdown
            menu={{
                items,
                onClick: handleMenuClick,
            }}
            onOpenChange={handleOpenChange}
            open={open}
        >
            <a onClick={e => e.preventDefault()}>
                <Space>
                    Hover me
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};
export default _dropDown;