/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useEffect, useState } from "react";
import { Image, ListGroup, Pagination } from "react-bootstrap";
import { listSermons } from "graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import "./Sermons.scss";

import { Template } from "Components/User/Template/Template";
import { HeaderNavbarActiveKey } from "../Header/Header";
export interface SermonItem {
  title: string;
  speaker: string;
  passage: string;
  date: string;
  URI: string;
}

export const Sermons = () => {
  const [sermons, setSermons] = useState<SermonItem[]>([]);

  useEffect(() => {
    const fetchSermons = async () => {
      await (API.graphql(graphqlOperation(listSermons)) as Promise<any>)
        .then((result) => {
          const sermonData = result.data.listSermons.items.sort(
            (a: any, b: any) =>
              new Date(b["date"]).getTime() - new Date(a["date"]).getTime()
          );

          setSermons(
            sermonData.map((sermon: any) => {
              const convertedDate = new Date(sermon["date"]).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              );

              const item = {
                title: sermon["title"],
                speaker: sermon["speaker"],
                passage: sermon["passage"],
                date: convertedDate,
                URI: sermon["URI"],
              };
              return item;
            })
          );
        })
        .catch((reason) => {
          console.log(reason);
        });
    };

    fetchSermons();
  }, []);

  return (
    <Template
      activeKey={HeaderNavbarActiveKey.SERMONS}
      body={<SermonsBody sermons={sermons} />}
    />
  );
};

const SermonItem = (props: SermonItem) => {
  return (
    <ListGroup.Item className="sermon-item mt-5 border rounded">
      <div className="sermon-item-container">
        <div className="sermon-info">
          <h2 className="sermon-title">{props.title}</h2>
          <div>
            {props.speaker} | {props.passage} | {props.date}
          </div>
        </div>
        <audio className="sermon-audio" src={props.URI} controls />
      </div>
    </ListGroup.Item>
  );
};

interface SermonBodyProps {
  sermons: SermonItem[];
}

const SermonsBody = (props: SermonBodyProps) => {
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const sermons = props.sermons.slice(currentPage, currentPage + PAGE_SIZE);
  const totalPages = Math.ceil(props.sermons.length / PAGE_SIZE);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="text-center">
      <h1 className="sermons">
        {" "}
        <strong> Sermons </strong>{" "}
      </h1>
      <div className="sermons-body-container">
        <input placeholder="Search" />
        <ListGroup className="sermons-container">
          {sermons &&
            sermons.map((sermon) => (
              <SermonItem
                title={sermon.title}
                speaker={sermon.speaker}
                passage={sermon.passage}
                URI={sermon.URI}
                date={sermon.date}
              />
            ))}
        </ListGroup>
        <div className="sermons-pagination-container">
          <Pagination className="sermons-pagination">
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
                className="sermons-pagination-item"
              >
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};
