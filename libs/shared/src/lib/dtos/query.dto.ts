import { z } from "zod";

export const schema = z.object({
  value: z.string().optional(),
  page: z.string().optional(),
});

export interface IQueryDto {
    value?: string;
    page?: number;
}
