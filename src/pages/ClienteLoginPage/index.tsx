import { useAuth } from "@/hooks/useAuth";
import {
  type LoginFormData,
  type LoginFormErrors,
  hasFormErrors,
  validateLoginForm,
} from "@/utils/validation";
import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { FormEvent } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const MotionCard = motion.create(Card.Root);

const APP_NAME = import.meta.env.VITE_APP_NAME ?? "Descubra RN";

export const ClienteLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(formData);
    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const authenticatedUser = await login(formData);
      const destination =
        authenticatedUser.role === "cliente"
          ? "/minha-conta"
          : "/admin/dashboard";
      navigate(destination, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao fazer login.";
      setErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      w="full"
      align="center"
      justify="center"
      bg="bg.subtle"
      p={4}
    >
      <MotionCard
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        w="full"
        maxW="420px"
        mx="auto"
        variant="outline"
        shadow="lg"
      >
        <Card.Header textAlign="center" pb={2}>
          <Flex
            align="center"
            justify="center"
            w={14}
            h={14}
            mx="auto"
            mb={4}
            borderRadius="xl"
            bg="blue.900"
            color="white"
            fontWeight="bold"
            fontSize="2xl"
          >
            RN
          </Flex>
          <Heading size="lg">{APP_NAME}</Heading>
          <Text color="fg.muted" mt={1}>
            Entre com sua conta — perfil definido pelas credenciais
          </Text>
        </Card.Header>

        <Card.Body w="full">
          <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>
            <VStack gap={4} align="stretch" w="full">
              {errors.general && (
                <Box
                  p={3}
                  borderRadius="md"
                  bg="red.subtle"
                  color="red.fg"
                  fontSize="sm"
                  role="alert"
                  w="100%"
                  textAlign="center"
                >
                  {errors.general}
                </Box>
              )}

              <Field.Root invalid={!!errors.email} required w="full">
                <Field.Label htmlFor="cliente-email">E-mail</Field.Label>
                <Flex align="center" position="relative" w="full">
                  <Box
                    position="absolute"
                    left={3}
                    color="fg.muted"
                    zIndex={1}
                    pointerEvents="none"
                  >
                    <FiMail aria-hidden />
                  </Box>
                  <Input
                    id="cliente-email"
                    type="email"
                    placeholder="seu@email.com"
                    pl={10}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    autoComplete="email"
                  />
                </Flex>
                {errors.email && (
                  <Field.ErrorText>{errors.email}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.password} required w="full">
                <Field.Label htmlFor="cliente-password">Senha</Field.Label>
                <Flex align="center" position="relative" w="full">
                  <Box
                    position="absolute"
                    left={3}
                    color="fg.muted"
                    zIndex={1}
                    pointerEvents="none"
                  >
                    <FiLock aria-hidden />
                  </Box>
                  <Input
                    id="cliente-password"
                    type="password"
                    placeholder="••••••••"
                    pl={10}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    autoComplete="current-password"
                  />
                </Flex>
                {errors.password && (
                  <Field.ErrorText>{errors.password}</Field.ErrorText>
                )}
              </Field.Root>

              <Button
                type="submit"
                colorPalette="blue"
                w="full"
                loading={isSubmitting}
                mt={2}
              >
                Entrar
              </Button>

              <Text fontSize="xs" color="fg.muted" textAlign="center">
                Demo cliente: cliente@exemplo.com / 123456
                <br />
                Demo admin: admin@solpotiguar.com / 123456
              </Text>

              <Button asChild variant="ghost" size="sm">
                <Link to="/">Voltar ao site</Link>
              </Button>
            </VStack>
          </form>
        </Card.Body>
      </MotionCard>
    </Flex>
  );
};
