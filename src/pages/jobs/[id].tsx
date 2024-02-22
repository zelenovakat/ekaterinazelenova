import DifaultLayout from "@/layout/DefaultLayout"
import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"
import type { GetServerSidePropsContext } from "next"
import { Heading, Box, Flex } from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import Markdown from "@/components/Markdown"

type JobList = {
  title: string
  content: string
  summary: string
  sys: {
    id: string
  }
  mainImage: {
    url: string
  }
}

type JobProps = {
  jobList: JobList
}

const GET_JOB_BY_ID_QUERY = gql`
  query GetJobById($id: String!) {
    jobList(id: $id) {
      title
      summary
      content
      content2
      content3
      sys {
        id
      }
      mainImage {
        url
      }
    }
  }
`
const apolloClient = client()

function JobPage(props: JobProps) {
  const {
    jobList: { content, mainImage, summary, sys, title },
  } = props

  return (
    <Flex width={{ base: "100%", xl: "80%" }}>
      <DifaultLayout>
        <NextSeo
          title={`Ekaterina Zelenova | ${title}`}
          description={summary}
          openGraph={{
            description: summary,
            images: [
              {
                url: mainImage?.url,
                alt: `Main Image for ${title}`,
              },
            ],
            title: title,
            type: "website",
            url: `https://www.ekaterinazelenova.com/jobs/${sys?.id}`,
          }}
        />
        <Heading as="h1">{title}</Heading>
        <Box marginTop="8" whiteSpace="pre-wrap">
          <Markdown>{content}</Markdown>
        </Box>
      </DifaultLayout>
    </Flex>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { id },
  } = context
  const { data } = await apolloClient.query({
    query: GET_JOB_BY_ID_QUERY,
    variables: {
      id,
    },
  })

  // Return the data as props
  return {
    props: {
      jobList: data.jobList || {},
    },
  }
}

export default JobPage
