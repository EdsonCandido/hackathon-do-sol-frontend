import { IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export const ColorModeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <IconButton
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </IconButton>
  );
};
