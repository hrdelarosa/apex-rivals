# Descripción
Ápex Rivals es una aplicación web de fantasy deportivo enfocada en la Fórmula 1. Los usuarios forman equipos virtuales compuestos por pilotos y constructores reales, compitiendo en ligas públicas o privadas donde el objetivo es acumular la mayor cantidad de puntos posible Gran Premio a Gran Premio.
# ToDo
[[Replanteamiento de la BD]]
[[Schema de la DB - Apex Rivals]]
[[2026-04-24]]

# Funcionalidades
## 1. Autenticación y gestión de usuarios
### Métodos de Autenticación
El sistema de autenticación estará gestionado por Better Auth. Se soportarán dos métodos de acceso:

| Método             | Descripción                                                 |
| ------------------ | ----------------------------------------------------------- |
| Email and password | Registro con verificación obligatoria de correo electrónico |
| Google Auth        | Inicio de sesión con cuenta de Google (un clic)             |
La gestión de sesiones se realiza con tokens seguros almacenados en cookies `httpOnly` para prevenir acceso desde JavaScript del lado del cliente.
#### Flujo de Registro con Email y Contraseña
1. El usuario completa el formulario con nombre, email y contraseña
2. Better Auth crea la cuenta con `emailVerified: false`
3. Se genera un token de verificación y se envía un correo automático
4. El usuario hace clic en el enlace del correo para verificar su email
5. La cuenta queda activa y el usuario es redirigido al Inicio (Dashboard)
### Infraestructura de Emails
Los correos transaccionales se envían con **Nodemailer** como transporte SMTP y **React Email** para construir las plantillas en JSX. Esto permite diseñar emails con componentes reutilizables y previsualización en el navegador durante el desarrollo.

| Herramienta     | Rol                                |
| --------------- | ---------------------------------- |
| Nodemailer      | Transporte SMTP — envío del correo |
| **React Email** | Plantillas de email en JSX/TSX     |
**Correos que el sistema envía:**
- **Verificación de email** — tras el registro, con enlace de confirmación
- **Recuperación de contraseña** — enlace de restablecimiento con expiración
- **Confirmación de cambio de contraseña** — aviso de seguridad tras el cambio exitoso
#### Recuperación y Cambio de Contraseña
**Olvidé mi contraseña:**
1. El usuario presiona el **¿Olvide mi contraseña** e introduce su email
2. El sistema genera un token seguro con tiempo de expiración (ej. 1 hora)
3. Se envía un correo con el enlace `/reset-password?token=...`
4. El usuario introduce su nueva contraseña en el formulario
5. El token se invalida tras el uso y se envía un correo de confirmación del cambio

**Cambiar contraseña (usuario autenticado):**
**Pendiente...**
#### Perfil de Usuario
- Nombre de usuario único, avatar personalizable, biografía, país  
- Historial de ligas participadas y temporadas - **Por ver**
- Estadísticas globales: puntos totales, posición promedio, mejores ligas - **Por ver**
#### Límites del Sistema por Usuario

| Parámetro                                   | Valor                     |
| ------------------------------------------- | ------------------------- |
| Ligas simultáneas máximas                   | 10 a 15 ligas             |
| Cambios permitidos por temporada por equipo | 25 a 30 cambios totales   |
| Presupuesto por equipo                      | 100 millones (por liga)   |
| Composición del equipo                      | 2 pilotos + 1 constructor |
## 2. Sistema de Ligas
#### Tipos de Liga

|Característica|Liga Pública|Liga Privada|
|---|---|---|
|Acceso|Búsqueda libre o URL|Solo por código de invitación|
|Visibilidad|Aparece en búsquedas|Oculta en el directorio|
|Unirse|Cualquier usuario|Solo con código|
|Administrador|Creador de la liga|Creador de la liga|
|Máx. participantes|Sin límite fijo|Configurable por admin|
#### Gestión de Ligas
- El administrador puede modificar nombre, descripción e imagen de la liga
- Sistema de invitaciones con código único regenerable
- Expulsión de miembros por parte del administrador
- Historial completo de temporadas y clasificaciones anteriores
- Transferencia de administración a otro miembro
#### Límites de Participación
Para garantizar la calidad de la experiencia y evitar el spam, cada usuario estará limitado a participar en un máximo de 10 a 15 ligas simultáneamente. Este valor exacto se determinará en la fase de ajuste de balance del juego.

