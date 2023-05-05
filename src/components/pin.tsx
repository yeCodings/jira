import { Rate } from "antd";
import { check } from "prettier";
import React from "react";

/**
 *  1. 定义组件的 props, 继承Rate组件的属性类型
 *  2. 透传组件的属性
 */


interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}


export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return <Rate
    count={1}
    value={checked ? 1 : 0}
    onChange={num => onCheckedChange?.(!!num)}
    {...restProps}
  />
}