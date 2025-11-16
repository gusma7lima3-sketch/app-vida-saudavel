'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Zap } from 'lucide-react';

interface LevelProgressProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalPoints: number;
}

export default function LevelProgress({ level, currentXP, xpToNextLevel, totalPoints }: LevelProgressProps) {
  const progressPercentage = (currentXP / xpToNextLevel) * 100;

  return (
    <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold">Nível {level}</h2>
            <p className="text-emerald-100 text-sm">Continue assim!</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Trophy className="w-5 h-5" />
              <span className="text-2xl font-bold">{totalPoints}</span>
            </div>
            <p className="text-emerald-100 text-xs">Pontos Totais</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Experiência</span>
            </div>
            <span className="font-semibold">
              {currentXP} / {xpToNextLevel} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-emerald-300" />
          <p className="text-xs text-emerald-100 text-right">
            {xpToNextLevel - currentXP} XP para o próximo nível
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
