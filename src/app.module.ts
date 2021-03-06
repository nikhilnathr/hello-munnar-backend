import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { SessionModule } from 'nestjs-session';
import { watchmanModule } from './watchman/watchman.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { nestMailer } from './config/constants';
import { AuthModule } from './auth/auth.module';
import { DestinationsModule } from './destinations/destinations.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: nestMailer.transport,
        template: {
          dir: './templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    SessionModule.forRoot({
      session: {
        secret: 'tomahawk_pilot',
        resave: true,
        saveUninitialized: true,
      },
    }),
    AuthModule,
    watchmanModule,
    ConfigModule.forRoot('munnar'),
    DestinationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
