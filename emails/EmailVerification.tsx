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
          backgroundColor: 'white',
          color: '#15151e',
          fontFamily: 'Inter, sans-serif, system-ui, Roboto',
        }}
      >
        <Preview>Verifica tu dirección de correo electrónico</Preview>

        <Container
          style={{
            marginInline: 'auto',
            marginBlock: '0px',
            maxWidth: '560px',
            paddingInline: '0px',
            paddingTop: '20px',
            paddingBottom: '48px',
          }}
        >
          <Img
            src="https://raw.githubusercontent.com/hrdelarosa/apex-rivals/master/public/apex-rivals-logo.webp"
            height="60"
            alt="Apex Rivals Logo"
          />

          <Heading
            style={{
              fontSize: '24px',
              fontWeight: '600',
              paddingTop: '14px',
              paddingInline: '0px',
              paddingBottom: '0px',
              lineHeight: '1.3',
              letterSpacing: '-0.5px',
            }}
          >
            Verifica tu dirección de correo electrónico
          </Heading>

          <Section style={{ paddingBlock: '14px', paddingInline: '0px' }}>
            <Text style={{ fontSize: '15px', lineHeight: '1.4' }}>
              Gracias por iniciar el proceso de creación de una nueva cuenta de
              Apex Rivals. Queremos asegurarnos de que realmente eres tú. Si no
              deseas crear una cuenta, puedes ignorar este mensaje.
            </Text>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '1.4',
                paddingBottom: '8px',
              }}
            >
              Para verificar tu dirección de correo electrónico, haz clic en el
              botón de abajo:
            </Text>

            <Button
              style={{
                backgroundColor: '#ff1e00',
                color: 'white',
                fontWeight: '600',
                borderRadius: '6px',
                textAlign: 'center',
                display: 'block',
                paddingInline: '23px',
                paddingBlock: '11px',
              }}
              href={url}
            >
              Verificar mi correo electrónico
            </Button>

            <Text
              style={{
                marginBottom: '14px',
                marginInline: '0px',
                lineHeight: '1.4',
                fontSize: '15px',
              }}
            >
              Este enlace solo será válido durante la próxima 1 hora.
            </Text>

            <Text
              style={{
                color: 'black',
                marginBottom: '14px',
                marginInline: '0px',
                lineHeight: '1.4',
                fontSize: '15px',
              }}
            >
              ¡Que gane el mejor estratega!
            </Text>

            <Hr
              style={{
                borderColor: '#dfe1e4',
                marginTop: '42px',
                marginBottom: '26px',
              }}
            />

            <Img
              src="https://raw.githubusercontent.com/hrdelarosa/apex-rivals/master/public/apex-rivals-logo.webp"
              height="26"
              alt="Apex Rivals Logo"
              style={{ filter: 'grayscale(100%)' }}
            />

            <Link
              href={baseUrl}
              style={{ fontSize: '13px', color: '#8898aa', lineHeight: '24px' }}
            >
              Apex Rivals.
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
