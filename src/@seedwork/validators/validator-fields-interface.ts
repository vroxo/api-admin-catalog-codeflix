export type FieldErrors = {
  [field: string]: string[];

}

export default interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  validate(data: any): void;
}