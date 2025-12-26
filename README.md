# SmartTrip AI

**Planejamento Inteligente de Viagens com IA e Otimização**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7.1.0-007FFF.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)

## 📋 Sobre o Projeto

SmartTrip AI é uma plataforma inteligente de planejamento de viagens desenvolvida como projeto da disciplina de **Modelagem e Otimização Aplicada** da **Especialização em Inteligência Artificial Aplicada** do Instituto Federal de Goiás (IFG).

A aplicação utiliza técnicas de **Inteligência Artificial** e **Otimização Combinatória** para encontrar o melhor custo-benefício em deslocamentos complexos, integrando informações de:

- ✈️ Passagens aéreas
- 🏨 Hospedagem
- 🚗 Aluguel de veículos
- 🍽️ Alimentação

O sistema considera múltiplos critérios simultaneamente: **custo total**, **tempo de viagem**, **conforto** e **flexibilidade de rotas**, oferecendo recomendações personalizadas e eficientes.

## 🎯 Funcionalidades Principais

- **Otimização Inteligente**: Algoritmos avançados analisam milhares de combinações para encontrar a melhor solução
- **Múltiplos Critérios**: Considere custo, tempo, conforto e flexibilidade simultaneamente
- **Rotas Flexíveis**: Suporte a diferentes cidades de partida e retorno
- **Comparação Detalhada**: Visualize diferentes cenários lado a lado
- **Interface Intuitiva**: Design moderno e responsivo com Material-UI

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd PO
```

2. **Navegue até o diretório do projeto**
```bash
cd SmartTravel_AI/full-version
```

3. **Instale as dependências**
```bash
npm install
```

4. **Execute o projeto em modo desenvolvimento**
```bash
npm start
```

5. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas do linter automaticamente
- `npm run prettier` - Formata o código

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.x** - Superset JavaScript com tipagem estática
- **Material-UI (MUI) 7.1.0** - Framework de componentes React
- **Vite 6.3.5** - Build tool e dev server rápido

### Bibliotecas Principais
- **@tanstack/react-table** - Tabelas avançadas e interativas
- **Formik + Yup** - Gerenciamento e validação de formulários
- **Axios** - Cliente HTTP
- **ApexCharts** - Visualização de dados
- **Framer Motion** - Animações
- **date-fns** - Manipulação de datas

## 📁 Estrutura do Projeto

```
SmartTravel_AI/full-version/
├── public/               # Arquivos estáticos
├── src/
│   ├── assets/          # Imagens, fontes e recursos
│   ├── components/      # Componentes reutilizáveis
│   ├── contexts/        # Context API do React
│   ├── hooks/           # Custom hooks
│   ├── layout/          # Layouts da aplicação
│   ├── menu-items/      # Configuração de menus
│   ├── pages/           # Páginas da aplicação
│   │   └── smartTrip-AI/  # Páginas do SmartTrip
│   ├── routes/          # Configuração de rotas
│   ├── themes/          # Temas e estilos
│   ├── types/           # Definições TypeScript
│   └── utils/           # Funções utilitárias
├── package.json
└── vite.config.mts
```

## 👥 Autores

Projeto desenvolvido por estudantes da Especialização em Inteligência Artificial Aplicada - IFG

## 🎨 Template

Este projeto utiliza o template [Able Pro](https://preview.themeforest.net/item/able-pro-responsive-bootstrap-4-admin-template/full_screen_preview/19300403) - Material React Admin Dashboard Template.

## 📝 Licença

Este é um projeto acadêmico desenvolvido para fins educacionais.

---

**SmartTrip AI** © 2025 | Projeto acadêmico da Especialização em Inteligência Artificial Aplicada — IFG
