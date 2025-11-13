import { type SchemaTypeDefinition } from 'sanity';

import { category } from './category';
import { recipe } from './recipe';
import { textBlock, ingredientsBlock, stepsBlock } from './contentBlocks';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, recipe, textBlock, ingredientsBlock, stepsBlock],
}
