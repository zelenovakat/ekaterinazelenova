import DifaultLayout from "@/layout/DefaultLayout"
import {
  Flex,
  Heading,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react"
import ReactMarkdown from "react-markdown"
import client from "../utils/apollo-client"
import NextImage from "next/image"
import { gql } from "@apollo/client"
import { NextSeo } from "next-seo"
import { linkedInColor } from "@/utils/colors"

export type AboutPageItem = {
  someText: string
  title: string
  content: string
  content2: string
  content3: string
  content4: string
  faqTitle: string
  photoCollection: {
    items: {
      sys: {
        id: string
      }
      url: string
    }[]
    sys: {
      id: string
    }
  }
  faqCollection: {
    items: {
      answer: string
      question: string
      sys: {
        id: string
      }
    }[]
  }
}

const ABOUT_PAGE_QUERY = gql`
  query AboutPageQuery {
    aboutCollection {
      items {
        content
        content2
        content3
        content4
        photoCollection(limit: 3) {
          items {
            url
            sys {
              id
            }
          }
        }
        someText
        title
        faqTitle
        faqCollection(limit: 5) {
          items {
            answer
            question
            sys {
              id
            }
          }
        }
      }
    }
  }
`

type AboutPageProps = {
  aboutPage: AboutPageItem[]
}

const apolloClient = client()

const AboutPage = (props: AboutPageProps) => {
  const { aboutPage } = props
  const photoCollection = aboutPage[0].photoCollection
  const faqCollection = aboutPage[0].faqCollection

  return (
    <DifaultLayout>
      <NextSeo
        title={`Ekaterina Zelenova | About Me`}
        description={`A brief run through of my history.`}
      />
      <Flex flexDirection="column" width={["100%", "80%"]}>
        <Heading as="h1" size="lg">
          {aboutPage[0].title}
        </Heading>
        {photoCollection.items.map((photo) => (
          <Flex key={photo?.sys?.id} marginTop="8" width={190} height={250} position="relative">
            <NextImage
              fill
              style={{ objectPosition: "center center" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={photo.url}
              alt={`Photo ${photo?.sys?.id + 1}`}
              priority={false}
            />
          </Flex>
        ))}

        <Flex direction="column">
          <Flex direction="column" marginTop="8">
            <ReactMarkdown>{aboutPage[0].content}</ReactMarkdown>
          </Flex>
          <Flex direction="column" marginTop="8">
            <ReactMarkdown>{aboutPage[0].content2}</ReactMarkdown>
          </Flex>
          <Flex direction="column" marginTop="8">
            <ReactMarkdown>{aboutPage[0].content3}</ReactMarkdown>
          </Flex>
          <Flex direction="column" marginTop="8">
            <ReactMarkdown>{aboutPage[0].content4}</ReactMarkdown>
          </Flex>
        </Flex>
        <Flex direction="column" marginTop="8">
          <Text>{aboutPage[0].someText}</Text>
        </Flex>

        <Heading as="h2" marginTop="8" size="lg">
          {aboutPage[0].faqTitle}
        </Heading>
        <Accordion allowToggle width="100%" marginTop="8">
          {faqCollection?.items.map((faq) => (
            <AccordionItem
              key={faq?.sys?.id}
              marginTop="2"
              border="1px solid"
              borderRadius="5"
              borderColor={linkedInColor}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    width={["100%", "80%"]}
                    fontWeight="bold">
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </DifaultLayout>
  )
}

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: ABOUT_PAGE_QUERY,
  })

  return {
    props: {
      aboutPage: data?.aboutCollection?.items || [],
    },
  }
}

export default AboutPage
