import { defineField, defineType } from 'sanity';

export const recipe = defineType({
  name: 'recipe',
  title: 'Rezept',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hauptbild',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prepTime',
      title: 'Zubereitungszeit (Minuten)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'servings',
      title: 'Portionen',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'difficulty',
      title: 'Schwierigkeitsgrad',
      type: 'string',
      options: {
        list: [
          { title: 'Einfach', value: 'einfach' },
          { title: 'Fortgeschritten', value: 'fortgeschritten' },
          { title: 'Professionell', value: 'professionell' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ingredients',
      title: 'Zutaten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'amount', 
              type: 'number', 
              title: 'Menge',
              validation: (Rule) => Rule.required().min(0),
            },
            { 
              name: 'unit', 
              type: 'string', 
              title: 'Einheit',
              options: {
                list: [
                  { title: 'g (Gramm)', value: 'g' },
                  { title: 'kg (Kilogramm)', value: 'kg' },
                  { title: 'ml (Milliliter)', value: 'ml' },
                  { title: 'l (Liter)', value: 'l' },
                  { title: 'TL (Teelöffel)', value: 'TL' },
                  { title: 'EL (Esslöffel)', value: 'EL' },
                  { title: 'Stück', value: 'Stück' },
                  { title: 'Prise', value: 'Prise' },
                  { title: 'Tasse', value: 'Tasse' },
                  { title: 'Bund', value: 'Bund' },
                  { title: 'Packung', value: 'Packung' },
                  { title: 'nach Geschmack', value: 'nach Geschmack' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'name', 
              type: 'string', 
              title: 'Name der Zutat',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              amount: 'amount',
              unit: 'unit',
              name: 'name',
            },
            prepare({ amount, unit, name }) {
              return {
                title: `${amount} ${unit} ${name}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'steps',
      title: 'Zubereitungsschritte',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', type: 'text', title: 'Schritt', rows: 3 },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category.name',
    },
    prepare(selection) {
      const { title, media, category } = selection;
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});
