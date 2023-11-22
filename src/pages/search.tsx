// import { Flex } from "@chakra-ui/react"
import DifaultLayout from "@/layout/DefaultLayout"
import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { BlogPost } from "@/pages/index"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { Grid, Heading, Link } from "@chakra-ui/react"
import BlogPostTile from "@/components/BlogPostTile"

const SEARCH_BLOG_POSTS_QUERY = gql`
  query SearchBlogPosts($string: String!) {
    blogPostCollection(where: { OR: { title_contains: $string, content_contains: $string } }) {
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
  blogPosts: BlogPost[]
}

const apolloClient = client()
const SearchPage = (props: SearchPageProps) => {
  const { blogPosts } = props
  const {
    query: { string },
  } = useRouter()

  return (
    <DifaultLayout>
      <Heading as="h1" marginTop="2" size="lg">
        Result for {string}
      </Heading>
      <>
        {!blogPosts.length && (
          <Heading marginTop="4" size="md">
            Sorry, no results found. Please try searching something else.
          </Heading>
        )}
        <Link as={NextLink} href="/" marginTop="4">
          Go Back to Home Page
        </Link>
      </>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} marginTop="8" width="100%">
        {blogPosts.map((blogPost) => {
          return <BlogPostTile key={blogPost?.sys?.id} blogPost={blogPost} />
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
    query: SEARCH_BLOG_POSTS_QUERY,
    variables: {
      string,
    },
  })

  return {
    props: {
      blogPosts: data.blogPostCollection?.items || [],
    },
  }
}

export default SearchPage
