# 🤝 Contribuindo com o Framework de Automação de APIs com Cypress

Obrigado pelo interesse em contribuir com este projeto!
Este documento contém as orientações e boas práticas para contribuições.

---

# 🐞 Reportando Bugs

Antes de abrir uma issue, verifique se o problema já não foi reportado anteriormente.

Ao reportar um bug, tente incluir:

- Título claro e objetivo
- Passo a passo para reproduzir o problema
- Comportamento esperado
- Comportamento atual
- Prints ou mensagens de erro
- Informações do ambiente:
  - Sistema operacional
  - Versão do Node.js
  - Versão do Cypress

---

# 💡 Sugestões de Melhoria

Sugestões são muito bem-vindas.

Ao propor melhorias, informe:

- O que deseja melhorar
- Benefícios da melhoria
- Possível abordagem de implementação (se souber)

---

# 🛠️ Configuração do Ambiente de Desenvolvimento

## 1. Faça um fork do projeto

## 2. Clone o repositório

```bash id="t6z1m2"
git clone https://github.com/seu-usuario/cypress-api-automation.git
```

## 3. Acesse a pasta

```bash id="2u4h9f"
cd cypress-api-automation
```

## 4. Instale as dependências

```bash id="8n1xqp"
npm install
```

## 5. Crie uma branch para sua feature

```bash id="g5v2lo"
git checkout -b feature/nome-da-sua-feature
```

---

# 🚀 Fluxo de Contribuição

1. Faça suas alterações
2. Execute os testes
3. Commit suas mudanças
4. Faça push para sua branch
5. Abra um Pull Request

---

# 🧪 Executando os Testes

```bash id="m8a1yz"
npm test
```

---

# 📝 Padrão de Commits

O projeto segue o padrão Conventional Commits.

## Exemplos

```bash id="5qlx7h"
feat: adiciona testes de autenticação OAuth
fix: corrige validação de schema
docs: atualiza documentação do projeto
test: adiciona novos cenários de API
refactor: melhora estrutura dos comandos customizados
```

## Prefixos utilizados

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Ajustes de formatação
- `refactor:` Refatoração de código
- `test:` Inclusão ou alteração de testes
- `chore:` Tarefas de manutenção

---

# 🎯 Boas práticas de código

## JavaScript / Cypress

- Utilize nomes claros e objetivos
- Mantenha funções pequenas e reutilizáveis
- Utilize Custom Commands quando possível
- Separe dados em fixtures
- Evite duplicação de código
- Adicione comentários apenas quando necessário

---

# 📂 Organização dos Testes

- Organize os testes por funcionalidade ou método HTTP
- Utilize `describe` para agrupar cenários relacionados
- Utilize `beforeEach` e `afterEach` quando necessário
- Utilize nomes descritivos para os testes

---

# 📄 Padrão de Nomes de Arquivos

## Arquivos de teste

```bash id="l0g4nq"
*.cy.js
```

## Fixtures

```bash id="j7v9tx"
*.json
```

Regras:

- Utilizar kebab-case
- Manter padrão consistente entre pastas e arquivos

---

# 📖 Documentação

Sempre que possível:

- Atualize o README
- Documente novos comandos customizados
- Adicione comentários úteis
- Atualize variáveis de ambiente caso necessário

---

# ✅ Checklist para Pull Request

Antes de abrir um PR, valide:

- [ ] Código seguindo o padrão do projeto
- [ ] Testes executando corretamente
- [ ] Novos testes adicionados quando necessário
- [ ] Documentação atualizada
- [ ] Commits organizados
- [ ] Sem conflitos de merge

---

# 🚀 Processo de Release

As releases são gerenciadas pelos mantenedores do projeto.

Para mudanças grandes, recomenda-se alinhar antes através de uma issue ou discussão.

---

# 💬 Comunicação

- Seja respeitoso
- Compartilhe conhecimento
- Ajude outros contribuidores
- Dê feedbacks construtivos

---

# 📄 Licença

Ao contribuir com este projeto, você concorda que sua contribuição será licenciada sob a licença MIT.

---

# 🎉 Obrigado por contribuir!
