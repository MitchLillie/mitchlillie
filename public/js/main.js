/* global $ */
/* (CDNs included in index.html) */

function twoFiftySix () {
  var color = Math.floor(Math.random() * (256))
  return color < 240 ? color : twoFiftySix()
}

function randomColors () {
  $('.chaptertitle').each(function (i, e) {
    var r = twoFiftySix()
    var g = twoFiftySix()
    var b = twoFiftySix()
    $(e).css('color', 'rgba(' + r + ',' + g + ',' + b + ', 0.2)')
  })
}

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

  $('#sidebar').affix({
    offset: {
      top: function () {
        console.log('#sidebar this --->', this)
        return (this.top = heightOf('.jumbotron') - heightOf('.navbar-fixed-top'))
      },
      bottom: function () {
        return (this.bottom = heightOf('#footer', '#bottom', '#divider', '#sidebar')) // this.top + heightOf('#top') + heightOf('#sidebar'))
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
  randomColors()
})
