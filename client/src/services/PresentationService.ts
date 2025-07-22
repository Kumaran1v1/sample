import { Presentation } from "@/components/presentation/types";

export interface ExportOptions {
  format: 'pdf' | 'pptx' | 'png' | 'jpg';
  quality?: 'low' | 'medium' | 'high';
  includeNotes?: boolean;
  slideRange?: 'all' | 'current' | 'custom';
  customRange?: { start: number; end: number };
}

export interface ShareOptions {
  type: 'link' | 'email' | 'embed';
  permissions?: 'view' | 'edit' | 'comment';
  expiresAt?: Date;
  password?: string;
  allowDownload?: boolean;
}

export interface SaveOptions {
  autoSave?: boolean;
  createBackup?: boolean;
  version?: string;
}

class PresentationService {
  private baseUrl = '/api/presentations';

  // Save presentation
  async savePresentation(presentation: Presentation, options: SaveOptions = {}): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${presentation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...presentation,
          updatedAt: new Date(),
          options
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save presentation: ${response.statusText}`);
      }

      // If backup is requested, create a backup version
      if (options.createBackup) {
        await this.createBackup(presentation);
      }

      console.log('Presentation saved successfully');
    } catch (error) {
      console.error('Error saving presentation:', error);
      // Fallback to local storage
      this.saveToLocalStorage(presentation);
      throw error;
    }
  }

  // Load presentation
  async loadPresentation(id: string): Promise<Presentation> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load presentation: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error loading presentation:', error);
      // Fallback to local storage
      return this.loadFromLocalStorage(id);
    }
  }

  // Export presentation
  async exportPresentation(presentation: Presentation, options: ExportOptions): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/${presentation.id}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          presentation,
          options
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to export presentation: ${response.statusText}`);
      }

      const blob = await response.blob();
      
      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${presentation.title}.${options.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return blob;
    } catch (error) {
      console.error('Error exporting presentation:', error);
      // Fallback to client-side export
      return this.clientSideExport(presentation, options);
    }
  }

  // Share presentation
  async sharePresentation(presentation: Presentation, options: ShareOptions): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/${presentation.id}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          presentation,
          options
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to share presentation: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Handle different share types
      switch (options.type) {
        case 'link':
          // Copy link to clipboard
          await navigator.clipboard.writeText(result.shareUrl);
          return result.shareUrl;
          
        case 'email':
          // Open email client
          const emailSubject = encodeURIComponent(`Shared: ${presentation.title}`);
          const emailBody = encodeURIComponent(`I've shared a presentation with you: ${result.shareUrl}`);
          window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
          return result.shareUrl;
          
        case 'embed':
          // Return embed code
          const embedCode = `<iframe src="${result.embedUrl}" width="800" height="600" frameborder="0"></iframe>`;
          await navigator.clipboard.writeText(embedCode);
          return embedCode;
          
        default:
          return result.shareUrl;
      }
    } catch (error) {
      console.error('Error sharing presentation:', error);
      throw error;
    }
  }

  // Create backup
  private async createBackup(presentation: Presentation): Promise<void> {
    const backupData = {
      ...presentation,
      id: `${presentation.id}_backup_${Date.now()}`,
      title: `${presentation.title} (Backup)`,
      createdAt: new Date()
    };

    localStorage.setItem(`presentation_backup_${presentation.id}`, JSON.stringify(backupData));
  }

  // Local storage fallback
  private saveToLocalStorage(presentation: Presentation): void {
    localStorage.setItem(`presentation_${presentation.id}`, JSON.stringify(presentation));
  }

  private loadFromLocalStorage(id: string): Presentation {
    const data = localStorage.getItem(`presentation_${id}`);
    if (!data) {
      throw new Error('Presentation not found in local storage');
    }
    return JSON.parse(data);
  }

  // Client-side export fallback
  private async clientSideExport(presentation: Presentation, options: ExportOptions): Promise<Blob> {
    switch (options.format) {
      case 'pdf':
        return this.exportToPDF(presentation, options);
      case 'png':
        return this.exportToPNG(presentation, options);
      case 'jpg':
        return this.exportToJPG(presentation, options);
      default:
        throw new Error(`Client-side export not supported for format: ${options.format}`);
    }
  }

  // PDF export using html2canvas and jsPDF
  private async exportToPDF(presentation: Presentation, options: ExportOptions): Promise<Blob> {
    // This would require html2canvas and jsPDF libraries
    // For now, return a placeholder
    const content = JSON.stringify(presentation, null, 2);
    return new Blob([content], { type: 'application/json' });
  }

  // PNG export
  private async exportToPNG(presentation: Presentation, options: ExportOptions): Promise<Blob> {
    // This would use html2canvas to capture slides
    const content = JSON.stringify(presentation, null, 2);
    return new Blob([content], { type: 'application/json' });
  }

  // JPG export
  private async exportToJPG(presentation: Presentation, options: ExportOptions): Promise<Blob> {
    // This would use html2canvas to capture slides
    const content = JSON.stringify(presentation, null, 2);
    return new Blob([content], { type: 'application/json' });
  }

  // Get presentation list
  async getPresentations(): Promise<Presentation[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch presentations: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching presentations:', error);
      return this.getLocalPresentations();
    }
  }

  // Get local presentations
  private getLocalPresentations(): Presentation[] {
    const presentations: Presentation[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('presentation_') && !key.includes('backup')) {
        const data = localStorage.getItem(key);
        if (data) {
          presentations.push(JSON.parse(data));
        }
      }
    }
    return presentations;
  }

  // Delete presentation
  async deletePresentation(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete presentation: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting presentation:', error);
      // Remove from local storage
      localStorage.removeItem(`presentation_${id}`);
      throw error;
    }
  }
}

export const presentationService = new PresentationService();
