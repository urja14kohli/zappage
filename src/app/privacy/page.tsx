import LegalLayout from "@/components/LegalLayout";

const sections = [
  { id: "info-we-collect", title: "1. Information We Collect" },
  { id: "how-we-use", title: "2. How We Use Your Information" },
  { id: "sharing", title: "3. Information Sharing and Disclosure" },
  { id: "security", title: "4. Data Security and Protection" },
  { id: "rights", title: "5. Your Rights and Choices" },
  { id: "transfers", title: "6. International Data Transfers" },
  { id: "children", title: "7. Children&apos;s Privacy" },
  { id: "updates", title: "8. Policy Updates and Changes" },
  { id: "contact", title: "9. Contact Information" },
];

export default function Page() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="14 August 2025"
      sections={sections}
    >
      <p>
        This Privacy Policy explains how <strong>Zap by Sonetz Inc.</strong>{" "}
        (&ldquo;Zap&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) collects, uses, and safeguards your personal
        information when you use our platform, website, and API integrations.
      </p>

      <h2 id="info-we-collect">1. Information We Collect</h2>
      <h3>1.1 Account and Profile Information</h3>
      <ul>
        <li>Email address</li>
        <li>Workspace name</li>
        <li>Preferences (tone, style, timezone, language)</li>
        <li>Billing information (processed by our payment providers)</li>
                  </ul>

      <h3>1.2 Content and Media You Create</h3>
      <p>
        We store AI-generated and user-uploaded content (posts, images, videos,
        brand assets, prompts) while your account is active. You may delete items
        any time from Zap.
      </p>

      <h3>1.3 Social Media Integration Data</h3>
      <p>
        When you connect accounts (e.g., Instagram, LinkedIn, YouTube, X), we
        access data via official APIs with your consent. We retrieve profile,
        content, analytics, and audience data as permitted by each platform.
      </p>

      <h3>1.4 Technical and Usage Information</h3>
      <p>
        We collect device and usage data (IP, browser, pages visited, errors)
        and use cookies for authentication and analytics (with consent).
      </p>

      <h2 id="how-we-use">2. How We Use Your Information</h2>
      <ul>
        <li>Provide content creation and scheduling tools</li>
        <li>Surface analytics and recommendations</li>
        <li>Operate and improve the platform</li>
        <li>Send essential account communications</li>
        <li>Optional product updates (you can unsubscribe)</li>
                      </ul>

      <h2 id="sharing">3. Information Sharing and Disclosure</h2>
      <p>
        We do <strong>not sell</strong> your personal data. We share limited
        data with vetted service providers (hosting, payments, email, security,
        AI APIs) under strict agreements.
      </p>

      <h2 id="security">4. Data Security and Protection</h2>
      <ul>
        <li>TLS 1.3 in transit, AES-256 at rest</li>
        <li>MFA, RBAC, audit logging</li>
        <li>24/7 monitoring and incident response</li>
        <li>GDPR, CCPA, SOC 2 Type II practices</li>
                      </ul>

      <h3>4.2 Data Retention and Deletion</h3>
      <p>
        Account data is retained while active and then securely deleted on
        schedule. You can request deletion at any time.
      </p>

      <h2 id="rights">5. Your Rights and Choices</h2>
      <p>
        Depending on your location, you may access, correct, delete, restrict,
        object, and export personal data. Contact{" "}
        <a href="mailto:privacy@sonetz.com">privacy@sonetz.com</a>.
      </p>

      <h2 id="transfers">6. International Data Transfers</h2>
      <p>
        We process data globally with safeguards such as SCCs, encryption, and
        DPAs with providers.
      </p>

      <h2 id="children">7. Children&apos;s Privacy</h2>
      <p>
        Zap is not for users under 18. If we learn of underage use, we will
        delete the account and associated data.
      </p>

      <h2 id="updates">8. Policy Updates and Changes</h2>
      <p>
        We may update this policy. Material changes are announced in-app and by
        email with 30-day notice where required.
      </p>

      <h2 id="contact">9. Contact Information</h2>
      <p>
        Email: <a href="mailto:privacy@sonetz.com">privacy@sonetz.com</a>
        <br />
        Security: <a href="mailto:security@sonetz.com">security@sonetz.com</a>
        <br />
        DPO: <a href="mailto:dpo@sonetz.com">dpo@sonetz.com</a>
      </p>
      <p>Postal: Sonetz Inc., 1111 B S Governors Ave STE 21872, Dover, DE 19904</p>
    </LegalLayout>
  );
}
