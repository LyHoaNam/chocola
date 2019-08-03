import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const pxToMm = (px) => {
  return Math.floor(px/document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById('myMm').offsetHeight*mm;
};

const range = (start, end) => {
    return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
};


const PrintButton = ({id, label}) => (<div className="titlePrintBtn">
  {/*
    Getting pixel height in milimeters:
    https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
  */}
  <div id="myMm" style={{height: "1mm"}} />


  <div
    className="GetStart customPrtn"
    onClick={() => {
      const input = document.getElementById(id);
      //let input = document.getElementById('colSelected');
      //input.appendChild(contentCluster);
      
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('../img/jpge');

          // Document of a4WidthMm wide and inputHeightMm high

            // elongated a4 (system print dialog will handle page breaks)
            const pdf = new jsPDF({
               orientation: 'landscape',
                unit: 'mm'
            });//'p', 'mm', [inputHeightMm+16, 1200]
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
           pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
            pdf.save(`${id}.pdf`);

          
          
        });
      ;
      
      ////////////////////////////////////////////////////////
      // System to manually handle page breaks
      // Wasn't able to get it working !
      // The idea is to break html2canvas screenshots into multiple chunks and stich them together as a pdf
      // If you get this working, please email me a khuranashivek@outlook.com and I'll update the article
      ////////////////////////////////////////////////////////
      // range(0, numPages).forEach((page) => {
      //   console.log(`Rendering page ${page}. Capturing height: ${a4HeightPx} at yOffset: ${page*a4HeightPx}`);
      //   html2canvas(input, {height: a4HeightPx, y: page*a4HeightPx})
      //     .then((canvas) => {
      //       const imgData = canvas.toDataURL('image/png');
      //       console.log(imgData)
      //       if (page > 0) {
      //         pdf.addPage();
      //       }
      //       pdf.addImage(imgData, 'PNG', 0, 0);
      //     });
      //   ;
      // });

      // setTimeout(() => {
      //   pdf.save(`${id}.pdf`);
      // }, 5000);

      
    }}
  >
    {label}
  </div>
</div>);

export default PrintButton;