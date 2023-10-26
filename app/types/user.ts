export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Geo = {
  lat: string;
  lng: string;
};

export type GOTchar = {
  characterName: string;
  houseName: string;
  characterImageThumb: string;
  characterImageFull: string;
  characterLink: string;
  actorName: string;
  actorLink: string;
  nickname: string;
  royal: boolean;
  killed: string[];
  servedBy: string[];
  parentOf: string[];
  siblings: string[];
  marriedEngaged: string[];
  killedBy: string;
};