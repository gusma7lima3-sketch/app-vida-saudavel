'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, UserProgress, Exercise } from '@/lib/types';
import { getAvailableExercises, calculateXPForLevel, REWARDS } from '@/lib/exercises';
import LevelProgress from '@/components/custom/LevelProgress';
import ExerciseCard from '@/components/custom/ExerciseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Flame, Calendar, ShoppingCart, Camera, Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  useEffect(() => {
    // Carregar dados do localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedProgress = localStorage.getItem('userProgress');
    const savedCompleted = localStorage.getItem('completedExercises');

    if (!savedProfile) {
      router.push('/onboarding');
      return;
    }

    const userProfile = JSON.parse(savedProfile);
    const userProgress = JSON.parse(savedProgress);
    const completed = savedCompleted ? JSON.parse(savedCompleted) : [];

    setProfile(userProfile);
    setProgress(userProgress);
    setCompletedToday(completed);

    // Carregar exercícios disponíveis
    const exercises = getAvailableExercises(userProfile.gender, userProgress.level);
    setAvailableExercises(exercises);
  }, [router]);

  const handleCompleteExercise = (exercise: Exercise) => {
    if (!progress || !profile) return;

    // Adicionar aos completados
    const newCompleted = [...completedToday, exercise.id];
    setCompletedToday(newCompleted);
    localStorage.setItem('completedExercises', JSON.stringify(newCompleted));

    // Atualizar progresso
    const newXP = progress.currentXP + exercise.xpReward;
    const newPoints = progress.totalPoints + exercise.pointsReward;
    let newLevel = progress.level;
    let remainingXP = newXP;

    // Verificar se subiu de nível
    while (remainingXP >= progress.xpToNextLevel) {
      remainingXP -= progress.xpToNextLevel;
      newLevel += 1;
    }

    const newProgress = {
      ...progress,
      level: newLevel,
      currentXP: remainingXP,
      xpToNextLevel: calculateXPForLevel(newLevel),
      totalPoints: newPoints,
      lastWorkoutDate: new Date().toISOString(),
    };

    setProgress(newProgress);
    localStorage.setItem('userProgress', JSON.stringify(newProgress));

    // Atualizar exercícios disponíveis se subiu de nível
    if (newLevel > progress.level) {
      const exercises = getAvailableExercises(profile.gender, newLevel);
      setAvailableExercises(exercises);
    }
  };

  const handleRedeemReward = (pointsCost: number) => {
    if (!progress || progress.totalPoints < pointsCost) return;

    const newProgress = {
      ...progress,
      totalPoints: progress.totalPoints - pointsCost,
    };

    setProgress(newProgress);
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
    alert('Recompensa resgatada com sucesso!');
  };

  if (!profile || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FitLife
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Olá, {profile.name}!</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/subscription')}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Modo PRO</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Card */}
        <div className="mb-8">
          <LevelProgress
            level={progress.level}
            currentXP={progress.currentXP}
            xpToNextLevel={progress.xpToNextLevel}
            totalPoints={progress.totalPoints}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sequência</p>
                <p className="text-2xl font-bold">{progress.streak} dias</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hoje</p>
                <p className="text-2xl font-bold">{completedToday.length} exercícios</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Trophy className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pontos</p>
                <p className="text-2xl font-bold">{progress.totalPoints}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="exercises" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="exercises">Exercícios</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="scanner">Scanner</TabsTrigger>
          </TabsList>

          {/* Exercícios */}
          <TabsContent value="exercises" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Exercícios Disponíveis</h2>
              <Badge variant="outline">
                Nível {progress.level} - {profile.gender === 'male' ? 'Masculino' : 'Feminino'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onComplete={handleCompleteExercise}
                  isCompleted={completedToday.includes(exercise.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Recompensas */}
          <TabsContent value="rewards" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Loja de Recompensas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REWARDS.map((reward) => (
                <Card key={reward.id} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{reward.name}</CardTitle>
                      <ShoppingCart className="w-5 h-5 text-emerald-500" />
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-purple-500" />
                        <span className="text-2xl font-bold">{reward.pointsCost}</span>
                      </div>
                      <Badge variant="outline">pontos</Badge>
                    </div>
                    <Button
                      onClick={() => handleRedeemReward(reward.pointsCost)}
                      disabled={progress.totalPoints < reward.pointsCost}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                    >
                      {progress.totalPoints >= reward.pointsCost ? 'Resgatar' : 'Pontos Insuficientes'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scanner */}
          <TabsContent value="scanner">
            <Card className="text-center py-12">
              <CardContent>
                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <CardTitle className="mb-2">Scanner de Alimentos</CardTitle>
                <CardDescription className="mb-6">
                  Tire uma foto da sua comida para ver as calorias
                </CardDescription>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  Disponível no Modo PRO
                </Badge>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
