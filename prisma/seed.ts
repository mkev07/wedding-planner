import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateRsvpToken() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 10; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

const checklistItems: { title: string; category: string; sortOrder: number }[] =
  [
    // 12+ Months Before
    { title: "Set a budget", category: "12+ Months Before", sortOrder: 1 },
    {
      title: "Choose a wedding date",
      category: "12+ Months Before",
      sortOrder: 2,
    },
    {
      title: "Research and book venue",
      category: "12+ Months Before",
      sortOrder: 3,
    },
    {
      title: "Start guest list draft",
      category: "12+ Months Before",
      sortOrder: 4,
    },
    {
      title: "Hire a wedding planner (if desired)",
      category: "12+ Months Before",
      sortOrder: 5,
    },
    {
      title: "Research photographers",
      category: "12+ Months Before",
      sortOrder: 6,
    },
    {
      title: "Book officiant",
      category: "12+ Months Before",
      sortOrder: 7,
    },

    // 9-12 Months Before
    {
      title: "Book photographer and videographer",
      category: "9-12 Months Before",
      sortOrder: 1,
    },
    { title: "Book caterer", category: "9-12 Months Before", sortOrder: 2 },
    { title: "Book DJ or band", category: "9-12 Months Before", sortOrder: 3 },
    { title: "Book florist", category: "9-12 Months Before", sortOrder: 4 },
    {
      title: "Shop for wedding attire",
      category: "9-12 Months Before",
      sortOrder: 5,
    },
    {
      title: "Choose wedding party",
      category: "9-12 Months Before",
      sortOrder: 6,
    },

    // 6-9 Months Before
    {
      title: "Send save-the-dates",
      category: "6-9 Months Before",
      sortOrder: 1,
    },
    {
      title: "Book honeymoon travel",
      category: "6-9 Months Before",
      sortOrder: 2,
    },
    {
      title: "Register for gifts",
      category: "6-9 Months Before",
      sortOrder: 3,
    },
    {
      title: "Plan rehearsal dinner",
      category: "6-9 Months Before",
      sortOrder: 4,
    },
    {
      title: "Book transportation",
      category: "6-9 Months Before",
      sortOrder: 5,
    },
    {
      title: "Order wedding cake",
      category: "6-9 Months Before",
      sortOrder: 6,
    },

    // 3-6 Months Before
    {
      title: "Send invitations",
      category: "3-6 Months Before",
      sortOrder: 1,
    },
    {
      title: "Finalize menu with caterer",
      category: "3-6 Months Before",
      sortOrder: 2,
    },
    {
      title: "Book hair and makeup",
      category: "3-6 Months Before",
      sortOrder: 3,
    },
    {
      title: "Plan ceremony details",
      category: "3-6 Months Before",
      sortOrder: 4,
    },
    {
      title: "Buy wedding rings",
      category: "3-6 Months Before",
      sortOrder: 5,
    },
    {
      title: "Arrange accommodations for guests",
      category: "3-6 Months Before",
      sortOrder: 6,
    },

    // 1-3 Months Before
    {
      title: "Final dress fitting",
      category: "1-3 Months Before",
      sortOrder: 1,
    },
    {
      title: "Confirm all vendors",
      category: "1-3 Months Before",
      sortOrder: 2,
    },
    {
      title: "Create seating chart",
      category: "1-3 Months Before",
      sortOrder: 3,
    },
    {
      title: "Get marriage license",
      category: "1-3 Months Before",
      sortOrder: 4,
    },
    {
      title: "Write vows",
      category: "1-3 Months Before",
      sortOrder: 5,
    },
    {
      title: "Plan bachelor/bachelorette parties",
      category: "1-3 Months Before",
      sortOrder: 6,
    },

    // Week Of
    {
      title: "Confirm final headcount with venue",
      category: "Week Of",
      sortOrder: 1,
    },
    {
      title: "Rehearsal and rehearsal dinner",
      category: "Week Of",
      sortOrder: 2,
    },
    {
      title: "Prepare tips and payments for vendors",
      category: "Week Of",
      sortOrder: 3,
    },
    {
      title: "Pack for honeymoon",
      category: "Week Of",
      sortOrder: 4,
    },
    {
      title: "Delegate day-of responsibilities",
      category: "Week Of",
      sortOrder: 5,
    },
  ];

