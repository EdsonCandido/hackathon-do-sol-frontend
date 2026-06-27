import type {
  CreateRotaPayload,
  RotaDificuldade,
  RotaResponse,
  RotaStatus,
} from "@/types";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  NativeSelect,
  Portal,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

interface RotaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rota?: RotaResponse | null;
  onSubmit: (payload: CreateRotaPayload) => Promise<void>;
}

interface FormState {
  titulo: string;
  resumo: string;
  descricao: string;
  duracaoDias: string;
  dificuldade: RotaDificuldade;
  status: RotaStatus;
  cidade: string;
}

interface FormErrors {
  titulo?: string;
  resumo?: string;
  descricao?: string;
  duracaoDias?: string;
  cidade?: string;
}

const emptyForm = (): FormState => ({
  titulo: "",
  resumo: "",
  descricao: "",
  duracaoDias: "1",
  dificuldade: "facil",
  status: "rascunho",
  cidade: "",
});

const fromRota = (rota: RotaResponse): FormState => ({
  titulo: rota.titulo,
  resumo: rota.resumo,
  descricao: rota.descricao,
  duracaoDias: String(rota.duracaoDias),
  dificuldade: rota.dificuldade,
  status: rota.status,
  cidade: rota.pontos[0]?.cidade ?? "",
});

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!form.titulo.trim()) errors.titulo = "Título é obrigatório.";
  if (!form.resumo.trim()) errors.resumo = "Resumo é obrigatório.";
  if (!form.descricao.trim()) errors.descricao = "Descrição é obrigatória.";
  if (!form.cidade.trim()) errors.cidade = "Cidade principal é obrigatória.";
  const dias = Number(form.duracaoDias);
  if (!form.duracaoDias.trim() || Number.isNaN(dias) || dias < 1) {
    errors.duracaoDias = "Informe pelo menos 1 dia.";
  }
  return errors;
};

export const RotaFormDialog = ({
  open,
  onOpenChange,
  rota,
  onSubmit,
}: RotaFormDialogProps) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(rota ? fromRota(rota) : emptyForm());
      setErrors({});
    }
  }, [open, rota]);

  const handleChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        titulo: form.titulo.trim(),
        resumo: form.resumo.trim(),
        descricao: form.descricao.trim(),
        duracaoDias: Number(form.duracaoDias),
        dificuldade: form.dificuldade,
        status: form.status,
        cidade: form.cidade.trim(),
      });
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      size={{ base: "full", md: "lg" }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={{ base: 0, md: 4 }}>
          <Dialog.Content maxH={{ base: "100vh", md: "90vh" }} overflow="auto">
            <Dialog.Header>
              <Dialog.Title>{rota ? "Editar rota" : "Nova rota"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" aria-label="Fechar formulário" />
            </Dialog.CloseTrigger>

            <form onSubmit={handleSubmit} noValidate>
              <Dialog.Body>
                <Stack gap={4}>
                  <Field.Root invalid={!!errors.titulo} required>
                    <Field.Label htmlFor="rota-titulo">Título</Field.Label>
                    <Input
                      id="rota-titulo"
                      value={form.titulo}
                      onChange={(e) => handleChange("titulo", e.target.value)}
                      placeholder="Ex.: Roteiro gastronômico pelo Seridó"
                    />
                    {errors.titulo && (
                      <Field.ErrorText>{errors.titulo}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!errors.resumo} required>
                    <Field.Label htmlFor="rota-resumo">Resumo</Field.Label>
                    <Input
                      id="rota-resumo"
                      value={form.resumo}
                      onChange={(e) => handleChange("resumo", e.target.value)}
                      placeholder="Uma frase sobre a rota"
                    />
                    {errors.resumo && (
                      <Field.ErrorText>{errors.resumo}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!errors.descricao} required>
                    <Field.Label htmlFor="rota-descricao">
                      Descrição
                    </Field.Label>
                    <Textarea
                      id="rota-descricao"
                      value={form.descricao}
                      onChange={(e) =>
                        handleChange("descricao", e.target.value)
                      }
                      placeholder="Descreva paradas, experiências e dicas"
                      rows={4}
                    />
                    {errors.descricao && (
                      <Field.ErrorText>{errors.descricao}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Stack direction={{ base: "column", sm: "row" }} gap={4}>
                    <Field.Root
                      invalid={!!errors.duracaoDias}
                      required
                      flex={1}
                    >
                      <Field.Label htmlFor="rota-dias">
                        Duração (dias)
                      </Field.Label>
                      <Input
                        id="rota-dias"
                        type="number"
                        min={1}
                        value={form.duracaoDias}
                        onChange={(e) =>
                          handleChange("duracaoDias", e.target.value)
                        }
                      />
                      {errors.duracaoDias && (
                        <Field.ErrorText>{errors.duracaoDias}</Field.ErrorText>
                      )}
                    </Field.Root>

                    <Field.Root flex={1}>
                      <Field.Label htmlFor="rota-dificuldade">
                        Dificuldade
                      </Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          id="rota-dificuldade"
                          value={form.dificuldade}
                          onChange={(e) =>
                            handleChange(
                              "dificuldade",
                              e.target.value as RotaDificuldade,
                            )
                          }
                        >
                          <option value="facil">Fácil</option>
                          <option value="moderada">Moderada</option>
                          <option value="dificil">Difícil</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                  </Stack>

                  <Stack direction={{ base: "column", sm: "row" }} gap={4}>
                    <Field.Root flex={1}>
                      <Field.Label htmlFor="rota-status">Status</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          id="rota-status"
                          value={form.status}
                          onChange={(e) =>
                            handleChange("status", e.target.value as RotaStatus)
                          }
                        >
                          <option value="rascunho">Rascunho</option>
                          <option value="ativa">Ativa</option>
                          <option value="encerrada">Encerrada</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>

                    <Field.Root invalid={!!errors.cidade} required flex={1}>
                      <Field.Label htmlFor="rota-cidade">
                        Cidade principal
                      </Field.Label>
                      <Input
                        id="rota-cidade"
                        value={form.cidade}
                        onChange={(e) => handleChange("cidade", e.target.value)}
                        placeholder="Ex.: Natal"
                      />
                      {errors.cidade && (
                        <Field.ErrorText>{errors.cidade}</Field.ErrorText>
                      )}
                    </Field.Root>
                  </Stack>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorPalette="green"
                  loading={isSubmitting}
                >
                  {rota ? "Salvar alterações" : "Cadastrar rota"}
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
