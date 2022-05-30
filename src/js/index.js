let timeLine = gsap.timeline();
timeLine
  .from('.jobs', { duration: 0.5, ease: "sine.in", x: -200, })
  .from('.jobs850', { duration: 0.5, ease: "sine.in", x: -200, })
  .from('.article_description_text', {duration: 1 ,ease: "power4.in", opacity: 0 })
  .from('.article_description_autor', { duration: 0.5, ease: "power4.in", y: -70, opacity:0})
