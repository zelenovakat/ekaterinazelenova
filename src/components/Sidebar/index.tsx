import { Flex } from "@chakra-ui/react"

import NavLinks from "../NavLinks"

const SideBar = () => {
  return (
    <Flex
      background="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(35,35,36,1) 35%, rgba(115,119,120,1) 100%)"
      width="200px"
      height="100vh"
      position="fixed"
      display={["none", "flex"]}>
      <NavLinks />
    </Flex>
  )
}
export default SideBar
