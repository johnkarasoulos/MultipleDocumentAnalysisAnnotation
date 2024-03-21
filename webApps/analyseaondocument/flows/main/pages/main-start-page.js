define([], function() {
  'use strict';
 
  var PageModule = function PageModule() {};
  
  /* 
  PageModule.prototype.formatFileBase64 = function(file) {
    return new Promise((resolve, reject) =>
      {
       var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = function () {
         // reader.result will be "data:image/png;base64,iVBORw0KGgoAAAANSU......"
         var index = reader.result.indexOf(';base64,');
         var result = {
           "base64": reader.result.slice(index+8),
           "contentType": reader.result.slice(5, index)
           };
         resolve(result);
       };
       reader.onerror = function (error) {
         reject(error);
       };
     });
    };
 
  PageModule.prototype.getRealAttachedDocumentId = function(row) {
    var href = row.links[0].href;
    var index = href.indexOf('/child/Attachments/') + '/child/Attachments/'.length;
    return href.slice(index);
  };
  */

  PageModule.prototype.preview = function(blobData, contentType) {
    if (contentType === undefined || contentType.length === 0) {
      contentType = "application/octet-stream";
    }
    var newBlob = new Blob([blobData], {type: contentType});
    return URL.createObjectURL(newBlob);
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.formatFileBase64 = function (file) {
      return new Promise(
        resolve=>{
          const blobURL = URL.createObjectURL(file);
          const reader  = new FileReader();
          reader.addEventListener("load", function () {
            // convert image file to base64 string
            console.log("DATA->" + reader.result);            
            resolve({
              data: reader.result,              
              url: blobURL
            });
            document.getElementById("mypic").onload = function() {
              URL.revokeObjectURL(blobURL);
            };
          }, false);

          if (file) {
            reader.readAsDataURL(file);
          }
        }
      );
  };

  /**
   *
   * @param {String} file
   * @return {String}
   */
  PageModule.prototype.AddImageFunction = function(file) {
      return new Promise(
        resolve=>{
          const blobURL = URL.createObjectURL(file);
          const reader  = new FileReader();
          reader.addEventListener("load", function () {
            // convert image file to base64 string
            console.log("DATA->" + reader.result);            
            resolve({
              data: reader.result,              
              url: blobURL
            });
            document.getElementById("mypic").onload = function() {
              URL.revokeObjectURL(blobURL);
            };
          }, false);

          if (file) {
            reader.readAsDataURL(file);
          }
        }
      );
    };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.createUpdatedPDF = async function (arg1, ni_x, ni_y, ni_width, ni_height, ni_page, r_x, r_y, r_width, r_height, r_page, pp_x, pp_y, pp_width, pp_height, pp_page, eol_x, eol_y, eol_width, eol_height, eol_page, al_x, al_y, al_width, al_height, al_page, ap_x, ap_y, ap_width, ap_height, ap_page , tp_x, tp_y, tp_width, tp_height, tp_page, totp_x, totp_y, totp_width, totp_height, totp_page, com_x, com_y, com_width, com_height, com_page) {
      const { degrees, PDFDocument, rgb, StandardFonts , grayscale} = PDFLib;
      console.log("changepdf: input argument " + arg1);
      console.log("changepdf: enter into changepdf function");
      const existingPdfBytes = arg1;
      console.log("changepdf: Load a PDFDocument from the existing PDF : " + existingPdfBytes );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      console.log("changepdf: Get the first page of the document");
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      console.log("changepdf: received nameinsured page number: "+ ni_page);
      const ni_curPage = ni_page - 1;
      var curPDFpage = pages[ni_curPage];
      console.log("changepdf: Get the width and height of the first page");
      /* const { width, height } = firstPage.getSize(); */ 
      const { width, height } = curPDFpage.getSize();
      console.log("changepdf: Embed the Helvetica font");
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      console.log("changepdf: Draw a rectangle around the Insured Name"); 
      console.log("changepdf: received namedinsured x: " + ni_x); 
      console.log("changepdf: received namedinsured y: "+ ni_y);
      console.log("changepdf: received nameinsured width: " + ni_width); 
      console.log("changepdf: received nameinsured height: "+ ni_height);
      console.log("changepdf: received nameinsured page number: "+ ni_page);
      console.log("changepdf: received nameinsured ni_curPage: "+ ni_curPage);
      curPDFpage.drawRectangle({
        x: ni_x,
        y: ni_y,
        width: ni_width,
        height: ni_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
      console.log("changepdf: Draw a rectangle around the rating"); 
      console.log("changepdf: received rating x: " + r_x); 
      console.log("changepdf: received rating y: "+ r_y);
      console.log("changepdf: received rating width: " + r_width); 
      console.log("changepdf: received rating height: "+ r_height);
      console.log("changepdf: received rating page number: "+ r_page);
      const r_curPage = r_page - 1;
      console.log("changepdf: received nameinsured r_curPage: "+ r_curPage);
      if (r_curPage == (ni_curPage +1) ) { curPDFpage = pages[r_curPage];};
      curPDFpage.drawRectangle({
        x: r_x,
        y: r_y,
        width: r_width,
        height: r_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
      console.log("changepdf: Draw a rectangle around policy period"); 
      console.log("changepdf: received policy period x: " + pp_x); 
      console.log("changepdf: received policy period y: "+ pp_y);
      console.log("changepdf: received policy period width: " + pp_width); 
      console.log("changepdf: received policy period height: "+ pp_height);
      console.log("changepdf: received policy period page number: "+ pp_page);
      const pp_curPage = pp_page - 1;
      console.log("changepdf: received nameinsured pp_curPage: "+ pp_curPage);
      if (pp_curPage == (r_curPage +1) ) { curPDFpage = pages[pp_curPage];};
      curPDFpage.drawRectangle({
        x: pp_x,
        y: pp_y,
        width: pp_width,
        height: pp_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
      console.log("changepdf: Draw a rectangle around each occurance limit"); 
      console.log("changepdf: received each occurance limit x: " + eol_x); 
      console.log("changepdf: received each occurance limit y: "+ eol_y);
      console.log("changepdf: received each occurance limit width: " + eol_width); 
      console.log("changepdf: received each occurance limit height: "+ eol_height);
      console.log("changepdf: received  each occurance limit page number: "+ eol_page);
      const eol_curPage = eol_page - 1;
      console.log("changepdf: received nameinsured eol_curPage: "+ eol_curPage);
      if (eol_curPage == (pp_curPage +1) ) { curPDFpage = pages[eol_curPage];};
      curPDFpage.drawRectangle({
        x: eol_x,
        y: eol_y,
        width: eol_width,
        height: eol_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });

      console.log("changepdf: Draw a rectangle around Aggregate Limit"); 
      console.log("changepdf: received Aggregate Limit x: " + al_x); 
      console.log("changepdf: received Aggregate Limit y: "+ al_y);
      console.log("changepdf: received Aggregate Limit width: " + al_width); 
      console.log("changepdf: received Aggregate Limit height: "+ al_height);
      console.log("changepdf: received Aggregate Limit page number: "+ al_page);
      const al_curPage = al_page - 1;
      console.log("changepdf: received Aggregate Limit al_page: "+ al_curPage);
       if (al_curPage == (eol_curPage +1) ) { curPDFpage = pages[al_curPage];};
      curPDFpage.drawRectangle({
        x: al_x,
        y: al_y,
        width: al_width,
        height: al_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
      console.log("changepdf: Draw a rectangle around Annual Premium"); 
      console.log("changepdf: received Annual Premium x: " + ap_x); 
      console.log("changepdf: received Annual Premium y: "+ ap_y);
      console.log("changepdf: received Annual Premiumting width: " + ap_width); 
      console.log("changepdf: received Annual Premium height: "+ ap_height);
      console.log("changepdf: received Annual Premium page number: "+ ap_page);
      const ap_curPage = ap_page - 1;
      console.log("changepdf: received Annual Premium al_page: "+ ap_curPage);
      if (ap_curPage == (al_curPage +1) ) { curPDFpage = pages[ap_curPage];};
      curPDFpage.drawRectangle({
        x: ap_x,
        y: ap_y,
        width: ap_width,
        height: ap_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
      console.log("changepdf: Draw a rectangle around Terrorism Premium"); 
      console.log("changepdf: received rating x: " + tp_x); 
      console.log("changepdf: received rating y: "+ tp_y);
      console.log("changepdf: received rating width: " + tp_width); 
      console.log("changepdf: received rating height: "+ tp_height);
      console.log("changepdf: received Terrorism Premium page number: "+ tp_page);
      const tp_curPage = tp_page - 1;
      console.log("changepdf: received Terrorism Premium tp_curPage: "+ tp_curPage);
      if (tp_curPage == (ap_curPage +1) ) { curPDFpage = pages[tp_curPage];};
      curPDFpage.drawRectangle({
        x: tp_x,
        y: tp_y,
        width: tp_width,
        height: tp_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
      console.log("changepdf: Draw a rectangle around Total Premium"); 
      console.log("changepdf: received Total Premium x: " + totp_x); 
      console.log("changepdf: received Total Premium y: "+ totp_y);
      console.log("changepdf: received Total Premium width: " + totp_width); 
      console.log("changepdf: received Total Premium height: "+ totp_height);
      console.log("changepdf: received Terrorism Premium page number: "+ totp_page);
      const totp_curPage = totp_page - 1;
      console.log("changepdf: received Terrorism Premium totp_curPage: "+ totp_curPage);
      if (totp_curPage == (tp_curPage +1) ) { curPDFpage = pages[totp_curPage];};
      curPDFpage.drawRectangle({
        x: totp_x,
        y: totp_y,
        width: totp_width,
        height: totp_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
       /* const secondPage = pages[1]; */
      console.log("changepdf: Draw a rectangle around Commission"); 
      console.log("changepdf: received Commission x: " + com_x); 
      console.log("changepdf: received Commission y: "+ com_y);
      console.log("changepdf: received Commission width: " + com_width); 
      console.log("changepdf: received Commission height: "+ com_height);
      console.log("changepdf: received Commission height: "+ com_page);
      const com_curPage = com_page - 1;
      console.log("changepdf: received Commission totp_curPage: "+ com_curPage);
      if (com_curPage == (totp_curPage +1) ) { curPDFpage = pages[com_curPage];};
      curPDFpage.drawRectangle({
        x: com_x,
        y: com_y,
        width: com_width,
        height: com_height,
        //rotate: degrees(0),
        borderWidth: 1,
        borderColor: grayscale(0),
        borderOpacity: 0.75,
      });
      console.log("changepdf: Serialize the PDFDocument to bytes (a Uint8Array)");
      const pdfBytes = await pdfDoc.save();
      console.log("changepdf: Trigger the browser to download the PDF document");
      const bytes  = new Uint8Array( pdfBytes );
      const blob   = new Blob( [ bytes ], { type: "application/pdf" } );
      const newdocURL = URL.createObjectURL(blob);
      console.log("changepdf: new doc url: " + newdocURL.readAsDataURL);
      return newdocURL;
      // download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.calculateWidth = function (x_downright, x_downleft) {
    const tmp_width = x_downright - x_downleft ; 
    return tmp_width;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.calculateHeight = function (y_downright , y_upright) {
    const tmp_Height = y_downright - y_upright;
    return tmp_Height;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.DisplayParameters = function (arg1Label , arg1Value) {
    console.log("Display parameter : " + arg1Label+ " with value : " + arg1Value);
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.numberOfPagesOfPDF = async function (arg1) {
      const { degrees, PDFDocument, rgb, StandardFonts , grayscale} = PDFLib;
      console.log("changepdf: input argument " + arg1);
      console.log("changepdf: enter into changepdf function");
      //console.log("changepdf: get URL https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/jYtjpg3Qylla-ETZH2mjCkLQR_pn4Mp7wS62DFb0ytsNXmTf09Yl7aynwfqjZml2/n/frqap2zhtzbe/b/AON-Doc-KV-Demo/o/JK/jkquote-anon-1.pdf");
      //const url = "https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/jYtjpg3Qylla-ETZH2mjCkLQR_pn4Mp7wS62DFb0ytsNXmTf09Yl7aynwfqjZml2/n/frqap2zhtzbe/b/AON-Doc-KV-Demo/o/JK/jkquote-anon-1.pdf";
      //console.log("changepdf: Fetch pdf into bytes");
      // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
      const existingPdfBytes = arg1;
      console.log("changepdf: Load a PDFDocument from the existing PDF : " + existingPdfBytes );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      console.log("changepdf: Get the first page of the document");
      const totalPages = pdfDoc.getPageCount();
      return totalPages;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.displayPagePosition = function (previousPage, currentPage , previousYccord , currentYCoord) {
    console.log("the previous page number is : "+previousPage);
    console.log("the current page number is : "+currentPage);
    console.log("the previous y coord is : "+previousYccord);
    console.log("the current y coord is : "+currentYCoord);
  };
 
  /*
  PageModule.prototype.download = function(blobData, contentType, fileName) {
    var element = document.createElement('a');
    element.setAttribute('href', this.preview(blobData, contentType));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);   
  };
  */
 
  return PageModule;
});