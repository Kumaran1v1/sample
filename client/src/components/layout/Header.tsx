import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setSearchQuery } from "@/store/slices/templateSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, LogOut, User, Bell, Settings, UserCircle, Key } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { ProfileModal } from "@/components/profile/ProfileModal";
import { ChangePasswordModal } from "@/components/profile/ChangePasswordModal";

export function Header() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { toast } = useToast();
  const { unreadCount } = useNotificationContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});

      // Invalidate user query to clear user data
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "Success",
        description: "Logged out successfully!",
      });

      // Redirect to landing page
      window.location.href = "/";
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white shadow-sm border-b px-3 sm:px-6 py-3 sm:py-4 header-mobile">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <h1 className="text-2xl font-bold text-gray-900">Templates</h1> */}
          {/* <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 focus:ring-purple-500 focus:border-purple-500"
            />
          </form> */}
        </div>
        <div className="flex items-center space-x-3">
          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 rounded-full"
            onClick={() => setShowNotifications(true)}
          >
            <Bell className="h-5 w-5" />
            {/* Dynamic Notification Badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                <div className="text-sm text-muted-foreground">{user?.email}</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowProfile(true)}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowChangePassword(true)}>
                <Key className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
