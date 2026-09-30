import type { AuthUser } from "./AuthUser"

export interface LoginResponse {
    token: string
    expiresAt: string
    user: AuthUser
}