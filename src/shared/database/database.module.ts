import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { YourEntity } from './entities/your.entity'; // Replace with your actual entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_postgres_username',
      password: 'password',
      database: 'your_database_name',
      entities: [], // or use __dirname + '/**/*.entity{.ts,.js}'
      synchronize: true, // only for development!
    }),
    TypeOrmModule.forFeature([]),
  ],
})
export class AppModule {}
