export type WikiContent = {
  type: string;
  data: string;
};

export type WikiData = {
  id: string;
  title: string;
  content: Array<WikiContent>;
  owner: string;
};
