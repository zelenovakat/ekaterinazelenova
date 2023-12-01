// import styles from "@/page.module.css"
import Head from "next/head"
import { Flex, Heading, Text, Grid } from "@chakra-ui/react"
import DifaultLayout from "@/layout/DefaultLayout"
import client from "../utils/apollo-client"
import { gql } from "@apollo/client"
import BlogPostTile from "@/components/BlogPostTile"
import { mainText } from "@/components/string"

export type BlogPost = {
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

const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    blogPostCollection(limit: 16) {
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
  blogPosts: BlogPost[]
}
export default function Home(props: HomeProps) {
  const { blogPosts } = props

  return (
    <>
      <Head>
        <title>Ekaterina Zelenova - Frontend developer</title>
        <meta
          name="description"
          content="frontend developer with a passion for building great applications and websites"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1 " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DifaultLayout>
        <Flex borderBottom="1px solid" borderColor="gray.100" direction="column" paddingBottom="12">
          <Heading as="h1" letterSpacing="-3" size="4xl">
            Ekaterina Zelenova
          </Heading>
          <Heading marginTop="2" size="lg">
            Frontend developer, Stockholm Sweden
          </Heading>
          <Text marginTop="8" width={["100%", "70%"]}>
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
          {blogPosts.map((blogPost) => {
            return <BlogPostTile key={blogPost.sys?.id} blogPost={blogPost} />
          })}
        </Grid>
      </DifaultLayout>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_BLOG_POSTS,
  })

  return {
    props: {
      blogPosts: data?.blogPostCollection?.items || [],
    },
  }
}
