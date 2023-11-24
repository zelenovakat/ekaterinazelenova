import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"

export type FooterItem = {
  about: string
  contact: string
  projects: string
  linkedInLogo: {
    url: string
  }
  linkesInLink: string
}

const GET_FOOTER_QUERY = gql`
  query FooterQuery {
    footerCollection {
      items {
        about
        contact
        linkedInLogo {
          url
        }
        linkesInLink
        projects
      }
    }
  }
`

const apolloClient = client()

const Footer = (props: FooterItem) => {
  const { about, contact, projects } = props
  return
}

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_FOOTER_QUERY,
  })

  return {
    props: {
      footer: data?.footerCollection?.items || [],
    },
  }
}

export default Footer
