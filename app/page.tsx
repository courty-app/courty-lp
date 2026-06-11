"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

type Mode = "owner" | "player";

export default function LandingPage() {
  const [mode, setMode] = useState<Mode>("owner");
  const thumbRef = useRef<HTMLDivElement>(null);
  const btnOwnerRef = useRef<HTMLButtonElement>(null);
  const btnPlayerRef = useRef<HTMLButtonElement>(null);

  const placeThumb = useCallback(() => {
    const active = mode === "owner" ? btnOwnerRef.current : btnPlayerRef.current;
    if (!active || !thumbRef.current) return;
    thumbRef.current.style.left = active.offsetLeft + "px";
    thumbRef.current.style.width = active.offsetWidth + "px";
  }, [mode]);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    placeThumb();
  }, [mode, placeThumb]);

  useEffect(() => {
    window.addEventListener("resize", placeThumb);
    document.fonts?.ready.then(placeThumb);
    return () => window.removeEventListener("resize", placeThumb);
  }, [placeThumb]);

  // scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = () => {
      document
        .querySelectorAll(".world.on .reveal:not(.in), .closer .reveal:not(.in)")
        .forEach((el) => io.observe(el));
    };
    observe();
    return () => io.disconnect();
  }, [mode]);

  const switchMode = (m: Mode, scroll?: boolean) => {
    setMode(m);
    if (scroll) {
      const target = document.getElementById(`world-${m}`);
      target?.querySelector(".section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const TICKER = ["Futsal", "Beach Tennis", "Padel", "Tênis", "Futevôlei", "Vôlei", "Society", "Basquete"];

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a className="logo" href="#">
          <Image
            className="logo-mark logo-mark-dark"
            src="/assets/courty-logo-dark-bg.png"
            alt="Courty"
            width={30}
            height={30}
          />
          <Image
            className="logo-mark logo-mark-light"
            src="/assets/courty-logo-light-bg.png"
            alt="Courty"
            width={30}
            height={30}
          />
          <span className="word">courty</span>
        </a>

        <div className="mode-switch" role="tablist" aria-label="Perspectiva">
          <div className="mode-thumb" ref={thumbRef} />
          <button
            type="button"
            role="tab"
            ref={btnOwnerRef}
            className={mode === "owner" ? "active" : ""}
            aria-selected={mode === "owner"}
            onClick={() => switchMode("owner")}
          >
            Tenho uma arena
          </button>
          <button
            type="button"
            role="tab"
            ref={btnPlayerRef}
            className={mode === "player" ? "active" : ""}
            aria-selected={mode === "player"}
            onClick={() => switchMode("player")}
          >
            Eu jogo
          </button>
        </div>

        <a className="nav-cta" href="#cta">Começar grátis</a>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="seam" aria-hidden="true" />

        <button className="half half-owner" onClick={() => switchMode("owner", true)}>
          <svg className="court-lines" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="60" y="80" width="480" height="640" rx="8" />
              <line x1="60" y1="400" x2="540" y2="400" />
              <circle cx="300" cy="400" r="90" />
              <rect x="170" y="80" width="260" height="110" />
              <rect x="170" y="610" width="260" height="110" />
            </g>
          </svg>
          <span className="half-kicker">Para donos de arena</span>
          <h1>
            Sua arena, fora do <em>caderninho.</em>
          </h1>
          <p className="lede">
            Mensalistas, aulas, professores e cobranças PIX — gerenciados num painel só. Chega de
            lembrete no WhatsApp e de conferir o app do banco.
          </p>
          <span className="half-cta">
            Sou dono <span className="arr">→</span>
          </span>
        </button>

        <button className="half half-player" onClick={() => switchMode("player", true)}>
          <svg className="court-lines" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="60" y="80" width="480" height="640" rx="8" />
              <line x1="60" y1="400" x2="540" y2="400" />
              <line x1="60" y1="250" x2="540" y2="250" />
              <line x1="60" y1="550" x2="540" y2="550" />
              <line x1="300" y1="250" x2="300" y2="550" />
            </g>
          </svg>
          <span className="half-kicker">Para quem joga</span>
          <h1>
            Seu jogo, num <em>lugar só.</em>
          </h1>
          <p className="lede">
            Sua agenda de aulas e horários, pagamento por PIX em dois toques, check-in com QR code —
            e quadras novas pra descobrir.
          </p>
          <span className="half-cta">
            Eu jogo <span className="arr">→</span>
          </span>
        </button>
      </header>

      {/* TICKER */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      <main>
        {/* ══ OWNER WORLD ══ */}
        <div className={`world world-owner${mode === "owner" ? " on" : ""}`} id="world-owner">

          {/* pain */}
          <section className="section">
            <div className="eyebrow reveal">
              <span className="num">01</span>
              <span className="name">O problema</span>
              <span className="line" />
            </div>
            <h2 className="title reveal">
              Hoje sua gestão é WhatsApp <em>+</em> caderninho <em>+</em> app do banco.
            </h2>
            <p className="desc reveal">
              Toda arena roda um negócio de receita recorrente — mensalistas e aulas — sem nenhum
              sistema por trás. A cobrança é manual, a presença é no papel e a fila de espera vive
              no zap.
            </p>

            <div className="pain-grid reveal">
              <div className="pain-card" data-tag="Todo dia 1º">
                <h3>Cobrança manual</h3>
                <p>20 a 50 mensalistas = 20 a 50 PIX pra lembrar, conferir no banco e anotar. Todo mês. Na mão.</p>
              </div>
              <div className="pain-card" data-tag="Ou no papel, ou nada">
                <h3>Presença invisível</h3>
                <p>Quem veio na aula de terça? Quem sumiu há três semanas e está prestes a cancelar? Ninguém sabe.</p>
              </div>
              <div className="pain-card" data-tag="Perdida no grupo">
                <h3>Fila de espera no zap</h3>
                <p>Turma lotou, a lista de interessados vive em conversa de WhatsApp — e aluno novo se perde no caminho.</p>
              </div>
            </div>

            <div className="pain-stat reveal">
              <div className="big">
                90<sup>%</sup>
              </div>
              <div className="side">
                <strong>da receita da sua arena vem de aulas e mensalistas.</strong>
                <p>E é exatamente essa parte que nenhum sistema cuida. O Courty foi feito pra ela.</p>
              </div>
            </div>
          </section>

          {/* features */}
          <section className="section">
            <div className="eyebrow reveal">
              <span className="num">02</span>
              <span className="name">A plataforma</span>
              <span className="line" />
            </div>
            <h2 className="title reveal">
              Um painel. <em>Toda a operação.</em>
            </h2>
            <p className="desc reveal">
              Do mensalista que paga todo mês ao avulso que reservou ontem à noite — tudo passa pelo
              mesmo lugar, e você vê tudo.
            </p>

            <div className="bento">
              <div className="b-card hero-card reveal">
                <div className="b-copy">
                  <span className="pill">O carro-chefe</span>
                  <h3>Mensalistas no piloto automático</h3>
                  <p>
                    Cobrança recorrente via PIX, status de pagamento em tempo real, histórico por
                    cliente. Você abre o painel e sabe na hora quem pagou e quem deve — sem mandar
                    uma mensagem sequer.
                  </p>
                </div>
                <div className="mini-ui" aria-hidden="true">
                  <div className="head">
                    <span>Mensalistas · Junho</span>
                    <span>28/32 pagos</span>
                  </div>
                  {[
                    { name: "Carlos M.", sub: "Futsal · Seg 20h", status: "ok", label: "PAGO" },
                    { name: "Ana Beatriz", sub: "Beach Tennis · Ter/Qui 18h", status: "ok", label: "PAGO" },
                    { name: "Rodrigo S.", sub: "Padel · Qua 19h", status: "wait", label: "PENDENTE" },
                    { name: "Juliana F.", sub: "Futevôlei · Sáb 9h", status: "ok", label: "PAGO" },
                  ].map((r) => (
                    <div key={r.name} className="row">
                      <span className="who">
                        {r.name}
                        <small>{r.sub}</small>
                      </span>
                      <span className={`st ${r.status}`}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="b-card span2 reveal">
                <div className="b-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
                  </svg>
                </div>
                <h3>Aulas &amp; turmas</h3>
                <p>Grade recorrente, limite de vagas e fila de espera automática. Turma lotou? O próximo da fila entra sozinho.</p>
              </div>

              <div className="b-card span2 reveal">
                <div className="b-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>Professores</h3>
                <p>Cada professor tem o próprio acesso: agenda, lista de alunos e chamada — separado do seu painel de dono.</p>
              </div>

              <div className="b-card span2 reveal">
                <div className="b-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM18 18h3v3h-3z" />
                  </svg>
                </div>
                <h3>Check-in com QR code</h3>
                <p>Presença registrada na entrada da quadra. Você enxerga frequência — e detecta aluno em risco de churn antes de ele sumir.</p>
              </div>

              <div className="b-card span3 reveal">
                <div className="b-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <h3>Links de matrícula</h3>
                <p>Cada turma ganha um link de inscrição com pagamento embutido. O professor compartilha no grupo, o aluno entra e paga sozinho — matrícula sem você no meio.</p>
              </div>

              <div className="b-card span3 reveal">
                <div className="b-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3>Reservas avulsas</h3>
                <p>Horário vago vira vitrine: jogadores da plataforma encontram sua quadra e reservam direto, com pagamento na hora. Receita extra no horário ocioso.</p>
              </div>
            </div>
          </section>

          {/* pricing */}
          <section className="section">
            <div className="eyebrow reveal">
              <span className="num">03</span>
              <span className="name">Quanto custa</span>
              <span className="line" />
            </div>
            <h2 className="title reveal">
              Grátis. É sério. <em>Pra sempre.</em>
            </h2>
            <p className="desc reveal">
              Sem mensalidade, sem taxa de adesão, sem cobrança por aluno. O Courty só ganha uma
              porcentagem quando o dinheiro entra pra você.
            </p>

            <div className="price-wrap reveal">
              <div className="price-cell">
                <div className="price-label">Mensalidade</div>
                <div className="price-big">R$0</div>
                <p>A plataforma inteira, liberada. Painel, aulas, professores, check-in, links de matrícula. Nada bloqueado atrás de plano pago.</p>
              </div>
              <div className="price-cell">
                <div className="price-label">Por transação</div>
                <div className="price-big">5%</div>
                <p>Só sobre o que passa pelo Courty. Seu cliente pagou R$300? Você recebe R$285, direto na conta.</p>
                <ul className="price-list">
                  <li>Sem fidelidade nem contrato</li>
                  <li>Sem custo por aluno cadastrado</li>
                  <li>Incentivo alinhado: só ganhamos se você ganhar</li>
                </ul>
              </div>
            </div>
          </section>

          {/* how */}
          <section className="section">
            <div className="eyebrow reveal">
              <span className="num">04</span>
              <span className="name">Como começa</span>
              <span className="line" />
            </div>
            <h2 className="title reveal">
              Da planilha pro painel em <em>uma semana.</em>
            </h2>

            <div className="steps reveal">
              <div className="step">
                <h3>Cadastre a arena</h3>
                <p>Quadras, horários, turmas e professores. A gente ajuda a montar tudo na primeira semana.</p>
              </div>
              <div className="step">
                <h3>Convide os mensalistas</h3>
                <p>Seus clientes recebem o convite, entram no app e a cobrança PIX vira automática.</p>
              </div>
              <div className="step">
                <h3>Compartilhe os links</h3>
                <p>Professores divulgam o link de matrícula das turmas. Aluno novo entra e paga sem te chamar no zap.</p>
              </div>
              <div className="step">
                <h3>Acompanhe tudo</h3>
                <p>Quem pagou, quem veio, qual turma lota, qual horário sobra. Decisão com número, não com memória.</p>
              </div>
            </div>
          </section>
        </div>

        {/* ══ PLAYER WORLD ══ */}
        <div className={`world world-player${mode === "player" ? " on" : ""}`} id="world-player">

          {/* app */}
          <section className="section">
            <div className="eyebrow reveal">
              <span className="num">01</span>
              <span className="name">Seu canto</span>
              <span className="line" />
            </div>
            <h2 className="title reveal">
              Tudo do seu esporte, <em>sem caçar no zap.</em>
            </h2>
            <p className="desc reveal">
              Aula de hoje, horário da semana, mensalidade, recibo — pare de procurar em grupo de
              WhatsApp. Abre o Courty e está lá.
            </p>

            <div className="phone-row reveal">
              <div className="phone-copy">
                <div className="bento" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="b-card">
                    <div className="b-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
                      </svg>
                    </div>
                    <h3>Sua agenda, sempre certa</h3>
                    <p>Aulas recorrentes, horários fixos de mensalista e reservas avulsas — numa linha do tempo só. Mudou algo? Você fica sabendo.</p>
                  </div>
                  <div className="b-card">
                    <div className="b-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <h3>PIX em dois toques</h3>
                    <p>Mensalidade, aula ou reserva: pagou pelo app, recibo guardado. Nunca mais &quot;me manda o comprovante&quot;.</p>
                  </div>
                  <div className="b-card">
                    <div className="b-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM18 18h3v3h-3z" />
                      </svg>
                    </div>
                    <h3>Check-in com QR</h3>
                    <p>Chegou, escaneou, jogou. Sua frequência vira histórico — dá pra ver sua evolução no esporte.</p>
                  </div>
                </div>
              </div>

              <div className="phone" aria-hidden="true">
                <div className="phone-screen">
                  <div className="ph-head">
                    <div className="hi">Fala, Marina 👋</div>
                    <div className="sub">Quinta · 18:00 · Beach Tennis</div>
                  </div>
                  <div className="ph-body">
                    <div className="ph-card">
                      <div className="t">Aula de hoje <span className="ph-badge">CONFIRMADA</span></div>
                      <div className="m">Arena Savassi · Quadra 2 · Prof. Diego</div>
                    </div>
                    <div className="ph-card">
                      <div className="t">Mensalidade junho <span className="ph-badge due">VENCE EM 3 DIAS</span></div>
                      <div className="m">Plano 2x/semana · R$340</div>
                    </div>
                    <div className="ph-pay">Pagar com PIX →</div>
                    <div className="ph-card">
                      <div className="t">Sábado livre?</div>
                      <div className="m">4 quadras de futevôlei perto de você a partir de R$90/h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* discovery */}
          <section className="section">
            <div className="eyebrow reveal">
              <span className="num">02</span>
              <span className="name">Jogo novo</span>
              <span className="line" />
            </div>
            <h2 className="title reveal">
              Descubra quadras. <em>Experimente esportes.</em>
            </h2>
            <p className="desc reveal">
              Sua arena de sempre é só o começo. Reserve horário avulso em qualquer quadra da
              plataforma — ou arrisque um esporte novo no fim de semana.
            </p>

            <div className="chips reveal">
              {TICKER.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </section>

          {/* how (player) */}
          <section className="section">
            <div className="eyebrow reveal">
              <span className="num">03</span>
              <span className="name">Como funciona</span>
              <span className="line" />
            </div>
            <h2 className="title reveal">
              Entrar leva <em>um minuto.</em>
            </h2>

            <div className="steps three reveal">
              <div className="step">
                <h3>Receba o convite</h3>
                <p>Sua arena ou professor te manda um link. Um toque e sua conta existe — com sua turma já dentro.</p>
              </div>
              <div className="step">
                <h3>Pague pelo app</h3>
                <p>PIX direto no Courty. Mensalidade em dia sem lembrete constrangedor do dono da quadra.</p>
              </div>
              <div className="step">
                <h3>Só jogue</h3>
                <p>Agenda na mão, check-in no QR, evolução registrada. O resto é com a gente.</p>
              </div>
            </div>
          </section>
        </div>

        {/* CLOSER */}
        <section className="closer" id="cta">
          <div className="watermark" aria-hidden="true">courty</div>
          {mode === "owner" ? (
            <>
              <h2 className="reveal">
                O caderninho se aposenta <em>hoje.</em>
              </h2>
              <p className="reveal">
                Comece grátis, migre seus mensalistas no seu ritmo e veja sua arena inteira num
                painel só. A gente acompanha sua primeira semana de perto.
              </p>
              <a className="half-cta reveal" href="#" style={{ margin: "0 auto" }}>
                Criar minha arena <span className="arr">→</span>
              </a>
            </>
          ) : (
            <>
              <h2 className="reveal">
                Bora pra <em>quadra.</em>
              </h2>
              <p className="reveal">
                Pergunte na sua arena se ela já está no Courty — ou explore as quadras abertas e
                marque seu próximo jogo.
              </p>
              <a className="half-cta reveal" href="#" style={{ margin: "0 auto" }}>
                Encontrar quadras <span className="arr">→</span>
              </a>
            </>
          )}
        </section>
      </main>

      <footer>
        <span>© 2026 Courty · Belo Horizonte, Brasil</span>
        <span>feito por quem joga, pra quem vive de jogo</span>
      </footer>
    </>
  );
}
