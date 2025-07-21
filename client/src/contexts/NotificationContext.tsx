import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/hooks/useAuth';

interface NotificationContextType {
  unreadCount: number;
  refreshNotifications: () => void;
  createActivityNotification: (type: string, title: string, description: string, projectName?: string, projectType?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { unreadCount, refetch, createNotification } = useNotifications();
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Auto-refresh notifications every 30 seconds when user is active
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      refetch();
      setLastRefresh(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, [user, refetch]);

  // Refresh notifications when user becomes active (focus/visibility change)
  useEffect(() => {
    if (!user) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Only refresh if it's been more than 10 seconds since last refresh
        if (Date.now() - lastRefresh > 10000) {
          refetch();
          setLastRefresh(Date.now());
        }
      }
    };

    const handleFocus = () => {
      if (Date.now() - lastRefresh > 10000) {
        refetch();
        setLastRefresh(Date.now());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, refetch, lastRefresh]);

  const refreshNotifications = () => {
    refetch();
    setLastRefresh(Date.now());
  };

  const createActivityNotification = (
    type: string, 
    title: string, 
    description: string, 
    projectName?: string, 
    projectType?: string
  ) => {
    createNotification({
      type,
      title,
      description,
      projectName,
      projectType,
    });
  };

  const value: NotificationContextType = {
    unreadCount,
    refreshNotifications,
    createActivityNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}
