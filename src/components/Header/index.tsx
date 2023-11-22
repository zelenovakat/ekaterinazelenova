import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Flex, InputGroup, Input, InputLeftElement, Button } from "@chakra-ui/react"
import MobileNav from "../MobileNav"
import { useState } from "react"

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <Flex
      borderBottom="1px solid"
      borderColor="gray.100"
      width="100%"
      padding="4"
      justifyContent="flex-end">
      <Button
        onClick={() => setIsNavOpen(!isNavOpen)}
        variant="outline"
        marginRight="4"
        display={["block", "none"]}>
        <HamburgerIcon />
      </Button>
      <Flex width={["100%", "30%"]}>
        <form action="/search" style={{ width: "100%" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input name="string" type="text" placeholder="Search" />
          </InputGroup>
        </form>
      </Flex>
      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(!isNavOpen)} />
    </Flex>
  )
}

export default Header
