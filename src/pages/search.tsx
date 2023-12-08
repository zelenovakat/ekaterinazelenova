// import { Flex } from "@chakra-ui/react"
import DifaultLayout from "@/layout/DefaultLayout"
import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { JobList } from "@/pages/index"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { Grid, Heading, Link } from "@chakra-ui/react"
import JobListTile from "@/components/JobListTile"

const SEARCH_JOB_LISTS_QUERY = gql`
  query SearchJobLists($string: String!) {
    jobListCollection(where: { OR: { title_contains: $string, content_contains: $string } }) {
      items {
        content
        mainImage {
          url
        }
        sys {
          id
        }
        title
        summary
      }
    }
  }
`
type SearchPageProps = {
  jobLists: JobList[]
}

const apolloClient = client()
const SearchPage = (props: SearchPageProps) => {
  const { jobLists } = props
  const {
    query: { string },
  } = useRouter()

  return (
    <DifaultLayout>
      <Heading as="h1" marginTop="2" size="lg">
        Result for {string}
      </Heading>
      <>
        {!jobLists.length && (
          <Heading marginTop="4" size="md">
            Sorry, no results found. Please try searching something else.
          </Heading>
        )}
        <Link as={NextLink} href="/" marginTop="4">
          Go Back to Home Page
        </Link>
      </>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} marginTop="8" width="100%">
        {jobLists.map((jobList) => {
          return <JobListTile key={jobList?.sys?.id} jobList={jobList} />
        })}
      </Grid>
    </DifaultLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { string },
  } = context
  const { data } = await apolloClient.query({
    query: SEARCH_JOB_LISTS_QUERY,
    variables: {
      string,
    },
  })

  return {
    props: {
      jobLists: data.jobListCollection?.items || [],
    },
  }
}

export default SearchPage
