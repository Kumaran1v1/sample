import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentTemplate, setElements } from "@/store/slices/editorSlice";
import { Canvas } from "@/components/editor/Canvas";
import { ToolPanel } from "@/components/editor/ToolPanel";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Undo, Redo } from "lucide-react";
import { Template } from "@shared/schema";

export default function Editor() {
  const [location, setLocation] = useLocation();
  const dispatch = useDispatch();
  const { currentTemplate, elements, selectedElement } = useSelector(
    (state: RootState) => state.editor
  );

  // Get template ID from URL
  const templateId = new URLSearchParams(location.split('?')[1] || '').get('templateId');

  // Fetch template data
  const { data: templateData } = useQuery<Template>({
    queryKey: ['/api/templates', templateId],
    enabled: !!templateId,
  });

  useEffect(() => {
    if (templateData) {
      dispatch(setCurrentTemplate(templateData));
      // Load template elements
      if (templateData.designData) {
        dispatch(setElements(templateData.designData.elements || []));
      }
    }
  }, [templateData, dispatch]);

  const handleBack = () => {
    setLocation('/dashboard');
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download project');
  };

  const handleUndo = () => {
    // TODO: Implement undo functionality
    console.log('Undo');
  };

  const handleRedo = () => {
    // TODO: Implement redo functionality
    console.log('Redo');
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Editor Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium text-gray-900">Design Editor</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleUndo}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRedo}>
            <Redo className="w-4 h-4" />
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Tool Panel */}
        <ToolPanel />

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <Canvas />
        </div>

        {/* Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
}
