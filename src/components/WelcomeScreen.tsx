import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Music } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (userName: string) => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-primary/5 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao BandLy</h1>
          <p className="text-muted-foreground">
            Gerencie sua banda e ministério de louvor de forma simples e eficiente
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base">
              Como podemos te chamar?
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="mt-2"
              required
              autoFocus
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Começar
          </Button>
        </form>
      </Card>
    </div>
  );
}
