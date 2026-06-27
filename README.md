# 🧠 AGENTS.md — Diretrizes do Frontend

## 📌 Visão Geral

SPA (Single Page Application) construída com **React + Vite + TypeScript** focado em mobile - first

### Stack

| Camada      | Tecnologia                    |
| ----------- | ----------------------------- |
| Framework   | React 19 + TypeScript 6       |
| Build       | Vite 8                        |
| UI          | Chakra UI 3 + Emotion         |
| Animações   | Framer Motion                 |
| Roteamento  | React Router DOM 7            |
| Tema        | next-themes                   |
| Ícones      | React Icons + Chakra UI Icons |
| Lint/Format | Biome                         |

---

## 🏗️ Estrutura do Projeto

```
src/
 ├── assets/         # Imagens, fontes, SVGs
 ├── components/     # Componentes reutilizáveis (UI pura)
 ├── context/        # React Contexts (auth, tema, etc.)
 ├── hooks/          # Custom hooks (lógica isolada)
 ├── pages/          # Páginas/telas (composição de componentes)
 ├── routes/         # Definição de rotas e guards
 ├── services/       # Chamadas HTTP centralizadas
 ├── types/          # Tipos e interfaces globais
 └── utils/          # Funções utilitárias puras
```

### Regras de organização

- Cada pasta pode conter `index.ts` para re-exports
- Componentes complexos: criar subpasta com `ComponentName/index.tsx` + `ComponentName.types.ts`
- Hooks sempre prefixados com `use` (ex: `useAuth`, `useClientes`)

---

## 🔒 TypeScript — Regras Obrigatórias

- ✅ Todo código em **TypeScript** (`.ts` / `.tsx`)
- ❌ Arquivos `.js` / `.jsx` proibidos
- ❌ `any` proibido — usar `unknown` quando tipo incerto
- Tipagem explícita obrigatória para:
  - Props de componentes
  - Respostas de API
  - Estados (`useState<T>`)
  - Retornos de hooks
  - Parâmetros de funções utilitárias

### Convenções de tipos

```typescript
// Props → sufixo Props
interface ClienteCardProps { ... }

// Respostas de API → sufixo Response
interface ClienteResponse { ... }

// Payloads de envio → sufixo Request
interface ClienteCreateRequest { ... }
```

---

## 🔐 Autenticação (JWT)

### Fluxo

1. Usuário envia credenciais → API retorna JWT
2. Token armazenado de forma segura (httpOnly cookie preferível, ou state + memory)
3. Interceptor Axios/Fetch injeta `Authorization: Bearer <token>` em toda requisição
4. Erros `401` → redirect para login + limpar estado

### Regras

- ❌ Nunca armazenar token em `localStorage` sem avaliação de risco
- ✅ Interceptar globalmente respostas 401/403
- ✅ Proteger rotas com guard (`PrivateRoute` / `RequireAuth`)
- ✅ Limpar estado de auth ao expirar token

---

## 🌐 Camada de Serviços (API)

### Padrão

- Centralizar todas chamadas HTTP em `/services`
- Um arquivo por domínio: `clienteService.ts`, `authService.ts`
- Usar instância configurada (Axios ou fetch wrapper) com:
  - Base URL via variável de ambiente
  - Interceptors de request (token) e response (erros)
  - Tipagem de request/response

### Exemplo de estrutura

```typescript
// services/clienteService.ts
export const clienteService = {
  listar: (): Promise<ClienteResponse[]> => api.get("/clientes"),
  buscarPorId: (id: string): Promise<ClienteResponse> =>
    api.get(`/clientes/${id}`),
  criar: (data: ClienteCreateRequest): Promise<ClienteResponse> =>
    api.post("/clientes", data),
};
```

---

## 🎨 UI/UX (Chakra UI 3)

### Regras

- ✅ Suportar **dark mode** obrigatoriamente
- ✅ Usar tokens de tema — nunca hardcode de cores
- ✅ Usar componentes nativos do Chakra
- ✅ Feedback visual em toda ação do usuário (toast, loading, skeleton)

### Dark Mode

- Preferência do sistema como padrão inicial
- Toggle manual disponível
- Persistência da escolha via `localStorage` (gerenciado por `next-themes`)

### Boas práticas

- Layout responsivo (mobile-first)
- Inputs com validação visual (erro, sucesso)
- Loading states e skeletons para dados assíncronos
- Animações sutis com Framer Motion para transições

---

## ♿ Acessibilidade

- Usar elementos semânticos (nav, main, section, header, footer)
- Atributos `aria-*` em componentes interativos
- Suporte a navegação por teclado
- Contraste adequado entre texto e fundo (mínimo WCAG AA)
- Labels associados a inputs

