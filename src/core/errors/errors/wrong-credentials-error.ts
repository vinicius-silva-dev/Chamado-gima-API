import { UseCaseError } from "../use-case-error";


export class WrongCredentialsError extends Error implements UseCaseError {
  constructor(){
    super(`Credential are not valid.`)
  }
}