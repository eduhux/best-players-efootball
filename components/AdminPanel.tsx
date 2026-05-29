"use client";

import { useState } from "react";
import { Plus, Trash2, Download, Lock, ArrowLeft, Save } from "lucide-react";
import rankingData from "@/data/ranking.json";
import campeonatosData from "@/data/campeonatos.json";
import premiosData from "@/data/premios.json";
import trofeusData from "@/data/trofeus.json";
import regrasData from "@/data/regras.json";

/* =========================================================================
   PAINEL ADMIN — Caminho 1 (gera os arquivos JSON)
   Como usar:
   1. Edite os campos abaixo.
   2. Clique em "Baixar arquivo" da seção que você mexeu.
   3. No GitHub, entre na pasta /data, clique no arquivo, no lápis (editar)
      ou em "Add file > Upload files", e substitua pelo arquivo baixado.
   4. A Vercel republica sozinha em ~1 minuto.

   SENHA: troque o valor de ADMIN_SENHA abaixo pela senha que quiser.
   (É uma trava leve, só pra esconder o painel. A proteção de verdade é que
    só você consegue subir arquivos no seu GitHub.)
   ========================================================================= */
const ADMIN_SENHA = "bestplayers";

const ICONES = [
  "Trophy",
  "Medal",
  "Star",
  "Award",
  "Globe",
  "Flag",
  "Crown",
  "Shield",
  "Sparkles",
];

// ---------- Tipos ----------
type Jogador = { nome: string; titulos: number };
type Campeonato = {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
  edicoes: number;
  cor: string;
};
type Premio = { nome: string; quantidade: number };
type Conquista = { jogador: string; clube: string; titulos: number };
type Competicao = { competicao: string; icone: string; conquistas: Conquista[] };
type Regra = { numero: number; titulo: string; texto: string };

// ---------- Utilidades ----------
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));
const toInt = (v: string) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? 0 : n;
};
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function baixarArquivo(nomeArquivo: string, dados: unknown) {
  const blob = new Blob([JSON.stringify(dados, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------- Componentes de campo (definidos fora pra não perder o foco) ----------
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 block font-heading text-[11px] uppercase tracking-wider text-white/40">
      {children}
    </span>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-base-800 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-gold/50"
    />
  );
}

function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      value={value}
      onChange={(e) => onChange(toInt(e.target.value))}
      className="w-full rounded-lg border border-white/10 bg-base-800 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-gold/50"
    />
  );
}

function TextArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      value={value}
      rows={2}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-y rounded-lg border border-white/10 bg-base-800 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-gold/50"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-base-800 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-gold/50"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function BotaoBaixar({
  onClick,
  caminho,
}: {
  onClick: () => void;
  caminho: string;
}) {
  return (
    <div className="mt-6 flex flex-col items-start gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-body text-xs text-white/40">
        Depois de baixar, suba este arquivo em{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold">{caminho}</code> no
        GitHub.
      </p>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-deep via-gold to-gold-soft px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider text-base-900 transition-transform hover:scale-[1.03]"
      >
        <Download size={16} /> Baixar arquivo
      </button>
    </div>
  );
}

function BotaoAdd({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-neon/40 bg-neon/5 px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wider text-neon transition-colors hover:bg-neon/10"
    >
      <Plus size={15} /> {label}
    </button>
  );
}

function BotaoRemover({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Remover"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 transition-colors hover:bg-rose-500/20"
    >
      <Trash2 size={16} />
    </button>
  );
}

const iconeOptions = ICONES.map((i) => ({ label: i, value: i }));
const corOptions = [
  { label: "Dourado", value: "gold" },
  { label: "Azul neon", value: "neon" },
];

const TABS = [
  { id: "ranking", label: "Ranking" },
  { id: "campeonatos", label: "Campeonatos" },
  { id: "premios", label: "Prêmios" },
  { id: "trofeus", label: "Troféus" },
  { id: "regras", label: "Regras" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function AdminPanel() {
  const [unlocked, setUnlocked] = useState(false);
  const [senhaInput, setSenhaInput] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const [tab, setTab] = useState<TabId>("ranking");

  // Estados (clonados dos JSON pra poder editar)
  const [jogadores, setJogadores] = useState<Jogador[]>(() =>
    rankingData.jogadores.map((j) => ({ nome: j.nome, titulos: j.titulos }))
  );
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>(() =>
    clone(campeonatosData.campeonatos)
  );
  const [melhorJogador, setMelhorJogador] = useState<Premio[]>(() =>
    clone(premiosData.melhorJogador)
  );
  const [puskas, setPuskas] = useState<Premio[]>(() => clone(premiosData.puskas));
  const [competicoes, setCompeticoes] = useState<Competicao[]>(() =>
    clone(trofeusData.competicoes)
  );
  const [regras, setRegras] = useState<Regra[]>(() => clone(regrasData.regras));
  const [punicoes, setPunicoes] = useState<Regra[]>(() => clone(regrasData.punicoes));

  // ---------------- Tela de senha ----------------
  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pitch-grid px-5">
        <div className="glass-strong w-full max-w-sm rounded-3xl p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/30">
            <Lock size={24} />
          </div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
            Painel Admin
          </h1>
          <p className="mb-6 mt-1 font-body text-sm text-white/50">
            Digite a senha para editar os dados do site.
          </p>
          <input
            type="password"
            value={senhaInput}
            onChange={(e) => {
              setSenhaInput(e.target.value);
              setErroSenha(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (senhaInput === ADMIN_SENHA) setUnlocked(true);
                else setErroSenha(true);
              }
            }}
            placeholder="Senha"
            className="w-full rounded-xl border border-white/10 bg-base-800 px-4 py-3 text-center text-white outline-none focus:border-gold/50"
          />
          {erroSenha && (
            <p className="mt-2 text-sm text-rose-400">Senha incorreta.</p>
          )}
          <button
            onClick={() => {
              if (senhaInput === ADMIN_SENHA) setUnlocked(true);
              else setErroSenha(true);
            }}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-gold-deep via-gold to-gold-soft px-5 py-3 font-heading text-sm font-semibold uppercase tracking-wider text-base-900 transition-transform hover:scale-[1.02]"
          >
            Entrar
          </button>
          <a
            href="/"
            className="mt-5 inline-flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-white/70"
          >
            <ArrowLeft size={13} /> Voltar ao site
          </a>
        </div>
      </div>
    );
  }

  // ---------------- Painel ----------------
  return (
    <div className="min-h-screen bg-pitch-grid pb-20">
      {/* Topo */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-base-900/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <Save className="text-gold" size={20} />
            <h1 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
              Painel Admin
            </h1>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm text-white/50 transition-colors hover:text-gold"
          >
            <ArrowLeft size={15} /> Ver o site
          </a>
        </div>

        {/* Abas */}
        <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-3 pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 font-heading text-sm uppercase tracking-wider transition-colors ${
                tab === t.id
                  ? "bg-gold/15 text-gold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 pt-8">
        {/* Aviso de uso */}
        <div className="mb-6 rounded-2xl border border-neon/20 bg-neon/[0.05] p-4 font-body text-sm text-white/70">
          Edite os campos abaixo e clique em <strong className="text-neon">Baixar arquivo</strong>{" "}
          no fim da seção. Depois suba esse arquivo na pasta <code className="text-gold">data/</code>{" "}
          do GitHub, substituindo o antigo. O site atualiza sozinho em ~1 minuto.
        </div>

        {/* ====================== RANKING ====================== */}
        {tab === "ranking" && (
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold uppercase tracking-wide text-gradient-gold">
              Ranking Histórico
            </h2>
            <p className="mb-5 font-body text-sm text-white/50">
              Coloque o total de títulos de cada jogador. A ordem do pódio é calculada
              automaticamente — não precisa ordenar.
            </p>
            <div className="space-y-3">
              {jogadores.map((j, i) => (
                <div key={i} className="glass flex items-end gap-3 rounded-xl p-3">
                  <div className="flex-1">
                    <Label>Nome do jogador</Label>
                    <TextInput
                      value={j.nome}
                      onChange={(v) =>
                        setJogadores((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, nome: v } : x))
                        )
                      }
                    />
                  </div>
                  <div className="w-28">
                    <Label>Títulos</Label>
                    <NumberInput
                      value={j.titulos}
                      onChange={(v) =>
                        setJogadores((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, titulos: v } : x))
                        )
                      }
                    />
                  </div>
                  <BotaoRemover
                    onClick={() =>
                      setJogadores((arr) => arr.filter((_, k) => k !== i))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <BotaoAdd
                label="Adicionar jogador"
                onClick={() =>
                  setJogadores((arr) => [...arr, { nome: "", titulos: 0 }])
                }
              />
            </div>
            <BotaoBaixar
              caminho="data/ranking.json"
              onClick={() => {
                const ordenado = [...jogadores]
                  .sort((a, b) => b.titulos - a.titulos)
                  .map((j, i) => ({ posicao: i + 1, nome: j.nome, titulos: j.titulos }));
                baixarArquivo("ranking.json", { jogadores: ordenado });
              }}
            />
          </section>
        )}

        {/* ====================== CAMPEONATOS ====================== */}
        {tab === "campeonatos" && (
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold uppercase tracking-wide text-gradient-gold">
              Campeonatos
            </h2>
            <div className="space-y-4">
              {campeonatos.map((c, i) => (
                <div key={i} className="glass rounded-2xl p-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Nome do campeonato</Label>
                      <TextInput
                        value={c.nome}
                        onChange={(v) =>
                          setCampeonatos((arr) =>
                            arr.map((x, k) => (k === i ? { ...x, nome: v } : x))
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label>Edições</Label>
                        <NumberInput
                          value={c.edicoes}
                          onChange={(v) =>
                            setCampeonatos((arr) =>
                              arr.map((x, k) => (k === i ? { ...x, edicoes: v } : x))
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Ícone</Label>
                        <SelectInput
                          value={c.icone}
                          options={iconeOptions}
                          onChange={(v) =>
                            setCampeonatos((arr) =>
                              arr.map((x, k) => (k === i ? { ...x, icone: v } : x))
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Cor</Label>
                        <SelectInput
                          value={c.cor}
                          options={corOptions}
                          onChange={(v) =>
                            setCampeonatos((arr) =>
                              arr.map((x, k) => (k === i ? { ...x, cor: v } : x))
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label>Descrição</Label>
                    <TextArea
                      value={c.descricao}
                      onChange={(v) =>
                        setCampeonatos((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, descricao: v } : x))
                        )
                      }
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <BotaoRemover
                      onClick={() =>
                        setCampeonatos((arr) => arr.filter((_, k) => k !== i))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <BotaoAdd
                label="Adicionar campeonato"
                onClick={() =>
                  setCampeonatos((arr) => [
                    ...arr,
                    {
                      id: "novo-" + (arr.length + 1),
                      nome: "",
                      icone: "Trophy",
                      descricao: "",
                      edicoes: 0,
                      cor: "gold",
                    },
                  ])
                }
              />
            </div>
            <BotaoBaixar
              caminho="data/campeonatos.json"
              onClick={() => {
                const out = campeonatos.map((c) => ({
                  ...c,
                  id: c.id && !c.id.startsWith("novo-") ? c.id : slug(c.nome) || c.id,
                }));
                baixarArquivo("campeonatos.json", { campeonatos: out });
              }}
            />
          </section>
        )}

        {/* ====================== PRÊMIOS ====================== */}
        {tab === "premios" && (
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold uppercase tracking-wide text-gradient-gold">
              Prêmios
            </h2>

            <h3 className="mb-3 font-heading text-sm uppercase tracking-widest text-gold">
              Melhor Jogador da Temporada
            </h3>
            <div className="space-y-3">
              {melhorJogador.map((p, i) => (
                <div key={i} className="glass flex items-end gap-3 rounded-xl p-3">
                  <div className="flex-1">
                    <Label>Jogador</Label>
                    <TextInput
                      value={p.nome}
                      onChange={(v) =>
                        setMelhorJogador((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, nome: v } : x))
                        )
                      }
                    />
                  </div>
                  <div className="w-28">
                    <Label>Qtd.</Label>
                    <NumberInput
                      value={p.quantidade}
                      onChange={(v) =>
                        setMelhorJogador((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, quantidade: v } : x))
                        )
                      }
                    />
                  </div>
                  <BotaoRemover
                    onClick={() =>
                      setMelhorJogador((arr) => arr.filter((_, k) => k !== i))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <BotaoAdd
                label="Adicionar"
                onClick={() =>
                  setMelhorJogador((arr) => [...arr, { nome: "", quantidade: 0 }])
                }
              />
            </div>

            <h3 className="mb-3 mt-8 font-heading text-sm uppercase tracking-widest text-neon">
              Prêmio Puskás
            </h3>
            <div className="space-y-3">
              {puskas.map((p, i) => (
                <div key={i} className="glass flex items-end gap-3 rounded-xl p-3">
                  <div className="flex-1">
                    <Label>Jogador</Label>
                    <TextInput
                      value={p.nome}
                      onChange={(v) =>
                        setPuskas((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, nome: v } : x))
                        )
                      }
                    />
                  </div>
                  <div className="w-28">
                    <Label>Golaços</Label>
                    <NumberInput
                      value={p.quantidade}
                      onChange={(v) =>
                        setPuskas((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, quantidade: v } : x))
                        )
                      }
                    />
                  </div>
                  <BotaoRemover
                    onClick={() => setPuskas((arr) => arr.filter((_, k) => k !== i))}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <BotaoAdd
                label="Adicionar"
                onClick={() => setPuskas((arr) => [...arr, { nome: "", quantidade: 0 }])}
              />
            </div>

            <BotaoBaixar
              caminho="data/premios.json"
              onClick={() =>
                baixarArquivo("premios.json", { melhorJogador, puskas })
              }
            />
          </section>
        )}

        {/* ====================== TROFÉUS ====================== */}
        {tab === "trofeus" && (
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold uppercase tracking-wide text-gradient-gold">
              Troféus e Histórico
            </h2>
            <p className="mb-5 font-body text-sm text-white/50">
              Aqui ficam os títulos por competição, com o clube usado por cada jogador.
            </p>
            <div className="space-y-5">
              {competicoes.map((comp, ci) => (
                <div key={ci} className="glass rounded-2xl p-4">
                  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
                    <div>
                      <Label>Competição</Label>
                      <TextInput
                        value={comp.competicao}
                        onChange={(v) =>
                          setCompeticoes((arr) =>
                            arr.map((x, k) =>
                              k === ci ? { ...x, competicao: v } : x
                            )
                          )
                        }
                      />
                    </div>
                    <div className="w-full sm:w-36">
                      <Label>Ícone</Label>
                      <SelectInput
                        value={comp.icone}
                        options={iconeOptions}
                        onChange={(v) =>
                          setCompeticoes((arr) =>
                            arr.map((x, k) => (k === ci ? { ...x, icone: v } : x))
                          )
                        }
                      />
                    </div>
                    <div className="flex items-end">
                      <BotaoRemover
                        onClick={() =>
                          setCompeticoes((arr) => arr.filter((_, k) => k !== ci))
                        }
                      />
                    </div>
                  </div>

                  {/* Conquistas */}
                  <div className="space-y-2 border-t border-white/10 pt-3">
                    {comp.conquistas.map((cq, qi) => (
                      <div
                        key={qi}
                        className="flex items-end gap-2 rounded-lg bg-white/[0.02] p-2"
                      >
                        <div className="flex-1">
                          <Label>Jogador</Label>
                          <TextInput
                            value={cq.jogador}
                            onChange={(v) =>
                              setCompeticoes((arr) =>
                                arr.map((x, k) =>
                                  k === ci
                                    ? {
                                        ...x,
                                        conquistas: x.conquistas.map((y, m) =>
                                          m === qi ? { ...y, jogador: v } : y
                                        ),
                                      }
                                    : x
                                )
                              )
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <Label>Clube / Time</Label>
                          <TextInput
                            value={cq.clube}
                            onChange={(v) =>
                              setCompeticoes((arr) =>
                                arr.map((x, k) =>
                                  k === ci
                                    ? {
                                        ...x,
                                        conquistas: x.conquistas.map((y, m) =>
                                          m === qi ? { ...y, clube: v } : y
                                        ),
                                      }
                                    : x
                                )
                              )
                            }
                          />
                        </div>
                        <div className="w-20">
                          <Label>Qtd.</Label>
                          <NumberInput
                            value={cq.titulos}
                            onChange={(v) =>
                              setCompeticoes((arr) =>
                                arr.map((x, k) =>
                                  k === ci
                                    ? {
                                        ...x,
                                        conquistas: x.conquistas.map((y, m) =>
                                          m === qi ? { ...y, titulos: v } : y
                                        ),
                                      }
                                    : x
                                )
                              )
                            }
                          />
                        </div>
                        <BotaoRemover
                          onClick={() =>
                            setCompeticoes((arr) =>
                              arr.map((x, k) =>
                                k === ci
                                  ? {
                                      ...x,
                                      conquistas: x.conquistas.filter(
                                        (_, m) => m !== qi
                                      ),
                                    }
                                  : x
                              )
                            )
                          }
                        />
                      </div>
                    ))}
                    <div className="pt-1">
                      <BotaoAdd
                        label="Adicionar campeão"
                        onClick={() =>
                          setCompeticoes((arr) =>
                            arr.map((x, k) =>
                              k === ci
                                ? {
                                    ...x,
                                    conquistas: [
                                      ...x.conquistas,
                                      { jogador: "", clube: "", titulos: 1 },
                                    ],
                                  }
                                : x
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <BotaoAdd
                label="Adicionar competição"
                onClick={() =>
                  setCompeticoes((arr) => [
                    ...arr,
                    { competicao: "", icone: "Trophy", conquistas: [] },
                  ])
                }
              />
            </div>
            <BotaoBaixar
              caminho="data/trofeus.json"
              onClick={() =>
                baixarArquivo("trofeus.json", {
                  _obs:
                    "Dados organizados por competição. Editados pelo painel admin.",
                  competicoes,
                })
              }
            />
          </section>
        )}

        {/* ====================== REGRAS ====================== */}
        {tab === "regras" && (
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold uppercase tracking-wide text-gradient-gold">
              Regras e Punições
            </h2>

            <h3 className="mb-3 font-heading text-sm uppercase tracking-widest text-neon">
              Regras Oficiais
            </h3>
            <div className="space-y-4">
              {regras.map((r, i) => (
                <div key={i} className="glass rounded-2xl p-4">
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <div>
                      <Label>Nº</Label>
                      <NumberInput
                        value={r.numero}
                        onChange={(v) =>
                          setRegras((arr) =>
                            arr.map((x, k) => (k === i ? { ...x, numero: v } : x))
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Título</Label>
                      <TextInput
                        value={r.titulo}
                        onChange={(v) =>
                          setRegras((arr) =>
                            arr.map((x, k) => (k === i ? { ...x, titulo: v } : x))
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label>Texto</Label>
                    <TextArea
                      value={r.texto}
                      onChange={(v) =>
                        setRegras((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, texto: v } : x))
                        )
                      }
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <BotaoRemover
                      onClick={() => setRegras((arr) => arr.filter((_, k) => k !== i))}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <BotaoAdd
                label="Adicionar regra"
                onClick={() =>
                  setRegras((arr) => [
                    ...arr,
                    { numero: arr.length + 1, titulo: "", texto: "" },
                  ])
                }
              />
            </div>

            <h3 className="mb-3 mt-8 font-heading text-sm uppercase tracking-widest text-rose-400">
              Leis e Punições
            </h3>
            <div className="space-y-4">
              {punicoes.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-rose-500/30 bg-rose-500/[0.05] p-4"
                >
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <div>
                      <Label>Nº</Label>
                      <NumberInput
                        value={p.numero}
                        onChange={(v) =>
                          setPunicoes((arr) =>
                            arr.map((x, k) => (k === i ? { ...x, numero: v } : x))
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Título</Label>
                      <TextInput
                        value={p.titulo}
                        onChange={(v) =>
                          setPunicoes((arr) =>
                            arr.map((x, k) => (k === i ? { ...x, titulo: v } : x))
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label>Texto</Label>
                    <TextArea
                      value={p.texto}
                      onChange={(v) =>
                        setPunicoes((arr) =>
                          arr.map((x, k) => (k === i ? { ...x, texto: v } : x))
                        )
                      }
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <BotaoRemover
                      onClick={() =>
                        setPunicoes((arr) => arr.filter((_, k) => k !== i))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <BotaoAdd
                label="Adicionar punição"
                onClick={() =>
                  setPunicoes((arr) => [
                    ...arr,
                    { numero: arr.length + 1, titulo: "", texto: "" },
                  ])
                }
              />
            </div>

            <BotaoBaixar
              caminho="data/regras.json"
              onClick={() => baixarArquivo("regras.json", { regras, punicoes })}
            />
          </section>
        )}
      </main>
    </div>
  );
}
