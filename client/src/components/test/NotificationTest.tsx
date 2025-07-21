import { Button } from "@/components/ui/button";
import { useNotificationActions } from "@/hooks/useNotifications";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function NotificationTest() {
  const { 
    notifyProjectCreated, 
    notifyProjectEdited, 
    notifyProjectDeleted, 
    notifyProjectDownloaded 
  } = useNotificationActions();
  
  const { refreshNotifications, createActivityNotification } = useNotificationContext();

  const testNotifications = [
    {
      label: "Test Project Created",
      action: () => notifyProjectCreated("Test Project", "Presentation"),
    },
    {
      label: "Test Project Edited", 
      action: () => notifyProjectEdited("Test Project", "Presentation"),
    },
    {
      label: "Test Project Deleted",
      action: () => notifyProjectDeleted("Test Project", "Presentation"),
    },
    {
      label: "Test Project Downloaded",
      action: () => notifyProjectDownloaded("Test Project", "Presentation"),
    },
    {
      label: "Test Custom Activity",
      action: () => createActivityNotification(
        "view",
        "Project Viewed",
        "Viewed project details",
        "Test Project",
        "Presentation"
      ),
    },
    {
      label: "Refresh Notifications",
      action: () => refreshNotifications(),
    },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Notification Testing</CardTitle>
        <CardDescription>
          Test dynamic notification creation and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {testNotifications.map((test, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={test.action}
            className="w-full justify-start"
          >
            {test.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
