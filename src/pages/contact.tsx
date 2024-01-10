import DifaultLayout from "@/layout/DefaultLayout"
import { Flex, Heading, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react"
import useContactForm from "@/hooks/useContactForm"
import { NextSeo } from "next-seo"
import { linkedInColor } from "@/utils/colors"

type ContactPageProps = {
  children: React.ReactNode
}

const createFormLabel = (text: string) => {
  return <FormLabel marginTop="4">{text}</FormLabel>
}

const ContactPage = (props: ContactPageProps) => {
  const contactFormPayLoad = useContactForm()
  const {
    callbacks: { setState, submitForm },
    state: { message, mobile, email, name, loading },
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
      <Flex direction="column" marginTop="8" width={["100%", "80%"]}>
        <form onSubmit={submitForm}>
          <FormControl>
            {createFormLabel("Your Name")}
            <Input
              placeholder="name"
              onChange={({ target }) => setState({ name: target.value })}
              value={name}
              type="text"
            />

            {createFormLabel("Your Email")}
            <Input
              onChange={({ target }) => setState({ email: target.value })}
              placeholder="email@address.com"
              value={email}
              type="email"
            />

            {createFormLabel("Your Mobile")}
            <Input
              placeholder="46 00 000 00 00"
              onChange={({ target }) => setState({ mobile: target.value })}
              value={mobile}
              type="text"
            />

            {createFormLabel("Your Message")}
            <Textarea
              onChange={({ target }) => setState({ message: target.value })}
              value={message}
              height={120}
            />
            <Button
              backgroundColor={linkedInColor}
              onClick={submitForm}
              type="submit"
              color="white"
              marginTop="4"
              isLoading={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </FormControl>
        </form>
      </Flex>
    </DifaultLayout>
  )
}

export default ContactPage