## 3. Equipos y Mercado
#### Composición del Equipo

| Elemento    | Cantidad        | Rango de Precio | Notas            |
| ----------- | --------------- | --------------- | ---------------- |
| Piloto      | 2 pilotos       | Variable        | Dinámico por GP  |
| Constructor | 1 constructor   | Variable        | Dinámico por GP  |
| **TOTAL**   | **3 elementos** | **Max 100M**    | Presupuesto fijo |
Cada usuario tiene un equipo independiente por cada liga en la que participa. Los equipos se gestionan de forma autónoma entre ligas.
## 4. Sistema de Precios Dinámicos
#### Precios Dinámicos
Tras cada Gran Premio, el sistema recalcula el precio de cada piloto y constructor en función de su rendimiento. El algoritmo considera:
- Posición final en carrera y clasificación
- Puntos obtenidos en el GP
- Comparativa con el rendimiento esperado
- Tendencia de los últimos 3 GPs

**Fórmula orientativa de recálculo:**
```
nuevo_precio = precio_actual + (delta_rendimiento * factor_volatilidad)
delta_rendimiento = puntos_actuales_gp 
nuevo_precio = MAX(nuevo_precio)
```
O implementar un modelo de AI, el cual determine los precios de los pilotos, también mediante su rendimiento.
## 5. Sistema de Puntuación
El sistema de puntuación por carrera será el real, el que se usa actualmente en la F1. Con adiciones a la hora de la clasificación y aspectos de carreas mas como el DNF.
#### Tabla de Puntuación por GP

| Evento                | Puntos Piloto   | Puntos Constructor | Notas                  |
| --------------------- | --------------- | ------------------ | ---------------------- |
| 1° Lugar en Carrera   | +25 pts         | +25 pts            | Misma escala F1        |
| 2° Lugar              | +18 pts         | +18 pts            |                        |
| 3° Lugar              | +15 pts         | +15 pts            |                        |
| Posiciones 4–10       | Escala F1       | Escala F1          |                        |
| Pole Position         | +10 pts (bonus) | +5 pts (bonus)     | Bonificación extra     |
| Vuelta Rápida         | +5 pts (bonus)  | +3 pts (bonus)     | Si termina en top 10   |
| DNF (No Finalización) | -5 pts          | -3 pts             | Por abandono/accidente |
> **Nota:** Los valores exactos de bonus y penalizaciones se calibrarán en fase de balance.
## 6. Sistema de Boosters
Los boosters son modificadores especiales de uso único que los usuarios pueden activar para ampliar los puntos de su equipo en un GP específico.
#### Tipos de Booster Propuestos
- **Turbo Captain:** Duplica los puntos del piloto designado en el siguiente GP
- **Constructor Boost:** Incrementa en 50% los puntos del constructor en el GP activado
- **Safety Car Shield:** El equipo no recibe penalización por DNF en ese GP
- **Rookie Boost:** Multiplica ×1.5 los puntos de un piloto nuevos de la parrilla 
#### Reglas de Uso
- Cada usuario recibe un set de boosters al inicio de la temporada
- Los boosters son de **uso único** (no se acumulan ni se venden)
- Solo se puede activar un booster por GP por liga
- Se deben activar **antes del cierre del mercado** (antes de la clasificación)
> **Nota:** Los valores exactos de bonus y penalizaciones se calibrarán en fase de balance. Así como también la cantidad de booters que recibirá un usuario al inicio de la temporada.

