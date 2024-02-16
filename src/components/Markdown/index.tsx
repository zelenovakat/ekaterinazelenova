import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"

type LinkProps = {
  href?: string
  children?: ReactNode
  // Additional props for customization
  target?: string
  rel?: string
}

function LinkRenderer({ href, children, target = "_blank", rel = "noreferrer" }: LinkProps) {
  if (!href) {
    return <span>{children}</span>
  }
  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  )
}

type MarkdownProps = {
  children: string
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        a: (props) => <LinkRenderer {...props} />,
      }}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
