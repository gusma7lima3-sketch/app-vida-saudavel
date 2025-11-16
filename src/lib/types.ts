// Tipos do sistema de vida saudável

export type Gender = 'male' | 'female';
export type SubscriptionTier = 'free' | 'basic' | 'pro';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  age: number;
  weight: number; // kg
  height: number; // cm
  goal: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_health';
  createdAt: Date;
}

export interface UserProgress {
  userId: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalPoints: number;
  streak: number; // dias consecutivos
  lastWorkoutDate: string | null;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'balance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutos
  caloriesBurn: number;
  gender: Gender | 'both';
  requiredLevel: number;
  xpReward: number;
  pointsReward: number;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  exerciseId: string;
  completedAt: Date;
  xpEarned: number;
  pointsEarned: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'skip_day' | 'cheat_meal';
  icon: string;
}

export interface Subscription {
  userId: string;
  tier: SubscriptionTier;
  price: number;
  discountCode?: string;
  expiresAt: Date;
  isActive: boolean;
}

export interface DiscountCode {
  code: string;
  discountedPrice: number;
  duration: number; // dias
  type: 'discount' | 'free';
}
