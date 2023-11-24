import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import client from "@/utils/apollo-client"
import { gql } from "@apollo/client"
import DifaultLayout from "@/layout/DefaultLayout"
import ProjectTile from "@/components/ProjectTile"

const RECENT_PROJECTS_QUERY = gql`
  query RecentProjectsQuery {
    projectCollection(limit: 10, order: sys_publishedAt_DESC) {
      items {
        description
        progectLogo {
          url
        }
        title
        sys {
          id
        }
        mainImage {
          url
        }
        projectUrl
      }
    }
  }
`
export type Project = {
  title: string
  description: string
  mainImage: {
    url: string
  }
  projectLogo: {
    url: string
  }
  sys: {
    id: string
  }
  projectUrl: string
}

type ProjectsPageProps = {
  projects: Project[]
}
const apolloClient = client()

const ProjectsPage = (props: ProjectsPageProps) => {
  const { projects } = props
  return (
    <DifaultLayout>
      <Heading as="h1" marginTop="2" size="lg">
        Projects
      </Heading>
      <Flex direction="column" marginTop="8">
        {projects.map((project) => (
          <ProjectTile key={project?.sys?.id} project={project} />
        ))}
      </Flex>
    </DifaultLayout>
  )
}

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: RECENT_PROJECTS_QUERY,
  })

  return {
    props: {
      projects: data.projectCollection?.items || [],
    },
  }
}

export default ProjectsPage
