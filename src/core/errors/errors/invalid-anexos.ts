import { UseCaseError } from "../use-case-error";

export class InvalidAnexo extends Error implements UseCaseError {
  constructor() {
    super('Type of attachment is not valid.')
  }
}