---

## 🧩 Componentização

### Princípios

- Componentes pequenos e com responsabilidade única
- Separar lógica (hooks) de apresentação (componentes)
- Evitar lógica de negócio dentro de componentes
- Props bem definidas e documentadas via tipos

### Padrão de nomeação

| Tipo           | Exemplo           |
| -------------- | ----------------- |
| Página         | `ClientesPage`    |
| Componente     | `ClienteCard`     |
| Hook           | `useClientes`     |
| Contexto       | `AuthContext`     |
| Serviço        | `clienteService`  |
| Tipo/Interface | `ClienteResponse` |

---

## 🛡️ Gerenciamento de Estado

### Estratégia

| Escopo        | Solução                    |
| ------------- | -------------------------- |
| Local         | `useState` / `useReducer`  |
| Compartilhado | React Context              |
| Servidor      | React Query / SWR (futuro) |

### Regras

- ❌ Não usar estado global para dados que pertencem a um único componente
- ✅ Context para dados transversais (auth, tema, configs)
- ✅ Derivar estado quando possível (evitar estado duplicado)

---

## ✅ Validação de Formulários

- Validação antes do submit (client-side)
- Mensagens claras e em português
- Campos obrigatórios marcados visualmente
- Validações específicas (CPF, CNPJ, e-mail) quando aplicável
- Considerar uso de Zod para schemas de validação

---

## 🧹 Lint e Formatação (Biome)

### Ferramenta oficial: **Biome**

- Substitui ESLint + Prettier
- Config em `biome.json` na raiz

### Scripts obrigatórios

```json
{
  "scripts": {
    "lint": "biome check .",
    "format": "biome format ."
  }
}
```

### Regras

- ✅ Código sempre formatado e sem erros de lint
- ✅ Rodar lint antes de commits
- ✅ Integrar com pre-commit (husky recomendado)
- ❌ Não commitar código fora do padrão

---

## ⚡ Performance

- Lazy loading de rotas com `React.lazy` + `Suspense`
- Memoização com `useMemo` / `useCallback` quando necessário
- Evitar re-renders desnecessários (verificar com React DevTools)
- Otimizar imagens (formatos modernos: WebP, AVIF)
- Code splitting por rota

---

## 🧪 Testes (guideline)

- Testes unitários para hooks e utils
- Testes de componente para interações críticas
- Ferramentas recomendadas: Vitest + Testing Library
- Cobertura mínima para fluxos críticos (auth, formulários)

---

## 📝 Documentação (/docs)

### Regra geral

- ✅ Toda interação (feature, bugfix, refactor) DEVE gerar documentação
- 📁 Documentação salva em `/docs`

### Estrutura

```
docs/
 ├── evolutiva/       # Evolução do projeto (features, bugfixes)
 ├── prs_commits/     # Pull Requests e padrões de commit
 └── nome-da-tarefa/  # Documentação específica por tarefa
```

### Nome dos arquivos

```
YYYY-MM-DD_nome-da-tarefa.md
```

### Conteúdo mínimo

```md
# Nome da tarefa

## Objetivo

Descrever o que foi feito

## Alterações

- Lista de mudanças realizadas

## Telas/Componentes afetados

- ComponenteX
- PáginaY

## Regras de negócio

- Descrever regras implementadas

## Observações

- Decisões técnicas relevantes
```

### Regras

- ❌ Não finalizar tarefa sem documentação
- ✅ PRs devem ter arquivo em `/docs/prs_commits`
- ✅ Commits seguem padrão definido em `padrao-commits.md`

---

## 🔧 Variáveis de Ambiente

- Prefixo obrigatório: `VITE_`
- Arquivo `.env` na raiz (não commitado)
- Arquivo `.env.example` commitado com chaves sem valores
- Acessar via `import.meta.env.VITE_*`

---

## 🚫 Anti-patterns (proibido)

- ❌ Arquivos `.js` / `.jsx`
- ❌ Uso de `any`
- ❌ Hardcode de cores (quebra dark mode)
- ❌ Lógica de negócio em componentes
- ❌ Chamadas HTTP fora de `/services`
- ❌ Estado global para dados locais
- ❌ Commits sem seguir padrão
- ❌ Código sem lint/formatação
- ❌ Não documentar alterações

---

## 🧭 Princípios

- Simplicidade primeiro
- Clareza > abstração desnecessária
- Consistência > preferência pessoal
- Acessibilidade desde o início
- Performance planejada, não improvisada

---

## 📌 Observação Final

Decisões fora deste padrão devem ser:

1. Justificadas tecnicamente
2. Documentadas
3. Validadas antes da implementação
