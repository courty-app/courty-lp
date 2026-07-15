import Link from "next/link";

export default function ThesisPage() {
  return (
    <main className="thesis-document">
      <nav className="thesis-document-nav">
        <Link href="/" className="thesis-document-brand" aria-label="Courty home">
          <span>C</span> courty
        </Link>
        <div>
          <span>Founder thesis</span>
          <span>v0.1 · 2026</span>
        </div>
      </nav>

      <header className="thesis-document-header">
        <p>Courty thesis</p>
        <h1>Independent sports arenas are recurring-revenue businesses disguised as court-booking businesses.</h1>
        <div className="thesis-document-summary">
          <span>In one sentence</span>
          <p>
            Courty starts by becoming the operating and payment system for an arena&apos;s existing
            recurring revenue, then turns that operational foothold into growth infrastructure for
            the broader sports network.
          </p>
        </div>
      </header>

      <article className="thesis-document-body">
        <section className="thesis-document-section">
          <aside>01 / The observation</aside>
          <div>
            <h2>The booking request is the visible part of the problem. It is not the valuable part.</h2>
            <p>
              We began with court booking. Then we spoke to arena owners in Belo Horizonte. The
              recurring pattern was not “we need a prettier booking calendar.” It was that the
              business behind the calendar is scattered: monthly players, students, coaches,
              attendance, collections, and waitlists live across WhatsApp, paper, spreadsheets,
              and bank apps.
            </p>
            <p>
              Those workflows matter because they are where an arena&apos;s relationship with its
              customers—and much of its predictable revenue—actually lives. A one-off reservation
              is useful inventory. Recurring players and classes are the operating core.
            </p>
          </div>
        </section>

        <section className="thesis-document-section thesis-document-belief">
          <aside>02 / The belief</aside>
          <div>
            <blockquote>
              The winning product will not begin as a marketplace for sports courts. It will begin
              as the system an arena trusts to run the business it already has.
            </blockquote>
            <p>
              We believe operators adopt software when it removes work from their existing
              operation: collecting PIX, tracking who paid, managing classes, coordinating
              coaches, and understanding attendance. Once Courty becomes the system of record for
              that work, it earns the data, payment flow, and owner trust needed to help the arena
              grow.
            </p>
          </div>
        </section>

        <section className="thesis-document-section">
          <aside>03 / The wedge</aside>
          <div>
            <h2>Own recurring revenue first.</h2>
            <p>
              Courty&apos;s entry point is not asking an arena to replace its community with a new
              marketplace. It is helping the arena migrate the relationships it already manages:
              members, students, schedules, coaches, and payments.
            </p>
            <ul className="thesis-document-list">
              <li><strong>Recurring payments</strong><span>Make collections visible and less manual.</span></li>
              <li><strong>Classes and memberships</strong><span>Give recurring players a clear home for schedules and enrollment.</span></li>
              <li><strong>Coaches and attendance</strong><span>Turn a fragmented operation into structured, usable data.</span></li>
            </ul>
          </div>
        </section>

        <section className="thesis-document-section">
          <aside>04 / What follows</aside>
          <div>
            <h2>The strategic sequence.</h2>
            <ol className="thesis-document-sequence">
              <li>
                <span>1</span>
                <div><strong>Become the system of record.</strong><p>Run the recurring operation: payments, memberships, classes, coaches, attendance, and schedules.</p></div>
              </li>
              <li>
                <span>2</span>
                <div><strong>Make growth measurable.</strong><p>Use operational data to surface payment gaps, waitlists, at-risk players, and unused capacity.</p></div>
              </li>
              <li>
                <span>3</span>
                <div><strong>Connect fragmented supply and demand.</strong><p>Help arenas fill spare capacity and help players discover relevant places to play beyond their existing arena.</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section className="thesis-document-section">
          <aside>05 / The bet</aside>
          <div>
            <h2>If we are right, operations become distribution.</h2>
            <p>
              The deepest asset is not a list of courts. It is an increasingly useful graph of
              arenas, players, coaches, payments, attendance, available capacity, and sport
              preferences. That graph is created by operating the business, not by aggregating
              listings first.
            </p>
            <p>
              This is why we see Courty as potential financial and growth infrastructure for
              independent sports businesses in Brazil and, eventually, Latin America—not as a
              point solution for booking a court.
            </p>
          </div>
        </section>

        <section className="thesis-document-section thesis-document-proof">
          <aside>06 / What must be true</aside>
          <div>
            <h2>Our conviction is strong; the proof is still early.</h2>
            <p>For this thesis to hold, we need to prove four things:</p>
            <ul className="thesis-document-checks">
              <li>Arenas will migrate their recurring operation, not only list available court time.</li>
              <li>Embedded payments reduce enough manual work to become a durable workflow.</li>
              <li>Owners continue using Courty after the initial migration, because the system improves daily decisions.</li>
              <li>Operational data can reliably create growth: fuller classes, recovered payments, and more use of idle capacity.</li>
            </ul>
            <p className="thesis-document-note">
              Today, the product is built and two prospective arena pilots are preparing to migrate
              their communities. The immediate job is simple: activate them, observe their real
              workflows, and earn the right to expand this thesis.
            </p>
          </div>
        </section>
      </article>

      <footer className="thesis-document-footer">
        <span>Built by former athletes who know the player-side mess—and want to fix the operator-side one.</span>
        <Link href="/">courty.app</Link>
      </footer>
    </main>
  );
}
