import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Generate PDF from resume data
export const generateResumePDF = async (resumeData, templateComponent) => {
  let tempContainer = null;
  let root = null;
  
  try {
    // Create a temporary container for the resume
    tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '40px';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '11px';
    tempContainer.style.lineHeight = '1.4';
    
    // Append the template component to the container
    document.body.appendChild(tempContainer);
    
    // Create a React root and render the component
    const { createRoot } = await import('react-dom/client');
    root = createRoot(tempContainer);
    
    // Render the template component
    root.render(templateComponent);
    
    // Wait for the component to render and fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Convert to canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: tempContainer.offsetWidth,
      height: tempContainer.offsetHeight,
      logging: false // Disable html2canvas logging
    });
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgData = canvas.toDataURL('image/png', 0.95);
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
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
    
    return pdf;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  } finally {
    // Clean up
    if (root) {
      try {
        root.unmount();
      } catch (cleanupError) {
        console.warn('Error unmounting React root:', cleanupError);
      }
    }
    
    if (tempContainer && document.body.contains(tempContainer)) {
      try {
        document.body.removeChild(tempContainer);
      } catch (cleanupError) {
        console.warn('Error removing temp container:', cleanupError);
      }
    }
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
