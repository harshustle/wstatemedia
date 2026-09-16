import React from 'react';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '3px' }}>
    <path
      d="M5 12.5l4.5 4.5L19 7"
      stroke="var(--fg)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const PricingCard = ({ title, subtitle, price, volume, features, special, disabled, buttonText = "GET STARTED" }) => {
  return (
    <div
      className={`pricing-card-wrapper ${special ? 'special' : 'normal'}`}
      style={{
        ...(special ? { paddingTop: 'var(--space-9)' } : {}),
        ...(disabled ? { opacity: 0.5, pointerEvents: 'none' } : {})
      }}
    >
      {special && (
        <div style={{
          position: 'absolute', top: 'var(--space-6)', left: 'var(--space-6)',
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          color: 'var(--muted-2)'
        }}>
          Most Popular
        </div>
      )}

      <h3 style={{
        fontSize: 'var(--text-xl)', fontWeight: 500, margin: 0,
        letterSpacing: 'var(--tracking-tight)', color: 'var(--fg)'
      }}>{title}</h3>
      <p style={{
        color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)',
        margin: 'var(--space-3) 0 var(--space-6)', lineHeight: 1.6
      }}>{subtitle}</p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
        <span className="pricing-price-text">{price}</span>
      </div>

      <p style={{
        color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)',
        fontWeight: 400, margin: '0 0 var(--space-6)', lineHeight: 1.5
      }}>
        {volume}
      </p>

      {disabled ? (
        <div style={{
          width: '100%', height: '46px', background: 'var(--secondary)',
          color: 'var(--muted-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--r)', fontWeight: 500, fontSize: '14px',
          letterSpacing: '-0.005em', marginBottom: 'var(--space-7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          NOT AVAILABLE
        </div>
      ) : (
        <a href="#contact" className="btn" style={{
          width: '100%', height: '46px', background: 'var(--primary)',
          color: 'var(--primary-foreground)', borderColor: 'var(--primary)',
          marginBottom: 'var(--space-7)'
        }}>
          {buttonText}
        </a>
      )}

      <p style={{
        margin: '0 0 var(--space-4)', paddingTop: 'var(--space-5)',
        borderTop: '1px solid var(--border)', fontSize: 'var(--text-sm)',
        fontWeight: 500, color: 'var(--fg)'
      }}>Includes:</p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {features.map((feature, idx) => (
          <li key={idx} style={{
            display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
            color: 'var(--muted-foreground)', fontSize: '14px', fontWeight: 400, lineHeight: 1.55
          }}>
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
