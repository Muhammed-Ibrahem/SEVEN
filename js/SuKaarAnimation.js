let animatingElements = document.querySelectorAll('.sukaar')

let watcherOptions = {
  root: null,
  rootMargin: `0px 0px -50px 0px`,
  threshold: 0,
}
let elmsWatcher = new IntersectionObserver((Elements, observer) => {
  Elements.forEach((element) => {
    if (!element.isIntersecting) {
      return
    } else {
      let theElmDataSet = element.target.dataset,
        theElement = element.target
      if (theElmDataSet.sukaarName) {
        let aName = theElmDataSet.sukaarName,
          aDuration = theElmDataSet.sukaarDuration || `0.5`,
          aDelay = theElmDataSet.sukaarDelay || `0`,
          aEasing = theElmDataSet.sukaarEasing || `linear`
        theElement.style.cssText = `animation: ${aName} ${aDuration}s ${aEasing} ${aDelay}s forwards`
        if (theElement.style.animationName) {
          theElement.addEventListener('animationend', () => {
            theElement.style.animation = ``
            theElement.classList.remove('sukaar')
            observer.unobserve(theElement)
          })
        }
      } else {
        theElement.classList.remove('sukaar')
      }
    }
  })
}, watcherOptions)

window.addEventListener('DOMContentLoaded', () => {
  animatingElements.forEach((Element) => elmsWatcher.observe(Element))
})
