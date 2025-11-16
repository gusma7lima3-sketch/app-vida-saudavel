import { Exercise, Reward, DiscountCode } from './types';

// Base de exercícios diferenciados por gênero
export const EXERCISES: Exercise[] = [
  // Exercícios para Homens - Iniciante
  {
    id: 'male-1',
    name: 'Flexões',
    description: 'Flexões de braço no chão, 3 séries de 10 repetições',
    category: 'strength',
    difficulty: 'beginner',
    duration: 10,
    caloriesBurn: 50,
    gender: 'male',
    requiredLevel: 1,
    xpReward: 20,
    pointsReward: 10,
  },
  {
    id: 'male-2',
    name: 'Agachamento Livre',
    description: 'Agachamentos sem peso, 3 séries de 15 repetições',
    category: 'strength',
    difficulty: 'beginner',
    duration: 12,
    caloriesBurn: 60,
    gender: 'male',
    requiredLevel: 1,
    xpReward: 25,
    pointsReward: 12,
  },
  {
    id: 'male-3',
    name: 'Corrida Leve',
    description: 'Corrida em ritmo moderado por 20 minutos',
    category: 'cardio',
    difficulty: 'beginner',
    duration: 20,
    caloriesBurn: 150,
    gender: 'male',
    requiredLevel: 2,
    xpReward: 40,
    pointsReward: 20,
  },
  {
    id: 'male-4',
    name: 'Prancha',
    description: 'Prancha isométrica, 3 séries de 30 segundos',
    category: 'strength',
    difficulty: 'intermediate',
    duration: 8,
    caloriesBurn: 40,
    gender: 'male',
    requiredLevel: 3,
    xpReward: 35,
    pointsReward: 18,
  },
  {
    id: 'male-5',
    name: 'Burpees',
    description: 'Burpees completos, 3 séries de 10 repetições',
    category: 'cardio',
    difficulty: 'advanced',
    duration: 15,
    caloriesBurn: 120,
    gender: 'male',
    requiredLevel: 5,
    xpReward: 60,
    pointsReward: 30,
  },

  // Exercícios para Mulheres - Iniciante
  {
    id: 'female-1',
    name: 'Flexões Modificadas',
    description: 'Flexões com joelhos apoiados, 3 séries de 8 repetições',
    category: 'strength',
    difficulty: 'beginner',
    duration: 10,
    caloriesBurn: 40,
    gender: 'female',
    requiredLevel: 1,
    xpReward: 20,
    pointsReward: 10,
  },
  {
    id: 'female-2',
    name: 'Agachamento Sumo',
    description: 'Agachamento com pernas abertas, 3 séries de 12 repetições',
    category: 'strength',
    difficulty: 'beginner',
    duration: 12,
    caloriesBurn: 55,
    gender: 'female',
    requiredLevel: 1,
    xpReward: 25,
    pointsReward: 12,
  },
  {
    id: 'female-3',
    name: 'Caminhada Rápida',
    description: 'Caminhada em ritmo acelerado por 25 minutos',
    category: 'cardio',
    difficulty: 'beginner',
    duration: 25,
    caloriesBurn: 120,
    gender: 'female',
    requiredLevel: 2,
    xpReward: 40,
    pointsReward: 20,
  },
  {
    id: 'female-4',
    name: 'Glúteos na Ponte',
    description: 'Elevação de quadril, 3 séries de 15 repetições',
    category: 'strength',
    difficulty: 'intermediate',
    duration: 10,
    caloriesBurn: 50,
    gender: 'female',
    requiredLevel: 3,
    xpReward: 35,
    pointsReward: 18,
  },
  {
    id: 'female-5',
    name: 'Jump Squats',
    description: 'Agachamento com salto, 3 séries de 10 repetições',
    category: 'cardio',
    difficulty: 'advanced',
    duration: 12,
    caloriesBurn: 100,
    gender: 'female',
    requiredLevel: 5,
    xpReward: 60,
    pointsReward: 30,
  },

  // Exercícios Unissex
  {
    id: 'both-1',
    name: 'Alongamento Completo',
    description: 'Rotina de alongamento de corpo inteiro',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 15,
    caloriesBurn: 30,
    gender: 'both',
    requiredLevel: 1,
    xpReward: 15,
    pointsReward: 8,
  },
  {
    id: 'both-2',
    name: 'Yoga Básico',
    description: 'Sequência de yoga para iniciantes',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 20,
    caloriesBurn: 60,
    gender: 'both',
    requiredLevel: 2,
    xpReward: 30,
    pointsReward: 15,
  },
];

// Sistema de recompensas
export const REWARDS: Reward[] = [
  {
    id: 'skip-1',
    name: 'Pular 1 Dia',
    description: 'Pule um dia de exercícios sem perder pontos',
    pointsCost: 100,
    type: 'skip_day',
    icon: 'Calendar',
  },
  {
    id: 'cheat-1',
    name: 'Refeição Livre',
    description: 'Uma refeição sem restrições',
    pointsCost: 150,
    type: 'cheat_meal',
    icon: 'Utensils',
  },
  {
    id: 'skip-3',
    name: 'Pular 3 Dias',
    description: 'Pule três dias de exercícios sem perder pontos',
    pointsCost: 250,
    type: 'skip_day',
    icon: 'CalendarDays',
  },
];

// Sistema de cupons de desconto
export const DISCOUNT_CODES: DiscountCode[] = [
  { code: 'gusma1', discountedPrice: 27, duration: 30, type: 'discount' },
  { code: 'gusma4', discountedPrice: 27, duration: 30, type: 'discount' },
  { code: 'gusma7', discountedPrice: 27, duration: 30, type: 'discount' },
  { code: 'gusmaa1', discountedPrice: 27, duration: 30, type: 'discount' },
  { code: 'gusmaa4', discountedPrice: 27, duration: 30, type: 'discount' },
  { code: 'gusmaa7', discountedPrice: 27, duration: 30, type: 'discount' },
  { code: 'gusma._.lima', discountedPrice: 0, duration: 365, type: 'free' },
];

// Função para calcular XP necessário para próximo nível
export function calculateXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Função para validar cupom
export function validateDiscountCode(code: string): DiscountCode | null {
  return DISCOUNT_CODES.find(dc => dc.code.toLowerCase() === code.toLowerCase()) || null;
}

// Função para filtrar exercícios por gênero e nível
export function getAvailableExercises(gender: 'male' | 'female', level: number): Exercise[] {
  return EXERCISES.filter(
    ex => (ex.gender === gender || ex.gender === 'both') && ex.requiredLevel <= level
  );
}
