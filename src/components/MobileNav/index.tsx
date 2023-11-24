import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react"
import NavLinks from "../NavLinks"

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
          </DrawerBody>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNav
