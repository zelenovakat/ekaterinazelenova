import type { Project } from "@/pages/projects"
import NextLink from "next/link"
import { Flex, Heading, Link, Text } from "@chakra-ui/react"
import NextImage from "next/image"

type ProjectTileProps = {
  project: Project
}

const ProjectTile = (props: ProjectTileProps) => {
  const {
    project: { title, description, mainImage, projectLogo, projectUrl },
  } = props
  return (
    <Flex
      className="fadeInLeft-animation"
      borderBottom="1px dashed"
      borderColor="gray.100"
      flexDirection={{ base: "column", md: "column", lg: "row" }}
      marginBottom="8"
      paddingBottom="8"
      width={{ base: "100%", md: "80%", lg: "100%", xl: "80%" }}>
      <Flex
        background="white"
        flexShrink="0"
        height={{ base: 200, md: 200, lg: "100%" }}
        marginBottom="8"
        position="relative"
        width={{ base: "100%", md: "100%", lg: 400 }}
        border="1px solid"
        borderColor="gray.300">
        <NextImage src={mainImage?.url} alt={title} priority={false} fill object-fit="cover" />
      </Flex>
      <Flex direction="column" marginLeft={{ base: "0", md: "0", lg: "4" }}>
        <Heading size="md"> {title}</Heading>
        <Text marginTop="4" fontSize="sm">
          {description}
        </Text>
        {!!projectUrl && (
          <Link as={NextLink} fontWeight="bold" href={projectUrl} target="_blank" marginTop="4">
            {projectUrl}
          </Link>
        )}
      </Flex>
    </Flex>
  )
}

export default ProjectTile
