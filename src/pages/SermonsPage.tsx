import React, { useEffect, useState } from "react";
import { ListGroup, Pagination } from "react-bootstrap";
import { listSermons } from "graphql/queries";
import { generateClient } from "aws-amplify/api";
import { NavbarActiveKey } from "components/Navbar";
import { BannerTemplate } from "layouts/BannerTemplate";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  PaginationRoot,
  PaginationNextTrigger,
  PaginationItems,
  PaginationPrevTrigger,
} from "components/ui/pagination";
import { InputGroup } from "components/ui/input-group";
import { LuSearch } from "react-icons/lu";
const client = generateClient();

export interface SermonItem {
  title: string;
  speaker: string;
  passage: string;
  date: string;
  URI: string;
}

export const SermonsPage = () => {
  const [sermons, setSermons] = useState<SermonItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSermons = async () => {
      await (client.graphql({ query: listSermons }) as Promise<any>)
        .then((result) => {
          const sermonData = result.data.listSermons.items.sort(
            (a: any, b: any) =>
              new Date(b["date"]).getTime() - new Date(a["date"]).getTime(),
          );
          setSermons(
            sermonData.map((sermon: any) => {
              const convertedDate = new Date(sermon["date"]).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                },
              );
              const item = {
                title: sermon["title"],
                speaker: sermon["speaker"],
                passage: sermon["passage"],
                date: convertedDate,
                URI: sermon["URI"],
              };
              return item;
            }),
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
      sermon.passage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <BannerTemplate
      title="Sermons"
      activeKey={NavbarActiveKey.SERMONS}
      imageSrc="/images/landing3.jpg"
      alt="Sermons page banner"
      overlay
    >
      <SermonsBody
        sermons={filteredSermons}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </BannerTemplate>
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
    currentPage * PAGE_SIZE,
  );
  const totalPages = Math.ceil(sermons.length / PAGE_SIZE);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const pagination = (
    <PaginationRoot
      count={totalPages}
      page={currentPage}
      onPageChange={(e) => setCurrentPage(e.page)}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );

  return (
    <Center>
      <Box width={"100%"}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <InputGroup flex="1" startElement={<LuSearch />}>
              <Input
                value={searchQuery}
                onChange={handleSearch}
                width={"500px"}
                placeholder="search by title, speaker, or passage"
                rounded={"lg"}
                borderColor={"lightgray"}
              />
            </InputGroup>
          </Box>
          {pagination}
        </Flex>
        <ListGroup>
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
        <Flex justifyContent="flex-end">{pagination}</Flex>
      </Box>
    </Center>
  );
};

const SermonItem = (props: SermonItem) => {
  return (
    <Box
      rounded={"lg"}
      borderWidth={"2px"}
      borderColor={"goc.darkgray"}
      marginY={"10px"}
      padding={"30px"}
      width={"100%"}
    >
      <Heading>{props.title}</Heading>
      <Text marginTop={"10px"} marginBottom={"20px"}>
        {props.speaker} | {props.passage} | {props.date}
      </Text>
      <audio style={{ width: "100%" }} src={props.URI} controls />
    </Box>
  );
};
