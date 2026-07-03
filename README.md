# 🏢 Auxiliadora Digital - App Híbrido

Este é o aplicativo unificado da Auxiliadora Predial, desenvolvido em **React Native com Expo**. O sistema foi pensado para unificar o acesso dos usuários (Moradores, Síndicos, Proprietários, etc.) em uma única plataforma híbrida, suportando **Web + iOS + Android**.

## 🛠️ Tecnologias Utilizadas

- **Framework:** React Native com Expo
- **Navegação:** React Navigation (Native Stack)
- **Backend/BaaS:** Supabase
- **Autenticação e Banco:** Supabase (banco real com dados simulados/fictícios)
- **Armazenamento Seguro:**
  - Mobile: `expo-secure-store`
  - Web: `@react-native-async-storage/async-storage`
- **Linguagem:** TypeScript

## ✨ Visão Geral

O app oferece um fluxo de login centralizado por CPF, identificação de conta, seleção de condomínios vinculados e painel de dashboard contextualizado ao papel do usuário. A experiência é projetada para ser fluida em dispositivos móveis e no navegador, com foco em:

- acesso rápido por CPF;
- segurança híbrida de armazenamento;
- persistência de sessão e estado de navegação;
- interface limpa e modular.

## 🚀 Principais Funcionalidades

### 1. Login Unificado por CPF

- O usuário insere o CPF na `IdentificacaoScreen`.
- O `authService.identificarPorCpf` consulta a tabela `usuarios` no Supabase.
- Se o CPF existir, o app segue para a `SenhaScreen` exibindo o CPF mascarado e o nome do usuário.
- Se não existir, o componente `ModalBloqueio` é exibido.

### 2. Cofre Inteligente (Storage Service Híbrido)

O serviço `src/services/storageService.ts` abstrai o armazenamento entre Web e Mobile:

- `Platform.OS === 'web'` → `AsyncStorage`
- mobile → `expo-secure-store`

Isso garante que dados sensíveis como senha e sessão sejam tratados com segurança no celular, e que o Web possa persistir estado entre recargas.

### 3. Login Automático e Auto-preenchimento

- Ao autenticar com sucesso, a senha é salva em `@senha_{cpf}`.
- Na próxima tentativa com o mesmo CPF, o `SenhaScreen` busca automaticamente a senha guardada e injeta no campo.
- Resultado: o usuário recebe uma experiência tipo "preenchimento automático".

### 4. Persistência de Estado de Navegação

O app salva o estado de navegação atual em `@estado_navegacao` sempre que o `NavigationContainer` muda.

- Se o usuário atualizar a página no navegador (F5), a rota atual é restaurada.
- Se já houver sessão ativa (`@usuario_logado`), o app inicia direto em `Condominios`.

### 5. Logout Seguro

O logout limpa ativamente:

- `@usuario_logado`
- `@estado_navegacao`

A senha salva no cofre permanece para possibilitar auto-preenchimento futuro, removida apenas via exclusão manual ou limpeza de cache.

## 📂 Arquitetura de Telas

1. `IdentificacaoScreen` — valida o CPF.
2. `SenhaScreen` — valida ou auto-preenche a senha.
3. `CondominiosScreen` — lista condomínios associados ao CPF.
4. `DashboardScreen` — apresenta funcionalidades filtradas pelo papel do usuário.

## 📁 Estrutura do Projeto

- `src/components` — componentes visuais reutilizáveis (`Botao`, `CampoTexto`, `ModalBloqueio`, `ModalConta`).
- `src/hooks` — hooks customizados (`useIdentificacao`).
- `src/screens` — telas principais do app.
- `src/services` — regras de autenticação, persistência e Supabase.
- `src/theme` — tokens de design e estilos.
- `src/utils` — utilitários como máscara de CPF.

## 🔧 Como o App Funciona

### `src/services/authService.ts`

- `identificarPorCpf(cpfNumeros)`:
  - consulta `usuarios` no Supabase;
  - retorna `ACESSO_DIRETO` com nome e CPF mascarado;
  - ou `BLOQUEIO` caso não encontre conta.

- `autenticar(cpfNumeros, senhaDigitada)`:
  - valida a combinação CPF + senha no Supabase.

- `listarCondominios(cpfUsuario)`:
  - consulta a view `vinculos` com relacionamento para `condominios`.

### `src/services/storageService.ts`

- `salvar(chave, valor)`
- `ler(chave)`
- `remover(chave)`

A mesma API funciona no navegador e no app nativo, mantendo a lógica de persistência independente da plataforma.

### `src/hooks/useIdentificacao.ts`

- isola a lógica de CPF, validação e fluxo de navegação.
- aplica máscara de CPF com `aplicarMascaraCpf`.
- faz a transição para `SenhaScreen` ou exibe `ModalBloqueio`.

### Filtragem de Módulos no `DashboardScreen`

- A lista `modulosOficiais` contém grupos de funcionalidades e regras de papel.
- O `useMemo` filtra itens usando `papeis.toLowerCase().includes(papelUsuario)` ou `todos`.
- Apenas os módulos compatíveis com o papel do usuário aparecem na tela.

## ✅ Instalação & Execução

Siga estes passos para clonar e executar o projeto localmente (substitua a URL do repositório pela sua):

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/Patriciasdr/auxi-desafio.git
cd auxi-login
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o Expo (modo interativo):

```bash
npx expo start
```

Comandos úteis por plataforma:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

Observação: os scripts equivalentes também estão disponíveis em `package.json` (por exemplo, `npm run android`).

## 📌 Observações

- O projeto usa **Expo SDK 54** e **React Native 0.81.5**.
- A aplicação está configurada para funcionar em **web** e **mobile**.
- A chave Supabase está definida em `src/services/supabaseClient.ts`.
- O app persiste a sessão em `@usuario_logado` e restaura navegação em `@estado_navegacao`.

## 🔑 Credenciais de Teste

Os dados do Supabase deste projeto são fictícios e usados apenas para testes. Credenciais pré-carregadas:

- CPF: `1111` — Senha: `Maria123`
- CPF: `22222` — Senha: `Joao123`

Use essas credenciais apenas em ambiente de desenvolvimento.

