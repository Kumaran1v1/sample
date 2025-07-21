import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { updateElement } from "@/store/slices/editorSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

export function PropertiesPanel() {
  const dispatch = useDispatch();
  const { elements, selectedElement } = useSelector((state: RootState) => state.editor);

  const selectedElementData = elements.find(el => el.id === selectedElement);

  const updateProperty = (property: string, value: any) => {
    if (selectedElement) {
      dispatch(updateElement({
        id: selectedElement,
        updates: {
          properties: {
            ...selectedElementData?.properties,
            [property]: value,
          },
        },
      }));
    }
  };

  if (!selectedElementData) {
    return (
      <div className="w-64 bg-white border-l">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
          <p className="text-sm text-gray-500">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-l overflow-y-auto">
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
        
        <div className="space-y-4">
          {/* Position and Size */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Position</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <Label className="text-xs text-gray-500">X</Label>
                <Input
                  type="number"
                  value={selectedElementData.x}
                  onChange={(e) => dispatch(updateElement({
                    id: selectedElement!,
                    updates: { x: parseInt(e.target.value) || 0 },
                  }))}
                  className="h-8"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Y</Label>
                <Input
                  type="number"
                  value={selectedElementData.y}
                  onChange={(e) => dispatch(updateElement({
                    id: selectedElement!,
                    updates: { y: parseInt(e.target.value) || 0 },
                  }))}
                  className="h-8"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Size</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <Label className="text-xs text-gray-500">Width</Label>
                <Input
                  type="number"
                  value={selectedElementData.width}
                  onChange={(e) => dispatch(updateElement({
                    id: selectedElement!,
                    updates: { width: parseInt(e.target.value) || 0 },
                  }))}
                  className="h-8"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Height</Label>
                <Input
                  type="number"
                  value={selectedElementData.height}
                  onChange={(e) => dispatch(updateElement({
                    id: selectedElement!,
                    updates: { height: parseInt(e.target.value) || 0 },
                  }))}
                  className="h-8"
                />
              </div>
            </div>
          </div>

          {/* Text Properties */}
          {selectedElementData.type === 'text' && (
            <>
              <div>
                <Label className="text-sm font-medium text-gray-700">Text</Label>
                <Textarea
                  value={selectedElementData.properties.text || ''}
                  onChange={(e) => updateProperty('text', e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Font Size</Label>
                <div className="mt-2">
                  <Slider
                    value={[selectedElementData.properties.fontSize || 16]}
                    onValueChange={(value) => updateProperty('fontSize', value[0])}
                    max={72}
                    min={8}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>8px</span>
                    <span>{selectedElementData.properties.fontSize || 16}px</span>
                    <span>72px</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Color</Label>
                <div className="mt-2">
                  <Input
                    type="color"
                    value={selectedElementData.properties.color || '#000000'}
                    onChange={(e) => updateProperty('color', e.target.value)}
                    className="h-10 w-full"
                  />
                </div>
              </div>
            </>
          )}

          {/* Image Properties */}
          {selectedElementData.type === 'image' && (
            <div>
              <Label className="text-sm font-medium text-gray-700">Image URL</Label>
              <Input
                value={selectedElementData.properties.src || ''}
                onChange={(e) => updateProperty('src', e.target.value)}
                className="mt-2"
                placeholder="Enter image URL"
              />
            </div>
          )}

          {/* Shape Properties */}
          {selectedElementData.type === 'shape' && (
            <>
              <div>
                <Label className="text-sm font-medium text-gray-700">Background Color</Label>
                <div className="mt-2">
                  <Input
                    type="color"
                    value={selectedElementData.properties.backgroundColor || '#e5e7eb'}
                    onChange={(e) => updateProperty('backgroundColor', e.target.value)}
                    className="h-10 w-full"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Border Radius</Label>
                <div className="mt-2">
                  <Slider
                    value={[selectedElementData.properties.borderRadius || 0]}
                    onValueChange={(value) => updateProperty('borderRadius', value[0])}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0px</span>
                    <span>{selectedElementData.properties.borderRadius || 0}px</span>
                    <span>50px</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
