/* global $ */
/* (CDNs included in index.html) */

// Calculate a random number from 0 to 256
// (and use unneccessary recursion to make sure the value isn't too high)
function twoFiftySix () {
  var color = Math.floor(Math.random() * (256))
  return color < 240 ? color : twoFiftySix()
}

// Assign randomized values to chaptertitle css
function randomColors () {
  $('.chaptertitle').each(function (i, e) {
    var r = twoFiftySix()
    var g = twoFiftySix()
    var b = twoFiftySix()
    $(e).css('color', 'rgba(' + r + ',' + g + ',' + b + ', 0.2)')
  })
}

$(document).ready(function () {
  // Find the height of one or more elements
  function heightOf (el /*, el2, ... */) {
    var base = $(el).outerHeight(true)
    for (var z = 1; z < arguments.length; z++) {
      base += $(arguments[z]).outerHeight(true)
    }
    console.log('arg----->', arguments)
    console.log('base---->', base)
    return base
  }
  // Set Bootstrap top/bottom affixes per the calculated values
  $('#sidebar').affix({
    offset: {
      top: function () {
        console.log('#sidebar this --->', this)
        return (this.top = heightOf('.jumbotron') - heightOf('.navbar-fixed-top'))
      },
      bottom: function () {
        return (this.bottom = heightOf('#footer', '#bottom', '#divider', '#sidebar'))
      }
    }
  })
  // Randomize colors on load/refresh
  randomColors()
})
