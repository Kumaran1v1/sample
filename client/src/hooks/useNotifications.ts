import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  _id: string;
  userId: string;
  type: 'login' | 'create' | 'edit' | 'delete' | 'download' | 'share' | 'view';
  title: string;
  description: string;
  projectName?: string;
  projectType?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useNotifications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch notifications
  const {
    data: notifications = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["/api/notifications"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/notifications");
        return response.notifications || [];
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        return [];
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 10000, // Consider data stale after 10 seconds
  });

  // Mark notification as read
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return await apiRequest("PUT", `/api/notifications/${notificationId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    },
  });

  // Mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("PUT", "/api/notifications/mark-all-read");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read",
        variant: "destructive",
      });
    },
  });

  // Clear all notifications
  const clearAllMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("DELETE", "/api/notifications");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
      toast({
        title: "Success",
        description: "All notifications cleared",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to clear notifications",
        variant: "destructive",
      });
    },
  });

  // Create notification (for internal use)
  const createNotificationMutation = useMutation({
    mutationFn: async (notificationData: {
      type: string;
      title: string;
      description: string;
      projectName?: string;
      projectType?: string;
    }) => {
      return await apiRequest("POST", "/api/notifications", notificationData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
    onError: (error: any) => {
      console.error("Failed to create notification:", error);
    },
  });

  // Helper functions
  const markAsRead = useCallback((notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  }, [markAsReadMutation]);

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  const clearAll = useCallback(() => {
    clearAllMutation.mutate();
  }, [clearAllMutation]);

  const createNotification = useCallback((data: {
    type: string;
    title: string;
    description: string;
    projectName?: string;
    projectType?: string;
  }) => {
    createNotificationMutation.mutate(data);
  }, [createNotificationMutation]);

  // Calculate unread count
  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  // Format timestamp helper
  const formatTimestamp = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    clearAll,
    createNotification,
    formatTimestamp,
    refetch,
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isClearing: clearAllMutation.isPending,
  };
}

// Hook for creating specific notification types
export function useNotificationActions() {
  const { createNotification } = useNotifications();

  const notifyProjectCreated = useCallback((projectName: string, projectType: string) => {
    createNotification({
      type: 'create',
      title: 'Project Created',
      description: `Created new ${projectType.toLowerCase()} "${projectName}"`,
      projectName,
      projectType,
    });
  }, [createNotification]);

  const notifyProjectEdited = useCallback((projectName: string, projectType: string) => {
    createNotification({
      type: 'edit',
      title: 'Project Updated',
      description: `Edited "${projectName}" ${projectType.toLowerCase()}`,
      projectName,
      projectType,
    });
  }, [createNotification]);

  const notifyProjectDeleted = useCallback((projectName: string, projectType: string) => {
    createNotification({
      type: 'delete',
      title: 'Project Deleted',
      description: `Moved "${projectName}" to trash`,
      projectName,
      projectType,
    });
  }, [createNotification]);

  const notifyProjectDownloaded = useCallback((projectName: string, projectType: string) => {
    createNotification({
      type: 'download',
      title: 'Project Downloaded',
      description: `Downloaded "${projectName}" ${projectType.toLowerCase()}`,
      projectName,
      projectType,
    });
  }, [createNotification]);

  return {
    notifyProjectCreated,
    notifyProjectEdited,
    notifyProjectDeleted,
    notifyProjectDownloaded,
  };
}
