const bwipjs = require('bwip-js');

// Function to generate barcode
const generateBarcode = async (text) => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer({
      bcid: 'code128',
      text: text,
      scale: 3,
      height: 10,
    }, (err, png) => {
      if (err) {
        return reject('Error generating barcode');
      }
      resolve('data:image/png;base64,' + png.toString('base64'));
    });
  });
};

module.exports = generateBarcode;
