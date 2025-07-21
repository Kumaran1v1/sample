import { useDispatch } from "react-redux";
import { addElement } from "@/store/slices/editorSlice";
import { Button } from "@/components/ui/button";
import { Type, Image, Square, Circle } from "lucide-react";
import { nanoid } from "nanoid";

export function ToolPanel() {
  const dispatch = useDispatch();

  const addTextElement = () => {
    const newElement = {
      id: nanoid(),
      type: 'text' as const,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      properties: {
        text: 'Sample Text',
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Arial',
        fontWeight: 'normal',
        textAlign: 'center',
      },
    };
    dispatch(addElement(newElement));
  };

  const addImageElement = () => {
    const newElement = {
      id: nanoid(),
      type: 'image' as const,
      x: 150,
      y: 150,
      width: 200,
      height: 150,
      properties: {
        src: 'https://via.placeholder.com/300x200',
        alt: 'Sample Image',
      },
    };
    dispatch(addElement(newElement));
  };

  const addShapeElement = (shapeType: 'rectangle' | 'circle') => {
    const newElement = {
      id: nanoid(),
      type: 'shape' as const,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      properties: {
        shapeType,
        backgroundColor: '#e5e7eb',
        borderRadius: shapeType === 'circle' ? 50 : 0,
        border: '1px solid #d1d5db',
      },
    };
    dispatch(addElement(newElement));
  };

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start hover:bg-purple-50 hover:text-purple-700"
            onClick={addTextElement}
          >
            <Type className="w-4 h-4 mr-3" />
            Text
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start hover:bg-purple-50 hover:text-purple-700"
            onClick={addImageElement}
          >
            <Image className="w-4 h-4 mr-3" />
            Image
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start hover:bg-purple-50 hover:text-purple-700"
            onClick={() => addShapeElement('rectangle')}
          >
            <Square className="w-4 h-4 mr-3" />
            Rectangle
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start hover:bg-purple-50 hover:text-purple-700"
            onClick={() => addShapeElement('circle')}
          >
            <Circle className="w-4 h-4 mr-3" />
            Circle
          </Button>
        </div>
      </div>
    </div>
  );
}
