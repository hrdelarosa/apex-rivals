import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

transporter.verify((error) => {
  if (error) console.error('Error configuring email transporter:', error)
  else console.log('Email transporter is configured correctly')
})
