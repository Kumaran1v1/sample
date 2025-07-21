import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  profileImage?: File;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

export function useProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('bio', data.bio);
      
      if (data.profileImage) {
        formData.append('profileImage', data.profileImage);
      }

      return await apiRequest("PUT", "/api/auth/profile", formData, {
        'Content-Type': 'multipart/form-data',
      });
    },
    onSuccess: (response) => {
      // Invalidate user query to refresh user data
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      
      // Update the user cache immediately
      queryClient.setQueryData(["/api/auth/user"], response.user);
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    },
    onError: (error: any) => {
      console.error("Profile update error:", error);
      
      let errorMessage = "Failed to update profile";
      
      if (error.message?.includes("email")) {
        errorMessage = "Email is already taken by another user";
      } else if (error.message?.includes("validation")) {
        errorMessage = "Please check your input and try again";
      } else if (error.message?.includes("file")) {
        errorMessage = "Invalid file format or size too large";
      }
      
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (data: PasswordChangeData) => {
      return await apiRequest("PUT", "/api/auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
    },
    onError: (error: any) => {
      console.error("Password change error:", error);
      
      let errorMessage = "Failed to change password";
      
      if (error.message?.includes("current password")) {
        errorMessage = "Current password is incorrect";
      } else if (error.message?.includes("validation")) {
        errorMessage = "Password must be at least 8 characters with uppercase, lowercase, and number";
      }
      
      toast({
        title: "Change Password Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    profileUpdateError: updateProfileMutation.error,
    passwordChangeError: changePasswordMutation.error,
  };
}
