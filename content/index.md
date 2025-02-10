---
title: welcome
description: home page for Joey's digital garden
tags:
  - draft
---
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTFjdDNqcGVlcXpzaGYxcnNvamFrbGVzODN2NHJ0cjM1ZzBwZW56YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0IydFHF2WeTmVMBi/giphy.gif" style="width: 100%; height: 185px; object-fit: cover; object-position: center;">

>this is a digital mish-mash of thoughts on Life, Buddhism, and Technology, in both Abstract and Narrative written form. Welcome!

~Joey

> [!info] **start here**
> ```dataview
> LIST FROM #intro
> ```

> [!note] **featured**
> ```dataview
> LIST FROM (#abstract OR #narrative)
> WHERE !contains(tags, "draft")
> SORT file.mtime desc LIMIT 5
> ```
## TODO:
1. flesh out this page
2. icons on the contact
3. drafts
4. show edit time on all articles
5. look at Quartz examples for graph view (would be nice to remove the box and blur)
6. flesh out the index page
7. remove the footer (link to copyright notice tho)
8. enforce https:
9. stylize: https://www.youtube.com/watch?v=FeorCILr-GE
10. https://jzhao.xyz/
11. migrate old obsidian docs (and refactor them)
12. enable Giscus commenting

> [!warning] don't look! It's not finished yet ;)
> ```dataview
> LIST FROM #draft 
> ```
