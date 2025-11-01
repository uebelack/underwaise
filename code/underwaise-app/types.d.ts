export interface Field {
  id: string;
  question?: string;
  label?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  helperText?: string;
  default?: string;
  followUp?: {
    trigger: string;
    fields: Field[];
  };
}

export interface Section {
  id: string;
  title: string;
  fields: Field[];
}
