// import styles from "@/page.module.css"
import Head from "next/head"
import { Flex, Heading, Text, Grid } from "@chakra-ui/react"
import DifaultLayout from "@/layout/DefaultLayout"
import client from "../utils/apollo-client"
import { gql } from "@apollo/client"
import JobListTile from "@/components/JobListTile"
import { mainText } from "@/components/string"

export type JobList = {
  content: string
  mainImage: {
    url: string
  }
  summary: string
  title: string
  sys: {
    id: string
  }
}

const GET_JOB_LIST = gql`
  query GetJobList {
    jobListCollection(limit: 16) {
      items {
        content
        title
        mainImage {
          url
        }
        summary
        sys {
          id
        }
      }
    }
  }
`
const apolloClient = client()

type HomeProps = {
  jobLists: JobList[]
}
export default function Home(props: HomeProps) {
  const { jobLists } = props

  return (
    <>
      <Head>
        <title>Ekaterina Zelenova - Frontend developer</title>
        <meta
          name="description"
          content="frontend developer with a passion for building great applications and websites"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1 " />
        <link rel="icon" href="/logo.png" type="image/png" />
      </Head>
      <DifaultLayout>
        <Flex borderBottom="1px solid" borderColor="gray.100" direction="column" paddingBottom="12">
          <Heading as="h1" letterSpacing="-3" size="4xl">
            Ekaterina Zelenova
          </Heading>
          <Heading marginTop="2" size="lg">
            Frontend developer, Stockholm Sweden
          </Heading>
          <Text marginTop="8" width={["100%", "80%"]}>
            {mainText}{" "}
            <a target="_blank" href="https://clvlab.com/">
              CLV LAB
            </a>{" "}
            as a Frontend developer and{" "}
            <a target="_blank" href="https://www.umain.com/">
              UMAIN
            </a>{" "}
            as a Web Developer.
          </Text>
        </Flex>
        <Grid
          gridTemplateColumns="repeat(auto-fill, minmax(296px, 1fr))"
          gap={6}
          marginTop="8"
          width="100%">
          {jobLists?.map((jobList, index) => {
            return <JobListTile key={jobList?.sys?.id || index} jobList={jobList} />
          })}
        </Grid>
      </DifaultLayout>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_JOB_LIST,
  })

  return {
    props: {
      jobLists: data?.jobListCollection?.items || [],
    },
  }
}
