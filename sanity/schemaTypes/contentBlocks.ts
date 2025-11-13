import { defineType } from 'sanity';
import { IngredientInput } from '../components/IngredientInput';

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel (optional)',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
    },
    prepare({ title, text }) {
      return {
        title: title || 'Text Block',
        subtitle: text ? text.substring(0, 60) + '...' : '',
      };
    },
  },
});

export const ingredientsBlock = defineType({
  name: 'ingredientsBlock',
  title: 'Zutaten Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel (optional, Standard: "Zutaten")',
      type: 'string',
      placeholder: 'z.B. Zutaten Sauce, Zutaten Braten',
    },
    {
      name: 'ingredients',
      title: 'Zutaten',
      description: 'Menge, Einheit (optional) und Name eingeben',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'amount',
              title: 'Menge',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'unit',
              title: 'Einheit',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          components: {
            input: IngredientInput,
          },
          preview: {
            select: {
              amount: 'amount',
              unit: 'unit',
              name: 'name',
            },
            prepare({ amount, unit, name }) {
              const parts = [amount, unit, name].filter(Boolean);
              return {
                title: parts.join(' '),
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      ingredients: 'ingredients',
    },
    prepare({ title, ingredients }) {
      const count = ingredients?.length || 0;
      return {
        title: title || 'Zutaten',
        subtitle: `${count} Zutat${count !== 1 ? 'en' : ''}`,
      };
    },
  },
});

export const stepsBlock = defineType({
  name: 'stepsBlock',
  title: 'Zubereitung Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel (optional, Standard: "Zubereitung")',
      type: 'string',
      placeholder: 'z.B. Zubereitung Sauce, Zubereitung Braten',
    },
    {
      name: 'steps',
      title: 'Zubereitungsschritte',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'step', 
              type: 'text', 
              title: 'Schritt', 
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Bild (optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              step: 'step',
              media: 'image',
            },
            prepare({ step, media }) {
              return {
                title: step ? step.substring(0, 60) + '...' : 'Schritt',
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      steps: 'steps',
    },
    prepare({ title, steps }) {
      const count = steps?.length || 0;
      return {
        title: title || 'Zubereitung',
        subtitle: `${count} Schritt${count !== 1 ? 'e' : ''}`,
      };
    },
  },
});
