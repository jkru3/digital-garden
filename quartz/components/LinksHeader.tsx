import { QuartzComponentConstructor } from "./types"
// import style from "./styles/linksHeader.scss"

interface Options {
  links: Record<string, string>
}

export default (() => {
  function LinksHeader() {
    return (
      <div>
        <div id="links-header">
          <span>
            <a href="/how-am-i-building-this?"> how am i building this?</a>
          </span>
          <span>
            <a href="/portfolio"> 📂 portfolio</a>
          </span>
          <span>
            <a href="/about-me"> 💅 about me</a>
          </span>
          <span>
            <a href="/nuggets-of-wisdom"> ⭐️ nuggets of wisdom</a>
          </span>
          <span>
            <a href="/contact"> 📞 contact</a>
          </span>
          <span>
            <a href="/AI-usage-disclaimer"> 🤖 AI usage disclaimer</a>
          </span>
        </div>
      <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin-top: 1.3rem"></hr>
      </div>
    )
  }

  // LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor
