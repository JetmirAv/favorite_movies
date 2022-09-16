import { ApiProperty } from '@nestjs/swagger';

// data: T[];
// page?: number;
// count?: number;
// take?: number;
// loading: boolean;

export class ListResponseDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty({ required: false })
  readonly has_more?: boolean;

  constructor(data: T[], count: number, page: number, take: number) {
    this.data = data;
    this.page = page;
    this.count = count;
    this.take = take;
    this.has_more = count > page * take;
  }
}
