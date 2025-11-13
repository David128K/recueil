import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { muxInput } from 'sanity-plugin-mux-input';

import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { apiVersion, dataset, projectId } from './sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Recueil',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    muxInput(),
  ],

  schema,

  basePath: '/studio',
});
