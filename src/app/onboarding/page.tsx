'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile, Gender } from '@/lib/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male' as Gender,
    age: '',
    weight: '',
    height: '',
    goal: 'improve_health',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salvar dados no localStorage
    const profile: UserProfile = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      goal: formData.goal as any,
      createdAt: new Date(),
    };

    const progress = {
      userId: profile.id,
      level: 1,
      currentXP: 0,
      xpToNextLevel: 100,
      totalPoints: 0,
      streak: 0,
      lastWorkoutDate: null,
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('userProgress', JSON.stringify(progress));
    localStorage.setItem('completedExercises', JSON.stringify([]));

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Bem-vindo ao FitLife
          </CardTitle>
          <CardDescription className="text-lg">
            Vamos começar sua jornada de vida saudável
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <Label>Gênero</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={formData.gender === 'male' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, gender: 'male' })}
                    >
                      Masculino
                    </Button>
                    <Button
                      type="button"
                      variant={formData.gender === 'female' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, gender: 'female' })}
                    >
                      Feminino
                    </Button>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  Próximo
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="25"
                      min="10"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="175"
                    />
                  </div>
                </div>

                <div>
                  <Label>Seu Objetivo</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {[
                      { value: 'lose_weight', label: 'Perder Peso' },
                      { value: 'gain_muscle', label: 'Ganhar Músculo' },
                      { value: 'maintain', label: 'Manter Forma' },
                      { value: 'improve_health', label: 'Melhorar Saúde' },
                    ].map((goal) => (
                      <Button
                        key={goal.value}
                        type="button"
                        variant={formData.goal === goal.value ? 'default' : 'outline'}
                        onClick={() => setFormData({ ...formData, goal: goal.value })}
                        className="h-auto py-3"
                      >
                        {goal.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    Começar Jornada
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
