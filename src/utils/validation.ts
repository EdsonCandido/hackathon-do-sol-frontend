export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export const validateLoginForm = (data: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!data.email.trim()) {
    errors.email = "E-mail é obrigatório.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!data.password.trim()) {
    errors.password = "Senha é obrigatória.";
  } else if (data.password.length < 6) {
    errors.password = "Senha deve ter no mínimo 6 caracteres.";
  }

  return errors;
};

export const hasFormErrors = (errors: LoginFormErrors): boolean =>
  Object.keys(errors).length > 0;
