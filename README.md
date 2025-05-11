# Quartz v4

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.
Quartz v4 features a from-the-ground rewrite focusing on end-user extensibility and ease-of-use.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>

## Usage
test locally
`npx quartz build --serve`

deploy
`npx quartz sync`

# TODO:
- [ ] seperate navbar from content: navbar could be out of content if necessary
- [ ] sort explorer by modified time (and only most recent files)
- [ ] styling
  - [X] early 2000's [html?](https://localghost.dev/blog/building-a-website-like-it-s-1999-in-2022/)
  - [ ] center components on right (and left)
  - [ ] hide tags. They are ugly
  - [ ] better font and light/dark colors
  - [ ] make articles more spaced out
- [ ] make a dedicated, responsive-only navbar component. This could be combined with PageTitle
- [ ] make light/darkmode more fancy
- [ ] connect writings
- [ ] highlight vistited links
- [ ] find a way to setup view counts
- [ ] setup newsletters


# Navbar Component Integration Guide for Quartz 4.0

This guide will help you implement a navbar component in Quartz 4.0 that uses content from your `navbar` folder.

## 1. Create Required Files

Place these files in your Quartz project:

- `quartz/components/NavbarComponent.tsx`: The main component
- `quartz/components/styles/navbar.scss`: Styling for the navbar
- `quartz/components/scripts/navbar.inline.ts`: JavaScript for interactions

## 2. Create the Navbar Content Folder

Create a folder in your content directory called `navbar`:

```
content/
  ├── navbar/
  │   ├── about.md
  │   ├── projects.md
  │   └── contact.md
  └── ...other content
```

## 3. Add Frontmatter to Navbar Items

Each Markdown file in the navbar folder should include frontmatter with at least a title. You can also add an optional `order` property to control the display order:

```markdown
---
title: About Me
order: 1
---

Content of the about page...
```

```markdown
---
title: Projects
order: 2
---

Content of the projects page...
```

## 4. Update Your Layout Configuration

Add the navbar component to your layout by updating your `quartz.layout.ts` file:

```typescript
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Import your custom NavbarComponent
import NavbarComponent from "./quartz/components/NavbarComponent"

// Default component for pages
export const defaultLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// Shared across all pages
export const sharedLayout: SharedLayout = {
  head: [
    Component.Head(),
  ],
  header: [
    NavbarComponent(), // Add your navbar component to the header
  ],
  footer: [
    Component.Footer(),
  ],
}
```

## 5. Customization Options

You can customize the navbar by passing options when initializing the component:

```typescript
NavbarComponent({
  // Custom title for the navbar (optional)
  title: "My Digital Garden",
  
  // Custom sorting function (optional)
  sortFn: (a, b) => {
    // Sort by order first, then alphabetically
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    return a.displayName.localeCompare(b.displayName)
  },
  
  // Custom filter function (optional)
  filterFn: (node) => {
    // Example: exclude items with "draft" in the title
    return !node.title.includes("draft")
  }
})
```

## 6. Add the Static Icon

Ensure you have an icon at `/static/icon.png` for the navbar logo. If you don't have one, you can:

1. Add an image to `public/static/icon.png`
2. Or modify the component to remove the image or use a different path

## Troubleshooting

If you encounter any issues:

1. Check that all files are in the correct locations
2. Ensure you have at least one page in the `navbar` folder
3. Try running `npx quartz build --serve --reload` to force a complete rebuild
4. Check the browser console for any JavaScript errors

## Further Customization

The navbar component is based on your Explorer component structure, so it follows similar patterns. You can further customize it by:

- Modifying the `navbar.scss` file to change the styling
- Enhancing `navbar.inline.ts` to add mobile menu functionality
- Updating the component in `NavbarComponent.tsx` to add additional features

This implementation provides a clean, responsive navbar that automatically pulls its links from your `navbar` folder.