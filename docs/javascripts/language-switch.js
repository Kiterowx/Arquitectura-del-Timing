(function () {
  function updateLinks() {
    document.querySelectorAll(".md-select a[hreflang]").forEach(function (link) {
      var url = new URL(link.href, window.location.href)
      url.hash = window.location.hash
      link.href = url.href
    })
  }
  function init() {
    document.querySelectorAll(".md-select a[hreflang]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.stopPropagation()
      })
    })
    updateLinks()
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true })
  } else {
    init()
  }
  window.addEventListener("hashchange", updateLinks)
})()
