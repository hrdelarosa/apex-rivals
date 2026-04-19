import { InferSelectModel } from 'drizzle-orm'
import { scoringRules, boosterCatalog } from './schema'

export const staticScoringRules: Omit<
  InferSelectModel<typeof scoringRules>,
  'id' | 'createdAt' | 'updatedAt'
>[] = [
  {
    code: 'POS_1',
    description: '1° Lugar en Carrera',
    points: 25,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_2',
    description: '2° Lugar en Carrera',
    points: 18,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_3',
    description: '3° Lugar en Carrera',
    points: 15,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_4',
    description: '4° Lugar en Carrera',
    points: 12,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_5',
    description: '5° Lugar en Carrera',
    points: 10,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_6',
    description: '6° Lugar en Carrera',
    points: 8,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_7',
    description: '7° Lugar en Carrera',
    points: 6,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_8',
    description: '8° Lugar en Carrera',
    points: 4,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_9',
    description: '9° Lugar en Carrera',
    points: 2,
    category: 'position',
    isActive: true,
  },
  {
    code: 'POS_10',
    description: '10° Lugar en Carrera',
    points: 1,
    category: 'position',
    isActive: true,
  },

  {
    code: 'S_POS_1',
    description: '1° Lugar en Carrera Sprint',
    points: 8,
    category: 'position',
    isActive: true,
  },
  {
    code: 'S_POS_2',
    description: '2° Lugar en Carrera Sprint',
    points: 7,
    category: 'position',
    isActive: true,
  },
  {
    code: 'S_POS_3',
    description: '3° Lugar en Carrera Sprint',
    points: 6,
    category: 'position',
    isActive: true,
  },
  {
    code: 'S_POS_4',
    description: '4° Lugar en Carrera Sprint',
    points: 5,
    category: 'position',
    isActive: true,
  },
  {
    code: 'S_POS_5',
    description: '5° Lugar en Carrera Sprint',
    points: 4,
    category: 'position',
    isActive: true,
  },
  {
    code: 'S_POS_6',
    description: '6° Lugar en Carrera Sprint',
    points: 3,
    category: 'position',
    isActive: true,
  },
  {
    code: 'S_POS_7',
    description: '7° Lugar en Carrera Sprint',
    points: 2,
    category: 'position',
    isActive: true,
  },
  {
    code: 'S_POS_8',
    description: '8° Lugar en Carrera Sprint',
    points: 1,
    category: 'position',
    isActive: true,
  },

  {
    code: 'POLE_DRIVER',
    description: 'Pole Position (Piloto)',
    points: 10,
    category: 'bonus',
    isActive: true,
  },
  {
    code: 'POLE_CONSTRUCTOR',
    description: 'Pole Position (Constructor)',
    points: 5,
    category: 'bonus',
    isActive: true,
  },
  {
    code: 'S_POLE_DRIVER',
    description: 'Pole Position - Qualy Sprint (Piloto)',
    points: 5,
    category: 'bonus',
    isActive: true,
  },
  {
    code: 'S_POLE_CONSTRUCTOR',
    description: 'Pole Position - Qualy Sprint (Constructor)',
    points: 2,
    category: 'bonus',
    isActive: true,
  },
  {
    code: 'FASTEST_LAP_DRIVER',
    description: 'Vuelta Rapida (Piloto, solo si termina en Top 10)',
    points: 5,
    category: 'bonus',
    isActive: true,
  },
  {
    code: 'FASTEST_LAP_CONSTRUCTOR',
    description: 'Vuelta Rapida (Constructor, solo si termina en Top 10)',
    points: 3,
    category: 'bonus',
    isActive: true,
  },
  {
    code: 'DNF_DRIVER',
    description: 'DNF / No Finaliza (Piloto)',
    points: -5,
    category: 'penalty',
    isActive: true,
  },
  {
    code: 'DNF_CONSTRUCTOR',
    description: 'DNF / No Finaliza (Constructor)',
    points: -3,
    category: 'penalty',
    isActive: true,
  },
]

export const staticBoosters: Omit<
  InferSelectModel<typeof boosterCatalog>,
  'id' | 'imageUrl' | 'createdAt'
