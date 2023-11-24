import { UnorderedList, ListItem } from "@chakra-ui/react"
import NextLink from "next/link"

const NavLinks = () => {
  return (
    <UnorderedList
      listStyleType="none"
      margin="0"
      width="100%"
      fontSize="x-large"
      lineHeight={2}
      color={["black", "white"]}
      padding={["4", "8"]}>
      <ListItem borderBottom="1px solid" borderColor="gray.700">
        <NextLink href="/">Home</NextLink>
      </ListItem>
      <ListItem borderBottom="1px solid" borderColor="gray.700">
        <NextLink href="/projects">Projects</NextLink>
      </ListItem>
      <ListItem borderBottom="1px solid" borderColor="gray.700">
        <NextLink href="/about">About</NextLink>
      </ListItem>
      <ListItem borderBottom="1px solid" borderColor="gray.700">
        <NextLink href="/contact">Contact</NextLink>
      </ListItem>
    </UnorderedList>
  )
}

export default NavLinks
