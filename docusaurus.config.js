// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Momah Kit",
  tagline: "Enterprise ASP.NET MVC UI Components Library",
  favicon: "img/favicon.svg",
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/svg+xml",
        href: "/img/favicon.svg",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/img/favicon-32.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/img/favicon-16.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/favicon-256.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "alternate icon",
        href: "/favicon.ico",
      },
    },
  ],

  future: {
    v4: true,
  },

  // TODO: placeholder. Set the real production URL before deploying;
  // canonical links and sitemap.xml are built from it.
  url: "https://momah-components.example.com",
  baseUrl: "/",

  onBrokenLinks: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Momah Kit",
        logo: {
          alt: "Momah Kit Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "right",
            label: "Documentation",
          },
          {
            to: "/components",
            label: "Components",
            position: "right",
          },
          {
            href: "https://github.com/bahaayoussof/momah-kit",
            label: "GitHub",
            position: "right",
            className: "navbar-github-link",
          },
        ],
      },
      footer: {
        style: "light",
        copyright: `© ${new Date().getFullYear()} Momah Kit. Built by <a href="https://www.linkedin.com/in/bahaayoussof/" target="_blank" rel="noopener noreferrer">Bahaa Youssof</a>. Crafted for enterprise ASP.NET MVC architectures.`,
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          "csharp",
          "aspnet",
          "bash",
          "json",
          "markup-templating",
        ],
      },
    }),
};

export default config;
