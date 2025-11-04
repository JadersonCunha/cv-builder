# 🚀 Configuração Rápida - Login Real com Google

## Passo 1: Google Cloud Console
1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Vá em "APIs e Serviços" > "Credenciais"
4. Clique "Criar Credenciais" > "ID do cliente OAuth 2.0"
5. Escolha "Aplicativo da Web"

## Passo 2: Configurar Domínios
**Origens JavaScript autorizadas:**
- `http://localhost:8080` (para teste local)
- `http://127.0.0.1:8080` (para teste local)
- Seu domínio real quando publicar

## Passo 3: Copiar Client ID
1. Copie o Client ID que aparece (formato: `xxxxx.apps.googleusercontent.com`)
2. No arquivo `app.js`, linha 4, substitua:

```javascript
const GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID_AQUI.apps.googleusercontent.com';
```

Por:

```javascript
const GOOGLE_CLIENT_ID = 'seu-client-id-copiado.apps.googleusercontent.com';
```

## Passo 4: Testar
1. Abra um servidor local (Live Server, Python, etc.)
2. Acesse seu site
3. Clique no botão do Google
4. Faça login com sua conta Google real

## ✅ Pronto!
Agora você terá login real com sua conta Google, sem nada fictício.

**Importante:** O site precisa estar rodando em um servidor (não apenas abrindo o arquivo HTML diretamente).