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
- [X] sort explorer by modified time (and only most recent files)
- [X] better font and light/dark colors
- [X] early 2000's [html?](https://localghost.dev/blog/building-a-website-like-it-s-1999-in-2022/)
- [X] make articles more spaced out
- [X] make a dedicated, responsive-only navbar component. This could be combined with PageTitle

### content
- [ ] better index page
- [ ] connect writings

## formatting
- [ ] find a way to make the duck look nicer in the callout
- [ ] minimize images in portfolio

### styling
- [ ] slow transition light/darkmode
- [ ] spacing of badges
- [ ] spacing of new-lines
- [ ] figure out scss for LinksHeader
- [ ] LinksHeader should pass in parameters
- [ ] LinksHeader -> NavBar
- [ ] hover-over tags
- [ ] highlight vistited links

### personal
- [ ] remove quartz banner
- [ ] unique cursors
- [ ] unique branding
- [ ] aesthetic [text dividers](https://quartz.eilleeenz.com/)

### technical
- [ ] setup [commenting](https://www.chadly.net/)
- [ ] find a way to setup view counts
- [ ] setup newsletters