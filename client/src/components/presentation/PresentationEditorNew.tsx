import React, { useRef, useCallback } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PresentationProvider, usePresentationContext } from './PresentationContext';
import { PresentationHeader } from './PresentationHeader';
import { PresentationSidebar } from './sidebar/PresentationSidebar';
import { PresentationCanvas } from './PresentationCanvas';
import { PresentationFooter } from './PresentationFooter';

// CSS animations styles
const animationStyles = `
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0,-30px,0);
    }
    70% {
      transform: translate3d(0,-15px,0);
    }
    90% {
      transform: translate3d(0,-4px,0);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const PresentationEditorContent: React.FC = () => {
  const { isPlaying } = usePresentationContext();

  if (isPlaying) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <PresentationCanvas />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Header */}
      <PresentationHeader />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <PresentationSidebar />
        
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <PresentationCanvas />
        </div>
      </div>
      
      {/* Footer */}
      <PresentationFooter />
    </div>
  );
};

export const PresentationEditorNew: React.FC = () => {
  return (
    <TooltipProvider>
      <PresentationProvider>
        <PresentationEditorContent />
      </PresentationProvider>
    </TooltipProvider>
  );
};
