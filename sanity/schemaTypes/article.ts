import { defineField, defineType } from 'sanity'

const CAPABILITY_OPTIONS = [
  { title: 'Custom Software Development', value: 'software-engineering' },
  { title: 'Mobile Application Development', value: 'mobile-application-development' },
  { title: 'Web Application Development', value: 'web-application-development' },
  { title: 'Enterprise Systems Development', value: 'enterprise-systems-development' },
  { title: 'Cloud Computing Solutions', value: 'cloud-solutions' },
  { title: 'Artificial Intelligence Solutions', value: 'artificial-intelligence-solutions' },
  { title: 'Data Analytics & Business Intelligence', value: 'data-platforms' },
  { title: 'Cybersecurity Services', value: 'cybersecurity' },
  { title: 'ICT Infrastructure Design', value: 'digital-infrastructure' },
  { title: 'IT Consulting & Systems Integration', value: 'it-consulting-systems-integration' },
  { title: 'Digital Transformation Advisory', value: 'digital-transformation' },
  { title: 'GIS & Spatial Technology', value: 'gis-spatial-technology' },
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
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Turn on when this article is ready to go live on the site.',
      initialValue: false,
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
    defineField({
      name: 'relatedCapabilities',
      title: 'Related Capabilities',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: CAPABILITY_OPTIONS },
      initialValue: [],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
})
