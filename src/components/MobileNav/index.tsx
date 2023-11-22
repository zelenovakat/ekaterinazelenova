import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"
import NextLink from "next/link"

type MobileNavProps = {
  isOpen: boolean
  onClose: VoidFunction
}
const MobileNav = (props: MobileNavProps) => {
  const { isOpen, onClose } = props
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <DrawerBody>
            <UnorderedList
              listStyleType="none"
              margin="0"
              width="100%"
              fontSize="x-large"
              lineHeight={2}>
              <ListItem borderBottom="1px solid" borderColor="gray.100">
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
          </DrawerBody>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNav
