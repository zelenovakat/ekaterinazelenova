import { Flex, Heading, Icon, Text, Link } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { ArrowBackIcon } from "@chakra-ui/icons"

const ErrorPage: NextPage = () => {
  const router = useRouter()
  const error = router.query.errorMessage as string

  return (
    <Flex marginTop="8" flexDirection="column" width="100%" textAlign="center">
      <Heading as="h1" letterSpacing="-3" size="4xl">
        Oops!
      </Heading>
      <Heading marginTop="8">Message was not sent.</Heading>
      <Text marginTop="8">{error}</Text>
      <Text>Thank you!</Text>

      <Link as={NextLink} href="/contact" marginTop="8" fontWeight="bold">
        <Icon mr="2" as={ArrowBackIcon} />
        go to the contact page
      </Link>
    </Flex>
  )
}

export default ErrorPage
