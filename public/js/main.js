/* global $ */
/* (CDNs included in index.html) */

$(document).ready(function () {
  function heightOf (el /*, el2, ... */) {
    var base = $(el).outerHeight(true)
    for (var z = 1; z < arguments.length; z++) {
      base += $(arguments[z]).outerHeight(true)
    }
    console.log('arg----->', arguments)
    console.log('base---->', base)
    return base
  }
  // (data-spy="scroll" data-target="#sidebar")

  $('#sidebar').affix({
    offset: {
      top: function () {
        console.log('#sidebar this --->', this)
        return (this.top = heightOf('.jumbotron') - heightOf('.navbar-fixed-top'))
      },
      bottom: function () {
        return (this.bottom = heightOf('#footer', '#bottom', '#divider', '#sidebar') + 150) // this.top + heightOf('#top') + heightOf('#sidebar'))
      }
      // #sidebar(data-spy="affix" data-offset-top="1000" data-offset-bottom="700")
    }
  })

  $('#storybar').affix({
    offset: {
      top: function () {
        console.log('#storybar this --->', this)
        return (this.top = heightOf('.jumbotron', '#top', '#divider') - heightOf('.navbar-fixed-top'))
      }
         // bottom: function () {
         //    return (this.bottom = this.top + heightOf('#bottom'))
         // }
         // #storybar(data-spy="affix" data-offset-top="2000")
    }
  })
})
