import DifaultLayout from "@/layout/DefaultLayout"
import { Flex, Heading, Text } from "@chakra-ui/react"

type AboutPageProps = {
  children: React.ReactNode
}

const AboutPage = (props: AboutPageProps) => {
  const { children } = props
  return (
    <DifaultLayout>
      <Heading as="h1" marginTop="2" size="lg">
        About me
      </Heading>
      <Flex direction="column" marginTop="8">
        <Text>This is my life story...</Text>
      </Flex>
    </DifaultLayout>
  )
}

export default AboutPage
