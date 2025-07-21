import { connectDB } from './db';
import { Template, Category } from '@shared/schema';

// Categories to create
const categories = [
  {
    name: 'Business',
    slug: 'business',
    description: 'Professional business templates',
    icon: 'briefcase',
    color: 'blue'
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    description: 'Social media post templates',
    icon: 'share',
    color: 'pink'
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    description: 'Marketing and promotional templates',
    icon: 'megaphone',
    color: 'green'
  },
  {
    name: 'Education',
    slug: 'education',
    description: 'Educational and training templates',
    icon: 'book',
    color: 'purple'
  },
  {
    name: 'Events',
    slug: 'events',
    description: 'Event and celebration templates',
    icon: 'calendar',
    color: 'orange'
  },
  {
    name: 'Health',
    slug: 'health',
    description: 'Health and wellness templates',
    icon: 'heart',
    color: 'red'
  },
  {
    name: 'Technology',
    slug: 'technology',
    description: 'Tech and digital templates',
    icon: 'cpu',
    color: 'indigo'
  },
  {
    name: 'Food',
    slug: 'food',
    description: 'Food and restaurant templates',
    icon: 'utensils',
    color: 'yellow'
  }
];

// Template data - 50+ templates
const templateData = [
  // Business Templates
  { title: 'Business Proposal', category: 'business', description: 'Professional business proposal template', isPremium: false },
  { title: 'Company Profile', category: 'business', description: 'Corporate company profile design', isPremium: true },
  { title: 'Annual Report', category: 'business', description: 'Annual business report template', isPremium: true },
  { title: 'Invoice Template', category: 'business', description: 'Professional invoice design', isPremium: false },
  { title: 'Business Card', category: 'business', description: 'Modern business card template', isPremium: false },
  { title: 'Letterhead', category: 'business', description: 'Corporate letterhead design', isPremium: false },
  { title: 'Presentation Deck', category: 'business', description: 'Business presentation template', isPremium: true },
  { title: 'Meeting Agenda', category: 'business', description: 'Professional meeting agenda', isPremium: false },

  // Social Media Templates
  { title: 'Instagram Post', category: 'social-media', description: 'Square Instagram post template', isPremium: false },
  { title: 'Instagram Story', category: 'social-media', description: 'Vertical Instagram story design', isPremium: false },
  { title: 'Facebook Cover', category: 'social-media', description: 'Facebook cover photo template', isPremium: false },
  { title: 'Twitter Header', category: 'social-media', description: 'Twitter profile header design', isPremium: false },
  { title: 'LinkedIn Banner', category: 'social-media', description: 'Professional LinkedIn banner', isPremium: true },
  { title: 'YouTube Thumbnail', category: 'social-media', description: 'Eye-catching YouTube thumbnail', isPremium: false },
  { title: 'TikTok Video Cover', category: 'social-media', description: 'TikTok video cover template', isPremium: false },
  { title: 'Pinterest Pin', category: 'social-media', description: 'Vertical Pinterest pin design', isPremium: false },

  // Marketing Templates
  { title: 'Flyer Design', category: 'marketing', description: 'Promotional flyer template', isPremium: false },
  { title: 'Brochure', category: 'marketing', description: 'Tri-fold brochure design', isPremium: true },
  { title: 'Banner Ad', category: 'marketing', description: 'Web banner advertisement', isPremium: false },
  { title: 'Email Newsletter', category: 'marketing', description: 'Email marketing template', isPremium: true },
  { title: 'Product Catalog', category: 'marketing', description: 'Product showcase catalog', isPremium: true },
  { title: 'Sale Poster', category: 'marketing', description: 'Sale promotion poster', isPremium: false },
  { title: 'Brand Guidelines', category: 'marketing', description: 'Brand identity guidelines', isPremium: true },
  { title: 'Marketing Report', category: 'marketing', description: 'Marketing analytics report', isPremium: true },

  // Education Templates
  { title: 'Course Certificate', category: 'education', description: 'Educational certificate template', isPremium: false },
  { title: 'Lesson Plan', category: 'education', description: 'Teacher lesson plan template', isPremium: false },
  { title: 'Student ID Card', category: 'education', description: 'School student ID card', isPremium: false },
  { title: 'Graduation Invitation', category: 'education', description: 'Graduation ceremony invitation', isPremium: true },
  { title: 'School Newsletter', category: 'education', description: 'Educational newsletter template', isPremium: false },
  { title: 'Research Poster', category: 'education', description: 'Academic research poster', isPremium: true },
  { title: 'Quiz Template', category: 'education', description: 'Interactive quiz design', isPremium: false },
  { title: 'Diploma Design', category: 'education', description: 'Official diploma template', isPremium: true },

  // Event Templates
  { title: 'Wedding Invitation', category: 'events', description: 'Elegant wedding invitation', isPremium: true },
  { title: 'Birthday Card', category: 'events', description: 'Birthday celebration card', isPremium: false },
  { title: 'Event Poster', category: 'events', description: 'Event promotion poster', isPremium: false },
  { title: 'Party Flyer', category: 'events', description: 'Party invitation flyer', isPremium: false },
  { title: 'Conference Badge', category: 'events', description: 'Professional conference badge', isPremium: false },
  { title: 'Save the Date', category: 'events', description: 'Wedding save the date card', isPremium: true },
  { title: 'Event Program', category: 'events', description: 'Event schedule program', isPremium: false },
  { title: 'Thank You Card', category: 'events', description: 'Appreciation thank you card', isPremium: false },

  // Health Templates
  { title: 'Medical Report', category: 'health', description: 'Medical report template', isPremium: true },
  { title: 'Fitness Poster', category: 'health', description: 'Fitness motivation poster', isPremium: false },
  { title: 'Health Infographic', category: 'health', description: 'Health information graphic', isPremium: true },
  { title: 'Prescription Pad', category: 'health', description: 'Medical prescription template', isPremium: true },
  { title: 'Wellness Newsletter', category: 'health', description: 'Health and wellness newsletter', isPremium: false },
  { title: 'Exercise Chart', category: 'health', description: 'Workout exercise chart', isPremium: false },

  // Technology Templates
  { title: 'App Mockup', category: 'technology', description: 'Mobile app mockup template', isPremium: true },
  { title: 'Tech Presentation', category: 'technology', description: 'Technology presentation deck', isPremium: true },
  { title: 'Software Manual', category: 'technology', description: 'Software user manual', isPremium: true },
  { title: 'Tech Blog Post', category: 'technology', description: 'Technology blog post template', isPremium: false },
  { title: 'API Documentation', category: 'technology', description: 'API documentation template', isPremium: true },
  { title: 'Code Review', category: 'technology', description: 'Code review checklist', isPremium: false },

  // Food Templates
  { title: 'Restaurant Menu', category: 'food', description: 'Restaurant menu design', isPremium: true },
  { title: 'Recipe Card', category: 'food', description: 'Recipe instruction card', isPremium: false },
  { title: 'Food Blog Post', category: 'food', description: 'Food blog post template', isPremium: false },
  { title: 'Nutrition Label', category: 'food', description: 'Food nutrition facts label', isPremium: false },
  { title: 'Catering Flyer', category: 'food', description: 'Catering service flyer', isPremium: false },
  { title: 'Food Truck Menu', category: 'food', description: 'Food truck menu board', isPremium: true },
];

export async function seedTemplates() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Template.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing templates and categories');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Create category map for easy lookup
    const categoryMap = new Map();
    createdCategories.forEach(cat => {
      categoryMap.set(cat.slug, cat._id.toString());
    });

    // Create templates with proper category references
    const templatesWithCategories = templateData.map(template => ({
      title: template.title,
      description: template.description,
      categoryId: categoryMap.get(template.category),
      designData: {
        version: '1.0',
        elements: [],
        background: '#ffffff',
        dimensions: { width: 800, height: 600 }
      },
      isPremium: template.isPremium,
      isPublic: true,
      thumbnailUrl: `/api/placeholder/300/200?text=${encodeURIComponent(template.title)}`,
      previewUrl: `/api/placeholder/800/600?text=${encodeURIComponent(template.title)}`
    }));

    const createdTemplates = await Template.insertMany(templatesWithCategories);
    console.log(`Created ${createdTemplates.length} templates`);

    console.log('Database seeding completed successfully!');
    return {
      categories: createdCategories.length,
      templates: createdTemplates.length
    };

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeder if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedTemplates()
    .then((result) => {
      console.log(`Seeding completed: ${result.categories} categories, ${result.templates} templates`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
