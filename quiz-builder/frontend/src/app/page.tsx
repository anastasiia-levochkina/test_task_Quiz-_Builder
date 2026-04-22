import Link from 'next/link';

export default function HomePage() {
  return (
    <section style={{ paddingTop: '48px' }}>
      <h1
        style={{
          fontSize: '44px',
          lineHeight: 1.1,
          marginBottom: '16px',
          letterSpacing: '-0.03em',
        }}
      >
        Build and manage quizzes
        <br />
        in one simple place
      </h1>

      <p
        style={{
          maxWidth: '560px',
          color: '#6b7280',
          fontSize: '16px',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}
      >
        Create quizzes with different question types, view all saved quizzes,
        and open each quiz in detail.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link
          href="/create"
          style={{
            padding: '12px 18px',
            background: '#111111',
            color: '#ffffff',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Create Quiz
        </Link>

        <Link
          href="/quizzes"
          style={{
            padding: '12px 18px',
            background: '#ffffff',
            color: '#111111',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          View Quizzes
        </Link>
      </div>
    </section>
  );
}
