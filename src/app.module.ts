import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongodbConfig from './config/mongo.config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
// import { CacheStore } from 'cache-manager';
import {RedisOptions} from './config/redisOption'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load:[mongodbConfig]
    }),
    CacheModule.registerAsync(RedisOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('DATABASE'),
      inject: [ConfigService],
    }), ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
