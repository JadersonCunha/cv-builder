# Configuração do Google OAuth para CV Builder

## ⚠️ IMPORTANTE: O sistema já funciona em MODO DEMO!

O CV Builder já está funcionando com um usuário demo. Para ativar o login real com Google, siga os passos abaixo.

## Passo a Passo para Configurar o Login com Google

### 1. Criar um Projeto no Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Criar Projeto" ou selecione um projeto existente
3. Dê um nome ao seu projeto (ex: "CV Builder")

### 2. Ativar a API do Google Identity

1. No menu lateral, vá em "APIs e Serviços" > "Biblioteca"
2. Procure por "Google Identity" ou "Google Sign-In API"
3. Clique em "Ativar"

### 3. Configurar a Tela de Consentimento OAuth

1. Vá em "APIs e Serviços" > "Tela de consentimento OAuth"
2. Escolha "Externo" (para usuários de qualquer conta Google)
3. Preencha as informações obrigatórias:
   - Nome do aplicativo: "CV Builder"
   - Email de suporte do usuário: seu email
   - Domínios autorizados: adicione seu domínio (se tiver)
   - Email de contato do desenvolvedor: seu email

### 4. Criar Credenciais OAuth 2.0

1. Vá em "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "ID do cliente OAuth 2.0"
3. Escolha "Aplicativo da Web"
4. Configure:
   - Nome: "CV Builder Web Client"
   - Origens JavaScript autorizadas:
     - `http://localhost:3000` (para desenvolvimento local)
     - `http://127.0.0.1:3000` (para desenvolvimento local)
     - Seu domínio de produção (quando publicar)
   - URIs de redirecionamento autorizados:
     - `http://localhost:3000` (para desenvolvimento local)
     - Seu domínio de produção (quando publicar)

### 5. Copiar o Client ID

1. Após criar, copie o "Client ID" que aparece
2. No arquivo `app.js`, substitua o Client ID demo pelo Client ID real:

```javascript
// Linha 4 do app.js - substitua por:
const GOOGLE_CLIENT_ID = 'seu-client-id-aqui.apps.googleusercontent.com';
```

### 6. Testar Localmente

1. Abra o arquivo `index.html` em um servidor local
2. Você pode usar:
   - Live Server (extensão do VS Code)
   - Python: `python -m http.server 3000`
   - Node.js: `npx serve -p 3000`

### 7. Domínios para Produção

Quando publicar seu site, adicione o domínio real nas configurações do Google Cloud Console:
- Origens JavaScript autorizadas: `https://seudominio.com`
- URIs de redirecionamento: `https://seudominio.com`

## Funcionalidades Implementadas

✅ **Modo Demo**: Funciona imediatamente sem configuração
✅ **Login com Google**: Autenticação real usando Google OAuth (após configuração)
✅ **Preenchimento Automático**: Nome e email são preenchidos automaticamente
✅ **Persistência**: Login mantido entre sessões
✅ **Logout Seguro**: Desconecta da conta Google
✅ **Interface Responsiva**: Funciona em desktop e mobile
✅ **Segurança**: Dados do usuário armazenados localmente de forma segura
✅ **Fallback Inteligente**: Se Google OAuth não estiver configurado, usa modo demo

## Dados Obtidos do Google

O sistema obtém as seguintes informações do usuário:
- Nome completo
- Email
- Foto de perfil
- ID único do Google

## Segurança

- O Client ID pode ser público (não é um segredo)
- Os dados ficam apenas no navegador do usuário
- Não há servidor backend, tudo funciona no frontend
- O token de acesso é validado pelo Google

## Troubleshooting

### Erro: "redirect_uri_mismatch"
- Verifique se o domínio está configurado corretamente no Google Cloud Console

### Erro: "invalid_client"
- Verifique se o Client ID está correto no código

### Botão do Google não aparece
- Verifique se o Google SDK está carregando corretamente
- Abra o console do navegador para ver erros

## Próximos Passos

1. Substitua o Client ID no código
2. Teste localmente
3. Configure domínio de produção
4. Publique o site

Agora seu CV Builder tem login real com Google! 🚀