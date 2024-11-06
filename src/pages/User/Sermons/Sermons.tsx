import React, { useEffect, useState } from "react";
import { Image, ListGroup, Pagination } from "react-bootstrap";
import { listSermons } from "graphql/queries";
import { generateClient } from "aws-amplify/api";

import { Template } from "pages/User/Template/Template";
import { HeaderNavbarActiveKey } from "../Header/Header";
const client = generateClient();

export interface SermonItem {
  title: string;
  speaker: string;
  passage: string;
  date: string;
  URI: string;
}

export const Sermons = () => {
  const [sermons, setSermons] = useState<SermonItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSermons = async () => {
      await (client.graphql({ query: listSermons }) as Promise<any>)
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

  const filteredSermons = sermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.passage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Template
      activeKey={HeaderNavbarActiveKey.SERMONS}
      body={
        <SermonsBody
          sermons={filteredSermons}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      }
    />
  );
};

interface SermonBodyProps {
  sermons: SermonItem[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SermonsBody = (props: SermonBodyProps) => {
  const { sermons, searchQuery, setSearchQuery } = props;
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const sermonsToDisplay = sermons.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.ceil(sermons.length / PAGE_SIZE);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const pagination = (
    <Pagination className="sermons-pagination justify-content-end">
      <Pagination.Prev
        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
      />
      {pageNumbers.map((number) => {
        if (
          number === 1 ||
          number === totalPages ||
          (number >= currentPage - 1 && number <= currentPage + 1)
        ) {
          return (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => setCurrentPage(number)}
              className="sermons-pagination-item"
            >
              {number}
            </Pagination.Item>
          );
        } else if (number === currentPage - 2 || number === currentPage + 2) {
          return <Pagination.Ellipsis key={number} />;
        }
        return null;
      })}
      <Pagination.Next
        onClick={() =>
          setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
        }
      />
    </Pagination>
  );

  return (
    <div className="text-center">
      <h1 className="sermons">
        {" "}
        <strong> Sermons </strong>{" "}
      </h1>
      <div className="sermons-body-container">
        <div className="d-flex justify-content-between align-items-centerd">
          <div className="sermons-search-container">
            <input
              className="sermons-search"
              placeholder="search by title, speaker, or passage"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {pagination}
        </div>
        <ListGroup className="sermons-container">
          {sermonsToDisplay.map((sermon) => (
            <SermonItem
              key={sermon.title}
              title={sermon.title}
              speaker={sermon.speaker}
              passage={sermon.passage}
              URI={sermon.URI}
              date={sermon.date}
            />
          ))}
        </ListGroup>
        <div className="sermons-pagination-container">{pagination}</div>
      </div>
    </div>
  );
};

const SermonItem = (props: SermonItem) => {
  return (
    <ListGroup.Item className="sermon-item mt-2 border rounded">
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
