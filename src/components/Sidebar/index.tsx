import { Flex } from "@chakra-ui/react"
import NavLinks from "../NavLinks"
import Connection from "../Popover"
import { background } from "@/utils/colors"

const SideBar = () => {
  return (
    <Flex
      justifyContent="space-around"
      flexDirection="column"
      width="200px"
      height="100vh"
      position="fixed"
      display={["none", "flex"]}
      bg={background}>
      <NavLinks />
      <Connection />
    </Flex>
  )
}

export default SideBar
