import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    // true 监听所有的组件
    // ProjectListScreen.whyDidYouRender = true 在要监听的组件下设置为true
    trackAllPureComponents: false,
  });
}