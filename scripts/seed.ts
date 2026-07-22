import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Starting database seed...");

  // Hi, I'm Analina. Before inserting new data, I clear the tables to avoid duplicates.
  // I delete images first because they depend on products, then products, then categories.
  await prisma.image.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // Here I create the "Ceramics" category and immediately attach products to it.
  // I prefer this nested structure because it keeps everything organized and easy to read.
  await prisma.category.create({
    data: {
      name: "Ceramics",
      products: {
        create: [
          {
            name: "Handcrafted Ceramic Mug",
            description: "A beautiful handmade mug perfect for coffee lovers.",
            price: 25.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e" }
              ]
            }
          },
          {
            name: "Rustic Clay Vase",
            description: "A tall clay vase with natural earthy tones.",
            price: 45.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad1" }
              ]
            }
          }
        ]
      }
    }
  });

  // In this section, I repeat the same pattern for the remaining categories.
  // I like this approach because each category stays self‑contained and readable.
  await prisma.category.create({
    data: {
      name: "Woodwork",
      products: {
        create: [
          {
            name: "Hand-Carved Wooden Spoon",
            description: "Made from sustainable oak, perfect for cooking.",
            price: 15.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1601049676869-6e1f97c7b6b7" }
              ]
            }
          },
          {
            name: "Artisan Cutting Board",
            description: "Walnut cutting board with a smooth finish.",
            price: 60.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1556912999-2f9a1a0b39f2" }
              ]
            }
          }
        ]
      }
    }
  });

  await prisma.category.create({
    data: {
      name: "Textiles",
      products: {
        create: [
          {
            name: "Handwoven Cotton Scarf",
            description: "Soft, breathable, and perfect for any season.",
            price: 30.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" }
              ]
            }
          },
          {
            name: "Embroidered Linen Tote",
            description: "Eco-friendly tote bag with floral embroidery.",
            price: 28.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1585386959984-a4155224a1a0" }
              ]
            }
          }
        ]
      }
    }
  });

  await prisma.category.create({
    data: {
      name: "Jewelry",
      products: {
        create: [
          {
            name: "Silver Leaf Pendant",
            description: "Handcrafted silver pendant inspired by nature.",
            price: 50.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3" }
              ]
            }
          },
          {
            name: "Gemstone Bracelet",
            description: "Made with natural stones and elastic cord.",
            price: 35.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1520962918287-7448c1ee0b9b" }
              ]
            }
          }
        ]
      }
    }
  });

  await prisma.category.create({
    data: {
      name: "Home Decor",
      products: {
        create: [
          {
            name: "Handmade Soy Candle",
            description: "Lavender-scented candle in a reusable glass jar.",
            price: 22.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5" }
              ]
            }
          },
          {
            name: "Macrame Wall Hanging",
            description: "Boho-style wall decor made with natural cotton rope.",
            price: 55.00,
            images: {
              create: [
                { url: "https://images.unsplash.com/photo-1582582494700-4c1a3f6b4f8e" }
              ]
            }
          }
        ]
      }
    }
  });

  console.log("All products seeded successfully!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    // Here I disconnect Prisma to ensure the script exits cleanly.
    await prisma.$disconnect();
  });