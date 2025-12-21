export interface ContactFormDTO {
  name: string;
  email: string;
  message: string;
  hp?: string; // honeypot field
}
