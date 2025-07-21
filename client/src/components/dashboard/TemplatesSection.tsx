import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setTemplates, setCategories } from "@/store/slices/templateSlice";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { CategoryFilter } from "@/components/templates/CategoryFilter";
import { type ITemplate, type ICategory } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, TrendingUp } from "lucide-react";

interface TemplatesSectionProps {
  searchQuery: string;
}

export function TemplatesSection({ searchQuery }: TemplatesSectionProps) {
  const dispatch = useDispatch();
  const { templates, categories, selectedCategory } = useSelector(
    (state: RootState) => state.template
  );

  // Fetch categories
  const { data: categoriesData } = useQuery<ICategory[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch templates
  const { data: templatesData, isLoading: templatesLoading } = useQuery<ITemplate[]>({
    queryKey: ['/api/templates', selectedCategory, searchQuery],
  });

  useEffect(() => {
    if (categoriesData) {
      dispatch(setCategories(categoriesData));
    }
  }, [categoriesData, dispatch]);

  useEffect(() => {
    if (templatesData) {
      dispatch(setTemplates(templatesData));
    }
  }, [templatesData, dispatch]);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Popular</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      {/* <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Templates</h2>
        <CategoryFilter categories={categories} />
      </div> */}

      {/* Templates Grid */}
      {/* <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedCategory ? `${selectedCategory} Templates` : 'All Templates'}
          </h2>
          <p className="text-sm text-gray-600">
            {templates.length} template{templates.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <TemplateGrid 
          templates={templates} 
          isLoading={templatesLoading}
        />
      </div> */}
    </div>
  );
}
