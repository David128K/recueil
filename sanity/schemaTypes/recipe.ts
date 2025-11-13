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
      name: 'video',
      title: 'Video (optional)',
      description: 'Video hochladen. Wenn ein Video hinzugefügt wird, wird es anstelle des Hauptbildes oben auf der Rezeptseite angezeigt.',
      type: 'mux.video',
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
      name: 'content',
      title: 'Inhalt',
      description: 'Text, Zutaten und Zubereitungsschritte in beliebiger Reihenfolge',
      type: 'array',
      of: [
        { type: 'textBlock' },
        { type: 'ingredientsBlock' },
        { type: 'stepsBlock' },
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
