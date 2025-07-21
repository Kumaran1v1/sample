import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePresentationContext } from '../PresentationContext';

export const EffectsTab: React.FC = () => {
  const { selectedElement, updateElement, presentation, currentSlide } = usePresentationContext();

  const selectedElementData = selectedElement 
    ? presentation.slides[currentSlide - 1]?.elements.find(el => el.id === selectedElement)
    : null;

  const isImageElement = selectedElementData?.type === 'image';

  const applyTextEffect = (effectType: string) => {
    if (!selectedElement) return;

    const effects = {
      dropShadow: {
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        color: '#ffffff'
      },
      gradientText: {
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      },
      textBox: {
        border: '2px solid #3b82f6',
        padding: '8px 16px',
        borderRadius: '8px'
      },
      uppercase: {
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontWeight: 'bold'
      },
      bounce: {
        animation: 'bounce 1s infinite',
        transform: 'translateY(0)'
      },
      pulse: {
        animation: 'pulse 2s infinite',
        transform: 'scale(1)'
      },
      fadeIn: {
        animation: 'fadeIn 2s ease-in-out',
        opacity: '1'
      },
      slideIn: {
        animation: 'slideInLeft 1s ease-out',
        transform: 'translateX(0)'
      },
      glow: {
        textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
      },
      outline: {
        WebkitTextStroke: '2px #000000',
        WebkitTextFillColor: 'transparent'
      }
    };

    updateElement(selectedElement, {
      style: effects[effectType as keyof typeof effects]
    });
  };

  const applyImageEffect = (effectType: string) => {
    if (!selectedElement) return;

    const effects = {
      grayscale: { filter: 'grayscale(100%)' },
      sepia: { filter: 'sepia(100%)' },
      blur: { filter: 'blur(2px)' },
      brighten: { filter: 'brightness(1.3)' },
      contrast: { filter: 'contrast(1.5)' },
      saturate: { filter: 'saturate(2)' },
      vintage: { filter: 'sepia(50%) contrast(1.2) brightness(1.1)' },
      dramatic: { filter: 'contrast(1.5) brightness(0.9) saturate(1.2)' },
      circleCrop: { borderRadius: '50%' },
      roundedCorners: { borderRadius: '12px' },
      floatEffect: { animation: 'float 3s ease-in-out infinite' },
      pulseEffect: { animation: 'pulse 2s infinite' },
      rotate: { transform: 'rotate(5deg)' },
      shadow: { 
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        borderRadius: '8px'
      }
    };

    updateElement(selectedElement, {
      style: effects[effectType as keyof typeof effects]
    });
  };

  const resetEffects = () => {
    if (!selectedElement) return;

    updateElement(selectedElement, {
      style: {
        animation: 'none',
        transform: 'none',
        textShadow: 'none',
        background: 'none',
        WebkitBackgroundClip: 'unset',
        WebkitTextFillColor: 'unset',
        backgroundClip: 'unset',
        filter: 'none',
        borderRadius: 0,
        boxShadow: 'none',
        WebkitTextStroke: 'none'
      }
    });
  };

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {/* Text Effects */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Effects</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('dropShadow')}
            disabled={!selectedElement || isImageElement}
          >
            <span className="mr-2">✨</span>
            Drop Shadow
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('gradientText')}
            disabled={!selectedElement || isImageElement}
          >
            <span className="mr-2">🌈</span>
            Gradient Text
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('textBox')}
            disabled={!selectedElement || isImageElement}
          >
            <span className="mr-2">📦</span>
            Text Box
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('uppercase')}
            disabled={!selectedElement || isImageElement}
          >
            <span className="mr-2">🔤</span>
            Uppercase
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('glow')}
            disabled={!selectedElement || isImageElement}
          >
            <span className="mr-2">💫</span>
            Glow Effect
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('outline')}
            disabled={!selectedElement || isImageElement}
          >
            <span className="mr-2">⭕</span>
            Outline Text
          </Button>
        </div>
      </div>

      <Separator />

      {/* Animation Effects */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Animation Effects</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('bounce')}
            disabled={!selectedElement}
          >
            <span className="mr-2">🦋</span>
            Bounce Effect
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('pulse')}
            disabled={!selectedElement}
          >
            <span className="mr-2">💫</span>
            Pulse Effect
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('fadeIn')}
            disabled={!selectedElement}
          >
            <span className="mr-2">✨</span>
            Fade In
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyTextEffect('slideIn')}
            disabled={!selectedElement}
          >
            <span className="mr-2">🚀</span>
            Slide In
          </Button>
        </div>
      </div>

      <Separator />

      {/* Image Effects */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Image Effects</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('grayscale')}
            disabled={!selectedElement || !isImageElement}
          >
            🎨 Grayscale
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('sepia')}
            disabled={!selectedElement || !isImageElement}
          >
            📸 Sepia
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('blur')}
            disabled={!selectedElement || !isImageElement}
          >
            🌫️ Blur
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('brighten')}
            disabled={!selectedElement || !isImageElement}
          >
            ☀️ Brighten
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('contrast')}
            disabled={!selectedElement || !isImageElement}
          >
            🔆 High Contrast
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('saturate')}
            disabled={!selectedElement || !isImageElement}
          >
            🌈 Saturate
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('vintage')}
            disabled={!selectedElement || !isImageElement}
          >
            📷 Vintage
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('dramatic')}
            disabled={!selectedElement || !isImageElement}
          >
            🎭 Dramatic
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('circleCrop')}
            disabled={!selectedElement || !isImageElement}
          >
            ⭕ Circle Crop
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('roundedCorners')}
            disabled={!selectedElement || !isImageElement}
          >
            📐 Rounded Corners
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('floatEffect')}
            disabled={!selectedElement || !isImageElement}
          >
            🦋 Float Effect
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('pulseEffect')}
            disabled={!selectedElement || !isImageElement}
          >
            💫 Pulse Effect
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('rotate')}
            disabled={!selectedElement || !isImageElement}
          >
            🔄 Rotate
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => applyImageEffect('shadow')}
            disabled={!selectedElement || !isImageElement}
          >
            🌑 Drop Shadow
          </Button>
        </div>
      </div>

      <Separator />

      {/* Reset Effects */}
      <div>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={resetEffects}
          disabled={!selectedElement}
        >
          <span className="mr-2">🔄</span>
          Reset All Effects
        </Button>
      </div>

      {!selectedElement && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Select an element to apply effects</p>
        </div>
      )}

      {selectedElement && !isImageElement && (
        <div className="text-center py-4 text-gray-600">
          <p className="text-xs">Image effects are only available for image elements</p>
        </div>
      )}
    </div>
  );
};
