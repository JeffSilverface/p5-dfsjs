"use client";

import { InputField } from "@/components/atoms/inputField";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  return (
    <div className="flex flex-col gap-6">
      <InputField id="name" label="Nom" type="text" placeholder="Votre nom" />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Votre Email"
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
      />
      <Button>Créer un compte</Button>
    </div>
  );
}
