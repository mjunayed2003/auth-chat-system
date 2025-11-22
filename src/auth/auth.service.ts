import { Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async register(payload: RegisterDto) {

    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already registered');
    }

    const hash = await argon2.hash(payload.password);

    await this.prisma.user.create({
      data: { name: payload.name, email: payload.email, password: hash },
    });

    return { message: "User created successfully" };
  }







  
  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: payload.email } });

    if (!user) throw new UnauthorizedException("Invalid Credentials");

    const valid = await argon2.verify(user.password, payload.password);

    if (!valid) throw new UnauthorizedException("Invalid Credentials");

    const token = await this.jwt.signAsync({ id: user.id, email: user.email });

    return { access_token: token };
  }
}
