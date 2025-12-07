import { EmailVerificationProps } from '@/src/types/email.types'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export default function EmailVerification({ url }: EmailVerificationProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return (
    <Html lang="es" dir="ltr">
      <Head />

      <Body
        style={{
          backgroundColor: '#ffffff',
          color: '#15151e',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <Preview>Verifica tu dirección de correo electrónico</Preview>

        <Container
          style={{
            margin: '0 auto',
            maxWidth: '560px',
            padding: '20px 0 48px',
          }}
        >
          <Img
            src="https://raw.githubusercontent.com/hrdelarosa/apex-rivals/master/public/apex-rivals.png"
            height="60"
            alt="Apex Rivals Logo"
            style={{
              display: 'block',
              margin: '0 0 20px',
            }}
          />

          <Heading
            style={{
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 20px',
              lineHeight: '1.3',
              color: '#15151e',
            }}
          >
            Verifica tu dirección de correo electrónico
          </Heading>

          <Section style={{ padding: '0' }}>
            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '0 0 16px',
                color: '#15151e',
              }}
            >
              Gracias por iniciar el proceso de creación de una nueva cuenta de
              Apex Rivals. Queremos asegurarnos de que realmente eres tú. Si no
              deseas crear una cuenta, puedes ignorar este mensaje.
            </Text>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '0 0 20px',
                color: '#15151e',
              }}
            >
              Para verificar tu dirección de correo electrónico, haz clic en el
              botón de abajo:
            </Text>

            <Button
              style={{
                backgroundColor: '#ff1e00',
                color: '#ffffff',
                fontWeight: '600',
                borderRadius: '6px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                padding: '12px 24px',
                fontSize: '15px',
                lineHeight: '1',
              }}
              href={url}
            >
              Verificar mi correo electrónico
            </Button>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '20px 0 16px',
                color: '#15151e',
              }}
            >
              Este enlace solo será válido durante la próxima 1 hora.
            </Text>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '0 0 16px',
                color: '#15151e',
              }}
            >
              ¡Que gane el mejor estratega!
            </Text>

            <Hr
              style={{
                borderColor: '#dfe1e4',
                borderStyle: 'solid',
                borderWidth: '1px 0 0',
                margin: '40px 0 24px',
              }}
            />

            <Img
              src="https://raw.githubusercontent.com/hrdelarosa/apex-rivals/master/public/apex-rivals.png"
              height="26"
              alt="Apex Rivals Logo"
              style={{
                display: 'block',
                opacity: 0.5,
                margin: '0 0 8px',
              }}
            />

            <Link
              href={baseUrl}
              style={{
                fontSize: '13px',
                color: '#8898aa',
                lineHeight: '24px',
                textDecoration: 'none',
              }}
            >
              Apex Rivals
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
