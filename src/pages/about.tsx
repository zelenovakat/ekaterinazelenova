import DifaultLayout from "@/layout/DefaultLayout"
// import client from "@/utils/apollo-client"
// import { gql } from "@apollo/client"
import NextLink from "next/link"
import { Flex, Grid, Heading, Link, Text } from "@chakra-ui/react"

// const SEARCH_BLOG_POSTS_QUERY = gql`
//   query SearchBlogPosts($string: String!) {
//     blogPostCollection(where: { OR: { title_contains: $string, content_contains: $string } }) {
//       items {
//         content
//         mainImage {
//           url
//         }
//         sys {
//           id
//         }
//         title
//         summary
//       }
//     }
//   }
// `
type AboutPageProps = {
  children: React.ReactNode
}

// const apolloClient = client()
const AboutPage = (props: AboutPageProps) => {
  return (
    <DifaultLayout>
      <Heading as="h1" marginTop="2" size="lg">
        About me
      </Heading>
      <Flex direction="column" marginTop="8">
        <Text>This is my life story...</Text>
      </Flex>
    </DifaultLayout>
  )
}

// export async function GetContactPage() {

//   const { data } = await apolloClient.query({
//     query: SEARCH_BLOG_POSTS_QUERY,

//   })

//   return {
//     props: {
//       blogPosts: data.blogPostCollection?.items || [],
//     },
//   }
// }

export default AboutPage
