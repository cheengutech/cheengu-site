import Link from 'next/link';
import RevealOnScroll from './components/RevealOnScroll';
import { BRAND } from './brand';

// TODO: wire to SMS onboarding flow
const CTA_HREF = '#';

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 40px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(12,11,9,0.8)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display, serif)', fontSize: 22,
          fontWeight: 700, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.3px',
        }}>
          {BRAND.nameBase}<span style={{ color: 'var(--accent)' }}>{BRAND.nameAccent}</span>
        </Link>
        <a href={CTA_HREF} style={{
          background: 'var(--text)', color: 'var(--bg)', border: 'none',
          padding: '10px 22px', borderRadius: 6, fontFamily: 'inherit',
          fontSize: 14, fontWeight: 500, cursor: 'pointer', textDecoration: 'none',
        }}>
          Create a Commitment
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 700,
          background: 'radial-gradient(ellipse, rgba(232,201,122,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
          textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 28,
          animation: 'fadeUp 0.6s 0.1s both',
        }}>
          Real commitment. Real stakes. Real people.
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display, serif)',
          fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900,
          lineHeight: 1.08, letterSpacing: '-1.5px',
          maxWidth: 780, marginBottom: 28,
          animation: 'fadeUp 0.7s 0.2s both',
        }}>
          Make a promise you can&apos;t{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>quietly abandon.</em>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-muted)',
          maxWidth: 520, lineHeight: 1.65, fontWeight: 300, marginBottom: 44,
          animation: 'fadeUp 0.7s 0.35s both',
        }}>
          {BRAND.name} turns serious intentions into real commitments — with a judge, reminders,
          proof, and a final pass/fail report.
        </p>

        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: 72, animation: 'fadeUp 0.7s 0.5s both',
        }}>
          <a href={CTA_HREF} style={{
            background: 'var(--text)', color: 'var(--bg)',
            padding: '15px 32px', borderRadius: 8, fontSize: 15, fontWeight: 500,
            border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
          }}>
            Create a Commitment
          </a>
          <a href="#how" style={{
            background: 'transparent', color: 'var(--text-muted)',
            padding: '15px 32px', borderRadius: 8, fontSize: 15, fontWeight: 400,
            border: '1px solid var(--border-warm)', cursor: 'pointer',
            textDecoration: 'none', display: 'inline-block',
          }}>
            See How It Works
          </a>
        </div>

        {/* Example commitment card */}
        <div style={{ animation: 'fadeUp 0.8s 0.65s both', width: '100%', maxWidth: 420 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border-warm)',
            borderRadius: 14, padding: 28, textAlign: 'left',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,201,122,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
              opacity: 0.6,
            }} />
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 500, letterSpacing: '1.5px',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16,
            }}>
              <span className="dot-pulse" style={{
                width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
                display: 'inline-block',
              }} />
              Active Commitment
            </div>
            <div style={{
              fontFamily: 'var(--font-display, serif)', fontSize: 20,
              fontWeight: 700, lineHeight: 1.3, marginBottom: 20, color: 'var(--text)',
            }}>
              &ldquo;Finish my landing page by Sunday at 8 PM.&rdquo;
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '1px',
                  textTransform: 'uppercase', color: 'var(--text-dim)',
                }}>Judge</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>Kai</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '1px',
                  textTransform: 'uppercase', color: 'var(--text-dim)',
                }}>Stake</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>$100</span>
              </div>
            </div>
            <div style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '12px 14px', fontSize: 13, color: 'var(--text-muted)',
              marginBottom: 16,
            }}>
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Proof required:</strong>{' '}
              Live link + screenshot
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--accent-dim)', border: '1px solid rgba(232,201,122,0.2)',
              padding: '8px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500,
              color: 'var(--accent)',
            }}>
              ⏳ Waiting for judge approval
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', maxWidth: 1100, margin: '0 auto' }} />

      {/* ── PROBLEM ── */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80, alignItems: 'center',
        }}>
          <RevealOnScroll>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
            }}>The Problem</p>
            <h2 style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: 24,
            }}>
              Private promises are easy to break.
            </h2>
            <div style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300 }}>
              <p style={{ marginBottom: 14 }}>
                You tell yourself you&apos;ll finish the project, go to the gym, submit the application,
                follow the trading rule, or finally ship the thing.
              </p>
              <p style={{ marginBottom: 14 }}>
                Then the deadline gets fuzzy.<br />
                The pressure disappears.<br />
                Nobody notices.
              </p>
              <p style={{ marginBottom: 14 }}>And the promise quietly dies.</p>
              <p>
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>
                  {BRAND.name} makes the promise visible.
                </strong>
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                '"I\'ll ship the MVP this weekend."',
                '"I\'m starting Monday for real."',
                '"Just one more week and I\'ll be done."',
              ].map((text, i) => (
                <div key={i} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '18px 20px', fontSize: 15,
                  color: 'var(--text-dim)',
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(224,90,78,0.5)',
                  marginLeft: i * 24,
                  opacity: 1 - i * 0.275,
                }}>
                  {text}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', maxWidth: 1100, margin: '0 auto' }} />

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealOnScroll>
          <p style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
          }}>The Process</p>
          <h2 style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: 16,
          }}>
            How it works.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 60 }}>
            Five steps. One promise. Someone who holds you to it.
          </p>
        </RevealOnScroll>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: 2,
        }}>
          {[
            { num: '01', title: 'Make a promise', desc: 'Write exactly what you\'ll do and by when. Specificity is accountability.' },
            { num: '02', title: 'Choose a real judge', desc: 'Pick someone who knows you and will actually call you on it — not a stranger, not an algorithm.' },
            { num: '03', title: 'Get reminded', desc: 'Cheengu sends timely nudges via SMS so the deadline stays alive — not buried in a to-do list.' },
            { num: '04', title: 'Submit proof', desc: 'When the deadline arrives, submit evidence. A link, a photo, a message — whatever you agreed on.' },
            { num: '05', title: 'Get the final report', desc: 'Your judge passes or fails you. Both of you receive a final summary. No ambiguity.' },
          ].map((step) => (
            <RevealOnScroll key={step.num}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '28px 22px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display, serif)', fontSize: 36,
                  fontWeight: 900, color: 'var(--text-dim)', lineHeight: 1, marginBottom: 16,
                }}>
                  {step.num}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, fontWeight: 300 }}>
                  {step.desc}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', maxWidth: 1100, margin: '0 auto' }} />

      {/* ── WHY IT WORKS ── */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80, alignItems: 'start',
        }}>
          <RevealOnScroll>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
            }}>Why It Works</p>
            <h2 style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: 24,
            }}>
              Real accountability hits different.
            </h2>
            <div style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300 }}>
              <p style={{ marginBottom: 14 }}>
                Most productivity apps are private. You track habits solo. You miss a day and you&apos;re
                the only one who knows. It&apos;s easy to quietly reset the streak and move on.
              </p>
              <p style={{ marginBottom: 14 }}>
                {BRAND.name} works because{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>
                  another person knows what you promised
                </strong>{' '}
                — and verifies whether you followed through.
              </p>
              <p>
                That relationship changes everything. You&apos;re not just letting down an app.
                You&apos;re answering to someone who matters.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border-warm)',
              borderRadius: 14, padding: 36, boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display, serif)', fontSize: 22,
                fontWeight: 700, fontStyle: 'italic', lineHeight: 1.45,
                color: 'var(--text)', marginBottom: 20,
              }}>
                &ldquo;Having Kai actually check in made it impossible to rationalize skipping.
                I didn&apos;t want to explain why I failed.&rdquo;
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                <strong style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Brian</strong>
                {' '}— founder, lost $50 to Kai once. Now he doesn&apos;t.
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', maxWidth: 1100, margin: '0 auto' }} />

      {/* ── USE CASES ── */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealOnScroll>
          <p style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
          }}>Who It&apos;s For</p>
          <h2 style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: 16,
          }}>
            For the commitments you keep avoiding.
          </h2>
          <p style={{
            fontSize: 17, color: 'var(--text-muted)', fontWeight: 300,
            maxWidth: 600, marginBottom: 48,
          }}>
            {BRAND.name} isn&apos;t for every tiny habit. It&apos;s for the things that actually matter
            — the ones you&apos;ve been putting off for months.
          </p>
        </RevealOnScroll>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12,
        }}>
          {[
            { icon: '🚀', title: 'Builder Deadlines', desc: 'Ship the MVP. Launch the page. Send the cold email. Make the deadline real.' },
            { icon: '💪', title: 'Fitness Challenges', desc: '30 days of workouts. A race goal. A weight target. With someone watching.' },
            { icon: '📚', title: 'School & Studying', desc: 'Finish the paper before the all-nighter. Study for the test. Prove it to someone.' },
            { icon: '📈', title: 'Trading & Poker Discipline', desc: 'Stick to the rules. Follow the strategy. Don\'t tilt. Your judge sees the log.' },
            { icon: '🎨', title: 'Creative Projects', desc: 'Finish the chapter. Post the video. Ship the design. Stop waiting for perfect.' },
            { icon: '🔄', title: 'Personal Reset Goals', desc: 'The thing you promised yourself for months. Make it real this time.' },
          ].map((item) => (
            <RevealOnScroll key={item.title}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: 24,
              }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 6 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, fontWeight: 300 }}>
                  {item.desc}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── STAKES ── */}
      <div style={{ background: 'var(--surface-2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px' }}>
          <RevealOnScroll>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
            }}>Stakes</p>
            <h2 style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: 16,
            }}>
              Add stakes when the<br />promise needs bite.
            </h2>
            <p style={{
              fontSize: 17, color: 'var(--text-muted)', fontWeight: 300,
              maxWidth: 600, marginBottom: 48,
            }}>
              Money is optional. Accountability is not. Choose what makes this promise hard enough to keep.
            </p>
          </RevealOnScroll>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12,
          }}>
            {[
              { emoji: '💸', title: 'Money Stakes', desc: 'Escrow a real amount. Fail, and it\'s gone. Succeed, and it\'s yours back.' },
              { emoji: '📣', title: 'Social Consequences', desc: 'A public post, a group announcement, or a message to the people who matter.' },
              { emoji: '🎯', title: 'Custom Penalties', desc: 'You define what failure costs. The judge enforces it.' },
              { emoji: '🤝', title: 'Judge Verification', desc: 'Sometimes just knowing someone you respect will review your proof is enough.' },
            ].map((item) => (
              <RevealOnScroll key={item.title}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: 22, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <p style={{ marginTop: 28, fontSize: 14, color: 'var(--text-dim)', fontStyle: 'italic' }}>
              No money required to start. Add it when the commitment needs more weight.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* ── COMPARISON ── */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealOnScroll>
          <p style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
          }}>Positioning</p>
          <h2 style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: 16,
          }}>
            Not another habit tracker.
          </h2>
          <div style={{ fontSize: 17, color: 'var(--text-muted)', fontWeight: 300, maxWidth: 600, marginBottom: 48 }}>
            <p style={{ marginBottom: 14 }}>
              Habit trackers help you record behavior. {BRAND.name} helps you make a serious promise to someone real.
            </p>
            <p>
              This isn&apos;t for tracking every tiny habit. It&apos;s for{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>
                the commitment you keep avoiding.
              </strong>
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{
            border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden',
          }}>
            {/* Header row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface-2)',
            }}>
              <div style={{ padding: '18px 24px', fontSize: 12, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-dim)', borderRight: '1px solid var(--border)' }} />
              <div style={{ padding: '18px 24px', fontSize: 12, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-dim)', borderRight: '1px solid var(--border)' }}>
                Habit Trackers
              </div>
              <div style={{ padding: '18px 24px', fontSize: 12, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-dim)', background: 'rgba(232,201,122,0.04)' }}>
                {BRAND.name}
              </div>
            </div>

            {[
              {
                feature: 'Accountability',
                them: <><span style={{ color: 'var(--red)', marginRight: 6 }}>✗</span>Private — you alone</>,
                us: <><span style={{ color: 'var(--green)', marginRight: 6 }}>✓</span>A real person verifies</>,
              },
              {
                feature: 'Stakes',
                them: <><span style={{ color: 'var(--red)', marginRight: 6 }}>✗</span>None — easy to quit</>,
                us: <><span style={{ color: 'var(--green)', marginRight: 6 }}>✓</span>Optional but real</>,
              },
              {
                feature: 'Proof',
                them: <><span style={{ color: 'var(--red)', marginRight: 6 }}>✗</span>Self-reported streaks</>,
                us: <><span style={{ color: 'var(--green)', marginRight: 6 }}>✓</span>Judge reviews evidence</>,
              },
              {
                feature: 'Use case',
                them: 'Daily habits, tracking',
                us: 'The serious one-time commitment you keep avoiding',
              },
              {
                feature: 'Failure cost',
                them: <><span style={{ color: 'var(--red)', marginRight: 6 }}>✗</span>Broken streak, reset quietly</>,
                us: <><span style={{ color: 'var(--green)', marginRight: 6 }}>✓</span>Someone else knows</>,
              },
            ].map((row, i, arr) => (
              <div key={row.feature} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ padding: '18px 24px', fontSize: 14, color: 'var(--text-muted)', borderRight: '1px solid var(--border)' }}>
                  {row.feature}
                </div>
                <div style={{ padding: '18px 24px', fontSize: 14, color: 'var(--text-dim)', borderRight: '1px solid var(--border)' }}>
                  {row.them}
                </div>
                <div style={{ padding: '18px 24px', fontSize: 14, color: 'var(--text)', fontWeight: 500, background: 'rgba(232,201,122,0.04)' }}>
                  {row.us}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', maxWidth: 1100, margin: '0 auto' }} />

      {/* ── FINAL CTA ── */}
      <section style={{
        textAlign: 'center', padding: '120px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(232,201,122,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
          <RevealOnScroll>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20,
            }}>Get Started</p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: 16,
            }}>
              Ready to make it real?
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p style={{
              fontSize: 17, color: 'var(--text-muted)', fontWeight: 300,
              lineHeight: 1.75, marginBottom: 40,
            }}>
              Create your first commitment, choose your judge, and make the promise harder to escape.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <a
              href={CTA_HREF}
              style={{
                background: 'var(--text)', color: 'var(--bg)',
                padding: '15px 40px', borderRadius: 8, fontSize: 15, fontWeight: 500,
                border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
              }}
            >
              Create a Commitment
            </a>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '32px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div style={{
          fontFamily: 'var(--font-display, serif)', fontSize: 18,
          fontWeight: 700, color: 'var(--text-muted)',
        }}>
          {BRAND.nameBase}<span style={{ color: 'var(--accent)' }}>{BRAND.nameAccent}</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ fontSize: 13, color: 'var(--text-dim)', textDecoration: 'none' }}>
            Privacy
          </Link>
          <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-dim)', textDecoration: 'none' }}>
            Terms
          </Link>
          <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>
            Real commitments. Real people. — {BRAND.legal}
          </span>
        </div>
      </footer>

    </div>
  );
}
