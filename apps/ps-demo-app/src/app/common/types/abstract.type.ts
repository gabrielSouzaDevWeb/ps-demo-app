export type AbstractType = viewFields & dbFields;

export type viewFields = {
  checked: boolean;
};

export type dbFields = {
  id: string;
};
