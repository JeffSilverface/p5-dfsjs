import { InputField } from "@/components";
import { Button } from "@/components";

export function LoginForm() {
  return (
    <>
      <InputField label="Email" type="email" placeholder="Saisir votre Email" />
      <InputField
        label="Mot de passe"
        type="password"
        placeholder="Saisir votre mot de passe"
      />
      <Button>Se connecter</Button>
    </>
  );
}
