import DifaultLayout from "@/layout/DefaultLayout"
import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"
import type { GetServerSidePropsContext } from "next"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Heading, Box } from "@chakra-ui/react"
import { useRef } from "react"

const GET_POST_BY_ID_QUERY = gql`
  query GetPostById($id: String!) {
    blogPost(id: $id) {
      title
      content
      mainImage {
        url
      }
    }
  }
`
const apolloClient = client()

type BlogPost = {
  title: string
  content: string
  mainImage: {
    url: string
  }
}

type PostProps = {
  blogPost: BlogPost
}

function PostPage(props: PostProps) {
  const {
    blogPost: { content, title },
  } = props

  const highlighterRef = useRef<SyntaxHighlighter>(null)

  return (
    <DifaultLayout>
      <Heading as="h1">{title}</Heading>
      <Box marginTop="8">
        <Markdown
          children={content}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props
              const match = /language-(\w+)/.exec(className || "")
              return match ? (
                <SyntaxHighlighter
                  ref={highlighterRef}
                  PreTag="div"
                  language={match[1]}
                  style={tomorrow}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        />
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
