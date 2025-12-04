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
          backgroundColor: 'white',
          color: '#15151e',
          fontFamily: 'Inter, sans-serif, system-ui, Roboto',
        }}
      >
        <Preview>Restablece tu contraseña</Preview>

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
            Restablece tu contraseña
          </Heading>

          <Section style={{ paddingBlock: '14px', paddingInline: '0px' }}>
            <Text style={{ fontSize: '15px', lineHeight: '1.4' }}>
              👋 Hola {userName}.
            </Text>

            <Text style={{ fontSize: '15px', lineHeight: '1.4' }}>
              Recientemente, alguien ha solicitado cambiar la contraseña de tu
              cuenta de Apex Rivals. Si has sido tú, puedes restablecer una
              nueva contraseña aquí.
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
              Restablecer contraseña
            </Button>

            <Text
              style={{
                marginBottom: '14px',
                marginInline: '0px',
                lineHeight: '1.4',
                fontSize: '15px',
              }}
            >
              Este enlace y código solo será válido durante la próxima 1 hora.
              Si el enlace no funciona, puedes utilizar directamente el
              siguiente código desde esta página:{' '}
              <Link href={`${baseUrl}/reset-password`}>
                Página de restablecimiento
              </Link>
            </Text>

            <code
              style={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                paddingInline: '4px',
                paddingBlock: '1px',
                backgroundColor: '#dfe1e4',
                color: '#3c4149',
                fontSize: '21px',
                letterSpacing: '-0.3px',
                borderRadius: '6px',
              }}
            >
              {token}
            </code>

            <Text style={{ fontSize: '15px', lineHeight: '1.4' }}>
              Si no deseas cambiar tu contraseña o no solicitaste este cambio,
              puedes ignorar y eliminar este mensaje. Para mantener la seguridad
              de tu cuenta, no reenvíes este correo electrónico a nadie.
            </Text>

            <Text style={{ fontSize: '15px', lineHeight: '1.4' }}>
              ¡Vuelve a la pista con Apex Rivals!
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
