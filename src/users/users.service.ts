// src/users/users.service.ts
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RateMovieDto } from './dto/rate-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { categories: true, ratings: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { categories: true, ratings: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Hash the password if provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );

      //change pass to new password
      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: {
          password: updateUserDto.password,
        },
      });

      return updatedUser;
    }

    const { categories, ...profileData } = updateUserDto;

    // Transform the categories array to match the expected structure
    // const categoriesInput = categories?.map((category) => ({
    //   category_id: category.category_id,
    // }));

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: {
          ...profileData,
          categories: categories
            ? { set: categories.map((val) => ({ id: val })) }
            : undefined,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  // rating movie
  async rateMovie(userId: number, createRatingDto: RateMovieDto) {
    // Check if the movie and user exist
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const movie = await this.prisma.movie.findUnique({
      where: { id: createRatingDto.movieId },
    });

    if (!movie) {
      throw new NotFoundException(
        `Movie with ID ${createRatingDto.movieId} not found`,
      );
    }

    const existingRating = await this.prisma.rating.findFirst({
      where: {
        userId: userId,
        movieId: createRatingDto.movieId,
      },
    });

    // If the rating exists, update it; otherwise, create a new one
    if (existingRating) {
      const updatedRating = await this.prisma.rating.update({
        where: { id: existingRating.id },
        data: { value: createRatingDto.value },
      });
      return updatedRating;
    } else {
      const newRating = await this.prisma.rating.create({
        data: {
          userId: userId,
          movieId: createRatingDto.movieId,
          value: createRatingDto.value,
        },
      });
      return newRating;
    }
  }

  async recommendMovies(userId: number) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { categories: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const categoryIds = user.categories.map((category) => category.id);

    const recommendedMovies = await this.prisma.movie.findMany({
      where: {
        categoryId: {
          in: categoryIds,
        },
      },
    });

    return recommendedMovies;
  }
}
