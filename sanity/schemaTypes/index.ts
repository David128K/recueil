import { type SchemaTypeDefinition } from 'sanity';

import { category } from './category';
import { recipe } from './recipe';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, recipe],
}
