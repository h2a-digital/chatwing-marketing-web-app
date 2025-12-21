export type SupportFormState = {
  name: string;
  email: string;
  message: string;
  hp: string; // honeypot
};

export type SupportFormVM = SupportFormState & {
  isSubmitting: boolean;
  hasSubmitted: boolean;
};
