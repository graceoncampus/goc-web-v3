
// import React, { useState } from 'react';
import { SmallGroupBlurb } from './SmallGroupBlurb';
// make page for prayer request confirmation. 
import { HeaderNavbarActiveKey } from 'Components/User/Header/Header'

import { Template } from 'Components/User/Template/Template';
 interface TemplateProps {
     activeKey: HeaderNavbarActiveKey,
     body: React.ReactNode
 };
 

 export const SmallGroup = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.SMALL_GROUPS} body={<SmallGroupBody />}/>
    );
}

const SmallGroupBody = () => {

    return (
        <SmallGroupBlurb />
    )
}