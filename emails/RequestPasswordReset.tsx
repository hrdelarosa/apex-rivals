import { RequestPasswordResetProps } from '@/src/types/email.types'
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

export default function RequestPasswordReset({
  userName,
  url,
  token,
}: RequestPasswordResetProps) {
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
        <Preview>Restablece tu contraseña</Preview>

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
            Restablece tu contraseña
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
              👋 Hola {userName}.
            </Text>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '0 0 20px',
                color: '#15151e',
              }}
            >
              Recientemente, alguien ha solicitado cambiar la contraseña de tu
              cuenta de Apex Rivals. Si has sido tú, puedes restablecer una
              nueva contraseña aquí.
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
              Restablecer contraseña
            </Button>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '20px 0 16px',
                color: '#15151e',
              }}
            >
              Este enlace y código solo será válido durante la próxima 1 hora.
              Si el enlace no funciona, puedes utilizar directamente el
              siguiente código desde esta página:{' '}
              <Link
                href={`${baseUrl}/reset-password`}
                style={{
                  color: '#ff1e00',
                  textDecoration: 'underline',
                }}
              >
                Página de restablecimiento
              </Link>
            </Text>

            <code
              style={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                padding: '8px 12px',
                backgroundColor: '#dfe1e4',
                color: '#3c4149',
                fontSize: '21px',
                borderRadius: '6px',
                display: 'inline-block',
                margin: '0 0 16px',
              }}
            >
              {token}
            </code>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '0 0 16px',
                color: '#15151e',
              }}
            >
              Si no deseas cambiar tu contraseña o no solicitaste este cambio,
              puedes ignorar y eliminar este mensaje. Para mantener la seguridad
              de tu cuenta, no reenvíes este correo electrónico a nadie.
            </Text>

            <Text
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                margin: '0 0 16px',
                color: '#15151e',
              }}
            >
              ¡Vuelve a la pista con Apex Rivals!
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
