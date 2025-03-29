export type User = {
  birthdate: number;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  location: {
    city: string;
    postcode: number;
    state: string;
    street: string;
  };
  phone_number: string;
  title: string;
  username: string;
};
