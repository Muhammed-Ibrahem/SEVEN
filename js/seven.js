// NAVIGATION BAR
let nav = document.querySelector('.navbar'),
  ulOfLinks = nav.querySelector('.links')
// Toggle-Menu-class-(BARS/CLOSE)
let menuIcon = nav.querySelector('.hamburger')
menuIcon.addEventListener('click', () => {
  menuIcon.classList.contains('fa-bars')
    ? menuIcon.classList.replace('fa-bars', 'fa-close')
    : menuIcon.classList.replace('fa-close', 'fa-bars')
  ulOfLinks.classList.toggle('scrollDown')
})

window.addEventListener('resize', () => {
  ulOfLinks.classList.remove('scrollDown')
  menuIcon.classList.replace('fa-close', 'fa-bars')
})

// VIDEO SECTION
let vidSection = document.querySelector('.video'),
  playIcon = vidSection.querySelector('.icon.fa-play'),
  YoutubeOverlay = vidSection.querySelector('.vid-overlay'),
  closeYoutube = vidSection.querySelector('.closeOverlay')

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape' && YoutubeOverlay.classList.contains('show')) {
    YoutubeOverlay.classList.remove('show')
  }
})
playIcon.addEventListener('click', () => {
  YoutubeOverlay.classList.add('show')
})
closeYoutube.addEventListener('click', () => {
  YoutubeOverlay.classList.remove('show')
})

// To TOP ARROWS

function smoothScroll(target, duration) {
  let start = window.scrollY,
    end =
      target.getBoundingClientRect().top -
      document.querySelector('nav').clientHeight,
    time = null,
    EaseInOut = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t * t + b
      t -= 2
      return (c / 2) * (t * t * t + 2) + b
    }

  function animation(currentTime) {
    if (time === null) time = currentTime
    let Elapse = currentTime - time,
      moveBy = EaseInOut(Elapse, start, end, duration)
    window.scrollTo(0, moveBy)
    if (Elapse < duration) requestAnimationFrame(animation)
  }

  requestAnimationFrame(animation)
}
let smoothingAnchors = document.querySelectorAll('a[href^="#"]')
smoothingAnchors.forEach((Arrow) => {
  Arrow.addEventListener('click', (e) => {
    e.preventDefault()
    if (window.innerWidth < 700) {
      menuIcon.classList.replace('fa-close', 'fa-bars')
      ulOfLinks.classList.remove('scrollDown')
    }
    target = document.querySelector(Arrow.getAttribute('href'))
    smoothScroll(target, 1000)
  })
})

window.addEventListener('scroll', () => {
  if (this.scrollY >= document.querySelector('main').clientHeight / 2) {
    document.querySelector('.fixedToTop').classList.add('showUp')
  } else {
    document.querySelector('.fixedToTop').classList.remove('showUp')
  }
})

// GALLERY
let gallery = document.querySelector('.gallery'),
  tabs = gallery.querySelector('.tabs'),
  images = gallery.querySelectorAll('.img')

tabs.addEventListener('click', (tab) => {
  tab = tab.target
  if (tab.classList.contains('catigory')) {
    tabs.querySelector('.activeTab').classList.remove('activeTab')
    tab.classList.add('activeTab')

    images.forEach((img) => {
      if (img.dataset.cat === tab.dataset.cat || tab.dataset.cat === 'all') {
        // img.style.display = 'block'
        img.classList.add('showImage')
        img.classList.remove('hideImage')
        img.classList.remove('vanish')
      } else {
        // img.style.display = 'none'
        img.classList.remove('showImage')
        img.classList.add('hideImage')
        img.classList.add('vanish')
      }
    })
  }
})
