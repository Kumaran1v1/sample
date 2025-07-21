import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Clock,
  Edit,
  Trash2,
  Plus,
  LogIn,
  Download,
  Share,
  Copy,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'login':
      return <LogIn className="h-4 w-4 text-green-600" />;
    case 'create':
      return <Plus className="h-4 w-4 text-blue-600" />;
    case 'edit':
      return <Edit className="h-4 w-4 text-orange-600" />;
    case 'delete':
      return <Trash2 className="h-4 w-4 text-red-600" />;
    case 'download':
      return <Download className="h-4 w-4 text-purple-600" />;
    case 'share':
      return <Share className="h-4 w-4 text-indigo-600" />;
    case 'view':
      return <Eye className="h-4 w-4 text-gray-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'login':
      return 'bg-green-50 border-green-200';
    case 'create':
      return 'bg-blue-50 border-blue-200';
    case 'edit':
      return 'bg-orange-50 border-orange-200';
    case 'delete':
      return 'bg-red-50 border-red-200';
    case 'download':
      return 'bg-purple-50 border-purple-200';
    case 'share':
      return 'bg-indigo-50 border-indigo-200';
    case 'view':
      return 'bg-gray-50 border-gray-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    clearAll,
    formatTimestamp,
    isMarkingAsRead,
    isMarkingAllAsRead,
    isClearing,
  } = useNotifications();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Notification Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0 || isMarkingAllAsRead}
          >
            {isMarkingAllAsRead ? 'Marking...' : 'Mark all read'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            disabled={notifications.length === 0 || isClearing}
          >
            {isClearing ? 'Clearing...' : 'Clear all'}
          </Button>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50",
                    getNotificationColor(notification.type),
                    !notification.read && "ring-2 ring-purple-200"
                  )}
                  onClick={() => !notification.read && markAsRead(notification._id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      {notification.projectName && (
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {notification.projectType}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {notification.projectName}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
}
