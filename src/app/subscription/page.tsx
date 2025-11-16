'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { validateDiscountCode } from '@/lib/exercises';
import { Check, Sparkles, Zap, Camera, Brain } from 'lucide-react';

export default function SubscriptionPage() {
  const router = useRouter();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [error, setError] = useState('');

  const basePrice = 57;
  const finalPrice = appliedDiscount ? appliedDiscount.discountedPrice : basePrice;

  const handleApplyCode = () => {
    const discount = validateDiscountCode(discountCode);
    if (discount) {
      setAppliedDiscount(discount);
      setError('');
    } else {
      setError('Código inválido');
      setAppliedDiscount(null);
    }
  };

  const handleSubscribe = () => {
    // Salvar assinatura
    const subscription = {
      tier: 'pro',
      price: finalPrice,
      discountCode: appliedDiscount?.code,
      expiresAt: new Date(Date.now() + (appliedDiscount?.duration || 30) * 24 * 60 * 60 * 1000),
      isActive: true,
    };
    localStorage.setItem('subscription', JSON.stringify(subscription));
    alert('Assinatura ativada com sucesso!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Desbloqueie o Modo PRO
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tenha acesso a recursos exclusivos e IA treinador pessoal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Plano Básico */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Plano Básico</CardTitle>
              <CardDescription>Recursos essenciais para começar</CardDescription>
              <div className="text-3xl font-bold mt-4">R$ 27</div>
              <p className="text-sm text-gray-600 mt-1">Parcelável em até 12x</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Exercícios básicos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Sistema de níveis e pontos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Loja de recompensas</span>
              </div>
              <Button
                onClick={() => {
                  const subscription = {
                    tier: 'basic',
                    price: 27,
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    isActive: true,
                  };
                  localStorage.setItem('subscription', JSON.stringify(subscription));
                  alert('Assinatura ativada com sucesso!');
                  router.push('/');
                }}
                className="w-full mt-4"
                variant="outline"
              >
                Assinar por R$ 27
              </Button>
            </CardContent>
          </Card>

          {/* Plano PRO */}
          <Card className="border-4 border-purple-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                Plano PRO
              </CardTitle>
              <CardDescription>Todos os recursos + IA treinador</CardDescription>
              <div className="mt-4">
                {appliedDiscount ? (
                  <div>
                    <div className="text-2xl line-through text-gray-400">R$ {basePrice}</div>
                    <div className="text-4xl font-bold text-purple-600">
                      R$ {finalPrice}
                      {finalPrice === 0 && <Badge className="ml-2 bg-emerald-500">GRÁTIS</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Válido por {appliedDiscount.duration} dias
                    </p>
                  </div>
                ) : (
                  <div className="text-4xl font-bold">R$ {basePrice}</div>
                )}
                <p className="text-sm text-gray-600 mt-1">Parcelável em até 12x</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-purple-500" />
                <span className="font-semibold">Tudo do plano básico</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-500" />
                <span>Scanner de alimentos com IA</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <span>IA Treinador Pessoal 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <span>Dietas personalizadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-purple-500" />
                <span>Sugestões baseadas na sua geladeira</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-purple-500" />
                <span>Exercícios avançados ilimitados</span>
              </div>

              <div className="pt-6 space-y-4">
                <div>
                  <Label htmlFor="discount">Código de Desconto (Privado)</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="discount"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Digite seu código"
                      className="flex-1"
                    />
                    <Button onClick={handleApplyCode} variant="outline">
                      Aplicar
                    </Button>
                  </div>
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                  {appliedDiscount && (
                    <p className="text-sm text-emerald-600 mt-1">
                      ✓ Código aplicado com sucesso!
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
                >
                  {finalPrice === 0 ? 'Ativar Grátis' : `Assinar por R$ ${finalPrice}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => router.push('/')}>
            Voltar para o Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
