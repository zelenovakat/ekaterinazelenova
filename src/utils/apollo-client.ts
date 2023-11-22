import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = () => {
  return new ApolloClient({
    headers: {
      authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`,
    },
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    cache: new InMemoryCache(),
  })
}

export default client
