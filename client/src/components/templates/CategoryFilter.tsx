import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedCategory } from "@/store/slices/templateSlice";
import { Button } from "@/components/ui/button";
import { type ICategory } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: ICategory[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state: RootState) => state.template);

  const handleCategoryClick = (categoryId: string | null) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by category</h2>
      <div className="flex flex-wrap gap-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => handleCategoryClick(null)}
          className={cn(
            "h-auto p-4 flex-col items-center min-w-[100px]",
            selectedCategory === null 
              ? "bg-purple-600 hover:bg-purple-700" 
              : "hover:bg-gray-50"
          )}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="text-sm font-medium">All</span>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category._id ? "default" : "outline"}
            onClick={() => handleCategoryClick(category._id)}
            className={cn(
              "h-auto p-4 flex-col items-center min-w-[100px]",
              selectedCategory === category._id
                ? "bg-purple-600 hover:bg-purple-700"
                : "hover:bg-gray-50"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-2",
              category.color ? `bg-gradient-to-br from-${category.color}-100 to-${category.color}-200` : "bg-gradient-to-br from-gray-100 to-gray-200"
            )}>
              {category.icon ? (
                <i className={`${category.icon} text-xl ${category.color ? `text-${category.color}-600` : 'text-gray-600'}`} />
              ) : (
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
