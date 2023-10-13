export type ISideMenu = {
  title: string;
  icon: string;
  router?: string;
  children: ISideMenu[];
};
