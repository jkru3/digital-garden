import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import navbarStyle from "./styles/navbar.scss"

// @ts-ignore
import script from "./scripts/navbar.inline"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { resolveRelative } from "../util/path"
import { FilePath, SimpleSlug, FullSlug, joinSegments } from "../util/path"

// Interface for navbar items
interface NavItem {
  title: string
  slug: string
  displayName: string
  file: boolean
  order?: number
}

interface NavbarOptions {
  title?: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "link" | "collapse"
  useSavedState: boolean
  mapFn?: (node: NavItem) => NavItem
  sortFn?: (a: NavItem, b: NavItem) => number
  filterFn?: (node: NavItem) => boolean
}

const defaultOptions = {
  folderClickBehavior: "link" as const,
  folderDefaultState: "open" as const,
  useSavedState: true,
  mapFn: (node: NavItem) => {
    return node
  },
  sortFn: (a: NavItem, b: NavItem) => {
    // Sort by order first, then alphabetically
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    } else if (a.order !== undefined) {
      return -1 // a has order, b doesn't, a comes first
    } else if (b.order !== undefined) {
      return 1 // b has order, a doesn't, b comes first
    }
    
    // Sort alphabetically if no order is defined
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
  filterFn: (node: NavItem) => true, // Include all by default
} satisfies NavbarOptions

export default ((userOpts?: Partial<NavbarOptions>) => {
  // Parse config
  const opts: NavbarOptions = { ...defaultOptions, ...userOpts }

  // memoized
  let navItems: NavItem[] = []
  let lastBuildId: string = ""

  function constructNavItems(allFiles: any[]) {
    // Find files in the navbar folder
    navItems = allFiles
      .filter((file) => {
        // Check if file path starts with navbar/
        return file.slug.startsWith("../navbar/") && !file.slug.endsWith("index")
      })
      .map((file) => {
        const title = file.frontmatter?.title || file.title || 
                     file.slug.split("/").pop() || ""
        const order = file.frontmatter?.order

        return {
          title,
          slug: file.slug as SimpleSlug,
          displayName: title,
          file: true,
          order
        }
      })

    // Apply filters
    if (opts.filterFn) {
      navItems = navItems.filter(opts.filterFn)
    }

    // Apply mapping
    if (opts.mapFn) {
      navItems = navItems.map(opts.mapFn)
    }

    // Apply sorting
    if (opts.sortFn) {
      navItems = navItems.sort(opts.sortFn)
    }
  }

  const Navbar: QuartzComponent = ({
    ctx,
    cfg,
    allFiles,
    displayClass,
    fileData,
  }: QuartzComponentProps) => {
    if (ctx.buildId !== lastBuildId) {
      lastBuildId = ctx.buildId
      constructNavItems(allFiles)
    }

    // Properly handle slug types
    const currentSlug = fileData.slug ?? "/" as FullSlug
    
    return (
      <div class={classNames(displayClass, "navbar")}>
        <div class="navbar-container">
          <a href={resolveRelative(currentSlug, "/" as SimpleSlug)} class="navbar-logo">
            <img src="/static/icon.png" alt={cfg.pageTitle} />
            <span>{cfg.pageTitle}</span>
          </a>
          <div class="navbar-items">
            {navItems.map((item) => (
              <a 
                key={item.slug} 
                href={resolveRelative(currentSlug, item.slug as SimpleSlug)} 
                class="navbar-item"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  Navbar.css = navbarStyle
  Navbar.afterDOMLoaded = script
  return Navbar
}) satisfies QuartzComponentConstructor