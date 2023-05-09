/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from 'react';
import { Image, ListGroup } from "react-bootstrap";

import './Sermons.scss'
    
import { Template } from 'Components/User/Template/Template';
import { HeaderNavbarActiveKey } from '../Header/Header';

const sermons = [
    {
        title: 'Sermon Title',
        speaker: 'Speaker Name',
        passage_reference: 'Passage Reference',
        date: new Date()
    },
    {
        title: 'Sermon Title 1',
        speaker: 'Speaker Name',
        passage_reference: 'Passage Reference',
        date: new Date()
    },
    {
        title: 'Sermon Title 2',
        speaker: 'Speaker Name',
        passage_reference: 'Passage Reference',
        date: new Date()
    },
    {
        title: 'Sermon Title 3',
        speaker: 'Speaker Name',
        passage_reference: 'Passage Reference',
        date: new Date()
    },
]

export interface SermonItemProps { 
    title: string,
    speaker: string,
    passage_reference: string
    date: Date
}

export const Sermons = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.SERMONS} body={<SermonsBody />} />
    );
}

const SermonItem = (prop: SermonItemProps) => {
    return (
        <ListGroup.Item className='sermon-item mt-5 border'>
            <h1>
                {prop.title}
            </h1>
            {prop.date.toDateString()}
        </ListGroup.Item>
    );
}

const SermonsBody = () => {
    return (
        <div className='text-center'>
            <h1 className="sermons"> <strong> Sermons </strong> </h1>
            <ListGroup className='sermons-container'>
                {sermons && sermons.map((sermon) => 
                    <SermonItem 
                        title={sermon.title} 
                        speaker={sermon.speaker} 
                        passage_reference={sermon.passage_reference} 
                        date={sermon.date} />
                )}
            </ListGroup>
        </div>
    );
}