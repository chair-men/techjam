import { useState } from 'react';

export interface UpdateItem<T> {
  (index: number, updates: Partial<T>): void;
}

export interface RemoveItem {
  (index: number): void;
}

export interface AddItem<T> {
  (item: T): void;
}

const useFormState = <T extends object>(initialState: T[]) => {
  const [state, setState] = useState<T[]>(initialState);

  const addItem: AddItem<T> = (item) => {
    setState((prevState) => [...prevState, item]);
  };

  const updateItem: UpdateItem<T> = (index, updates) => {
    setState((prevState) =>
      prevState.map((item, i) => (i === index ? { ...item, ...updates } : item))
    );
  };

  const removeItem: RemoveItem = (index) => {
    setState((prevState) => prevState.filter((_, i) => i !== index));
  };

  return [state, addItem, updateItem, removeItem] as const;
};

export { useFormState };
