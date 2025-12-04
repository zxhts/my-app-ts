// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// 配置测试环境
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 模拟常用的浏览器API
window.scrollTo = jest.fn();

// 配置Fetch API模拟
if (!globalThis.fetch) {
  globalThis.fetch = jest.fn();
}

// 配置console.error警告捕获
const originalError = console.error;
console.error = (...args) => {
  // 过滤掉一些不相关的警告
  const ignoreWarnings = [
    'Warning: An update to',
    'Warning: Failed prop type',
  ];
  
  const shouldIgnore = ignoreWarnings.some(warning => 
    args.some(arg => typeof arg === 'string' && arg.includes(warning))
  );
  
  if (!shouldIgnore) {
    originalError(...args);
  }
};

// 配置Jest扩展匹配器
expect.extend({
  // 自定义匹配器示例
  toHaveClassContaining(received, expected) {
    const className = received.getAttribute('class');
    const pass = className && className.includes(expected);
    
    return {
      pass,
      message: () => 
        pass 
          ? `Expected element not to have class containing "${expected}"`
          : `Expected element to have class containing "${expected}" but received "${className}"`
    };
  },
});

// 为测试提供常用的工具函数
global.testUtils = {
  // 等待组件更新
  waitForUpdate: () => new Promise(resolve => setTimeout(resolve, 0)),
  
  // 创建模拟事件
  createEvent: (type, options = {}) => ({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: { value: '', ...options },
    ...options,
  }),
};

// 清理所有mock的afterEach钩子
afterEach(() => {
  jest.clearAllMocks();
});
