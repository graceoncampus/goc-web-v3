import { useEffect, useState } from "react";
import { listSermons } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import {
  PaginationRoot,
  PaginationNextTrigger,
  PaginationItems,
  PaginationPrevTrigger,
} from "@/components/ui/pagination";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
const client = generateClient();

export const SermonsPage = () => {
  const [sermons, setSermons] = useState<SermonItemProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSermons = async () => {
      await (client.graphql({ query: listSermons }) as Promise<any>)
        .then((result) => {
          const sermonData = result.data.listSermons.items.sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          setSermons(
            sermonData.map((sermon: any) => {
              const convertedDate = new Date(sermon.date).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                },
              );
              const item = {
                title: sermon.title,
                speaker: sermon.speaker,
                passage: sermon.passage,
                date: convertedDate,
                URI: sermon.URI,
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
      imageSrc="/images/sermons.jpg"
      alt="Sermons page banner"
    >
      <SermonsBody
        sermons={filteredSermons}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </BannerTemplate>
  );
};

export interface SermonItemProps {
  title: string;
  speaker: string;
  passage: string;
  date: string;
  URI: string;
}

const SermonItem = (props: SermonItemProps) => {
  return (
    <Box
      rounded={"lg"}
      borderWidth={"2px"}
      borderColor={"goc.darkgray"}
      marginY={"1rem"}
      padding={"2rem"}
      width={"100%"}
    >
      <Heading>{props.title}</Heading>
      <Text marginTop={".625rem"} marginBottom={"1.2rem"}>
        {props.speaker} | {props.passage} | {props.date}
      </Text>
      <audio style={{ width: "100%" }} src={props.URI} controls={true} />
    </Box>
  );
};

interface SermonBodyProps {
  sermons: SermonItemProps[];
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const isPaginationVisible = useBreakpointValue({
    base: false,
    md: true,
  });

  const pagination = (
    <PaginationRoot
      count={totalPages}
      page={currentPage}
      onPageChange={(e: any) => setCurrentPage(e.page)}
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
      <Box width={"100%"} maxWidth={"60rem"}>
        <Flex
          justifyContent={{ base: "center", md: "space-between" }}
          marginBottom={".5rem"}
        >
          <InputGroup flex="1" startElement={<LuSearch />}>
            <Input
              value={searchQuery}
              onChange={handleSearch}
              width={{ base: "100%", md: "25rem" }}
              placeholder="search by title, speaker, or passage"
              rounded={"2xl"}
              borderColor={"black"}
            />
          </InputGroup>
          {isPaginationVisible && pagination}
        </Flex>
        <VStack gap={"0"}>
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
        </VStack>
        <Flex justifyContent="flex-end">{pagination}</Flex>
      </Box>
    </Center>
  );
};
