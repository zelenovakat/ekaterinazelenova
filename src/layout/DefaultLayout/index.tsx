import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import SideBar from "@/components/Sidebar"
import { DefaultSeo } from "next-seo"

type DifaultLayoutProps = {
  children: React.ReactNode
}

const DifaultLayout = (props: DifaultLayoutProps) => {
  const { children } = props
  return (
    <Flex>
      <DefaultSeo
        title="Ekaterina Zelenova | Frontend Developer"
        description="Building production Websites and Applications."
      />
      <SideBar />
      <Flex direction="column" width={["100%", "calc(100% - 200px)"]} marginLeft={["0", "200px"]}>
        <Header />
        <Flex padding={["6", "12"]} direction="column">
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default DifaultLayout
