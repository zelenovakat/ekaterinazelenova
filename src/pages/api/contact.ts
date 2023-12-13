import type { NextApiRequest, NextApiResponse } from "next"
import sendgrid from "@sendgrid/mail"

sendgrid.setApiKey(process.env.SEND_GRID_API_TOKEN || "")

type Data = {
  success: boolean
  errors?: string[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body
  const { email, message, name, mobile } = body

  if (!email || !message || !name || !mobile) {
    res.status(400).json({
      success: false,
      errors: ["Missing required field. Please check that the fields are filled in correctly."],
    })
    return
  }

  //Send

  try {
    await sendgrid.send({
      to: process.env.SENDGRID_EMAIL,
      from: {
        name: "Website Enquiries",
        email: process.env.SENDGRID_EMAIL || "",
      },
      replyTo: {
        name,
        email,
      },
      subject: `new message from ${name} - ${mobile}`,
      text: message,
    })
  } catch (error: any) {
    return res.status(error.statusCode || 400).json({ success: false, errors: [error.message] })
  }
  res.status(200).json({ success: true })
}

export default handler
