import { apiClient } from "@/services/ApiClient";

import type { Company } from "../Types/Company";
import type { SaveCompanyRequest } from "../Types/SaveCompanyRequest";

import type { PagedResult } from "@/types/PagedResult";

class CompanyService {
  public async getCompanies(
    params?: URLSearchParams
  ): Promise<PagedResult<Company>> {
    return apiClient.get<PagedResult<Company>>(
      `/Companies${
        params
          ? `?${params.toString()}`
          : ""
      }`
    );
  }

  public async getCompany(
    id: string
  ): Promise<Company> {
    return apiClient.get<Company>(
      `/Companies/${id}`
    );
  }

  public async createCompany(
    request: SaveCompanyRequest
  ): Promise<Company> {
    return apiClient.post<Company>(
      "/Companies",
      request
    );
  }

  public async updateCompany(
    id: string,
    request: SaveCompanyRequest
  ): Promise<void> {
    return apiClient.put(
      `/Companies/${id}`,
      request
    );
  }

  public async deleteCompany(
    id: string
  ): Promise<void> {
    return apiClient.delete(
      `/Companies/${id}`
    );
  }
}

export const companyService =
  new CompanyService();