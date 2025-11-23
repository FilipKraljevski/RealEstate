import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface CodeVerificationDialogProps {
    open: boolean;
    onClose: () => void;
    onVerified: () => void;
    maxDuration?: number;
}

export function CodeVerificationDialog({ open, onClose, onVerified, maxDuration = 10000 }: CodeVerificationDialogProps) {
    const [code, setCode] = useState("");
    const [expiresAt, setExpiresAt] = useState<number | null>(null);

    useEffect(() => {
        if (open) {
            const expiry = Date.now() + maxDuration;
            setExpiresAt(expiry);
            localStorage.setItem("codePopupExpiry", expiry.toString());
        }
    }, [open, maxDuration]);

    useEffect(() => {
        if (!expiresAt) 
            return;
        const interval = setInterval(() => {
            if (Date.now() > expiresAt) {
                onClose();
                localStorage.removeItem("codePopupExpiry");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [expiresAt, onClose]);

    const handleVerify = () => {
        //backend call

        //this is on success
        onVerified();
        onClose();
        localStorage.removeItem("codePopupExpiry");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Enter Verification Code</DialogTitle>
            <DialogContent>
                <TextField autoFocus fullWidth margin="dense" label="Code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleVerify} variant="contained">Verify</Button>
            </DialogActions>
        </Dialog>
    );
}