>[] = [
  {
    code: 'TURBO_CAPTAIN',
    name: 'Turbo Captain',
    description: 'Duplica los puntos del piloto designado en el GP activado.',
    multiplier: '2.00',
    appliesTo: 'driver',
    isActive: true,
  },
  {
    code: 'CONSTRUCTOR_BOOST',
    name: 'Constructor Boost',
    description:
      'Incrementa en 50% los puntos del constructor seleccionado en el GP activado.',
    multiplier: '1.50',
    appliesTo: 'constructor',
    isActive: true,
  },
  {
    code: 'SAFETY_CAR_SHIELD',
    name: 'Safety Car Shield',
    description:
      'Evita la penalizacion por DNF en el GP activado para el activo seleccionado.',
    multiplier: '1.00',
    appliesTo: null,
    isActive: true,
  },
  {
    code: 'SPRINT_FOCUS',
    name: 'Sprint Focus',
    description:
      'Aumenta 30% los puntos del piloto seleccionado en eventos sprint del GP activado.',
    multiplier: '1.30',
    appliesTo: 'driver',
    isActive: true,
  },
  {
    code: 'QUALY_SPECIALIST',
    name: 'Qualy Specialist',
    description:
      'Aumenta 25% los puntos de clasificacion (qualy normal y qualy sprint) del piloto seleccionado.',
    multiplier: '1.25',
    appliesTo: 'driver',
    isActive: false,
  },
  {
    code: 'CONSISTENCY_BOOST',
    name: 'Consistency Boost',
    description:
      'Reduce el impacto de penalizaciones del activo seleccionado en el GP activado.',
    multiplier: '0.50',
    appliesTo: null,
    isActive: false,
  },
  {
    code: 'LATE_CHARGE',
    name: 'Late Charge',
    description:
      'Aplica un bonus adicional si el activo seleccionado termina en posiciones de top.',
    multiplier: '1.20',
    appliesTo: null,
    isActive: false,
  },
  {
    code: 'TEAM_SYNERGY',
    name: 'Team Synergy',
    description:
      'Otorga bonus si los dos pilotos y el constructor del equipo superan un umbral conjunto en el GP.',
    multiplier: '1.15',
    appliesTo: null,
    isActive: false,
  },
  {
    code: 'UNDERDOG_MULTIPLIER',
    name: 'Underdog Multiplier',
    description:
      'Aumenta puntos de activos de menor valor o menor rendimiento historico en el GP activado.',
    multiplier: '1.25',
    appliesTo: null,
    isActive: false,
  },
  {
    code: 'CLEAN_WEEKEND',
    name: 'Clean Weekend',
    description:
      'Otorga bonus si el equipo no recibe DNF ni penalizaciones durante el GP activado.',
    multiplier: '1.15',
    appliesTo: null,
    isActive: false,
  },
  {
    code: 'STREAK_BOOSTER',
    name: 'Streak Booster',
    description:
      'Escala puntos extra si el activo llega con racha positiva en GPs consecutivos.',
    multiplier: '1.20',
    appliesTo: null,
    isActive: false,
  },
  {
    code: 'WEATHER_GAMBLE',
    name: 'Weather Gamble',
    description:
      'Aplica multiplicador variable en GPs con condiciones climaticas especiales.',
    multiplier: '1.20',
    appliesTo: null,
    isActive: false,
  },
]

export const CONSTRUCTOR_BRANDING: Record<
  string,
  { logoUrl: string; primaryColor: string; contrastColor: string }
> = {
  mercedes: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/mercedes/2026mercedeslogowhite.webp',
    primaryColor: '#27f4d2',
    contrastColor: '#067e6a',
  },
  ferrari: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/ferrari/2026ferrarilogowhite.webp',
    primaryColor: '#e8002d',
    contrastColor: '#5c0012',
  },
  mclaren: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/mclaren/2026mclarenlogowhite.webp',
    primaryColor: '#ff8000',
    contrastColor: '#804000',
  },
  haas: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/haasf1team/2026haasf1teamlogowhite.webp',
    primaryColor: '#dee1e2',
    contrastColor: '#667175',
  },
  alpine: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/alpine/2026alpinelogowhite.webp',
    primaryColor: '#00a1e8',
    contrastColor: '#004e70',
  },
  red_bull: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/redbullracing/2026redbullracinglogowhite.webp',
    primaryColor: '#3671c6',
    contrastColor: '#142948',
  },
  rb: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/racingbulls/2026racingbullslogowhite.webp',
    primaryColor: '#6692ff',
    contrastColor: '#0038c2',
  },
  audi: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/audi/2026audilogowhite.webp',
    primaryColor: '#ff2d00',
    contrastColor: '#751500',
  },
  williams: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/williams/2026williamslogowhite.webp',
    primaryColor: '#1868db',
    contrastColor: '#082145',
  },
  cadillac: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/cadillac/2026cadillaclogowhite.webp',
    primaryColor: '#aaaaad',
    contrastColor: '#58585b',
  },
  aston_martin: {
    logoUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/astonmartin/2026astonmartinlogowhite.webp',
    primaryColor: '#229971',
    contrastColor: '#0f4331',
  },
}

export const DRIVER_PORTRAITS: Record<string, { portraitUrl: string }> = {
  albon: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp',
  },
  alonso: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01right.webp',
  },
  antonelli: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp',
  },
  bearman: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/haasf1team/olibea01/2026haasf1teamolibea01right.webp',
  },
  bortoleto: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp',
  },
  bottas: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/cadillac/valbot01/2026cadillacvalbot01right.webp',
  },
  colapinto: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/alpine/fracol01/2026alpinefracol01right.webp',
  },
  gasly: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/alpine/piegas01/2026alpinepiegas01right.webp',
  },
  hadjar: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp',
  },
  hamilton: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp',
  },
  hulkenberg: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/audi/nichul01/2026audinichul01right.webp',
  },
  lawson: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01right.webp',
  },
  leclerc: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp',
  },
  arvid_lindblad: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp',
  },
  norris: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp',
  },
  ocon: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/haasf1team/estoco01/2026haasf1teamestoco01right.webp',
  },
  piastri: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp',
  },
  perez: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp',
  },
  russell: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp',
  },
  sainz: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp',
  },
  stroll: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01right.webp',
  },
  max_verstappen: {
    portraitUrl:
      'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp',
  },
}
