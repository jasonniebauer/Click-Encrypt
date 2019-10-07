document.addEventListener('DOMContentLoaded', function(){

  // Define variables
  const message = document.querySelector('#message');
  const passphrase = document.querySelector('#secretKey');
  const encryptButton = document.querySelector('#encryptButton');
  const decryptButton = document.querySelector('#decryptButton');
  // const copyButton = document.querySelector('#copyButton');


  // Define funcs
  function encrypt(message='', key=''){
    /* https://cryptojs.gitbook.io/docs/ */
    var message = CryptoJS.AES.encrypt(message, key);
    return message.toString();
  }

  function decrypt(message='', key=''){
    /* https://cryptojs.gitbook.io/docs/ */
    var code = CryptoJS.AES.decrypt(message, key);
    var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

    return decryptedMessage;
  }

  function verifyPassphrase(){
    /* Using a passphrase will generate a 256-bit key */
    if (passphrase.value == '') {
      alert('Please enter a passphrase.');
      return;
    } else {
      return true;
    }
  }

  // function fallbackCopyTextToClipboard(text, debug=false) {
  //   try {
  //     let successful = document.execCommand('copy');
  //   } catch (err) {
  //     // console.error('Fallback: Oops, unable to copy', err);
  //   }
  // }

  // function copyTextToClipboard(text) {
  //   if (!navigator.clipboard) {
  //     fallbackCopyTextToClipboard(text);
  //     return;
  //   }
  //   navigator.clipboard.writeText(text).then(function() {
  //     // console.log('Async: Copying to clipboard was successful!');
  //   }, function(err) {
  //     // console.error('Async: Could not copy text: ', err);
  //   });
  // }


  // Define event listeners
  encryptButton.addEventListener('click', function(event){
    if (verifyPassphrase()) {
      let plaintext = message.value;

      message.value = encrypt(plaintext, passphrase.value);
      passphrase.value = '';
    }
  });

  decryptButton.addEventListener('click', function(event){
    let cyphertext = message.value;

    let plaintext = decrypt(cyphertext, passphrase.value);

    message.value = plaintext;
  });

  copyButton.addEventListener('click', function(event) {
    copyTextToClipboard(message.value);
  });

});