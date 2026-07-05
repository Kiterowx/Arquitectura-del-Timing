(function () {
  var pairSeq = 0

  function bindVideos(root) {
    root.querySelectorAll("video").forEach(function (video) {
      if (video.dataset.tgVideoBound === "1") {
        return
      }
      video.dataset.tgVideoBound = "1"
      video.removeAttribute("muted")
      video.defaultMuted = false
      video.muted = false
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
      video.preload = "auto"
      video.dataset.tgPairGroup = group
    })
    videoB.classList.add("top")

    var wipe = document.createElement("div")
    wipe.className = "tg-wipe"

    var frame = document.createElement("div")
    frame.className = "frame is-paused"

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
    range.setAttribute("aria-label", labels[0] + " / " + labels[1])

    frame.appendChild(videoA)
    frame.appendChild(videoB)
    frame.appendChild(split)
    frame.appendChild(tagL)
    frame.appendChild(tagR)
    wipe.appendChild(frame)
    wipe.appendChild(range)

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
      split.style.left = value + "%"
      videoB.style.clipPath = "inset(0 0 0 " + value + "%)"
    }
    setSplit(50)
    range.addEventListener("input", function () {
      setSplit(range.value)
    })

    videoA.addEventListener("timeupdate", function () {
      if (Math.abs(videoA.currentTime - videoB.currentTime) > 0.08) {
        videoB.currentTime = videoA.currentTime
      }
    })

    function playBoth() {
      videoB.currentTime = videoA.currentTime
      videoA.play()
      videoB.play()
      frame.classList.remove("is-paused")
    }

    function pauseBoth() {
      videoA.pause()
      videoB.pause()
      frame.classList.add("is-paused")
    }

    frame.addEventListener("click", function () {
      if (videoA.paused) {
        playBoth()
      } else {
        pauseBoth()
      }
    })

    videoA.addEventListener("pause", function () {
      if (!videoB.paused) {
        videoB.pause()
      }
      frame.classList.add("is-paused")
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
