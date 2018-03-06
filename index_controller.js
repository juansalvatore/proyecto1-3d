$(document).ready(function() {
  // Init ScrollMagic
  var controller = new ScrollMagic.Controller()
  // loop through each .project element
  $('.listen').each(function() {
    // buld a scene
    var ourScene = new ScrollMagic.Scene({
      triggerElement: this,
      //duration: '90%',
      reverse: true,
      triggerHook: 0.64,
    })
      .setClassToggle(this, 'fade-in') // add class to #img-1
      // .addIndicators({
      //   name: 'fade in',
      // })
      .addTo(controller)
  })
})
