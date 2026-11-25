import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("code");

  const snippetCode = `@await Html.PartialAsync("UI/_Badge", new {
    label = "Active Case",
    bgColor = "#E9EBDD",
    labelColor = "#263B2B",
    dot = true,
    radius = 6
})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout
      title="Momah Kit — Enterprise ASP.NET MVC UI Library"
      description="Architectural Razor UI component library for enterprise ASP.NET Core MVC solutions. Server-rendered velocity, encapsulated assets, and native model binding."
    >
      <div className={styles.homeContainer}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.brandBadge}>
                <span>MOMAH ARCHITECTURE V1.0</span>
              </div>
              <h1 className={styles.heroTitle}>
                Enterprise ASP.NET MVC
                <span className={styles.heroTitleHighlight}>
                  UI Components Library
                </span>
              </h1>
              <p className={styles.heroSubtitle}>
                Architectural Razor partial views designed for high-throughput
                ASP.NET Core MVC systems. Zero runtime hydration overhead, direct
                model-binding integration, and encapsulated assets.
              </p>

              <div className={styles.ctaGroup}>
                <Link to="/docs/intro" className={styles.primaryCta}>
                  Browse Documentation
                </Link>
                <Link to="/components" className={styles.secondaryCta}>
                  Component Explorer
                </Link>
              </div>

              <div className={styles.specStrip}>
                <div className={styles.specItem}>
                  <span className={styles.specDot} />
                  <span>20 Razor Partials</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specDot} />
                  <span>Dual Calendar Engine</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specDot} />
                  <span>Bootstrap 5 Aligned</span>
                </div>
              </div>
            </div>

            {/* HERO RIGHT: DEEP NAVY CODE WINDOW */}
            <div className={styles.heroRight}>
              <div className={styles.editorCard}>
                <div className={styles.editorTabsHeader}>
                  <div className={styles.editorTabsList}>
                    <button
                      type="button"
                      className={`${styles.editorTabItem} ${
                        activeTab === "code" ? styles.editorTabItemActive : ""
                      }`}
                      onClick={() => setActiveTab("code")}
                    >
                      Razor Snippet
                    </button>
                    <button
                      type="button"
                      className={`${styles.editorTabItem} ${
                        activeTab === "path" ? styles.editorTabItemActive : ""
                      }`}
                      onClick={() => setActiveTab("path")}
                    >
                      Views/Shared/UI/_Badge.cshtml
                    </button>
                  </div>
                  <div className={styles.editorActions}>
                    <button
                      type="button"
                      className={styles.editorCopyBtn}
                      onClick={handleCopy}
                      aria-label="Copy Razor code to clipboard"
                    >
                      {copied ? "Copied" : "Copy Code"}
                    </button>
                  </div>
                </div>

                {/* Deep Navy Code Body (#1E293B) */}
                <pre className={styles.codeBody}>
                  <div className={styles.lineNumbers} aria-hidden="true">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                  </div>
                  <code className={styles.codeLines}>
                    <span className={styles.cmt}>@* Invoke Momah Status Badge *@</span>
                    {"\n"}
                    <span className={styles.kwd}>@await</span>{" "}
                    <span className={styles.fn}>Html</span>.
                    <span className={styles.fn}>PartialAsync</span>(
                    <span className={styles.str}>"UI/_Badge"</span>,{" "}
                    <span className={styles.kwd}>new</span> &#123;
                    {"\n"}
                    {"    "}
                    <span className={styles.prop}>label</span> ={" "}
                    <span className={styles.str}>"Active Case"</span>,
                    {"\n"}
                    {"    "}
                    <span className={styles.prop}>bgColor</span> ={" "}
                    <span className={styles.str}>"#E9EBDD"</span>,
                    {"\n"}
                    {"    "}
                    <span className={styles.prop}>labelColor</span> ={" "}
                    <span className={styles.str}>"#263B2B"</span>,
                    {"\n"}
                    {"    "}
                    <span className={styles.prop}>dot</span> ={" "}
                    <span className={styles.kwd}>true</span>,
                    {"\n"}
                    {"    "}
                    <span className={styles.prop}>radius</span> ={" "}
                    <span className={styles.num}>6</span>
                    {"\n"}
                    &#125;)
                  </code>
                </pre>

                <div className={styles.editorFooter}>
                  <div className={styles.editorExplanation}>
                    Renders an accessible status badge directly on the server with
                    support for positional pattern-matching tuples or strongly-typed
                    view models.
                  </div>
                  <div className={styles.editorTip}>
                    <span className={styles.tipBadge}>Architecture Tip</span>
                    <span>
                      Encapsulated asset guards ensure partial CSS and JS files are
                      injected once per request, regardless of component repetition.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURAL PILLARS */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionCategory}>SYSTEM ARCHITECTURE</div>
            <h2 className={styles.sectionTitle}>Engineered for Server-Side Reliability</h2>
            <p className={styles.sectionSubtitle}>
              Core technical principles powering the Momah Kit component ecosystem.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>01 / RUNTIME</span>
              <h3 className={styles.pillarTitle}>Zero Hydration Delay</h3>
              <p className={styles.pillarDesc}>
                Full HTML is generated immediately in the Razor pipeline, eliminating
                client-side bootstrap waterfalls and virtual DOM reconciliation overhead.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>02 / BINDING</span>
              <h3 className={styles.pillarTitle}>Multi-Pattern Binding</h3>
              <p className={styles.pillarDesc}>
                Support for concise C# positional tuples for fast inline declarations,
                or strongly typed anonymous objects with property aliases.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>03 / ASSETS</span>
              <h3 className={styles.pillarTitle}>Asset Deduplication</h3>
              <p className={styles.pillarDesc}>
                Built-in ViewData guards register component styles and client scripts
                only once per request, keeping output markup compact and lean.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarNumber}>04 / FORMS</span>
              <h3 className={styles.pillarTitle}>Enterprise Form Integrity</h3>
              <p className={styles.pillarDesc}>
                Native support for dual Hijri/Gregorian calendars, Umm al-Qura date
                math, multi-select tag dismissals, and server validation states.
              </p>
            </div>
          </div>
        </section>

        {/* CORE COMPONENTS PREVIEW */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionCategory}>COMPONENT DIRECTORY</div>
            <h2 className={styles.sectionTitle}>Production-Ready Partials</h2>
            <p className={styles.sectionSubtitle}>
              Standardized primitives ready for immediate integration into your views.
            </p>
          </div>

          <div className={styles.componentsGrid}>
            <Link to="/docs/components/DualDate" className={styles.componentCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>DualDate</h3>
                  <span className={styles.statusBadge}>NEW</span>
                </div>
                <p className={styles.cardDesc}>
                  Synchronized Hijri and Gregorian calendar picker submitting matching
                  dates in a single standardized form input.
                </p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>Form Controls</span>
                <span className={styles.cardLink}>View Guide →</span>
              </div>
            </Link>

            <Link to="/docs/components/momah-table" className={styles.componentCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>MomahTable Grid</h3>
                  <span className={styles.statusBadge}>UPDATED</span>
                </div>
                <p className={styles.cardDesc}>
                  High-performance client grid with column selection, dynamic
                  multi-field filtering, and client pagination.
                </p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>Data Display</span>
                <span className={styles.cardLink}>View Guide →</span>
              </div>
            </Link>

            <Link to="/docs/components/MomahSelect" className={styles.componentCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>MomahSelect</h3>
                  <span className={styles.statusBadge}>STABLE</span>
                </div>
                <p className={styles.cardDesc}>
                  Single and multi-select dropdown featuring live item search, clear
                  buttons, and an extensible JavaScript API.
                </p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>Form Controls</span>
                <span className={styles.cardLink}>View Guide →</span>
              </div>
            </Link>

            <Link to="/docs/components/Badge" className={styles.componentCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Badge</h3>
                  <span className={styles.statusBadge}>STABLE</span>
                </div>
                <p className={styles.cardDesc}>
                  Semantic status indicator supporting color variations, status
                  dots, border controls, and custom typography sizing.
                </p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>Data Display</span>
                <span className={styles.cardLink}>View Guide →</span>
              </div>
            </Link>

            <Link to="/docs/components/FileUpload" className={styles.componentCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>FileUpload</h3>
                  <span className={styles.statusBadge}>STABLE</span>
                </div>
                <p className={styles.cardDesc}>
                  Drag-and-drop file upload zone with client-side file inspection, size
                  validation, and allowed MIME type restrictions.
                </p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>Form Controls</span>
                <span className={styles.cardLink}>View Guide →</span>
              </div>
            </Link>

            <Link to="/docs/components/PromptModal" className={styles.componentCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>PromptModal</h3>
                  <span className={styles.statusBadge}>NEW</span>
                </div>
                <p className={styles.cardDesc}>
                  Confirmation and prompt modal dialog featuring an optional
                  required textarea for audit reasoning.
                </p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>Overlays &amp; Feedback</span>
                <span className={styles.cardLink}>View Guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
