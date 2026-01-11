# SmartTrip AI

**Planejamento Inteligente de Viagens com IA e Otimização**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7.1.0-007FFF.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB.svg)](https://www.python.org/)

## 📋 Sobre o Projeto

SmartTrip AI é uma plataforma inteligente de planejamento de viagens desenvolvida como projeto da disciplina de **Modelagem e Otimização Aplicada** da **Especialização em Inteligência Artificial Aplicada** do Instituto Federal de Goiás (IFG).

A aplicação utiliza técnicas de **Inteligência Artificial** e **Otimização Combinatória** para encontrar o melhor custo-benefício em deslocamentos complexos, integrando informações de:

- ✈️ Passagens aéreas
- 🏨 Hospedagem
- 🚗 Aluguel de veículos
- 🍽️ Alimentação

O sistema considera múltiplos critérios simultaneamente: **custo total**, **tempo de viagem**, **conforto** e **flexibilidade de rotas**, oferecendo recomendações personalizadas e eficientes.

## 🏗️ Arquitetura

O projeto é dividido em duas partes principais:

- **Frontend (React + TypeScript)**: Interface moderna e intuitiva para o usuário
- **Backend (FastAPI + Python)**: API REST com algoritmos de otimização e IA

```
┌─────────────────┐         HTTP/REST         ┌─────────────────┐
│                 │  ───────────────────────►  │                 │
│  React Frontend │                            │  FastAPI Backend│
│  (Port 3000)    │  ◄───────────────────────  │  (Port 8000)    │
│                 │         JSON Response       │                 │
└─────────────────┘                            └─────────────────┘
```

## 🎯 Funcionalidades Principais

- **Dois Modos de Busca**:
  - **🎯 Resultado Otimizado**: Retorna a melhor solução encontrada pelo algoritmo em até 60 segundos
  - **📊 Comparar 3 Opções**: Apresenta 3 alternativas ranqueadas para você escolher (1-3 minutos)
- **Otimização Inteligente**: Algoritmos avançados analisam milhares de combinações para encontrar a melhor solução
- **Múltiplos Critérios**: Considere custo, tempo, conforto e flexibilidade simultaneamente
- **Rotas Flexíveis**: Suporte a viagens de ida e volta com diferentes cidades de partida e retorno
- **Cidades Intermediárias**: Possibilidade de visitar múltiplas cidades no trajeto
- **Comparação Detalhada**: Visualize custos discriminados por categoria (voos, hospedagem, alimentação, transporte)
- **Níveis de Otimização**: Sistema indica a qualidade da solução (ótima, boa, viável, básica)
- **Interface Intuitiva**: Design moderno e responsivo com Material-UI

## 🚀 Como Executar o Projeto

### Pré-requisitos

**Frontend:**
- Node.js 18+
- npm ou yarn

**Backend:**
- Python 3.8+
- pip

### 📥 Clonando o Repositório

Primeiro, clone o projeto do GitHub:

```bash
# Clone o repositório
git clone https://github.com/camillara/smarttrip-ai.git

# Entre no diretório do projeto
cd smarttrip-ai
```

### Instalação e Execução

#### 1️⃣ Backend (API FastAPI)

```bash
# Navegue até o diretório do backend
cd backend

# Crie um ambiente virtual (recomendado)
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Execute a API
uvicorn main:app --reload

# A API estará disponível em:
# http://127.0.0.1:8000
# Documentação Swagger: http://127.0.0.1:8000/docs
```

#### 2️⃣ Frontend (React Application)

```bash
# Navegue até o diretório do frontend
cd SmartTravel_AI/full-version

# Instale as dependências
npm install

# Execute o projeto em modo desenvolvimento
npm start

# A aplicação estará disponível em:
# http://localhost:3000
```

> ⚠️ **Importante**: O backend deve estar rodando antes de iniciar o frontend.

### Scripts Disponíveis (Frontend)

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas do linter automaticamente
- `npm run prettier` - Formata o código

## 🔌 API Endpoints (v2.0)

### POST `/optimize`
Retorna a melhor rota otimizada encontrada pelo algoritmo.

**Request Body:**
```json
{
  "ida_volta": false,
  "origem": "GYN",
  "destino": "ATL",
  "locais_visitar": ["BSB"],
  "data_ida": "2026-03-01",
  "numero_adultos": 1,
  "numero_criancas": 0,
  "dias_por_cidade": {
    "BSB": 2,
    "ATL": 3
  },
  "incluir_refeicao": true,
  "incluir_hospedagem": true,
  "incluir_transporte": true
}
```

**Response:**
```json
{
  "rota": {
    "origem": "GYN",
    "destino": "ATL",
    "caminho": ["GYN", "BSB", "ATL"],
    "trechos": [
      {
        "origem": "GYN",
        "destino": "BSB",
        "voo": {
          "id": "G31431_2026_03_01_19:05",
          "cia": "G3",
          "codigo": "G31431",
          "data": "2026-03-01",
          "saida": "19:05",
          "duracao_min": 765,
          "preco": 408.57
        }
      }
    ]
  },
  "custos": {
    "total": 9559.39,
    "voos": 2305.93,
    "hospedagem": 2371.98,
    "alimentacao": 1062.90,
    "transporte": 3818.58
  },
  "detalhes": {
    "hospedagem": [...],
    "alimentacao": [...],
    "transporte": [...]
  },
  "metadata": {
    "nivel_otimizacao": "otima",
    "nota": "Solução ótima encontrada",
    "tempo_computacao": 12.5
  }
}
```

### POST `/optimize-multiple`
Retorna 3 opções de viagem ranqueadas para comparação.

**Request Body:**
```json
{
  "ida_volta": false,
  "origem": "GYN",
  "destino": "ATL",
  "locais_visitar": ["BSB"],
  "data_ida": "2026-03-01",
  "numero_adultos": 1,
  "numero_criancas": 0,
  "numero_opcoes": 3,
  "dias_por_cidade": {
    "BSB": 2,
    "ATL": 3
  },
  "incluir_refeicao": true,
  "incluir_hospedagem": true,
  "incluir_transporte": true
}
```

**Response:**
```json
{
  "opcoes": [
    {
      "id": 1,
      "ranking": 1,
      "titulo": "Melhor Custo-Benefício",
      "custo_total": 1850.50,
      "tempo_total_min": 1440,
      "numero_escalas": 1,
      "pontuacao": {
        "custo": 85,
        "tempo": 75,
        "conforto": 80
      },
      "vantagens": ["Menor custo", "Boa duração"],
      "desvantagens": ["1 escala"],
      "resultado": {
        "rota": {...},
        "custos": {...},
        "detalhes": {...}
      }
    }
  ],
  "recomendacao": 1,
  "metadata": {
    "tempo_computacao": 45.2
  }
}
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.x** - Superset JavaScript com tipagem estática
- **Material-UI (MUI) 7.1.0** - Framework de componentes React
- **Vite 6.3.5** - Build tool e dev server rápido
- **@tanstack/react-table** - Tabelas avançadas e interativas
- **Formik + Yup** - Gerenciamento e validação de formulários
- **Axios** - Cliente HTTP
- **ApexCharts** - Visualização de dados
- **Framer Motion** - Animações
- **date-fns** - Manipulação de datas

### Backend
- **FastAPI** - Framework web moderno e rápido para APIs Python
- **Python 3.8+** - Linguagem de programação
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI de alta performance
- **Algoritmos de Otimização** - Programação Linear, Grafos, Dijkstra
- **Pandas/NumPy** - Processamento e análise de dados

## 📁 Estrutura do Projeto

```
SmartTrip-AI/
### Modo: Resultado Otimizado (Single)
1. **Planeje sua Viagem**: Preencha o formulário com origem, destino, datas e preferências
2. **Selecione**: Escolha "🎯 Resultado Otimizado" no formulário
3. **Aguarde**: O algoritmo processa e retorna a melhor solução em ~60 segundos
4. **Visualize**: Veja a rota otimizada com badge de qualidade e custos detalhados

### Modo: Comparar 3 Opções (Multiple)
1. **Planeje sua Viagem**: Preencha o formulário com origem, destino, datas e preferências
2. **Selecione**: Escolha "📊 Comparar 3 Opções" no formulário
3. **Aguarde**: O algoritmo processa e retorna 3 alternativas em ~1-3 minutos
4. **Compare**: Analise lado a lado as opções com pontuações, vantagens e desvantagens
5. **Escolha**: Clique na opção desejada para ver detalhes completos
6. **Visualize**: Veja custo total estimado e todos os detalhes da viagem

### Recursos Adicionais
- **Receba Dicas**: Obtenha recomendações personalizadas para sua viagem
- **Sobre o Projeto**: Conheça mais sobre o SmartTrip AI
├── SmartTravel_AI/
│   └── full-version/          # Frontend React
│       ├── public/            # Arquivos estáticos
│       ├── src/
│       │   ├── assets/        # Imagens, fontes e recursos
│       │   ├── components/    # Componentes reutilizáveis
│       │   ├── contexts/      # Context API (TripContext)
│       │   ├── hooks/         # Custom hooks
│       │   ├── layout/        # Layouts da aplicação
│       │   ├── menu-items/    # Configuração de menus
│       │   ├── pages/         # Páginas da aplicação
│       │   │   └── smartTrip-AI/  # Páginas do SmartTrip
│       │   │       ├── index.tsx      # Página inicial
│       │   │       ├── viagens.tsx    # Formulário de busca
│       │   │       ├── resultados.tsx # Resultados otimizados
│       │   │       ├── dicas.tsx      # Dicas de viagem
│       │   │       └── sobre.tsx      # Sobre o projeto
│       │   ├── routes/        # Configuração de rotas
│       │   ├── services/      # Serviços (API client)
│       │   ├── themes/        # Temas e estilos
│       │   ├── types/         # Definições TypeScript
│       │   └── utils/         # Funções utilitárias
│       ├── package.json
│       └── vite.config.mts
└── README.md
```

## ⚙️ Configuração

### URL da API

A aplicação frontend está configurada para conectar com o backend em:
```
http://127.0.0.1:8000
```

Para alterar, edite o arquivo:
```typescript
// SmartTravel_AI/full-version/src/services/api.ts
const API_URL = "http://127.0.0.1:8000";
```

### Cidades Disponíveis

O sistema atualmente suporta as seguintes cidades:
- 🇧🇷 Goiânia (GYN)
- 🇧🇷 São Paulo (GRU)
- 🇧🇷 Brasília (BSB)
- 🇺🇸 Atlanta (ATL)
- 🇺🇸 Chicago (ORD)
- 🇺🇸 New Orleans (MSY)
- 🇺🇸 Miami (MIA)
- 🇺🇸 Nova York (JFK)

## 📊 Fluxo de Uso

1. **Planeje sua Viagem**: Preencha o formulário com origem, destino, datas e preferências
2. **Otimização**: O backend processa os dados e calcula a melhor rota
3. **Visualize Resultados**: Veja a rota otimizada com custos detalhados
4. **Compare Opções**: Analise diferentes cenários e escolha o melhor
5. **Receba Dicas**: Obtenha recomendações personalizadas para sua viagem

## 🔐 Recursos de Segurança

- ✅ Validação de dados no frontend e backend
- ✅ Tipagem estrita com TypeScript
- ✅ Tratamento de erros robusto
- ✅ CORS configurado corretamente

## 🧪 Testando a API

Acesse a documentação interativa do Swagger em:
```
http://127.0.0.1:8000/docs
```

Você pode testar todos os endpoints diretamente pela interface do Swagger.

## 👥 Autores

Projeto desenvolvido por estudantes da Especialização em Inteligência Artificial Aplicada - IFG

## 🎨 Template

Este projeto utiliza o template [Able Pro](https://preview.themeforest.net/item/able-pro-responsive-bootstrap-4-admin-template/full_screen_preview/19300403) - Material React Admin Dashboard Template.

## 📝 Licença

Este é um projeto acadêmico desenvolvido para fins educacionais.

## 🤝 Contribuindo

Este é um projeto acadêmico, mas sugestões e melhorias são bem-vindas!

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com os autores do projeto.

---

**SmartTrip AI** © 2026 | Projeto acadêmico da Especialização em Inteligência Artificial Aplicada — IFG
