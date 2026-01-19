import { createContext, useContext, useState } from "react"
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

export type NotificationType = "success" | "error"

const NotificationContext = createContext<{
    notify: (type: NotificationType, message?: string) => void}>({ notify: () => {} })

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState<string | null>(null)
    const [type, setType] = useState<NotificationType | null>(null)

    const notify = (t: NotificationType, msg: string = "Success") => {
        setMessage(msg)
        setType(t)
    }

    const handleClose = () => {
        setMessage(null)
        setType(null)
    }

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {type === "success" && (
                <Snackbar open={!!message} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="success" onClose={handleClose}>Success</Alert>
                </Snackbar>
            )}
            {type === "error" && (
                <Dialog open={!!message} onClose={handleClose}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>{message}</DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext)
