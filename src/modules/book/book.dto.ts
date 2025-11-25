export class CreateBookInput {
  userId!: string;
  title!: string;
  author!: string;
}

export class UpdateBookInput {
  id!: string;
  title?: string;
  author?: string;
}
