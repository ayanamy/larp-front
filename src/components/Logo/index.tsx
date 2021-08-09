import React, { FC, useState, useEffect } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2733389_fdfq7bijp2r.js',
});

export default (props: any) => {
  return <IconFont {...props} type="icon-maoxian" />;
};
