import React from 'react';
import GridLayout from 'react-grid-layout';
import './index.css';
import { TabsComponent } from './Tabs';
import {Scrollbars} from 'react-custom-scrollbars';

export default class MyFirstGrid extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // 在构造函数中定义布局，避免私有属性的绑定问题
    this.state = {
      layout: [
        { i: 'a', x: 0, y: 0, w: 6, h: 8 },
        // { i: "b", x: 6, y: 0, w: 6, h: 4 }, // 将b移到右侧，展示不同宽度
        //{ i: "c", x: 0, y: 8, w: 6, h: 4 }  // 将c居中，展示不同宽度
        { i: 'b', x: 6, y: 0, w: 6, h: 4 },
        { i: 'c', x: 0, y: 8, w: 6, h: 4 },
      ],
    };
  }

  onLayoutChange = (layout: any) => {
    console.log('layout', layout);
    this.setState({ layout });
  };

  changeFirstItem = (key: string) => {
    if(key === '2') {
      const result = this.state.layout.map((item: any) => {
        if(item.i === 'a') {
          return {
            ...item,
            h: 6,
          }
        }
        return item;
      })
      console.log('newLayout1>>', result);
      this.setState({
        layout: result,
      });
      // this.setState({
      //   layout: [
      //     { i: 'a', x: 0, y: 0, w: 6, h: 6 },
      //     { i: 'b', x: 6, y: 0, w: 6, h: 4 },
      //     { i: 'c', x: 0, y: 8, w: 6, h: 4 },
      //   ],
      // });
    }else{
      const result = this.state.layout.map((item: any) => {
        if(item.i === 'a') {
          return {
            ...item,
            h: 8,
          }
        }
        return item;
      })
      console.log('newLayout', result);
      this.setState({
        layout: result,
      });
      // this.setState({
      //   layout: [
      //     { i: 'a', x: 0, y: 0, w: 6, h: 8 },
      //     { i: 'b', x: 6, y: 0, w: 6, h: 4 },
      //     { i: 'c', x: 0, y: 8, w: 6, h: 4 },
      //   ],
      // });
    }
  };

  render() {
    // 移除额外的wrapper层，避免宽度计算问题
    return (
      <Scrollbars style={{ height: '500px', width: '600px' }}>
      <div className="wrapper">
        <GridLayout
          className="layout"
          layout={this.state.layout}
          cols={12}
          rowHeight={60}
          margin={[10, 10]}
          width={1200}
          onLayoutChange={this.onLayoutChange}
          // 关键配置：排除交互元素（选择器可根据实际情况调整）
          draggableCancel=".tab-content, button, input, select, .ant-tabs-tab" // 页签、按钮、输入框等
          style={{
            backgroundColor: 'salmon',
            width: '1200px',
            margin: '0 auto',
          }}
        >
          <div key="a" className="react-grid-item">
            <TabsComponent changeFirstItem={(key: string) => this.changeFirstItem(key)} />
          </div>
          <div key="b" className="react-grid-item">
            b
          </div>
          <div key="c" className="react-grid-item">
            c
          </div>
        </GridLayout>
      </div>
      </Scrollbars>
    );
  }
}
