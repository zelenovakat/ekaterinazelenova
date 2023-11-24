import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"
import { SocialIcon } from "react-social-icons"
import NavLinks from "../NavLinks"
import { PhoneIcon } from "@chakra-ui/icons"

const SideBar = () => {
  return (
    <Flex
      justifyContent="space-around"
      flexDirection="column"
      background="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(35,35,36,1) 35%, rgba(115,119,120,1) 100%)"
      width="200px"
      height="100vh"
      position="fixed"
      display={["none", "flex"]}>
      <NavLinks />
      <Flex padding={["4", "8"]} justifyContent="space-between">
        <SocialIcon target="_blank" url="https://linkedin.com/in/ekaterina-zelenova-4042671b6/" />
        <Popover>
          <PopoverTrigger>
            <Button
              color="white"
              backgroundColor="#2D7FB2"
              borderRadius="50px"
              padding="26px"
              width="50px"
              height="50px">
              <PhoneIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent backgroundColor="#2D7FB2" width="200px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>My nuber is</PopoverHeader>
            <PopoverBody>+46762840503</PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  )
}
export default SideBar
