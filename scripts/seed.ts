import { prisma } from "../src/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Starting database seed...");

  // Hi, I'm Analina. Before inserting new data, I clear the tables to avoid duplicates.
  await prisma.image.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash("password123", 10);

  // 0. Create Artisans (Users with ARTISAN role)
  const ceramicsArtisan = await prisma.user.create({
    data: {
      email: "elena.ceramics@handcrafted.com",
      password: passwordHash,
      name: "Elena Rostova",
      bio: "Crafting minimalist ceramics inspired by nature and earthy textures for over 10 years.",
      role: Role.ARTISAN,
    },
  });

  const woodworkArtisan = await prisma.user.create({
    data: {
      email: "lucas.wood@handcrafted.com",
      password: passwordHash,
      name: "Lucas Vance",
      bio: "Working with sustainable local lumber to create durable, timeless kitchenware.",
      role: Role.ARTISAN,
    },
  });

  const textilesArtisan = await prisma.user.create({
    data: {
      email: "aisha.textiles@handcrafted.com",
      password: passwordHash,
      name: "Aisha Patel",
      bio: "Passionate about traditional weaving techniques combined with modern eco-friendly fabrics.",
      role: Role.ARTISAN,
    },
  });

  const jewelryArtisan = await prisma.user.create({
    data: {
      email: "mateo.jewelry@handcrafted.com",
      password: passwordHash,
      name: "Mateo Silva",
      bio: "Designing delicate pieces influenced by organic forms and precious natural stones.",
      role: Role.ARTISAN,
    },
  });

  const homeDecorArtisan = await prisma.user.create({
    data: {
      email: "sophia.decor@handcrafted.com",
      password: passwordHash,
      name: "Sophia Chen",
      bio: "Creating cozy, handcrafted home accents designed to bring warmth into every corner.",
      role: Role.ARTISAN,
    },
  });

  // 1. Ceramics Category
  await prisma.category.create({
    data: {
      name: "Ceramics",
      products: {
        create: [
          {
            name: "Handcrafted Ceramic Mug",
            description: "A beautiful handmade mug perfect for coffee lovers.",
            price: 25.00,
            artisanId: ceramicsArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          },
          {
            name: "Rustic Clay Vase",
            description: "A tall clay vase with natural earthy tones.",
            price: 45.00,
            artisanId: ceramicsArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          }
        ]
      }
    }
  });

  // 2. Woodwork Category
  await prisma.category.create({
    data: {
      name: "Woodwork",
      products: {
        create: [
          {
            name: "Hand-Carved Wooden Spoon",
            description: "Made from sustainable oak, perfect for cooking.",
            price: 15.00,
            artisanId: woodworkArtisan.id,
            images: {
              create: [
                { url: "https://plus.unsplash.com/premium_photo-1668432374007-37669afd11ee?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          },
          {
            name: "Artisan Cutting Board",
            description: "Walnut cutting board with a smooth finish.",
            price: 60.00,
            artisanId: woodworkArtisan.id,
            images: {
              create: [
                { url: "https://plus.unsplash.com/premium_photo-1714943792698-04676952002e?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          }
        ]
      }
    }
  });

  // 3. Textiles Category
  await prisma.category.create({
    data: {
      name: "Textiles",
      products: {
        create: [
          {
            name: "Handwoven Cotton Scarf",
            description: "Soft, breathable, and perfect for any season.",
            price: 30.00,
            artisanId: textilesArtisan.id,
            images: {
              create: [
                { url: "https://plus.unsplash.com/premium_photo-1695604461350-70d97106483a?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          },
          {
            name: "Embroidered Linen Tote",
            description: "Eco-friendly tote bag with floral embroidery.",
            price: 28.00,
            artisanId: textilesArtisan.id,
            images: {
              create: [
                { url: "https://plus.unsplash.com/premium_photo-1677355760442-696f5842a34f?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          }
        ]
      }
    }
  });

  // 4. Jewelry Category
  await prisma.category.create({
    data: {
      name: "Jewelry",
      products: {
        create: [
          {
            name: "Silver Leaf Pendant",
            description: "Handcrafted silver pendant inspired by nature.",
            price: 50.00,
            artisanId: jewelryArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1547738238-5ddb16bef15f?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          },
          {
            name: "Gemstone Bracelet",
            description: "Made with natural stones and elastic cord.",
            price: 35.00,
            artisanId: jewelryArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1766560359744-7eb65e1183ac?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          }
        ]
      }
    }
  });

  // 5. Home Decor Category
  await prisma.category.create({
    data: {
      name: "Home Decor",
      products: {
        create: [
          {
            name: "Handmade Soy Candle",
            description: "Lavender-scented candle in a reusable glass jar.",
            price: 22.00,
            artisanId: homeDecorArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          },
          {
            name: "Macrame Wall Hanging",
            description: "Boho-style wall decor made with natural cotton rope.",
            price: 55.00,
            artisanId: homeDecorArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          }
        ]
      }
    }
  });

  console.log("All products and artisans seeded successfully!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });