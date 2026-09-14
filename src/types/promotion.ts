export interface Promotion {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  promoCode?: string;
  discountPercentage?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  ctaText: string;
  ctaLink: string;
  themeColor: "cyan" | "purple" | "emerald" | "orange" | "rose";
  createdAt?: string;
  updatedAt?: string;
}
