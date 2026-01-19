import { createContext, useContext, useRef, useState } from "react"
import { jwtDecode, type JwtPayload } from "jwt-decode"
import { hasFlag } from "../Logic/EnumHelper";
import { RoleType } from "../Domain/RoleType";

interface CustomJwtPayload extends JwtPayload {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

interface User {
    id: string,
    roles: number,
    isAdmin: boolean,
    isAgency: boolean
}

interface AuthContextType {
    token: string | undefined
    user: User | undefined
    isAuthenticated: boolean
    login: (jwt: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>
    ({ token: undefined, user: undefined, isAuthenticated: false, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<User | undefined>(undefined)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const logoutTimerRef = useRef<number | undefined>(undefined);

    const login = (jwt: string) => {
        const decoded = jwtDecode<CustomJwtPayload>(jwt)
        setToken(jwt)
        const roles = parseInt(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
        setUser({
            id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            roles: roles,
            isAdmin: hasFlag(roles, RoleType.Admin),
            isAgency: hasFlag(roles, RoleType.Agency)
        })
        setIsAuthenticated(true)
        if (logoutTimerRef.current) { 
            clearTimeout(logoutTimerRef.current); 
        } 
        logoutTimerRef.current = setTimeout(() => { 
            logout(); 
        }, 15 * 60 * 1000);
    }

    const logout = () => {
        setToken(undefined)
        setUser(undefined)
        setIsAuthenticated(false)
        if (logoutTimerRef.current) { 
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = undefined;
        } 
    } 

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
