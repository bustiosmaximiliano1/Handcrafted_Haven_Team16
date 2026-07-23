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

  // Admin account
  await prisma.user.create({
    data: {
      email: "team.16@handcrafted.com",
      password: passwordHash,
      name: "Team 16",
      role: Role.ADMIN,
    },
  });

  // 0. Create Artisans (Users with ARTISAN role)
  const ceramicsArtisan = await prisma.user.create({
    data: {
      email: "maximiliano.bustios@handcrafted.com",
      password: passwordHash,
      name: "Maximiliano Bustios",
      bio: "Hi, I'm Maximiliano. I love building clean, practical products and creating handcrafted pieces that mix simplicity with purpose.",
      profileImageUrl: "https://avatars.githubusercontent.com/u/282115791?v=4",
      role: Role.ARTISAN,
    },
  });

  const woodworkArtisan = await prisma.user.create({
    data: {
      email: "analina.nielsen@handcrafted.com",
      password: passwordHash,
      name: "Analina Nielsen",
      bio: "Hi, I'm Analina. I enjoy thoughtful design and warm details, and I focus on pieces that feel personal, useful, and lasting.",
      profileImageUrl: "https://avatars.githubusercontent.com/u/145632655?v=4",
      role: Role.ARTISAN,
    },
  });

  const textilesArtisan = await prisma.user.create({
    data: {
      email: "emil.roding@handcrafted.com",
      password: passwordHash,
      name: "Emil Roding",
      bio: "Hi, I'm Emil. I like combining creativity with precision, making handmade work that reflects quality, balance, and care.",
      profileImageUrl: "https://avatars.githubusercontent.com/u/179884635?v=4",
      role: Role.ARTISAN,
    },
  });

  const jewelryArtisan = await prisma.user.create({
    data: {
      email: "victor.vega@handcrafted.com",
      password: passwordHash,
      name: "Victor Vega",
      bio: "Hi, I'm Victor. I enjoy shaping ideas into unique handmade pieces and sharing stories through every texture, color, and finish.",
      profileImageUrl: "https://avatars.githubusercontent.com/u/132124006?v=4",
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
            stock: 10,
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
            stock: 10,
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
            stock: 10,
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
            stock: 10,
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
            stock: 10,
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
            stock: 10,
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
            stock: 10,
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
            stock: 10,
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
            stock: 10,
            artisanId: jewelryArtisan.id,
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
            stock: 10,
            artisanId: jewelryArtisan.id,
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

  // 6. Glass Category
  await prisma.category.create({
    data: {
      name: "Glass",
      products: {
        create: [
          {
            name: "Handblown Glass Vase",
            description: "A handblown glass vase with a soft transparent finish for modern interiors.",
            price: 48.00,
            stock: 10,
            artisanId: woodworkArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80" }
              ]
            }
          },
          {
            name: "Fused Glass Coasters",
            description: "Set of colorful fused glass coasters, handmade in small batches.",
            price: 32.00,
            stock: 10,
            artisanId: woodworkArtisan.id,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80" }
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