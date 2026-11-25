import React, { useState, useMemo } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./components.module.css";

const COMPONENTS_DATA = [
  {
    id: "DualDate",
    name: "DualDate",
    category: "Form Controls",
    desc: "Synchronized Hijri and Gregorian calendar picker with mutual date synchronization, Umm al-Qura calculations, and server validation.",
    status: "NEW",
    isWide: true,
    previewImage: "/img/previews/DualDate.png",
    variants: ["Hijri Mode", "Gregorian Sync", "Min/Max Constraints"],
    invocation: '@await Html.PartialAsync("UI/_DualDate", new { id = "FilingDate" })',
    path: "/docs/components/DualDate",
    highlights: ["Bi-directional Hijri & Gregorian translation", "Umm al-Qura astronomical accuracy", "Single model submission payload"]
  },
  {
    id: "MomahTable",
    name: "MomahTable Grid",
    category: "Data Display",
    desc: "High-density client data grid with dynamic column toggling, multi-field filtering, client pagination, and export capabilities.",
    status: "UPDATED",
    isWide: true,
    previewImage: "/img/previews/MomahTable.png",
    variants: ["Column Picker", "Client Filter", "Pagination Controls"],
    invocation: 'MomahTable.init({ selector: "#casesGrid", columns: [...] })',
    path: "/docs/components/momah-table",
    highlights: ["Zero client dependency overhead", "Instant client-side filter engine", "Column visibility selector"]
  },
  {
    id: "DateInput",
    name: "DateInput",
    category: "Form Controls",
    desc: "Single date input field with integrated Umm al-Qura or Gregorian calendar popup and validation adornments.",
    status: "STABLE",
    previewImage: "/img/previews/DateInput.png",
    variants: ["Umm al-Qura", "Gregorian", "Required Marker"],
    invocation: '@await Html.PartialAsync("UI/_DateInput", new { id = "BirthDate" })',
    path: "/docs/components/DateInput",
  },
  {
    id: "DateRange",
    name: "DateRange",
    category: "Form Controls",
    desc: "Dual-calendar date range selector with start and end boundary validation and period presets.",
    status: "STABLE",
    previewImage: "/img/previews/DateRange.png",
    variants: ["Range Validation", "Umm al-Qura", "Gregorian"],
    invocation: '@await Html.PartialAsync("UI/_DateRange", new { id = "Period" })',
    path: "/docs/components/DateRange",
  },
  {
    id: "InputField",
    name: "InputField",
    category: "Form Controls",
    desc: "Labelled text input field with optional input types, validation markers, helper labels, and placeholder configuration.",
    status: "STABLE",
    previewImage: "/img/previews/InputField.png",
    variants: ["Text", "Email", "Password", "Required"],
    invocation: '@await Html.PartialAsync("UI/_InputField", new { id = "Username" })',
    path: "/docs/components/InputField",
  },
  {
    id: "AutoComplete",
    name: "AutoComplete",
    category: "Form Controls",
    desc: "Search-driven autocomplete select with local dictionary or remote AJAX endpoint integration and debounce.",
    status: "NEW",
    previewImage: "/img/previews/AutoComplete.png",
    variants: ["Local Dataset", "Remote AJAX", "Min Char Trigger"],
    invocation: '@await Html.PartialAsync("UI/_AutoComplete", new { id = "CitySearch" })',
    path: "/docs/components/AutoComplete",
  },
  {
    id: "MomahSelect",
    name: "MomahSelect",
    category: "Form Controls",
    desc: "Custom single or multi-select dropdown featuring live item search, dismissible chips, and extensible JavaScript API.",
    status: "STABLE",
    previewImage: "/img/previews/MomahSelect.png",
    variants: ["Single Select", "Multi Select", "Live Filter", "JS API"],
    invocation: '@await Html.PartialAsync("UI/_MomahSelect", new { id = "LegalTypes" })',
    path: "/docs/components/MomahSelect",
  },
  {
    id: "ChipSelect",
    name: "ChipSelect",
    category: "Form Controls",
    desc: "Multi-select dropdown with dismissible chips, tag limit indicators, and real-time substring filtering.",
    status: "NEW",
    previewImage: "/img/previews/ChipSelect.png",
    variants: ["Dismissible Chips", "Keyword Filter", "Tag Limit"],
    invocation: '@await Html.PartialAsync("UI/_ChipSelect", new { id = "CaseTags" })',
    path: "/docs/components/ChipSelect",
  },
  {
    id: "FileUpload",
    name: "FileUpload",
    category: "Form Controls",
    desc: "Drag-and-drop file upload zone with client-side file inspection, size validation, and allowed MIME type restrictions.",
    status: "STABLE",
    isWide: true,
    previewImage: "/img/previews/FileUpload.png",
    variants: ["Dropzone", "Size Validation", "Extension Filter"],
    invocation: '@await Html.PartialAsync("UI/_FileUpload", new { id = "EvidenceDocs" })',
    path: "/docs/components/FileUpload",
  },
  {
    id: "AttachBox",
    name: "AttachBox",
    category: "Form Controls",
    desc: "Compact attachment row with embedded document preview triggers, size badge, and secure download links.",
    status: "STABLE",
    previewImage: "/img/previews/AttachBox.png",
    variants: ["Inline Row", "Preview Trigger", "Download Link"],
    invocation: '@await Html.PartialAsync("UI/_AttachBox", new { fileId = "102" })',
    path: "/docs/components/AttachBox",
  },
  {
    id: "TextArea",
    name: "TextArea",
    category: "Form Controls",
    desc: "Multi-line text input field with configurable row limits, floating labels, and required validation attributes.",
    status: "STABLE",
    previewImage: "/img/previews/TextArea.png",
    variants: ["Configurable Rows", "Floating Label", "Character Count"],
    invocation: '@await Html.PartialAsync("UI/_TextArea", new { id = "CaseSummary" })',
    path: "/docs/components/TextArea",
  },
  {
    id: "CkEditor",
    name: "CkEditor",
    category: "Form Controls",
    desc: "CKEditor 5 enterprise rich-text editing wrapper with preconfigured Word-style formatting toolbar and asset guard.",
    status: "STABLE",
    previewImage: "/img/previews/CkEditor.png",
    variants: ["Rich Text", "Word Toolbar", "Required Check"],
    invocation: '@await Html.PartialAsync("UI/_CkEditor", new { id = "BriefEditor" })',
    path: "/docs/components/CkEditor",
  },
  {
    id: "Badge",
    name: "Badge",
    category: "Data Display",
    desc: "Status indicator badge supporting custom color themes, status dots, border controls, and positional tuples.",
    status: "STABLE",
    previewImage: "/img/previews/Badge.png",
    variants: ["Status Dot", "Custom Border", "Positional Tuple", "Anonymous Object"],
    invocation: '@await Html.PartialAsync("UI/_Badge", ("#263B2B", "#E9EBDD", "Active"))',
    path: "/docs/components/Badge",
  },
  {
    id: "AttachmentCard",
    name: "AttachmentCard",
    category: "Data Display",
    desc: "Standardized document card with file format indicator, timestamp, size readout, and built-in modal preview trigger.",
    status: "STABLE",
    previewImage: "/img/previews/AttachmentCard.png",
    variants: ["Document Metadata", "Format Badge", "Modal Preview"],
    invocation: '@await Html.PartialAsync("UI/_AttachmentCard", new { fileName = "Brief.pdf" })',
    path: "/docs/components/AttachmentCard",
  },
  {
    id: "Tooltip",
    name: "Tooltip",
    category: "Overlays & Feedback",
    desc: "Lightweight contextual tooltip supporting rich HTML markup and automatic viewport boundary placement.",
    status: "STABLE",
    previewImage: "/img/previews/Tooltip.png",
    variants: ["Top / Bottom / Left / Right", "HTML Content", "Auto Boundary"],
    invocation: '@await Html.PartialAsync("UI/_Tooltip", new { content = "Case Note" })',
    path: "/docs/components/Tooltip",
  },
  {
    id: "LabelTip",
    name: "LabelTip",
    category: "Overlays & Feedback",
    desc: "Field label with an integrated contextual hint icon, tooltip trigger, and optional text truncation.",
    status: "STABLE",
    previewImage: "/img/previews/LabelTip.png",
    variants: ["Hint Icon", "Ellipsis Truncation", "Popover Help"],
    invocation: '@await Html.PartialAsync("UI/_LabelTip", new { label = "Court ID" })',
    path: "/docs/components/LabelTip",
  },
  {
    id: "Banner",
    name: "Banner",
    category: "Overlays & Feedback",
    desc: "High-priority information banner with dismiss actions, theme variants, and custom icon slots.",
    status: "STABLE",
    previewImage: "/img/previews/Banner.png",
    variants: ["Info", "Warning", "Success", "Dismissible"],
    invocation: '@await Html.PartialAsync("UI/_Banner", new { title = "Hearing Notice" })',
    path: "/docs/components/Banner",
  },
  {
    id: "Notification",
    name: "Notification",
    category: "Overlays & Feedback",
    desc: "Structured static notification box displaying status iconography, header, and descriptive feedback.",
    status: "STABLE",
    previewImage: "/img/previews/Notification.png",
    variants: ["Operational Status", "Icon Prefix", "Action Link"],
    invocation: '@await Html.PartialAsync("UI/_Notification", new { title = "Case Archived" })',
    path: "/docs/components/Notification",
  },
  {
    id: "PromptModal",
    name: "PromptModal",
    category: "Overlays & Feedback",
    desc: "Confirmation and prompt modal dialog featuring an optional required textarea for audit reasoning.",
    status: "NEW",
    previewImage: "/img/previews/PromptModal.png",
    variants: ["Confirmation", "Audit Reason Input", "Destructive Action"],
    invocation: '@await Html.PartialAsync("UI/_PromptModal", new { id = "ArchiveCaseModal" })',
    path: "/docs/components/PromptModal",
  },
  {
    id: "Breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    desc: "Accessible breadcrumb trail conforming to enterprise application navigation standards with custom separators.",
    status: "STABLE",
    previewImage: "/img/previews/Breadcrumb.png",
    variants: ["Hierarchical Trail", "Active Item", "Custom Separator"],
    invocation: '@await Html.PartialAsync("UI/_Breadcrumb", new { items = [...] })',
    path: "/docs/components/Breadcrumb",
  },
];

