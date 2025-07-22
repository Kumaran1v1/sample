import { Presentation } from "@/components/presentation/types";

export interface ExportProgress {
  current: number;
  total: number;
  status: 'preparing' | 'processing' | 'complete' | 'error';
  message: string;
}

export class PresentationExporter {
  private onProgress?: (progress: ExportProgress) => void;

  constructor(onProgress?: (progress: ExportProgress) => void) {
    this.onProgress = onProgress;
  }

  // Export to PDF using modern browser APIs
  async exportToPDF(presentation: Presentation, options: {
    includeNotes?: boolean;
    quality?: 'low' | 'medium' | 'high';
    slideRange?: 'all' | 'current' | 'custom';
    customRange?: { start: number; end: number };
    currentSlide?: number;
  } = {}): Promise<void> {
    try {
      this.updateProgress(0, presentation.slides.length, 'preparing', 'Preparing PDF export...');

      // Determine which slides to export
      const slidesToExport = this.getSlidesToExport(presentation, options);
      
      // Check if browser supports the new API
      if ('showSaveFilePicker' in window) {
        await this.exportWithFileSystemAPI(presentation, slidesToExport, options);
      } else {
        await this.exportWithFallback(presentation, slidesToExport, options);
      }

      this.updateProgress(slidesToExport.length, slidesToExport.length, 'complete', 'PDF export completed!');
    } catch (error) {
      this.updateProgress(0, 0, 'error', `Export failed: ${error}`);
      throw error;
    }
  }

  // Export using File System Access API (modern browsers)
  private async exportWithFileSystemAPI(
    presentation: Presentation, 
    slides: any[], 
    options: any
  ): Promise<void> {
    try {
      // Request file handle
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: `${presentation.title}.pdf`,
        types: [{
          description: 'PDF files',
          accept: { 'application/pdf': ['.pdf'] }
        }]
      });

      // Generate PDF content
      const pdfContent = await this.generatePDFContent(presentation, slides, options);
      
