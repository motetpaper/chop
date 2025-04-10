// app.js
// job  : manages app actions
// git  : https://github.com/motetpaper/chop
// lic  : MIT
//
//

import { SealChopObject } from 'https://motetpaper.github.io/web/SealChopObject.js'

let params = new URLSearchParams();

// event handlers
//
//

$( document ).ready(function() {
  
  $( '#xm' ).on( 'change, keyup, input' , function() {

    // removes alphanum
    if( $( this ).val().match( /\w/gui )) {
      $( this ).val( $( this ).val().replace( /\w/gui , ''));
    }

    // removes punctuation
    if($( this ).val().match( /\p{P}/gu )) {
      $( this ).val( $( this ).val().replace( /\p{P}/gu , ''));
    }

    upd();
  });

  $( '.qq' ).on( 'input' , function()  {
    upd();
  });

  $( '#savebtn' ).click( function()  {
    savethat();
  });

  upd();
});


// functions
/*
function copythat() {
  // uses the Data URI to extract the blob
  fetch($( '#chop' ).attr( 'src' ))
    .then((r)=>r.blob())
    .then((b)=>{
      // copies the blob to system clipboard
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png' : b})
      ]).then(()=>{
        $( '#copybtn' ).text( 'Copied!' );
        setTimeout( function()  {
          $( '#copybtn' ).text( 'Copy Image to clipboard' );
        }, 1000);
        console.log( 'copied!' );
      });
    });
}
*/
// saves a PNG to desktop or mobile device
function savethat() {
  // uses the Data URI to extract the blob
  fetch($( '#chop' ).attr( 'src' ))
    .then((r)=>r.blob())
    .then((b)=>{
      const xm = params.get('x');
      const url = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = url;
      a.download = `motetpaper-chop.png`;
      a.click();
      console.log( 'saved!' );
    });
}

// updates the chop image after changes
function upd() {

  // renders the new chop image
  const chop = new SealChopObject();

  // looks at each qq color option
  // sets each chop color parameter
  $( '.qq' ).each(function() {
    let key = $( this ).attr( 'name' );
    let value = $( this ).val().toUpperCase();
    params.set(key, value);
  });

  // sets the name parameter
  params.set('x', $( '#xm' ).val());

  // sets parameters in the chop object
  chop.setPaperColor(params.get('p'))
    .setBackgroundColor(params.get('b'))
    .setForegroundColor(params.get('f'))
    .setInkColor(params.get('i'))
    .setName(params.get('x'));

  // renders the chop as a base64 data URL
  $( '#chop' ).attr( 'src', chop.toDataURL() );
}


// diagnostic helper functions

function isAndroid() {
  return navigator.userAgent.search(/android/ig) > -1;
}

function isAppleIpad() {
  return navigator.userAgent.search(/ipad/ig) > -1;
}

function isAppleIphone() {
  return navigator.userAgent.search(/iphone/ig) > -1;
}
