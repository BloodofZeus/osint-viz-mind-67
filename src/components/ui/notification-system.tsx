import { useState, useEffect } from "react"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  duration?: number
}

interface NotificationSystemProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export const NotificationSystem = ({ notifications, onRemove }: NotificationSystemProps) => {
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          onRemove(notification.id)
        }, notification.duration)
        
        return () => clearTimeout(timer)
      }
    })
  }, [notifications, onRemove])

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5" />
      case "warning": return <AlertTriangle className="w-5 h-5" />
      case "error": return <AlertCircle className="w-5 h-5" />
      case "info": return <Info className="w-5 h-5" />
    }
  }

  const getStyles = (type: Notification["type"]) => {
    switch (type) {
      case "success": return "border-success/30 bg-success/10 text-success-foreground"
      case "warning": return "border-warning/30 bg-warning/10 text-warning-foreground"
      case "error": return "border-destructive/30 bg-destructive/10 text-destructive-foreground"
      case "info": return "border-primary/30 bg-primary/10 text-primary-foreground"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={cn(
            "glass border rounded-lg p-4 shadow-cyber animate-in slide-in-from-right-full",
            getStyles(notification.type)
          )}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold">{notification.title}</h4>
              <p className="text-sm opacity-90 mt-1">{notification.message}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(notification.id)}
              className="flex-shrink-0 h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
}