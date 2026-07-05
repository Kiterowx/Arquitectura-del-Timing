(function () {
  var discordUrl = "https://discord.gg/Egq8us4xZC"

  function isExternal(href) {
    return href.indexOf("http://") === 0 || href.indexOf("https://") === 0
  }

  function ensureHeaderDiscord() {
    if (document.querySelector(".md-header-discord")) {
      return
    }

    var header = document.querySelector(".md-header__inner")
    if (!header) {
      return
    }

    var link = document.createElement("a")
    link.className = "md-header-discord"
    link.href = discordUrl
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    link.title = "Discord de soporte"
    link.setAttribute("aria-label", "Discord de soporte")
    link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.32 4.37A19.79 19.79 0 0 0 15.36 2.8a13.6 13.6 0 0 0-.64 1.32 18.29 18.29 0 0 0-5.44 0 12.4 12.4 0 0 0-.65-1.32 19.73 19.73 0 0 0-4.95 1.57C.54 9.08-.32 13.67.1 18.2a19.95 19.95 0 0 0 6.08 3.07 14.8 14.8 0 0 0 1.3-2.1 12.93 12.93 0 0 1-2.05-.98l.5-.39a14.2 14.2 0 0 0 12.14 0l.5.39c-.65.39-1.33.72-2.05.98.37.74.81 1.44 1.3 2.1a19.9 19.9 0 0 0 6.08-3.07c.5-5.25-.84-9.8-3.58-13.83ZM8.02 15.42c-1.18 0-2.16-1.08-2.16-2.42s.95-2.43 2.16-2.43c1.2 0 2.18 1.1 2.16 2.43 0 1.34-.95 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42s.95-2.43 2.16-2.43c1.2 0 2.18 1.1 2.16 2.43 0 1.34-.95 2.42-2.16 2.42Z"/></svg>'

    header.appendChild(link)
  }

  function bindLinks(root) {
    root.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href") || ""
      if (!isExternal(href)) {
        return
      }
      link.target = "_blank"
      link.rel = "noopener noreferrer"
    })
  }

  function init() {
    ensureHeaderDiscord()
    bindLinks(document)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true })
  } else {
    init()
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () {
      init()
    })
  }
})()
