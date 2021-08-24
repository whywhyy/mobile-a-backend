import {
  Injectable,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpParam } from './auth-signup.param';
import { User } from '@prisma/client';
import { LOLService } from '../lol/lol.service';
import * as appleSignin from 'apple-signin';
import path from 'path';
import { UserService } from '../user/user.service';
import { GoogleAuthService } from './passport/google-auth.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lolService: LOLService,
    private readonly userService: UserService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  async signUp(param: SignUpParam): Promise<User> {
    // check user exist
    console.log(param);
    const isUserExistValidate = await this.userService.isUserExistValidate(
      param.authFrom,
      param.email,
    );

    // 유저가 존재하지 않을 경우
    if (!isUserExistValidate) {
      const lolAccountId = await this.lolService.upsertLOLAccountByLOLName(
        param.LOLNickName,
      );

      // TODO : header.accessToken validate

      return await this.prisma.user.create({
        data: {
          authFrom: param.authFrom,
          email: param.email,
          LOLAccountId: lolAccountId,
          schoolId: param.schoolId,
        },
      });
    } else {
      // TODO. accessToken 가져와서 바로 login 해주기
      const userToken = await this.userService.getUserTokenByAuthAndEmail(
        param.authFrom,
        param.email,
      );
      console.log(userToken);
    }
  }

  /**
   * @Google
   */
  async googleLogin(req) {
    if (!req.user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '해당 구글 유저가 존재하지 않습니다.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const authFrom = 'google';
    const { email, accessToken } = req.user;

    const tokenValidate = await this.googleAuthService.getUser(accessToken);
    if (tokenValidate.verified_email) {
      const isUserExistValidate = await this.userService.isUserExistValidate(
        authFrom,
        email,
      );

      if (!isUserExistValidate) {
        const userToken = await this.userService.getUserTokenByAuthAndEmail(
          authFrom,
          email,
        );
        console.log(userToken);
        return {
          message: '유저 정보가 없습니다. 회원가입을 진행합니다.',
          authFrom: authFrom,
          email: email,
          accessToken: accessToken,
        };
      }

      // TODO. 유저 존재할 경우에 Token 저장
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NON_AUTHORITATIVE_INFORMATION,
          error: '인증되지 않은 유저입니다.',
        },
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }
  }
}
