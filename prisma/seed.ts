import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const pass_mesum = await bcrypt.hash('mesum', roundsOfHashing);
  // Create categories
  const actionCategory = await prisma.category.create({
    data: {
      name: 'Action',
    },
  });

  const dramaCategory = await prisma.category.create({
    data: {
      name: 'Drama',
    },
  });

  const comedyCategory = await prisma.category.create({
    data: {
      name: 'Comedy',
    },
  });

  // Create movies with associated categories
  const actionMovie = await prisma.movie.create({
    data: {
      title: 'John Wick',
      category: {
        connect: {
          id: actionCategory.id,
        },
      },
    },
  });

  const dramaMovie = await prisma.movie.create({
    data: {
      title: 'Witcher',
      category: {
        connect: {
          id: dramaCategory.id,
        },
      },
    },
  });

  const comedyMovie = await prisma.movie.create({
    data: {
      title: 'Jumanji',
      category: {
        connect: {
          id: comedyCategory.id,
        },
      },
    },
  });

  const user1 = await prisma.user.upsert({
    where: { username: 'mesum@gmail.com' },
    update: {
      password: pass_mesum,
    },
    create: {
      username: 'mesum@gmail.com',
      password: pass_mesum,
      name: 'Muhammad Mesum',
      address: 'Testing 123',
      image: 'test.png',
      dob: '1999-12-18',
      ratings: {
        create: [
          {
            value: 4,
            movie: {
              connect: {
                id: actionMovie.id,
              },
            },
          },
          {
            value: 5,
            movie: {
              connect: {
                id: dramaMovie.id,
              },
            },
          },
          // Add more ratings as needed
        ],
      },
    },
  });

  // const userCategory = await prisma.userCategory.create({
  //   data: { user_id: user1.id, category_id: actionCategory.id },
  // });

  // // create three dummy articles
  // const post1 = await prisma.article.upsert({
  //   where: { title: 'Prisma Adds Support for MongoDB' },
  //   update: {
  //     authorId: user1.id,
  //   },
  //   create: {
  //     title: 'Prisma Adds Support for MongoDB',
  //     body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
  //     description:
  //       "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
  //     published: false,
  //     authorId: user1.id,
  //   },
  // });

  // const post2 = await prisma.article.upsert({
  //   where: { title: "What's new in Prisma? (Q1/22)" },
  //   update: {
  //     authorId: user2.id,
  //   },
  //   create: {
  //     title: "What's new in Prisma? (Q1/22)",
  //     body: 'Our engineers have been working hard, issuing new releases with many improvements...',
  //     description:
  //       'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
  //     published: true,
  //     authorId: user2.id,
  //   },
  // });

  // const post3 = await prisma.article.upsert({
  //   where: { title: 'Prisma Client Just Became a Lot More Flexible' },
  //   update: {},
  //   create: {
  //     title: 'Prisma Client Just Became a Lot More Flexible',
  //     body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
  //     description:
  //       'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
  //     published: true,
  //   },
  // });

  // console.log({ user1, user2, post1, post2, post3 });
  // console.log(user1, categories);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
