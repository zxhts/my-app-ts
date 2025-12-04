import React, { useState, useCallback } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import 'antd/dist/reset.css';

// 使用非常简单的实现，避免任何可能的干扰
export const TabsComponent: React.FC<{
  changeFirstItem: (key: string) => void;
}> = (props) => {
  // 使用状态存储当前激活的标签页
  const [currentTab, setCurrentTab] = useState('1');

  // 定义标签页项目 - 非常简单的结构
  const items: TabsProps['items'] = [
    { key: '1', label: '标签页 1', children: '标签页 1 的内容' },
    { key: '2', label: '标签页 2', children: '标签页 2 的内容' },
    { key: '3', label: '标签页 3', children: '标签页 3 的内容' },
  ];

  // 使用useCallback确保函数引用稳定
  const handleTabChange = (key: string) => {
    console.log('onChange事件触发了！新的key:', key);
    // 直接更新状态
    setCurrentTab(key);

    props.changeFirstItem(key);
  }; // 空依赖数组

  // 直接返回Tabs组件，只使用必要的属性
  return (
    <Tabs activeKey={currentTab} onChange={handleTabChange} items={items} />
  );
};
