import DifaultLayout from "@/layout/DefaultLayout"
import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"
import type { GetServerSidePropsContext } from "next"
import ReactMarkdown from "react-markdown"
import { Heading, Box } from "@chakra-ui/react"
import { NextSeo } from "next-seo"

type BlogPost = {
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

type PostProps = {
  blogPost: BlogPost
}

const GET_POST_BY_ID_QUERY = gql`
  query GetPostById($id: String!) {
    blogPost(id: $id) {
      title
      summary
      content
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

function PostPage(props: PostProps) {
  const {
    blogPost: { content, mainImage, summary, sys, title },
  } = props

  return (
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
          url: `https://www.ekaterinazelenova.com/posts/${sys?.id}`,
        }}
      />
      <Heading as="h1">{title}</Heading>
      <Box marginTop="8" whiteSpace="pre-wrap">
        <ReactMarkdown>{content}</ReactMarkdown>
      </Box>
    </DifaultLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { id },
  } = context
  const { data } = await apolloClient.query({
    query: GET_POST_BY_ID_QUERY,
    variables: {
      id,
    },
  })

  // Return the data as props
  return {
    props: {
      blogPost: data.blogPost || {},
    },
  }
}

export default PostPage