const CATEGORIES = [
  "All Components",
  "Form Controls",
  "Data Display",
  "Overlays & Feedback",
  "Navigation",
];

export default function ComponentAtelier() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All Components");

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { "All Components": COMPONENTS_DATA.length };
    CATEGORIES.forEach((c) => {
      if (c !== "All Components") {
        counts[c] = COMPONENTS_DATA.filter((item) => item.category === c).length;
      }
    });
    return counts;
  }, []);

  // Filter components
  const filtered = useMemo(() => {
    return COMPONENTS_DATA.filter((item) => {
      const matchesCat =
        selectedCat === "All Components" || item.category === selectedCat;
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.invocation.toLowerCase().includes(query) ||
        item.variants.some((v) => v.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [search, selectedCat]);

  // Featured component selection:
  // Dynamically selects the centerpiece for the active category
  const featuredComponent = useMemo(() => {
    if (search.trim()) return null; // Hide featured during search to focus on results
    if (selectedCat === "Data Display") {
      return COMPONENTS_DATA.find((c) => c.id === "MomahTable");
    }
    if (selectedCat === "Overlays & Feedback") {
      return COMPONENTS_DATA.find((c) => c.id === "PromptModal");
    }
    if (selectedCat === "Navigation") {
      return COMPONENTS_DATA.find((c) => c.id === "Breadcrumb");
    }
    // Default (All or Form Controls)
    return COMPONENTS_DATA.find((c) => c.id === "DualDate");
  }, [selectedCat, search]);

  // Remaining gallery items (exclude the currently featured item when featured is shown)
  const galleryItems = useMemo(() => {
    if (!featuredComponent) return filtered;
    return filtered.filter((item) => item.id !== featuredComponent.id);
  }, [filtered, featuredComponent]);

  return (
    <Layout
      title="Component Atelier — Momah Kit"
      description="Architectural registry of 20 production-grade ASP.NET Core Razor partial views. Zero runtime hydration overhead, strict model validation, and encapsulated assets."
    >
      <div className={styles.atelierContainer}>
        <div className={styles.atelierInner}>
          
          {/* ==============================================================
              A. EDITORIAL HEADER & INTEGRATED SEARCH
              ============================================================== */}
          <header className={styles.introHeader}>
            <div className={styles.headerBadgeRow}>
              <span className={styles.registryEyebrow}>COMPONENT ATELIER // ARCHITECTURAL REGISTRY</span>
              <span className={styles.versionPill}>v1.0.0 Enterprise</span>
            </div>

            <div className={styles.introMain}>
              <div className={styles.introText}>
                <h1 className={styles.pageTitle}>Explore Components</h1>
                <p className={styles.pageDescription}>
                  A curated collection of 20 enterprise Razor partial views designed
                  for high-throughput ASP.NET Core applications. Zero client hydration overhead,
                  direct C# model-binding integration, and encapsulated asset pipelines.
                </p>
              </div>

              {/* Refined Integrated Search Composition */}
              <div className={styles.searchBox}>
                <div className={styles.searchInputWrapper}>
                  <svg
                    className={styles.searchIconSvg}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    aria-label="Filter components"
                    placeholder="Search components, properties, syntax..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                  {search && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                      className={styles.clearBtn}
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className={styles.searchMeta}>
                  <span className={styles.countText}>
                    Showing <strong>{filtered.length}</strong> of {COMPONENTS_DATA.length} partials
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural Stats Banner */}
            <div className={styles.metricsStrip}>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>20</span>
                <span className={styles.metricLabel}>Production Partials</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>4</span>
                <span className={styles.metricLabel}>Architectural Domains</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>100%</span>
                <span className={styles.metricLabel}>Server-Rendered Velocity</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>0 kB</span>
                <span className={styles.metricLabel}>Client Hydration Overhead</span>
              </div>
            </div>
          </header>

          {/* ==============================================================
              B. EDITORIAL LAYOUT (CATEGORY RAIL + DISCOVERY GALLERY)
              ============================================================== */}
          <div className={styles.atelierLayout}>
            
            {/* Category Navigation Rail */}
            <aside className={styles.categoryRail} aria-label="Component categories">
              <div className={styles.railHeader}>
                <span className={styles.railTitle}>CATEGORIES</span>
              </div>
              <nav className={styles.railNav}>
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCat === cat;
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCat(cat)}
                      className={`${styles.railItem} ${
                        isActive ? styles.railItemActive : ""
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className={styles.railItemLabel}>{cat}</span>
                      <span className={styles.railItemBadge}>{count}</span>
                    </button>
                  );
                })}
              </nav>

              {(selectedCat !== "All Components" || search) && (
                <div className={styles.resetFiltersBox}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCat("All Components");
                      setSearch("");
                    }}
                    className={styles.resetFiltersBtn}
                  >
                    Reset all filters ↺
                  </button>
                </div>
              )}
            </aside>

            {/* Main Stage: Featured Piece + Discovery Gallery */}
            <main className={styles.galleryStage}>
              
              {/* ============================================================
                  C. FEATURED COMPONENT CENTERPIECE
                  ============================================================ */}
              {featuredComponent && (
                <section className={styles.featuredSection} aria-label="Featured Component">
                  <div className={styles.featuredCard}>
                    <div className={styles.featuredContent}>
                      <div className={styles.featuredMetaRow}>
                        <span className={styles.featuredEyebrow}>ARCHITECTURAL CENTERPIECE</span>
                        <span className={styles.featuredCategoryBadge}>
                          {featuredComponent.category}
                        </span>
                        <span className={styles.featuredStatusBadge}>
                          {featuredComponent.status}
                        </span>
                      </div>

                      <h2 className={styles.featuredTitle}>{featuredComponent.name}</h2>
                      <p className={styles.featuredDesc}>{featuredComponent.desc}</p>

                      {featuredComponent.highlights && (
                        <ul className={styles.featuredHighlights}>
                          {featuredComponent.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}

                      <div className={styles.featuredCodeSnippet} title={featuredComponent.invocation}>
                        <code>{featuredComponent.invocation}</code>
                      </div>

                      <div className={styles.featuredActions}>
                        <Link
                          to={featuredComponent.path}
                          className={styles.featuredPrimaryCta}
                        >
                          Explore {featuredComponent.name} Guide →
                        </Link>
                      </div>
                    </div>

                    <div className={styles.featuredPreviewWrapper}>
                      <div className={styles.previewFrame}>
                        <img
                          src={featuredComponent.previewImage}
                          alt={`${featuredComponent.name} preview`}
                          className={styles.featuredPreviewImg}
                          loading="eager"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ============================================================
                  D. COMPONENT DISCOVERY GALLERY
                  ============================================================ */}
              <section className={styles.gallerySection} aria-label="Component directory">
                <div className={styles.gallerySectionHeader}>
                  <h3 className={styles.sectionHeading}>
                    {selectedCat === "All Components" ? "Component Directory" : selectedCat}
                  </h3>
                  <span className={styles.sectionCount}>
                    {galleryItems.length} {galleryItems.length === 1 ? "component" : "components"}
                  </span>
                </div>

                {galleryItems.length > 0 ? (
                  <div className={styles.cardsGrid}>
                    {galleryItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className={`${styles.atelierCard} ${
                          item.isWide ? styles.cardSpanWide : ""
                        }`}
                      >
                        {/* Authentic Component Preview Frame */}
                        <div className={styles.cardPreviewContainer}>
                          <div className={styles.previewFrameSmall}>
                            <img
                              src={item.previewImage}
                              alt={`${item.name} preview`}
                              className={styles.cardPreviewImg}
                              loading="lazy"
                            />
                          </div>
                        </div>

                        {/* Card Info Body */}
                        <div className={styles.cardBody}>
                          <div className={styles.cardHeader}>
                            <h4 className={styles.cardName}>{item.name}</h4>
                            <div className={styles.cardBadgeGroup}>
                              <span className={styles.cardStatusBadge}>{item.status}</span>
                            </div>
                          </div>

                          <p className={styles.cardDesc}>{item.desc}</p>

                          {/* Invocation snippet */}
                          <div className={styles.cardInvocation} title={item.invocation}>
                            <code>{item.invocation}</code>
                          </div>

                          {/* Variants list */}
                          <div className={styles.cardVariants}>
                            {item.variants.map((v) => (
                              <span key={v} className={styles.variantTag}>
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={styles.cardFooter}>
                          <span className={styles.cardCategory}>{item.category}</span>
                          <span className={styles.cardActionLink}>View Guide →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* ============================================================
                      E. SEARCH / FILTER EMPTY STATE
                      ============================================================ */
                  <div className={styles.emptyStateContainer}>
                    <div className={styles.emptyStateIcon}>∅</div>
                    <h4 className={styles.emptyTitle}>No matching components found</h4>
                    <p className={styles.emptyDesc}>
                      No component found matching &ldquo;{search}&rdquo; within {selectedCat}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSelectedCat("All Components");
                      }}
                      className={styles.emptyActionBtn}
                    >
                      Clear search & reset filters
                    </button>
                  </div>
                )}
              </section>
            </main>
          </div>

        </div>
      </div>
    </Layout>
  );
}
