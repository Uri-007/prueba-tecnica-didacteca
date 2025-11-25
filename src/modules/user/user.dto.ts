export class CreateUserInput {
  name!: string;
  email!: string;
}

export class UpdateUserInput {
  id!: string;
  name?: string;
  email?: string;
}
