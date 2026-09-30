import { API_BASE_URL } from "./api";
import { ApiException } from "./ApiException";

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const token = this.getToken();

    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers: {
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
          ...options?.headers,
        },
      }
    );

    if (!response.ok) {
      let message = `HTTP ${response.status}`;

      try {
        const error = await response.json();

        message =
          error.detail ??
          error.message ??
          error.title ??
          message;
      } catch {
        // Ignora caso a resposta não seja JSON
      }

      throw new ApiException(
        message,
        response.status
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();

    if (!text) {
      return undefined as T;
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      return text as T;
    }
  }

  async download(endpoint: string): Promise<Blob> {
    const token = this.getToken();

    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: "GET",
        headers: {
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      }
    );

    if (!response.ok) {
      let message = `HTTP ${response.status}`;

      try {
        const error = await response.json();

        message =
          error.detail ??
          error.message ??
          error.title ??
          message;
      } catch {
        // Ignora caso a resposta não seja JSON
      }

      throw new ApiException(
        message,
        response.status
      );
    }

    return response.blob();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
      headers:
        body instanceof FormData
          ? undefined
          : {
              "Content-Type": "application/json",
            },
    });
  }

  put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body:
        body === undefined
          ? undefined
          : JSON.stringify(body),
      headers:
        body === undefined
          ? undefined
          : {
              "Content-Type": "application/json",
            },
    });
  }

  delete(endpoint: string) {
    return this.request<void>(endpoint, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();