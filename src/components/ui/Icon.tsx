import React, { FC, useMemo } from 'react';

import * as icons from '@/components/icons';
import { IIconProps } from '@/types';

export type IconListType = {
  [key: string]: React.FC<IIconProps>;
};

export const iconList = (): IconListType => {
  const obj: IconListType = {};
  Object.entries(icons).forEach(([key, value]) => {
    const index = key
      .replace(/Icon$/g, '')
      .match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g)
      ?.join('-')
      .toLocaleLowerCase();

    if (index !== undefined) {
      obj[index] = value;
    }
  });
  return obj;
};

export const Icon: FC<IIconProps> = (props) => {
  const { name, color = 'currentColor', size = '1em', ...rest } = props;

  const list = useMemo(() => {
    return iconList();
  }, [iconList]);

  const component = useMemo(() => {
    return list[name!];
  }, [name]);

  return component ? (
    <div className='icon'>
      {React.createElement(component, { color, size, ...rest })}
    </div>
  ) : (
    <></>
  );
};
