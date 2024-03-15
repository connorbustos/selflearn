export type WikiContent = {
  isCode: boolean;
  data: string;
};

export type WikiData = {
  name: string;
  content: Array<WikiContent>;
  owner: string;
};