      // Write to file
      const writable = await fileHandle.createWritable();
      await writable.write(pdfContent);
      await writable.close();
    } catch (error) {
      if (error.name !== 'AbortError') {
        throw error;
      }
    }
  }

  // Fallback export method
  private async exportWithFallback(
    presentation: Presentation, 
    slides: any[], 
    options: any
  ): Promise<void> {
    const pdfContent = await this.generatePDFContent(presentation, slides, options);
    
    // Create download link
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${presentation.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Generate PDF content (placeholder - would use a PDF library like jsPDF)
  private async generatePDFContent(
    presentation: Presentation, 
    slides: any[], 
    options: any
  ): Promise<ArrayBuffer> {
    // This is a placeholder. In a real implementation, you would:
    // 1. Use html2canvas to capture each slide as an image
    // 2. Use jsPDF or PDFLib to create a PDF with those images
    // 3. Optionally add speaker notes as text
    
    for (let i = 0; i < slides.length; i++) {
      this.updateProgress(i + 1, slides.length, 'processing', `Processing slide ${i + 1}...`);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Return placeholder PDF content
    const encoder = new TextEncoder();
    return encoder.encode(`PDF content for: ${presentation.title}`).buffer;
  }

  // Export to PowerPoint (PPTX)
  async exportToPPTX(presentation: Presentation): Promise<void> {
    this.updateProgress(0, presentation.slides.length, 'preparing', 'Preparing PowerPoint export...');
    
    try {
      // This would use a library like PptxGenJS
      const pptxContent = await this.generatePPTXContent(presentation);
      
      const blob = new Blob([pptxContent], { 
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${presentation.title}.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.updateProgress(presentation.slides.length, presentation.slides.length, 'complete', 'PowerPoint export completed!');
    } catch (error) {
      this.updateProgress(0, 0, 'error', `Export failed: ${error}`);
      throw error;
    }
  }

  // Export slides as images
  async exportAsImages(
    presentation: Presentation, 
    format: 'png' | 'jpg' = 'png',
    quality: number = 1.0
  ): Promise<void> {
    this.updateProgress(0, presentation.slides.length, 'preparing', 'Preparing image export...');
    
    try {
      for (let i = 0; i < presentation.slides.length; i++) {
        this.updateProgress(i + 1, presentation.slides.length, 'processing', `Exporting slide ${i + 1}...`);
        
        // This would use html2canvas to capture each slide
        const imageData = await this.captureSlideAsImage(presentation.slides[i], format, quality);
        
        // Download the image
        const a = document.createElement('a');
        a.href = imageData;
        a.download = `${presentation.title}_slide_${i + 1}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      this.updateProgress(presentation.slides.length, presentation.slides.length, 'complete', 'Image export completed!');
    } catch (error) {
      this.updateProgress(0, 0, 'error', `Export failed: ${error}`);
      throw error;
    }
  }

  // Helper methods
  private getSlidesToExport(presentation: Presentation, options: any): any[] {
    const { slideRange, customRange, currentSlide } = options;
    
    switch (slideRange) {
      case 'current':
        return currentSlide ? [presentation.slides[currentSlide - 1]] : [presentation.slides[0]];
      case 'custom':
        if (customRange) {
          return presentation.slides.slice(customRange.start - 1, customRange.end);
        }
        return presentation.slides;
      default:
        return presentation.slides;
    }
  }

  private async generatePPTXContent(presentation: Presentation): Promise<ArrayBuffer> {
    // Placeholder for PPTX generation
    const encoder = new TextEncoder();
    return encoder.encode(`PPTX content for: ${presentation.title}`).buffer;
  }

  private async captureSlideAsImage(slide: any, format: string, quality: number): Promise<string> {
    // Placeholder for slide capture
    // In a real implementation, this would use html2canvas
    return `data:image/${format};base64,placeholder`;
  }

  private updateProgress(current: number, total: number, status: ExportProgress['status'], message: string): void {
    if (this.onProgress) {
      this.onProgress({ current, total, status, message });
    }
  }
}

// Utility functions for sharing
export class PresentationSharer {
  // Generate shareable link
  static async generateShareLink(
    presentationId: string, 
    options: {
      permissions: 'view' | 'edit' | 'comment';
      expiresAt?: Date;
      password?: string;
    }
  ): Promise<string> {
    // This would typically make an API call to generate a secure share link
    const baseUrl = window.location.origin;
    const shareId = btoa(`${presentationId}_${Date.now()}`);
    return `${baseUrl}/shared/${shareId}`;
  }

  // Share via email
  static shareViaEmail(shareUrl: string, presentationTitle: string): void {
    const subject = encodeURIComponent(`Shared Presentation: ${presentationTitle}`);
    const body = encodeURIComponent(
      `I've shared a presentation with you.\n\nTitle: ${presentationTitle}\nLink: ${shareUrl}\n\nClick the link to view the presentation.`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }

  // Generate embed code
  static generateEmbedCode(shareUrl: string, width: number = 800, height: number = 600): string {
    return `<iframe src="${shareUrl}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;
  }

  // Copy to clipboard
  static async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
}

// Auto-save utility
export class AutoSaver {
  private saveFunction: () => Promise<void>;
  private interval: number;
  private timeoutId?: NodeJS.Timeout;

  constructor(saveFunction: () => Promise<void>, interval: number = 30000) {
    this.saveFunction = saveFunction;
    this.interval = interval;
  }

  start(): void {
    this.stop(); // Clear any existing timeout
    this.timeoutId = setTimeout(() => {
      this.saveFunction().catch(console.error);
      this.start(); // Schedule next save
    }, this.interval);
  }

  stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  saveNow(): Promise<void> {
    this.stop();
    const promise = this.saveFunction();
    this.start(); // Restart the timer
    return promise;
  }
}
