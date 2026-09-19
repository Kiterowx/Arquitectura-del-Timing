(function () {
  var pairSeq = 0
  var spanish = document.documentElement.lang === "es"
  var translations = {
  "Play comparison": "Reproducir comparación",
  "Pause comparison": "Pausar comparación",
  "Mute audio": "Silenciar audio",
  "Unmute audio": "Activar audio",
  "Comparison divider: ": "Divisor de comparación: ",
  "Drag to compare the two versions": "Mueve el divisor para comparar las versiones",
  "The comparison could not play. Check that both videos loaded, then try again.": "No se pudo reproducir la comparación. Comprueba que ambos vídeos se cargaron e inténtalo de nuevo."
}
  function message(text) { return spanish ? translations[text] : text }

  function bindVideos(root) {
    root.querySelectorAll("video").forEach(function (video) {
      if (video.dataset.tgVideoBound === "1") {
        return
      }
      video.dataset.tgVideoBound = "1"
      var silent = video.dataset.tgPairSecondary === "1"
      video.toggleAttribute("muted", silent)
      video.defaultMuted = silent
      video.muted = silent
      ;["play", "playing"].forEach(function (eventName) {
        video.addEventListener(eventName, function () {
          document.querySelectorAll("video").forEach(function (other) {
            if (other === video || other.paused) {
              return
            }
            if (
              video.dataset.tgPairGroup &&
              other.dataset.tgPairGroup === video.dataset.tgPairGroup
            ) {
              return
            }
            other.pause()
          })
        })
      })
    })
  }

  function buildWipe(cmp) {
    var cols = cmp.querySelectorAll(".col")
    if (cols.length !== 2) {
      return
    }
    var videoA = cols[0].querySelector("video")
    var videoB = cols[1].querySelector("video")
    if (!videoA || !videoB) {
      return
    }
    cmp.dataset.tgWipeBound = "1"

    var group = "wipe-" + ++pairSeq
    var labels = []
    var notes = []
    cols.forEach(function (col) {
      var h = col.querySelector("h4")
      var n = col.querySelector(".note")
      labels.push(h ? h.textContent.trim() : "")
      notes.push(n ? n.textContent.trim() : "")
    })

    ;[videoA, videoB].forEach(function (video) {
      video.removeAttribute("controls")
      video.removeAttribute("muted")
      video.defaultMuted = false
      video.muted = false
      video.loop = true
      video.preload = "metadata"
      video.dataset.tgPairGroup = group
    })
    videoB.classList.add("top")
    videoB.dataset.tgPairSecondary = "1"

    var wipe = document.createElement("div")
    wipe.className = "tg-wipe"

    var frame = document.createElement("div")
    frame.className = "frame is-paused"
    frame.tabIndex = 0
    frame.setAttribute("role", "button")
    frame.setAttribute("aria-label", message("Play comparison"))

    var split = document.createElement("span")
    split.className = "split"

    var tagL = document.createElement("span")
    tagL.className = "tag-l"
    tagL.textContent = labels[0]

    var tagR = document.createElement("span")
    tagR.className = "tag-r"
    tagR.textContent = labels[1]

    var range = document.createElement("input")
    range.type = "range"
    range.min = "0"
    range.max = "100"
    range.value = "50"
    range.setAttribute("aria-label", message("Comparison divider: ") + labels[0] + " / " + labels[1])

    frame.appendChild(videoA)
    frame.appendChild(videoB)
    frame.appendChild(split)
    frame.appendChild(tagL)
    frame.appendChild(tagR)
    wipe.appendChild(frame)
    var controls = document.createElement("div")
    controls.className = "tg-wipe-controls"
    var playButton = document.createElement("button")
    playButton.type = "button"
    playButton.textContent = message("Play comparison")
    var muteButton = document.createElement("button")
    muteButton.type = "button"
    muteButton.textContent = message("Mute audio")
    muteButton.setAttribute("aria-pressed", "false")
    controls.appendChild(playButton)
    controls.appendChild(muteButton)
    wipe.appendChild(controls)
    var sliderLabel = document.createElement("label")
    range.id = group + "-divider"
    sliderLabel.htmlFor = range.id
    sliderLabel.className = "tg-wipe-label"
    sliderLabel.textContent = message("Drag to compare the two versions")
    wipe.appendChild(sliderLabel)
    wipe.appendChild(range)
    var playbackError = document.createElement("p")
    playbackError.className = "tg-field-error"
    playbackError.setAttribute("role", "status")
    playbackError.hidden = true
    wipe.appendChild(playbackError)

    var noteBox = document.createElement("div")
    noteBox.className = "tg-wipe-notes"
    notes.forEach(function (text, i) {
      if (!text) {
        return
      }
      var p = document.createElement("p")
      p.className = "note"
      var b = document.createElement("b")
      b.textContent = labels[i]
      p.appendChild(b)
      p.appendChild(document.createTextNode(" — " + text))
      noteBox.appendChild(p)
    })

    cmp.innerHTML = ""
    cmp.appendChild(wipe)
    if (noteBox.children.length) {
      cmp.appendChild(noteBox)
    }

    function setSplit(value) {
      range.setAttribute("aria-valuetext", value + "% " + labels[0] + ", " + (100 - value) + "% " + labels[1])
      split.style.left = value + "%"
      videoB.style.clipPath = "inset(0 0 0 " + value + "%)"
    }
    setSplit(50)
    range.addEventListener("input", function () {
      setSplit(range.value)
    })

    var syncFrame
    function syncVideos() {
      if (Math.abs(videoA.currentTime - videoB.currentTime) > 0.04) {
        videoB.currentTime = videoA.currentTime
      }
      if (!videoA.paused) {
        syncFrame = requestAnimationFrame(syncVideos)
      }
    }

    function playBoth() {
      playbackError.hidden = true
      videoB.currentTime = videoA.currentTime
      Promise.all([videoA.play(), videoB.play()]).then(function () {
        if (!videoA.paused) {
          cancelAnimationFrame(syncFrame)
          syncVideos()
          frame.classList.remove("is-paused")
          frame.setAttribute("aria-label", message("Pause comparison"))
          playButton.textContent = message("Pause comparison")
        }
      }).catch(function () {
        pauseBoth()
        playbackError.textContent = message("The comparison could not play. Check that both videos loaded, then try again.")
        playbackError.hidden = false
      })
    }

    function pauseBoth() {
      videoA.pause()
      videoB.pause()
      cancelAnimationFrame(syncFrame)
      frame.classList.add("is-paused")
      frame.setAttribute("aria-label", message("Play comparison"))
      playButton.textContent = message("Play comparison")
    }

    function togglePlayback() {
      if (videoA.paused) {
        playBoth()
      } else {
        pauseBoth()
      }
    }

    playButton.addEventListener("click", togglePlayback)
    muteButton.addEventListener("click", function () {
      videoA.muted = !videoA.muted
      muteButton.textContent = videoA.muted ? message("Unmute audio") : message("Mute audio")
      muteButton.setAttribute("aria-pressed", String(videoA.muted))
    })
    frame.addEventListener("click", togglePlayback)
    frame.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        togglePlayback()
      }
    })

    videoA.addEventListener("pause", function () {
      cancelAnimationFrame(syncFrame)
      if (!videoB.paused) {
        videoB.pause()
      }
      frame.classList.add("is-paused")
      frame.setAttribute("aria-label", message("Play comparison"))
      playButton.textContent = message("Play comparison")
    })
  }

  function bindWipes(root) {
    root.querySelectorAll(".tg-compare[data-tg-wipe]").forEach(function (cmp) {
      if (cmp.dataset.tgWipeBound === "1") {
        return
      }
      buildWipe(cmp)
    })
  }

  function init() {
    bindWipes(document)
    bindVideos(document)
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
