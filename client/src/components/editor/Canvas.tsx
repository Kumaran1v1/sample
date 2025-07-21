import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedElement } from "@/store/slices/editorSlice";

export function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLDivElement>(null);
  const { elements, selectedElement, canvasWidth, canvasHeight, zoom } = useSelector(
    (state: RootState) => state.editor
  );

  const handleElementClick = (elementId: string) => {
    dispatch(setSelectedElement(elementId));
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      dispatch(setSelectedElement(null));
    }
  };

  return (
    <div className="bg-gray-100 p-8 overflow-auto">
      <div
        ref={canvasRef}
        className="bg-white shadow-lg relative cursor-default"
        style={{
          width: canvasWidth * zoom,
          height: canvasHeight * zoom,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
        }}
        onClick={handleCanvasClick}
      >
        {elements.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">Canvas Editor</p>
              <p className="text-sm">Drag elements here to design</p>
            </div>
          </div>
        ) : (
          elements.map((element) => (
            <div
              key={element.id}
              className={`absolute border-2 transition-all ${
                selectedElement === element.id
                  ? 'border-purple-500 border-dashed'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                cursor: 'move',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleElementClick(element.id);
              }}
            >
              {element.type === 'text' && (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    fontSize: element.properties.fontSize || 16,
                    color: element.properties.color || '#000000',
                    fontFamily: element.properties.fontFamily || 'Arial',
                    fontWeight: element.properties.fontWeight || 'normal',
                    textAlign: element.properties.textAlign || 'center',
                  }}
                >
                  {element.properties.text || 'Sample Text'}
                </div>
              )}
              
              {element.type === 'image' && (
                <img
                  src={element.properties.src || 'https://via.placeholder.com/300x200'}
                  alt="Design element"
                  className="w-full h-full object-cover"
                />
              )}
              
              {element.type === 'shape' && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: element.properties.backgroundColor || '#e5e7eb',
                    borderRadius: element.properties.borderRadius || 0,
                    border: element.properties.border || 'none',
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
