# 📱 Recomendador de Celulares

Sistema web inteligente para recomendação de celulares com base em filtros personalizados. O usuário escolhe marca, faixa de preço, ano de lançamento e diversas configurações técnicas para encontrar o celular ideal.

## 🌐 Acesse Online

**🔗 [https://phonerecommender.onrender.com](https://phonerecommender.onrender.com)**

> Hospedado gratuitamente no Render. A primeira requisição pode demorar alguns segundos (cold start do plano gratuito).

---

## 🎯 Funcionalidades

- **Filtro por marca** — Samsung, Apple, Xiaomi, Motorola, Google, OnePlus, Realme, Asus, Nothing
- **Faixa de preço** — Defina valor mínimo e máximo em R$
- **Ano de lançamento** — Filtre celulares de 2018 a 2024
- **RAM mínima** — De 4GB a 16GB+
- **Armazenamento mínimo** — De 64GB a 512GB+
- **Tamanho de tela** — Filtre por tamanho mínimo
- **Bateria mínima** — De 3000mAh a 5000mAh+
- **Câmera principal** — De 12MP a 200MP+
- **Recursos extras** — 5G, NFC, resistência à água
- **Ordenação** — Por preço, data, câmera ou bateria
- **60 celulares** na base de dados com specs reais

---

## 🖼️ Preview

O site apresenta uma interface moderna com tema escuro e cards detalhados para cada celular, exibindo:

- Imagem do aparelho
- Nome e marca
- Preço em R$
- Especificações técnicas (processador, RAM, armazenamento, bateria, câmera, tela, sistema)
- Tags de recursos (5G, NFC, resistente à água)

---

## 🛠️ Tecnologias

| Componente | Tecnologia |
|-----------|-----------|
| Backend | Python + Flask |
| Frontend | HTML5 + CSS3 + JavaScript |
| Estilização | CSS Grid, Flexbox, Glassmorphism |
| Ícones | Font Awesome 6 |
| Fonte | Google Fonts (Inter) |
| Deploy | Render (Web Service) |
| Servidor WSGI | Gunicorn |

---

## 📁 Estrutura do Projeto

```
phone_recommender/
├── app.py                 # Servidor Flask e rotas da API
├── phone_data.py          # Base de dados com 60 celulares
├── requirements.txt       # Dependências Python
├── Procfile               # Comando de start para Render
├── render.yaml            # Configuração de deploy
├── .gitignore             # Arquivos ignorados pelo Git
└── static/
    ├── index.html         # Página principal
    ├── styles.css         # Estilos (tema escuro/roxo)
    └── app.js             # Lógica de filtros e renderização
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Python 3.8+
- pip

### Instalação

```bash
# Clone o repositório
git clone https://github.com/monica1602/phonerecommender.git
cd phonerecommender

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
python app.py
```

### Acesse

Abra o navegador em: **http://127.0.0.1:5000**

---

## 📡 API Endpoints

### GET `/api/filtros`

Retorna as opções disponíveis para popular os filtros.

**Resposta:**
```json
{
  "marcas": ["Apple", "Asus", "Google", ...],
  "anos": [2024, 2023, 2022, 2021, 2020, 2019, 2018],
  "preco_min": 799,
  "preco_max": 9999,
  "ram_opcoes": [3, 4, 6, 8, 12, 16, 24],
  "armazenamento_opcoes": [64, 128, 256, 512, 1024]
}
```

### POST `/api/recomendar`

Filtra e retorna celulares com base nos critérios enviados.

**Body (JSON):**
```json
{
  "marca": "Samsung",
  "preco_min": 1000,
  "preco_max": 5000,
  "ano_min": 2020,
  "ano_max": 2024,
  "ram_min": "6",
  "armazenamento_min": "128",
  "tela_min": "6.0",
  "bateria_min": "4000",
  "camera_min": "50",
  "cinco_g": true,
  "nfc": false,
  "resistencia_agua": false,
  "ordenar_por": "preco_asc"
}
```

**Resposta:**
```json
{
  "total": 3,
  "celulares": [
    {
      "id": 4,
      "nome": "Samsung Galaxy A35",
      "marca": "Samsung",
      "preco": 1999,
      ...
    }
  ]
}
```

---

## 🌍 Deploy no Render

O projeto está configurado para deploy automático no Render:

1. Conecte o repositório GitHub ao Render
2. As configurações já estão no `render.yaml`:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Runtime:** Python 3.11
3. Cada push na branch `main` faz deploy automático

---

## 📋 Celulares na Base de Dados

| Marca | Quantidade | Anos |
|-------|-----------|------|
| Samsung | 12 | 2018–2024 |
| Apple | 10 | 2018–2023 |
| Xiaomi | 9 | 2018–2024 |
| Motorola | 8 | 2018–2024 |
| OnePlus | 6 | 2018–2024 |
| Google | 4 | 2018–2023 |
| Realme | 3 | 2023–2024 |
| Asus | 2 | 2024 |
| Nothing | 1 | 2023 |

---

## 👩‍💻 Autora

Desenvolvido por **Monica** — [@monica1602](https://github.com/monica1602)

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais e pessoais.
