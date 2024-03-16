export type WikiContent = {
  contentType: string;
  data: string;
};

export type WikiData = {
  title: string;
  content: Array<WikiContent>;
  owner: string;
};
