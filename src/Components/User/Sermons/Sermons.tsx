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
        date: 'date'
    },
    {
        title: 'Sermon Title',
        speaker: 'Speaker Name',
        passage_reference: 'Passage Reference',
        date: 'date'
    },
    {
        title: 'Sermon Title',
        speaker: 'Speaker Name',
        passage_reference: 'Passage Reference',
        date: 'date'
    },
    {
        title: 'Sermon Title',
        speaker: 'Speaker Name',
        passage_reference: 'Passage Reference',
        date: 'date'
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
        <ListGroup.Item>
            test
        </ListGroup.Item>
    );
}

const SermonsBody = () => {
    return (
        <div className='text-center'>
            <h1 className="sermons"> <strong> Sermons </strong> </h1>
            <ListGroup className='sermons-container'>
                <ListGroup.Item>item 1</ListGroup.Item>
                <ListGroup.Item>item 2</ListGroup.Item>
                <ListGroup.Item>item 3</ListGroup.Item>
                <ListGroup.Item>item 4</ListGroup.Item>
                <ListGroup.Item>item 5</ListGroup.Item>
            </ListGroup>
        </div>
    );
}