import { BannerTemplate } from "@/layouts/BannerTemplate";
import { NavbarActiveKey } from "@/components/Navbar";
import { Box, Heading, Text, VStack, Container } from "@chakra-ui/react";

export const OurBeliefsPage = () => {
  return (
    <BannerTemplate
      title="Our Beliefs"
      activeKey={NavbarActiveKey.BELIEFS}
      imageSrc="/images/beliefs.jpg"
      alt="Our Beliefs page banner"
    >
      <OurBeliefsBody />
    </BannerTemplate>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <Box width="100%" lineHeight="tall">
      <Heading
        as="h2"
        fontSize={{ base: "lg", md: "2xl" }}
        marginBottom={".5rem"}
      >
        {children}
      </Heading>
      <hr />
    </Box>
  );
};

const OurBeliefsBody = () => {
  return (
    <Container maxWidth="800px">
      <VStack gap={"3rem"} fontSize="md" lineHeight="tall" textAlign="left">
        {/* Section 1 */}
        <Box>
          <SectionHeading>The Sinfulness of Man</SectionHeading>
          <Text marginTop={"1rem"}>
            When man was first created, man was in a perfect relationship with
            God. However, man sinned and disobeyed God’s law, ruining and
            distorting the perfect relationship between God and man. The Bible
            says that every man is guilty of sin and has offended God. According
            to God’s absolutely holy and just character, He cannot approve of
            evil and declares that the punishment for sin is death and eternity
            spent in hell. However, in His loving kindness and mercy, He
            provided a way for man to be saved from the punishment of sin!
            (Romans 3:22-23, Romans 3:10-12, Romans 1:18)
          </Text>
        </Box>

        {/* Section 2 */}
        <Box>
          <SectionHeading>God&apos;s Plan of Redemption</SectionHeading>
          <Text marginTop={"1rem"}>
            God’s plan to save man from His wrath was carried out through Jesus
            Christ. God so loved the world that He sent his only Son that
            whoever believes in him shall not perish but have eternal life. In
            the face of persecution, suffering, and crucifixion, Jesus Christ
            never once gave into temptation and sinned. Instead, Jesus lived a
            completely righteous life and offered it up as a perfect sacrifice
            on behalf of all who would have faith in Him. Through Jesus’ death,
            God’s wrath is miraculously satisfied, the punishment is finally
            paid for, and man is fully forgiven of his sin. Three days after His
            crucifixion, Jesus resurrected victoriously from death, securing
            hope for all who would trust in Him. (John 3:16, 1 Corinthians
            15:3-5, Romans 5:1, Romans 5:6, Romans 8:1)
          </Text>
        </Box>

        {/* Section 3 */}
        <Box>
          <SectionHeading>God&apos;s Call for Man to Be Saved</SectionHeading>
          <Text marginTop={"1rem"}>
            Saving faith in Christ is a gracious gift of God where the Holy
            Spirit transforms a person’s heart and opens his/her eyes to the
            gospel. At the same time, God calls every person to wholeheartedly
            repent from their sin, to believe in and commit his/her life to
            Jesus Christ. (Romans 10:10-13, John 3:36, John 14:6, Ephesians
            2:8-9, Romans 1:16)
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};
