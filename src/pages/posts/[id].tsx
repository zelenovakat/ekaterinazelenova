import DifaultLayout from "@/layout/DefaultLayout"
import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"
import type { GetServerSidePropsContext } from "next"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Heading, Box } from "@chakra-ui/react"
import { useRef } from "react"
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

  const highlighterRef = useRef<SyntaxHighlighter>(null)

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
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <SyntaxHighlighter {...props} style={tomorrow} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            },
          }}>
          {content}
        </ReactMarkdown>
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
