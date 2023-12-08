import React from "react"
import { Flex, Heading, Text, GridItem, Link } from "@chakra-ui/react"
import type { JobList } from "@/pages"
import Image from "next/image"
import NextLink from "next/link"

type JobListTileProps = {
  jobList: JobList
}

const JobListTile = (props: JobListTileProps) => {
  console.log(props)

  const {
    jobList: { title, summary, mainImage, sys },
  } = props
  return (
    <GridItem width="100%" overflow="clip" position="relative">
      <Flex
        minHeight="315px"
        overflow="clip"
        position="relative"
        borderTopLeftRadius="5"
        borderTopRightRadius="5">
        <Image
          src={mainImage?.url}
          fill
          alt={title}
          style={{ objectFit: "cover" }}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Flex>

      <Flex
        direction="column"
        padding="4"
        border="1px solid"
        borderColor="gray.100"
        borderBottomLeftRadius="5"
        borderBottomRightRadius="5"
        minHeight="250px">
        <Heading size="md">{title}</Heading>
        <Text marginTop="4">{summary}</Text>
        <Link as={NextLink} href={`/posts/${sys.id}`} marginTop="auto" fontWeight="bold">
          Read More
        </Link>
      </Flex>
    </GridItem>
  )
}

export default JobListTile