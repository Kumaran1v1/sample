import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  BarChart3, 
  Plus, 
  Clock, 
  Star, 
  MoreVertical,
  Edit3,
  Trash2,
  Share2,
  Calculator,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SheetsProps {
  searchQuery: string;
}

// Mock data for spreadsheets
const mockSheets = [
  {
    id: 1,
    title: "Budget Tracker 2024",
    type: "Spreadsheet",
    lastModified: "1 hour ago",
    size: "1.8 MB",
    isStarred: true,
    rows: 150,
    columns: 12,
  },
  {
    id: 2,
    title: "Sales Analytics Q1",
    type: "Spreadsheet",
    lastModified: "2 days ago",
    size: "3.2 MB",
    isStarred: false,
    rows: 500,
    columns: 8,
  },
  {
    id: 3,
    title: "Employee Schedule",
    type: "Spreadsheet",
    lastModified: "5 days ago",
    size: "0.9 MB",
    isStarred: true,
    rows: 75,
    columns: 15,
  },
  {
    id: 4,
    title: "Inventory Management",
    type: "Spreadsheet",
    lastModified: "1 week ago",
    size: "2.1 MB",
    isStarred: false,
    rows: 300,
    columns: 10,
  },
];

const sheetTemplates = [
  { 
    name: "Blank Spreadsheet", 
    icon: Sheet, 
    description: "Start with an empty grid",
    color: "bg-green-100 text-green-600"
  },
  { 
    name: "Budget Template", 
    icon: Calculator, 
    description: "Personal or business budget",
    color: "bg-blue-100 text-blue-600"
  },
  { 
    name: "Analytics Dashboard", 
    icon: BarChart3, 
    description: "Data visualization template",
    color: "bg-purple-100 text-purple-600"
  },
  { 
    name: "Project Tracker", 
    icon: TrendingUp, 
    description: "Track project progress",
    color: "bg-orange-100 text-orange-600"
  },
];

export function SheetsSection({ searchQuery }: SheetsProps) {
  const [sheets] = useState(mockSheets);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredSheets = sheets.filter(sheet =>
    sheet.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = (templateName: string) => {
    console.log(`Creating new spreadsheet with template: ${templateName}`);
    // TODO: Implement spreadsheet creation
  };

  const handleSheetAction = (action: string, sheetId: number) => {
    console.log(`${action} spreadsheet with ID: ${sheetId}`);
    // TODO: Implement spreadsheet actions
  };

  return (
    <div className="space-y-6">
      {/* Create New Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Spreadsheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sheetTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Card 
                key={template.name} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCreateNew(template.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${template.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Spreadsheets */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Spreadsheets</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {filteredSheets.length === 0 ? (
          <div className="text-center py-12">
            <Sheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No spreadsheets found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first spreadsheet to get started"}
            </p>
            <Button onClick={() => handleCreateNew("Blank Spreadsheet")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Spreadsheet
            </Button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
            {filteredSheets.map((sheet) => (
              <Card key={sheet.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex items-center space-x-4"}>
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-[4/5] bg-green-50 rounded-lg mb-3 flex items-center justify-center border-2 border-green-100">
                        <div className="grid grid-cols-3 gap-1 w-8 h-8">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="bg-green-200 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{sheet.title}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              {sheet.rows} rows
                            </Badge>
                            {sheet.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {sheet.lastModified}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSheetAction("edit", sheet.id)}>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSheetAction("share", sheet.id)}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleSheetAction("delete", sheet.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Sheet className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 truncate">{sheet.title}</h3>
                          {sheet.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {sheet.lastModified} • {sheet.rows} rows, {sheet.columns} columns
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSheetAction("edit", sheet.id)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSheetAction("share", sheet.id)}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleSheetAction("delete", sheet.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