> **Future:**  Mercado de boosters, para que el usuario tenga la opción de comprar nuevos boosters cuando quiera, esto mediante los puntos obtenidos en la temporada o la opción de a partir de los resultados repartir bosters
## 7 Sistema de Notificaciones
La plataforma enviará notificaciones proactivas para mantener a los usuarios informados:
- Recordatorio **48 horas** antes del cierre del mercado
- Recordatorio **2 horas** antes del cierre del mercado
- Publicación de resultados después de cada GP
- Movimiento en clasificación de liga (subir/bajar posiciones)
- Invitación a nueva liga
- Cambio de precio significativo en un piloto/constructor del equipo
### Canales de Notificación
- **Email** (obligatorio para eventos críticos, vía Nodemailer + SMTP) - **Por ver**
- **Push Notification** en navegador (PWA)
- **Notificaciones in-app** (badge en UI)
## 8 Estadísticas y Clasificaciones
#### Tabla de Clasificación por Liga
- Ranking en tiempo real actualizado tras cada GP
- Puntos totales de la temporada y puntos del último GP
- Diferencia de puntos con el líder y el anterior en el ranking
- Equipo actual del usuario (pilotos + constructor visibles)
### Historial de Resultados
- Puntos obtenidos por el equipo en cada GP de la temporada
- Gráfica de evolución de puntos y posición a lo largo de la temporada
- Detalle de puntos por cada elemento del equipo por GP
### Estadísticas Detalladas
- Total de cambios realizados en la temporada
- Piloto y constructor más usado
- Mejor y peor GP de la temporada
- ROI de cada elemento (puntos obtenidos vs precio pagado)
# Arquitectura del Proyecto
Ápex Rivals adopta la **Screaming Architecture** como enfoque arquitectónico principal. Esta filosofía, propuesta por Robert C. Martin (Uncle Bob), establece que la estructura de directorios de un proyecto debe "gritar" su dominio de negocio: al abrir el proyecto, lo primero que se debe ver son los casos de uso y entidades del negocio, no los frameworks o tecnologías utilizadas.

```
├── app/
├── src/
```
# Stack Tecnológico
## Frontend

| Tecnología   | Versión | Motivo de Elección                                                              |
| ------------ | ------- | ------------------------------------------------------------------------------- |
| Next.js      | 14+     | App Router, Server Components, Server Actions, SSR/SSG/ISR en un solo framework |
| React        | 18+     | Base de Next.js, concurrent features, Suspense                                  |
| TypeScript   | 5+      | Tipado estricto en todo el proyecto, integración con Drizzle                    |
| Tailwind CSS | 3+      | Utilitario CSS, JIT compiler, consistencia de diseño                            |
| shadcn/ui    | Latest  | Componentes accesibles, customizables, sin vendor lock-in                       |
## Backend y Base de Datos

| Tecnología  | Versión | Motivo de Elección                                                           |
| ----------- | ------- | ---------------------------------------------------------------------------- |
| Supabase    | Latest  | PostgreSQL gestionado, Auth integrada, Storage, Realtime, Row Level Security |
| Drizzle ORM | Latest  | TypeScript-first, queries type-safe, migraciones, soporte PostgreSQL nativo  |
| Better Auth | Latest  | Alternativa moderna a NextAuth, flexible, soporte OAuth y Magic Link         |
| PostgreSQL  | 15+     | BD relacional robusta, soporte JSON, ideal para datos relacionales complejos |
## Herramientas de Desarrollo y Deploy

|Tecnología|Propósito|Notas|
|---|---|---|
|Vercel|Deploy & Hosting|Integración nativa con Next.js, Edge Network, CI/CD automático|
|pnpm|Package Manager|Rápido, eficiente en disco, workspaces|
|ESLint + Prettier|Code Quality|Reglas estrictas + formato automático|
|Zod|Validación|Schema validation, integración con Server Actions y formularios|
|React Hook Form|Formularios|Performante, integración con Zod para validación tipada|
|Tanstack Query|Data Fetching|Cache, optimistic updates para funciones del lado cliente|
|Nodemailer|Emails|Transporte SMTP para emails transaccionales (verificación, recuperación)|
|React Email|Emails|Plantillas de email en JSX/TSX con previsualización en desarrollo|
|Vitest|Testing|Framework de testing para unit e integration tests|
|Playwright|Testing E2E|Automatización de flujos completos en navegador|
