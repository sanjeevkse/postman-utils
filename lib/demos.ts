export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Request',
    items: [
      {
        name: 'Raw to form-data',
        slug: 'request-raw-to-form-data',
        description: 'Convert raw request to form-data',
      },
    ],
  },
];
