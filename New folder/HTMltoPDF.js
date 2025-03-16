function generatePDF()
{
    const { jsPDF } = window.jspdf;
    const pageSize = document.getElementById("pageSize").value;
    var marginTop=0;

    // Define scaling factors for different formats
    const scaleFactors = {
        a4: 0.7,
        a6: 0.3,
    };

    
    const scale = scaleFactors[pageSize] || 1;
    const topMargin = 20;
    const bottomMargin = 40;

    const doc = new jsPDF
    ({
        orientation: "p",
        unit: "pt",    
        format: pageSize,
    });
    const content = document.getElementById("content").innerHTML;;
    const wrapContent=doc.splitTextToSize(content);
    doc.html(content, {
        callback: function (doc) 
        {
          
            const pdfDataUri = doc.output('datauristring');
            const container=document.getElementById("pdfContainer");
            container.innerHTML = `<embed src="${pdfDataUri}" width="600" height="500" type="application/pdf">`;
        },
        x: 0,                            // Start at x = 0 for left alignment
        y: topMargin,                     // Apply top margin on each page
        margin: [topMargin, 20, bottomMargin, 20], 
        width: 555,
        windowWidth:800,
        html2canvas: {
            scale:scale,
            useCORS: true // Ensures that resources from different origins are captured
        },
        autoPaging: "text",
        pageBreak: { mode: ['css', 'legacy'] }  ,
        
    });
}