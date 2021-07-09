export interface EntryItem {
  id: string;
  name: string;
  email: string;
  age: number;
  job: string;
  reason?: string;
  status: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface SearchEntry {
  word: string;
}
