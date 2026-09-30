export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  createdByUserId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}