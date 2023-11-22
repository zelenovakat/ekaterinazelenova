import { Flex, ListItem, UnorderedList } from "@chakra-ui/react"
import NextLink from "next/link"

const SideBar = () => {
  return (
    <Flex
      backgroundColor="black"
      width="200px"
      height="100vh"
      position="fixed"
      display={["none", "flex"]}>
      <UnorderedList
        color="white"
        listStyleType="none"
        margin="0"
        width="100%"
        fontSize="x-large"
        lineHeight={2}
        padding="8">
        <ListItem borderBottom="1px solid" borderColor="gray.700">
          <NextLink href="/">Home</NextLink>
        </ListItem>
        <ListItem borderBottom="1px solid" borderColor="gray.700">
          <NextLink href="/projects">Projects</NextLink>
        </ListItem>
        <ListItem borderBottom="1px solid" borderColor="gray.700">
          <NextLink href="/about">About</NextLink>
        </ListItem>
        <ListItem>
          <NextLink href="/contact">Contact</NextLink>
        </ListItem>
      </UnorderedList>
    </Flex>
  )
}
export default SideBar
