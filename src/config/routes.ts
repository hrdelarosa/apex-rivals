import { HomeIcon } from 'lucide-react'
import {
  IconAward,
  IconBook2,
  IconChartBar,
  IconSettings,
  IconShield,
  IconTrophy,
  IconUser,
} from '@tabler/icons-react'

export const ROUTES_HEADER = [
  { label: 'Como funciona', href: '#how-it-works' },
  { label: 'Características', href: '#features' },
  { label: 'Clasificación', href: '#standings' },
  { label: 'Reglas', href: '/rules' },
]

export const ROUTES_HEADER_PROTECTED = [
  { label: 'Inicio', href: '/dashboard' },
  { label: 'Ligas', href: '/leagues' },
  { label: 'Clasificación', href: '/standings' },
  { label: 'Puntuación', href: '/scoring' },
]

export const ROUTES_FOOTER = {
  resources: [
    { label: 'Acerca de', href: '#about' },
    { label: 'Preguntas frecuentes', href: '#faq' },
    { label: 'Como funciona', href: '#how-it-works' },
    { label: 'Características', href: '#features' },
  ],
  rules: [
    { label: 'Reglas', href: '/rules' },
    { label: 'Sistema de puntuación', href: '/rules/#scoring-system' },
    { label: 'Límite presupuestario', href: '/rules/#budget-cap' },
    { label: 'Sustituciones', href: '/rules/#substitutions' },
    { label: 'Ligas', href: '/rules/#leagues' },
  ],
  legal: [
    { label: 'Política de privacidad', href: '/legal/privacy-policy' },
    { label: 'Términos de servicio', href: '/legal/terms' },
    { label: 'Cookies', href: '/legal/cookies' },
  ],
}

export const SIDEBAR_MAIN_ROUTES = [
  { label: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { label: 'Ligas', href: '/leagues', icon: IconTrophy },
  { label: 'Mis equipos', href: '/my-teams', icon: IconShield },
  { label: 'Clasificación', href: '/standings', icon: IconChartBar },
  { label: 'Perfil', href: '/profile', icon: IconUser },
]

export const SIDEBAR_SECONDARY_ROUTES = [
  { label: 'Reglas', href: '/rules', icon: IconBook2 },
  { label: 'Puntuación', href: '/scoring', icon: IconAward },
  { label: 'Configuración', href: '/settings', icon: IconSettings },
]

export const ROUTES_RULES = [
  { label: 'Ligas', href: '#leagues' },
  { label: 'Equipos y presupuesto', href: '#budget-cap' },
  { label: 'Límites del sistema por usuario', href: '#user-limits' },
  { label: 'Sistema de boosters', href: '#boosters-system' },
  { label: 'Mercado', href: '#market' },
  { label: 'Sistema de precios dinámicos', href: '#dynamic-pricing' },
]
