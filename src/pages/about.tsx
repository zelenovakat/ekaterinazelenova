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
import client from "../utils/apollo-client"
import NextImage from "next/image"
import { gql } from "@apollo/client"

export type AboutPageItem = {
  someText: string
  title: string
  content: string
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
  console.log(props)
  const photoCollection = aboutPage[0].photoCollection
  const faqCollection = aboutPage[0].faqCollection

  return (
    <DifaultLayout>
      <Flex flexDirection="column" width="70%">
        <Heading as="h1" marginTop="2" size="lg">
          {aboutPage[0].title}
        </Heading>
        {photoCollection.items.map((photo) => (
          <Flex key={photo?.sys?.id}>
            <NextImage
              width={200}
              height={150}
              src={photo.url}
              alt={`Photo ${photo?.sys?.id + 1}`}
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Flex>
        ))}

        <Flex direction="column" marginTop="8">
          <Text>{aboutPage[0].content}</Text>
        </Flex>
        <Flex direction="column" marginTop="8">
          <Text>{aboutPage[0].someText}</Text>
        </Flex>
        <Heading marginTop="8"> {aboutPage[0].faqTitle} </Heading>
        <Accordion allowToggle width="100%">
          {faqCollection?.items.map((faq) => (
            <AccordionItem key={faq?.sys?.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
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
