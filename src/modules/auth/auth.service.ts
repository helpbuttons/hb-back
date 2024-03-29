import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto, SignupRequestDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { publicNanoidGenerator } from '@src/shared/helpers/nanoid-generator.helper';
import { UserCredentialService } from '../user-credential/user-credential.service';
import webAppConfig from '@src/app/configs/web-app.config';
import { NodeEnv } from '@src/shared/types';
import { MailService } from '../mail/mail.service';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userCredentialService: UserCredentialService,
    private readonly configService: ConfigService,
    @Inject(webAppConfig.KEY)
    private readonly webAppConfigs: ConfigType<typeof webAppConfig>,
    private readonly mailService: MailService,
    private jwtTokenService: JwtService,
  ) {}

  @Transactional()
  async signup(signupUserDto: SignupRequestDto) {
    const {
      email,
      // interests,
      password: plainPassword,
      // realm,
      name
    } = signupUserDto;
    const hashedPassword = await this.hashPassword(plainPassword);
    const roles = ['registered'];
    const verificationToken = publicNanoidGenerator();
    let emailVerified = false;

    if (this.webAppConfigs.nodeEnv === NodeEnv.development) {
      emailVerified = true;
    }

    console.log('createing user...' + email)
    const user = await this.userService.createUser({
      // realm,
      username: email,
      verificationToken,
      emailVerified,
      roles,
      name,
    });

    await this.userCredentialService.createUserCredential({
      userId: user.id,
      password: hashedPassword,
    });
    // for (const tag of interests) {
    //   await this.tagService.createTag({
    //     tag,
    //   });
    // }

    if (!user.emailVerified) {
      const activationUrl: string =
        this.webAppConfigs.baseUrl + 'user/activate/'+ user.verificationToken;

      await this.mailService.sendActivationEmail({
        to: email,
        activationUrl,
      });
    }

    return this.getAccessToken(user);
  }

  activate(verificationToken: string) {
    // TODO:
  }

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }
    
    const userCredential = await this.userCredentialService.findOne(user.id);
    if (!userCredential)
    {
      return null;
    }

    if (!(await verify(userCredential.password, plainPassword))){
      return null;
    }

    return this.getAccessToken(user);
  }
  
  async getAccessToken(user) {
    const payload = { username: user.email, sub: user.id };

    return {
        token: this.jwtTokenService.sign(payload),
    };
  }

  hashPassword(password: string) {
    return hash(password);
  }

  async getCurrentUser(userId) {
    return this.userService.findById(userId);
  }
}
