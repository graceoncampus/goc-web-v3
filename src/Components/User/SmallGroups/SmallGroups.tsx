import React from 'react';
import { Template } from '../Template/Template';
import { HeaderNavbarActiveKey } from '../Header/Header';

export const SmallGroups = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.SMALL_GROUPS}
      body={<SmallGroupsBody />}
    />
  );
};

const SmallGroupsBody = () =>{
  return <div>
    Join a Small Group!
  </div>

}