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
import { PhoneIcon } from "@chakra-ui/icons"
const Connection = () => {
  return (
    <Flex padding={["4", "8"]} justifyContent="space-between">
      <SocialIcon target="_blank" url="https://linkedin.com/in/ekaterina-zelenova-4042671b6/" />
      <Popover>
        <PopoverTrigger>
          <Button
            color="white"
            backgroundColor="#2D7FB2"
            borderRadius="50px"
            padding={["26px", "14px"]}
            width="50px"
            height="50px">
            <PhoneIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent backgroundColor="#2D7FB2" width={["180px", "200px"]}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>My nuber is</PopoverHeader>
          <PopoverBody>+46762840503</PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

export default Connection
