import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react"
import NavLinks from "../NavLinks"
import Connection from "../Popover"

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
            <NavLinks />
            <Connection />
          </DrawerBody>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNav
