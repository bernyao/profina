import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Generate PDF from resume data
export const generateResumePDF = async (resumeData, templateComponent) => {
  try {
    // Create a temporary container for the resume
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '8.5in'; // Standard letter width
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '0.5in';
    
    // Append the template component to the container
    document.body.appendChild(tempContainer);
    
    // Render the template component
    const templateElement = document.createElement('div');
    templateElement.innerHTML = templateComponent;
    tempContainer.appendChild(templateElement);
    
    // Convert to canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 8.5;
    const pageHeight = 11;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Clean up
    document.body.removeChild(tempContainer);
    
    return pdf;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

// Download PDF
export const downloadPDF = (pdf, filename = 'resume.pdf') => {
  pdf.save(filename);
};

// Generate PDF blob for preview
export const generatePDFBlob = async (resumeData, templateComponent) => {
  try {
    const pdf = await generateResumePDF(resumeData, templateComponent);
    return pdf.output('blob');
  } catch (error) {
    console.error('PDF blob generation error:', error);
    throw error;
  }
};
