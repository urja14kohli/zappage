import Link from "next/link";

const SECTIONS = [
  { id: "eligibility", title: "1. Eligibility and account requirements" },
  { id: "service", title: "2. Service description and features" },
  { id: "aup", title: "3. Acceptable use policy" },
  { id: "integrations", title: "4. Third-party integrations, API access, and data" },
  { id: "ip", title: "5. Content ownership and intellectual property" },
  { id: "privacy", title: "6. Privacy and data handling" },
  { id: "billing", title: "7. Payments, credits, and billing" },
  { id: "availability", title: "8. Service availability and modifications" },
  { id: "termination", title: "9. Account termination" },
  { id: "liability", title: "10. Disclaimers and limitation of liability" },
  { id: "law", title: "11. Governing law and disputes" },
  { id: "updates", title: "12. Updates and contact information" },
];

export const metadata = {
  title: "Terms of Use • Zap by Sonetz Inc.",
  description:
    "Terms governing access to and use of Zap by Sonetz Inc. website, apps, and services.",
};

export default function TermsPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900 dark:bg-[#0B0911] dark:text-neutral-100">
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        {/* Heading */}
        <header className="mb-8 border-b border-neutral-200 pb-6 dark:border-neutral-800">
          {/* Back navigation */}
          <div className="mb-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Last updated: 14 August 2025
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600 dark:text-neutral-300">
            Welcome to Zap by Sonetz Inc. (&ldquo;Zap&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). These Terms govern your
            access to and use of our website, applications, AI content tools, and social media
            management services. By using the Services, you agree to these Terms.
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-[260px_1fr]">
          {/* TOC (sticky on desktop) */}
          <aside className="md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:overflow-auto">
            <nav className="space-y-1 text-sm">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-md px-3 py-2 text-neutral-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900 hover:px-4 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article className="max-w-none text-[15px] leading-7">
            <Section id="eligibility" title="1. Eligibility and account requirements">
              <ul className="list-disc pl-5">
                <li>18+ or legal age of majority in your jurisdiction</li>
                <li>Accurate and current registration information</li>
                <li>Maintain credentials; you&apos;re responsible for all account activity</li>
                <li>Use Zap in compliance with laws and platform policies</li>
              </ul>
              <p className="mt-3">
                Security issues? Email <a className="link" href="mailto:security@sonetz.com">security@sonetz.com</a>.
              </p>
            </Section>

            <Section id="service" title="2. Service description and features">
              <p>Zap provides AI-powered content creation and social publishing tools, including:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>AI-generated posts, images, and videos; brand-voice training</li>
                <li>Scheduling and multi-platform publishing (Instagram, LinkedIn, YouTube, X, etc.)</li>
                <li>Analytics, insights, and content calendar</li>
                <li>Credit system for certain features (non-transferable; expiry shown at purchase)</li>
                </ul>
            </Section>

            <Section id="aup" title="3. Acceptable use policy">
              <p className="mb-1 font-medium">Permitted</p>
              <ul className="list-disc pl-5">
                <li>Create original content for your brand</li>
                <li>Publish to accounts you own or manage</li>
                <li>Use AI tools for legitimate commercial purposes</li>
                  </ul>
              <p className="mt-3 mb-1 font-medium">Prohibited</p>
              <ul className="list-disc pl-5">
                <li>Illegal content or policy violations</li>
                <li>IP/privacy infringements, harassment, malware, fraud, spam</li>
                <li>Unauthorized access, resale, or circumvention of limits</li>
                  </ul>
              <p className="mt-3">Violations may result in suspension or termination.</p>
            </Section>

            <Section id="integrations" title="4. Third-party integrations, API access, and data">
              <p>
                When you connect social accounts, you authorize Zap to access permitted profile,
                content, analytics, and publishing scopes via official APIs. Credentials and tokens
                are encrypted; data moves over HTTPS (TLS 1.3).
              </p>
            </Section>

            <Section id="ip" title="5. Content ownership and intellectual property">
              <ul className="list-disc pl-5">
                <li><span className="font-medium">Your content:</span> you retain ownership; you warrant necessary rights.</li>
                <li><span className="font-medium">Our license:</span> limited to storing/processing to provide the Services.</li>
                <li><span className="font-medium">AI-generated content:</span> becomes yours; similar outputs may occur; copyright eligibility can vary by jurisdiction.</li>
                  </ul>
            </Section>

            <Section id="privacy" title="6. Privacy and data handling">
              <p>
                See our <Link className="link" href="/privacy">Privacy Policy</Link>.
                We do not sell personal data; we encrypt in transit and at rest; you can request deletion.
              </p>
            </Section>

            <Section id="billing" title="7. Payments, credits, and billing">
              <p className="mb-2">For current pricing and plans, see our <Link className="link" href="/pricing">Pricing page</Link>.</p>
              <p className="mt-3">
                Purchases are final except where required by law. Credits expire 30 days after purchase and
                do not roll over. Prices may change with 30 days&apos; notice to existing users.
              </p>
            </Section>

            <Section id="availability" title="8. Service availability and modifications">
              <ul className="list-disc pl-5">
                <li>Planned maintenance with reasonable notice</li>
                <li>Features may be modified or discontinued</li>
                <li>Third-party API limits can affect functionality</li>
                <li>Target 99.9% uptime (not guaranteed)</li>
                    </ul>
            </Section>

            <Section id="termination" title="9. Account termination">
              <p className="mb-2"><span className="font-medium">You:</span> close your account any time; unused credits are forfeited.</p>
              <p><span className="font-medium">We:</span> may terminate for violations, illegal activity, or as required by law/platform policies.</p>
            </Section>

            <Section id="liability" title="10. Disclaimers and limitation of liability">
              <p className="mb-2"><span className="font-medium">No warranty:</span> Services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;</p>
              <p>
                <span className="font-medium">Limitation:</span> to the maximum extent permitted by law, Sonetz Inc. is not liable for indirect or
                consequential damages; total liability is limited to fees paid in the prior 12 months.
              </p>
            </Section>

            <Section id="law" title="11. Governing law and disputes">
              <p>
                Laws of the United States apply. Disputes are resolved by binding arbitration under
                AAA rules; no class actions.
              </p>
            </Section>

            <Section id="updates" title="12. Updates and contact information">
              <p>
                We may update these Terms; material changes will be announced via email or in-app at
                least 30 days prior to effect. Contact:{" "}
                <a className="link" href="mailto:legal@sonetz.com">legal@sonetz.com</a> •{" "}
                <a className="link" href="mailto:support@sonetz.com">support@sonetz.com</a>
              </p>
              <p className="mt-2">
                Address: 1111 B S Governors Ave STE 21872, Dover, DE 19904
              </p>
            </Section>
          </article>
                </div>

        {/* Footer meta */}
        <footer className="mt-16 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          © {new Date().getFullYear()} Zap by Sonetz Inc. All rights reserved.
        </footer>
      </div>

      {/* Structured data: help search engines understand your terms page */}
      <script
        type="application/ld+json"
        // Minimal, neutral JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Zap",
            url: "https://zap.sonetz.com",
            termsOfService: "https://zap.sonetz.com/terms",
          }),
        }}
      />
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-8 first:pt-0">
      <h2 className="mb-3 text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-3 text-neutral-700 dark:text-neutral-300">{children}</div>
    </section>
  );
}