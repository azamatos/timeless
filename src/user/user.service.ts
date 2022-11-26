import { BadRequestException, Injectable } from '@nestjs/common';

// third party
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// project imports
import { PrismaService } from '../prisma/prisma.service';
import { UserInput } from '../types/graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async register({ login, password }: UserInput) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await this.prisma.user.create({
        data: {
          login,
          password: hashedPassword,
        },
        select: { login: true },
      });

      return user;
    } catch (err) {
      throw new BadRequestException('This user already exists');
    }
  }

  async login({ login, password }: UserInput) {
    try {
      const { id, password: hashedPassword } =
        await this.prisma.user.findUnique({
          where: {
            login,
          },
          select: { id: true, password: true },
        });

      const checkPass =
        hashedPassword && (await bcrypt.compare(password, hashedPassword));

      if (checkPass) {
        const token = jwt.sign({ id, login }, process.env.SECRET);
        return {
          token,
        };
      } else throw new BadRequestException('Wrong credentials');
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong credentials');
    }
  }

  async updatePassword({ password, login }: UserInput) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await this.prisma.user.update({
        data: {
          password: hashedPassword,
        },
        where: { login },
        select: {
          id: true,
          login: true,
        },
      });

      return user;
    } catch (err) {
      throw new BadRequestException('Check ur login data and try again');
    }
  }
}
