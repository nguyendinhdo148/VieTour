import { useState, useEffect, useRef } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import { API } from "@/utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Notification } from "@/types/notification";
import toast from "react-hot-toast";

const NotificationBell = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`${API}/notification`, {
        withCredentials: true,
        params: { limit: 20, page: 1 },
      });

      if (res.data.success) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await axios.put(
        `${API}/notification/${notificationId}/read`,
        {},
        {
          withCredentials: true,
        }
      );

      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId
            ? { ...notif, isRead: true, readAt: new Date().toISOString() }
            : notif
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${API}/notification/read-all`,
        {},
        {
          withCredentials: true,
        }
      );

      setNotifications((prev) =>
        prev.map((notif) => ({
          ...notif,
          isRead: true,
          readAt: new Date().toISOString(),
        }))
      );
      setUnreadCount(0);
      toast.success("Đã đánh dấu tất cả là đã đọc");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Có lỗi xảy ra");
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId: string) => {
    try {
      await axios.delete(`${API}/notification/${notificationId}`, {
        withCredentials: true,
      });

      const deletedNotif = notifications.find((n) => n._id === notificationId);
      if (deletedNotif && !deletedNotif.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      setNotifications((prev) =>
        prev.filter((notif) => notif._id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Có lỗi xảy ra khi xóa thông báo");
    }
  };

  // Handle job click
  const handleJobClick = (jobSlug: string, notificationId: string) => {
    markAsRead(notificationId);
    navigate(`/job/detail/${jobSlug}`);
    setIsOpen(false);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  // Fetch notifications on mount and set up polling
  useEffect(() => {
    if (user) {
      fetchNotifications();

      intervalRef.current = setInterval(() => {
        fetchNotifications();
      }, 5 * 60 * 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Fetch when popover opens
  useEffect(() => {
    if (isOpen && user) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user]);

  if (!user) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative cursor-pointer h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Bell className="size-5 text-gray-700" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 flex items-center justify-center shadow-sm"
            >
              <span className="text-xs font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[480px] max-w-[92vw] p-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">Thông báo</h3>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-8 text-xs text-gray-600 hover:text-gray-900"
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Đọc tất cả
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-auto max-h-[60vh] pr-1 overflow-y-auto">
          {isLoading ? (
            // Thêm py-8 hoặc h-40 để khi loading nó có chiều cao vừa đủ đẹp, không bị quá bé
            <div className="flex items-center justify-center py-10 min-h-[150px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Bell className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">Chưa có thông báo nào</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? "bg-indigo-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-semibold text-sm leading-snug mb-1 line-clamp-2 ${
                                !notification.isRead
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-3">
                              {notification.message}
                            </p>
                            {notification.searchQuery && (
                              <Badge
                                variant="outline"
                                className="text-[11px] mb-2 border-indigo-100 bg-indigo-50 text-indigo-700"
                              >
                                Từ khóa: {notification.searchQuery}
                              </Badge>
                            )}
                          </div>
                          {!notification.isRead && (
                            <div className="h-2 w-2 rounded-full bg-indigo-600 flex-shrink-0 mt-1"></div>
                          )}
                        </div>

                        {/* Related Jobs */}
                        {notification.relatedJobs &&
                          notification.relatedJobs.length > 0 && (
                            <div className="space-y-2 mt-3">
                              {notification.relatedJobs.map(
                                (relatedJob, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() =>
                                      handleJobClick(
                                        relatedJob.jobSlug,
                                        notification._id
                                      )
                                    }
                                    className="p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all group"
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="flex items-center justify-center h-11 w-11 bg-white rounded-md flex-shrink-0 border border-gray-200 overflow-hidden">
                                        {typeof relatedJob.job === "object" &&
                                        relatedJob.job?.company?.logo ? (
                                          <img
                                            src={relatedJob.job.company.logo}
                                            alt={relatedJob.companyName}
                                            className="h-full w-full object-contain"
                                            onError={(e) => {
                                              e.currentTarget.src =
                                                "/default_company_logo.jpg";
                                            }}
                                          />
                                        ) : (
                                          <img
                                            src="/default_company_logo.jpg"
                                            alt={relatedJob.companyName}
                                            className="h-full w-full object-contain"
                                          />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                          {relatedJob.jobTitle}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                          {relatedJob.companyName}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-400">
                            {formatDate(notification.notificationDate)}
                          </span>
                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification._id)}
                                className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                              >
                                Đánh dấu đã đọc
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteNotification(notification._id)
                              }
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
