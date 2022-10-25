import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common/pipes';
import { PrismaClientExceptionFilter } from 'src/common/filters/prisma-client-exception.filter';
import { PrismaService } from './prisma/prisma.service';
import helmet from '@fastify/helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // clear the properties are sent by user but not exist in dto
    }),
  );

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Prisma gracefull shutdown
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  const userOptions = new DocumentBuilder()
    .setTitle('User')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const userDocument = SwaggerModule.createDocument(app, userOptions, {
    include: [UserModule],
  });
  SwaggerModule.setup('api/user', app, userDocument);

  const authOptions = new DocumentBuilder()
    .setTitle('User')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const authDocument = SwaggerModule.createDocument(app, authOptions, {
    include: [AuthModule],
  });
  SwaggerModule.setup('api/auth', app, authDocument);

  await app.listen(3100);
}
bootstrap();