async function main() {
  // Clear existing data
  await prisma.checklistItem.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.budgetItem.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.table.deleteMany();
  await prisma.wedding.deleteMany();

  // Create default wedding
  const wedding = await prisma.wedding.create({
    data: {
      name: "Our Wedding",
      date: new Date("2027-06-15"),
      budget: 30000,
    },
  });

  // Create checklist items
  for (const item of checklistItems) {
    await prisma.checklistItem.create({
      data: {
        ...item,
        weddingId: wedding.id,
      },
    });
  }

  // Create guests
  const guests = await Promise.all([
    prisma.guest.create({
      data: { name: "Sarah Johnson", email: "sarah@example.com", rsvpStatus: "accepted", rsvpToken: generateRsvpToken(), group: "Family", dietaryNotes: "Vegetarian", weddingId: wedding.id },
    }),
    prisma.guest.create({
      data: { name: "Mike Chen", email: "mike@example.com", rsvpStatus: "accepted", rsvpToken: generateRsvpToken(), group: "Friends", weddingId: wedding.id },
    }),
    prisma.guest.create({
      data: { name: "Emily Davis", email: "emily@example.com", rsvpStatus: "pending", rsvpToken: generateRsvpToken(), group: "Work", weddingId: wedding.id },
    }),
    prisma.guest.create({
      data: { name: "James Wilson", email: "james@example.com", rsvpStatus: "accepted", rsvpToken: generateRsvpToken(), group: "Partner's Family", dietaryNotes: "Gluten-free", weddingId: wedding.id },
    }),
    prisma.guest.create({
      data: { name: "Olivia Brown", email: "olivia@example.com", rsvpStatus: "declined", rsvpToken: generateRsvpToken(), group: "Partner's Friends", weddingId: wedding.id },
    }),
    prisma.guest.create({
      data: { name: "David Martinez", email: "david@example.com", rsvpStatus: "pending", rsvpToken: generateRsvpToken(), group: "Friends", dietaryNotes: "Nut allergy", weddingId: wedding.id },
    }),
    prisma.guest.create({
      data: { name: "Lisa Thompson", email: "lisa@example.com", rsvpStatus: "accepted", rsvpToken: generateRsvpToken(), group: "Family", weddingId: wedding.id },
    }),
    prisma.guest.create({
      data: { name: "Robert Kim", email: "robert@example.com", rsvpStatus: "pending", rsvpToken: generateRsvpToken(), group: "Work", weddingId: wedding.id },
    }),
  ]);

  // Create budget items
  await prisma.budgetItem.createMany({
    data: [
      { category: "Venue", description: "Grand Ballroom rental", estimatedAmount: 8000, actualAmount: 7500, paid: true, weddingId: wedding.id },
      { category: "Catering", description: "Dinner and cocktail hour", estimatedAmount: 6000, actualAmount: 5800, paid: false, weddingId: wedding.id },
      { category: "Photography", description: "Full-day photography package", estimatedAmount: 3500, actualAmount: 3500, paid: true, weddingId: wedding.id },
      { category: "Flowers & Decor", description: "Centerpieces and bouquets", estimatedAmount: 2500, actualAmount: 0, paid: false, weddingId: wedding.id },
      { category: "Music & Entertainment", description: "DJ and sound system", estimatedAmount: 1500, actualAmount: 1500, paid: true, weddingId: wedding.id },
      { category: "Attire", description: "Wedding dress and alterations", estimatedAmount: 2000, actualAmount: 1800, paid: true, weddingId: wedding.id },
      { category: "Stationery", description: "Invitations and programs", estimatedAmount: 500, actualAmount: 450, paid: true, weddingId: wedding.id },
      { category: "Transportation", description: "Limo service", estimatedAmount: 800, actualAmount: 0, paid: false, weddingId: wedding.id },
      { category: "Videography", description: "Highlight reel and full video", estimatedAmount: 2500, actualAmount: 2500, paid: false, weddingId: wedding.id },
      { category: "Beauty", description: "Hair and makeup trial + day-of", estimatedAmount: 600, actualAmount: 600, paid: true, weddingId: wedding.id },
    ],
  });

  // Create vendors
  await prisma.vendor.createMany({
    data: [
      { name: "The Grand Estate", category: "Venue", contactName: "Amanda Rivers", contactEmail: "amanda@grandestate.com", contactPhone: "(555) 123-4567", cost: 7500, bookingStatus: "paid", notes: "Includes tables, chairs, and basic linens", weddingId: wedding.id },
      { name: "Bella Cucina Catering", category: "Caterer", contactName: "Marco Rossi", contactEmail: "marco@bellacucina.com", contactPhone: "(555) 234-5678", cost: 5800, bookingStatus: "booked", weddingId: wedding.id },
      { name: "Captured Moments Photography", category: "Photographer", contactName: "Jen Park", contactEmail: "jen@capturedmoments.com", contactPhone: "(555) 345-6789", cost: 3500, bookingStatus: "paid", notes: "8 hours coverage, engagement shoot included", weddingId: wedding.id },
      { name: "Bloom & Petal", category: "Florist", contactName: "Rose Turner", contactEmail: "rose@bloomandpetal.com", contactPhone: "(555) 456-7890", cost: 2500, bookingStatus: "contacted", weddingId: wedding.id },
      { name: "DJ Smooth Beats", category: "DJ / Band", contactName: "Carlos Vega", contactEmail: "carlos@smoothbeats.com", cost: 1500, bookingStatus: "researching", weddingId: wedding.id },
    ],
  });

  // Create timeline events
  await prisma.timelineEvent.createMany({
    data: [
      { title: "Book wedding venue", date: new Date("2025-12-01"), completed: true, category: "Venue", weddingId: wedding.id },
      { title: "Engagement photos", date: new Date("2026-01-15"), completed: true, category: "Photography", weddingId: wedding.id },
      { title: "Send save-the-dates", date: new Date("2026-02-01"), completed: true, category: "Stationery", weddingId: wedding.id },
      { title: "Cake tasting appointment", date: new Date("2026-04-10"), completed: false, category: "Catering", weddingId: wedding.id },
      { title: "Final dress fitting", date: new Date("2026-05-20"), completed: false, category: "Attire", weddingId: wedding.id },
      { title: "Rehearsal dinner", date: new Date("2027-06-14"), completed: false, category: "Venue", weddingId: wedding.id },
    ],
  });

  // Create tables and assign some guests
  const table1 = await prisma.table.create({
    data: { name: "Table 1 - Family", capacity: 8, weddingId: wedding.id },
  });
  const table2 = await prisma.table.create({
    data: { name: "Table 2 - Friends", capacity: 8, weddingId: wedding.id },
  });
  await prisma.table.create({
    data: { name: "Table 3 - Colleagues", capacity: 6, weddingId: wedding.id },
  });
  await prisma.table.create({
    data: { name: "Head Table", capacity: 4, weddingId: wedding.id },
  });

  // Assign some guests to tables
  await prisma.guest.update({ where: { id: guests[0].id }, data: { tableId: table1.id } });
  await prisma.guest.update({ where: { id: guests[3].id }, data: { tableId: table1.id } });
  await prisma.guest.update({ where: { id: guests[6].id }, data: { tableId: table1.id } });
  await prisma.guest.update({ where: { id: guests[1].id }, data: { tableId: table2.id } });
  await prisma.guest.update({ where: { id: guests[5].id }, data: { tableId: table2.id } });

  console.log(`Seeded wedding "${wedding.name}" with ${checklistItems.length} checklist items, 8 guests, 10 budget items, 5 vendors, 6 timeline events, 4 tables`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
