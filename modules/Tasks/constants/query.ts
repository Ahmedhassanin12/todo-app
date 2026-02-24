export const PAGE_SIZE = 4 as const;

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
};
