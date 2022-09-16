import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CategoryService } from './api/category/category.service';
import { MovieService } from './api/movie/movie.service';
import { MovieCategoriesService } from './api/movie_categories/movie_categories.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const movieService: MovieService = app.get(MovieService);
  const categoryService: CategoryService = app.get(CategoryService);
  const movieCategoryService: MovieCategoriesService = app.get(
    MovieCategoriesService,
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('movies')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await app.listen(port, async () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));

    await movieService.initMovies();
    await categoryService.initCategories();
    await movieCategoryService.initMovieCategories();
  });
}

bootstrap();
