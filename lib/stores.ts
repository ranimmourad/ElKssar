export interface StoreLocation {
  city: string;
  label: string;
  address: string;
}

export const stores: StoreLocation[] = [
  {
    city: "Nabeul",
    label: "Showroom Sidi Achour",
    address: "Sidi Achour, Nabeul",
  },
  {
    city: "Hammamet",
    label: "Showroom Kharouba",
    address: "Avenue Abou Dhabi, Kharouba, Hammamet",
  },
  {
    city: "Nabeul — Magasin Principal",
    label: "Magasin Principal",
    address: "Avenue 2 Mars 1934, Nabeul 8000",
  },
];

export const phone = "20 005 155";
export const openingHours = "Ouvert tous les jours jusqu'à 21h00";
