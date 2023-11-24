import DifaultLayout from "@/layout/DefaultLayout"
import {
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
} from "@chakra-ui/react"
import useContactForm from "@/hooks/useContactForm"
import { NextSeo } from "next-seo"

type ContactPageProps = {
  children: React.ReactNode
}

const ContactPage = (props: ContactPageProps) => {
  const contactFormPayLoad = useContactForm()
  const {
    callbacks: { setState, submitForm },
    state: { message, mobile, email, name, loading, success },
  } = contactFormPayLoad

  return (
    <DifaultLayout>
      <NextSeo
        title={`Ekaterina Zelenova  | Contact Me`}
        description={`Contact me using the form on this page.`}
      />
      <Heading as="h1" marginTop="2" size="lg">
        Contact
      </Heading>
      <Flex direction="column" marginTop="8" width={["100%", "70%"]}>
        <form onSubmit={submitForm}>
          <FormControl>
            <FormLabel>Your Name</FormLabel>
            <Input onChange={(e) => setState({ name: e.target.value })} value={name} type="text" />

            <FormLabel marginTop="4">Your Email</FormLabel>
            <Input
              onChange={(e) => setState({ email: e.target.value })}
              value={email}
              type="email"
            />

            <FormLabel marginTop="4">Your Mobile</FormLabel>
            <Input
              onChange={(e) => setState({ mobile: e.target.value })}
              value={mobile}
              type="text"
            />

            <FormLabel marginTop="4">Your Message</FormLabel>
            <Textarea
              onChange={(e) => setState({ message: e.target.value })}
              value={message}
              height={120}
            />
            <Button
              colorScheme="blue"
              onClick={submitForm}
              type="submit"
              marginTop="4"
              isLoading={loading}>
              Send Message
            </Button>
          </FormControl>
        </form>
        {success && (
          <Box color="black" marginBottom="4">
            <Text>Message was send successfully</Text>
          </Box>
        )}
      </Flex>
    </DifaultLayout>
  )
}

export default ContactPage
