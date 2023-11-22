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
      borderBottom="1px dashed"
      borderColor="gray.100"
      flexDirection={["column", "row"]}
      marginBottom="8"
      paddingBottom="8"
      width={["100%", "70%"]}>
      <Flex
        background="white"
        flexShrink="0"
        height={180}
        marginBottom="8"
        position="relative"
        width={["100%", 320]}
        border="1px solid"
        borderColor="gray.300">
        <NextImage
          src={mainImage?.url}
          alt={title}
          fill
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
      </Flex>
      <Flex direction="column" marginLeft="4">
        <Heading size="md"> {title}</Heading>
        <Text marginTop="4">{description}</Text>
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
