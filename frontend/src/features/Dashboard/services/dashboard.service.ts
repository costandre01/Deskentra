import { apiClient } from '@/services/ApiClient'
import type { DashboardResponse } from '../types/DashboardResponse'

export function getDashboard() {
  return apiClient.get<DashboardResponse>('/dashboard')
}