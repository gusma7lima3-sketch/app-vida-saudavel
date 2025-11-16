'use client';

import { Exercise } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, Trophy, Zap } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete: (exercise: Exercise) => void;
  isCompleted?: boolean;
}

export default function ExerciseCard({ exercise, onComplete, isCompleted }: ExerciseCardProps) {
  const categoryColors = {
    cardio: 'bg-red-500',
    strength: 'bg-blue-500',
    flexibility: 'bg-purple-500',
    balance: 'bg-green-500',
  };

  const difficultyColors = {
    beginner: 'bg-emerald-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500',
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-xl ${isCompleted ? 'opacity-60 border-emerald-500' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{exercise.name}</CardTitle>
            <CardDescription className="mt-1">{exercise.description}</CardDescription>
          </div>
          {isCompleted && (
            <Badge className="bg-emerald-500 text-white">
              Completo
            </Badge>
          )}
        </div>
        <div className="flex gap-2 mt-3">
          <Badge className={categoryColors[exercise.category]}>
            {exercise.category === 'cardio' && 'Cardio'}
            {exercise.category === 'strength' && 'Força'}
            {exercise.category === 'flexibility' && 'Flexibilidade'}
            {exercise.category === 'balance' && 'Equilíbrio'}
          </Badge>
          <Badge variant="outline" className={difficultyColors[exercise.difficulty]}>
            {exercise.difficulty === 'beginner' && 'Iniciante'}
            {exercise.difficulty === 'intermediate' && 'Intermediário'}
            {exercise.difficulty === 'advanced' && 'Avançado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{exercise.duration} min</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{exercise.caloriesBurn} cal</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>+{exercise.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-4 h-4 text-purple-500" />
            <span>+{exercise.pointsReward} pts</span>
          </div>
        </div>
        <Button
          onClick={() => onComplete(exercise)}
          disabled={isCompleted}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50"
        >
          {isCompleted ? 'Exercício Completo' : 'Completar Exercício'}
        </Button>
      </CardContent>
    </Card>
  );
}
