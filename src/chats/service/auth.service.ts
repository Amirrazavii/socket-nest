
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { AuthDto } from '../dto/authDto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class AuthService{

    constructor(
        private readonly jwtService:JwtService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    public async getUserFromAuthenticationToken(token: string) {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });
        const userId = payload.userId
        if (userId) {
            const a= await  this.usersService.findById(userId)
            return a
        }
      }
      public async generateJwtToken(payload: AuthDto) {

        const user =await this.usersService.findOneUser(payload.username)
        return this.jwtService.sign({ 
          ...payload,
          userId: user._id,
        },
        {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        } );
      }

    public async register(user: AuthDto) {
        return this.usersService.create(user);
    }
      
}

