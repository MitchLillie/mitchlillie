/* global $ */
/* (CDNs included in index.html) */

$(document).ready(function () {
  console.log('bottom height...', heightOf('.jumbotron', '#top', '#divider') - heightOf('.navbar-fixed-top'))

  reaffix()

  $('#storybar').affix({
    offset: {
      top: function () {
        return (this.top = heightOf('.jumbotron', '#top', '#divider') - heightOf('.navbar-fixed-top'))
      }
         // bottom: function () {
         //    return (this.bottom = this.top + heightOf('#bottom'))
         // }
         // #storybar(data-spy="affix" data-offset-top="2000")
    }
  })
})

function reaffix () {
  $('#sidebar').affix({
    offset: {
      top: function () {
        return (this.top = heightOf('.jumbotron') - heightOf('.navbar-fixed-top'))
      },
      bottom: function () {
        return (this.bottom = this.top + heightOf('#top'))
      }
      // #sidebar(data-spy="affix" data-offset-top="1000" data-offset-bottom="700")
    }
  })
}

function heightOf (el /*, el2, ... */) {
  var base = $(el).outerHeight(true)
  for (var z = 1; z < arguments.length; z++) {
    base += $(arguments[z]).outerHeight(true)
  }
  console.log('base---->', base)
  return base
}
