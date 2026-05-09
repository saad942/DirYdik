import React from 'react';
import Nav from '../nav/Nav';

// Google Fonts: add to index.html or global CSS
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

const C = {
  sky:      '#EEF7FC',
  skyMid:   '#C5E4F3',
  skyDeep:  '#6BBDE0',
  skyRich:  '#2A8DC0',
  skyDark:  '#0F5A82',
  ink:      '#0B2D40',
  muted:    '#4A7A96',
  white:    '#FFFFFF',
  rule:     '#C5E4F3',
};

const missionCards = [
  {
    num: '01', emoji: '💰',
    title: 'Industry-leading wages',
    description: 'Full-time W2 employees earning $19–28/hr — the highest-paid housekeepers in Austin. Because great work deserves great pay.',
  },
  {
    num: '02', emoji: '👥',
    title: 'Built around family',
    description: 'Nearly all of our staff are mothers. Our scheduling ensures they finish by 3 pm — home in time for the moments that matter.',
  },
  {
    num: '03', emoji: '❤️',
    title: 'Full health coverage',
    description: 'Comprehensive health insurance for every employee and their family. Real peace of mind, not just a line item on a job posting.',
  },
  {
    num: '04', emoji: '🎓',
    title: 'Educational scholarships',
    description: 'We invest in futures — scholarships and professional development for every team member who wants to grow.',
  },
];

function Why() {
  return (
    <>
      <Nav />
      <div style={{ minHeight: '100vh', background: C.sky, color: C.ink, fontFamily: "'DM Sans', sans-serif" }}>

        {/* Hero */}
        <div style={{
          padding: '5rem 2rem 5.5rem', textAlign: 'center',
          background: C.skyDark, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: -2, left: 0, right: 0, height: '60px',
            background: C.sky, clipPath: 'ellipse(55% 100% at 50% 100%)',
          }} />

          <p style={{
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: C.skyMid, display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '1.5rem', position: 'relative',
          }}>
            <span style={{ display: 'block', width: '28px', height: '1px', background: C.skyDeep, opacity: 0.6 }} />
            Our mission
            <span style={{ display: 'block', width: '28px', height: '1px', background: C.skyDeep, opacity: 0.6 }} />
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 700,
            color: '#EEF7FC', lineHeight: 1.08, letterSpacing: '-0.02em', position: 'relative',
          }}>
            More than just<br />
            <em style={{ fontStyle: 'italic', color: C.skyDeep }}>clean homes.</em>
          </h1>

          <p style={{
            marginTop: '1.25rem', fontSize: '1rem', fontWeight: 300,
            color: C.skyMid, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto',
            lineHeight: 1.75, position: 'relative',
          }}>
            We're building a workplace that takes care of the people who take care of yours.
          </p>
        </div>

        {/* Mission Cards */}
        <div style={{ padding: '4.5rem 2rem', background: C.sky }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{
              fontSize: '10.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: C.skyRich, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem',
            }}>
              What sets us apart
              <span style={{ flex: 1, height: '1px', background: C.rule }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px', background: C.skyMid,
              border: `1px solid ${C.skyMid}`,
              borderRadius: '22px', overflow: 'hidden',
            }}>
              {missionCards.map((card) => (
                <div key={card.num} style={{ background: C.white, padding: '2.5rem 1.75rem' }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '3rem', fontWeight: 700,
                    color: C.skyMid, lineHeight: 1, marginBottom: '1rem',
                  }}>{card.num}</div>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: C.sky, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px', marginBottom: '1.25rem',
                    border: `1px solid ${C.skyMid}`,
                  }}>{card.emoji}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.2rem', fontWeight: 700,
                    color: C.ink, marginBottom: '0.6rem', lineHeight: 1.3,
                  }}>{card.title}</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: C.muted, fontWeight: 300 }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Family Section */}
        <div style={{ background: C.skyRich, padding: '5rem 2rem' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '4rem', alignItems: 'center',
            maxWidth: '1080px', margin: '0 auto',
          }}>
            <div>
              <p style={{
                fontSize: '10.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: C.skyMid, fontWeight: 500, marginBottom: '1.5rem',
              }}>Who we are</p>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700,
                lineHeight: 1.15, color: C.white, marginBottom: '1.25rem',
              }}>
                The MoreHands<br />
                <em style={{ fontStyle: 'italic', color: C.skyMid }}>family.</em>
              </h2>

              <p style={{
                fontSize: '1rem', color: '#B8D9EC',
                lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem',
              }}>
                As a family business, we take care of each other, our employees, and you.
                When everyone is valued, the work shows it — and then everyone gets to go home, happy.
              </p>

              <button style={{
                display: 'inline-block', padding: '0.75rem 2rem',
                border: `1px solid ${C.skyMid}`, borderRadius: '100px',
                fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                fontWeight: 500, color: C.white, background: 'transparent', cursor: 'pointer',
              }}>
                Learn more about us
              </button>
            </div>

            <div style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px' }}>
              <div style={{ aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', background: '#0A3D5C' }}>
                <video
                  src="/images/House-Cleaning.mp4"
                  autoPlay loop muted playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  aria-label="House Cleaning Video"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: C.white, padding: '4rem 2rem', borderTop: `1px solid ${C.rule}` }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            maxWidth: '860px', margin: '0 auto',
          }}>
            {[
              { num: '$19–28', label: 'Hourly wage range' },
              { num: '3 pm',   label: 'Family time starts' },
              { num: '100%',   label: 'Health coverage'   },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                textAlign: 'center', padding: '2rem 1rem',
                borderRight: i < arr.length - 1 ? `1px solid ${C.rule}` : 'none',
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 700,
                  color: C.skyRich, display: 'block', lineHeight: 1, marginBottom: '0.4rem',
                }}>{s.num}</span>
                <span style={{
                  fontSize: '0.78rem', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: C.muted, fontWeight: 500,
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default Why;