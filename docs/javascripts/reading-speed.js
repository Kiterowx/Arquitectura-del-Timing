(function () {
  var spanish = document.documentElement.lang === "es"
  var locale = spanish ? "es" : "en"
  function format(value, digits) {
    return value.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits })
  }
  function init() {
    document.querySelectorAll("[data-tg-cps]").forEach(function (form) {
      if (form.dataset.bound === "1") return
      form.dataset.bound = "1"
      var text = form.querySelector("textarea")
      var duration = form.querySelector("input")
      var convention = form.querySelector("select")
      var result = form.querySelector("[data-cps-result]")
      var detail = form.querySelector("[data-cps-detail]")
      var error = form.querySelector(".tg-field-error")

      function update() {
        var seconds = duration.valueAsNumber
        var valid = Number.isFinite(seconds) && seconds > 0
        duration.setAttribute("aria-invalid", String(!valid))
        error.hidden = valid
        if (!valid) {
          result.textContent = "— CPS"
          detail.textContent = spanish ? "Introduce una duración válida para calcular la velocidad de lectura." : "Enter a valid duration to calculate reading speed."
          return
        }
        var characters = Array.from(text.value.replace(/\r?\n/g, " "))
        if (convention.value === "letters") {
          characters = characters.filter(function (character) {
            return /[\p{L}\p{N}]/u.test(character)
          })
        }
        result.textContent = format(characters.length / seconds, 1) + " CPS"
        detail.textContent = characters.length + (spanish ? " caracteres ÷ " : " characters ÷ ") + format(seconds, 2) + (spanish ? " segundos" : " seconds")
      }
      form.addEventListener("input", update)
      form.addEventListener("change", update)
      form.addEventListener("submit", function (event) { event.preventDefault() })
      update()
    })
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true })
  } else {
    init()
  }
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(init)
  }
})()
