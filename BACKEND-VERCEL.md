# 🚀 Backend na Vercel - SmartFiles

## 🎯 Configuração para Vercel

O backend foi configurado para funcionar na Vercel usando `@vercel/node`.

### ✅ O que foi configurado

1. **Dependência instalada:**
   ```bash
   npm install @vercel/node
   ```

2. **Entry point da API:**
   - `api/index.js` - Exporta o app Express
   - `vercel.json` - Configuração específica da Vercel

3. **Estrutura de arquivos:**
   ```
   server/
   ├── api/
   │   └── index.js          # Entry point para Vercel
   ├── routes/                # Rotas da API
   ├── utils/                 # Utilitários
   ├── middlewares/           # Middlewares
   ├── app.js                 # App Express principal
   ├── vercel.json            # Configuração Vercel
   └── package.json           # Dependências
   ```

## 🚀 Deploy na Vercel

### 1. Configuração do Projeto

1. **Acesse a Vercel:**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login na sua conta

2. **Criar Novo Projeto:**
   - Clique em "New Project"
   - Importe seu repositório do GitHub
   - Selecione o repositório `smartfiles`

3. **Configurar o Projeto:**
   ```
   Framework Preset: Other
   Root Directory: server
   Build Command: npm install
   Output Directory: (deixar vazio)
   Install Command: npm install
   ```

### 2. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente:

```env
# Configurações básicas
NODE_ENV=production
PORT=3000

# CORS (URL do seu frontend)
CORS_ORIGIN=https://seu-frontend.vercel.app

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
SMTP_FROM=no-reply@smartfiles.com
SMTP_PORT=587
SMTP_SECURE=false

# Binários (importante!)
QPDF_PATH=/tmp/qpdf
```

### 3. Deploy

1. **Clique em "Deploy"**
2. **Aguarde o build** (5-10 minutos)
3. **Verifique os logs** para identificar possíveis erros

## ⚠️ Limitações da Vercel

### Binários nativos
- **qpdf**: Não funciona na Vercel (ambiente serverless)
- **Alternativas**: Use APIs externas ou serviços especializados

### Soluções para qpdf

#### Opção 1: API Externa
```javascript
// Usar serviço externo para operações PDF
const pdfService = 'https://api.external-pdf-service.com';
```

#### Opção 2: Remover funcionalidade
- Comentar rotas que dependem de qpdf
- Manter apenas funcionalidades básicas

#### Opção 3: Híbrido
- Backend básico na Vercel
- Backend completo em Render/Railway

## 🔧 Adaptações Necessárias

### 1. Rotas PDF com Senha

```javascript
// Comentar ou adaptar rotas que usam qpdf
// router.post('/add-pdf-password', ...);
// router.post('/remove-pdf-password', ...);
```

### 2. Upload de Arquivos

```javascript
// Limitar tamanho de arquivos
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});
```

### 3. Processamento Assíncrono

```javascript
// Usar filas ou processamento síncrono
// Evitar operações longas
```

## 📊 Monitoramento

### Vercel Analytics
- **Function Logs**: Logs de execução
- **Performance**: Tempo de resposta
- **Errors**: Erros e falhas

### Como acessar
1. Vá para seu projeto na Vercel
2. Clique em "Functions"
3. Veja logs e métricas

## 🚨 Troubleshooting

### Build falha
- ✅ Verifique se `@vercel/node` está instalado
- ✅ Confirme que `api/index.js` existe
- ✅ Verifique sintaxe ES6

### API não responde
- ✅ Confirme que as rotas estão configuradas
- ✅ Verifique variáveis de ambiente
- ✅ Teste localmente primeiro

### Erro com qpdf
- ✅ Comente rotas que dependem de binários
- ✅ Use alternativas ou APIs externas
- ✅ Considere deploy híbrido

## 🔄 Deploy Híbrido (Recomendado)

### Frontend: Vercel
- ✅ SPA Vue.js
- ✅ Analytics integrado
- ✅ Performance otimizada

### Backend: Render/Railway
- ✅ Suporte a binários nativos
- ✅ Processamento completo
- ✅ Sem limitações serverless

### Configuração
```env
# Frontend (.env)
VITE_API_BASE_URL=https://seu-backend.render.com

# Backend (Render)
CORS_ORIGIN=https://seu-frontend.vercel.app
```

---

## 🎉 Backend configurado para Vercel!

**Próximos passos:**
1. ✅ Deploy do backend na Vercel
2. 🔧 Adaptar rotas para ambiente serverless
3. 🚀 Configurar variáveis de ambiente
4. 📊 Monitorar performance

**Para funcionalidades completas, considere deploy híbrido! 🚀**

