import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "jkru3.xyz",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // handwritten: "Caveat", "Merienda", "Shadows Into Light", 
        // retro: "Courier Prime", "Space Mono", "Righteous", "Press Start 2P",
        header: "Space Mono",
        body: "IBM Plex Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fdf6f0",
          lightgray: "#e2dedb",
          gray: "#a3b3b0",
          darkgray: "#2a2e2f",
          dark: "#2f3f3d",
          secondary: "#d46022",
          tertiary: "#1fbaa0",
          highlight: "rgba(217, 136, 91, 0.15)",
          textHighlight: "#ffdca388",
        },
        darkMode: {
          light: "#111c25",
          lightgray: "#2a3b4d",
          gray: "#4b657d",
          darkgray: "#e2e8ea",          // light gray-blue for legibility on dark bg
          dark: "#fca785",
          secondary: "#f4ede9",
          tertiary: "#1fbaa0",
          highlight: "rgba(227, 167, 124, 0.12)",
          textHighlight: "#ffc78e88",
        }
      }       
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: true,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
