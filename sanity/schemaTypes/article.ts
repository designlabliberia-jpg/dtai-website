import { defineField, defineType } from 'sanity'

const SERVICE_OPTIONS = [
  { title: 'Digital Technology Solutions', value: 'digital-technology' },
  { title: 'Eco Technology Sustainability', value: 'environmental-technology' },
  { title: 'Environmental Advisory', value: 'environmental-consulting' },
  { title: 'Smart City & Green Infrastructure', value: 'smart-city-infrastructure' },
  { title: 'Climate & Disaster Management', value: 'climate-disaster-management' },
]

export const article = defineType({
  name: 'article',
  title: 'Insights Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from the title. This becomes the article web address — avoid changing it after publishing.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. "Engineering Insight", "Company News"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short teaser shown on the Insights listing page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'DTAI Engineering Team',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceSlug',
      title: 'Related Service',
      type: 'string',
      description: 'Link this article to a service. Related news on the site will show articles from the same service.',
      options: { list: SERVICE_OPTIONS },
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Turn on when this article is ready to go live on the site.',
      initialValue: false,
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      readOnly: true,
      initialValue: 0,
      description: 'Automatically incremented by visitors clicking the like button. Not manually editable.',
    }),
    defineField({
      name: 'sections',
      title: 'Article Sections',
      type: 'array',
      description: 'Add one or more sections. Each can have an optional heading and body text.',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({ name: 'heading', title: 'Heading (optional)', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 6, validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'body' },
            prepare({ title, subtitle }) {
              return { title: title || 'Untitled section', subtitle: subtitle ? subtitle.slice(0, 60) + '...' : '' }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
})
