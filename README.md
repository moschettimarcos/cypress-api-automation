# 🚀 Framework de Automação de APIs com Cypress

Framework profissional de automação de testes de API desenvolvido com Cypress, cobrindo métodos HTTP, autenticação, validação de schema, tratamento de erros e boas práticas utilizadas no mercado.

---

# 📌 Funcionalidades

- ✅ Cobertura completa dos métodos HTTP:
  - GET
  - POST
  - PUT
  - PATCH
  - DELETE

- 🔐 Estratégias de autenticação:
  - Bearer Token
  - Basic Auth
  - API Key
  - OAuth 2.0
  - JWT

- 📄 Validação de Schema JSON utilizando AJV

- ⚠️ Tratamento de erros:
  - Cenários 4xx
  - Cenários 5xx
  - Validações de falhas e respostas inválidas

- 🧩 Custom Commands reutilizáveis

- 📂 Organização de fixtures e schemas

- 🌎 Configuração por ambiente

- 📊 Relatórios profissionais com Mochawesome

- 🧠 Estrutura baseada em boas práticas de automação de APIs

---

# 📋 Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- Node.js (v16 ou superior)
- npm ou yarn
- Conhecimento básico em JavaScript e APIs REST

---

# 🛠️ Instalação

## Clone o repositório

```bash
git clone <url-do-repositorio>
```

## Acesse a pasta do projeto

```bash
cd cypress-api-automation
```

## Instale as dependências

```bash
npm install
```

## Abra o Cypress

```bash
npm run cypress:open
```

---

# 📁 Estrutura do Projeto

```bash
cypress-api-automation/
├── cypress/
│   ├── e2e/
│   │   └── api/
│   │       ├── auth/
│   │       ├── delete/
│   │       ├── errors/
│   │       ├── get/
│   │       ├── patch/
│   │       ├── post/
│   │       ├── put/
│   │       └── validation/
│   │
│   ├── fixtures/
│   │   ├── schemas/
│   │   ├── comment.json
│   │   ├── post.json
│   │   ├── todo.json
│   │   └── user.json
│   │
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   │
│   └── results/
│       └── mochawesome/
│
├── cypress.config.js
├── cypress.env.json
├── package.json
└── README.md
```

---

# ⚙️ Configurações

## Variáveis de Ambiente

Edite o arquivo `cypress.env.json` para configurar URLs e autenticações:

```json
{
  "apiUrl": "https://jsonplaceholder.typicode.com",
  "apiVersion": "v1",
  "timeout": 10000,
  "auth": {
    "bearerToken": "seu-token",
    "apiKey": "sua-api-key",
    "basicAuth": {
      "username": "usuario-teste",
      "password": "senha-teste"
    }
  }
}
```

---

# 🧪 Executando os Testes

## Executar todos os testes

```bash
npm test
```

## Executar com interface gráfica

```bash
npm run cypress:open
```

## Executar em navegadores específicos

### Chrome

```bash
npm run test:chrome
```

### Edge

```bash
npm run test:edge
```

## Executar com gravação

```bash
npm run test:record
```

---

# 📊 Gerando Relatórios

## Mesclar relatórios

```bash
npm run report:merge
```

## Gerar relatório HTML

```bash
npm run report:generate
```

Os relatórios serão gerados em:

```bash
cypress/results/mochawesome/
```

---

# 📚 Suítes de Teste

## ✅ GET Requests

Arquivo:

```bash
cypress/e2e/api/get/getRequests.cy.js
```

Cobertura:

- Validações GET
- Query Params
- Headers
- Tempo de resposta
- Edge cases
- Validação de resposta

---

## ✅ POST Requests

Arquivo:

```bash
cypress/e2e/api/post/postRequests.cy.js
```

Cobertura:

- Criação de recursos
- Uso de fixtures
- Validação de campos
- Caracteres especiais
- Arrays
- Grandes volumes de dados

---

## ✅ PUT Requests

Arquivo:

```bash
cypress/e2e/api/put/putRequests.cy.js
```

Cobertura:

- Atualização completa
- Validação de retorno
- Valores nulos
- Recursos inexistentes
- Atualizações concorrentes

---

## ✅ PATCH Requests

Arquivo:

```bash
cypress/e2e/api/patch/patchRequests.cy.js
```

Cobertura:

- Atualizações parciais
- Atualização de múltiplos campos
- Objetos aninhados
- Comparação entre PATCH e PUT

---

## ✅ DELETE Requests

Arquivo:

```bash
cypress/e2e/api/delete/deleteRequests.cy.js
```

Cobertura:

- Exclusão de recursos
- Fluxos de criação e exclusão
- Idempotência
- Validação de resposta

---

## ✅ Authentication

Arquivo:

```bash
cypress/e2e/api/auth/authentication.cy.js
```

Cobertura:

- Bearer Token
- Basic Auth
- API Key
- OAuth 2.0
- JWT
- Sessão/Cookies
- MFA (conceitual)

---

## ✅ Schema Validation

Arquivo:

```bash
cypress/e2e/api/validation/schemaValidation.cy.js
```

Cobertura:

- Schemas de usuário
- Posts
- Comentários
- Todos
- Arrays
- Objetos aninhados

---

## ✅ Error Handling

Arquivo:

```bash
cypress/e2e/api/errors/errorHandling.cy.js
```

Cobertura:

- Erros 4xx
- Erros 5xx
- Retry
- Falhas de rede
- Logs
- Recuperação de erro

---

# 🔧 Custom Commands

O projeto possui comandos reutilizáveis no arquivo:

```bash
cypress/support/commands.js
```

## Requests

```javascript
cy.apiGet();
cy.apiPost();
cy.apiPut();
cy.apiPatch();
cy.apiDelete();
```

## Autenticação

```javascript
cy.bearerAuth();
cy.basicAuth();
cy.apiKeyAuth();
```

## Validações

```javascript
cy.validateSchema();
cy.assertStatus();
cy.assertBodyProperty();
cy.assertHeader();
cy.assertResponseTime();
```

## Utilitários

```javascript
cy.logResponse();
cy.retryRequest();
```

---

# 🎯 Boas práticas aplicadas

- Estrutura organizada
- Reutilização de código
- Separação de dados com fixtures
- Validação de schemas
- Uso de variáveis de ambiente
- Tratamento de erros
- Relatórios detalhados
- Custom Commands
- Arquitetura escalável
- Fácil manutenção

---

# 🔐 Segurança

Boas práticas aplicadas no projeto:

- Não salvar credenciais diretamente no código
- Uso de variáveis de ambiente
- Separação de ambientes
- Tokens e API Keys isolados
- Facilidade para integração CI/CD

---

# 🤝 Contribuições

Contribuições são bem-vindas.

Passos:

1. Faça um fork
2. Crie uma branch
3. Realize suas alterações
4. Adicione testes
5. Abra um Pull Request

---

# 📝 Licença

Este projeto está sob a licença MIT.

---

# 🙏 Créditos

- Cypress
- JSONPlaceholder
- Mochawesome
- AJV

---

# 📌 Observação

O projeto utiliza a API pública JSONPlaceholder para fins de estudo e demonstração.

Para utilização em ambiente real, altere a URL da API no arquivo:

```bash
cypress.env.json
```
