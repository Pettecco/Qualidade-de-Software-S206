# Qualidade-de-Software-S206

Repositório dedicado a matéria de Qualidade de Software

# Aula 3 - Lista 1

Neste exercício foram adicionados arquivos e configurações para executar testes E2E com Cypress e gerar relatórios de teste (mochawesome).

O site escolhido para testar foi o da marca [Golf Le Fleur](https://golflefleur.com/)

## Dependências importantes

As dependências usadas são (dev):

- `cypress-mochawesome-reporter` (integra Cypress com mochawesome)
- `mochawesome` (geração de reports)
- `mochawesome-merge` (mesclar vários JSONs de testes)
- `mochawesome-report-generator` / `marge` (gera o HTML final)

Se ainda não instalou as dependências, execute:

```bash
npm install
```

Observação: alguns pacotes recomendam Node 20+; se você receber erros relacionados a versão do Node, atualize usando nvm ou similar.

## Como rodar os testes

1. Para rodar os testes e gerar relatório final dos testes:

```bash
npm run test:golf:report
```

## Localização dos artefatos

- Relatórios gerados: `cypress/reports/`
- Specs: `cypress/e2e/`
- Config de reporter: `cypress.config.js`
- Registro do reporter: `cypress/support/e2e.js`
