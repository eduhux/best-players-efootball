# ⚽ BEST PLAYERS IN EFOOTBALL

Painel oficial do maior grupo competitivo de **eFootball Mobile**.
Ranking histórico, campeonatos, hall da fama, estatísticas, troféus e regras — tudo num site moderno, escuro e responsivo.

Construído com **Next.js 15 · TypeScript · TailwindCSS · Framer Motion · Lucide · Recharts**.

---

## 🚀 Como rodar no seu computador

> Pré-requisito: ter o **Node.js 18.18 ou superior** instalado (https://nodejs.org).

1. Abra o terminal dentro da pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra no navegador: **http://localhost:3000**

---

## 🛠️ Onde editar os dados

Tudo que muda com o tempo (jogadores, títulos, campeões) está em arquivos JSON na pasta `/data`.
Não precisa mexer em código para atualizar — basta editar o texto:

| Arquivo | O que controla |
|---|---|
| `data/ranking.json` | Ranking histórico (nome + total de títulos) |
| `data/campeonatos.json` | Lista de campeonatos, descrição e nº de edições |
| `data/premios.json` | Melhor Jogador da Temporada e Prêmio Puskás |
| `data/trofeus.json` | Histórico de troféus por competição (jogador, clube, qtd) |
| `data/regras.json` | Regras oficiais e punições |

> O ranking é **ordenado automaticamente** pela quantidade de títulos, então não precisa se preocupar com a ordem.

---

## ☁️ Como publicar na Vercel (grátis)

1. Suba o projeto no GitHub (passo abaixo).
2. Entre em **https://vercel.com** e faça login com sua conta do GitHub.
3. Clique em **Add New → Project**.
4. Escolha o repositório `best-players-efootball`.
5. A Vercel detecta o Next.js sozinho. Clique em **Deploy**.
6. Em ~1 minuto seu site estará no ar com um link `.vercel.app`. ✅

---

## 🐙 Como subir no GitHub

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Primeira versão do site Best Players in eFootball"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/best-players-efootball.git
git push -u origin main
```

> Troque `SEU-USUARIO` pelo seu usuário do GitHub. Crie o repositório vazio em https://github.com/new antes do `git push`.

---

## 📁 Estrutura do projeto

```
best-players-efootball/
├── app/
│   ├── layout.tsx        # Fontes, SEO e metadados
│   ├── page.tsx          # Monta todas as seções
│   └── globals.css       # Estilos globais e tema
├── components/           # Todos os componentes (Hero, Ranking, etc.)
├── data/                 # Dados em JSON (edite aqui!)
├── public/               # Imagens e ícones
└── ...arquivos de config
```

---

Feito para a comunidade **Best Players in eFootball** — competição, rivalidade e história.
