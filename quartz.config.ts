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
          light: "#fdf6f0",         // soft parchment
          lightgray: "#e2dedb",     // pale stone
          gray: "#a3b3b0",          // faded teal-gray
          darkgray: "#486461",      // deep desaturated teal
          dark: "#2f3f3d",          // charcoal teal
          secondary: "#d9885b",     // vintage sunset orange
          tertiary: "#7ea8a1",      // dusty teal
          highlight: "rgba(217, 136, 91, 0.15)", // orange haze
          textHighlight: "#ffdca388",           // amber glow
        },
        darkMode: {
          light: "#1c2423",         // deep teal-black
          lightgray: "#3d4a48",     // muted coal
          gray: "#7e918d",          // fogged green-gray
          darkgray: "#e3dcd3",      // pale tan
          dark: "#f6f2ed",          // light cream
          secondary: "#e29b74",     // soft sunset orange
          tertiary: "#88b6b1",      // light vintage teal
          highlight: "rgba(226, 155, 116, 0.15)", // warm overlay
          textHighlight: "#ffdca388",            // pale amber
        },
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
