export type WikiContent = {
  id: string;
  type: string;
  data?: string;
  language?: string;
  isEditable?: boolean;
};

export type WikiData = {
  id: string;
  title: string;
  content: Array<WikiContent>;
  owner: string;
  isDraft?: boolean;
};
