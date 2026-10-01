import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext"; // Integrando o Contexto
import { useToast } from "@/hooks/use-toast";     // Integrando Toast

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// REMOVIDO o onLogin das props, pois agora o login é global via Contexto
const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth(); // Puxando as funções reais
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        if (mode === "login") {
            await signIn({ email, password });
            toast({ title: "Bem-vindo de volta!" });
            onClose();
        } else {
            // Validações de cadastro
            if (password !== confirmPassword) {
                toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
                setLoading(false);
                return;
            }
            if (!name) {
                toast({ title: "Erro", description: "Preencha seu nome.", variant: "destructive" });
                setLoading(false);
                return;
            }

            await signUp({ name, email, password });
            toast({ title: "Conta criada!", description: "Faça login para continuar." });
            setMode("login"); // Muda para login após cadastro
            setPassword("");
            setConfirmPassword("");
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Ocorreu um erro. Tente novamente.";
        toast({ title: "Erro", description: errorMessage, variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 h-screen">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 h-screen"
        onClick={() => { resetForm(); onClose(); }}
      />

      {/* Modal - Seu Design Original */}
      <div className="absolute right-0 top-0 h-screen w-full max-w-md bg-background border-l border-border animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-light text-foreground uppercase tracking-widest">
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </h2>
          <button
            onClick={() => { resetForm(); onClose(); }}
            className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5 overflow-y-auto">
          
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="auth-name" className="text-sm font-light">Nome</Label>
              <Input
                id="auth-name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-light"
                required={mode === "register"}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="auth-email" className="text-sm font-light">E-mail</Label>
            <Input
              id="auth-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-light"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="auth-password" className="text-sm font-light">Senha</Label>
            <Input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-light"
              required
            />
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="auth-confirm" className="text-sm font-light">Confirmar Senha</Label>
              <Input
                id="auth-confirm"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="font-light"
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full font-light bg-black h-12 text-md" disabled={loading}>
            {loading ? "Processando..." : (mode === "login" ? "ENTRAR" : "CADASTRAR")}
          </Button>

          <div className="text-center pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground font-light">
              {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors font-medium"
              >
                {mode === "login" ? "Criar conta" : "Entrar"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;